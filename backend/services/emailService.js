const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_PORT == 465,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

// ✅ THIS is what you must export
const sendMail = async ({ to, subject, html }) => {
  return await transporter.sendMail({
    from: process.env.MAIL_FROM_ADDRESS,
    to,
    subject,
    html,
  });
};

module.exports = { sendMail };
