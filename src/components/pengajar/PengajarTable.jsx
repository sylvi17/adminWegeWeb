import PengajarRow from "./PengajarRow";

export default function PengajarTable({
  data,
  page,
  totalPage,
  onPageChange,
  loading,
  error,
  onRefresh,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-[18px] bg-white shadow-sm">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-[#f9f9f9]">
            <th className="px-5 py-4 text-left text-[0.72rem] font-extrabold tracking-[0.8px] text-[#bbb]">
              NAMA USTADZ/ USTADZAH
            </th>
            <th className="px-5 py-4 text-left text-[0.72rem] font-extrabold tracking-[0.8px] text-[#bbb]">
              JUMLAH MURID
            </th>
            <th className="px-5 py-4 text-left text-[0.72rem] font-extrabold tracking-[0.8px] text-[#bbb]">
              NO. HP
            </th>
            <th className="px-5 py-4 text-left text-[0.72rem] font-extrabold tracking-[0.8px] text-[#bbb]">
              ALAMAT
            </th>
            <th className="px-5 py-4 text-left text-[0.72rem] font-extrabold tracking-[0.8px] text-[#bbb]">
              STATUS
            </th>
            <th className="px-5 py-4 text-left text-[0.72rem] font-extrabold tracking-[0.8px] text-[#bbb]">
              AKSI
            </th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="px-5 py-10 text-center text-[0.88rem] text-[#aaa]">
                Memuat data...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={6} className="px-5 py-10 text-center text-[0.88rem] text-red-400">
                {error}
                <button onClick={onRefresh} className="ml-2 underline text-[#26a69a]">
                  Coba lagi
                </button>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-5 py-10 text-center text-[0.88rem] text-[#aaa]">
                Tidak ada data guru.
              </td>
            </tr>
          ) : (
            data.map((u) => (
              <PengajarRow
                key={u.id}
                u={u}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-[#f0f0f0] px-5 py-4">
        <span className="text-[0.82rem] text-[#aaa]">
          Halaman {page} dari {totalPage}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onPageChange((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#eee] disabled:opacity-30"
          >
            ‹
          </button>

          {Array.from({ length: totalPage }, (_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg border text-sm ${
                page === i + 1
                  ? "border-[#26a69a] bg-[#26a69a] text-white"
                  : "border-[#eee] bg-white text-[#555]"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => onPageChange((prev) => Math.min(totalPage, prev + 1))}
            disabled={page === totalPage}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#eee] disabled:opacity-30"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}