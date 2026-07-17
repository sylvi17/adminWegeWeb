import { useState, useRef } from "react";
import Sidebar from "../../components/layout/Sidebar";
import PengajarHeader from "../../components/pengajar/PengajarHeader";
import PengajarStats from "../../components/pengajar/PengajarStats";
import PengajarTable from "../../components/pengajar/PengajarTable";
import PengajarActivityLog from "../../components/pengajar/PengajarActivityLog";
import ModalTambahGuru from "../../components/pengajar/ModalTambahGuru";
import ModalEditPengajar from "../../components/pengajar/ModalEditPengajar";
import ModalDeletePengajar from "../../components/pengajar/ModalDeletePengajar";
import ModalPreviewImportGuru from "../../components/pengajar/ModalPreviewImpostGuru";
import { useGuruList } from "../../hooks/useGuruList";
import { guruController } from "../../controller/guruController";
import * as XLSX from "xlsx";

const PER_PAGE = 10;

export default function PengajarPage() {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editPengajar, setEditPengajar] = useState(null);
  const [deletePengajar, setDeletePengajar] = useState(null);

  const [excelData, setExcelData] = useState([]);
  const fileInputRef = useRef(null);
  const handleDownloadTemplate = () => {
    const link = document.createElement("a");

    link.href = "/template/template_pengajar.xlsx";

    link.download = "Template_Import_Pengajar.xlsx";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const mappedData = jsonData.map((item) => ({
      nama: String(item.nama ?? "").trim(),
      email: String(item.email ?? "").trim(),
      password: String(item.password ?? ""),
      no_hp: String(item.no_hp ?? "").trim(),
      alamat: String(item.alamat ?? "").trim(),
    }));

    const invalidData = mappedData.filter(
      (item) => !item.nama || !item.email || !item.password,
    );

    if (invalidData.length > 0) {
      alert("Masih ada data yang belum lengkap");
      return;
    }

    setPreviewData(mappedData);
    setShowPreview(true);

    e.target.value = "";
  };

  const { data: pengajarList, loading, error, refetch } = useGuruList();
  const totalPage = Math.max(1, Math.ceil(pengajarList.length / PER_PAGE));
  const paginatedData = pengajarList.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE,
  );

  const stats = {
    total: pengajarList.length,
    aktif: pengajarList.length,
    izin: 0,
  };
  const handleImportExcel = () => {
    fileInputRef.current?.click();
  };
  const [previewData, setPreviewData] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const handleImportData = async () => {
    const result = await guruController.createMany(previewData);

    console.table(result);

    await refetch();

    setShowPreview(false);
    setPreviewData([]);
  };

  return (
    <div className="flex min-h-screen bg-[#f0f0f0] font-nunito">
      <Sidebar />
      <input
        type="file"
        accept=".xlsx,.xls"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <main className="ml-60 flex-1 flex flex-col gap-6 px-8 pt-6 pb-12">
        <PengajarHeader
          onTambah={() => setShowModal(true)}
          onExcel={handleImportExcel}
          handleDownloadTemplate={handleDownloadTemplate}
        />
        {/* <PengajarStats
          total={stats.total}
          aktif={stats.aktif}
          izin={stats.izin}
          loading={loading}
        /> */}
        <PengajarTable
          data={paginatedData}
          page={page}
          totalPage={totalPage}
          onPageChange={setPage}
          loading={loading}
          error={error}
          onRefresh={refetch}
          onEdit={(u) => setEditPengajar(u)}
          onDelete={(u) => setDeletePengajar(u)}
        />
      </main>

      {showModal && (
        <ModalTambahGuru
          onClose={() => setShowModal(false)}
          onSuccess={refetch}
        />
      )}

      {editPengajar && (
        <ModalEditPengajar
          pengajar={editPengajar}
          onClose={() => setEditPengajar(null)}
          onSuccess={() => {
            setEditPengajar(null);
            refetch();
          }}
        />
      )}

      {deletePengajar && (
        <ModalDeletePengajar
          pengajar={deletePengajar}
          onClose={() => setDeletePengajar(null)}
          onSuccess={() => {
            setDeletePengajar(null);
            refetch();
          }}
        />
      )}
      {showPreview && (
        <ModalPreviewImportGuru
          data={previewData}
          onClose={() => setShowPreview(false)}
          onImport={handleImportData}
          existingEmails={pengajarList.map((w) => w.email.toLowerCase())}
        />
      )}
    </div>
  );
}
