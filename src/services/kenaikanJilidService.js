import apiClient from "./api";

export const kenaikanJilidService = {
  getAll: () => apiClient.get("/kenaikan-jilid"),
};