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
  const { wali, muridList, loading, error, refetch } = useMuridByWali(id);
  const [showModal, setShowModal] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isEmpty = error || muridList.length === 0;

  return (
    <div className="flex min-h-screen bg-gray-100 font-nunito">
      <Sidebar />

      <main className="ml-60 flex-1 min-w-0 px-8 py-6 flex flex-col gap-6">
        {/* Tombol tambah */}
        <div className="flex items-center justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="bg-teal-500 hover:bg-teal-600 active:scale-95 text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-md shadow-teal-200 transition-all whitespace-nowrap"
          >
            + Tambah Anak
          </button>
        </div>

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

        {/* Empty state — hanya pesan, tanpa tombol */}
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-sm py-20 gap-3">
            <p className="text-base font-extrabold text-gray-700">
              Belum ada murid
            </p>
            <p className="text-sm text-gray-400">
              Wali ini belum memiliki anak yang terdaftar.
            </p>
          </div>
        ) : (
          <SantriTable siswaList={muridList} onRefresh={refetch} />
        )}
      </main>

      {showModal && (
        <ModalTambahMurid
          guruId={null}
          waliId={Number(id)}
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