import { useState } from "react";
import Pagination from "../layout/Pagination";
import { SearchIcon } from "lucide-react";

const PER_PAGE = 8;

const TABLE_HEADERS = [
  "Nama Santri",
  "Jilid Saat Ini",
  "Umur",
  "Jenis Kelamin",
  "Wali",
  "Aksi",
];

export default function SantriTable({ siswaList }) {
  const [search, setSearch] = useState("");
  const [page,   setPage]   = useState(1);

  const filtered = siswaList.filter((s) =>
    s.nama.toLowerCase().includes(search.toLowerCase())
  );

  const totalPage = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const displayed = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="flex flex-col gap-4">
      <label className="flex items-center gap-2.5 bg-gray-200 rounded-full px-5 py-2.5 w-80 self-start">
        <SearchIcon size={20} className="text-teal-600" />
        <input
          type="search"
          placeholder="Cari nama santri..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="bg-transparent outline-none text-sm text-gray-600 placeholder:text-gray-400 w-full font-nunito"
        />
      </label>

      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {TABLE_HEADERS.map((h) => (
                <th key={h} className="px-5 py-4 text-left text-xs font-extrabold text-gray-300 tracking-widest uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayed.length > 0 ? (
              displayed.map((s) => <SantriRow key={s.id} siswa={s} />)
            ) : (
              <tr>
                <td colSpan={TABLE_HEADERS.length} className="py-16 text-center text-sm text-gray-400">
                  Tidak ada santri yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination
          page={page}
          totalPage={totalPage}
          totalItems={filtered.length}
          perPage={PER_PAGE}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

function SantriRow({ siswa }) {
  const jenisKelamin = siswa.jenisKelamin === "LAKI_LAKI" ? "Laki-laki" : "Perempuan";

  return (
    <tr className="border-b border-gray-50 last:border-none hover:bg-gray-50 transition-colors">
      <td className="px-5 py-4 align-middle">
        <p className="text-sm font-bold text-gray-900">{siswa.nama}</p>
      </td>
      <td className="px-5 py-4 text-sm text-gray-500 align-middle">
        {siswa.jilid ?? "-"}
      </td>
      <td className="px-5 py-4 text-sm text-gray-500 align-middle">
        {siswa.umur} tahun
      </td>
      <td className="px-5 py-4 align-middle">
        <span className={[
          "inline-block px-3 py-1 rounded-full text-xs font-bold",
          siswa.jenisKelamin === "LAKI_LAKI"
            ? "bg-blue-100 text-blue-600"
            : "bg-pink-100 text-pink-600",
        ].join(" ")}>
          {jenisKelamin}
        </span>
      </td>
      <td className="px-5 py-4 text-sm text-gray-500 align-middle">
        {siswa.wali ?? "-"}
      </td>
      <td className="px-5 py-4 align-middle">
        <button
          aria-label={`Opsi untuk ${siswa.nama}`}
          className="w-8 h-8 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors text-lg flex items-center justify-center"
        >
          ⋮
        </button>
      </td>
    </tr>
  );
}