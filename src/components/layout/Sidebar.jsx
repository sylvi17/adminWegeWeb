import { useNavigate, useLocation } from "react-router-dom";

const menus = [
  { label: "Dashboard",        icon: "⊞", path: "/dashboard" },
  { label: "Data Santri",      icon: "🎓", path: "/santri"    },
  { label: "Data Pengajar",    icon: "📋", path: "/pengajar"  },
  { label: "Laporan Progress", icon: "📊", path: "/laporan"   },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-white shadow-sm flex flex-col py-8 z-50">
      <nav className="flex flex-col gap-1 flex-1">
        {menus.map((m) => {
          const isActive = pathname === m.path;
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
              <span className="text-lg w-6 text-center">{m.icon}</span>
              <span>{m.label}</span>
            </button>
          );
        })}
      </nav>

      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-3.5 px-6 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
      >
        <span className="text-lg">🚪</span>
        <span>Logout</span>
      </button>
    </aside>
  );
}