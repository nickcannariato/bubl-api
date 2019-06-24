const db = require('../index');
const uuid = require('uuid/v4');

module.exports = {
  add,
  find,
  update,
  remove
}

function add(post) {
  return db('posts as p')
    .insert({ ...post, audit_id: uuid() }, ['*'])
    .then(p => find({ 'p.id': p[0].id }).first())
}

function find(filters) {
  return db('posts AS p')
    .select(
      'p.audit_id AS audit_id',
      'p.title AS title',
      'p.body AS body',
      'p.created_at AS created_at',
      'p.modified_at AS modified_at',
      'b.topic AS bubl',
      'u.username AS author',
    )
    .join('buble AS b', { 'b.id': 'p.bubl_id' })
    .join('users AS u', { 'u.id': 'p.author_id' })
    .where(filters)
}

function update(filters, changes) {
  return db('posts AS p')
    .update(changes, ['*'])
    .where(filters)
    .then(p => find({ 'p.id': p[0].id }).first())
}

function remove(filters) {
  return db('posts AS p')
    .where(filters)
    .del()
}