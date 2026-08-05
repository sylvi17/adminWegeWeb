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

        <div className="px-6 py-5 border-b">
          <h2 className="text-lg font-extrabold text-gray-800">
            {isRestore ? "Pulihkan Murid" : "Arsipkan Murid"}
          </h2>
        </div>

        <div className="px-6 py-6">
          <p className="text-sm text-gray-600 leading-relaxed">
            {isRestore ? (
              <>
                Apakah Anda yakin ingin <b>memulihkan</b> murid
                <span className="font-bold"> {murid.nama}</span>?
              </>
            ) : (
              <>
                Apakah Anda yakin ingin <b>mengarsipkan</b> murid
                <span className="font-bold"> {murid.nama}</span>?

                <br />
                <br />

                Murid tidak akan tampil pada daftar santri, namun seluruh data
                masih tersimpan dan dapat dipulihkan kembali.
              </>
            )}
          </p>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full border border-gray-300 text-gray-600 font-bold hover:bg-gray-100"
          >
            Batal
          </button>

          <button
            disabled={loading}
            onClick={onConfirm}
            className={`px-5 py-2 rounded-full text-white font-bold transition
              ${
                isRestore
                  ? "bg-emerald-500 hover:bg-emerald-600"
                  : "bg-red-500 hover:bg-red-600"
              }
            `}
          >
            {loading
              ? "Memproses..."
              : isRestore
              ? "Pulihkan"
              : "Arsipkan"}
          </button>

        </div>
      </div>
    </div>
  );
}