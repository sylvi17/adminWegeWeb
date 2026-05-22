import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SantriPage.css";

export const kelasData = [
  { id: 1,  nama: "Kelompok Kelas A", pengajar: "Ust. Abdul Aziz",    jadwal: "Kamis, Sabtu, Minggu 15.30-17.00", siswa: 10, maks: 20 },
  { id: 2,  nama: "Kelompok Kelas B", pengajar: "Ust. Abdul Aziz",    jadwal: "Kamis, Sabtu, Minggu 15.30-17.00", siswa: 14, maks: 20 },
  { id: 3,  nama: "Kelompok Kelas C", pengajar: "Ust. Budi Santoso",  jadwal: "Senin, Rabu, Jumat 16.00-17.30",   siswa: 18, maks: 20 },
  { id: 4,  nama: "Kelompok Kelas D", pengajar: "Ust. Budi Santoso",  jadwal: "Senin, Rabu, Jumat 16.00-17.30",   siswa: 20, maks: 20 },
  { id: 5,  nama: "Kelompok Kelas E", pengajar: "Ust. Hasan Basri",   jadwal: "Selasa, Kamis, Sabtu 14.00-15.30", siswa: 8,  maks: 20 },
  { id: 6,  nama: "Kelompok Kelas F", pengajar: "Ust. Hasan Basri",   jadwal: "Selasa, Kamis, Sabtu 14.00-15.30", siswa: 12, maks: 20 },
  { id: 7,  nama: "Kelompok Kelas G", pengajar: "Ust. Irfan Hakim",   jadwal: "Minggu 08.00-10.00",               siswa: 15, maks: 20 },
  { id: 8,  nama: "Kelompok Kelas H", pengajar: "Ust. Irfan Hakim",   jadwal: "Minggu 10.00-12.00",               siswa: 20, maks: 20 },
  { id: 9,  nama: "Kelompok Kelas I", pengajar: "Ust. Zainal Arifin", jadwal: "Sabtu, Minggu 13.00-14.30",        siswa: 9,  maks: 15 },
  { id: 10, nama: "Kelompok Kelas J", pengajar: "Ust. Zainal Arifin", jadwal: "Sabtu, Minggu 15.00-16.30",        siswa: 13, maks: 15 },
  { id: 11, nama: "Kelompok Kelas K", pengajar: "Ust. Mahmud Yunus",  jadwal: "Jumat, Sabtu 16.00-17.00",         siswa: 7,  maks: 15 },
];

const menus = [
  { label: "Dashboard",        icon: "⊞", path: "/dashboard" },
  { label: "Data Santri",      icon: "🎓", path: "/santri"    },
  { label: "Data Pengajar",    icon: "📋", path: "/pengajar"  },
  { label: "Laporan Progress", icon: "📊", path: "/laporan"   },
];

export default function SantriPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = kelasData.filter(k =>
    k.nama.toLowerCase().includes(search.toLowerCase()) ||
    k.pengajar.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="santri-root">
      <aside className="dash-sidebar">
        {menus.map(m => (
          <div
            key={m.label}
            className={`dash-menu-item ${m.path === "/santri" ? "active" : ""}`}
            onClick={() => navigate(m.path)}
          >
            <span className="dash-menu-icon">{m.icon}</span>
            <span className="dash-menu-label">{m.label}</span>
          </div>
        ))}
        <div className="dash-logout" onClick={() => navigate("/")}>
          <span>🚪</span><span>Logout</span>
        </div>
      </aside>

      <main className="santri-main">
        <div className="santri-topbar">
          <div className="santri-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Cari santri atau laporan......"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="santri-add-btn">+ Tambah Kelas</button>
        </div>

        <div className="santri-header">
          <p className="santri-label">DATA KELAS SANTRI</p>
          <h1 className="santri-title">{kelasData.length} Kelas Aktif</h1>
          <p className="santri-subtitle">Klik kelas yang tersedia untuk detail siswa-siswi</p>
        </div>

        <div className="santri-grid">
          {filtered.map(k => {
            const persen = (k.siswa / k.maks) * 100;
            const penuh  = k.siswa === k.maks;
            return (
              <div
                key={k.id}
                className="santri-card"
                onClick={() => navigate(`/santri/${k.id}`)} // ← klik → detail
              >
                <span className={`santri-badge ${penuh ? "penuh" : "aktif"}`}>
                  {penuh ? "PENUH" : "AKTIF"}
                </span>
                <h2 className="santri-card-title">{k.nama}</h2>
                <div className="santri-progress-wrap">
                  <div className="santri-progress-header">
                    <span className="santri-progress-label">Jumlah Siswa</span>
                    <span className="santri-progress-count">
                      <strong>{k.siswa}</strong>/{k.maks}
                    </span>
                  </div>
                  <div className="santri-progress-bar">
                    <div
                      className={`santri-progress-fill ${penuh ? "penuh" : ""}`}
                      style={{ width: `${persen}%` }}
                    />
                  </div>
                </div>
                <div className="santri-info">
                  <div className="santri-info-row">
                    <span className="santri-info-icon">👤</span>
                    <span>{k.pengajar}</span>
                  </div>
                  <div className="santri-info-row">
                    <span className="santri-info-icon">📅</span>
                    <span>Jadwal KBM: {k.jadwal}</span>
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="santri-empty"><p>Tidak ada kelas yang ditemukan.</p></div>
          )}
        </div>
      </main>
    </div>
  );
}