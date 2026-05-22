// src/pages/santri/DetailSantri.jsx

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { kelasData } from "./SantriPage";
import "./DetailSantri.css";

// Generate data siswa dummy berdasarkan id kelas
const generateSiswa = (kelasId, jumlah) => {
  const namaDummy = [
    "Ahmad Fathoni","Siti Aisyah","Muhammad Rizky","Fatimah Zahra","Abdullah Hakim",
    "Khadijah Putri","Umar Farouq","Zainab Nisa","Ali Murtadho","Maryam Salsabila",
    "Hasan Basri","Ruqayyah Dewi","Husain Akbar","Hafshah Amira","Bilal Saputra",
    "Asma Rahayu","Salman Alfarisi","Sumayyah Lestari","Ammar Zubair","Ramlah Fitri",
    "Khalid Wahyudi","Ummu Kultsum","Zubair Ahmad","Hindun Safitri","Thalhah Putra",
  ];
  const jilid = ["Yanbu'a Jilid 1","Yanbu'a Jilid 2","Yanbu'a Jilid 3","Yanbu'a Jilid 4","Juz 30 (Al-Lail)","Juz 30 (An-Naba)","Juz 'Amma"];
  const status = ["Lancar","Cukup Lancar","Perlu Perhatian"];
  const statusColor = { "Lancar": "lancar", "Cukup Lancar": "cukup", "Perlu Perhatian": "perlu" };
  const tanggal = ["10 Jan 2024","15 Jan 2024","20 Feb 2024","12 Feb 2024","5 Mar 2024","18 Mar 2024","1 Apr 2024"];

  return Array.from({ length: jumlah }, (_, i) => ({
    id: i + 1,
    nama: namaDummy[i % namaDummy.length],
    pengajar: kelasData.find(k => k.id === kelasId)?.pengajar || "-",
    jilid: jilid[i % jilid.length],
    halaman: Math.floor(Math.random() * 20) + 1,
    terakhirSetor: tanggal[i % tanggal.length],
    status: status[i % status.length],
    statusColor: statusColor[status[i % status.length]],
  }));
};

const PER_PAGE = 8;

const menus = [
  { label: "Dashboard",        icon: "⊞", path: "/dashboard" },
  { label: "Data Santri",      icon: "🎓", path: "/santri"    },
  { label: "Data Pengajar",    icon: "📋", path: "/pengajar"  },
  { label: "Laporan Progress", icon: "📊", path: "/laporan"   },
];

export default function DetailSantri() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const kelas  = kelasData.find(k => k.id === Number(id));
  if (!kelas) return <div style={{padding:40}}>Kelas tidak ditemukan.</div>;

  const semuaSiswa = generateSiswa(kelas.id, kelas.siswa);

  const filtered = semuaSiswa.filter(s =>
    s.nama.toLowerCase().includes(search.toLowerCase())
  );

  const totalPage = Math.ceil(filtered.length / PER_PAGE);
  const displayed = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="detail-root">

      {/* SIDEBAR */}
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

      {/* MAIN */}
      <main className="detail-main">

        {/* Topbar */}
        <div className="santri-topbar">
          <div className="santri-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Cari nama santri......"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <button className="santri-add-btn">+ Tambah Kelas</button>
        </div>

        {/* Tombol kembali + header */}
        <div className="detail-header">
          <button className="detail-back" onClick={() => navigate("/santri")}>
            ← Kembali
          </button>
          <p className="santri-label">TABEL SANTRI</p>
          <h1 className="santri-title">{kelas.nama.replace("Kelompok ", "")} {kelas.siswa} Siswa</h1>
        </div>

        {/* Tabel */}
        <div className="detail-table-wrap">
          <table className="detail-table">
            <thead>
              <tr>
                <th>NAMA SANTRI</th>
                <th>JILID SAAT INI</th>
                <th>HALAMAN</th>
                <th>TERAKHIR SETOR</th>
                <th>STATUS</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map(s => (
                <tr key={s.id}>
                  <td>
                    <div className="detail-nama">{s.nama}</div>
                    <div className="detail-pengajar">{s.pengajar}</div>
                  </td>
                  <td>{s.jilid}</td>
                  <td>{s.halaman}</td>
                  <td>{s.terakhirSetor}</td>
                  <td>
                    <span className={`detail-status ${s.statusColor}`}>
                      {s.status}
                    </span>
                  </td>
                  <td>
                    <button className="detail-aksi">⋮</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer tabel: info + pagination */}
          <div className="detail-footer">
            <span className="detail-info">
              Menampilkan {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} dari {filtered.length} siswa
            </span>
            <div className="detail-pagination">
              <button
                className="detail-page-btn"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                ‹
              </button>
              {Array.from({ length: totalPage }, (_, i) => (
                <button
                  key={i}
                  className={`detail-page-btn ${page === i + 1 ? "active" : ""}`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="detail-page-btn"
                onClick={() => setPage(p => Math.min(totalPage, p + 1))}
                disabled={page === totalPage}
              >
                ›
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}