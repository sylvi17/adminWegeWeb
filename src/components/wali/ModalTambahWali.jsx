import { useState, useEffect } from "react";
import { waliController } from "../../controller/waliController";

const NAMA_BULAN = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

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
  const [tanggal, setTanggal] = useState(() => parseTanggal(value).tanggal);
  const [bulan, setBulan] = useState(() => parseTanggal(value).bulan);
  const [tahun, setTahun] = useState(() => parseTanggal(value).tahun);

  useEffect(() => {
    if (!value) {
      setTanggal(null);
      setBulan(null);
      setTahun(null);
    }
  }, [value]);

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
    } else {
      onChange("");
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
    "w-full border border-[#eee] rounded-lg px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 bg-white text-[#555]";

  return (
    <div className="grid grid-cols-3 gap-1.5">
      <select value={tanggal ?? ""} onChange={handleTanggalSelect} className={selectClass}>
        <option value="">Tgl</option>
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
        <option value="">Thn</option>
        {listTahun.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
}

export default function ModalTambahWali({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    tanggal_lahir: "",
    peran: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleTanggalLahirChange(value) {
    setForm((prev) => ({ ...prev, tanggal_lahir: value }));
  }

  async function handleSubmit() {
    if (!form.nama || !form.email || !form.password || !form.peran) {
      setError("Nama, email, password, dan peran wajib diisi.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      console.log("waliController =", waliController);
      console.log("create =", waliController.create);
      await waliController.create(form);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-[18px] shadow-2xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f0f0]">
          <h2 className="text-[1rem] font-extrabold text-[#1a1a1a]">
            Tambah Wali Murid Baru
          </h2>
          <button
            onClick={onClose}
            className="text-[#aaa] hover:text-[#555] text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5 space-y-3">
          <div>
            <label className="text-[0.75rem] text-[#999] mb-1 block">
              Nama Lengkap <span className="text-red-400">*</span>
            </label>
            <input
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Contoh: Ristina"
              className="w-full border border-[#eee] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300"
            />
          </div>
          <div>
            <label className="text-[0.75rem] text-[#999] mb-1 block">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@contoh.com"
              className="w-full border border-[#eee] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300"
            />
          </div>
          <div>
            <label className="text-[0.75rem] text-[#999] mb-1 block">
              Password <span className="text-red-400">*</span>
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Minimal 6 karakter"
              className="w-full border border-[#eee] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300"
            />
          </div>

          <div>
            <label className="text-[0.75rem] text-[#999] mb-1 block">
              Tanggal Lahir
            </label>
            <DatePickerIndo
              value={form.tanggal_lahir}
              onChange={handleTanggalLahirChange}
            />
          </div>

          <div>
            <label className="text-[0.75rem] text-[#999] mb-1 block">
              Peran <span className="text-red-400">*</span>
            </label>
            <select
              name="peran"
              value={form.peran}
              onChange={handleChange}
              className="w-full border border-[#eee] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 bg-white text-[#555]"
            >
              <option value="" disabled>
                Pilih peran
              </option>
              <option value="ibu">Ibu</option>
              <option value="ayah">Ayah</option>
              <option value="wali">Wali</option>
            </select>
          </div>

          <div>
            <label className="text-[0.75rem] text-[#999] mb-1 block">
              Role
            </label>
            <div className="w-full border border-[#eee] bg-[#f9f9f9] rounded-lg px-3 py-2 text-sm text-[#aaa] flex items-center justify-between">
              <span>WALI_MURID</span>
              <span className="text-xs bg-[#d4f0ec] text-[#00897b] px-2 py-0.5 rounded-full font-bold">
                Auto
              </span>
            </div>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-[#f0f0f0]">
          <button
            onClick={onClose}
            className="text-sm px-4 py-2 rounded-full border border-[#eee] text-[#555] hover:bg-[#f9f9f9] transition font-bold"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="text-sm px-5 py-2 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-bold shadow-md transition disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}