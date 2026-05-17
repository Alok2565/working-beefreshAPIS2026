exports.up = function (knex) {
  return knex.schema.createTable("login_histories", (table) => {
    table.increments("id").primary();
    table.int("user_id");
    table.int("role_id");
    table.string("email").unique();
    table.string("login_userId");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("login_histories");
};
