const BASE_URL = import.meta.env.VITE_API_URL;

function getToken() {
  return sessionStorage.getItem("tpq_token");
}

function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
    "ngrok-skip-browser-warning": "true",
  };
}

export const waliController = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/wali`, {
      method: "GET",
      credentials: "include",
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Gagal mengambil data wali");
    const json = await res.json();
    return json.data.map((w) => ({
      id: w.id,
      nama: w.nama,
      tanggal_lahir: w.tanggal_lahir ?? null,
      peran: w.peran,
      jumlahMurid: w.murid?.length ?? 0,
      murid: w.murid?.map((m) => ({
        id: m.id,
        nama: m.nama,
        jenisKelamin: m.jenisKelamin,
        jilid: m.jilidSekarang ?? "-",
      })) ?? [],
    }));
  },

  tambahWali: async (formData) => {
    const body = new URLSearchParams();
    body.append("nama", formData.nama);
    body.append("email", formData.email);
    body.append("password", formData.password);
    body.append("tanggal_lahir", formData.tanggal_lahir ?? "");
    body.append("role", "WALI");
    body.append("peran", formData.peran);

    const res = await fetch(`${BASE_URL}/admin/users`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "true",
      },
      body: body.toString(),
    });

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      throw new Error(json.message || `Gagal menambah wali (status ${res.status})`);
    }

    return await res.json();
  },
};