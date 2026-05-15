import API from "../api/axios";

export const assignPermissions = (data: any) =>
  API.post("/role_permissions/assign", data);

export const getRolePermissions = (role_id: number) =>
  API.get(`/role_permissions/${role_id}`);
