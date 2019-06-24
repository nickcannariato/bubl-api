const jwt = require("jsonwebtoken");

exports.checkToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: "Invalid Credentials" });
      } else {
        res.locals.user = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};

exports.checkRole = (role) => {
  return (req, res, next) => {
    if (req.decodedJwt.role && req.decodedJwt.role.includes(role)) {
      next();
    }
    else {
      res.status(403).json({ 
        message: "Sorry! You don't have access to that resource"
      })
    }
  }
};