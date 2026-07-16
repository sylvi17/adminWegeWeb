import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import ModalTambahWali from "../../components/wali/ModalTambahWali";
import ModalEditWali from "../../components/wali/ModalEditWali";
import ModalDeleteWali from "../../components/wali/ModalDeleteWali";
import { useWaliList } from "../../hooks/useWaliList";
import * as XLSX from "xlsx";
import { waliController } from "../../controller/waliController";

export default function WaliPage() {
  const [search, setSearch] = useState("");
  const fileInputRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [editWali, setEditWali] = useState(null);
  const [deleteWali, setDeleteWali] = useState(null);
  const { data: waliList, loading, error, refetch } = useWaliList();

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

  const filtered = waliList.filter((w) =>
    w.nama.toLowerCase().includes(search.toLowerCase()),
  );
  const handleImportExcel = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = await file.arrayBuffer();

    const workbook = XLSX.read(data);

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const mappedData = jsonData.map((item) => ({
      nama: item.nama,
      email: item.email,
      password: item.password,
      tanggal_lahir: item.tanggal_lahir,
      peran: item.peran,
    }));

    const invalidData = mappedData.filter(
      (item) =>
        !item.nama ||
        !item.email ||
        !item.password ||
        !item.tanggal_lahir ||
        !item.peran,
    );

    if (invalidData.length > 0) {
      alert("Masih ada data yang belum lengkap");
      return;
    }

    const result = await waliController.createMany(mappedData);

    console.log(result);

    await refetch();
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-nunito">
      <Sidebar />
      <input
        type="file"
        accept=".xlsx,.xls"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <main className="ml-60 flex-1 min-w-0 px-8 py-6 flex flex-col gap-6">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2.5 bg-gray-200 rounded-full px-5 py-2.5 w-96">
            <input
              type="search"
              placeholder="Cari wali murid..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm text-gray-600 placeholder:text-gray-400 w-full font-nunito"
            />
          </label>
          <button
            onClick={handleImportExcel}
            className="bg-teal-500 hover:bg-teal-600 active:scale-95 text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-md shadow-teal-200 transition-all whitespace-nowrap"
          >
            Import Excel
          </button>
          <button
            onClick={() => {}}
            className="bg-teal-500 hover:bg-teal-600 active:scale-95 text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-md shadow-teal-200 transition-all whitespace-nowrap"
          >
            Download Template
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-teal-500 hover:bg-teal-600 active:scale-95 text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-md shadow-teal-200 transition-all whitespace-nowrap"
          >
            + Tambah Wali Murid
          </button>
        </div>

        {/* Header */}
        <header>
          <p className="text-xs font-extrabold text-teal-500 tracking-widest mb-1.5 uppercase">
            Data Wali Murid
          </p>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1.5">
            {waliList.length} Wali Murid
          </h1>
          <p className="text-sm text-gray-400">
            Klik wali murid untuk melihat daftar anak bimbingan
          </p>
        </header>

        {/* Grid kartu */}
        <section aria-label="Daftar wali murid">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-5">
              {filtered.map((w) => (
                <WaliCard
                  key={w.id}
                  wali={w}
                  onEdit={() => setEditWali(w)}
                  onDelete={() => setDeleteWali(w)}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-24 text-gray-400 text-base">
              Tidak ada wali murid yang ditemukan.
            </div>
          )}
        </section>
      </main>

      {/* Modal Tambah */}
      {showModal && (
        <ModalTambahWali
          onClose={() => setShowModal(false)}
          onSuccess={() => { setShowModal(false); refetch(); }}
        />
      )}

      {/* Modal Edit */}
      {editWali && (
        <ModalEditWali
          wali={editWali}
          onClose={() => setEditWali(null)}
          onSuccess={() => { setEditWali(null); refetch(); }}
        />
      )}

      {/* Modal Delete */}
      {deleteWali && (
        <ModalDeleteWali
          wali={deleteWali}
          onClose={() => setDeleteWali(null)}
          onSuccess={() => { setDeleteWali(null); refetch(); }}
        />
      )}
    </div>
  );
}

// ── Wali Card ──────────────────────────────────────────────────
function WaliCard({ wali, onEdit, onDelete }) {
  const navigate = useNavigate();
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
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        {/* Kiri: avatar + nama */}
        <div
          className="flex items-center gap-4 cursor-pointer flex-1"
          onClick={() => navigate(`/wali-murid/${wali.id}`)}
        >
          <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-lg font-extrabold flex-shrink-0">
            {wali.nama.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-extrabold text-[#1a1a1a] text-[1rem]">{wali.nama}</p>
            <p className="text-xs text-[#aaa] capitalize">{wali.peran} • Tahun</p>
          </div>
        </div>

        {/* Kanan: dropdown aksi */}
        <div className="relative" ref={ref}>
          <button
            onClick={(e) => { e.stopPropagation(); setOpen((prev) => !prev); }}
            className="w-8 h-8 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors text-lg flex items-center justify-center"
          >
            ⋮
          </button>

          {open && (
            <div className="absolute right-0 top-9 z-50 bg-white rounded-xl shadow-lg border border-gray-100 py-1 w-36">
              <button
                onClick={(e) => { e.stopPropagation(); setOpen(false); onEdit(); }}
                className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2"
              >
                Edit
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setOpen(false); onDelete(); }}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
              >
                Hapus
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className="flex items-center justify-between border-t border-[#f5f5f5] pt-3 cursor-pointer"
        onClick={() => navigate(`/wali-murid/${wali.id}`)}
      >
        <p className="text-xs text-[#aaa]">Jumlah Anak</p>
        <p className="text-sm font-extrabold text-teal-500">{wali.jumlahMurid} Murid</p>
      </div>
    </div>
  );
}
