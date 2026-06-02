import apiClient from "./api";// axios instance / fetch wrapper yang sudah ada

export const muridService = {
  getAll:  ()   => apiClient.get("/murid"),
  getById: (id) => apiClient.get(`/murid/${id}`),
};