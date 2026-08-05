import { useState } from "react";
import { muridController } from "../../controller/muridController";
import ModalArchiveMurid from "./ModalArchiveMurid";

export default function ArchiveRow({ siswa, onRefresh }) {
  const [showModal, setShowModal] = useState(false);

  const jenisKelamin =
    siswa.jenisKelamin === "LAKI_LAKI"
      ? "Laki-laki"
      : "Perempuan";

  return (
    <>
      <tr className="border-b border-gray-50 last:border-none hover:bg-gray-50 transition-colors">
        <td className="px-5 py-4 align-middle">
          <p className="text-sm font-bold text-gray-900">
            {siswa.nama}
          </p>
        </td>

        <td className="px-5 py-4 text-sm text-gray-500 align-middle">
          {siswa.jilid ?? "-"}
        </td>

        <td className="px-5 py-4 text-sm text-gray-500 align-middle">
          {siswa.umur} tahun
        </td>

        <td className="px-5 py-4 align-middle">
          <span
            className={[
              "inline-block px-3 py-1 rounded-full text-xs font-bold",
              siswa.jenisKelamin === "LAKI_LAKI"
                ? "bg-blue-100 text-blue-600"
                : "bg-pink-100 text-pink-600",
            ].join(" ")}
          >
            {jenisKelamin}
          </span>
        </td>

        <td className="px-5 py-4 text-sm text-gray-500 align-middle">
          {siswa.guru ?? "-"}
        </td>

        <td className="px-5 py-4 align-middle">
          <button
            onClick={() => setShowModal(true)}
            className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2 transition"
          >
            Pulihkan
          </button>
        </td>
      </tr>

      {showModal && (
        <ModalArchiveMurid
          type="restore"
          murid={siswa}
          onClose={() => setShowModal(false)}
          onConfirm={async () => {
            try {
              await muridController.restore(siswa.id);
              setShowModal(false);
              onRefresh?.();
            } catch (err) {
              alert(
                err.response?.data?.message ??
                  "Gagal memulihkan murid"
              );
            }
          }}
        />
      )}
    </>
  );
}