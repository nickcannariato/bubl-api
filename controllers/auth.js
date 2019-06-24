const router = require('express').Router()
const bcrypt = require('bcryptjs')

// Middleware & Helpers
const { generateToken } = require("../helpers/jwt");
const { checkToken, checkRole } = require("../middlewares/authorization");

// Models
const User = require('../models/db/user')
const School = require('../models/db/school')

router.route('/register')
  .post(async (req, res) => {
    const user = {
      ...req.body.user,
      password: bcrypt.hashSync(req.body.user.password, 10)
    }
    const { school_audit_id } = req.body

    try {
      const { id: school_id} = await School.find({ 
        's.audit_id': school_audit_id 
      }, { internal: true }).first()
    
      const newUser = await User.add({...user, school_id })

      return res.status(201).json({
        message: `User ${newUser.username} has been created`
      })
    }
    catch (e) {
      console.error(
        `Error during ${req.method} @ ${req.path}\n\n`,
        `Error: ${e}\n\n`
      );
      console.error(e)
      return res.status(500).json({ 
        message: "We encountered an error during registration" 
      });
    }
  })

router.route('/login')
  .post(async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await User.find({ 'u.username': username }).first()

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

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