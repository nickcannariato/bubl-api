const db = require('../index');

module.exports = {
  add,
  find,
  update,
  remove
}

function add(bubl) {
  return db('bubls')
    .insert(bubl, ['*'])
    .then(b => find({ 'b.id': b[0].id }).first())
}

function find(filters) {
  return db('bubls AS b')
    .select(
      'b.audit_id AS audit_id',
      'b.topic AS topic',
      's.name AS school'
    )
    .join('school AS s', { 's.id': 'b.school_id' })
    .where(filters)
}

function update(filters, changes) {
  return db('bubls AS b')
    .update(changes, ['*'])
    .where(filters)
    .then(b => find({ 'b.id': b[0].id }).first())
}

function remove(filters) {
  return db('bubls AS b')
    .where(filters)
    .del()
}