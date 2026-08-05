import { useState, useRef, useEffect } from "react";

export default function SantriRow({ siswa, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const jenisKelamin = siswa.jenisKelamin === "LAKI_LAKI" ? "Laki-laki" : "Perempuan";

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
        {siswa.guru ?? "-"}
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
                 Edit
              </button>
              <button
                onClick={() => { setOpen(false); onDelete(); }}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
              >
                 Arsipkan
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}