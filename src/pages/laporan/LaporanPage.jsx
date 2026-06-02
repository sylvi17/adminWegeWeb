import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import PageHeader from "../../components/layout/Header";
import StatusFilter from "../../components/ui/StatusFilter";
import ReportTable from "../../components/laporan/ReportTable";

const SURAH    = ["An-Naba","Al-Baqarah","Al-Alaq","Al-Asr","Al-Ikhlas","Al-Falaq","An-Nas","Al-Kafirun","Al-Maun","Al-Fil"];
const KELAS    = ["Kelas A","Kelas B","Kelas C","Kelas D","Kelas E"];
const JILID    = ["Jilid 1","Jilid 2","Jilid 3","Jilid 4","Jilid 5","Jilid 6"];
const NAMA     = ["Ahmad Fairus","Siti Aisyah","Akmal Akbar","Nayla Putri","Ibadallah","Rizky Pratama","Nurul Hidayah","Farhan Maulana","Zahra Amelia","Hafidz Karim","Aisyah Rahmah","Bilal Hamdan","Maryam Sholihah","Umar Faruq","Khadijah Nur","Salman Ridho","Ruqayyah Dewi","Hasan Albana","Fatimah Azahra","Zaid Mubarak","Asma Wulandari","Ammar Hakim","Hindun Safitri","Thalhah Putra","Sumayyah Fitri"];
const PENGAJAR = ["Ust.Abdul Aziz","Ustdh.Nurul Amanah","Ust.Muhammad Ali","Ustdh.Amalia","Ust.Hasan Basri"];
const STATUS   = ["Lancar","Tidak Lancar","Kurang Lancar"];

const LAPORAN = Array.from({ length: 50 }, (_, i) => ({
  id:       i + 1,
  nama:     NAMA[i % NAMA.length],
  kelas:    KELAS[i % KELAS.length],
  jilid:    JILID[i % JILID.length],
  surah:    SURAH[i % SURAH.length],
  halaman:  (i % 20) + 1,
  status:   STATUS[i % STATUS.length],
  pengajar: PENGAJAR[i % PENGAJAR.length],
}));

const MENUS = [
  { label: "Dashboard",        icon: "⊞", path: "/dashboard" },
  { label: "Data Santri",      icon: "🎓", path: "/santri"    },
  { label: "Data Pengajar",    icon: "📋", path: "/pengajar"  },
  { label: "Laporan Progress", icon: "📊", path: "/laporan"   },
];

const STATUS_CLASS = { "Lancar": "lancar", "Tidak Lancar": "tidak", "Kurang Lancar": "kurang" };
const PER_PAGE = 8;

export default function LaporanPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Semua");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      LAPORAN.filter(
        (d) =>
          (status === "Semua" || d.status === status) &&
          [d.nama, d.pengajar, d.surah].some((v) =>
            v.toLowerCase().includes(search.toLowerCase())
          )
      ),
    [search, status]
  );

  const totalPage = Math.ceil(filtered.length / PER_PAGE);

  const rows = filtered.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  return (
    <div className="flex min-h-screen bg-[#f0f0f0]">
      <Sidebar menus={MENUS} />

      <main className="ml-[240px] flex-1 px-8 pt-6 pb-12 flex flex-col gap-6">

        <Navbar
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />

        <PageHeader
          title="Laporan Progress Santri"
          subtitle="Berikut adalah ringkasan perkembangan hafalan dan mingguan"
        >
          <button className="rounded-full border border-gray-300 px-5 py-2 font-bold">
            ☰ Filter Laporan
          </button>

          <button className="rounded-full bg-[#1a5c54] text-white px-5 py-2 font-bold">
            ⬇ Unduh Rekap PDF
          </button>
        </PageHeader>

        <div className="bg-white rounded-[18px] shadow-sm overflow-hidden">

          <div className="flex items-center justify-between px-6 py-5 border-b">
            <h2 className="text-sm font-extrabold tracking-wide text-gray-600">
              RINCIAN PROGRESS HARIAN
            </h2>

            <StatusFilter
              current={status}
              onChange={(value) => {
                setStatus(value);
                setPage(1);
              }}
            />
          </div>
          <ReportTable rows={rows} />
        </div>

      </main>
    </div>
  );
}