export default function ModalTambahAdmin({ show, form, updateForm, onSubmit, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-y-auto py-8">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-bold mb-4">Tambah Admin</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Nama</label>
            <input
              type="text"
              value={form.nama}
              onChange={(e) => updateForm({ nama: e.target.value })}
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateForm({ email: e.target.value })}
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => updateForm({ password: e.target.value })}
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Role</label>
            <input
              type="text"
              value={form.role}
              onChange={(e) => updateForm({ role: e.target.value.toUpperCase() })}
              placeholder="Contoh: ADMIN, GURU"
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">No. HP</label>
            <input
              type="text"
              value={form.no_hp}
              onChange={(e) => updateForm({ no_hp: e.target.value })}
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Alamat</label>
            <input
              type="text"
              value={form.alamat}
              onChange={(e) => updateForm({ alamat: e.target.value })}
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Umur</label>
            <input
              type="number"
              value={form.umur}
              onChange={(e) => updateForm({ umur: e.target.value })}
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-sm font-semibold text-gray-500 hover:bg-gray-100"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-full text-sm font-bold text-white bg-teal-500 hover:bg-teal-600"
            >
              Tambah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}