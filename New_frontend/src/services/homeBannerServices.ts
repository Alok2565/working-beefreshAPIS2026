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

// export const updateHomeBanner = (id: number, data: any) =>
//   API.put(`/home_banners/update/${id}`, data);
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

// export const createHomeBanner = (data: any) => {
//   const formData = new FormData();

//   formData.append("name", data.name);
//   formData.append("slug", data.slug || "");
//   formData.append("url", data.url || "");
//   formData.append("description", data.description || "");

//   if (data.image) {
//     formData.append("image", data.image);
//   }

//   return API.post("/home_banners/create", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };
// // ✅ GET ALL
// export const getHomeBanner = () => API.get("/home_banners");

// // ✅ GET BY ID
// export const getHomeBannerById = (id: number) => API.get(`/home_banners/${id}`);

// export const updateBannerStatus = (id: number) =>
//   API.put(`/home_banners/status/${id}`);

// // ✅ UPDATE (WITH OPTIONAL IMAGE)
// export const updateHomeBanner = (id: number, data: any) => {
//   const formData = new FormData();

//   if (data.name) formData.append("name", data.name);
//   if (data.slug) formData.append("slug", data.slug);
//   if (data.url) formData.append("url", data.url);
//   if (data.description) formData.append("url", data.description);
//   if (data.image) {
//     formData.append("image", data.image);
//   }

//   return API.put(`/home_banners/update/${id}`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

// // ✅ SOFT DELETE
// export const softDeleteHomeBanner = (id: number) =>
//   API.patch(`/home_banners/soft-delete/${id}`);

// // ✅ RESTORE
// export const restoreHomeBanner = (id: number) =>
//   API.patch(`/home_banners/restore/${id}`);

// // ✅ HARD DELETE
// export const deleteHomeBanner = (id: number) =>
//   API.delete(`/home_banners/delete/${id}`);
