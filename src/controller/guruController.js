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
    const { row, ...payload } = formData;
    const res = await guruService.create({
      ...payload,
      role: "GURU",
      no_hp: payload.no_hp ? Number(payload.no_hp) : null,
    });

    return res.data;
  },

  createMany: async (guruList) => {
    const results = [];

    for (const guru of guruList) {
      try {
        const result = await guruController.create(guru);

        results.push({
          success: true,
          data: result,
        });
      } catch (err) {
        results.push({
          success: false,
          data: guru,
          error: err.message,
        });
      }
    }

    return results;
  },
};
