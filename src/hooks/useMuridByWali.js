import { useState, useEffect, useCallback } from "react";
import { waliController } from "../controller/waliController";

export function useMuridByWali(waliId) {
  const [wali, setWali] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetch = useCallback(async () => {
    if (!waliId) return;
    setLoading(true);
    try {
      const allWali = await waliController.getAll();
      const found = allWali.find((w) => w.id === Number(waliId));
      setWali(found ?? null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // ← sebelumnya setLoading(false)) kelebihan kurung
    }
  }, [waliId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { wali, loading, error, refetch: fetch };
}