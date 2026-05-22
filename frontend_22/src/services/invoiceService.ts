import API from "../api/axios";

// ================= CREATE =================
export const createInvoice = (data: any) =>
  API.post("/invoices/create", data, {
    withCredentials: true,
  });

// ================= GET ALL =================
export const getInvoices = () =>
  API.get("/invoices", {
    withCredentials: true,
  });

// ================= GET BY ID =================
export const getInvoiceById = (id: number) =>
  API.get(`/invoices/${id}`, {
    withCredentials: true,
  });

// ================= UPDATE =================
export const updateInvoice = (id: number, data: any) =>
  API.put(`/invoices/update/${id}`, data, {
    withCredentials: true,
  });

// ================= STATUS =================
export const updateInvoiceStatus = (id: number) =>
  API.patch(`/invoices/status/${id}`, {}, {
    withCredentials: true,
  });

// ================= DELETE =================
export const deleteInvoice = (id: number) =>
  API.delete(`/invoices/delete/${id}`, {
    withCredentials: true,
  });