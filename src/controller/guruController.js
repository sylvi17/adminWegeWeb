import { guruService } from "../services/guruService";

export const guruController = {
  getAll: async () => {
    const res = await guruService.getAll();
    return res.data.map((g) => ({
      id:          g.id,
      nama:        g.nama,
      noHp:        g.no_hp ?? "-",
      alamat:      g.alamat ?? "-",
      jumlahMurid: g.murid.length,
    }));
  },
};