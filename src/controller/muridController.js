// src/controller/muridController.js
import { muridService } from "../services/muridService";

export const muridController = {
  getAll: async () => {
    const res = await muridService.getAll();
    return res.data.map((m) => ({
      id:           m.id,
      nama:         m.nama,
      umur:         m.umur,
      jenisKelamin: m.jenisKelamin,
      jilid:        m.jilidSekarang,
      guru:         m.guru.nama,
      wali:         m.waliMurid.nama,
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
      jilid:        m.jilidSekarang,
      guru:         m.guru.nama,
      guruNoHp:     m.guru.no_hp,
      wali:         m.waliMurid.nama,
      waliPeran:    m.waliMurid.peran,
    };
  },
};