
exports.up = function(knex) {
  return knex.schema
    .createTable('items', tbl => {
        tbl.increments();
        tbl.text('name', 128).notNullable();
        tbl.integer('durability').notNullable();
        tbl.integer('enhancement').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('items');
};
