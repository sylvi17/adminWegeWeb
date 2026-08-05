import { muridService } from "../services/muridService";
import apiClient from "../services/api";

// helper untuk format jilid
function formatJilid(jilidSekarang) {
  if (!jilidSekarang) return "Belum Ada Jilid";
  return String(jilidSekarang).replace(/_/g, " ");
}

export const muridController = {
  getAll: async () => {
    const res = await muridService.getAll();
    return res.data.map((m) => ({
      id: m.id,
      nama: m.nama,
      umur: m.umur,
      jenisKelamin: m.jenisKelamin,
      jilid: formatJilid(m.jilidSekarang),
      guru: m.guru,
      guruId: m.guru?.id ?? null,
      wali: m.waliMurid?.nama ?? "-",
    }));
  },
  getArchived: async () => {
    const res = await muridService.getArchived();

    return res.data.map((m) => ({
      id: m.id,
      nama: m.nama,
      umur: m.umur,
      jenisKelamin: m.jenisKelamin,
      jilid: formatJilid(m.jilidSekarang),
      guru: m.guru?.nama ?? "-",
      // Tetap sertakan guruId walau tampilan (guru) di halaman arsip cuma
      // nama, supaya kalau nanti dibuka lewat modal edit, dropdown Guru
      // tidak ikut kosong seperti bug yang terjadi di getByGuru.
      guruId: m.guru?.id ?? null,
      wali: m.waliMurid?.nama ?? "-",
    }));
  },

  restore: async (id) => {
    return await muridService.restore(id);
  },

  getById: async (id) => {
    const res = await muridService.getById(id);
    const m = res.data;
    return {
      id: m.id,
      nama: m.nama,
      umur: m.umur,
      jenisKelamin: m.jenisKelamin,
      jilid: formatJilid(m.jilidSekarang),
      guru: m.guru?.nama ?? "-",
      guruId: m.guru?.id ?? null,
      guruNoHp: m.guru?.no_hp ?? "-",
      wali: m.waliMurid?.nama ?? "-",
      waliPeran: m.waliMurid?.peran ?? "-",
    };
  },

  getByGuru: async (guruId) => {
    const res = await muridService.getByGuru(guruId);
    return res.data.map((m) => ({
      id: m.id,
      nama: m.nama,
      umur: m.umur,
      jenisKelamin: m.jenisKelamin,
      jilid: formatJilid(m.jilidSekarang),
      wali: m.waliMurid?.nama ?? "-",
      guru: m.guru?.nama ?? "-",
      // FIX: sebelumnya guruId tidak pernah dikirim dari fungsi ini.
      // Karena endpoint ini sudah difilter berdasarkan guruId tertentu,
      // setiap murid yang dikembalikan pasti milik guru itu. Fallback ke
      // parameter guruId kalau m.guru?.id kebetulan tidak ada di response.
      guruId: m.guru?.id ?? Number(guruId) ?? null,
    }));
  },

  tambahMurid: async (formData) => {
    const payload = {
      nama: formData.nama,
      umur: Number(formData.umur) || 0,
      jenisKelamin: formData.jenisKelamin,
      guruId: Number(formData.guruId),
      WaliId: Number(formData.WaliId),
    };

    if (formData.jilidSekarang) {
      payload.jilidSekarang = formData.jilidSekarang;
    }

    return await apiClient.post("/murid", payload);
  },

  updateMurid: async (id, formData) => {
    const payload = {
      nama: formData.nama,
      umur: Number(formData.umur) || 0,
      jenisKelamin: formData.jenisKelamin,
      jilidSekarang: formData.jilidSekarang || null,
    };

    // FIX: dulu ini SELALU mengirim `guruId`, dan kalau formData.guruId
    // kosong/tidak valid (misal karena dibuka dari halaman yang tidak
    // menyertakan guruId), field ini dikirim sebagai `null` — sehingga
    // relasi guru yang sudah ada ikut TERHAPUS di backend saat disimpan.
    // Sekarang: guruId hanya disertakan ke payload kalau nilainya valid,
    // supaya relasi guru yang sudah ada tidak pernah tertimpa null secara
    // tidak sengaja.
    const guruIdNum = Number(formData.guruId);
    if (formData.guruId && !Number.isNaN(guruIdNum)) {
      payload.guruId = guruIdNum;
    }

    return await apiClient.put(`/murid/${id}`, payload);
  },
};