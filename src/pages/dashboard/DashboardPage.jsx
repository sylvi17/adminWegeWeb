import Sidebar   from "../../components/layout/Sidebar";
import Navbar    from "../../components/layout/Navbar";
import StatsCard from "../../components/cards/StatsCard";
import { Users2, Check, Star } from "lucide-react";

const STATS = [
  { icon: Users2, label: "Total Santri",         value: "250",  suffix: "",     bg: "bg-white",     dark: false },
  { icon: Check,  label: "Santri Aktif",         value: "150",  suffix: "",     bg: "bg-white",     dark: false },
  { icon: Star,   label: "Rata-rata Kelancaran", value: "85.5", suffix: "/100", bg: "bg-[#f0e2cc]", dark: false },
];

export default function DashboardPage() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div style={{ fontFamily: "'Nunito', sans-serif" }} className="flex min-h-screen bg-[#f0f0f0] overflow-x-hidden">
        <Sidebar />

        <main className="ml-60 flex-1 min-w-0 flex flex-col gap-6 px-8 pt-6 pb-12">
          <Navbar />

          <header>
            <p className="text-[0.72rem] font-extrabold text-[#26a69a] tracking-[1.5px] mb-1.5 uppercase">
              Dashboard Overview
            </p>
            <h1 className="text-[2rem] font-extrabold text-[#1a1a1a] mb-1.5">
              Assalamualaikum, Admin
            </h1>
            <p className="text-[0.9rem] text-[#999]">
              Berikut adalah ringkasan perkembangan santri TPQ
            </p>
          </header>

          <section className="grid grid-cols-4 gap-4">
            {STATS.map((s) => (
              <StatsCard key={s.label} {...s} />
            ))}
          </section>

          <section className="grid grid-cols-2 gap-5">
            <div
              className="rounded-[18px] px-7 pt-7 pb-6 flex flex-col gap-2 text-white"
              style={{ background: "linear-gradient(135deg, #26a69a 0%, #4db6ac 100%)" }}
            >
              <h2 className="text-[1.2rem] font-extrabold">Input Progress Santri</h2>
              <p className="text-[0.88rem] opacity-90 leading-relaxed">
                Catat pencapaian hari ini dengan cepat
              </p>
              <button className="mt-3 self-start bg-transparent border-2 border-white/80 hover:bg-white/20 hover:border-white rounded-full px-[22px] py-[9px] text-white font-bold text-[0.88rem] cursor-pointer transition-all">
                Mulai Input
              </button>
            </div>

            <div
              className="rounded-[18px] px-7 pt-7 pb-6 flex flex-col gap-2 text-white"
              style={{ background: "linear-gradient(135deg, #2e7d32 0%, #43a047 100%)" }}
            >
              <h2 className="text-[1.2rem] font-extrabold">Laporan Bulanan</h2>
              <p className="text-[0.88rem] opacity-90 leading-relaxed">
                Unduh rangkuman bulanan untuk orang tua
              </p>
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