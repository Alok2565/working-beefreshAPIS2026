import API from "../api/axios";

// ================= CREATE =================
export const createTaxMaster = (data: any) =>
  API.post("/tax_master/create", data, {
    withCredentials: true,
  });

// ================= GET ALL =================
export const getTaxMasters = () =>
  API.get("/tax_master", {
    withCredentials: true,
  });

// ================= GET BY ID =================
export const getTaxMasterById = (id: number) =>
  API.get(`/tax_master/${id}`, {
    withCredentials: true,
  });

// ================= STATUS UPDATE =================
export const updateTaxMasterStatus = (id: number) =>
  API.put(
    `/tax_master/status/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

// ================= UPDATE =================
export const updateTaxMaster = (id: number, data: any) =>
  API.put(`/tax_master/update/${id}`, data, {
    withCredentials: true,
  });

// ================= SOFT DELETE =================
export const softDeleteTaxMaster = (id: number) =>
  API.patch(
    `/tax_master/soft-delete/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

// ================= RESTORE =================
export const restoreTaxMaster = (id: number) =>
  API.patch(
    `/tax_master/restore/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

// ================= DELETE =================
export const deleteTaxMaster = (id: number) =>
  API.delete(`/tax_master/delete/${id}`, {
    withCredentials: true,
  });
