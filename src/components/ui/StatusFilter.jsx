export default function StatusFilter({ current, onChange, options = [] }) {
  function formatLabel(val) {
    if (val === "Semua") return "Semua";
    return val
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`rounded-full border px-4 py-[7px] text-[0.82rem] font-semibold transition-all
            ${current === s
              ? "bg-[#e8f5f3] border-[#26a69a] text-[#26a69a]"
              : "border-[#e0e0e0] text-[#777] hover:bg-[#e8f5f3] hover:border-[#26a69a] hover:text-[#26a69a]"
            }`}
        >
          {formatLabel(s)}
        </button>
      ))}
    </div>
  );
}