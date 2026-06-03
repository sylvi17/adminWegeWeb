const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchPengajar(setLoading, setError, setPengajar) {
  setLoading(true);
  setError(null);
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/admin/users`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (!res.ok) throw new Error(`Gagal mengambil data (status ${res.status})`);

    const json = await res.json();
    const allUsers = json.data || [];
    const guruOnly = allUsers.filter((u) => u.role === "GURU");
    setPengajar(guruOnly);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}

export async function tambahGuru(formData) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/admin/users`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({
      ...formData,
      role: "GURU",
    }),
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.message || `Gagal menambah guru (status ${res.status})`);
  }

  return await res.json();
}