import API from "../api//axios";

export const createUser = (data: any) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("email", data.email || "");
  formData.append("mobile", data.mobile || "");
  formData.append("ip_aadress", data.description || "");
};

export const getUsers = () => API.get("/users");

export const getUserById = (id: number) => API.get(`/users/${id}`);

export const updateUserStatus = (id: number) => API.put(`/users/status/${id}`);

export const updateUser = (id: number, data: any) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("mobile", data.mobile);
  return API.put(`/users/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const softDeleteUser = (id: number) =>
  API.patch(`/users/soft-delete/${id}`);

export const restoreUser = (id: number) => API.patch(`/users/restore/${id}`);

export const deleteUser = (id: number) => API.delete(`/users/delete/${id}`);
