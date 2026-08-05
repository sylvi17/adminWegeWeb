import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import ArchivedSantriTable from "../../components/santri/ArchieSantriTable";
import { muridController } from "../../controller/muridController";

export default function ArsipSantri() {
  const navigate = useNavigate();

  const [muridList, setMuridList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await muridController.getArchived();
      setMuridList(data);
    } catch (err) {
      setError(err.message || "Gagal mengambil data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
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
            onClick={() => navigate("/santri")}
            className="self-start text-sm font-bold text-teal-500 hover:underline mb-1"
          >
            ← Kembali
          </button>

          <p className="text-xs font-extrabold text-teal-500 tracking-widest uppercase">
            Arsip Santri
          </p>

          <h1 className="text-3xl font-extrabold text-gray-900">
            {muridList.length} Murid Diarsipkan
          </h1>

          <p className="text-sm text-gray-400">
            Daftar murid yang sudah diarsipkan dan dapat dipulihkan kembali.
          </p>
        </header>

        <ArchivedSantriTable siswaList={muridList} onRestore={fetchData} />
      </main>
    </div>
  );
}
