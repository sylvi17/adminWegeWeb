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
      id:           m.id,
      nama:         m.nama,
      umur:         m.umur,
      jenisKelamin: m.jenisKelamin,
      jilid:        formatJilid(m.jilidSekarang),
      guru:         m.guru?.nama ?? "-",
      wali:         m.waliMurid?.nama ?? "-",
    }));
  },

  getById: async (id) => {
    const res = await muridService.getById(id);
    const m = res.data;
    return {
      id:           m.id,
      nama:         m.nama,
      umur:         m.umur,
      jenisKelamin: m.jenisKelamin,
      jilid:        formatJilid(m.jilidSekarang),
      guru:         m.guru?.nama ?? "-",
      guruNoHp:     m.guru?.no_hp ?? "-",
      wali:         m.waliMurid?.nama ?? "-",
      waliPeran:    m.waliMurid?.peran ?? "-",
    };
  },

  getByGuru: async (guruId) => {
    const res = await muridService.getByGuru(guruId);
    return res.data.map((m) => ({
      id:           m.id,
      nama:         m.nama,
      umur:         m.umur,
      jenisKelamin: m.jenisKelamin,
      jilid:        formatJilid(m.jilidSekarang),
      wali:         m.waliMurid?.nama ?? "-",
       guru:         m.guru?.nama ?? "-",
    }));
  },

  tambahMurid: async (formData) => {
    const payload = {
      nama:         formData.nama,
      umur:         Number(formData.umur) || 0,
      jenisKelamin: formData.jenisKelamin,
      guruId:       Number(formData.guruId),
      WaliId:       Number(formData.WaliId),
    };

    if (formData.jilidSekarang) {
      payload.jilidSekarang = formData.jilidSekarang;
    }

    return await apiClient.post("/murid", payload);
  },

  updateMurid: async (id, formData) => {
    const payload = {
      nama:         formData.nama,
      umur:         Number(formData.umur) || 0,
      jenisKelamin: formData.jenisKelamin,
      jilidSekarang: formData.jilidSekarang || null,
    };

    return await apiClient.put(`/murid/${id}`, payload);
  },
};