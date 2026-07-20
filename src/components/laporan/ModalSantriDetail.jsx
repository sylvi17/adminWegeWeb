import StatusBadge from "./Badge";

export default function ModalSantriDetail({ santri, history, onClose }) {
  if (!santri) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[18px] shadow-lg w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#f5f5f5]">
          <div>
            <h2 className="text-lg font-extrabold text-[#1a1a1a]">
              {santri.nama}
            </h2>
            <p className="text-xs text-[#aaa] mt-0.5">
              Riwayat ngaji terakhir
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#f5f5f5] text-[#888] text-lg"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1">
          {history.length === 0 ? (
            <div className="p-10 text-center text-[#aaa] text-[0.9rem]">
              Belum ada riwayat untuk santri ini.
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#fafafa] sticky top-0">
                  <th className="px-6 py-3 text-left text-[0.7rem] font-extrabold text-[#bbb] tracking-[0.8px]">
                    JILID
                  </th>
                  <th className="px-6 py-3 text-left text-[0.7rem] font-extrabold text-[#bbb] tracking-[0.8px]">
                    HALAMAN
                  </th>
                  <th className="px-6 py-3 text-left text-[0.7rem] font-extrabold text-[#bbb] tracking-[0.8px]">
                    STATUS
                  </th>
                  <th className="px-6 py-3 text-left text-[0.7rem] font-extrabold text-[#bbb] tracking-[0.8px]">
                    TANGGAL
                  </th>
                </tr>
              </thead>
              <tbody>
                {history.map((h) => (
                  <tr key={h.id} className="hover:bg-[#fafafa]">
                    <td className="px-6 py-3 border-b border-[#f5f5f5] text-[0.85rem] text-[#444]">
                      {h.jilid}
                    </td>
                    <td className="px-6 py-3 border-b border-[#f5f5f5] text-[0.85rem] text-[#444]">
                      {h.halaman}
                    </td>
                    <td className="px-6 py-3 border-b border-[#f5f5f5]">
                      <StatusBadge status={h.nilaiBacaan} />
                    </td>
                    <td className="px-6 py-3 border-b border-[#f5f5f5] text-[0.85rem] text-[#444]">
                      {h.tanggal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}