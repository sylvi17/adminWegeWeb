const statusStyles = {
  Aktif: "bg-[#d4f0ec] text-[#00897b]",
  Cuti: "bg-[#e8e0d0] text-[#8d6e63]",
  Izin: "bg-[#fff8e1] text-[#f9a825]",
};

export default function PengajarTable({
  data,
  page,
  displayed,
  totalPage,
  onPageChange,
}) {
  return (
    <div className="overflow-hidden rounded-[18px] bg-white shadow-sm">

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-[#f9f9f9]">
            <th className="px-5 py-4 text-left text-[0.72rem] font-extrabold tracking-[0.8px] text-[#bbb]">
              NAMA USTADZ/ USTADZAH
            </th>

            <th className="px-5 py-4 text-left text-[0.72rem] font-extrabold tracking-[0.8px] text-[#bbb]">
              KELAS DIAMPU
            </th>

            <th className="px-5 py-4 text-left text-[0.72rem] font-extrabold tracking-[0.8px] text-[#bbb]">
              STATUS
            </th>

            <th className="px-5 py-4 text-left text-[0.72rem] font-extrabold tracking-[0.8px] text-[#bbb]">
              JUMLAH SANTRI
            </th>

            <th className="px-5 py-4 text-left text-[0.72rem] font-extrabold tracking-[0.8px] text-[#bbb]">
              AKSI
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((p) => (
            <tr
              key={p.id}
              className="border-b border-[#f5f5f5] hover:bg-[#fafafa]"
            >
              <td className="px-5 py-4">
                <div className="text-[0.92rem] font-bold text-[#1a1a1a]">
                  {p.nama}
                </div>

                <div className="mt-0.5 text-[0.75rem] text-[#aaa]">
                  NIP : {p.nip}
                </div>
              </td>

              <td className="px-5 py-4 text-[0.88rem] text-[#444]">
                {p.kelas}
              </td>

              <td className="px-5 py-4">
                <span
                  className={`
                    inline-block
                    rounded-full
                    px-4
                    py-1
                    text-[0.78rem]
                    font-bold
                    ${statusStyles[p.status]}
                  `}
                >
                  {p.status}
                </span>
              </td>

              <td className="px-5 py-4 text-[0.88rem] text-[#444]">
                {p.jumlah}
              </td>

              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <button
                    title="Edit"
                    className="
                      rounded-lg
                      p-2
                      text-[#aaa]
                      hover:bg-[#e8f5f3]
                    "
                  >
                    ✏️
                  </button>

                  <button
                    title="Hapus"
                    className="
                      rounded-lg
                      p-2
                      text-[#aaa]
                      hover:bg-[#fde8e8]
                    "
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
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
            className="
              flex h-8 w-8 items-center justify-center
              rounded-lg border border-[#eee]
              disabled:opacity-30
            "
          >
            ‹
          </button>

          {Array.from({ length: totalPage }, (_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`
                flex h-8 w-8 items-center justify-center
                rounded-lg border
                text-sm
                ${
                  page === i + 1
                    ? "border-[#26a69a] bg-[#26a69a] text-white"
                    : "border-[#eee] bg-white text-[#555]"
                }
              `}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              onPageChange((prev) => Math.min(totalPage, prev + 1))
            }
            disabled={page === totalPage}
            className="
              flex h-8 w-8 items-center justify-center
              rounded-lg border border-[#eee]
              disabled:opacity-30
            "
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}