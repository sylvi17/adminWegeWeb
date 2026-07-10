import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import ModalTambahAnak from "../../components/wali/ModalTambahAnak";
import ModalTambahWali from "../../components/wali/ModalTambahWali";
import { useWaliList } from "../../hooks/useWaliList";

export default function WaliPage() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { data: waliList, loading, error, refetch } = useWaliList();

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

  const filtered = waliList.filter((w) =>
    w.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100 font-nunito">
      <Sidebar />

      <main className="ml-60 flex-1 min-w-0 px-8 py-6 flex flex-col gap-6">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2.5 bg-gray-200 rounded-full px-5 py-2.5 w-96">
            <input
              type="search"
              placeholder="Cari wali murid..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm text-gray-600 placeholder:text-gray-400 w-full font-nunito"
            />
          </label>
          <button
            onClick={() => setShowModal(true)}
            className="bg-teal-500 hover:bg-teal-600 active:scale-95 text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-md shadow-teal-200 transition-all whitespace-nowrap"
          >
            + Tambah Wali Murid
          </button>
        </div>

        {/* Header */}
        <header>
          <p className="text-xs font-extrabold text-teal-500 tracking-widest mb-1.5 uppercase">
            Data Wali Murid
          </p>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1.5">
            {waliList.length} Wali Murid
          </h1>
          <p className="text-sm text-gray-400">
            Klik wali murid untuk melihat daftar anak bimbingan
          </p>
        </header>

        {/* Grid kartu */}
        <section aria-label="Daftar wali murid">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-5">
              {filtered.map((w) => (
                <ModalTambahAnak key={w.id} wali={w} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-24 text-gray-400 text-base">
              Tidak ada wali murid yang ditemukan.
            </div>
          )}
        </section>
      </main>

      {showModal && (
        <ModalTambahWali
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