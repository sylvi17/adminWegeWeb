import { useState } from "react";

export default function ModalPreviewImportWali({
  data,
  existingEmails,
  onClose,
  onImport,
  loading,
  progress,
  importResult,
}) {
  const emailSet = new Set();
  const validatedData = data.map((item, index) => {
    const errors = [];
    if (!item.nama) {
      errors.push("Nama wajib diisi");
    }
    const email = item.email?.toLowerCase().trim();

    if (!email) {
      errors.push("Email wajib diisi");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.push("Format email tidak valid");
    } else {
      if (emailSet.has(email)) {
        errors.push("Email duplikat di file Excel");
      }

      if (existingEmails.includes(email)) {
        errors.push("Email sudah digunakan");
      }

      emailSet.add(email);
    }

    if (!item.password) {
      errors.push("Password wajib diisi");
    } else if (String(item.password).length < 6) {
      errors.push("Password minimal 6 karakter");
    }

    if (!item.tanggal_lahir) {
      errors.push("Tanggal lahir wajib diisi");
    }

    if (!item.peran) {
      errors.push("Peran wajib diisi");
    } else if (!["ayah", "ibu", "wali"].includes(item.peran.toLowerCase())) {
      errors.push("Peran harus Ayah, Ibu, atau Wali");
    }

    return {
      ...item,
      row: index + 2,
      valid: errors.length === 0,
      errors,
    };
  });

  const validData = validatedData.filter((x) => x.valid);

  const total = validatedData.length;
  const valid = validData.length;
  const invalid = total - valid;

  const handleImport = async () => {
    if (validData.length === 0) return;

    try {
      setLoading(true);
      setProgress(10);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + 10;
        });
      }, 200);

      await onImport(validData);

      clearInterval(interval);

      setProgress(100);

      setTimeout(() => {
        setLoading(false);
        setProgress(0);
        onClose();
      }, 500);
    } catch (err) {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[1100px] max-h-[90vh] flex flex-col shadow-xl">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">Preview Import Wali</h2>

          <p className="text-sm text-gray-500 mt-1">
            Periksa data sebelum diimport ke sistem.
          </p>
        </div>

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

        <div className="overflow-auto px-6 pb-4">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="border p-2">No</th>
                <th className="border p-2">Nama</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Password</th>
                <th className="border p-2">Tanggal Lahir</th>
                <th className="border p-2">Peran</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Keterangan</th>
              </tr>
            </thead>

            <tbody>
              {validatedData.map((item, index) => (
                <tr key={index} className={item.valid ? "" : "bg-red-50"}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">{item.nama || "-"}</td>
                  <td className="border p-2">{item.email || "-"}</td>
                  <td className="border p-2">{item.password || "-"}</td>
                  <td className="border p-2">{item.tanggal_lahir || "-"}</td>
                  <td className="border p-2">{item.peran || "-"}</td>
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

        {loading && (
          <div className="px-6 pb-4">
            <div className="flex justify-between mb-2 text-sm">
              <span>Mengimpor data...</span>
              <span>{progress}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-teal-500 h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
        {importResult && (
          <div className="mx-6 mb-4 rounded-xl border border-gray-200">
            <div className="px-5 py-3 border-b font-bold">Hasil Import</div>

            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3">Nama</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Keterangan</th>
                </tr>
              </thead>

              <tbody>
                {importResult.map((r, i) => (
                  <tr key={i}>
                    <td className="p-3">{r.data.nama}</td>
                    <td className="p-3">
                      {r.success ? (
                        <span className="text-green-600">Berhasil</span>
                      ) : (
                        <span className="text-red-600">Gagal</span>
                      )}
                    </td>
                    <td className="p-3">{r.success ? "-" : r.error}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="border-t p-5 flex justify-end gap-3">
          <button
            disabled={loading}
            onClick={onClose}
            className="px-5 py-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50"
          >
            Batal
          </button>

          <button
            disabled={loading || validData.length === 0}
            onClick={() => onImport(validData)}
            className={`px-5 py-2 rounded-lg text-white font-semibold ${
              valid === 0 || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-500 hover:bg-teal-600"
            }`}
          >
            {loading ? (
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
