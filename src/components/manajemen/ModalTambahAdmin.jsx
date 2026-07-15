export default function ModalTambahAdmin({ show, form, updateForm, onSubmit, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-y-auto py-8">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-bold mb-4">Tambah Admin</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.nama}
              onChange={(e) => updateForm({ nama: e.target.value })}
              placeholder="Contoh: Ahmad Fauzi"
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateForm({ email: e.target.value })}
              placeholder="email@contoh.com"
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => updateForm({ password: e.target.value })}
              placeholder="Minimal 6 karakter"
              minLength={6}
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Role</label>
            <input
              type="text"
              value="ADMIN"
              disabled
              readOnly
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
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