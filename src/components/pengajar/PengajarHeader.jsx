const BTN_CLASS =
  "rounded-full bg-[#1a5c54] py-3 text-white font-bold shadow-md hover:bg-[#26a69a] transition w-44 text-center";

export default function PengajarHeader({ onTambah, onExcel, handleDownloadTemplate }) {
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

      {/* Grup tombol rata kanan, ukuran seragam */}
      <div className="flex items-center gap-3">
        <button onClick={onExcel} className={BTN_CLASS}>
          Import Excel
        </button>
        <button onClick={handleDownloadTemplate} className={BTN_CLASS}>
          Download Template
        </button>
        <button onClick={onTambah} className={BTN_CLASS}>
          + Tambah Pengajar
        </button>
      </div>
    </header>
  );
}