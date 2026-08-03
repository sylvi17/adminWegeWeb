function formatStatus(val) {
  if (!val || val === "-") return null;
  const map = {
    LANCAR: "Lancar",
    CUKUP_LANCAR: "Cukup Lancar",
    KURANG_LANCAR: "Kurang Lancar",
    TIDAK_LANCAR: "Tidak Lancar",
  };
  // kalau sudah Title Case, kembalikan apa adanya
  return map[val] ?? val;
}

const styles = {
  "Lancar": "bg-[#d4f0ec] text-[#00897b]",
  "Cukup Lancar": "bg-[#e8f5e9] text-[#388e3c]",
  "Kurang Lancar": "bg-[#fff3e0] text-[#ef6c00]",
  "Tidak Lancar": "bg-[#fde8e8] text-[#e53935]",
};

export default function StatusBadge({ status }) {
  const label = formatStatus(status);
  if (!label) return <span className="text-[#ccc] text-sm">—</span>;

  return (
    <span
      className={`
        inline-block rounded-full px-4 py-1.5
        text-[0.78rem] font-bold
        ${styles[label] ?? "bg-gray-100 text-gray-500"}
      `}
    >
      {label}
    </span>
  );
}