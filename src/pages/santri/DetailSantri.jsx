import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import SantriTable from "../../components/laporan/SantriTable";
import ModalTambahMurid from "../../components/santri/ModalTambahMurid";
import { useMuridByGuru } from "../../hooks/useMuridByGuru";

export default function DetailSantri() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: muridList, loading, error, refetch } = useMuridByGuru(id);
  const [showModal, setShowModal] = useState(false);
  const { state } = useLocation();
  const namaGuru = state?.namaGuru ?? "-";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-nunito">
      <Sidebar />

      <main className="ml-60 flex-1 min-w-0 px-8 py-6 flex flex-col gap-6">
        <div className="flex items-center justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="bg-teal-500 hover:bg-teal-600 active:scale-95 text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-md shadow-teal-200 transition-all whitespace-nowrap"
          >
            + Tambah Murid
          </button>
        </div>

        <header className="flex flex-col gap-1">
          <button
            onClick={() => navigate("/santri")}
            className="self-start text-sm font-bold text-teal-500 hover:underline mb-1"
          >
            ← Kembali
          </button>
          <p className="text-xs font-extrabold text-teal-500 tracking-widest uppercase">
            Murid Bimbingan
          </p>
          <h1 className="text-3xl font-extrabold text-gray-900">
            {namaGuru} — {muridList.length} Murid
          </h1>
        </header>

        <SantriTable siswaList={muridList} />
      </main>

      {showModal && (
        <ModalTambahMurid
          guruId={Number(id)}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            refetch();
          }}
        />
      )}
    </div>
  );
}
