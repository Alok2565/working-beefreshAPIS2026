// src/services/productService.ts

import API from "../api/axios";

//
// ======================================================
// CREATE PRODUCT
// ======================================================
//

export const createProduct = async (data: any) => {
  const formData = new FormData();

  //
  // ======================================================
  // PRODUCT INFORMATION
  // ======================================================
  //

  formData.append("category_id", data.category_id || "");

  formData.append("product_name", data.product_name || "");

  formData.append("slug", data.slug || "");

  formData.append("sku", data.sku || "");

  formData.append("brand_name", data.brand_name || "");

  formData.append("short_description", data.short_description || "");

  formData.append("long_description", data.long_description || "");

  //
  // ======================================================
  // PRODUCT ATTRIBUTES
  // ======================================================
  //

  formData.append("flavor_id", data.flavor_id || "");

  formData.append("purity_id", data.purity_id || "");

  formData.append("packaging_id", data.packaging_id || "");

  //
  // ======================================================
  // SEO INFORMATION
  // ======================================================
  //

  formData.append("seo_title", data.seo_title || "");

  formData.append("seo_keywords", data.seo_keywords || "");

  formData.append("seo_description", data.seo_description || "");

  //
  // ======================================================
  // PRODUCT FLAGS
  // ======================================================
  //

  formData.append("is_featured", String(data.is_featured ?? false));

  formData.append("is_best_seller", String(data.is_best_seller || false));

  formData.append("is_new_arrival", String(data.is_new_arrival || false));

  formData.append("status", String(data.status || true));

  //
  // ======================================================
  // THUMBNAIL IMAGE
  // ======================================================
  //

  if (data.thumbnail_image) {
    formData.append("thumbnail_image", data.thumbnail_image);
  }

  //
  // ======================================================
  // GALLERY IMAGES
  // ======================================================
  //

  if (data.gallery_images && data.gallery_images.length > 0) {
    data.gallery_images.forEach((image: File) => {
      formData.append("gallery_images", image);
    });
  }

  //
  // ======================================================
  // PRODUCT VARIANTS
  // ======================================================
  //

  formData.append("variants", JSON.stringify(data.variants || []));

  // console.log("CREATE PRODUCT DATA =>", data);
  const token = localStorage.getItem("token");
  return API.post("/products/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },

    withCredentials: true,
  });
};

//
// ======================================================
// PRODUCT LIST
// ======================================================
//

export const getProducts = () =>
  API.get("/products/list", {
    withCredentials: true,
  });

//
// ======================================================
// PRODUCT DETAILS
// ======================================================
//

export const getProductById = (id: number | string) =>
  API.get(`/products/${id}`, {
    withCredentials: true,
  });

//
// ======================================================
// UPDATE PRODUCT
// ======================================================
//

export const updateProduct = async (id: number | string, data: any) => {
  const formData = new FormData();

  //
  // PRODUCT INFO
  //

  formData.append("category_id", data.category_id || "");

  formData.append("product_name", data.product_name || "");

  formData.append("slug", data.slug || "");

  formData.append("sku", data.sku || "");

  formData.append("brand_name", data.brand_name || "");

  formData.append("short_description", data.short_description || "");

  formData.append("long_description", data.long_description || "");

  //
  // ATTRIBUTES
  //

  formData.append("flavor_id", data.flavor_id || "");

  formData.append("purity_id", data.purity_id || "");

  formData.append("packaging_id", data.packaging_id || "");

  //
  // SEO
  //

  formData.append("seo_title", data.seo_title || "");

  formData.append("seo_keywords", data.seo_keywords || "");

  formData.append("seo_description", data.seo_description || "");

  //
  // FLAGS
  //

  formData.append("is_featured", data.is_featured || false);

  formData.append("is_best_seller", data.is_best_seller || false);

  formData.append("is_new_arrival", data.is_new_arrival || false);

  formData.append("status", data.status || true);

  //
  // THUMBNAIL IMAGE
  //

  if (data.thumbnail_image) {
    formData.append("thumbnail_image", data.thumbnail_image);
  }

  //
  // GALLERY IMAGES
  //

  if (data.gallery_images && data.gallery_images.length > 0) {
    data.gallery_images.forEach((image: File) => {
      formData.append("gallery_images", image);
    });
  }

  //
  // VARIANTS
  //

  formData.append("variants", JSON.stringify(data.variants || []));

  console.log("UPDATE PRODUCT DATA =>", data);

  return API.put(`/products/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },

    withCredentials: true,
  });
};

//
// ======================================================
// DELETE PRODUCT
// ======================================================
//

export const deleteProduct = (id: number | string) =>
  API.delete(`/products/delete/${id}`, {
    withCredentials: true,
  });

//
// ======================================================
// PRODUCT STATUS UPDATE
// ======================================================
//

export const updateProductStatus = (id: number | string) =>
  API.put(
    `/products/status/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

//
// ======================================================
// DELETE PRODUCT IMAGE
// ======================================================
//

export const deleteProductImage = (id: number | string) =>
  API.delete(`/products/image/delete/${id}`, {
    withCredentials: true,
  });
