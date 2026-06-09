import { useState, useRef, useEffect } from "react";
import StatusBadge from "./Badge";
import Pagination from "../layout/Pagination";
import { SearchIcon } from "lucide-react";
import ModalEditMurid from "../santri/ModalEditMurid";
import ModalDeleteMurid from "../santri/ModalDeleteMurid";

const PER_PAGE = 8;

const TABLE_HEADERS = [
  "Nama Santri",
  "Jilid Saat Ini",
  "Halaman",
  "Terakhir Setor",
  "Status",
  "Aksi",
];

export default function SantriTable({ siswaList }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editMurid, setEditMurid] = useState(null);
  const [deleteMurid, setDeleteMurid] = useState(null);

  const filtered = siswaList.filter((s) =>
    s.nama.toLowerCase().includes(search.toLowerCase())
  );

  const totalPage = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const displayed = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="flex items-center gap-2.5 bg-gray-200 rounded-full px-5 py-2.5 w-80 self-start">
        <SearchIcon size={20} className="text-teal-600" />
        <input
          type="search"
          placeholder="Cari nama santri..."
          value={search}
          onChange={handleSearch}
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

      {editMurid && (
        <ModalEditMurid
          murid={editMurid}
          onClose={() => setEditMurid(null)}
          onSuccess={() => setEditMurid(null)}
        />
      )}

      {deleteMurid && (
        <ModalDeleteMurid
          murid={deleteMurid}
          onClose={() => setDeleteMurid(null)}
          onSuccess={() => setDeleteMurid(null)}
        />
      )}
    </div>
  );
}

function SantriRow({ siswa, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <tr className="border-b border-gray-50 last:border-none hover:bg-gray-50 transition-colors">
      <td className="px-5 py-4 align-middle">
        <p className="text-sm font-bold text-gray-900">{siswa.nama}</p>
        <p className="text-xs text-gray-400 mt-0.5">{siswa.pengajar}</p>
      </td>
      <td className="px-5 py-4 text-sm text-gray-500 align-middle">{siswa.jilid}</td>
      <td className="px-5 py-4 text-sm text-gray-500 align-middle">{siswa.halaman}</td>
      <td className="px-5 py-4 text-sm text-gray-500 align-middle">{siswa.terakhirSetor}</td>
      <td className="px-5 py-4 align-middle">
        <StatusBadge status={siswa.status} />
      </td>
      <td className="px-5 py-4 align-middle">
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            aria-label={`Opsi untuk ${siswa.nama}`}
            className="w-8 h-8 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors text-lg flex items-center justify-center"
          >
            ⋮
          </button>

          {open && (
            <div className="absolute right-0 top-9 z-50 bg-white rounded-xl shadow-lg border border-gray-100 py-1 w-36">
              <button
                onClick={() => { setOpen(false); onEdit(); }}
                className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => { setOpen(false); onDelete(); }}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
              >
                🗑️ Hapus
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}