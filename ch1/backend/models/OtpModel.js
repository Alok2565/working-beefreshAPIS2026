const pool = require("../config/database_connection");

exports.createOTP = (mobile, otp) => {
  return pool.query(
    "INSERT INTO otps(mobile, otp, expires_at) VALUES($1,$2,NOW() + INTERVAL '5 minutes')",
    [mobile, otp],
  );
};

exports.verifyOTP = (mobile, otp) => {
  return pool.query(
    "SELECT * FROM otps WHERE mobile=$1 AND otp=$2 ORDER BY id DESC LIMIT 1",
    [mobile, otp],
  );
};
