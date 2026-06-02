import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import KelasCard from "../../components/ui/KelasCard";
import { useMurid } from "../../hooks/useMurid";

/** @typedef {{ id: number; nama: string; pengajar: string; jadwal: string; siswa: number; maks: number }} KelasItem */

/** @type {KelasItem[]} */

export default function SantriPage() {
  const [search, setSearch] = useState("");
  const { data: muridList, loading, error } = useMurid();

  if (loading) return <div>Loading...</div>;
  if (error)   return <div>Error: {error}</div>;
  const filtered = muridList.filter(
    (m) =>
      m.nama.toLowerCase().includes(search.toLowerCase()) ||
      m.guru.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen bg-gray-100 font-nunito">
      <Sidebar />

      <main className="ml-60 flex-1 min-w-0 px-8 py-6 flex flex-col gap-6">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2.5 bg-gray-200 rounded-full px-5 py-2.5 w-96">
            <span className="text-gray-400">🔍</span>
            <input
              type="search"
              placeholder="Cari kelas atau pengajar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm text-gray-600 placeholder:text-gray-400 w-full font-nunito"
            />
          </label>
          <button className="bg-teal-500 hover:bg-teal-600 active:scale-95 text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-md shadow-teal-200 transition-all whitespace-nowrap">
            + Tambah Kelas
          </button>
        </div>

        {/* Header */}
        <header>
          <p className="text-xs font-extrabold text-teal-500 tracking-widest mb-1.5 uppercase">
            Data Kelas Santri
          </p>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1.5">
            {muridList.length} Kelas Aktif
          </h1>
          <p className="text-sm text-gray-400">
            Klik kelas yang tersedia untuk melihat detail siswa-siswi
          </p>
        </header>

        {/* Grid kartu */}
        <section aria-label="Daftar kelas">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-5">
              {filtered.map((k) => (
                <KelasCard key={k.id} kelas={k} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-24 text-gray-400 text-base">
              Tidak ada kelas yang ditemukan.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
