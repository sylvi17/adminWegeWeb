import { useState, useEffect } from "react";
import { muridController } from "../controller/muridController";

export function useMuridDetail(id) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    muridController.getById(id)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]); // re-fetch kalau id berubah

  return { data, loading, error };
}