exports.up = function (knex) {
  return knex.schema.createTable("post", (table) => {
    table.increments();
    table.string("title");
    table.string("content");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("post");
};
