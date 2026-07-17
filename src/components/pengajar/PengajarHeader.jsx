export default function PengajarHeader({ onTambah, onExcel, handleDownloadTemplate}) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-[2rem] font-extrabold text-[#1a1a1a]">
          Data Pengajar
        </h1>
        <p className="mt-1 text-[0.9rem] text-[#999]">
          Kelola informasi guru dan pembimbing TPQ
        </p>
      </div>
      <button
        onClick={onExcel}
        className="rounded-full bg-[#1a5c54] px-6 py-3 text-white font-bold shadow-md hover:bg-[#26a69a] transition"
      >
       Import Excel
      </button>
      <button
        onClick={handleDownloadTemplate}
        className="rounded-full bg-[#1a5c54] px-6 py-3 text-white font-bold shadow-md hover:bg-[#26a69a] transition"
      >
        Download Template
      </button>

      <button
        onClick={onTambah}
        className="rounded-full bg-[#1a5c54] px-6 py-3 text-white font-bold shadow-md hover:bg-[#26a69a] transition"
      >
        + Tambah Pengajar Baru
      </button>
    </header>
  );
}
