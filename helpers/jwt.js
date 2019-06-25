const jwt = require("jsonwebtoken");

exports.generateToken = ({ id, audit_id, username, is_admin, school, school_audit_id }) => {
  const payload = {
    subject: id,
    audit_id,
    username,
    is_admin,
    school,
    school_audit_id
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
};