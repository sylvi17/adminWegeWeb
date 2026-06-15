import { useState } from "react";
import apiClient from "../../services/api";

export default function ModalEditPengajar({ pengajar, onClose, onSuccess }) {
  const [form, setForm] = useState({
    nama:  pengajar.nama  ?? "",
    email: pengajar.email ?? "",
    noHp:  pengajar.noHp  ?? "",   
    alamat: pengajar.alamat ?? "",  
  });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit() {
    console.log("pengajar:", pengajar);
    if (!form.nama) {
      setError("Nama wajib diisi.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await apiClient.put(`/admin/users/${pengajar.id}`, {
        nama:   form.nama,
        email:  form.email,
        no_hp:  form.noHp,
        alamat: form.alamat,
      });
      onSuccess();
    } catch (err) {
      setError(err.message ?? "Gagal mengupdate pengajar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-[18px] shadow-2xl w-full max-w-md mx-4">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-extrabold text-gray-900">Edit Pengajar</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none transition">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-3">
          <Field label="Nama Lengkap" required>
            <input
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Nama pengajar"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 text-gray-700"
            />
          </Field>

          <Field label="Email">
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 text-gray-700"
            />
          </Field>

          <Field label="No. HP">
            <input
              name="noHp"
              value={form.noHp}
              onChange={handleChange}
              placeholder="08xxxxxxxxxx"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 text-gray-700"
            />
          </Field>

          <Field label="Alamat">
            <input
              name="alamat"
              value={form.alamat}
              onChange={handleChange}
              placeholder="Alamat lengkap"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 text-gray-700"
            />
          </Field>

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

function Field({ label, required, children }) {
  return (
    <div>
      <label className="text-xs text-gray-400 font-semibold mb-1 block">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}