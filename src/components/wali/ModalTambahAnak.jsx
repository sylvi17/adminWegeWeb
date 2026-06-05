import { useNavigate } from "react-router-dom";

export default function ModalTambahAnak({ wali }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/wali-murid/${wali.id}`)}
      className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md cursor-pointer transition-all active:scale-95"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-lg font-extrabold flex-shrink-0">
          {wali.nama.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-extrabold text-[#1a1a1a] text-[1rem]">{wali.nama}</p>
          <p className="text-xs text-[#aaa] capitalize">{wali.peran} • {wali.umur} tahun</p>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-[#f5f5f5] pt-3">
        <p className="text-xs text-[#aaa]">Jumlah Anak</p>
        <p className="text-sm font-extrabold text-teal-500">{wali.jumlahMurid} Murid</p>
      </div>
    </div>
  );
}