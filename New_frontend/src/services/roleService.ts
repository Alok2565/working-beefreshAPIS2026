import API from "../api//axios";

export const createRole = (data: any) => {
  const formData = new FormData();
  formData.append("name", data.name);
  return API.post("/roles/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getRoles = () => API.get("/roles");

export const getRoleById = (id: number) => API.get(`/roles/${id}`);

export const updateRoleStatus = (id: number) => API.put(`/roles/status/${id}`);

export const updateRole = (id: number, data: any) => {
  return API.put(`/roles/update/${id}`, data);
};
export const softDeleteRole = (id: number) =>
  API.patch(`/roles/soft-delete/${id}`);

export const restoreRole = (id: number) => API.patch(`/roles/restore/${id}`);

export const deleteRole = (id: number) => API.delete(`/roles/delete/${id}`);
