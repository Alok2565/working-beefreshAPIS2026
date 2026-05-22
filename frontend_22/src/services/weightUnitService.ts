import API from "../api/axios";

// ================= CREATE =================
export const createWeightUnit = (data: any) =>
  API.post("/weight_units/create", data, {
    withCredentials: true,
  });

// ================= GET ALL =================
export const getWeightUnits = () =>
  API.get("/weight_units", {
    withCredentials: true,
  });

// ================= GET BY ID =================
export const getWeightUnitById = (id: number) =>
  API.get(`/weight_units/${id}`, {
    withCredentials: true,
  });

// ================= STATUS UPDATE =================
export const updateWeightUnitStatus = (id: number) =>
  API.put(
    `/weight_units/status/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

// ================= UPDATE =================
export const updateWeightUnit = (id: number, data: any) =>
  API.put(`/weight_units/update/${id}`, data, {
    withCredentials: true,
  });

// ================= SOFT DELETE =================
export const softDeleteWeightUnit = (id: number) =>
  API.patch(
    `/weight_units/soft-delete/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

// ================= RESTORE =================
export const restoreWeightUnit = (id: number) =>
  API.patch(
    `/weight_units/restore/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

export const deleteWeightUnit = (id: number) =>
  API.delete(`/weight_units/delete/${id}`, {
    withCredentials: true,
  });
