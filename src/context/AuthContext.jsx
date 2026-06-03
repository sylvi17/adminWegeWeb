import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authController } from "../controller/authController";
import { ApiError } from "../services/api";

/**
 * @typedef {{ id: string; nama: string; username: string; role: string }} AuthUser
 */

const AuthContext = createContext(null);

const TOKEN_KEY = "tpq_token";
const USER_KEY  = "tpq_user";

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session saat app pertama load
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(USER_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      sessionStorage.removeItem(USER_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (username, password) => {
    const result = await authController.login({ username, password });

    // Validasi role — lempar error supaya LoginPage bisa tangkap
    if (result.data.role !== "ADMIN") {
      throw new Error("Akun ini tidak memiliki akses ke dashboard admin.");
    }

    // Simpan ke sessionStorage (bukan localStorage — bersih saat tab ditutup)
    sessionStorage.setItem(TOKEN_KEY, result.token);
    sessionStorage.setItem(USER_KEY, JSON.stringify(result.data));
    setUser(result.data);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
  return ctx;
}