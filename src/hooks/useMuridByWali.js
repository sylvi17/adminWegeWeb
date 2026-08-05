import { useState, useEffect, useCallback } from "react";
import apiClient from "../services/api";
import { waliController } from "../controller/waliController";

function formatJilid(jilidSekarang) {
  if (!jilidSekarang) return "Belum Ada Jilid";
  return String(jilidSekarang).replace(/_/g, " ");
}

export function useMuridByWali(waliId) {
  const [wali, setWali] = useState(null);
  const [muridList, setMuridList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetch = useCallback(() => {
    if (!waliId) return;
    setLoading(true);
    setError("");

    Promise.allSettled([
      waliController.getAll(), // untuk data wali (nama, umur, peran) — selalu ada walau anak 0
      apiClient.get(`/murid/wali/${waliId}`), // untuk daftar anak
    ])
      .then(([waliResult, muridResult]) => {
        // --- Data wali ---
        if (waliResult.status === "fulfilled") {
          const waliList = waliResult.value ?? [];
          const found =
            waliList.find((w) => String(w.id) === String(waliId)) ?? null;
          setWali(found);
        } else {
          setWali(null);
        }

        // --- Data murid (untuk tabel) ---
        if (muridResult.status === "fulfilled") {
          const data = muridResult.value.data ?? [];

          setMuridList(
            data.map((m) => ({
              id: m.id,
              nama: m.nama,
              umur: m.umur,
              jenisKelamin: m.jenisKelamin,
              jilid: formatJilid(m.jilidSekarang),
              guru: m.guru?.user?.nama ?? m.guru?.nama ?? "-",
              wali: m.waliMurid?.nama ?? "-",
            }))
          );
        } else {
          const err = muridResult.reason;
          // kalau 404 = tidak ada murid, bukan error fatal
          if (
            err?.status === 404 ||
            err?.message?.includes("404") ||
            err?.message?.includes("tidak ditemukan")
          ) {
            setMuridList([]);
          } else {
            setError(err?.message ?? "Gagal memuat data murid");
          }
        }
      })
      .finally(() => setLoading(false));
  }, [waliId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { wali, muridList, loading, error, refetch: fetch };
}