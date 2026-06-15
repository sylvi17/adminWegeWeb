import { kenaikanJilidService } from "../services/kenaikanJilidService";
import { guruService } from "../services/guruService";

export const kenaikanJilidController = {
  getAll: async () => {
    const [res, guruRes] = await Promise.all([
      kenaikanJilidService.getAll(),
      guruService.getAll(),
    ]);

    const guruMap = new Map(
      guruRes.data.map((g) => [g.id, g.user?.nama ?? g.nama]),
    );

    return res.data.map((k) => ({
      id: k.id,
      nama: k.murid.nama,
      jilid: k.jilid,
      tajwid: k.tajwid,
      makhraj: k.makhraj,
      statusKelulusan: k.statusKelulusan ?? "-",
      catatan: k.catatan ?? "-",
      tanggal: new Date(k.tanggal).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      guru: guruMap.get(k.murid.guruId) ?? "-",
    }));
  },
};
