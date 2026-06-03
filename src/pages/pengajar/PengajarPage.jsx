import Sidebar from "../../components/layout/Sidebar";
import PengajarHeader from "../../components/pengajar/PengajarHeader";
import PengajarStats from "../../components/pengajar/PengajarStats";
import PengajarTable from "../../components/pengajar/PengajarTable";
import PengajarAttendance from "../../components/pengajar/PengajarAtttendance";
import PengajarActivityLog from "../../components/pengajar/PengajarActivityLog";
import ModalTambahGuru from "../../components/pengajar/ModalTambahGuru";
import { useState, useEffect } from "react";
import { fetchPengajar } from "../../controller/pengajarController";

const MENUS = [
  { label: "Dashboard", icon: "⊞", path: "/dashboard" },
  { label: "Data Santri", icon: "🎓", path: "/santri" },
  { label: "Data Pengajar", icon: "📋", path: "/pengajar" },
  { label: "Laporan Progress", icon: "📊", path: "/laporan" },
];

const PER_PAGE = 10;

export default function PengajarPage() {
  const [pengajar, setPengajar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    fetchPengajar(setLoading, setError, setPengajar);
  }, []);

  function refresh() {
    fetchPengajar(setLoading, setError, setPengajar);
  }

  const totalPage = Math.max(1, Math.ceil(pengajar.length / PER_PAGE));
  const paginatedData = pengajar.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const stats = {
    total: pengajar.length,
    aktif: pengajar.length,
    izin: 0,
  };

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif" }} className="flex min-h-screen bg-[#f0f0f0]">
      <Sidebar menus={MENUS} />

      <main className="ml-60 flex-1 flex flex-col gap-6 px-8 pt-6 pb-12">
        <PengajarHeader onTambah={() => setShowModal(true)} />

        <PengajarStats total={stats.total} aktif={stats.aktif} izin={stats.izin} loading={loading} />

        <PengajarTable
          data={paginatedData}
          page={page}
          totalPage={totalPage}
          onPageChange={setPage}
          loading={loading}
          error={error}
          onRefresh={refresh}
        />

        <div className="grid gap-5">
          <PengajarAttendance data={paginatedData} today={today} />
          <PengajarActivityLog activities={[]} />
        </div>
      </main>

      {showModal && (
        <ModalTambahGuru
          onClose={() => setShowModal(false)}
          onSuccess={refresh}
        />
      )}
    </div>
  );
}