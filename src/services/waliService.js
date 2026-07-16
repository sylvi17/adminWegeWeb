import apiClient from "./api";

export const waliService = {
  getAll: () => apiClient.get("/wali"),
  create: (formData) => apiClient.post("/admin/users", formData),
  update: (id, formData) =>
    apiClient.put(`/admin/users/${id}`, formData),

  delete: (id) =>
    apiClient.delete(`/admin/users/${id}`),
};