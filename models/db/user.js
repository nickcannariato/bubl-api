const db = require('../index');

module.exports = {
  add,
  find,
  update,
  remove
}

function add(user) {
  return db('users')
    .insert(user, ['*'])
    .then(u => find({ 'u.id': u[0].id }).first())
}

function find(filters) {
  return db('users AS u')
    .select(
      'u.audit_id AS audit_id',
      'u.username AS username',
      'u.password AS password',
      'u.avatar_url AS avatar',
      'u.is_admin AS is_admin',
      's.name AS school'
    )
    .join('schools AS s', { 's.id': 'u.school_id' })
    .where(filters)
}

function update(filters, changes) {
  return db('users AS u')
    .update(changes, ['*'])
    .where(filters)
    .then(u => find({ 'u.id': u[0].id }).first())
}

function remove(filters) {
  return db('users AS u')
    .where(filters)
    .del()
}