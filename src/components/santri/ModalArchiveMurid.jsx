import { Trash2, RotateCcw } from "lucide-react";

export default function ModalArchiveMurid({
  type = "archive",
  murid,
  onClose,
  onConfirm,
  loading = false,
}) {
  const isRestore = type === "restore";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        <div className="px-6 pt-8 pb-6 text-center">
          {/* Icon lingkaran */}
          <div
            className={[
              "w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center",
              isRestore ? "bg-emerald-100" : "bg-red-100",
            ].join(" ")}
          >
            {isRestore ? (
              <RotateCcw className="w-7 h-7 text-emerald-500" />
            ) : (
              <Trash2 className="w-7 h-7 text-red-400" />
            )}
          </div>

          {/* Judul */}
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">
            {isRestore ? "Pulihkan Murid" : "Arsipkan Murid"}
          </h2>

          {/* Deskripsi */}
          <p className="text-sm text-gray-500 leading-relaxed">
            {isRestore ? (
              <>
                Apakah kamu yakin ingin memulihkan{" "}
                <span className="font-bold text-gray-700">{murid.nama}</span>?
                <br />
                Murid akan kembali muncul pada daftar santri aktif.
              </>
            ) : (
              <>
                Apakah kamu yakin ingin mengarsipkan{" "}
                <span className="font-bold text-gray-700">{murid.nama}</span>?
                <br />
                Tindakan ini tidak bisa dibatalkan.
              </>
            )}
          </p>
        </div>

        {/* Tombol */}
        <div className="flex justify-center gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2 rounded-full border border-gray-300 text-gray-600 font-bold hover:bg-gray-100 transition disabled:opacity-50"
          >
            Batal
          </button>

          <button
            disabled={loading}
            onClick={onConfirm}
            className={[
              "px-6 py-2 rounded-full text-white font-bold transition disabled:opacity-50",
              isRestore
                ? "bg-emerald-500 hover:bg-emerald-600"
                : "bg-red-500 hover:bg-red-600",
            ].join(" ")}
          >
            {loading
              ? "Memproses..."
              : isRestore
              ? "Ya, Pulihkan"
              : "Ya, Arsipkan"}
          </button>
        </div>
      </div>
    </div>
  );
}