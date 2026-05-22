import API from "../api/axios";

export const getCategories = () => {
  return API.get("/category/list", {
    withCredentials: true,
  });
};

//
// BRAND
//

export const getBrands = () =>
  API.get("/brands", {
    withCredentials: true,
  });

//
// WEIGHT UNITS
//

export const getWeightUnits = () =>
  API.get("/weight_units", {
    withCredentials: true,
  });

//
// FLAVORS
//

export const getFlavors = () =>
  API.get("/flavors", {
    withCredentials: true,
  });

//
// PACKAGING
//

export const getPackagings = () =>
  API.get("/packaging_types", {
    withCredentials: true,
  });

//
// PURITY
//

export const getPurities = () =>
  API.get("/purities", {
    withCredentials: true,
  });

//
// TAX MASTER
//

export const getTaxMasters = () =>
  API.get("/tax_master", {
    withCredentials: true,
  });
