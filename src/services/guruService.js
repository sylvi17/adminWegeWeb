import apiClient from "./api";

export const guruService = {
  getAll: () => apiClient.get("/guru"),
};