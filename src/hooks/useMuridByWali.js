import { useState, useEffect, useCallback } from "react";
import apiClient from "../services/api";

// helper untuk format jilid
function formatJilid(jilidSekarang) {
  if (!jilidSekarang) return "Belum Ada Jilid";
  return String(jilidSekarang).replace(/_/g, " ");
}

export function useMuridByWali(waliId) {
  const [wali,      setWali]      = useState(null);
  const [muridList, setMuridList] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState("");

  const fetch = useCallback(() => {
    if (!waliId) return;
    setLoading(true);
    setError("");

    apiClient.get(`/murid/wali/${waliId}`)
      .then((res) => {
        const data = res.data ?? [];

        // Info wali dari murid pertama
        const waliInfo = data[0]?.waliMurid ?? null;
        setWali(waliInfo ? {
          id:    waliInfo.id,
          nama:  waliInfo.nama,
          umur:  waliInfo.umur,
          peran: waliInfo.peran,
          email: waliInfo.user?.email ?? "-",
        } : null);

        // Map murid
        setMuridList(data.map((m) => ({
          id:            m.id,
          nama:          m.nama,
          umur:          m.umur,
          jenisKelamin:  m.jenisKelamin,
          jilid:         formatJilid(m.jilidSekarang),
          guru:         m.guru?.user?.nama ?? m.guru?.nama ?? "-",     // ← string untuk SantriRow
          wali:          m.waliMurid?.nama ?? "-",
        })));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [waliId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { wali, muridList, loading, error, refetch: fetch };
}