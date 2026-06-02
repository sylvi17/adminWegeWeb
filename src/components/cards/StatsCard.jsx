export default function StatsCard({ icon, label, value, suffix = "", bg = "bg-white", dark = false }) {
  return (
    // .dash-stat-card: border-radius 18px, padding 22px 20px, flex col, gap 6px, min-h 140px
    <div className={`${bg} rounded-[18px] px-5 py-[22px] flex flex-col gap-1.5 min-h-[140px] justify-center`}>
 
      {/* .dash-stat-icon: font-size 1.8rem, mb 4px */}
      <span className="text-[1.8rem] mb-1">{icon}</span>
 
      {/* .dash-stat-label: 0.82rem, font-weight 600 */}
      <p className={`text-[0.82rem] font-semibold ${dark ? "text-white/85" : "text-[#999]"}`}>
        {label}
      </p>
 
      {/* .dash-stat-value: 2rem, font-weight 800, line-height 1.1 */}
      <p className={`text-[2rem] font-extrabold leading-[1.1] mt-1 ${dark ? "text-white" : "text-[#1a1a1a]"}`}>
        {value}
        {/* .dash-stat-suffix: 0.9rem, font-weight 400 */}
        {suffix && (
          <span className={`text-[0.9rem] font-normal ${dark ? "text-white/70" : "text-[#aaa]"}`}>
            {suffix}
          </span>
        )}
      </p>
    </div>
  );
}