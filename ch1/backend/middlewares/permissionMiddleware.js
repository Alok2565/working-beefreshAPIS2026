// exports.checkPermission = (permission) => {
//   return (req, res, next) => {
//     if (!req.user.permissions.includes(permission)) {
//       return res.status(403).json({
//         success: false,
//         message: "Permission denied",
//       });
//     }
//     next();
//   };
// };
exports.checkPermission = (permission) => {
  return (req, res, next) => {
    try {
      // SAFETY CHECK 1
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized - user not found",
        });
      }

      // SAFETY CHECK 2
      const userPermissions = req.user.permissions || [];

      // SAFETY CHECK 3
      if (!Array.isArray(userPermissions)) {
        return res.status(500).json({
          success: false,
          message: "Invalid permissions format",
        });
      }

      // CHECK PERMISSION
      if (!userPermissions.includes(permission)) {
        return res.status(403).json({
          success: false,
          message: "Permission denied",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Permission middleware error",
      });
    }
  };
};
