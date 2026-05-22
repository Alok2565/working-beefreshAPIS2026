import API from "../api/axios";

// ================= CREATE =================
export const createProductAttribute = (data: any) =>
  API.post("/product_attributes/create", data, {
    withCredentials: true,
  });

// ================= GET ALL =================
export const getProductAttributes = () =>
  API.get("/product_attributes", {
    withCredentials: true,
  });

// ================= GET BY ID =================
export const getProductAttributeById = (id: number) =>
  API.get(`/product_attributes/${id}`, {
    withCredentials: true,
  });

// ================= STATUS UPDATE =================
export const updateProductAttributeStatus = (id: number) =>
  API.put(`/product_attributes/status/${id}`, {
    withCredentials: true,
  });

// ================= UPDATE =================
export const updateProductAttribute = (id: number, data: any) =>
  API.put(`/product_attributes/update/${id}`, data, {
    withCredentials: true,
  });

// ================= SOFT DELETE =================
export const softDeleteProductAttribute = (id: number) =>
  API.patch(
    `/product_attributes/soft-delete/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

// ================= RESTORE =================
export const restoreProductAttribute = (id: number) =>
  API.patch(
    `/product_attributes/restore/${id}`,
    {},
    {
      withCredentials: true,
    },
  );
export const deleteProductAttribute = (id: number) =>
  API.delete(`/product_attributes/delete/${id}`, {
    withCredentials: true,
  });
