import { useNavigate } from "react-router-dom";

export default function KelasCard({ guru }) {
  const navigate = useNavigate();
  const { id, nama, noHp, alamat, jumlahMurid } = guru;

  return (
    <article
      onClick={() => navigate(`/santri/${id}`)}
      className="bg-white rounded-2xl p-6 flex flex-col gap-4 cursor-pointer shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
    >
      <span className="self-start text-xs font-extrabold tracking-wide px-3.5 py-1 rounded-full bg-teal-100 text-teal-700">
        AKTIF
      </span>

      <h2 className="text-base font-extrabold text-gray-900">{nama}</h2>

      <div className="bg-gray-50 rounded-xl px-4 py-3 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-gray-400">Jumlah Murid</span>
          <strong className="text-base font-extrabold text-gray-900">{jumlahMurid}</strong>
        </div>
        <div className="h-2 bg-teal-100 rounded-full overflow-hidden">
          <div className="h-full bg-teal-500 rounded-full" style={{ width: "100%" }} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <InfoRow icon="📞" text={noHp ?? "-"} />
        <InfoRow icon="📍" text={alamat ?? "-"} />
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