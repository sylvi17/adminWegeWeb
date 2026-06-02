import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import KelasCard from "../../components/ui/KelasCard";
 
/** @typedef {{ id: number; nama: string; pengajar: string; jadwal: string; siswa: number; maks: number }} KelasItem */
 
/** @type {KelasItem[]} */
export const kelasData = [
  { id: 1,  nama: "Kelompok Kelas A", pengajar: "Ust. Abdul Aziz",    jadwal: "Kamis, Sabtu, Minggu 15.30–17.00", siswa: 10, maks: 20 },
  { id: 2,  nama: "Kelompok Kelas B", pengajar: "Ust. Abdul Aziz",    jadwal: "Kamis, Sabtu, Minggu 15.30–17.00", siswa: 14, maks: 20 },
  { id: 3,  nama: "Kelompok Kelas C", pengajar: "Ust. Budi Santoso",  jadwal: "Senin, Rabu, Jumat 16.00–17.30",   siswa: 18, maks: 20 },
  { id: 4,  nama: "Kelompok Kelas D", pengajar: "Ust. Budi Santoso",  jadwal: "Senin, Rabu, Jumat 16.00–17.30",   siswa: 20, maks: 20 },
  { id: 5,  nama: "Kelompok Kelas E", pengajar: "Ust. Hasan Basri",   jadwal: "Selasa, Kamis, Sabtu 14.00–15.30", siswa: 8,  maks: 20 },
  { id: 6,  nama: "Kelompok Kelas F", pengajar: "Ust. Hasan Basri",   jadwal: "Selasa, Kamis, Sabtu 14.00–15.30", siswa: 12, maks: 20 },
  { id: 7,  nama: "Kelompok Kelas G", pengajar: "Ust. Irfan Hakim",   jadwal: "Minggu 08.00–10.00",               siswa: 15, maks: 20 },
  { id: 8,  nama: "Kelompok Kelas H", pengajar: "Ust. Irfan Hakim",   jadwal: "Minggu 10.00–12.00",               siswa: 20, maks: 20 },
  { id: 9,  nama: "Kelompok Kelas I", pengajar: "Ust. Zainal Arifin", jadwal: "Sabtu, Minggu 13.00–14.30",        siswa: 9,  maks: 15 },
  { id: 10, nama: "Kelompok Kelas J", pengajar: "Ust. Zainal Arifin", jadwal: "Sabtu, Minggu 15.00–16.30",        siswa: 13, maks: 15 },
  { id: 11, nama: "Kelompok Kelas K", pengajar: "Ust. Mahmud Yunus",  jadwal: "Jumat, Sabtu 16.00–17.00",         siswa: 7,  maks: 15 },
];
 
export default function SantriPage() {
  const [search, setSearch] = useState("");
 
  const filtered = kelasData.filter((k) => {
    const q = search.toLowerCase();
    return (
      k.nama.toLowerCase().includes(q) ||
      k.pengajar.toLowerCase().includes(q)
    );
  });
 
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
            {kelasData.length} Kelas Aktif
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