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
    console.log("DIKIRIM KE API:", formData);
    const res = await guruService.create({
      ...formData,
      role: "GURU",
      no_hp: String(formData.no_hp),
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
      } catch (error) {
        console.error("IMPORT ERROR:", error.response?.data);

        results.push({
          success: false,
          data: guru,
          error: error.response?.data ?? error.message,
        });
      }
    }

    return results;
  },
};
