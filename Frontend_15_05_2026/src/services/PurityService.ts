import API from "../api/axios";

// ================= CREATE =================
export const createPurity = (data: any) =>
  API.post("/purities/create", data, {
    withCredentials: true,
  });

// ================= GET ALL =================
export const getPurities = () =>
  API.get("/purities", {
    withCredentials: true,
  });

// ================= GET BY ID =================
export const getPurityById = (id: number) =>
  API.get(`/purities/${id}`, {
    withCredentials: true,
  });

// ================= STATUS UPDATE =================
export const updatePurityStatus = (id: number) =>
  API.put(
    `/purities/status/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

// ================= UPDATE =================
export const updatePurity = (id: number, data: any) =>
  API.put(`/purities/update/${id}`, data, {
    withCredentials: true,
  });

// ================= SOFT DELETE =================
export const softDeletePurity = (id: number) =>
  API.patch(
    `/purities/soft-delete/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

// ================= RESTORE =================
export const restorePurity = (id: number) =>
  API.patch(
    `/purities/restore/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

export const deletePurity = (id: number) =>
  API.delete(`/purities/delete/${id}`, {
    withCredentials: true,
  });
