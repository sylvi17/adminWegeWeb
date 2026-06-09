import { useState, useRef, useEffect } from "react";

export default function PengajarRow({ u, onEdit, onDelete }) {
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

  function initials(nama) {
    return nama.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  }

  const statusStyles = {
    Aktif: "bg-[#d4f0ec] text-[#00897b]",
    Cuti: "bg-[#e8e0d0] text-[#8d6e63]",
    Izin: "bg-[#fff8e1] text-[#f9a825]",
  };

  return (
    <tr className="border-b border-[#f5f5f5] hover:bg-[#fafafa]">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#d4f0ec] text-[#00897b] flex items-center justify-center text-xs font-extrabold flex-shrink-0">
            {initials(u.nama)}
          </div>
          <div>
            <div className="text-[0.92rem] font-bold text-[#1a1a1a]">{u.nama}</div>
            <div className="mt-0.5 text-[0.75rem] text-[#aaa]">{u.email}</div>
          </div>
        </div>
      </td>
      <td className="px-5 py-4 text-[0.88rem] text-[#444]">{u.email}</td>
      <td className="px-5 py-4 text-[0.88rem] text-[#444]">{u.guru?.no_hp || "—"}</td>
      <td className="px-5 py-4 text-[0.88rem] text-[#444]">{u.guru?.alamat || "—"}</td>
      <td className="px-5 py-4">
        <span className={`inline-block rounded-full px-4 py-1 text-[0.78rem] font-bold ${statusStyles["Aktif"]}`}>
          Aktif
        </span>
      </td>
      <td className="px-5 py-4">
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            aria-label={`Opsi untuk ${u.nama}`}
            className="w-8 h-8 rounded-lg text-[#aaa] hover:bg-gray-100 hover:text-gray-600 transition-colors text-lg flex items-center justify-center"
          >
            ⋮
          </button>

          {open && (
            <div className="absolute right-0 top-9 z-50 bg-white rounded-xl shadow-lg border border-gray-100 py-1 w-36">
              <button
                onClick={() => { setOpen(false); onEdit(u); }}
                className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => { setOpen(false); onDelete(u); }}
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