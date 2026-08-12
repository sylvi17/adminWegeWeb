// nilaiController.js
import { nilaiService } from "../services/nilaiService";
import { guruService } from "../services/guruService";

export const nilaiController = {
  getAll: async () => {
    const [nilaiRes, guruRes] = await Promise.all([
      nilaiService.getAll(),
      guruService.getAll(),
    ]);

    // buat map guruId → nama guru
    const guruMap = new Map(
      guruRes.data.map((g) => [g.id, g.user?.nama ?? g.nama]),
    );

    return nilaiRes.data.map((n) => ({
      id: n.id,
      nama: n.murid.nama,
      jilid: n.jilid,
      halaman: n.halaman,
      nilaiBacaan: n.nilaiBacaan,
      tajwid: n.tajwid,
      makhraj: n.makhraj,
      jenisPenilaian: n.jenisPenilaian,
      statusKelulusan: n.statusKelulusan ?? "-",
      catatan: n.catatan ?? "-",
      // tanggal mentah (ISO/string asli dari API) — dipakai untuk filter/perhitungan
      tanggalRaw: n.tanggal,
      // tanggal terformat — dipakai untuk tampilan di tabel
      tanggal: new Date(n.tanggal).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      // ✅ lookup nama guru dari guruId murid
      guru: guruMap.get(n.murid.guruId) ?? "-",
    }));
  },
};