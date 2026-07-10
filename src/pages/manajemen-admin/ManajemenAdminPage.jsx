import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import PageHeader from "../../components/layout/Header";
export default function ManajemenAdminPage() {
  return (
    <div className="flex min-h-screen bg-[#f0f0f0]">
      <Sidebar />
      <main className="ml-[240px] flex-1 px-8 pt-6 pb-12 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
        <Navbar
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
        <button
          onClick={() => setShowModal(true)}
          className="bg-teal-500 hover:bg-teal-600 active:scale-95 text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-md shadow-teal-200 transition-all whitespace-nowrap"
        >
          + Tambah Admin
        </button>
        </div>
        
        <PageHeader
          title="Manajemen Akun Admin"
          subtitle="Selamat mengerjakan~~~~ "
        />
        <p>Yang perlu dikerjakan:</p>
        <ol>
          <li>1. Munculin tabel user dengan role admin</li>
          <li>2. Fungsi add, delete, edit admin</li>
        </ol>
      </main>
    </div>
  );
}
