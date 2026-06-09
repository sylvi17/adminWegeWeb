import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import PengajarHeader from "../../components/pengajar/PengajarHeader";
import PengajarStats from "../../components/pengajar/PengajarStats";
import PengajarTable from "../../components/pengajar/PengajarTable";
import PengajarActivityLog from "../../components/pengajar/PengajarActivityLog";
import ModalTambahGuru from "../../components/pengajar/ModalTambahGuru";
import ModalEditPengajar from "../../components/pengajar/ModalEditPengajar";
import ModalDeletePengajar from "../../components/pengajar/ModalDeletePengajar";
import { useGuruList } from "../../hooks/useGuruList";

const PER_PAGE = 10;

export default function PengajarPage() {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editPengajar, setEditPengajar] = useState(null);
  const [deletePengajar, setDeletePengajar] = useState(null);

  const { data: pengajarList, loading, error, refetch } = useGuruList();

  const totalPage = Math.max(1, Math.ceil(pengajarList.length / PER_PAGE));
  const paginatedData = pengajarList.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  const stats = {
    total: pengajarList.length,
    aktif: pengajarList.length,
    izin: 0,
  };

  return (
    <div className="flex min-h-screen bg-[#f0f0f0] font-nunito">
      <Sidebar />
      <main className="ml-60 flex-1 flex flex-col gap-6 px-8 pt-6 pb-12">
        <PengajarHeader onTambah={() => setShowModal(true)} />
        <PengajarStats
          total={stats.total}
          aktif={stats.aktif}
          izin={stats.izin}
          loading={loading}
        />
        <PengajarTable
          data={paginatedData}
          page={page}
          totalPage={totalPage}
          onPageChange={setPage}
          loading={loading}
          error={error}
          onRefresh={refetch}
          onEdit={(u) => setEditPengajar(u)}
          onDelete={(u) => setDeletePengajar(u)}
        />
        <div className="grid gap-5">
          <PengajarActivityLog activities={[]} />
        </div>
      </main>

      {showModal && (
        <ModalTambahGuru
          onClose={() => setShowModal(false)}
          onSuccess={refetch}
        />
      )}

      {editPengajar && (
        <ModalEditPengajar
          pengajar={editPengajar}
          onClose={() => setEditPengajar(null)}
          onSuccess={() => { setEditPengajar(null); refetch(); }}
        />
      )}

      {deletePengajar && (
        <ModalDeletePengajar
          pengajar={deletePengajar}
          onClose={() => setDeletePengajar(null)}
          onSuccess={() => { setDeletePengajar(null); refetch(); }}
        />
      )}
    </div>
  );
}