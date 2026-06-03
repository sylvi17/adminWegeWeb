import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function UnauthorizedPage() {
  const navigate  = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 font-nunito">
      <div className="text-center max-w-xs">
        <div className="text-6xl mb-6">🔒</div>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Akses Ditolak</h1>
        <p className="text-sm text-gray-400 mb-8">
          Anda tidak memiliki izin untuk mengakses halaman ini.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white text-sm font-bold py-3 rounded-xl transition-all"
          >
            Kembali
          </button>
          <button
            onClick={logout}
            className="w-full bg-white hover:bg-gray-50 text-red-500 text-sm font-bold py-3 rounded-xl border border-gray-200 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}