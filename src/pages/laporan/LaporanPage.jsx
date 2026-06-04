import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import PageHeader from "../../components/layout/Header";
import StatusFilter from "../../components/ui/StatusFilter";
import ReportTable from "../../components/laporan/ReportTable";
import { useMurid } from "../../hooks/useMurid";

const STATUS_CLASS = {
  Lancar: "lancar",
  "Tidak Lancar": "tidak",
  "Kurang Lancar": "kurang",
};

const PER_PAGE = 8;

export default function LaporanPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Semua");
  const [page, setPage] = useState(1);

  const { data: muridList, loading, error } = useMurid();
  const filtered = useMemo(
    () =>
      muridList.filter((d) =>
        [d.nama, d.guru].some((v) =>
          v.toLowerCase().includes(search.toLowerCase()),
        ),
      ),
    [search, muridList],
  );

  const totalPage = Math.ceil(filtered.length / PER_PAGE);
  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="flex min-h-screen bg-[#f0f0f0]">
      <Sidebar/>

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
