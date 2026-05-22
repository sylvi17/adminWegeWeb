// src/pages/dashboard/DashboardPage.jsx

import { useNavigate } from "react-router-dom";
import "./DashboardPage.css";

const stats = [
  { icon: "👥", label: "Total Santri",        value: "250",  suffix: "",     bg: "#fff", dark: false },
  { icon: "✅", label: "Santri Aktif",         value: "150",  suffix: "",     bg: "#fff", dark: false },
  { icon: "⭐", label: "Rata-rata Kelancaran", value: "85.5", suffix: "/100", bg: "#f0e2cc", dark: false },
  { icon: "📅", label: "Kehadiran Hari ini",   value: "80%",  suffix: "",     bg: "#26a69a", dark: true  },
];

const weekData = [
  { day: "Senin",   val: 4 },
  { day: "Selasa",  val: 3 },
  { day: "Rabu",    val: 9 },
  { day: "Kamis",   val: 6 },
  { day: "Jumat",   val: 1, today: true },
  { day: "Sabtu",   val: 3 },
  { day: "Minggu",  val: 7 },
];

const activities = [
  { name: "Arsya",        action: "menyelesaikan Yanbu'a", detail: "Jilid 2 hal 17",    time: "5 MENIT YANG LALU" },
  { name: "Ahmad",        action: "menyelesaikan Yanbu'a", detail: "Jilid 4 hal 2",     time: "2 JAM YANG LALU"   },
  { name: "Ustadz Ilham", action: "baru Memperbarui",      detail: "progress kelas 3",  time: "1 JAM YANG LALU"   },
  { name: "Naila",        action: "naik ke Yanbu'a",       detail: "Jilid 5",           time: "7 MENIT YANG LALU" },
];

const menus = [
  { label: "Dashboard",        icon: "⊞", path: "/dashboard" },
  { label: "Data Santri",      icon: "🎓", path: "/santri"    },
  { label: "Data Pengajar",    icon: "📋", path: "/pengajar"  },
  { label: "Laporan Progress", icon: "📊", path: "/laporan"   },
];

const maxVal = Math.max(...weekData.map(d => d.val));

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="dash-root">

      {/* SIDEBAR */}
      <aside className="dash-sidebar">
        {menus.map(m => (
          <div
            key={m.label}
            className={`dash-menu-item ${m.path === "/dashboard" ? "active" : ""}`}
            onClick={() => navigate(m.path)}
          >
            <span className="dash-menu-icon">{m.icon}</span>
            <span className="dash-menu-label">{m.label}</span>
          </div>
        ))}
        <div className="dash-logout" onClick={() => navigate("/")}>
          <span>🚪</span>
          <span>Logout</span>
        </div>
      </aside>

      {/* MAIN */}
      <main className="dash-main">

        {/* Search */}
        <div className="dash-topbar">
          <div className="dash-search">
            <span>🔍</span>
            <input type="text" placeholder="Cari santri atau laporan......" />
          </div>
        </div>

        {/* Header */}
        <div className="dash-header">
          <p className="dash-overview-label">DASHBOARD OVERVIEW</p>
          <h1 className="dash-greeting">Assalamualaikum, Admin</h1>
          <p className="dash-subtitle">Berikut adalah ringkasan perkembangan santri TPQ</p>
        </div>

        {/* Stat Cards */}
        <div className="dash-stats">
          {stats.map(s => (
            <div
              key={s.label}
              className="dash-stat-card"
              style={{ background: s.bg }}
            >
              <span className="dash-stat-icon">{s.icon}</span>
              <p className="dash-stat-label" style={{ color: s.dark ? "#ffffffd9" : "#999" }}>
                {s.label}
              </p>
              <p className="dash-stat-value" style={{ color: s.dark ? "#fff" : "#1a1a1a" }}>
                {s.value}
                {s.suffix && <span className="dash-stat-suffix" style={{ color: s.dark ? "rgba(255,255,255,0.7)" : "#aaa" }}>{s.suffix}</span>}
              </p>
            </div>
          ))}
        </div>

        {/* Chart + Aktivitas */}
        <div className="dash-bottom">

          {/* Chart */}
          <div className="dash-chart-card">
            <div className="dash-chart-header">
              <div>
                <h2 className="dash-chart-title">Progres Mingguan</h2>
                <p className="dash-chart-sub">Statistik rata rata halaman perhari</p>
              </div>
              <select className="dash-select">
                <option>Minggu ini</option>
                <option>Minggu lalu</option>
              </select>
            </div>
            <div className="dash-bars">
              {weekData.map(d => (
                <div key={d.day} className="dash-bar-col">
                  <div
                    className={`dash-bar ${d.today ? "today" : ""}`}
                    style={{ height: `${(d.val / maxVal) * 140}px` }}
                  />
                  <span className={`dash-bar-label ${d.today ? "today-label" : ""}`}>
                    {d.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Aktivitas */}
          <div className="dash-activity-card">
            <h2 className="dash-activity-title">Aktivitas Terbaru</h2>
            <div className="dash-activity-list">
              {activities.map((a, i) => (
                <div key={i} className="dash-activity-item">
                  <p className="dash-activity-text">
                    <strong>{a.name}</strong> {a.action}{" "}
                    <span className="dash-activity-detail">{a.detail}</span>
                  </p>
                  <p className="dash-activity-time">{a.time}</p>
                </div>
              ))}
            </div>
            <button className="dash-activity-btn">Lihat Semua Aktivitas</button>
          </div>
        </div>

        {/* Action Cards */}
        <div className="dash-actions">
          <div className="dash-action-card teal">
            <h2>Input Progress Santri</h2>
            <p>Catat pencapaian hari ini dengan cepat</p>
            <button>Mulai Input</button>
          </div>
          <div className="dash-action-card green">
            <h2>Laporan Bulanan</h2>
            <p>Unduh rangkuman bulanan untuk orang tua</p>
            <button>Unduh PDF</button>
          </div>
        </div>

      </main>
    </div>
  );
}