// src/hooks/useLogin.js

import { useState } from "react";
import { authController } from "../controller/authController";
import { ApiError } from "../services/api";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(username, password) {
    setError("");
    setLoading(true);

    try {
      const result = await authController.login({
        username,
        password,
      });

      if (result.data.role !== "ADMIN") {
        setError("Akun ini tidak memiliki akses ke dashboard admin.");
        return null;
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.data));

      return result;
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Tidak dapat terhubung ke server.");
      }
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error, setError };
}
