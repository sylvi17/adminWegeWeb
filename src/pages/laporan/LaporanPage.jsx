import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./LaporanPage.css";

const SURAH    = ["An-Naba","Al-Baqarah","Al-Alaq","Al-Asr","Al-Ikhlas","Al-Falaq","An-Nas","Al-Kafirun","Al-Maun","Al-Fil"];
const KELAS    = ["Kelas A","Kelas B","Kelas C","Kelas D","Kelas E"];
const JILID    = ["Jilid 1","Jilid 2","Jilid 3","Jilid 4","Jilid 5","Jilid 6"];
const NAMA     = ["Ahmad Fairus","Siti Aisyah","Akmal Akbar","Nayla Putri","Ibadallah","Rizky Pratama","Nurul Hidayah","Farhan Maulana","Zahra Amelia","Hafidz Karim","Aisyah Rahmah","Bilal Hamdan","Maryam Sholihah","Umar Faruq","Khadijah Nur","Salman Ridho","Ruqayyah Dewi","Hasan Albana","Fatimah Azahra","Zaid Mubarak","Asma Wulandari","Ammar Hakim","Hindun Safitri","Thalhah Putra","Sumayyah Fitri"];
const PENGAJAR = ["Ust.Abdul Aziz","Ustdh.Nurul Amanah","Ust.Muhammad Ali","Ustdh.Amalia","Ust.Hasan Basri"];
const STATUS   = ["Lancar","Tidak Lancar","Kurang Lancar"];

const LAPORAN = Array.from({ length: 50 }, (_, i) => ({
  id:       i + 1,
  nama:     NAMA[i % NAMA.length],
  kelas:    KELAS[i % KELAS.length],
  jilid:    JILID[i % JILID.length],
  surah:    SURAH[i % SURAH.length],
  halaman:  (i % 20) + 1,
  status:   STATUS[i % STATUS.length],
  pengajar: PENGAJAR[i % PENGAJAR.length],
}));

const MENUS = [
  { label: "Dashboard",        icon: "⊞", path: "/dashboard" },
  { label: "Data Santri",      icon: "🎓", path: "/santri"    },
  { label: "Data Pengajar",    icon: "📋", path: "/pengajar"  },
  { label: "Laporan Progress", icon: "📊", path: "/laporan"   },
];

const STATUS_CLASS = { "Lancar": "lancar", "Tidak Lancar": "tidak", "Kurang Lancar": "kurang" };
const PER_PAGE = 8;

export default function LaporanPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Semua");
  const [page,   setPage]   = useState(1);

  const filtered = useMemo(() =>
    LAPORAN.filter(d =>
      (status === "Semua" || d.status === status) &&
      [d.nama, d.pengajar, d.surah].some(v =>
        v.toLowerCase().includes(search.toLowerCase())
      )
    ), [search, status]
  );

  const totalPage = Math.ceil(filtered.length / PER_PAGE);
  const rows      = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="l-root">

      <aside className="l-sidebar">
        {MENUS.map(m => (
          <div
            key={m.path}
            className={`l-menu-item ${m.path === "/laporan" ? "active" : ""}`}
            onClick={() => navigate(m.path)}
          >
            <span className="l-menu-icon">{m.icon}</span>
            <span>{m.label}</span>
          </div>
        ))}
        <div className="l-logout" onClick={() => navigate("/")}>
          <span>🚪</span><span>Logout</span>
        </div>
      </aside>

      <main className="l-main">

        <div className="l-topbar">
          <div className="l-search">
            <span>🔍</span>
            <input
              placeholder="Cari santri atau laporan......"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
        </div>

        <div className="l-header">
          <div>
            <h1 className="l-title">Laporan Progress Santri</h1>
            <p className="l-subtitle">Berikut adalah ringkasan perkembangan hafalan dan mingguan</p>
          </div>
          <div className="l-header-btns">
            <button className="l-btn-filter">☰ Filter Laporan</button>
            <button className="l-btn-unduh">⬇ Unduh Rekap PDF</button>
          </div>
        </div>

        <div className="l-table-wrap">
          <div className="l-table-top">
            <h2 className="l-table-title">RINCIAN PROGRESS HARIAN</h2>
            <div className="l-filters">
              {["Semua","Lancar","Kurang Lancar","Tidak Lancar"].map(s => (
                <button
                  key={s}
                  className={`l-filter-btn ${status === s ? "active" : ""}`}
                  onClick={() => { setStatus(s); setPage(1); }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <table className="l-table">
            <thead>
              <tr>
                <th>NAMA SANTRI</th>
                <th>SURAH / JUZ</th>
                <th>HALAMAN</th>
                <th>STATUS KELANCARAN</th>
                <th>PENGAJAR</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(d => (
                <tr key={d.id}>
                  <td>
                    <div className="l-nama">{d.nama}</div>
                    <div className="l-sub">{d.kelas} · {d.jilid}</div>
                  </td>
                  <td>{d.surah}</td>
                  <td>{d.halaman}</td>
                  <td>
                    <span className={`l-badge ${STATUS_CLASS[d.status]}`}>
                      {d.status}
                    </span>
                  </td>
                  <td>{d.pengajar}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="l-empty">Tidak ada data ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination — semua nomor ditampilkan */}
          <div className="l-footer">
            <span className="l-page-info">Halaman {page} dari {totalPage}</span>
            <div className="l-pagination">
              <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>‹</button>
              {Array.from({ length: totalPage }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  className={page === p ? "active" : ""}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
              <button onClick={() => setPage(p => p + 1)} disabled={page === totalPage}>›</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}