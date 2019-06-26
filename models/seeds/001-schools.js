const uuid = require('uuid/v4')

exports.seed = function(knex, Promise) {
  return knex('schools').insert([
    {name: 'Hogwarts', audit_id: uuid()},
  ]);
};
