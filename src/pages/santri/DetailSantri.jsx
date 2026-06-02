import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import SantriTable from "../../components/laporan/SantriTable";
import { useMuridDetail } from "../../hooks/useMuridDetail";

/** @typedef {{ id: number; nama: string; pengajar: string; jilid: string; halaman: number; terakhirSetor: string; status: "Lancar" | "Cukup Lancar" | "Perlu Perhatian" }} SiswaItem */

// const NAMA_DUMMY = [
//   "Ahmad Fathoni","Siti Aisyah","Muhammad Rizky","Fatimah Zahra","Abdullah Hakim",
//   "Khadijah Putri","Umar Farouq","Zainab Nisa","Ali Murtadho","Maryam Salsabila",
//   "Hasan Basri","Ruqayyah Dewi","Husain Akbar","Hafshah Amira","Bilal Saputra",
//   "Asma Rahayu","Salman Alfarisi","Sumayyah Lestari","Ammar Zubair","Ramlah Fitri",
//   "Khalid Wahyudi","Ummu Kultsum","Zubair Ahmad","Hindun Safitri","Thalhah Putra",
// ];
// const JILID_LIST = [
//   "Yanbu'a Jilid 1","Yanbu'a Jilid 2","Yanbu'a Jilid 3","Yanbu'a Jilid 4",
//   "Juz 30 (Al-Lail)","Juz 30 (An-Naba)","Juz 'Amma",
// ];
// const STATUS_LIST = ["Lancar", "Cukup Lancar", "Perlu Perhatian"];
// const TANGGAL_LIST = [
//   "10 Jan 2024","15 Jan 2024","20 Feb 2024","12 Feb 2024",
//   "5 Mar 2024","18 Mar 2024","1 Apr 2024",
// ];

/** @returns {SiswaItem[]} */
// function generateSiswa(kelasId, jumlah) {
//   const pengajar = kelasData.find((k) => k.id === kelasId)?.pengajar ?? "-";
//   return Array.from({ length: jumlah }, (_, i) => ({
//     id: i + 1,
//     nama:          NAMA_DUMMY[i % NAMA_DUMMY.length],
//     pengajar,
//     jilid:         JILID_LIST[i % JILID_LIST.length],
//     halaman:       (i % 20) + 1,          // deterministik, tidak pakai Math.random
//     terakhirSetor: TANGGAL_LIST[i % TANGGAL_LIST.length],
//     status:        STATUS_LIST[i % STATUS_LIST.length],
//   }));
// }

export default function DetailSantri() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const { data: murid, loading, error } = useMuridDetail(id);

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

  if (!murid) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Murid tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-nunito">
      <Sidebar />

      <main className="ml-60 flex-1 min-w-0 px-8 py-6 flex flex-col gap-6">
        <div className="flex items-center justify-end">
          <button className="bg-teal-500 hover:bg-teal-600 active:scale-95 text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-md shadow-teal-200 transition-all whitespace-nowrap">
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
            Detail Murid
          </p>
          <h1 className="text-3xl font-extrabold text-gray-900">
            {murid.nama}
          </h1>
        </header>

        {/* Info detail */}
        <div className="bg-white rounded-2xl p-6 shadow-sm grid grid-cols-2 gap-4 text-sm">
          <InfoRow label="Umur"         value={`${murid.umur} tahun`} />
          <InfoRow label="Jenis Kelamin" value={murid.jenisKelamin === "LAKI_LAKI" ? "Laki-laki" : "Perempuan"} />
          <InfoRow label="Jilid"        value={murid.jilid} />
          <InfoRow label="Guru"         value={murid.guru} />
          <InfoRow label="No. HP Guru"  value={murid.guruNoHp} />
          <InfoRow label="Wali"         value={`${murid.wali} (${murid.waliPeran})`} />
        </div>
      </main>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wide">{label}</span>
      <span className="font-semibold text-gray-800">{value}</span>
    </div>
  );
}