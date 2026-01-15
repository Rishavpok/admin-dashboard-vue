import api from "../api/axios";


export const login = (data:any) => api.post('/auth/login', data)