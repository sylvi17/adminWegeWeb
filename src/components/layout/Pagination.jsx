/**
 * Komponen pagination reusable.
 * @param {{ page: number, totalPage: number, totalItems: number, perPage: number, onPageChange: (p: number) => void }} props
 */
export default function Pagination({ page, totalPage, totalItems, perPage, onPageChange }) {
  const from = (page - 1) * perPage + 1;
  const to   = Math.min(page * perPage, totalItems);

  return (
    <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
      <span className="text-xs text-gray-400">
        Menampilkan {from}–{to} dari {totalItems} siswa
      </span>

      <div className="flex items-center gap-1.5">
        <PageBtn
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          label="‹"
        />
        {Array.from({ length: totalPage }, (_, i) => (
          <PageBtn
            key={i}
            onClick={() => onPageChange(i + 1)}
            isActive={page === i + 1}
            label={i + 1}
          />
        ))}
        <PageBtn
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPage}
          label="›"
        />
      </div>
    </div>
  );
}

function PageBtn({ onClick, disabled, isActive, label }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        "w-8 h-8 rounded-lg border text-sm flex items-center justify-center transition-all",
        isActive
          ? "bg-teal-500 text-white border-teal-500 font-bold"
          : "bg-white text-gray-500 border-gray-200 hover:bg-teal-50 hover:border-teal-400 hover:text-teal-600",
        disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer",
      ].join(" ")}
    >
      {label}
    </button>
  );
}