import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import KelasCard from "../../components/ui/KelasCard";
import { useMurid } from "../../hooks/useMurid";
import { useGuruList } from "../../hooks/useGuruList";
import { SearchIcon } from "lucide-react";

/** @typedef {{ id: number; nama: string; pengajar: string; jadwal: string; siswa: number; maks: number }} KelasItem */

/** @type {KelasItem[]} */

export default function SantriPage() {
  const [search, setSearch] = useState("");
  const { data: guruList, loading, error } = useGuruList();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const filtered = guruList.filter((g) =>
    g.nama.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen bg-gray-100 font-nunito">
      <Sidebar />

      <main className="ml-60 flex-1 min-w-0 px-8 py-6 flex flex-col gap-6">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2.5 bg-gray-200 rounded-full px-5 py-2.5 w-96">
            <SearchIcon size={20} className="text-grey-600" />
            <input
              type="search"
              placeholder="Cari kelas atau pengajar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm text-gray-600 placeholder:text-gray-400 w-full font-nunito"
            />
          </label>
        </div>

        {/* Header */}
        <header>
          <p className="text-xs font-extrabold text-teal-500 tracking-widest mb-1.5 uppercase">
            Data Guru Santri
          </p>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1.5">
            {guruList.length} Guru Aktif
          </h1>
          <p className="text-sm text-gray-400">
            Klik pengajar untuk melihat siswa-siswi yang diampu
          </p>
        </header>

        {/* Grid kartu */}
        <section aria-label="Daftar kelas">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-5">
              {filtered.map((g) => (
                <KelasCard key={g.id} guru={g} />
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
