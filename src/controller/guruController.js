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
    // Konversi no_hp ke Int di sini sebelum kirim ke backend
    const no_hp_parsed = formData.no_hp
      ? parseInt(formData.no_hp.replace(/\D/g, ""), 10) // hapus non-angka dulu
      : null;

    const res = await guruService.create({
      ...formData,
      role: "GURU",
      no_hp: no_hp_parsed,
      tanggal_lahir: formData.tanggal_lahir ?? "",
    });
    return res.data;
  },
};