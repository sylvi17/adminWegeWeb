import { useState } from "react";
import { waliController } from "../../controller/waliController";

export default function ModalDeleteWali({ wali, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleDelete() {
    setLoading(true);
    setError(null);
    try {
      await waliController.deleteWali(wali.id);
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
      <div className="bg-white rounded-[18px] shadow-2xl w-full max-w-sm mx-4">
        <div className="px-6 py-6 text-center">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 text-2xl">
            🗑️
          </div>
          <h2 className="text-[1rem] font-extrabold text-[#1a1a1a] mb-2">Hapus Wali Murid</h2>
          <p className="text-sm text-[#999]">
            Apakah kamu yakin ingin menghapus{" "}
            <span className="font-bold text-[#333]">{wali.nama}</span>?
            Tindakan ini tidak bisa dibatalkan.
          </p>
          {error && <p className="text-xs text-red-500 mt-3">{error}</p>}
        </div>

        <div className="flex items-center justify-center gap-3 px-6 py-4 border-t border-[#f0f0f0]">
          <button onClick={onClose} className="text-sm px-5 py-2 rounded-full border border-[#eee] text-[#555] hover:bg-[#f9f9f9] transition font-bold">
            Batal
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="text-sm px-5 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold shadow-md transition disabled:opacity-50"
          >
            {loading ? "Menghapus..." : "Ya, Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}