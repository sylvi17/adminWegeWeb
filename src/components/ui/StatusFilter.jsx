export default function StatusFilter({
  current,
  onChange,
}) {
  const options = ["Semua", "LANCAR", "KURANG_LANCAR", "TIDAK_LANCAR"]

  return (
    <div className="flex gap-2">
      {options.map((status) => (
        <button
          key={status}
          onClick={() => onChange(status)}
          className={`
            rounded-full
            border
            px-4
            py-[7px]
            text-[0.82rem]
            font-semibold
            transition-all

            ${
              current === status
                ? `
                  bg-[#e8f5f3]
                  border-[#26a69a]
                  text-[#26a69a]
                `
                : `
                  border-[#e0e0e0]
                  text-[#777]
                  hover:bg-[#e8f5f3]
                  hover:border-[#26a69a]
                  hover:text-[#26a69a]
                `
            }
          `}
        >
          {status}
        </button>
      ))}
    </div>
  );
}