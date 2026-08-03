import { useEffect, useState } from "react";
import { getActivityLogs } from "../services/activityService";

// helper untuk format teks yang mengandung underscore (misal: WALI_MURID -> WALI MURID)
function formatDescription(description) {
  if (!description) return "-";
  return description.replace(/_/g, " ");
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