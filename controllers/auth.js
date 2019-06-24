const router = require('express').Router()
const bcrypt = require('bcryptjs')

// Middleware & Helpers
const { generateToken } = require("../helpers/jwt");
const { checkToken, checkRole } = require("../middlewares/authorization");

// Models
const User = require('../models/db/user')

router.route('/register')
  .post(async (req, res) => {
    const user = {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10)
    }

    try {
      const newUser = await User.add(user)

      return res.status(201).json({
        message: `User ${newUser} has been created`
      })
    }
    catch (e) {
      console.error(
        `Error during ${req.method} @ ${req.path}\n\n`,
        `Error: ${e}\n\n`
      );
      return res.status(500).json({ 
        message: "We encountered an error during registration" 
      });
    }
  })

router.route('/login')
  .post(async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(username, password)
      const user = await User.find({ 'u.username': username }).first()
      console.log(user)
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        console.log(token)
        return res.status(200).json({
          message: `Welcome ${user.username}`,
          token
        })
      }

      return res.status(401).json({
        message: 'Invalid credentials'
      })
    }
    catch (e) {
      console.error(e);
      return res
        .status(500)
        .json({ message: "We encountered an error while logging you in" });
    }
  })

module.exports = router