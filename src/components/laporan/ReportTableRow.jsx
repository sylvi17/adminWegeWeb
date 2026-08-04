import StatusBadge from "./Badge";

function formatJilid(jilid) {
  if (!jilid || jilid === "-") return "-";
  return jilid.replace(/_/g, " "); // JILID_1 → JILID 1
}

export default function ReportTableRow({ row, onRowClick }) {
  return (
    <tr
      onClick={() => onRowClick?.(row)}
      className="hover:bg-[#fafafa] transition-colors cursor-pointer"
    >
      <td className="px-6 py-[18px] border-b border-[#f5f5f5]">
        <div className="font-bold text-[#1a1a1a] text-[0.92rem]">{row.nama}</div>
      </td>
      <td className="px-6 py-[18px] border-b border-[#f5f5f5] text-[0.88rem] text-[#444]">
        {formatJilid(row.jilid)}
      </td>
      <td className="px-6 py-[18px] border-b border-[#f5f5f5] text-[0.88rem] text-[#444]">
        {row.halaman}
      </td>
      <td className="px-6 py-[18px] border-b border-[#f5f5f5]">
        <StatusBadge status={row.nilaiBacaan} />
      </td>
      <td className="px-6 py-[18px] border-b border-[#f5f5f5] text-[0.88rem] text-[#444]">
        {row.guru}
      </td>
      <td className="px-6 py-[18px] border-b border-[#f5f5f5] text-[0.88rem] text-[#444]">
        {row.tanggal}
      </td>
    </tr>
  );
}