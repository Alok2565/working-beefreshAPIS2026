import API from "../api/axios";

// GET SETTINGS (single row)
export const getGSTSettings = () =>
  API.get("/gst_settings", {
    withCredentials: true,
  });

// UPDATE SETTINGS
export const updateGSTSettings = (id: number, data: any) =>
  API.put(`/gst_settings/update/${id}`, data, {
    withCredentials: true,
  });