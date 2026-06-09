import { useState } from "react";
import { waliController } from "../../controller/waliController";
import { muridController } from "../../controller/muridController";

const JILID_OPTIONS = ["JILID_1", "JILID_2", "JILID_3", "JILID_4", "JILID_5", "JILID_6"];
const PERAN_OPTIONS = ["ayah", "ibu", "kakek", "nenek", "wali"];

const INITIAL_MURID = {
  nama: "", umur: "", jenisKelamin: "LAKI_LAKI", jilidAwal: "",
};

const INITIAL_WALI = {
  nama: "", email: "", password: "", umur: "", peran: "ibu",
};

export default function ModalTambahMurid({ guruId, namaGuru, onClose, onSuccess }) {
  const [murid,       setMurid]       = useState(INITIAL_MURID);
  const [waliMode,    setWaliMode]     = useState("existing"); // "existing" | "new"
  const [waliList,    setWaliList]     = useState([]);
  const [loadingWali, setLoadingWali]  = useState(false);
  const [waliLoaded,  setWaliLoaded]   = useState(false);
  const [selectedWaliId, setSelectedWaliId] = useState("");
  const [newWali,     setNewWali]      = useState(INITIAL_WALI);
  const [loading,     setLoading]      = useState(false);
  const [error,       setError]        = useState("");

  // Lazy load wali list saat dropdown dibuka
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
    // Validasi murid
    if (!murid.nama.trim() || !murid.umur) {
      setError("Nama dan umur murid wajib diisi.");
      return;
    }

    // Validasi wali
    if (waliMode === "existing" && !selectedWaliId) {
      setError("Pilih wali murid terlebih dahulu.");
      return;
    }
    if (waliMode === "new" && (!newWali.nama.trim() || !newWali.email.trim() || !newWali.password.trim() || !newWali.umur)) {
      setError("Semua field wali baru wajib diisi.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let waliId = Number(selectedWaliId);

      // Kalau wali baru, buat dulu
      if (waliMode === "new") {
        const res = await waliController.tambahWali(newWali);
        // ambil id wali dari response — sesuaikan key dengan response backend
        waliId = res.data?.wali?.id ?? res.data?.id;
        if (!waliId) throw new Error("Gagal mendapatkan ID wali baru.");
      }

      await muridController.tambahMurid({
        nama:         murid.nama.trim(),
        umur:         Number(murid.umur),
        jenisKelamin: murid.jenisKelamin,
        guruId,
        WaliId:       waliId,
        ...(murid.jilidAwal ? { jilidSekarang: murid.jilidAwal } : {}),
      });

      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message ?? "Terjadi kesalahan.");
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
          <div className="bg-teal-50 border border-teal-100 rounded-lg px-4 py-2.5 flex items-center justify-between">
            <span className="text-xs text-teal-600 font-semibold">Guru</span>
            <span className="text-sm font-extrabold text-teal-700">{namaGuru}</span>
          </div>

          {/* ── DATA MURID ── */}
          <section>
            <p className="text-xs font-extrabold text-gray-400 tracking-widest uppercase mb-3">
              Data Murid
            </p>
            <div className="space-y-3">

              {/* Nama */}
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

              {/* Umur */}
              <div>
                <label className="text-xs text-gray-400 font-semibold mb-1 block">
                  Umur <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  min={3} max={20}
                  value={murid.umur}
                  onChange={(e) => handleMuridChange("umur", e.target.value)}
                  placeholder="Umur murid"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 text-gray-700"
                />
              </div>

              {/* Jenis Kelamin */}
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

              {/* Jilid Awal */}
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

          {/* ── DATA WALI ── */}
          <section>
            <p className="text-xs font-extrabold text-gray-400 tracking-widest uppercase mb-3">
              Wali Murid
            </p>

            {/* Toggle existing / new */}
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

            {/* Pilih wali existing */}
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

            {/* Form wali baru */}
            {waliMode === "new" && (
              <div className="space-y-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                {[
                  { field: "nama",     label: "Nama Wali",  type: "text",     placeholder: "Nama lengkap" },
                  { field: "email",    label: "Email",      type: "email",    placeholder: "email@example.com" },
                  { field: "password", label: "Password",   type: "password", placeholder: "Min. 8 karakter" },
                  { field: "umur",     label: "Umur",       type: "number",   placeholder: "Umur wali" },
                ].map(({ field, label, type, placeholder }) => (
                  <div key={field}>
                    <label className="text-xs text-gray-400 font-semibold mb-1 block">
                      {label} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type={type}
                      value={newWali[field]}
                      onChange={(e) => handleNewWaliChange(field, e.target.value)}
                      placeholder={placeholder}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 bg-white text-gray-700"
                    />
                  </div>
                ))}

                {/* Peran */}
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

          {/* Error */}
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