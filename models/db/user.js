const db = require("../index");
const uuid = require("uuid/v4");

module.exports = {
  add,
  find,
  update,
  remove
};

function add(user) {
  return db("users")
    .insert({ ...user, audit_id: uuid() }, ["*"])
    .then(u => find({ "u.id": u[0].id }).first());
}

function find(filters = {}) {
  return db("users AS u")
    .select(
      "u.id AS id",
      "u.audit_id AS audit_id",
      "u.username AS username",
      "u.password AS password",
      "u.avatar_url AS avatar",
      "u.is_admin AS is_admin",
      "s.name AS school",
      "s.audit_id AS school_audit_id"
    )
    .join("schools AS s", { "s.id": "u.school_id" })
    .where(filters);
}

function update(filters = {}, changes) {
  return db("users AS u")
    .update(changes, ["*"])
    .where(filters)
    .then(u => find({ "u.id": u[0].id }).first());
}

function remove(filters) {
  return db("users AS u")
    .where(filters)
    .del();
}
