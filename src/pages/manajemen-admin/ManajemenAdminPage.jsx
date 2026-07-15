import { useEffect, useRef } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import PageHeader from "../../components/layout/Header";
import manajemenController from "../../controller/manajemenController";
import ModalTambahAdmin from "../../components/manajemen/ModalTambahAdmin";
import ModalEditAdmin from "../../components/manajemen/ModalEditAdmin";
import ModalDeleteAdmin from "../../components/manajemen/ModalDeleteAdmin";

export default function ManajemenAdminPage() {
  const {
    admins,
    page,
    totalPages,
    loading,
    error,
    showModal,
    editingAdmin,
    form,
    deletingAdmin,
    openActionMenuId,
    handleSearchChange,
    goToPrevPage,
    goToNextPage,
    goToPage,
    toggleActionMenu,
    closeActionMenu,
    openAddModal,
    openEditModal,
    closeModal,
    updateForm,
    submitAdmin,
    requestDelete,
    cancelDelete,
    confirmDelete,
  } = manajemenController();

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeActionMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeActionMenu]);

  return (
    <div className="flex min-h-screen bg-[#f0f0f0]">
      <Sidebar />
      <main className="ml-[240px] flex-1 px-8 pt-6 pb-12 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <Navbar onChange={handleSearchChange} />
          <button
            onClick={openAddModal}
            className="bg-teal-500 hover:bg-teal-600 active:scale-95 text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-md shadow-teal-200 transition-all whitespace-nowrap"
          >
            + Tambah Admin
          </button>
        </div>

        <PageHeader
          title="Manajemen Akun Admin"
          subtitle="Selamat mengerjakan~~~~"
        />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm overflow-visible">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-semibold">Nama</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && admins.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                    Memuat data...
                  </td>
                </tr>
              )}
              {!loading && admins.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                    Tidak ada admin ditemukan.
                  </td>
                </tr>
              )}
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{admin.nama}</td>
                  <td className="px-6 py-4 text-gray-600">{admin.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                      {admin.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 relative text-center">
                    <button
                      onClick={() => toggleActionMenu(admin.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-gray-600"
                      >
                        <circle cx="12" cy="5" r="1.8" />
                        <circle cx="12" cy="12" r="1.8" />
                        <circle cx="12" cy="19" r="1.8" />
                      </svg>
                    </button>

                    {openActionMenuId === admin.id && (
                      <div
                        ref={menuRef}
                        className="absolute right-6 top-14 z-20 bg-white rounded-xl shadow-lg border border-gray-100 py-2 w-36 text-left"
                      >
                        <button
                          onClick={() => openEditModal(admin)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-4 h-4 text-orange-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11 4h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2v-6M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                            />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => requestDelete(admin)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z"
                            />
                          </svg>
                          Hapus
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 px-6 py-5 border-t border-gray-100">
              <button
                onClick={goToPrevPage}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 disabled:opacity-40 hover:bg-gray-100 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                    p === page
                      ? "bg-teal-500 text-white"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={goToNextPage}
                disabled={page === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 disabled:opacity-40 hover:bg-gray-100 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </main>

      <ModalTambahAdmin
        show={showModal && !editingAdmin}
        form={form}
        updateForm={updateForm}
        onSubmit={submitAdmin}
        onClose={closeModal}
      />

      <ModalEditAdmin
        show={showModal && !!editingAdmin}
        form={form}
        updateForm={updateForm}
        onSubmit={submitAdmin}
        onClose={closeModal}
      />

      <ModalDeleteAdmin
        admin={deletingAdmin}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
}