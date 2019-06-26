exports.seed = function(knex) {
  return knex.schema.raw(
    "TRUNCATE comments, posts, bubls, users, schools RESTART IDENTITY;"
  );
};