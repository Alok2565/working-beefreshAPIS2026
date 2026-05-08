// export const isAuthenticated = () => {
//   return !!localStorage.getItem("token");
// };

// export const getUser = () => {
//   return JSON.parse(localStorage.getItem("user") || "{}");
// };

// export const getUserRole = () => {
//   return Number(localStorage.getItem("role"));
// };

// export const login = (data: any) => {
//   localStorage.setItem("token", data.token);
//   localStorage.setItem("user", JSON.stringify(data.user));
//   localStorage.setItem("role", data.user.role_id);
// };

// export const logout = () => {
//   localStorage.clear();
// };
export const getUser = () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
