export default function PageHeader({ label, title, subtitle, children }) {
  return (
    <header className="flex items-start justify-between gap-4">
      <div>
        {label && (
          <p className="text-[0.72rem] font-extrabold tracking-[1.5px] text-[#26a69a] uppercase mb-[6px]">
            {label}
          </p>
        )}
        <h1 className="text-[2rem] font-extrabold text-[#1a1a1a] mb-[6px]">
          {title ?? "Assalamualaikum, Admin"}
        </h1>
        {subtitle && (
          <p className="text-[0.9rem] text-[#999]">{subtitle}</p>
        )}
      </div>

      {/* Tombol-tombol dari children */}
      {children && (
        <div className="flex items-center gap-3 mt-2 shrink-0">
          {children}
        </div>
      )}
    </header>
  );
}