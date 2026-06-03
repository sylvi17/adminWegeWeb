// src/controller/pengajarController.js
import { guruController } from "./guruController";
export async function fetchPengajar(setLoading, setError, setPengajar) {
  setLoading(true);
  setError(null);
  try {
    const data = await guruController.getAll();
    setPengajar(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);n
  }
}