import API from "../api/axios";

// ================= CREATE =================
export const createBrand = (data: any) =>
  API.post("/brands/create", data, {
    withCredentials: true,
  });

// ================= GET ALL =================
export const getBrands = () =>
  API.get("/brands", {
    withCredentials: true,
  });

// ================= GET BY ID =================
export const getBrandById = (id: number) =>
  API.get(`/brands/${id}`, {
    withCredentials: true,
  });

// ================= STATUS UPDATE =================
export const updateBrandStatus = (id: number) =>
  API.put(
    `/brands/status/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

// ================= UPDATE =================
export const updateBrand = (id: number, data: any) =>
  API.put(`/brands/update/${id}`, data, {
    withCredentials: true,
  });

// ================= SOFT DELETE =================
export const softDeleteBrand = (id: number) =>
  API.patch(
    `/brands/soft-delete/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

// ================= RESTORE =================
export const restoreBrand = (id: number) =>
  API.patch(
    `/brands/restore/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

export const deleteBrand = (id: number) =>
  API.delete(`/brands/delete/${id}`, {
    withCredentials: true,
  });
