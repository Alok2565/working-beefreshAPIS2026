import API from "../api//axios";

export const getPermissions = () => API.get("/permissions");
export const createPermission = (data: any) =>
  API.post("/permissions/create", data);

export const deletePermission = (id: number, hard = false) =>
  API.delete(`/permissions/${id}?hard=${hard}`);

export const togglePermissionStatus = (id: number) =>
  API.patch(`/permissions/status/${id}`);
