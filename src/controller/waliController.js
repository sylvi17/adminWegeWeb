import { waliService } from "../services/waliService";

// helper untuk format jilid
function formatJilid(jilidSekarang) {
  if (!jilidSekarang) return "Belum Ada Jilid";
  return String(jilidSekarang).replace(/_/g, " ");
}

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
          jilid: formatJilid(m.jilidSekarang),
        })) ?? [],
    }));
  },

  create: async (formData) => {
    const { row, valid, errors, ...payload } = formData;

    const res = await waliService.create({
      ...payload,
      role: "WALI",
      no_hp: payload.no_hp ? Number(payload.no_hp) : null,
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
  editWali: async (id, formData) => {
    const res = await waliService.update(id, {
      ...formData,
      role: "WALI",
    });

    return res.data;
  },

  deleteWali: async (id, nama) => {
    const res = await waliService.delete(id, nama);
    return res.data;
  },
};