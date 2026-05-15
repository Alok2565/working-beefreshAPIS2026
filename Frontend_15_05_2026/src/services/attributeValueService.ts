import API from "../api/axios";

// ================= CREATE =================
export const createAttributeValue = (data: any) => {
  return API.post("/attribute_values/create", data, {
    withCredentials: true,
  });
};

// ================= GET ALL =================
export const getAttributeValues = () =>
  API.get("/attribute_values", {
    withCredentials: true,
  });

// ================= GET BY ID =================
export const getAttributeValueById = (id: number) =>
  API.get(`/attribute_values/${id}`, {
    withCredentials: true,
  });

// ================= UPDATE =================
export const updateAttributeValue = (id: number, data: any) =>
  API.put(`/attribute_values/update/${id}`, data, {
    withCredentials: true,
  });

// ================= STATUS =================
export const updateAttributeValueStatus = (id: number) =>
  API.put(
    `/attribute_values/status/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

// ================= SOFT DELETE =================
export const softDeleteAttributeValue = (id: number) =>
  API.patch(
    `/attribute_values/soft-delete/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

// ================= RESTORE =================
export const restoreAttributeValue = (id: number) =>
  API.patch(
    `/attribute_values/restore/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

// ================= HARD DELETE =================
export const deleteAttributeValue = (id: number) =>
  API.delete(`/attribute_values/delete/${id}`, {
    withCredentials: true,
  });
