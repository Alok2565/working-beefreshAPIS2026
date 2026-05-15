const jwt = require("jsonwebtoken");

const generateToken = ({ user_id, email, role_id, permissions }) => {
  return jwt.sign(
    {
      id: user_id,
      email,
      role_id,
      permissions,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
};

module.exports = { generateToken };

// const jwt = require("jsonwebtoken");

// const generateToken = (user, permissions) => {
//   return jwt.sign(
//     {
//       id: user.user_id,
//       email: user.email,
//       role_id: user.role_id,
//       permissions,
//     },
//     process.env.JWT_SECRET,
//     { expiresIn: "1d" },
//   );
// };

// module.exports = { generateToken };
