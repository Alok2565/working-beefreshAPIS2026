import API from "../api/axios";

// ================= CREATE =================
export const createFlavor = (data: any) =>
  API.post("/flavors/create", data, {
    withCredentials: true,
  });

// ================= GET ALL =================
export const getFlavors = () =>
  API.get("/flavors", {
    withCredentials: true,
  });

// ================= GET BY ID =================
export const getFlavorById = (id: number) =>
  API.get(`/flavors/${id}`, {
    withCredentials: true,
  });

// ================= STATUS UPDATE =================
export const updateFlavorStatus = (id: number) =>
  API.put(
    `/flavors/status/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

// ================= UPDATE =================
export const updateFlavor = (id: number, data: any) =>
  API.put(`/flavors/update/${id}`, data, {
    withCredentials: true,
  });

// ================= SOFT DELETE =================
export const softDeleteFlavor = (id: number) =>
  API.patch(
    `/flavors/soft-delete/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

// ================= RESTORE =================
export const restoreFlavor = (id: number) =>
  API.patch(
    `/flavors/restore/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

export const deleteFlavor = (id: number) =>
  API.delete(`/flavors/delete/${id}`, {
    withCredentials: true,
  });
