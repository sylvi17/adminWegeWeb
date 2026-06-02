// src/pages/auth/LoginPage.jsx
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

export default function LoginPage() {
  const navigate         = useNavigate();
  const { login, loading, error, setError } = useLogin();

  async function handleLogin(e) {
    e.preventDefault();

    const form     = e.currentTarget;
    const username    = form.username.value.trim();
    const password = form.password.value;

    // Validasi sisi klien
    if (!username || !password) {
      setError("Email dan password tidak boleh kosong.");
      return;
    }
    const result = await login(username, password);
    if (result) navigate("/dashboard");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-100">
      {/* Background split */}
      <div className="fixed inset-x-0 top-0 h-[52vh] rounded-b-[40px] bg-gradient-to-br from-teal-400 via-teal-500 to-teal-700 shadow-lg" />
      <div className="fixed inset-x-0 bottom-0 h-[52vh] bg-gray-100" />

      {/* Card */}
      <form
        onSubmit={handleLogin}
        noValidate
        className="relative z-10 flex w-[340px] flex-col gap-5 rounded-3xl bg-white px-9 py-10 shadow-2xl
                   animate-[cardIn_0.5s_cubic-bezier(0.22,1,0.36,1)_both]"
      >
        <h1 className="text-center text-3xl font-extrabold tracking-tight text-teal-700">
          Login
        </h1>

        <Input
          name="username"
          type="text"
          placeholder="Username"
          icon={<MailIcon />}
          autoComplete="username"
          error={error && error.toLowerCase().includes("username") ? error : undefined}
        />

        <Input
          name="password"
          type="password"
          placeholder="Password"
          icon={<LockIcon />}
          autoComplete="current-password"
        />

        {/* Error umum (bukan field-specific) */}
        {error && !error.toLowerCase().includes("username") && (
          <p className="text-center text-xs text-red-500 -mt-2">{error}</p>
        )}

        <Button type="submit" disabled={loading} className="mt-1 w-full">
          {loading ? "Masuk..." : "Log in"}
        </Button>
      </form>
    </div>
  );
}