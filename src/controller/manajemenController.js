import { useState, useEffect, useMemo, useCallback } from "react";
import apiClient, { ApiError } from "../services/api";

const ADMIN_ROLE_VALUE = "ADMIN";

const EMPTY_ADMIN_FORM = {
  nama: "",
  email: "",
  password: "",
  role: ADMIN_ROLE_VALUE, // otomatis, tidak bisa diubah dari form ini
};

const PAGE_SIZE = 5;

// Mencoba mengambil array user dari berbagai kemungkinan bentuk response backend
function extractUserList(raw) {
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw?.data)) return raw.data;
  if (Array.isArray(raw?.data?.data)) return raw.data.data;
  if (Array.isArray(raw?.data?.users)) return raw.data.users;
  if (Array.isArray(raw?.users)) return raw.users;
  if (Array.isArray(raw?.data?.admins)) return raw.data.admins;
  if (Array.isArray(raw?.admins)) return raw.admins;
  if (raw?.data && typeof raw.data === "object" && !Array.isArray(raw.data)) {
    return [raw.data];
  }
  return [];
}

export default function manajemenController() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [form, setForm] = useState(EMPTY_ADMIN_FORM);

  const [deletingAdmin, setDeletingAdmin] = useState(null);
  const [openActionMenuId, setOpenActionMenuId] = useState(null);

  const fetchAdmins = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const raw = await apiClient.get("/admin/users");

      // DEBUG - lihat hasil expand object ini di console, lalu kirim ke saya
      console.log("RAW /admin/users response (expand ini):", JSON.stringify(raw, null, 2));

      const allUsers = extractUserList(raw);
      console.log("Parsed allUsers:", allUsers);

      const onlyAdmins = allUsers.filter(
        (u) => u.role?.toUpperCase?.() === ADMIN_ROLE_VALUE
      );
      console.log("onlyAdmins (setelah filter role):", onlyAdmins);

      setAdmins(onlyAdmins);
    } catch (err) {
      console.error("fetchAdmins error:", err);
      setError(
        err instanceof ApiError ? err.message : "Gagal mengambil data admin"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

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

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const goToPrevPage = () => setPage((p) => Math.max(1, p - 1));
  const goToNextPage = () => setPage((p) => Math.min(totalPages, p + 1));
  const goToPage = (p) => setPage(p);

  const toggleActionMenu = (id) => {
    setOpenActionMenuId((prev) => (prev === id ? null : id));
  };
  const closeActionMenu = () => setOpenActionMenuId(null);

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
      password: "",
      role: ADMIN_ROLE_VALUE,
    });
    setShowModal(true);
    closeActionMenu();
  };

  const closeModal = () => setShowModal(false);
  const updateForm = (changes) => setForm((prev) => ({ ...prev, ...changes }));

  const submitAdmin = async (e) => {
    e.preventDefault();
    if (!form.nama.trim() || !form.email.trim()) return false;
    if (!editingAdmin && !form.password.trim()) return false;

    setLoading(true);
    setError(null);
    try {
      const payload = {
        nama: form.nama,
        email: form.email,
        role: ADMIN_ROLE_VALUE,
      };
      if (form.password.trim()) {
        payload.password = form.password;
      }

      if (editingAdmin) {
        await apiClient.put(`/admin/users/${editingAdmin.id}`, payload);
      } else {
        await apiClient.post("/admin/users", payload);
      }
      await fetchAdmins();
      setShowModal(false);
      return true;
    } catch (err) {
      console.error("submitAdmin error:", err);
      setError(
        err instanceof ApiError ? err.message : "Gagal menyimpan data admin"
      );
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
      await apiClient.delete(`/admin/users/${deletingAdmin.id}`);
      await fetchAdmins();
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Gagal menghapus admin"
      );
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