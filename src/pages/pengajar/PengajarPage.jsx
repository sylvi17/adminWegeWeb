// src/pages/pengajar/PengajarPage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PengajarPage.css";

// Data dummy 30 pengajar
const allPengajar = [
  { id:1,  nama:"Ustadzah Nurul Amanah",    nip:"18739264-002", kelas:"Jilid 2, Jilid 3", status:"Aktif",  jumlah:12 },
  { id:2,  nama:"Ustadz Ahmad Ali",         nip:"43278901-009", kelas:"Jilid 1, Jilid 4", status:"Aktif",  jumlah:7  },
  { id:3,  nama:"Ustadz Muhammad Ilham",    nip:"10985764-004", kelas:"Jilid 5, Jilid 6", status:"Aktif",  jumlah:10 },
  { id:4,  nama:"Ustadzah Amalia",          nip:"65743921-006", kelas:"Tajwid",            status:"Cuti",   jumlah:12 },
  { id:5,  nama:"Ustadz Hasan Basri",       nip:"22341876-011", kelas:"Jilid 3, Jilid 4", status:"Aktif",  jumlah:9  },
  { id:6,  nama:"Ustadzah Siti Fatimah",    nip:"77654321-013", kelas:"Jilid 1, Jilid 2", status:"Aktif",  jumlah:14 },
  { id:7,  nama:"Ustadz Zainal Arifin",     nip:"33219876-007", kelas:"Juz 30",           status:"Aktif",  jumlah:11 },
  { id:8,  nama:"Ustadzah Khadijah",        nip:"55432198-008", kelas:"Jilid 5, Tajwid",  status:"Izin",   jumlah:8  },
  { id:9,  nama:"Ustadz Budi Santoso",      nip:"11234567-003", kelas:"Jilid 2, Jilid 3", status:"Aktif",  jumlah:15 },
  { id:10, nama:"Ustadzah Ruqayyah",        nip:"44321987-010", kelas:"Jilid 6, Juz 30",  status:"Aktif",  jumlah:6  },
  { id:11, nama:"Ustadz Irfan Hakim",       nip:"66543210-012", kelas:"Jilid 4, Jilid 5", status:"Aktif",  jumlah:13 },
  { id:12, nama:"Ustadzah Maryam",          nip:"88765432-014", kelas:"Jilid 1",           status:"Aktif",  jumlah:10 },
  { id:13, nama:"Ustadz Bilal Saputra",     nip:"99876543-015", kelas:"Tajwid, Juz 30",   status:"Aktif",  jumlah:9  },
  { id:14, nama:"Ustadzah Asma Rahayu",     nip:"12398765-016", kelas:"Jilid 2",           status:"Cuti",   jumlah:7  },
  { id:15, nama:"Ustadz Salman Alfarisi",   nip:"34512876-017", kelas:"Jilid 3, Jilid 4", status:"Aktif",  jumlah:11 },
  { id:16, nama:"Ustadzah Hafshah",         nip:"56734512-018", kelas:"Jilid 5",           status:"Aktif",  jumlah:8  },
  { id:17, nama:"Ustadz Ammar Zubair",      nip:"78956734-019", kelas:"Jilid 6",           status:"Aktif",  jumlah:12 },
  { id:18, nama:"Ustadzah Ramlah",          nip:"90178956-020", kelas:"Juz 30",            status:"Aktif",  jumlah:10 },
  { id:19, nama:"Ustadz Khalid Wahyudi",    nip:"23490178-021", kelas:"Tajwid",            status:"Izin",   jumlah:9  },
  { id:20, nama:"Ustadzah Zainab",          nip:"45623490-022", kelas:"Jilid 1, Jilid 2", status:"Aktif",  jumlah:14 },
  { id:21, nama:"Ustadz Umar Farouq",       nip:"67845623-023", kelas:"Jilid 3",           status:"Aktif",  jumlah:7  },
  { id:22, nama:"Ustadzah Hindun",          nip:"89067845-024", kelas:"Jilid 4, Jilid 5", status:"Aktif",  jumlah:11 },
  { id:23, nama:"Ustadz Thalhah",           nip:"01289067-025", kelas:"Jilid 6, Juz 30",  status:"Aktif",  jumlah:8  },
  { id:24, nama:"Ustadzah Sumayyah",        nip:"24501289-026", kelas:"Jilid 2",           status:"Aktif",  jumlah:13 },
  { id:25, nama:"Ustadz Mahmud Yunus",      nip:"46723501-027", kelas:"Tajwid, Juz 30",   status:"Aktif",  jumlah:9  },
  { id:26, nama:"Ustadzah Ummu Kultsum",    nip:"68945723-028", kelas:"Jilid 1",           status:"Aktif",  jumlah:10 },
  { id:27, nama:"Ustadz Abdullah Hakim",    nip:"81267945-029", kelas:"Jilid 3, Jilid 4", status:"Aktif",  jumlah:12 },
  { id:28, nama:"Ustadzah Fatimah Zahra",   nip:"03489167-030", kelas:"Jilid 5",           status:"Aktif",  jumlah:8  },
  { id:29, nama:"Ustadz Ahmad Fauzi",       nip:"25601389-031", kelas:"Jilid 6",           status:"Aktif",  jumlah:11 },
  { id:30, nama:"Ustadzah Sarah Az-Zahra",  nip:"47823601-032", kelas:"Juz 30, Tajwid",   status:"Aktif",  jumlah:9  },
];

// Kehadiran hari ini (sample)
const kehadiran = [
  { nama:"Ustadzah Nurul Amanah", kelas:"Jilid 2, Jilid 3", status:"BELUM HADIR" },
  { nama:"Ustadz Muhammad Ilham", kelas:"Jilid 5, Jilid 6", status:"IZIN"        },
  { nama:"Ustadz Ahmad Fauzi",    kelas:"Jilid 6",           status:"HADIR"       },
];

// Log aktivitas admin
const logAktivitas = [
  { icon:"👤", text:"Admin menambahkan pengajar baru", highlight:"Sarah Az-Zahra.",    time:"10 MENIT YANG LALU" },
  { icon:"📝", text:"Admin memperbarui jadwal kelas",  highlight:"Rizky Kurniawan.",   time:"1 JAM YANG LALU"    },
  { icon:"🛡️", text:"Admin memverifikasi berkas",      highlight:"Ahmad Fauzi.",       time:"KEMARIN"            },
];

const menus = [
  { label:"Dashboard",        icon:"⊞", path:"/dashboard" },
  { label:"Data Santri",      icon:"🎓", path:"/santri"    },
  { label:"Data Pengajar",    icon:"📋", path:"/pengajar"  },
  { label:"Laporan Progress", icon:"📊", path:"/laporan"   },
];

const PER_PAGE = 5;

const statusColor = { Aktif:"aktif", Cuti:"cuti", Izin:"izin" };

export default function PengajarPage() {
  const navigate = useNavigate();
  const [search,      setSearch]      = useState("");
  const [filterStatus,setFilterStatus]= useState("Semua Status");
  const [page,        setPage]        = useState(1);

  const totalAktif = allPengajar.filter(p => p.status === "Aktif").length;
  const totalIzin  = allPengajar.filter(p => p.status !== "Aktif").length;

  // Filter berdasarkan search + status
  const filtered = allPengajar.filter(p => {
    const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase()) ||
                        p.kelas.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "Semua Status" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPage = Math.ceil(filtered.length / PER_PAGE);
  const displayed = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleFilter = (val) => { setFilterStatus(val); setPage(1); };

  // Hari ini
  const today = new Date().toLocaleDateString("id-ID", {
    weekday:"long", day:"numeric", month:"long", year:"numeric"
  }).toUpperCase();

  return (
    <div className="pengajar-root">

      {/* SIDEBAR */}
      <aside className="dash-sidebar">
        {menus.map(m => (
          <div
            key={m.label}
            className={`dash-menu-item ${m.path === "/pengajar" ? "active" : ""}`}
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
      <main className="pengajar-main">

        {/* Topbar */}
        <div className="pengajar-topbar">
          <div className="pengajar-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Cari santri atau laporan......"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
        </div>

        {/* Header */}
        <div className="pengajar-header">
          <div>
            <h1 className="pengajar-title">Data Pengajar</h1>
            <p className="pengajar-subtitle">Kelola informasi guru dan pembimbing TPQ</p>
          </div>
          <button className="pengajar-add-btn">+ Tambah Pengajar Baru</button>
        </div>

        {/* Stat Cards */}
        <div className="pengajar-stats">
          <div className="pengajar-stat-card">
            <div className="pengajar-stat-icon teal">👥</div>
            <div>
              <p className="pengajar-stat-label">TOTAL PENGAJAR</p>
              <p className="pengajar-stat-value">{allPengajar.length}</p>
            </div>
          </div>
          <div className="pengajar-stat-card">
            <div className="pengajar-stat-icon green">✅</div>
            <div>
              <p className="pengajar-stat-label">AKTIF MENGAJAR</p>
              <p className="pengajar-stat-value">{totalAktif}</p>
            </div>
          </div>
          <div className="pengajar-stat-card">
            <div className="pengajar-stat-icon grey">📅</div>
            <div>
              <p className="pengajar-stat-label">IZIN/ CUTI</p>
              <p className="pengajar-stat-value">{totalIzin}</p>
            </div>
          </div>
        </div>

        {/* Tabel */}
        <div className="pengajar-table-wrap">

          {/* Filter bar */}
          <div className="pengajar-filter-bar">
            <div className="pengajar-filter-group">
              <select
                className="pengajar-select"
                value={filterStatus}
                onChange={e => handleFilter(e.target.value)}
              >
                <option>Semua Status</option>
                <option>Aktif</option>
                <option>Cuti</option>
                <option>Izin</option>
              </select>
              <select className="pengajar-select">
                <option>Semua Kelas</option>
                <option>Jilid 1</option>
                <option>Jilid 2</option>
                <option>Jilid 3</option>
                <option>Jilid 4</option>
                <option>Jilid 5</option>
                <option>Jilid 6</option>
                <option>Juz 30</option>
                <option>Tajwid</option>
              </select>
            </div>
            <span className="pengajar-count">
              MENAMPILKAN {filtered.length} PENGAJAR
            </span>
          </div>

          {/* Tabel data */}
          <table className="pengajar-table">
            <thead>
              <tr>
                <th>NAMA USTADZ/ USTADZAH</th>
                <th>KELAS DIAMPU</th>
                <th>STATUS</th>
                <th>JUMLAH SANTRI</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="pengajar-nama">{p.nama}</div>
                    <div className="pengajar-nip">NIP : {p.nip}</div>
                  </td>
                  <td>{p.kelas}</td>
                  <td>
                    <span className={`pengajar-badge ${statusColor[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>{p.jumlah}</td>
                  <td>
                    <div className="pengajar-aksi">
                      <button className="pengajar-btn-edit" title="Edit">✏️</button>
                      <button className="pengajar-btn-delete" title="Hapus">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer pagination */}
          <div className="pengajar-footer">
            <span className="pengajar-page-info">
              Halaman {page} dari {totalPage}
            </span>
            <div className="pengajar-pagination">
              <button
                className="pengajar-page-btn"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >‹</button>
              {Array.from({ length: totalPage }, (_, i) => (
                <button
                  key={i}
                  className={`pengajar-page-btn ${page === i+1 ? "active" : ""}`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="pengajar-page-btn"
                onClick={() => setPage(p => Math.min(totalPage, p + 1))}
                disabled={page === totalPage}
              >›</button>
            </div>
          </div>
        </div>

        {/* Baris bawah: Kehadiran + Log Aktivitas */}
        <div className="pengajar-bottom">

          {/* Kehadiran hari ini */}
          <div className="pengajar-kehadiran">
            <div className="pengajar-kehadiran-header">
              <h2>Kehadiran Pengajar Hari ini</h2>
              <span className="pengajar-tanggal">{today}</span>
            </div>
            {kehadiran.map((k, i) => (
              <div key={i} className="pengajar-kehadiran-row">
                <div>
                  <div className="pengajar-nama">{k.nama}</div>
                  <div className="pengajar-nip">{k.kelas}</div>
                </div>
                <span className={`pengajar-kehadiran-status ${k.status.toLowerCase().replace(" ","-")}`}>
                  {k.status}
                </span>
              </div>
            ))}
          </div>

          {/* Log Aktivitas Admin */}
          <div className="pengajar-log">
            <h2 className="pengajar-log-title">🔄 Log Aktivitas Admin</h2>
            {logAktivitas.map((l, i) => (
              <div key={i} className="pengajar-log-item">
                <div className="pengajar-log-icon">{l.icon}</div>
                <div>
                  <p className="pengajar-log-text">
                    {l.text}{" "}
                    <span className="pengajar-log-highlight">{l.highlight}</span>
                  </p>
                  <p className="pengajar-log-time">{l.time}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}