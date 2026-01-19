import api from "../api/axios";

export const getDashboardData = () => api.get('/auth/admin/dashboard-stats')