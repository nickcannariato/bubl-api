const db = require("../index");
const uuid = require("uuid/v4");

module.exports = {
  add,
  find,
  update,
  remove
};

function add(school) {
  return db("schools")
    .insert({ ...school, audit_id: uuid() }, ["*"])
    .then(s => find({ "s.id": s[0].id }).first());
}

function find(filters = {}, options = {}) {
  if (filters && options.internal) {
    return db("schools AS s")
      .select("s.id AS id", "s.audit_id AS audit_id", "s.name AS school")
      .where(filters);
  }
  if (filters) {
    return db("schools AS s")
      .select("s.audit_id AS audit_id", "s.name AS school")
      .where(filters);
  }
  return db("schools AS s").select(
    "s.audit_id AS audit_id",
    "s.name AS school"
  );
}

function update(filters = {}, changes) {
  return db("schools AS s")
    .update(changes, ["*"])
    .where(filters)
    .then(s => find({ "s.id": s[0].id }).first());
}

function remove(filters) {
  return db("schools AS s")
    .where(filters)
    .del();
}
