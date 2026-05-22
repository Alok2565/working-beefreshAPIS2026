export const BASE_URL = "http://localhost:5000/uploads";

export const UPLOAD_PATHS = {
  homeBanners: "banners/sliders",
  productCategories: "products/category",
  products: "products/items",
  users: "users/profile",
  blogs: "blogs",
};

export const getImageUrl = (folder: string, image?: string | null) => {
  if (!image) {
    return "";
  }

  return `${BASE_URL}/${folder}/${image}`;
};
