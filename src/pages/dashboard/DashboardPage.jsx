import Sidebar       from "../../components/layout/Sidebar";
import Navbar        from "../../components/layout/Navbar";
import StatsCard     from "../../components/cards/StatsCard";
import ProgressChart from "../../components/charts/ProgressChart";
 
const MENUS = [
  { label: "Dashboard",        icon: "⊞", path: "/dashboard" },
  { label: "Data Santri",      icon: "🎓", path: "/santri"    },
  { label: "Data Pengajar",    icon: "📋", path: "/pengajar"  },
  { label: "Laporan Progress", icon: "📊", path: "/laporan"   },
];
 
const STATS = [
  { icon: "👥", label: "Total Santri",        value: "250",  suffix: "",     bg: "bg-white",     dark: false },
  { icon: "✅", label: "Santri Aktif",         value: "150",  suffix: "",     bg: "bg-white",     dark: false },
  { icon: "⭐", label: "Rata-rata Kelancaran", value: "85.5", suffix: "/100", bg: "bg-[#f0e2cc]", dark: false },
  { icon: "📅", label: "Kehadiran Hari ini",   value: "80%",  suffix: "",     bg: "bg-[#26a69a]", dark: true  },
];
 
const WEEK_DATA = [
  { day: "Senin",  val: 4 },
  { day: "Selasa", val: 3 },
  { day: "Rabu",   val: 9 },
  { day: "Kamis",  val: 6 },
  { day: "Jumat",  val: 1, today: true },
  { day: "Sabtu",  val: 3 },
  { day: "Minggu", val: 7 },
];
 
const ACTIVITIES = [
  { name: "Arsya",        action: "menyelesaikan Yanbu'a", detail: "Jilid 2 hal 17",   time: "5 MENIT YANG LALU" },
  { name: "Ahmad",        action: "menyelesaikan Yanbu'a", detail: "Jilid 4 hal 2",    time: "2 JAM YANG LALU"   },
  { name: "Ustadz Ilham", action: "baru Memperbarui",      detail: "progress kelas 3", time: "1 JAM YANG LALU"   },
  { name: "Naila",        action: "naik ke Yanbu'a",       detail: "Jilid 5",          time: "7 MENIT YANG LALU" },
];
 
export default function DashboardPage() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap"
        rel="stylesheet"
      />
 
      {/* .dash-root: display flex, min-h-screen, overflow-x hidden */}
      <div style={{ fontFamily: "'Nunito', sans-serif" }} className="flex min-h-screen bg-[#f0f0f0] overflow-x-hidden">
 
        {/* SIDEBAR — fixed, w-60, shadow */}
        <Sidebar menus={MENUS} />
 
        {/* .dash-main: ml-60, flex col, gap-6, padding */}
        <main className="ml-60 flex-1 min-w-0 flex flex-col gap-6 px-8 pt-6 pb-12">
 
          {/* .dash-topbar: flex justify-center */}
          <Navbar />
 
          {/* .dash-header */}
          <header>
            {/* .dash-overview-label */}
            <p className="text-[0.72rem] font-extrabold text-[#26a69a] tracking-[1.5px] mb-1.5 uppercase">
              Dashboard Overview
            </p>
            {/* .dash-greeting */}
            <h1 className="text-[2rem] font-extrabold text-[#1a1a1a] mb-1.5">
              Assalamualaikum, Admin
            </h1>
            {/* .dash-subtitle */}
            <p className="text-[0.9rem] text-[#999]">
              Berikut adalah ringkasan perkembangan santri TPQ
            </p>
          </header>
 
          {/* .dash-stats: grid 4 col, gap-4 */}
          <section className="grid grid-cols-4 gap-4">
            {STATS.map((s) => (
              <StatsCard key={s.label} {...s} />
            ))}
          </section>
 
          {/* .dash-bottom: grid [1fr 320px], gap-5 */}
          <section className="grid gap-5 items-start" style={{ gridTemplateColumns: "1fr 320px" }}>
 
            {/* ProgressChart — .dash-chart-card */}
            <ProgressChart data={WEEK_DATA} />
 
            {/* .dash-activity-card */}
            <div className="bg-white rounded-[18px] p-[22px] flex flex-col gap-3.5">
              {/* .dash-activity-title */}
              <h2 className="text-[1rem] font-extrabold text-[#222]">Aktivitas Terbaru</h2>
 
              {/* .dash-activity-list */}
              <ul className="flex flex-col gap-3">
                {ACTIVITIES.map((a, i) => (
                  /* .dash-activity-item */
                  <li
                    key={i}
                    className={`pb-3 ${i < ACTIVITIES.length - 1 ? "border-b border-[#ddd]" : "pb-0 border-none"}`}
                  >
                    {/* .dash-activity-text */}
                    <p className="text-[0.85rem] text-[#333] leading-relaxed">
                      <strong>{a.name}</strong> {a.action}{" "}
                      {/* .dash-activity-detail */}
                      <span className="text-[#26a69a] font-bold">{a.detail}</span>
                    </p>
                    {/* .dash-activity-time */}
                    <p className="text-[0.7rem] text-[#bbb] mt-0.5 tracking-[0.3px]">{a.time}</p>
                  </li>
                ))}
              </ul>
 
              {/* .dash-activity-btn */}
              <button className="bg-[#e0d5bc] hover:bg-[#cfc4a6] transition-colors rounded-full py-2.5 px-4 font-bold text-[0.85rem] text-[#555] text-center cursor-pointer border-none">
                Lihat Semua Aktivitas
              </button>
            </div>
          </section>
 
          {/* .dash-actions: grid 2 col, gap-5 */}
          <section className="grid grid-cols-2 gap-5">
 
            {/* .dash-action-card.teal */}
            <div className="rounded-[18px] px-7 pt-7 pb-6 flex flex-col gap-2 text-white"
              style={{ background: "linear-gradient(135deg, #26a69a 0%, #4db6ac 100%)" }}>
              <h2 className="text-[1.2rem] font-extrabold">Input Progress Santri</h2>
              <p className="text-[0.88rem] opacity-90 leading-relaxed">Catat pencapaian hari ini dengan cepat</p>
              <button className="mt-3 self-start bg-transparent border-2 border-white/80 hover:bg-white/20 hover:border-white rounded-full px-[22px] py-[9px] text-white font-bold text-[0.88rem] cursor-pointer transition-all">
                Mulai Input
              </button>
            </div>
 
            {/* .dash-action-card.green */}
            <div className="rounded-[18px] px-7 pt-7 pb-6 flex flex-col gap-2 text-white"
              style={{ background: "linear-gradient(135deg, #2e7d32 0%, #43a047 100%)" }}>
              <h2 className="text-[1.2rem] font-extrabold">Laporan Bulanan</h2>
              <p className="text-[0.88rem] opacity-90 leading-relaxed">Unduh rangkuman bulanan untuk orang tua</p>
              <button className="mt-3 self-start bg-transparent border-2 border-white/80 hover:bg-white/20 hover:border-white rounded-full px-[22px] py-[9px] text-white font-bold text-[0.88rem] cursor-pointer transition-all">
                Unduh PDF
              </button>
            </div>
 
          </section>
        </main>
      </div>
    </>
  );
}