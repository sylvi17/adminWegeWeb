import { useState } from "react";
import apiClient from "../../services/api";

const CACHE_KEY = "deletedUserNames";

function cacheUserName(userId, nama) {
  if (!userId || !nama) return;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    const cache = raw ? JSON.parse(raw) : {};
    cache[String(userId)] = nama;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // localStorage penuh atau tidak tersedia, aman diabaikan
  }
}

export default function ModalDeletePengajar({ pengajar, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleDelete() {
    setLoading(true);
    setError(null);
    try {
      // Simpan nama ke cache SEBELUM data dihapus dari server
      cacheUserName(pengajar.userId, pengajar.nama);

      await apiClient.delete(`/admin/users/${pengajar.userId}`, {
        data: {
          nama: pengajar.nama,
          role: "GURU",
        },
      });
      onSuccess();
    } catch (err) {
      const msg = err.message ?? "";
      if (msg.includes("Foreign key") || msg.includes("guruId")) {
        setError(
          "Pengajar ini masih memiliki murid terdaftar. Pindahkan atau arsip murid terlebih dahulu sebelum mengarsipkan pengajar."
        );
      } else {
        setError(msg || "Gagal menghapus pengajar.");
      }
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
          <h2 className="text-base font-extrabold text-gray-900 mb-2">Hapus Pengajar</h2>
          <p className="text-sm text-gray-400">
            Apakah kamu yakin ingin menghapus{" "}
            <span className="font-bold text-gray-700">{pengajar.nama}</span>?
            Tindakan ini tidak bisa dibatalkan.
          </p>
          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mt-3">
              {error}
            </p>
          )}
        </div>

        <div className="flex items-center justify-center gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="text-sm px-5 py-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition font-bold"
          >
            Batal
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="text-sm px-5 py-2 rounded-full bg-red-500 hover:bg-red-600 active:scale-95 text-white font-bold shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Menghapus..." : "Ya, Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}