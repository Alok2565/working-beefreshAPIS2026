import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default API;

// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
//   timeout: 10000,
// });

// /**
//  * REQUEST INTERCEPTOR
//  */
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// /**
//  * RESPONSE INTERCEPTOR (VERY IMPORTANT)
//  */
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // AUTO LOGOUT IF TOKEN INVALID
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");

//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );

// export default API;
// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // attach token automatically
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;
