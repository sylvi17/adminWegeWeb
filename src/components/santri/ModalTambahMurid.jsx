import { useState } from "react";
import { waliController } from "../../controller/waliController";
import { muridController } from "../../controller/muridController";

const JILID_OPTIONS = ["JILID_1", "JILID_2", "JILID_3", "JILID_4", "JILID_5", "JILID_6"];
const PERAN_OPTIONS = ["ayah", "ibu", "kakek", "nenek", "wali"];
const NAMA_BULAN = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

const INITIAL_MURID = {
  nama: "", tanggal_lahir: "", jenisKelamin: "LAKI_LAKI", jilidAwal: "",
};

const INITIAL_WALI = {
  nama: "", email: "", password: "", tanggal_lahir: "", peran: "ibu",
};

function hitungUmur(tanggal_lahir) {
  if (!tanggal_lahir) return null;
  const lahir = new Date(tanggal_lahir);
  const sekarang = new Date();
  let umur = sekarang.getFullYear() - lahir.getFullYear();
  const belumUlangTahun =
    sekarang.getMonth() < lahir.getMonth() ||
    (sekarang.getMonth() === lahir.getMonth() && sekarang.getDate() < lahir.getDate());
  if (belumUlangTahun) umur--;
  return umur;
}

function parseTanggal(value) {
  if (!value) return { tanggal: null, bulan: null, tahun: null };
  const [y, m, d] = String(value).slice(0, 10).split("-").map(Number);
  return { tanggal: d || null, bulan: m || null, tahun: y || null };
}

function jumlahHari(bulan, tahun) {
  if (!bulan) return 31;
  return new Date(tahun || 2000, bulan, 0).getDate();
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function DatePickerIndo({ value, onChange }) {
  const initial = parseTanggal(value);
  const [tanggal, setTanggal] = useState(initial.tanggal);
  const [bulan, setBulan] = useState(initial.bulan);
  const [tahun, setTahun] = useState(initial.tahun);

  const tahunSekarang = new Date().getFullYear();
  const listTahun = [];
  for (let y = tahunSekarang; y >= tahunSekarang - 80; y--) listTahun.push(y);
  const listTanggal = Array.from({ length: jumlahHari(bulan, tahun) }, (_, i) => i + 1);

  function update(d, m, y) {
    setTanggal(d);
    setBulan(m);
    setTahun(y);
    if (d && m && y) {
      onChange(`${y}-${pad(m)}-${pad(d)}`);
    }
  }

  function handleTanggalSelect(e) {
    const d = Number(e.target.value) || null;
    update(d, bulan, tahun);
  }

  function handleBulanSelect(e) {
    const m = Number(e.target.value) || null;
    const maxHari = jumlahHari(m, tahun);
    const d = tanggal && tanggal > maxHari ? maxHari : tanggal;
    update(d, m, tahun);
  }

  function handleTahunSelect(e) {
    const y = Number(e.target.value) || null;
    const maxHari = jumlahHari(bulan, y);
    const d = tanggal && tanggal > maxHari ? maxHari : tanggal;
    update(d, bulan, y);
  }

  const selectClass =
    "w-full border border-gray-200 rounded-lg px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 bg-white text-gray-700";

  return (
    <div className="grid grid-cols-3 gap-2">
      <select value={tanggal ?? ""} onChange={handleTanggalSelect} className={selectClass}>
        <option value="">Tanggal</option>
        {listTanggal.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <select value={bulan ?? ""} onChange={handleBulanSelect} className={selectClass}>
        <option value="">Bulan</option>
        {NAMA_BULAN.map((nama, idx) => (
          <option key={nama} value={idx + 1}>{nama}</option>
        ))}
      </select>

      <select value={tahun ?? ""} onChange={handleTahunSelect} className={selectClass}>
        <option value="">Tahun</option>
        {listTahun.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
}

export default function ModalTambahMurid({ guruId, namaGuru, onClose, onSuccess }) {
  const [murid,          setMurid]          = useState(INITIAL_MURID);
  const [waliMode,       setWaliMode]        = useState("existing");
  const [waliList,       setWaliList]        = useState([]);
  const [loadingWali,    setLoadingWali]     = useState(false);
  const [waliLoaded,     setWaliLoaded]      = useState(false);
  const [selectedWaliId, setSelectedWaliId]  = useState("");
  const [newWali,        setNewWali]         = useState(INITIAL_WALI);
  const [loading,        setLoading]         = useState(false);
  const [error,          setError]           = useState("");

  async function handleOpenWaliDropdown() {
    if (waliLoaded) return;
    setLoadingWali(true);
    try {
      const data = await waliController.getAll();
      setWaliList(data);
      setWaliLoaded(true);
    } catch {
      setError("Gagal memuat data wali.");
    } finally {
      setLoadingWali(false);
    }
  }

  function handleMuridChange(field, value) {
    setMurid((prev) => ({ ...prev, [field]: value }));
  }

  function handleNewWaliChange(field, value) {
    setNewWali((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    if (!murid.nama.trim()) {
      setError("Nama murid wajib diisi.");
      return;
    }
    if (waliMode === "existing" && !selectedWaliId) {
      setError("Pilih wali murid terlebih dahulu.");
      return;
    }
    if (waliMode === "new" && (!newWali.nama.trim() || !newWali.email.trim() || !newWali.password.trim())) {
      setError("Nama, email, dan password wali baru wajib diisi.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let waliId = Number(selectedWaliId);

      if (waliMode === "new") {
        const res = await waliController.create(newWali);
        waliId = res?.id ?? res?.wali?.id;
        if (!waliId) throw new Error("Gagal mendapatkan ID wali baru.");
      }

      const umur = hitungUmur(murid.tanggal_lahir);

      // Relasi murid-wali TIDAK diubah: WaliId tetap dikirim persis
      // seperti sebelumnya, supaya murid baru tetap muncul di bawah
      // wali yang dipilih (existing) atau wali yang baru dibuat.
      await muridController.tambahMurid({
        nama:          murid.nama.trim(),
        umur:          umur ?? 0,
        jenisKelamin:  murid.jenisKelamin,
        guruId,
        WaliId:        waliId,
        ...(murid.jilidAwal ? { jilidSekarang: murid.jilidAwal } : {}),
      });

      onSuccess();
      onClose();
    } catch (err) {
      if (err.message?.includes("User_email_key")) {
        setError("Email sudah digunakan. Gunakan email lain.");
      } else {
        setError(err.message ?? "Terjadi kesalahan.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[18px] shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-base font-extrabold text-gray-900">Tambah Murid Baru</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none transition">✕</button>
        </div>

        <div className="px-6 py-5 space-y-5">

          {/* Info guru */}
          {namaGuru && (
            <div className="bg-teal-50 border border-teal-100 rounded-lg px-4 py-2.5 flex items-center justify-between">
              <span className="text-xs text-teal-600 font-semibold">Guru</span>
              <span className="text-sm font-extrabold text-teal-700">{namaGuru}</span>
            </div>
          )}

          {/* DATA MURID */}
          <section>
            <p className="text-xs font-extrabold text-gray-400 tracking-widest uppercase mb-3">Data Murid</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-400 font-semibold mb-1 block">
                  Nama Murid <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={murid.nama}
                  onChange={(e) => handleMuridChange("nama", e.target.value)}
                  placeholder="Masukkan nama murid"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 text-gray-700"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 font-semibold mb-1 block">Tanggal Lahir</label>
                <DatePickerIndo
                  value={murid.tanggal_lahir}
                  onChange={(val) => handleMuridChange("tanggal_lahir", val)}
                />
                {murid.tanggal_lahir && (
                  <p className="text-xs text-gray-400 mt-1">{hitungUmur(murid.tanggal_lahir)} tahun</p>
                )}
              </div>

              <div>
                <label className="text-xs text-gray-400 font-semibold mb-1 block">Jenis Kelamin</label>
                <div className="flex gap-2">
                  {["LAKI_LAKI", "PEREMPUAN"].map((jk) => (
                    <button
                      key={jk}
                      type="button"
                      onClick={() => handleMuridChange("jenisKelamin", jk)}
                      className={[
                        "flex-1 py-2 rounded-lg text-sm font-bold border transition-all",
                        murid.jenisKelamin === jk
                          ? "bg-teal-500 text-white border-teal-500"
                          : "border-gray-200 text-gray-500 hover:border-teal-300",
                      ].join(" ")}
                    >
                      {jk === "LAKI_LAKI" ? "Laki-laki" : "Perempuan"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 font-semibold mb-1 block">
                  Jilid Awal <span className="text-gray-300">(opsional)</span>
                </label>
                <select
                  value={murid.jilidAwal}
                  onChange={(e) => handleMuridChange("jilidAwal", e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 bg-white text-gray-600"
                >
                  <option value="">Belum ditentukan</option>
                  {JILID_OPTIONS.map((j) => (
                    <option key={j} value={j}>{j.replace("_", " ")}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* DATA WALI */}
          <section>
            <p className="text-xs font-extrabold text-gray-400 tracking-widest uppercase mb-3">Wali Murid</p>

            <div className="flex gap-1 bg-gray-100 rounded-full p-1 mb-3">
              {[["existing", "Pilih Wali"], ["new", "+ Wali Baru"]].map(([mode, label]) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => { setWaliMode(mode); setError(""); }}
                  className={[
                    "flex-1 py-1.5 rounded-full text-xs font-bold transition-all",
                    waliMode === mode
                      ? "bg-white text-teal-600 shadow-sm"
                      : "text-gray-400 hover:text-gray-600",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
            </div>

            {waliMode === "existing" && (
              <select
                value={selectedWaliId}
                onChange={(e) => setSelectedWaliId(e.target.value)}
                onFocus={handleOpenWaliDropdown}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 bg-white text-gray-600"
              >
                <option value="" disabled>
                  {loadingWali ? "Memuat data wali..." : "Pilih wali murid"}
                </option>
                {waliList.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.nama} ({w.peran}) — {w.jumlahMurid} anak
                  </option>
                ))}
              </select>
            )}

            {waliMode === "new" && (
              <div className="space-y-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div>
                  <label className="text-xs text-gray-400 font-semibold mb-1 block">
                    Nama Wali <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={newWali.nama}
                    onChange={(e) => handleNewWaliChange("nama", e.target.value)}
                    placeholder="Nama lengkap"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 bg-white text-gray-700"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-semibold mb-1 block">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={newWali.email}
                    onChange={(e) => handleNewWaliChange("email", e.target.value)}
                    placeholder="email@example.com"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 bg-white text-gray-700"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-semibold mb-1 block">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="password"
                    value={newWali.password}
                    onChange={(e) => handleNewWaliChange("password", e.target.value)}
                    placeholder="Min. 8 karakter"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 bg-white text-gray-700"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-semibold mb-1 block">Tanggal Lahir</label>
                  <DatePickerIndo
                    value={newWali.tanggal_lahir}
                    onChange={(val) => handleNewWaliChange("tanggal_lahir", val)}
                  />
                  {newWali.tanggal_lahir && (
                    <p className="text-xs text-gray-400 mt-1">{hitungUmur(newWali.tanggal_lahir)} tahun</p>
                  )}
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-semibold mb-1 block">Peran</label>
                  <select
                    value={newWali.peran}
                    onChange={(e) => handleNewWaliChange("peran", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 bg-white text-gray-600"
                  >
                    {PERAN_OPTIONS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </section>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="text-sm px-4 py-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition font-bold"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="text-sm px-5 py-2 rounded-full bg-teal-500 hover:bg-teal-600 active:scale-95 text-white font-bold shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Menyimpan..." : "Simpan Murid"}
          </button>
        </div>
      </div>
    </div>
  );
}