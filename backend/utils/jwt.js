// const jwt = require("jsonwebtoken");

// exports.generateToken = (user, permissions) => {
//   return jwt.sign(
//     {
//       id: user.id,
//       role: user.role_id,
//       permissions: permissions,
//     },
//     process.env.JWT_SECRET,
//     { expiresIn: "1d" },
//   );
// };

const jwt = require("jsonwebtoken");

const generateToken = (user, permissions) => {
  return jwt.sign(
    {
      id: user.user_id,
      email: user.email,
      role_id: user.role_id,
      permissions,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
};

module.exports = { generateToken };
