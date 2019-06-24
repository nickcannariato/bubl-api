const db = require('../index');

module.exports = {
  add,
  find,
  update,
  remove
}

function add(school) {
  return db('schools')
    .insert(school, ['*'])
    .then(s => find({ 's.id': s[0].id }).first())
}

function find(filters) {
  if (filters) {
    return db('schools AS s')
      .select('s.audit_id AS audit_id', 's.name AS school')
      .where(filters)
  }
  return db('schools AS s')
    .select('s.audit_id AS audit_id', 's.name AS school')
}

function update(filters, changes) {
  return db('schools AS s')
    .update(changes, ['*'])
    .where(filters)
    .then(s => find({ 's.id': s[0].id }).first())
}

function remove(filters) {
  return db('schools AS s')
    .where(filters)
    .del()
}