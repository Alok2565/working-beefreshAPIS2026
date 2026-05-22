import API from "../api/axios";

// ================= CREATE =================
// export const createRecord = (data: any) => {
//   const formData = new FormData();

//   formData.append("category_name", data.category_name);
//   formData.append("category_slug", data.category_slug || "");
//   formData.append("description", data.description || "");

//   if (data.image) {
//     formData.append("image", data.image);
//   }

//   return API.post("/category/create", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

export const createRecord = (data: any) => {
  const formData = new FormData();

  formData.append("parent_id", data.parent_id || "");

  formData.append("category_name", data.category_name);

  formData.append("description", data.description || "");

  if (data.image) {
    formData.append("image", data.image);
  }
  console.log("SERVICE DATA =>", data);
  return API.post("/category/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};
export const getListRecords = () => {
  return API.get("/category/list", {
    withCredentials: true,
  });
};

export const getRecordById = (id: number) => {
  return API.get(`/category/${id}`, {
    withCredentials: true,
  });
};

export const updateRecordStatus = (id: number) => {
  return API.put(`/category/status/${id}`, {
    withCredentials: true,
  });
};

export const updateRecord = (id: number, data: any) => {
  const formData = new FormData();
  formData.append("parent_id", data.parent_id || "");
  formData.append("category_name", data.category_name || "");
  formData.append("category_slug", data.category_slug || "");

  formData.append("description", data.description || "");
  if (data.image_id) {
    formData.append("image_id", data.image_id);
  }
  if (data.image) {
    formData.append("image", data.image);
  }
  for (const pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }
  return API.put(`/category/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};
export const softDeleteRecord = (id: number) => {
  return API.patch(`/category/soft-delete/${id}`);
};

export const restoreSoftDeleteRecord = (id: number) => {
  return API.patch(`/category/restore/${id}`);
};

export const deleteRecord = (id: number) => {
  return API.delete(`/category/delete/${id}`);
};
