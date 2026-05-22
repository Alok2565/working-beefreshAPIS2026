exports.getUserPermissions = async (userId, client) => {
  if (!userId || isNaN(userId)) {
    throw new Error("Invalid userId for permissions");
  }

  const result = await client.query(
    `SELECT DISTINCT p.name
     FROM users u
     JOIN roles r ON u.role_id = r.id
     JOIN role_permissions rp ON rp.role_id = r.id
     JOIN permissions p ON p.id = rp.permission_id
     WHERE u.id = $1`,
    [Number(userId)],
  );

  return result.rows.map((row) => row.name);
};
