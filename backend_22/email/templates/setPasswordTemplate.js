exports.setPasswordTemplate = (name, link) => {
  return `
    <div style="font-family: Arial;">
      <h2>Hello ${name}</h2>

      <p>Click below to set your password</p>

      <a href="${link}" 
         style="padding:10px 20px;background:#28a745;color:#fff;text-decoration:none;">
         Set Password
      </a>

      <p>This link will expire soon.</p>
    </div>
  `;
};
