import api from "../api/axios";

export const getUserList = () => api.get('/auth/admin/users')

export const createUser = (data: any) => api.post('/auth/admin/create-user', data)

export const update = (id:any ,data:any) => api.patch(`/auth/admin/update-user/${id}`,data)

export const deleteUsr = (id : any) => api.delete(`/auth/admin/delete-user/${id}`)