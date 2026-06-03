import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import PengajarHeader from "../../components/pengajar/PengajarHeader";
import PengajarStats from "../../components/pengajar/PengajarStats";
import PengajarAttendance from "../../components/pengajar/PengajarAtttendance";
import PengajarActivityLog from "../../components/pengajar/PengajarActivityLog";
import { useGuruList } from "../../hooks/useGuruList";

const PER_PAGE = 10;

function PengajarTable({ data, page, totalPage, onPageChange, loading, error, onRefresh }) {
  function initials(nama) {
    return nama.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <p className="text-sm font-semibold text-gray-700">Daftar Ustadz / Ustadzah</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left">Nama Ustadz/Ustadzah</th>
              <th className="px-6 py-3 text-left">No. HP</th>
              <th className="px-6 py-3 text-left">Alamat</th>
              <th className="px-6 py-3 text-left">Jumlah Murid</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-400">
                  Memuat data...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-red-400">
                  {error}
                  <button onClick={onRefresh} className="ml-2 underline text-teal-500">
                    Coba lagi
                  </button>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-400">
                  Tidak ada data guru.
                </td>
              </tr>
            ) : (
              data.map((g) => (
                <tr key={g.id} className="border-t border-gray-50 hover:bg-gray-50 transition">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                        {initials(g.nama)}
                      </div>
                      <span className="font-medium text-gray-800">{g.nama}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-gray-700">{g.noHp}</td>
                  <td className="px-6 py-3 text-gray-500">{g.alamat}</td>
                  <td className="px-6 py-3 text-gray-700">{g.jumlahMurid} murid</td>
                  <td className="px-6 py-3">
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                      Aktif
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <button className="text-xs border border-gray-200 rounded-lg px-3 py-1 text-gray-600 hover:bg-gray-100 transition">
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between">
        <p className="text-xs text-gray-400">Halaman {page} dari {totalPage}</p>
        <div className="flex gap-1">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="text-xs px-3 py-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40"
          >
            ‹
          </button>
          <button className="text-xs px-3 py-1 rounded-lg bg-teal-600 text-white">
            {page}
          </button>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPage}
            className="text-xs px-3 py-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PengajarPage() {
  const [page, setPage] = useState(1);
  const { data: pengajarList, loading, error, refetch } = useGuruList();

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const totalPage  = Math.max(1, Math.ceil(pengajarList.length / PER_PAGE));
  const paginatedData = pengajarList.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const stats = {
    total: pengajarList.length,
    aktif: pengajarList.length,
    izin:  0,
  };

  return (
    <div className="flex min-h-screen bg-[#f0f0f0] font-nunito">
      <Sidebar />

      <main className="ml-60 flex-1 flex flex-col gap-6 px-8 pt-6 pb-12">
        <PengajarHeader />

        <PengajarStats
          total={stats.total}
          aktif={stats.aktif}
          izin={stats.izin}
          loading={loading}
        />

        <PengajarTable
          data={paginatedData}
          page={page}
          totalPage={totalPage}
          onPageChange={setPage}
          loading={loading}
          error={error}
          onRefresh={refetch}
        />

        <div className="grid gap-5">
          <PengajarAttendance data={paginatedData} today={today} />
          <PengajarActivityLog activities={[]} />
        </div>
      </main>
    </div>
  );
}