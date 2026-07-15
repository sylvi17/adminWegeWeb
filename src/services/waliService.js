import apiClient from "./api";

export const waliService = {
  getAll: () => apiClient.get("/wali"),
  create: (formData) => apiClient.post("/admin/users", formData),
};