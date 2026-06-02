// src/controllers/authController.js
import apiClient from "../services/api";

export const authController = {
  /**
   * Login user.
   * @param {{ username: string, password: string }} credentials
   * @returns {{ message, token, data: { id, nama, role } }}
   */
  login: ({ username, password }) =>
    apiClient.post("/auth/login", { username, password }),

  logout: () =>
    apiClient.post("/auth/logout"),

  getMe: () =>
    apiClient.get("/auth/profile"),

  /**
   * Refresh token.
   * @param {{ refreshToken: string }} payload
   */
  refreshToken: (refreshToken) =>
    apiClient.post("/auth/refresh", { refreshToken }),
};