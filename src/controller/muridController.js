import { muridService } from "../services/muridService";

const BASE_URL = import.meta.env.VITE_API_URL;

function getHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "ngrok-skip-browser-warning": "true",
  };
}

export const muridController = {
  getAll: async () => {
    const res = await muridService.getAll();
    return res.data.map((m) => ({
      id: m.id,
      nama: m.nama,
      umur: m.umur,
      jenisKelamin: m.jenisKelamin,
      jilid: m.jilidSekarang,
      guru: m.guru.nama,
      wali: m.waliMurid.nama,
    }));
  },

  getById: async (id) => {
    const res = await muridService.getById(id);
    const m = res.data;
    return {
      id: m.id,
      nama: m.nama,
      umur: m.umur,
      jenisKelamin: m.jenisKelamin,
      jilid: m.jilidSekarang,
      guru: m.guru.nama,
      guruNoHp: m.guru.no_hp,
      wali: m.waliMurid.nama,
      waliPeran: m.waliMurid.peran,
    };
  },

  getByGuru: async (guruId) => {
    const res = await muridService.getByGuru(guruId);
    return res.data.map((m) => ({
      id: m.id,
      nama: m.nama,
      umur: m.umur,
      jenisKelamin: m.jenisKelamin,
      jilid: m.jilidSekarang ?? "-",
      wali: m.waliMurid.nama,
    }));
  },

  getWaliList: async () => {
    const res = await fetch(`${BASE_URL}/admin/wali`, {
      method: "GET",
      credentials: "include",
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Gagal mengambil data wali");
    const json = await res.json();

    // Tampilkan semua apa adanya dari API, tidak filter duplikat
    return json.data.map((w) => ({
      id: w.id,
      nama: w.nama,
      peran: w.peran,
    }));
  },

  tambahMurid: async (formData) => {
    const res = await fetch(`${BASE_URL}/murid`, {
      method: "POST",
      credentials: "include",
      headers: getHeaders(),
      body: JSON.stringify({
        nama: formData.nama,
        umur: Number(formData.umur),
        jenisKelamin: formData.jenisKelamin,
        guruId: Number(formData.guruId),
        WaliId: Number(formData.waliId),
      }),
    });

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      throw new Error(json.message || `Gagal menambah murid (status ${res.status})`);
    }

    return await res.json();
  },
};