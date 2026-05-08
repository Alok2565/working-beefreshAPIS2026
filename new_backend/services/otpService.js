exports.generateOTP = async (mobile) => {
  const otp = Math.floor(100000 + Math.random() * 900000);

  await pool.query(
    "INSERT INTO otps(mobile, otp, expires_at) VALUES($1,$2,NOW() + INTERVAL '5 minutes')",
    [mobile, otp],
  );

  return otp;
};
