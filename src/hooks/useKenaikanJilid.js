import { useState, useEffect } from "react";
import { kenaikanJilidController } from "../controller/kenaikanJilidController";

export function useKenaikanJilid() {
  const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    kenaikanJilidController.getAll()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}