const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status; // HTTP status code
    this.data = data; // raw response body
  }
}

async function request(method, endpoint, { body, headers = {} } = {}) {
  const token = sessionStorage.getItem("tpq_token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true", // ← tambahkan ini
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  // Coba parse JSON; kalau gagal (e.g. 204 No Content) kembalikan null
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(
      data?.message ?? `Request failed with status ${res.status}`,
      res.status,
      data,
    );
  }

  return data;
}

const apiClient = {
  get: (endpoint, opts) => request("GET", endpoint, opts),
  post: (endpoint, body, opts) => request("POST", endpoint, { ...opts, body }),
  put: (endpoint, body, opts) => request("PUT", endpoint, { ...opts, body }),
  patch: (endpoint, body, opts) =>
    request("PATCH", endpoint, { ...opts, body }),
  delete: (endpoint, opts) => request("DELETE", endpoint, opts),
};

export default apiClient;
