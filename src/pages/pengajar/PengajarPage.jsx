import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import PengajarHeader from "../../components/pengajar/PengajarHeader";
import PengajarStats from "../../components/pengajar/PengajarStats";
import PengajarTable from "../../components/pengajar/PengajarTable";
import PengajarAttendance from "../../components/pengajar/PengajarAtttendance";
import PengajarActivityLog from "../../components/pengajar/PengajarActivityLog";
import { useState } from "react";

const MENUS = [
  { label: "Dashboard", icon: "⊞", path: "/dashboard" },
  { label: "Data Santri", icon: "🎓", path: "/santri" },
  { label: "Data Pengajar", icon: "📋", path: "/pengajar" },
  { label: "Laporan Progress", icon: "📊", path: "/laporan" },
];

export default function PengajarPage() {
  const [pengajar] = useState([]);
  const [page, setPage] = useState(1);

  const totalPage = 1;

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div
      style={{ fontFamily: "'Nunito', sans-serif" }}
      className="flex min-h-screen bg-[#f0f0f0]"
    >
      <Sidebar menus={MENUS} />

      <main className="ml-60 flex-1 flex flex-col gap-6 px-8 pt-6 pb-12">
        <PengajarHeader />

        <PengajarStats />

        <PengajarTable
          data={[]}
          page={1}
          totalPage={1}
          onPageChange={() => {}}
        />

        <div className="grid gap-5">
          <PengajarAttendance data={[]} today={today} />
          <PengajarActivityLog activities={[]} />
        </div>
      </main>
    </div>
  );
}
