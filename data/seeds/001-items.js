
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('items').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        { name: "Bronze Sword", durability: 97, enhancement: 3 },
        { name: "Bronze Spear", durability: 88, enhancement: 5 },
        { name: "Bronze Axe", durability: 59, enhancement: 12 }
      ]);
    });
};
