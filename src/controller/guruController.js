import { guruService } from "../services/guruService";

export const guruController = {
  getAll: async () => {
    const res = await guruService.getAll();
    return res.data
      .filter((g) => g.nama)
      .map((g) => ({
        id: g.id,
        userId: g.user?.id,
        nama: g.user?.nama ?? g.nama,
        email: g.user?.email ?? "-",
        noHp: g.no_hp ?? "-",
        alamat: g.alamat ?? "-",
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
