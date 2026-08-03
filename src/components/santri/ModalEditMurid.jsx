import { useState } from "react";
import { muridController } from "../../controller/muridController";

const JILID_OPTIONS = ["JILID_1", "JILID_2", "JILID_3", "JILID_4", "JILID_5", "JILID_6"];

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

// "JILID 4" → "JILID_4" (kembalikan ke format Prisma)
function reverseFormatJilid(jilid) {
  if (!jilid) return "";
  return jilid.replace(/ /g, "_");
}

export default function ModalEditMurid({ murid, onClose, onSuccess }) {
  const [form, setForm] = useState({
    nama:          murid.nama         ?? "",
    umur:          murid.umur         ?? "",
    tanggal_lahir: "",
    jenisKelamin:  murid.jenisKelamin ?? "",
    // ← reverse format agar match dengan JILID_OPTIONS
    jilidSekarang: reverseFormatJilid(murid.jilid ?? ""),
  });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "tanggal_lahir") {
      const umurBaru = hitungUmur(value);
      setForm((prev) => ({
        ...prev,
        tanggal_lahir: value,
        umur: umurBaru ?? prev.umur,
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    if (!form.nama || !form.jenisKelamin) {
      setError("Nama dan jenis kelamin wajib diisi.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await muridController.updateMurid(murid.id, form);
      onSuccess();
    } catch (err) {
      setError(err.message ?? "Gagal mengupdate murid.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-[18px] shadow-2xl w-full max-w-md mx-4">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-extrabold text-gray-900">Edit Murid</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none transition">✕</button>
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
              Tanggal Lahir <span className="text-gray-300">(opsional, untuk update umur)</span>
            </label>
            <input
              name="tanggal_lahir"
              type="date"
              value={form.tanggal_lahir}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 text-gray-700"
            />
            <p className="text-xs text-gray-400 mt-1">
              Umur saat ini: <span className="font-bold text-gray-600">{form.umur || 0} tahun</span>
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
              <option value="" disabled>Pilih</option>
              <option value="LAKI_LAKI">Laki-laki</option>
              <option value="PEREMPUAN">Perempuan</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-400 font-semibold mb-1 block">Jilid Saat Ini</label>
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