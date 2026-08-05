import apiClient from "./api";// axios instance / fetch wrapper yang sudah ada

export const muridService = {
  getAll:      ()        => apiClient.get("/murid"),
  getByGuru:   (guruId)  => apiClient.get(`/murid/guru/${guruId}`),
  getArchived: () =>
    apiClient.get("/murid/arsip"),
  restore: (id) =>
    apiClient.patch(`/murid/${id}/restore`),
};