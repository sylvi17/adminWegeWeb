import { useState } from "react";
import { tambahGuru } from "../../controller/pengajarController";

export default function ModalTambahGuru({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    no_hp: "",
    alamat: "",
    umur: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit() {
    if (!form.nama || !form.email || !form.password) {
      setError("Nama, email, dan password wajib diisi.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await tambahGuru({ ...form, umur: Number(form.umur) });
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
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f0f0]">
          <h2 className="text-[1rem] font-extrabold text-[#1a1a1a]">Tambah Pengajar Baru</h2>
          <button onClick={onClose} className="text-[#aaa] hover:text-[#555] text-xl leading-none">✕</button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-3">
          <div>
            <label className="text-[0.75rem] text-[#999] mb-1 block">Nama Lengkap <span className="text-red-400">*</span></label>
            <input name="nama" value={form.nama} onChange={handleChange} placeholder="Contoh: Usman Ghalin"
              className="w-full border border-[#eee] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#26a69a]" />
          </div>
          <div>
            <label className="text-[0.75rem] text-[#999] mb-1 block">Email <span className="text-red-400">*</span></label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@contoh.com"
              className="w-full border border-[#eee] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#26a69a]" />
          </div>
          <div>
            <label className="text-[0.75rem] text-[#999] mb-1 block">Password <span className="text-red-400">*</span></label>
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Minimal 6 karakter"
              className="w-full border border-[#eee] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#26a69a]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[0.75rem] text-[#999] mb-1 block">No. HP</label>
              <input name="no_hp" value={form.no_hp} onChange={handleChange} placeholder="08xxxxxxxxxx"
                className="w-full border border-[#eee] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#26a69a]" />
            </div>
            <div>
              <label className="text-[0.75rem] text-[#999] mb-1 block">Umur</label>
              <input name="umur" type="number" value={form.umur} onChange={handleChange} placeholder="30"
                className="w-full border border-[#eee] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#26a69a]" />
            </div>
          </div>
          <div>
            <label className="text-[0.75rem] text-[#999] mb-1 block">Alamat</label>
            <input name="alamat" value={form.alamat} onChange={handleChange} placeholder="Jl. Contoh No. 1"
              className="w-full border border-[#eee] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#26a69a]" />
          </div>
          <div>
            <label className="text-[0.75rem] text-[#999] mb-1 block">Role</label>
            <div className="w-full border border-[#eee] bg-[#f9f9f9] rounded-lg px-3 py-2 text-sm text-[#aaa] flex items-center justify-between">
              <span>GURU</span>
              <span className="text-xs bg-[#d4f0ec] text-[#00897b] px-2 py-0.5 rounded-full font-bold">Auto</span>
            </div>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-[#f0f0f0]">
          <button onClick={onClose}
            className="text-sm px-4 py-2 rounded-full border border-[#eee] text-[#555] hover:bg-[#f9f9f9] transition font-bold">
            Batal
          </button>
          <button onClick={handleSubmit} disabled={loading}
            className="text-sm px-5 py-2 rounded-full bg-[#1a5c54] hover:bg-[#26a69a] text-white font-bold shadow-md transition disabled:opacity-50">
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}