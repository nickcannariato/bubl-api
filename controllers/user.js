const router = require("express").Router();

const User = require("../models/db/user");

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "There was an issue fetching the users." });
    }
  })
  .post(async (req, res, next) => {
    const user = req.body;
    if (user) {
      try {
        const newuser = await User.add(user);
        res.status(201).json(newuser);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "There was an issue creating a new user." });
      }
    }
    res.status(400).json({
      message: "Please provide all of the fields required to create a user."
    });
  });

router
  .route("/:audit_id")
  .get(async (req, res, next) => {
    const { audit_id } = req.params;
    try {
      const user = await User.find({ audit_id });
      if (user) res.status(200).json(user);
      else
        res.status(404).json({
          message: `The user with the id, ${audit_id}, could not be located.`
        });
    } catch (error) {
      res.status(500).json({
        message: `There was an error while trying to locate the user.`
      });
    }
  })
  .put(async (req, res, next) => {
    const { audit_id } = req.params;
    const { updates } = req.body;
    try {
      const user = await User.update({ audit_id }, updates);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        message: "There was an error while trying to update the user."
      });
    }
  })
  .delete(async (req, res, next) => {
    const { audit_id } = req.params;
    try {
      const success = await User.remove({ audit_id });
      if (success) res.status(202).end();
      else throw Error;
    } catch (error) {
      res.status(500).json({
        message: "There was an error while trying to delete the user."
      });
    }
  });

module.exports = router;
