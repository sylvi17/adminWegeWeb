import { guruService } from "../services/guruService";

export const guruController = {
  getAll: async () => {
    const res = await guruService.getAll();
    return res.data
      .filter((g) => g.nama) // ← filter data yang nama-nya null
      .map((g) => ({
        id:          g.id,
        nama:        g.nama,
        noHp:        g.no_hp ?? "-",
        alamat:      g.alamat ?? "-",
        jumlahMurid: g.murid?.length ?? 0,
      }));
  },

  create: async (formData) => {
    const res = await guruService.create({
      ...formData,
      role: "GURU",
      umur: Number(formData.umur),
    });
    return res.data;
  },
};