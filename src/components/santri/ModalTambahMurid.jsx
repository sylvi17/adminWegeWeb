import { useState, useEffect } from "react";
import { muridController } from "../../controller/muridController";

export default function ModalTambahMurid({ guruId, onClose, onSuccess }) {
  const [waliList, setWaliList] = useState([]);
  const [loadingWali, setLoadingWali] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedWaliId, setSelectedWaliId] = useState("");
  const [selectedMuridId, setSelectedMuridId] = useState("");
  const [muridOptions, setMuridOptions] = useState([]);
  const [selectedMurid, setSelectedMurid] = useState(null);

  // Fetch full wali list (dengan murid[])
  useEffect(() => {
    const token = localStorage.getItem("token");
    const BASE_URL = import.meta.env.VITE_API_URL;

    fetch(`${BASE_URL}/admin/wali`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
    })
      .then((res) => res.json())
      .then((json) => setWaliList(json.data ?? []))
      .catch(() => setWaliList([]))
      .finally(() => setLoadingWali(false));
  }, []);

  // Saat wali dipilih, isi dropdown anak
  function handleWaliChange(e) {
    const waliId = e.target.value;
    setSelectedWaliId(waliId);
    setSelectedMuridId("");
    setSelectedMurid(null);

    const wali = waliList.find((w) => String(w.id) === waliId);
    setMuridOptions(wali?.murid ?? []);
  }

  // Saat anak dipilih, auto-fill data
  function handleMuridChange(e) {
    const muridId = e.target.value;
    setSelectedMuridId(muridId);

    const murid = muridOptions.find((m) => String(m.id) === muridId);
    setSelectedMurid(murid ?? null);
  }

  async function handleSubmit() {
    if (!selectedWaliId || !selectedMuridId || !selectedMurid) {
      setError("Pilih wali murid dan nama murid terlebih dahulu.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await muridController.tambahMurid({
        nama: selectedMurid.nama,
        umur: selectedMurid.umur,
        jenisKelamin: selectedMurid.jenisKelamin,
        guruId,
        waliId: Number(selectedWaliId),
      });
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const canSubmit = !!selectedWaliId && !!selectedMuridId && !loading;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-[18px] shadow-2xl w-full max-w-md mx-4">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f0f0]">
          <h2 className="text-[1rem] font-extrabold text-[#1a1a1a]">Tambah Murid Baru</h2>
          <button onClick={onClose} className="text-[#aaa] hover:text-[#555] text-xl leading-none">✕</button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">

          {/* Step 1 — Pilih Wali */}
          <div>
            <label className="text-[0.75rem] text-[#999] mb-1 block">
              Wali Murid <span className="text-red-400">*</span>
            </label>
            <select
              value={selectedWaliId}
              onChange={handleWaliChange}
              disabled={loadingWali}
              className="w-full border border-[#eee] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 bg-white text-[#555] disabled:opacity-50"
            >
              <option value="" disabled>
                {loadingWali ? "Memuat data wali..." : "Pilih wali murid"}
              </option>
              {waliList.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.nama} ({w.peran}) — {w.murid?.length ?? 0} anak
                </option>
              ))}
            </select>
          </div>

          {/* Step 2 — Pilih Nama Murid (muncul setelah wali dipilih) */}
          <div>
            <label className="text-[0.75rem] text-[#999] mb-1 block">
              Nama Murid <span className="text-red-400">*</span>
            </label>
            <select
              value={selectedMuridId}
              onChange={handleMuridChange}
              disabled={!selectedWaliId || muridOptions.length === 0}
              className="w-full border border-[#eee] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-300 bg-white text-[#555] disabled:opacity-50"
            >
              <option value="" disabled>
                {!selectedWaliId
                  ? "Pilih wali terlebih dahulu"
                  : muridOptions.length === 0
                  ? "Tidak ada murid"
                  : "Pilih murid"}
              </option>
              {muridOptions.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nama} — {m.umur} thn,{" "}
                  {m.jenisKelamin === "LAKI_LAKI" ? "Laki-laki" : "Perempuan"}
                </option>
              ))}
            </select>
          </div>

          {/* Auto-fill preview (muncul setelah murid dipilih) */}
          {selectedMurid && (
            <div className="bg-teal-50 border border-teal-100 rounded-lg px-4 py-3 space-y-2">
              <p className="text-[0.7rem] font-extrabold text-teal-500 tracking-widest uppercase mb-2">
                Detail Murid
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                <div>
                  <p className="text-[0.7rem] text-[#999]">Umur</p>
                  <p className="font-bold text-[#333]">{selectedMurid.umur} tahun</p>
                </div>
                <div>
                  <p className="text-[0.7rem] text-[#999]">Jenis Kelamin</p>
                  <p className="font-bold text-[#333]">
                    {selectedMurid.jenisKelamin === "LAKI_LAKI" ? "Laki-laki" : "Perempuan"}
                  </p>
                </div>
                <div>
                  <p className="text-[0.7rem] text-[#999]">Jilid Sekarang</p>
                  <p className="font-bold text-[#333]">
                    {selectedMurid.jilidSekarang ?? "Belum ada"}
                  </p>
                </div>
                <div>
                  <p className="text-[0.7rem] text-[#999]">Guru ID</p>
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-[#333]">{guruId}</p>
                    <span className="text-[0.65rem] bg-[#d4f0ec] text-[#00897b] px-1.5 py-0.5 rounded-full font-bold">
                      Auto
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Guru ID (saat belum ada murid dipilih) */}
          {!selectedMurid && (
            <div>
              <label className="text-[0.75rem] text-[#999] mb-1 block">Guru ID</label>
              <div className="w-full border border-[#eee] bg-[#f9f9f9] rounded-lg px-3 py-2 text-sm text-[#aaa] flex items-center justify-between">
                <span>{guruId}</span>
                <span className="text-xs bg-[#d4f0ec] text-[#00897b] px-2 py-0.5 rounded-full font-bold">
                  Auto
                </span>
              </div>
            </div>
          )}

          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-[#f0f0f0]">
          <button
            onClick={onClose}
            className="text-sm px-4 py-2 rounded-full border border-[#eee] text-[#555] hover:bg-[#f9f9f9] transition font-bold"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="text-sm px-5 py-2 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-bold shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>

      </div>
    </div>
  );
}