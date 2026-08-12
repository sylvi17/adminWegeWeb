import { useEffect, useState } from "react";
import { getActivityLogs } from "../services/activityService";

const CACHE_KEY = "deletedUserNames";

function getCachedUserName(userId) {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    const cache = raw ? JSON.parse(raw) : {};
    return cache[String(userId)] ?? null;
  } catch {
    return null;
  }
}

// helper untuk format teks yang mengandung underscore (misal: WALI_MURID -> WALI MURID)
function formatDescription(description) {
  if (!description) return "-";

  // Ganti pola "user id <angka>" dengan nama dari cache jika tersedia
  const replaced = description.replace(/user id (\d+)/i, (match, id) => {
    const nama = getCachedUserName(id);
    return nama ? `user: ${nama}` : match;
  });

  return replaced.replace(/_/g, " ");
}

export default function useActivityLogs() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const data = await getActivityLogs();
      const mapped = data.map((log) => ({
        id: log.id,
        icon: "📝",
        text: log.admin.nama,
        highlight: formatDescription(log.description),
        time: new Date(log.createdAt).toLocaleString("id-ID"),
      }));
      setActivities(mapped);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchActivities();
  }, []);

  return {
    activities,
    loading,
    error,
    refetch: fetchActivities,
  };
}