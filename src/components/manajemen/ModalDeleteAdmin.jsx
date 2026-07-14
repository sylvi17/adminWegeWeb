export default function ModalDeleteAdmin({ admin, onCancel, onConfirm }) {
  if (!admin) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 text-center">
        <h2 className="text-lg font-bold mb-2">Hapus Admin?</h2>
        <p className="text-sm text-gray-500 mb-6">
          Yakin ingin menghapus <b>{admin.nama}</b>? Tindakan ini tidak bisa dibatalkan.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-full text-sm font-semibold text-gray-500 hover:bg-gray-100"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-full text-sm font-bold text-white bg-red-500 hover:bg-red-600"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}