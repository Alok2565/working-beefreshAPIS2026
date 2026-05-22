import API from "../api/axios";
// ================= GET ALL =================
export const getTaxRules = () =>
  API.get("/tax_rules", {
    withCredentials: true,
  });
