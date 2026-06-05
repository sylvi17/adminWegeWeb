import apiClient from "./api";

export const nilaiService = {
  getAll: () => apiClient.get("/nilai"),
};