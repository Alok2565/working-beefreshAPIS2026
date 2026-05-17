// export const BASE_URL = "http://localhost:5000/uploads";

// export const UPLOAD_PATHS = {
//   banners: "home_banners",
// };

export const BASE_URL = "http://localhost:5000/uploads";

// ================= UPLOAD PATHS =================
export const UPLOAD_PATHS = {
  homeBanners: "home_banners/",
  productCategories: "products/category",
  products: "products/items",
  users: "users/profile",
  blogs: "blogs",
};

// ================= IMAGE URL HELPER =================
export const getImageUrl = (folder: string, image?: string | null) => {
  if (!image) {
    return "";
  }

  return `${BASE_URL}/${folder}/${image}`;
};
