import { useState, useMemo } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import PageHeader from "../../components/layout/Header";
import StatusFilter from "../../components/ui/StatusFilter";
import ReportTable from "../../components/laporan/ReportTable";
import KenaikanTable from "../../components/laporan/KenaikanTable";
import { useNilai } from "../../hooks/useNilai";
import { useKenaikanJilid } from "../../hooks/useKenaikanJilid";

const PER_PAGE = 8;

const TABS = [
  { id: "harian", label: "Penilaian Harian" },
  { id: "kenaikan", label: "Kenaikan Jilid" },
];

export default function LaporanPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Semua");
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState("harian");
  const filterOptions =
    tab === "harian"
      ? ["Semua", "LANCAR", "KURANG_LANCAR", "TIDAK_LANCAR"]
      : ["Semua", "LULUS", "TIDAK_LULUS"];
  const { data: nilaiList, loading: l1, error: e1 } = useNilai();
  const { data: kenaikanList, loading: l2, error: e2 } = useKenaikanJilid();

  const activeList = tab === "harian" ? nilaiList : kenaikanList;

  const filtered = useMemo(
    () =>
      activeList.filter((d) => {
        const matchSearch = d.nama.toLowerCase().includes(search.toLowerCase());
        const matchStatus =
          status === "Semua" ||
          (tab === "harian" ? d.nilaiBacaan : d.statusKelulusan) === status;
        return matchSearch && matchStatus;
      }),
    [search, status, tab, activeList],
  );

  const totalPage = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const loading = l1 || l2;
  const error = e1 || e2;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex min-h-screen bg-[#f0f0f0]">
      <Sidebar />

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
          <button className="rounded-full bg-[#1a5c54] text-white px-5 py-2 font-bold text-sm">
            ⬇ Unduh Rekap PDF
          </button>
        </PageHeader>

        <div className="bg-white rounded-[18px] shadow-sm overflow-hidden">
          {/* Tab + Filter */}
          <div className="flex items-center justify-between px-6 py-5 border-b">
            {/* Tab switcher */}
            <div className="flex gap-1 bg-gray-100 rounded-full p-1">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTab(t.id);
                    setPage(1);
                    setStatus("Semua");
                  }}
                  className={[
                    "px-4 py-1.5 rounded-full text-xs font-bold transition-all",
                    tab === t.id
                      ? "bg-white text-teal-600 shadow-sm"
                      : "text-gray-400 hover:text-gray-600",
                  ].join(" ")}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <StatusFilter
              current={status}
              onChange={(value) => {
                setStatus(value);
                setPage(1);
              }}
              options={filterOptions}
            />
          </div>

          {/* Tabel */}
          {tab === "harian" ? (
            <ReportTable rows={rows} />
          ) : (
            <KenaikanTable rows={rows} />
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <span className="text-xs text-gray-400">
              Menampilkan {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}
              –{Math.min(page * PER_PAGE, filtered.length)} dari{" "}
              {filtered.length} data
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-30"
              >
                ‹
              </button>
              <button className="w-8 h-8 rounded-lg bg-teal-500 text-white text-sm font-bold">
                {page}
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPage, p + 1))}
                disabled={page === totalPage}
                className="w-8 h-8 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-30"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}