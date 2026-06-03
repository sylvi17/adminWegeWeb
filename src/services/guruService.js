import apiClient from "./api";

export const guruService = {
  getAll: () => apiClient.get("/guru"),
  create: (formData) => apiClient.post("/admin/users", formData),
};