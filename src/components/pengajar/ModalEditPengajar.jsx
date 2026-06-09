import { useState } from "react";

export default function ModalEditPengajar({ pengajar, onClose, onSuccess }) {
  const [form, setForm] = useState({
    nama: pengajar.nama ?? "",
    email: pengajar.email ?? "",
    noHp: pengajar.guru?.no_hp ?? "",
    alamat: pengajar.guru?.alamat ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit() {
    if (!form.nama) {
      setError("Nama wajib diisi.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const BASE_URL = import.meta.env.VITE_API_URL;
      const token = sessionStorage.getItem("tpq_token");

      const res = await fetch(`${BASE_URL}/guru/${pengajar.id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          nama: form.nama,
          email: form.email,
          no_hp: form.noHp,
          alamat: form.alamat,
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.message || "Gagal mengupdate pengajar");
      }

      onSuccess();
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
          <h2 className="text-[1rem] font-extrabold text-[#1a1a1a]">Edit Pengajar</h2>
          <button onClick={onClose} className="text-[#aaa] hover:text-[#555] text-xl leading-none">✕</button>
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
              className="w-full border border-[#eee] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300"
            />
          </div>
          <div>
            <label className="text-[0.75rem] text-[#999] mb-1 block">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-[#eee] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300"
            />
          </div>
          <div>
            <label className="text-[0.75rem] text-[#999] mb-1 block">No. HP</label>
            <input
              name="noHp"
              value={form.noHp}
              onChange={handleChange}
              className="w-full border border-[#eee] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300"
            />
          </div>
          <div>
            <label className="text-[0.75rem] text-[#999] mb-1 block">Alamat</label>
            <input
              name="alamat"
              value={form.alamat}
              onChange={handleChange}
              className="w-full border border-[#eee] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300"
            />
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