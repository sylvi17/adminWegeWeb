import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import SantriTable from "../../components/laporan/SantriTable";
import ModalTambahMurid from "../../components/santri/ModalTambahMurid";
import { useMuridByWali } from "../../hooks/useMuridByWali";

function hitungUmur(tanggal_lahir) {
  if (!tanggal_lahir) return "-";
  const lahir = new Date(tanggal_lahir);
  const sekarang = new Date();
  return sekarang.getFullYear() - lahir.getFullYear();
}

export default function DetailWali() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { wali, muridList, loading, error } = useMuridByWali(id);
  const [showModal, setShowModal] = useState(false);

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
        <header className="flex flex-col gap-1">
          <button
            onClick={() => navigate("/wali-murid")}
            className="self-start text-sm font-bold text-teal-500 hover:underline mb-1"
          >
            ← Kembali
          </button>
          <p className="text-xs font-extrabold text-teal-500 tracking-widest uppercase">
            Anak Bimbingan
          </p>
          <h1 className="text-3xl font-extrabold text-gray-900">
            {wali?.nama ?? "Wali"} — {muridList.length} Anak
          </h1>
          <p className="text-sm text-[#aaa] capitalize">
            {wali?.peran} • {hitungUmur(wali?.tanggal_lahir)} tahun
          </p>
        </header>

        <SantriTable siswaList={muridList} />
      </main>

      {showModal && (
        <ModalTambahMurid
          guruId={null}
          waliId={Number(id)}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}