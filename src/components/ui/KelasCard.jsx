import { useNavigate } from "react-router-dom";
 
/**
 * @param {{ kelas: import("./SantriPage").KelasItem }} props
 */
export default function KelasCard({ kelas }) {
  const navigate = useNavigate();
  const { id, nama, pengajar, jadwal, siswa, maks } = kelas;
 
  const persen  = Math.round((siswa / maks) * 100);
  const isPenuh = siswa === maks;
 
  return (
    <article
      onClick={() => navigate(`/santri/${id}`)}
      className="bg-white rounded-2xl p-6 flex flex-col gap-4 cursor-pointer shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
    >
      {/* Badge */}
      <span
        className={[
          "self-start text-xs font-extrabold tracking-wide px-3.5 py-1 rounded-full",
          isPenuh
            ? "bg-red-100 text-red-600"
            : "bg-teal-100 text-teal-700",
        ].join(" ")}
      >
        {isPenuh ? "PENUH" : "AKTIF"}
      </span>
 
      {/* Nama kelas */}
      <h2 className="text-base font-extrabold text-gray-900">{nama}</h2>
 
      {/* Progress bar */}
      <div className="bg-gray-50 rounded-xl px-4 py-3 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-gray-400">Jumlah Siswa</span>
          <span className="text-sm text-gray-500">
            <strong className="text-base font-extrabold text-gray-900">{siswa}</strong>
            /{maks}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={["h-full rounded-full transition-all duration-500", isPenuh ? "bg-red-500" : "bg-teal-500"].join(" ")}
            style={{ width: `${persen}%` }}
            role="progressbar"
            aria-valuenow={siswa}
            aria-valuemin={0}
            aria-valuemax={maks}
          />
        </div>
      </div>
 
      {/* Info pengajar & jadwal */}
      <div className="flex flex-col gap-1.5">
        <InfoRow icon="👤" text={pengajar} />
        <InfoRow icon="📅" text={`Jadwal KBM: ${jadwal}`} />
      </div>
    </article>
  );
}
 
function InfoRow({ icon, text }) {
  return (
    <div className="flex items-start gap-2 text-sm text-gray-500 leading-relaxed">
      <span className="text-base mt-px shrink-0">{icon}</span>
      <span>{text}</span>
    </div>
  );
}