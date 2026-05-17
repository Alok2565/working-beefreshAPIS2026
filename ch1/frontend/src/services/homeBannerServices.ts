import API from "../api/axios";

export const createHomeBanner = (data: any) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("slug", data.slug || "");
  formData.append("url", data.url || "");
  formData.append("description", data.description || "");

  if (data.image) {
    formData.append("image", data.image);
  }

  return API.post("/home_banners/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getHomeBanner = () => API.get("/home_banners");

export const getHomeBannerById = (id: number) => API.get(`/home_banners/${id}`);

export const updateBannerStatus = (id: number) =>
  API.put(`/home_banners/status/${id}`);
export const updateHomeBanner = (id: number, data: any) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("slug", data.slug);
  formData.append("url", data.url);
  formData.append("description", data.description);

  if (data.image) {
    formData.append("image", data.image);
  }

  return API.put(`/home_banners/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const softDeleteHomeBanner = (id: number) =>
  API.patch(`/home_banners/soft-delete/${id}`);

export const restoreHomeBanner = (id: number) =>
  API.patch(`/home_banners/restore/${id}`);

export const deleteHomeBanner = (id: number) =>
  API.delete(`/home_banners/delete/${id}`);

export const fetchHomePageBannerSlider = () => API.get("/home_banners");
