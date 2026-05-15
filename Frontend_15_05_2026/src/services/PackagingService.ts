import API from "../api/axios";

// ================= CREATE =================
export const createPackaging = (data: any) =>
  API.post("/packaging_types/create", data, {
    withCredentials: true,
  });

// ================= GET ALL =================
export const getPackagings = () =>
  API.get("/packaging_types", {
    withCredentials: true,
  });

// ================= GET BY ID =================
export const getPackagingById = (id: number) =>
  API.get(`/packaging_types/${id}`, {
    withCredentials: true,
  });

// ================= STATUS UPDATE =================
export const updatePackagingStatus = (id: number) =>
  API.put(
    `/packaging_types/status/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

// ================= UPDATE =================
export const updatePackaging = (id: number, data: any) =>
  API.put(`/packaging_types/update/${id}`, data, {
    withCredentials: true,
  });

// ================= SOFT DELETE =================
export const softDeletePackaging = (id: number) =>
  API.patch(
    `/packaging_types/soft-delete/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

// ================= RESTORE =================
export const restorePackaging = (id: number) =>
  API.patch(
    `/packaging_types/restore/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

export const deletePackaging = (id: number) =>
  API.delete(`/packaging_types/delete/${id}`, {
    withCredentials: true,
  });
