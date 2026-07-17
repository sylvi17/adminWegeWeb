// src/hooks/useWaliList.js
import { useState, useEffect, useCallback } from "react";
import { waliController } from "../controller/waliController";

export function useWaliList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetch = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await waliController.getAll();
      setData(data);
    } catch (err) {
      if (err.message === "Data wali tidak ditemukan") {
        setData([]);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    data,
    loading,
    error,
    refetch: fetch,
  };
}