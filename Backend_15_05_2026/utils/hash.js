const crypto = require("crypto");
const bcrypt = require("bcrypt");

exports.hashPassword = async (password) => {
  const sha = crypto.createHash("sha256").update(password).digest("hex");
  return await bcrypt.hash(sha, 10);
};

exports.comparePassword = async (password, hash) => {
  const sha = crypto.createHash("sha256").update(password).digest("hex");
  return await bcrypt.compare(sha, hash);
};

// const crypto = require("crypto");

// const hashPassword = (password) => {
//   return crypto.createHash("sha256").update(password).digest("hex");
// };

// const comparePassword = (plainPassword, hashedPassword) => {
//   const hashedInput = hashPassword(plainPassword);
//   return hashedInput === hashedPassword;
// };

// module.exports = { hashPassword, comparePassword };
