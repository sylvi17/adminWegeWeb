import { useState, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import PengajarActivityLog from "../../components/pengajar/PengajarActivityLog";
import useActivityLogs from "../../hooks/useActivityLogs";
import { guruService } from "../../services/guruService";
import { muridService } from "../../services/muridService";
import { waliController } from "../../controller/waliController";

export default function DashboardPage() {
  const { activities } = useActivityLogs();

  const [stats, setStats] = useState({
    jumlahGuru: "-",
    jumlahWali: "-",
    jumlahMurid: "-",
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoadingStats(true);
      try {
        const [guruRes, waliList, muridRes] = await Promise.all([
          guruService.getAll(),
          waliController.getAll(),
          muridService.getAll(),
        ]);

        // hanya murid yang punya guru (aktif)
        const jumlahMurid = (muridRes.data ?? []).filter(
          (m) => m.guruId !== null
        ).length;

        setStats({
          jumlahGuru: guruRes.data?.length ?? 0,
          jumlahWali: waliList.length ?? 0,
          jumlahMurid,
        });
      } catch (err) {
        console.error("Gagal fetch stats dashboard:", err);
      } finally {
        setLoadingStats(false);
      }
    }

    fetchStats();
  }, []);

  const cards = [
    {
      label: "Jumlah Guru",
      value: loadingStats ? "..." : stats.jumlahGuru,
      gradient: "linear-gradient(135deg, #26a69a 0%, #4db6ac 100%)",
    },
    {
      label: "Jumlah Laporan Bulan Ini",
      value: 13,
      gradient: "linear-gradient(135deg, #2e7d32 0%, #43a047 100%)",
    },
    {
      label: "Jumlah Wali Murid",
      value: loadingStats ? "..." : stats.jumlahWali,
      gradient: "linear-gradient(135deg, #2e7d32 0%, #43a047 100%)",
    },
    {
      label: "Total Murid",
      value: loadingStats ? "..." : stats.jumlahMurid,
      gradient: "linear-gradient(135deg, #26a69a 0%, #4db6ac 100%)",
    },
  ];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div
        style={{ fontFamily: "'Nunito', sans-serif" }}
        className="flex min-h-screen bg-[#f0f0f0] overflow-x-hidden"
      >
        <Sidebar />

        <main className="ml-60 flex-1 min-w-0 flex flex-col gap-6 px-8 pt-6 pb-12">
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

          <section className="grid grid-cols-2 gap-5">
            {cards.map((card) => (
              <div
                key={card.label}
                className="rounded-[18px] px-7 pt-7 pb-6 flex flex-col gap-3 text-white"
                style={{ background: card.gradient }}
              >
                <h2 className="text-[1rem] font-extrabold opacity-90">
                  {card.label}
                </h2>
                <p className="text-[2.5rem] font-extrabold leading-none">
                  {card.value}
                </p>
              </div>
            ))}
          </section>

          <div className="grid gap-5">
            <PengajarActivityLog activities={activities} />
          </div>
        </main>
      </div>
    </>
  );
}