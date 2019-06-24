const db = require('../index');

module.exports = {
  add,
  find,
  update,
  remove
}

function add(comment) {
  return db('comments as c')
    .insert(comment, ['*'])
    .then(c => find({ 'c.id': c[0].id }).first())
}

function find(filters) {
  return db('comments AS c')
    .select(
      'c.audit_id AS audit_id',
      'c.body AS comment',
      'c.created_at AS created_at',
      'p.title AS post',
      'u.username AS author',
    )
    .join('posts AS p', { 'p.id': 'c.post_id' })
    .join('users AS u', { 'u.id': 'c.author_id' })
    .where(filters)
}

function update(filters, changes) {
  return db('comments AS c')
    .update(changes, ['*'])
    .where(filters)
    .then(c => find({ 'c.id': c[0].id }).first())
}

function remove(filters) {
  return db('comments AS c')
    .where(filters)
    .del()
}