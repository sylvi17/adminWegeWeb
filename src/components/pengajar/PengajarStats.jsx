import { Calendar, CheckCheck, Users } from "lucide-react";
import StatsCard from "../cards/StatsCard";

export default function PengajarStats({
  totalPengajar,
  totalAktif,
  totalIzin,
}) {
  const stats = [
    {
      icon: Users,
      label: "TOTAL PENGAJAR",
      value: totalPengajar,
      bg: "bg-white",
      dark: false,
    },
    {
      icon: CheckCheck,
      label: "AKTIF MENGAJAR",
      value: totalAktif,
      bg: "bg-white",
      dark: false,
    },
    {
      icon: Calendar,
      label: "IZIN / CUTI",
      value: totalIzin,
      bg: "bg-white",
      dark: false,
    },
  ];

  return (
    <section className="grid grid-cols-3 gap-4">
      {stats.map((item) => (
        <StatsCard
          key={item.label}
          {...item}
        />
      ))}
    </section>
  );
}