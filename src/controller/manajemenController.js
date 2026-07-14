import { useState, useEffect, useMemo, useCallback } from "react";

const EMPTY_ADMIN_FORM = {
  nama: "",
  email: "",
  password: "",
  role: "",
  no_hp: "",
  alamat: "",
  umur: "",
};

const PAGE_SIZE = 5;

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// ---- Helper fetch dengan auth token & error handling ----
async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const contentType = res.headers.get("content-type");
  const data = contentType?.includes("application/json") ? await res.json() : null;

  if (!res.ok) {
    throw new Error(data?.message || `Request gagal (${res.status})`);
  }

  return data;
}

export default function manajemenController() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null); // null = mode tambah
  const [form, setForm] = useState(EMPTY_ADMIN_FORM);

  const [deletingAdmin, setDeletingAdmin] = useState(null);

  const [openActionMenuId, setOpenActionMenuId] = useState(null);

  // ---- Ambil data user dari backend ----
  const fetchAdmins = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch("/admin/users", { method: "GET" });
      // sesuaikan kalau response backend dibungkus beda, misal data.data
      setAdmins(data.data ?? data);
    } catch (err) {
      setError(err.message || "Gagal mengambil data admin");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  // ---- Derived data (search & pagination di client) ----
  const filteredAdmins = useMemo(() => {
    const q = search.toLowerCase();
    return admins.filter(
      (a) =>
        a.nama?.toLowerCase().includes(q) || a.email?.toLowerCase().includes(q)
    );
  }, [admins, search]);

  const totalPages = Math.max(1, Math.ceil(filteredAdmins.length / PAGE_SIZE));

  const paginatedAdmins = filteredAdmins.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // ---- Search & pagination handlers ----
  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const goToPrevPage = () => setPage((p) => Math.max(1, p - 1));
  const goToNextPage = () => setPage((p) => Math.min(totalPages, p + 1));
  const goToPage = (p) => setPage(p);

  // ---- Action menu handlers ----
  const toggleActionMenu = (id) => {
    setOpenActionMenuId((prev) => (prev === id ? null : id));
  };

  const closeActionMenu = () => setOpenActionMenuId(null);

  // ---- Modal (add/edit) handlers ----
  const openAddModal = () => {
    setEditingAdmin(null);
    setForm(EMPTY_ADMIN_FORM);
    setShowModal(true);
  };

  const openEditModal = (admin) => {
    setEditingAdmin(admin);
    setForm({
      nama: admin.nama ?? "",
      email: admin.email ?? "",
      password: "", // dikosongkan, hanya diisi kalau mau ganti password
      role: admin.role ?? "",
      no_hp: admin.no_hp ?? "",
      alamat: admin.alamat ?? "",
      umur: admin.umur ?? "",
    });
    setShowModal(true);
    closeActionMenu();
  };

  const closeModal = () => setShowModal(false);

  const updateForm = (changes) => setForm((prev) => ({ ...prev, ...changes }));

  // ---- CRUD operations ke backend ----
  const submitAdmin = async (e) => {
    e.preventDefault();
    if (!form.nama.trim() || !form.email.trim() || !form.role.trim()) return false;
    if (!editingAdmin && !form.password.trim()) return false; // password wajib saat tambah

    setLoading(true);
    setError(null);
    try {
      const payload = {
        nama: form.nama,
        email: form.email,
        role: form.role,
        no_hp: form.no_hp,
        alamat: form.alamat,
        umur: form.umur ? Number(form.umur) : undefined,
      };

      if (form.password.trim()) {
        payload.password = form.password;
      }

      if (editingAdmin) {
        // PUT /admin/users/{id}
        await apiFetch(`/admin/users/${editingAdmin.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        // POST /admin/users
        await apiFetch("/admin/users", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      await fetchAdmins();
      setShowModal(false);
      return true;
    } catch (err) {
      setError(err.message || "Gagal menyimpan data admin");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const requestDelete = (admin) => {
    setDeletingAdmin(admin);
    closeActionMenu();
  };

  const cancelDelete = () => setDeletingAdmin(null);

  const confirmDelete = async () => {
    if (!deletingAdmin) return;
    setLoading(true);
    setError(null);
    try {
      // DELETE /admin/users/{id}
      await apiFetch(`/admin/users/${deletingAdmin.id}`, { method: "DELETE" });
      await fetchAdmins();
    } catch (err) {
      setError(err.message || "Gagal menghapus admin");
    } finally {
      setDeletingAdmin(null);
      setLoading(false);
    }
  };

  return {
    admins: paginatedAdmins,
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
    refetch: fetchAdmins,
  };
}