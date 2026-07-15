import { waliService } from "../services/waliService";

export const waliController = {
  getAll: async () => {
    const res = await waliService.getAll();

    return res.data.map((w) => ({
      id: w.id,
      userId: w.user?.id,
      nama: w.user?.nama ?? w.nama,
      email: w.user?.email ?? "-",
      tanggal_lahir: w.tanggal_lahir,
      peran: w.peran,
      jumlahMurid: w.murid?.length ?? 0,
      murid:
        w.murid?.map((m) => ({
          id: m.id,
          nama: m.nama,
          jenisKelamin: m.jenisKelamin,
          jilid: m.jilidSekarang ?? "-",
        })) ?? [],
    }));
  },

  create: async (formData) => {
    const res = await waliService.create({
      ...formData,
      role: "WALI",
    });

    return res.data;
  },

  createMany: async (waliList) => {
    const results = [];

    for (const wali of waliList) {
      try {
        const result = await waliController.create(wali);

        results.push({
          success: true,
          data: result,
        });
      } catch (error) {
        results.push({
          success: false,
          data: wali,
          error: error.message,
        });

        console.error("IMPORT ERROR:", error.message);
      }
    }

    return results;
  },
};