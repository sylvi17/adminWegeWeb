import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Book, GraduationCap, ListChecksIcon, LogOut, UserCheck2Icon, Users, ShieldCheck } from "lucide-react";
const menus = [
  { label: "Dashboard", icon: Users, path: "/dashboard" },
  { label: "Data Santri", icon: GraduationCap, path: "/santri" },
  { label: "Data Pengajar", icon: Book, path: "/pengajar" },
  { label: "Data Wali Murid", icon: UserCheck2Icon, path: "/wali-murid" },
  { label: "Laporan Progress", icon: ListChecksIcon, path: "/laporan" },
];
export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { logout,user } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const sidebarMenus = [...menus];
  if (user?.role === "SUPERADMIN") {
    sidebarMenus.push({
      label: "Manajemen Admin",
      icon: ShieldCheck,
      path: "/manajemen-admin",
    });
  }

  const handleConfirmLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-white shadow-sm flex flex-col py-8 z-50">
      <nav className="flex flex-col gap-1 flex-1">
        {sidebarMenus.map((m) => {
          const isActive = pathname === m.path || pathname.startsWith(m.path + "/");
          return (
            <button
              key={m.path}
              onClick={() => navigate(m.path)}
              className={[
                "flex items-center gap-3.5 px-6 py-3 mr-4 rounded-r-full text-sm font-semibold transition-all duration-200",
                isActive
                  ? "bg-teal-50 text-teal-600 border-l-4 border-teal-500 pl-5"
                  : "text-gray-400 hover:bg-teal-50 hover:text-teal-500",
              ].join(" ")}
            >
              <m.icon size={18} />
              <span>{m.label}</span>
            </button>
          );
        })}
      </nav>

      <button
        onClick={() => setShowLogoutModal(true)}
        className="flex items-center gap-3.5 px-6 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
      >
        <LogOut size={20} className="text-red-600" />
        <span>Logout</span>
      </button>

      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <LogOut size={24} className="text-red-500" />
            </div>
            <h2 className="text-lg font-extrabold text-gray-900 mb-1.5">
              Konfirmasi Logout
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Apakah Anda yakin ingin keluar dari akun ini?
            </p>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2.5 rounded-full text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 py-2.5 rounded-full text-sm font-bold text-white bg-red-500 hover:bg-red-600 active:scale-95 shadow-md shadow-red-200 transition-all"
              >
                Ya, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}