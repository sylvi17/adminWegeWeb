export default function ProgressChart({
  data = [],
  title = "Progres Mingguan",
  subtitle = "Statistik rata rata halaman perhari",
}) {
  const maxVal = Math.max(...data.map((d) => d.val), 1);
 
  return (
    // .dash-chart-card: bg white, rounded 18px, padding 24px 24px 20px
    <div className="bg-white rounded-[18px] p-6 pb-5">
 
      {/* .dash-chart-header: flex justify-between, align-center, mb 20px */}
      <div className="flex items-center justify-between mb-5">
        <div>
          {/* .dash-chart-title: 1.1rem, font-weight 800 */}
          <h2 className="text-[1.1rem] font-extrabold text-[#222]">{title}</h2>
          {/* .dash-chart-sub: 0.8rem, color #bbb, mt 3px */}
          <p className="text-[0.8rem] text-[#bbb] mt-0.5">{subtitle}</p>
        </div>
 
        {/* .dash-select: border #ddd, rounded-full, padding 7px 16px, 0.82rem */}
        <select className="border border-[#ddd] rounded-full px-4 py-[7px] text-[0.82rem] text-[#555] outline-none cursor-pointer bg-white"
          style={{ fontFamily: "'Nunito', sans-serif" }}>
          <option>Minggu ini</option>
          <option>Minggu lalu</option>
        </select>
      </div>
 
      {/* .dash-bars: flex, align flex-end, gap 8px, height 160px */}
      <div className="flex items-end gap-2 h-40">
        {data.map((d) => (
          // .dash-bar-col: flex col, align-center, gap 8px, flex 1
          <div key={d.day} className="flex flex-col items-center gap-2 flex-1">
 
            {/* .dash-bar / .dash-bar.today: bg #26a69a / #e53935, rounded-t, transition */}
            <div
              className={`w-full rounded-t-[6px] transition-all duration-[400ms] ${
                d.today ? "bg-[#e53935]" : "bg-[#26a69a]"
              }`}
              style={{
                height: `${(d.val / maxVal) * 140}px`,
                minHeight: "4px",
                transitionTimingFunction: "cubic-bezier(.22,1,.36,1)",
              }}
            />
 
            {/* .dash-bar-label / .today-label: 0.72rem, color #aaa / #e53935 font-800 */}
            <span
              className={`text-[0.72rem] whitespace-nowrap ${
                d.today ? "text-[#e53935] font-extrabold" : "text-[#aaa]"
              }`}
            >
              {d.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}