// src/pages/auth/LoginPage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setError("");

    if (!email || !password) {
      setError("Email dan password tidak boleh kosong.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Format email tidak valid.");
      return;
    }

    // Cek kredensial manual
    if (email === "admin@binatilawah.com" && password === "admin123") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 800);
    } else {
      setError("Email atau password salah.");
    }
  };

  return (
    <div className="login-root">
      <div className="login-top" />
      <div className="login-bottom" />

      <div className="login-card">
        <h1 className="login-title">Login</h1>

        <div className="input-wrapper">
          <span className="input-icon"><MailIcon /></span>
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            autoComplete="email"
          />
        </div>

        <div className="input-wrapper">
          <span className="input-icon"><LockIcon /></span>
          <input
            className="input-field"
            type={showPass ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            autoComplete="current-password"
          />
          <button className="toggle-eye" onClick={() => setShowPass(v => !v)} tabIndex={-1}>
            {showPass ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button className="login-btn" onClick={handleLogin} disabled={loading}>
          {loading ? "Masuk..." : "Log in"}
        </button>
      </div>
    </div>
  );
}