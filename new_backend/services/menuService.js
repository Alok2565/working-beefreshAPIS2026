exports.getMenusByPermissions = async (permissions, client) => {
  const result = await client.query(
    `SELECT name, path, icon 
     FROM menus 
     WHERE permission = ANY($1::text[])`,
    [permissions],
  );

  return result.rows;
};
