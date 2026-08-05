import { useState, useMemo } from "react";
import { waliController } from "../../controller/waliController";

const NAMA_BULAN = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function hitungUmur(tanggal, bulan, tahun) {
  if (!tanggal || !bulan || !tahun) return null;
  const lahir = new Date(Number(tahun), Number(bulan) - 1, Number(tanggal));
  const sekarang = new Date();

  let umur = sekarang.getFullYear() - lahir.getFullYear();
  const belumUlangTahun =
    sekarang.getMonth() < lahir.getMonth() ||
    (sekarang.getMonth() === lahir.getMonth() &&
      sekarang.getDate() < lahir.getDate());
  if (belumUlangTahun) umur -= 1;

  return umur;
}

export default function ModalEditWali({ wali, onClose, onSuccess }) {
  // pecah tanggal_lahir (format "YYYY-MM-DD") jadi 3 bagian terpisah
  const initialDate = wali.tanggal_lahir
    ? wali.tanggal_lahir.slice(0, 10).split("-")
    : ["", "", ""];
  const [initTahun, initBulan, initTanggal] = initialDate;

  const [form, setForm] = useState({
    nama: wali.nama ?? "",
    peran: wali.peran ?? "",
  });
  const [tanggal, setTanggal] = useState(initTanggal || "");
  const [bulan, setBulan] = useState(initBulan || "");
  const [tahun, setTahun] = useState(initTahun || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const umurSaatIni = useMemo(
    () => hitungUmur(tanggal, bulan, tahun),
    [tanggal, bulan, tahun]
  );

  const daftarTanggal = Array.from({ length: 31 }, (_, i) => i + 1);
  const tahunSekarang = new Date().getFullYear();
  const daftarTahun = Array.from(
    { length: 80 },
    (_, i) => tahunSekarang - i
  );

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit() {
    if (!form.nama || !form.peran) {
      setError("Nama dan peran wajib diisi.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const tanggal_lahir =
        tanggal && bulan && tahun
          ? `${tahun}-${String(bulan).padStart(2, "0")}-${String(
              tanggal
            ).padStart(2, "0")}`
          : null;

      await waliController.editWali(wali.userId ?? wali.id, {
        ...form,
        tanggal_lahir,
      });

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
            Edit Wali Murid
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
              Tanggal Lahir{" "}
              <span className="text-[#bbb]">(opsional, untuk update umur)</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <select
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="w-full border border-[#eee] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 bg-white text-[#555]"
              >
                <option value="">Tanggal</option>
                {daftarTanggal.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <select
                value={bulan}
                onChange={(e) => setBulan(e.target.value)}
                className="w-full border border-[#eee] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 bg-white text-[#555]"
              >
                <option value="">Bulan</option>
                {NAMA_BULAN.map((nama, idx) => (
                  <option key={nama} value={idx + 1}>
                    {nama}
                  </option>
                ))}
              </select>

              <select
                value={tahun}
                onChange={(e) => setTahun(e.target.value)}
                className="w-full border border-[#eee] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 bg-white text-[#555]"
              >
                <option value="">Tahun</option>
                {daftarTahun.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {umurSaatIni !== null && (
              <p className="text-xs text-[#999] mt-1.5">
                Umur saat ini: <b className="text-[#333]">{umurSaatIni} tahun</b>
              </p>
            )}
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