import StatusBadge from "./Badge";

export default function ReportTableRow({ row }) {
  return (
    <tr className="hover:bg-[#fafafa] transition-colors">
      <td className="px-6 py-[18px] border-b border-[#f5f5f5]">
        <div className="font-bold text-[#1a1a1a] text-[0.92rem]">
          {row.nama}
        </div>

        <div className="text-[0.75rem] text-[#aaa] mt-1">
          {row.kelas} · {row.jilid}
        </div>
      </td>

      <td className="px-6 py-[18px] border-b border-[#f5f5f5] text-[0.88rem] text-[#444]">
        {row.surah}
      </td>

      <td className="px-6 py-[18px] border-b border-[#f5f5f5] text-[0.88rem] text-[#444]">
        {row.halaman}
      </td>

      <td className="px-6 py-[18px] border-b border-[#f5f5f5]">
        <StatusBadge status={row.status} />
      </td>

      <td className="px-6 py-[18px] border-b border-[#f5f5f5] text-[0.88rem] text-[#444]">
        {row.pengajar}
      </td>
    </tr>
  );
}