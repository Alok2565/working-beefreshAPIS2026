// export const getDefaultRouteByRole = (role: number) => {
//   if (role === 1) return "/admin/dashboard";
//   if (role === 2) return "/user/dashboard";
//   return "/";
// };

export const getDefaultRouteByRole = (role: number) => {
  if (role === 1) return "/admin/dashboard";
  if (role === 2) return "/user/dashboard";
  return "/";
};
