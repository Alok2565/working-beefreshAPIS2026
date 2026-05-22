// // const otpStore = new Map();

// // // Save OTP
// // exports.saveOtp = (email, otp) => {
// //   otpStore.set(email, {
// //     otp,
// //     expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
// //   });
// // };

// // // Verify OTP
// // exports.verifyOtp = (email, otp) => {
// //   const record = otpStore.get(email);

// //   if (!record) return false;

// //   if (Date.now() > record.expiresAt) {
// //     otpStore.delete(email);
// //     return false;
// //   }

// //   if (record.otp !== otp) return false;

// //   otpStore.delete(email); // remove after success
// //   return true;
// // };
// const otpStore = new Map();

// // SAVE OTP
// exports.saveOtp = (email, otp) => {
//   otpStore.set(email, {
//     otp,
//     attempts: 0,
//     expiresAt: Date.now() + 5 * 60 * 1000,
//   });

//   console.log(`OTP for ${email}: ${otp}`); // remove in production
// };

// // VERIFY OTP
// exports.verifyOtp = (email, otp) => {
//   const record = otpStore.get(email);

//   if (!record) {
//     return { success: false, message: "OTP not found" };
//   }

//   if (Date.now() > record.expiresAt) {
//     otpStore.delete(email);
//     return { success: false, message: "OTP expired" };
//   }

//   if (record.attempts >= 3) {
//     otpStore.delete(email);
//     return { success: false, message: "Too many attempts" };
//   }

//   if (record.otp !== otp) {
//     record.attempts++;
//     return { success: false, message: "Invalid OTP" };
//   }

//   otpStore.delete(email);
//   return { success: true };
// };

// // CHECK OTP EXIST (for resend control)
// exports.hasOtp = (email) => {
//   return otpStore.has(email);
// };

const otpStore = new Map();

exports.saveOtp = (email, otp) => {
  otpStore.set(email, {
    otp,
    attempts: 0,
    expiresAt: Date.now() + 5 * 60 * 1000,
  });

  console.log("OTP SAVED:", { email, otp });
};

exports.verifyOtp = (email, otp) => {
  const record = otpStore.get(email);

  if (!record) return { success: false, message: "OTP not found" };

  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return { success: false, message: "OTP expired" };
  }

  if (record.attempts >= 3) {
    otpStore.delete(email);
    return { success: false, message: "Too many attempts" };
  }

  if (record.otp !== otp) {
    record.attempts++;
    return { success: false, message: "Invalid OTP" };
  }

  otpStore.delete(email);
  return { success: true };
};

exports.hasOtp = (email) => otpStore.has(email);
