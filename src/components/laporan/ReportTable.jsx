import ReportTableRow from "./ReportTableRow";

export default function ReportTable({ rows, onRowClick }) {
  if (!rows.length) {
    return (
      <div className="p-10 text-center text-[#aaa] text-[0.9rem]">
        Tidak ada data ditemukan.
      </div>
    );
  }

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-[#fafafa]">
          <th className="px-6 py-4 text-left text-[0.72rem] font-extrabold text-[#bbb] tracking-[0.8px]">
            NAMA SANTRI
          </th>

          <th className="px-6 py-4 text-left text-[0.72rem] font-extrabold text-[#bbb] tracking-[0.8px]">
            JILID
          </th>

          <th className="px-6 py-4 text-left text-[0.72rem] font-extrabold text-[#bbb] tracking-[0.8px]">
            HALAMAN
          </th>

          <th className="px-6 py-4 text-left text-[0.72rem] font-extrabold text-[#bbb] tracking-[0.8px]">
            STATUS KELANCARAN
          </th>

          <th className="px-6 py-4 text-left text-[0.72rem] font-extrabold text-[#bbb] tracking-[0.8px]">
            PENGAJAR
          </th>

          <th className="px-6 py-4 text-left text-[0.72rem] font-extrabold text-[#bbb] tracking-[0.8px]">
            TANGGAL
          </th>
        </tr>
      </thead>

      <tbody>
        {rows.map((row) => (
          <ReportTableRow key={row.id} row={row} onRowClick={onRowClick} />
        ))}
      </tbody>
    </table>
  );
}