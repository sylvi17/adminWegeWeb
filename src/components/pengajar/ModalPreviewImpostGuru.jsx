import { useEffect } from "react";

export default function ModalPreviewImportGuru({
  data,
  existingEmails,
  onClose,
  onImport,
  importing,
  progress,
  importResult,
}) {
  const emailSet = new Set();
  const validatedData = data.map((item) => {
    const errors = [];

    if (!item.nama) errors.push("Nama kosong");

    if (!item.email) {
      errors.push("Email kosong");
    } else if (!/\S+@\S+\.\S+/.test(item.email)) {
      errors.push("Format email tidak valid");
    } else if (existingEmails.includes(item.email.toLowerCase())) {
      errors.push("Email sudah digunakan");
    }

    if (!item.password) errors.push("Password kosong");

    if (!item.no_hp) errors.push("Nomor HP kosong");

    if (!item.alamat) errors.push("Alamat kosong");

    return {
      ...item,
      valid: errors.length === 0,
      errors,
    };
  });

  const total = validatedData.length;
  const valid = validatedData.filter((x) => x.valid).length;
  const invalid = total - valid;

  // Auto-close modal setelah import selesai & hasil ditampilkan sebentar
  useEffect(() => {
    if (!importing && importResult && importResult.length > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, 1500); // beri waktu user melihat hasil sebelum modal tertutup otomatis

      return () => clearTimeout(timer);
    }
  }, [importing, importResult, onClose]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[1100px] max-h-[90vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">Preview Import Guru</h2>

          <p className="text-sm text-gray-500 mt-1">
            Periksa data sebelum diimport ke sistem.
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 p-6 pb-2">
          <div className="rounded-xl bg-slate-100 p-4">
            <p className="text-sm text-slate-500">Total Data</p>

            <h3 className="text-3xl font-bold">{total}</h3>
          </div>

          <div className="rounded-xl bg-green-100 p-4">
            <p className="text-sm text-green-700">Valid</p>

            <h3 className="text-3xl font-bold text-green-700">{valid}</h3>
          </div>

          <div className="rounded-xl bg-red-100 p-4">
            <p className="text-sm text-red-700">Error</p>

            <h3 className="text-3xl font-bold text-red-700">{invalid}</h3>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto px-6 pb-4">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="border p-2">No</th>
                <th className="border p-2">Nama</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Password</th>
                <th className="border p-2">No HP</th>
                <th className="border p-2">Alamat</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Keterangan</th>
              </tr>
            </thead>

            <tbody>
              {validatedData.map((item, index) => (
                <tr
                  key={index}
                  className={item.valid ? "bg-white" : "bg-red-50"}
                >
                  <td className="border p-2 text-center">{index + 1}</td>

                  <td className="border p-2">{item.nama || "-"}</td>

                  <td className="border p-2">{item.email || "-"}</td>

                  <td className="border p-2">
                    {"•".repeat(String(item.password).length)}
                  </td>

                  <td className="border p-2">{item.no_hp}</td>

                  <td className="border p-2">{item.alamat}</td>

                  <td className="border p-2 text-center">
                    {item.valid ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Valid
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Error
                      </span>
                    )}
                  </td>

                  <td className="border p-2">
                    {item.valid ? (
                      <span className="text-green-600">Siap diimport</span>
                    ) : (
                      <ul className="list-disc pl-4 text-red-500">
                        {item.errors.map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Progress bar saat sedang import */}
        {importing && (
          <div className="px-6 pb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Mengimpor data...</span>
              <span>{progress}%</span>
            </div>

            <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-teal-500 transition-all duration-300"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Ringkasan hasil import */}
        {importResult && (
          <div className="mx-6 mb-4 rounded-xl bg-gray-50 p-4 space-y-2">
            <div className="font-bold">Hasil Import</div>

            <div className="text-green-600">
              Berhasil : {importResult.filter((r) => r.success).length}
            </div>

            <div className="text-red-500">
              Gagal : {importResult.filter((r) => !r.success).length}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t p-5 flex justify-end gap-3">
          <button
            disabled={importing}
            onClick={onClose}
            className="px-5 py-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50"
          >
            Batal
          </button>

          <button
            disabled={importing || valid === 0}
            onClick={onImport}
            className={`px-5 py-2 rounded-lg text-white font-semibold transition ${
              valid === 0 || importing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-500 hover:bg-teal-600"
            }`}
          >
            {importing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Mengimpor...
              </div>
            ) : (
              `Import (${valid})`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}