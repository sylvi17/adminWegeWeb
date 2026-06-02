export default function Navbar({ placeholder = "Cari santri atau laporan......", onChange }) {
  return (
    // .dash-topbar: flex justify-center
    <div className="flex justify-center">
 
      {/* .dash-search: flex, align-center, gap 10px, bg #e4e4e4, rounded-full, py 11px px 22px, w-[380px] */}
      <div className="flex items-center gap-2.5 bg-[#e4e4e4] rounded-full py-[11px] px-[22px] w-[380px]">
        <span className="text-[#aaa]">🔍</span>
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          className="bg-transparent border-none outline-none text-[0.9rem] text-[#555] placeholder-[#aaa] w-full"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        />
      </div>
    </div>
  );
}
 