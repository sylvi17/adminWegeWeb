export default function PengajarFilters({
  filterStatus,
  onStatusChange,
  total,
}) {
  return (
    <div className="flex items-center justify-between border-b px-5 py-4">
      <div className="flex gap-3">
        <select
          value={filterStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="
            rounded-full
            border
            px-4
            py-2
            text-sm
          "
        >
          <option>Semua Status</option>
          <option>Aktif</option>
          <option>Cuti</option>
          <option>Izin</option>
        </select>
      </div>

      <span className="text-xs font-bold tracking-wider text-gray-400">
        MENAMPILKAN {total} PENGAJAR
      </span>
    </div>
  );
}