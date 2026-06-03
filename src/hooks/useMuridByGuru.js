// src/hooks/useMuridByGuru.js
import { useState, useEffect } from "react";
import { muridController } from "../controller/muridController";

export function useMuridByGuru(guruId) {
  const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    if (!guruId) return;
    muridController.getByGuru(guruId)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [guruId]);

  return { data, loading, error };
}