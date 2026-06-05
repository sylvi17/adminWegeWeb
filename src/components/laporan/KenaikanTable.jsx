import StatusBadge from "./Badge";

const HEADERS = ["Nama Santri", "Jilid", "Tajwid", "Makhraj", "Status", "Tanggal", "Pengajar"];

export default function KenaikanTable({ rows }) {
  return (
    <table className="w-full text-sm">
      <thead className="bg-gray-50 border-b border-gray-100">
        <tr>
          {HEADERS.map((h) => (
            <th key={h} className="px-6 py-4 text-left text-xs font-extrabold text-gray-300 tracking-widest uppercase">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 ? (
          rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-none">
              <td className="px-6 py-4 font-bold text-gray-900 text-sm">{row.nama}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{row.jilid}</td>
              <td className="px-6 py-4"><StatusBadge status={row.tajwid} /></td>
              <td className="px-6 py-4"><StatusBadge status={row.makhraj} /></td>
              <td className="px-6 py-4"><StatusBadge status={row.statusKelulusan} /></td>
              <td className="px-6 py-4 text-sm text-gray-500">{row.tanggal}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{row.guru}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={HEADERS.length} className="py-16 text-center text-sm text-gray-400">
              Tidak ada data kenaikan jilid.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}