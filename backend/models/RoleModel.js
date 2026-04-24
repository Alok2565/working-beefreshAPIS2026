const db = require("../config/database_connection");

exports.createRole = (name, client) => {
  return client.query("INSERT INTO roles (name) VALUES ($1) RETURNING *", [
    name,
  ]);
};
exports.getRolesData = () => {
  return db.query(
    "SELECT * FROM roles WHERE is_deleted = false ORDER BY id DESC",
  );
};
exports.getRoleById = (id) => {
  return db.query("SELECT * FROM roles WHERE id = $1 AND is_deleted = false", [
    id,
  ]);
};
exports.updateRole = (id, name) => {
  return db.query(
    "UPDATE roles SET name = $1 WHERE id = $2 AND is_deleted = false RETURNING *",
    [name, id],
  );
};
exports.softDeleteRole = (id) => {
  return db.query(
    "UPDATE roles SET is_deleted = true, deleted_at = NOW() WHERE id = $1 RETURNING *",
    [id],
  );
};

exports.restoreRole = (id) => {
  return db.query(
    "UPDATE roles SET is_deleted = false, deleted_at = NULL WHERE id = $1 RETURNING *",
    [id],
  );
};

exports.deleteRole = (id) => {
  return db.query("DELETE FROM roles WHERE id = $1 RETURNING *", [id]);
};
