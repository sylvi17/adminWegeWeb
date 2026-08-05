import { useState, useEffect } from "react";
import { muridController } from "../../controller/muridController";
import { guruController } from "../../controller/guruController";

const JILID_OPTIONS = [
  "JILID_1",
  "JILID_2",
  "JILID_3",
  "JILID_4",
  "JILID_5",
  "JILID_6",
];
const NAMA_BULAN = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function hitungUmur(tanggal_lahir) {
  if (!tanggal_lahir) return null;
  const lahir = new Date(tanggal_lahir);
  const sekarang = new Date();
  let umur = sekarang.getFullYear() - lahir.getFullYear();
  const belumUlangTahun =
    sekarang.getMonth() < lahir.getMonth() ||
    (sekarang.getMonth() === lahir.getMonth() &&
      sekarang.getDate() < lahir.getDate());
  if (belumUlangTahun) umur--;
  return umur;
}

function reverseFormatJilid(jilid) {
  if (!jilid) return "";
  return jilid.replace(/ /g, "_");
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

function ambilTanggalLahirMurid(murid) {
  const kandidat =
    murid?.tanggal_lahir ??
    murid?.tanggalLahir ??
    murid?.tgl_lahir ??
    murid?.dob ??
    murid?.birthDate ??
    murid?.birth_date ??
    null;
  return kandidat ? String(kandidat).slice(0, 10) : "";
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

export default function ModalEditMurid({ murid, onClose, onSuccess }) {
  const [form, setForm] = useState({
    nama: murid.nama ?? "",
    umur: murid.umur ?? "",
    tanggal_lahir: ambilTanggalLahirMurid(murid),
    jenisKelamin: murid.jenisKelamin ?? "",
    jilidSekarang: reverseFormatJilid(murid.jilid ?? ""),
    // FIX: ambil guruId langsung dari field yang sekarang disediakan
    // controller (murid.guruId), baru fallback ke murid.guru?.id kalau
    // guru dikirim sebagai object. Sebelumnya, di halaman "Murid
    // Bimbingan" (getByGuru), murid.guru cuma STRING nama guru, jadi
    // murid.guru?.id selalu undefined -> dropdown Guru kosong -> saat
    // disimpan, relasi guru ikut terhapus.
    guruId: murid.guruId ?? murid.guru?.id ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [guruList, setGuruList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Log bantu debug — buka Console (F12) saat modal ini dibuka untuk
    // memastikan guruId & tanggal lahir memang terbaca dari data murid.
    console.log("[ModalEditMurid] data murid diterima:", murid);
    console.log("[ModalEditMurid] guruId terpakai:", murid.guruId ?? murid.guru?.id ?? "(kosong)");
    if (!ambilTanggalLahirMurid(murid)) {
      console.warn("[ModalEditMurid] Field tanggal lahir tidak ditemukan pada objek murid ini.");
    }
  }, [murid]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "guruId" ? Number(value) : value,
    }));
  }

  function handleTanggalLahirChange(value) {
    const umurBaru = hitungUmur(value);
    setForm((prev) => ({
      ...prev,
      tanggal_lahir: value,
      umur: umurBaru ?? prev.umur,
    }));
  }

  async function handleSubmit() {
    if (!form.nama || !form.jenisKelamin) {
      setError("Nama dan jenis kelamin wajib diisi.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Log bantu debug — cek di Console persis apa yang dikirim ke server.
      console.log("[ModalEditMurid] payload yang dikirim ke updateMurid:", form);
      await muridController.updateMurid(murid.id, form);
      onSuccess();
    } catch (err) {
      setError(err.message ?? "Gagal mengupdate murid.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    async function fetchGuru() {
      try {
        const data = await guruController.getAll();
        setGuruList(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchGuru();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-[18px] shadow-2xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-extrabold text-gray-900">Edit Murid</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none transition"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-3">
          <div>
            <label className="text-xs text-gray-400 font-semibold mb-1 block">
              Nama Lengkap <span className="text-red-400">*</span>
            </label>
            <input
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Nama murid"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 text-gray-700"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 font-semibold mb-1 block">
              Tanggal Lahir{" "}
              <span className="text-gray-300">
                (opsional, untuk update umur)
              </span>
            </label>
            <DatePickerIndo
              key={murid.id}
              value={form.tanggal_lahir}
              onChange={handleTanggalLahirChange}
            />
            <p className="text-xs text-gray-400 mt-1">
              Umur saat ini:{" "}
              <span className="font-bold text-gray-600">
                {form.umur || 0} tahun
              </span>
            </p>
          </div>

          <div>
            <label className="text-xs text-gray-400 font-semibold mb-1 block">
              Jenis Kelamin <span className="text-red-400">*</span>
            </label>
            <select
              name="jenisKelamin"
              value={form.jenisKelamin}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 bg-white text-gray-600"
            >
              <option value="" disabled>
                Pilih
              </option>
              <option value="LAKI_LAKI">Laki-laki</option>
              <option value="PEREMPUAN">Perempuan</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-400 font-semibold mb-1 block">
              Jilid Saat Ini
            </label>
            <select
              name="jilidSekarang"
              value={form.jilidSekarang}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 bg-white text-gray-600"
            >
              <option value="">Belum ditentukan</option>
              {JILID_OPTIONS.map((j) => (
                <option key={j} value={j}>
                  {j.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-400 font-semibold mb-1 block">
              Guru
            </label>

            <select
              name="guruId"
              value={form.guruId}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 bg-white text-gray-600"
            >
              <option value="">Pilih Guru</option>

              {guruList.map((guru) => (
                <option key={guru.id} value={guru.id}>
                  {guru.nama}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100">
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
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}