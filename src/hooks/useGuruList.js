import { useState, useEffect, useCallback } from "react";
import { guruController } from "../controller/guruController";
 
export function useGuruList() {
  const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");
 
  const fetch = useCallback(() => {
    setLoading(true);
    setError("");
    guruController.getAll()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
 
  useEffect(() => {
    fetch();
  }, [fetch]);
 
  return { data, loading, error, refetch: fetch };
}