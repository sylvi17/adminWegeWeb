import apiClient from "./api";

export const getActivityLogs = async () => {
  const response = await apiClient.get("/admin/activity-logs");
  return response.data;
};