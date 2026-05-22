import API from "../api/axios";

// ================= CREATE =================
export const createInvoiceTaxReport = (data: any) =>
  API.post("/invoice-tax-reports/create", data, {
    withCredentials: true,
  });

// ================= GET ALL =================
export const getInvoiceTaxReports = () =>
  API.get("/invoice-tax-reports", {
    withCredentials: true,
  });