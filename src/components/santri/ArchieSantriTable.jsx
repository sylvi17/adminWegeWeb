import ArchiveRow from "./ArchiveRow";
import { useState } from "react";
const PER_PAGE = 8;

export default function ArchivedSantriTable({ siswaList, onRestore, onRefresh, }) {
  const handleRestore = async (id) => {
    if (!confirm("Pulihkan murid ini?")) return;

    await muridController.restore(id);
    onRestore();
  };
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = siswaList.filter((s) =>
    s.nama.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPage = Math.max(1, Math.ceil(filtered.length / PER_PAGE));

  const displayed = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="bg-white rounded-3xl shadow overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-400 border-b">
            <th className="px-6 py-4">Nama Santri</th>
            <th>Jilid</th>
            <th>Umur</th>
            <th>Jenis Kelamin</th>
            <th>Guru</th>
            <th className="text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {displayed.length > 0 ? (
            displayed.map((s) => (
              <ArchiveRow key={s.id} siswa={s} onRefresh={onRefresh} />
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="py-16 text-center text-sm text-gray-400"
              >
                Tidak ada santri yang diarsipkan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
