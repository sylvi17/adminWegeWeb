import { useState } from "react";
import Pagination from "../layout/Pagination";
import { SearchIcon } from "lucide-react";
import SantriRow from "./SantriRow";
import ModalEditMurid from "../santri/ModalEditMurid";
import ModalDeleteMurid from "../santri/ModalDeleteMurid";

const PER_PAGE = 8;

const TABLE_HEADERS = [
  "Nama Santri",
  "Jilid Saat Ini",
  "Umur",
  "Jenis Kelamin",
  "Guru",
  "Aksi",
];

export default function SantriTable({
  siswaList,
  onRefresh,
  archiveMode = false,
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editMurid, setEditMurid] = useState(null);
  const [deleteMurid, setDeleteMurid] = useState(null);

  const filtered = siswaList.filter((s) =>
    s.nama.toLowerCase().includes(search.toLowerCase()),
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
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="bg-transparent outline-none text-sm text-gray-600 placeholder:text-gray-400 w-full font-nunito"
        />
      </label>

      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {TABLE_HEADERS.map((h) => (
                <th
                  key={h}
                  className="px-5 py-4 text-left text-xs font-extrabold text-gray-300 tracking-widest uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayed.length > 0 ? (
              displayed.map((s) => (
                <SantriRow
                  key={s.id}
                  siswa={s}
                  onEdit={() => setEditMurid(s)}
                  onDelete={() => setDeleteMurid(s)}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={TABLE_HEADERS.length}
                  className="py-16 text-center text-sm text-gray-400"
                >
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

      {editMurid && (
        <ModalEditMurid
          murid={editMurid}
          onClose={() => setEditMurid(null)}
          onSuccess={() => {
            setEditMurid(null);
            onRefresh?.(); // ← auto refresh setelah edit
          }}
        />
      )}

      {deleteMurid && (
        <ModalDeleteMurid
          murid={deleteMurid}
          onClose={() => setDeleteMurid(null)}
          onSuccess={() => {
            setDeleteMurid(null);
            onRefresh?.(); // ← auto refresh setelah delete
          }}
        />
      )}
    </div>
  );
}
