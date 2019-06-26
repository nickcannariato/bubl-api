const router = require("express").Router();

const School = require("../models/db/school");

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      schools = await School.find();
      res.status(200).json(schools);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "There was an issue fetching the schools." });
    }
  })
  .post(async (req, res, next) => {
    const { school } = req.body;
    if (school) {
      try {
        const newSchool = await School.add();
        res.status(201).json(newSchool);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "There was an issue creating a new school." });
      }
    }
    res.status(400).json({
      message: "Please provide all of the fields required to create a school."
    });
  });

router
  .route("/id")
  .get(async (req, res, next) => {
    const { audit_id } = req.body;
    try {
      const school = await School.find({ audit_id });
      if (school) res.status(200).json(school);
      else
        res.status(404).json({
          message: `The school with the id, ${audit_id}, could not be located.`
        });
    } catch (error) {
      res.status(500).json({
        message: `There was an error while trying to locate the school.`
      });
    }
  })
  .update(async (req, res, next) => {
    const { updates, audit_id } = req.body;
    try {
      const school = await School.update({ audit_id }, updates);
      res.status(200).json(school);
    } catch (error) {
      res.status(500).json({
        message: "There was an error while trying to update the school."
      });
    }
  })
  .delete(async (req, res, next) => {
    const { audit_id } = req.body;
    try {
      const success = await School.remove({ audit_id });
      if (success) res.status(202).end();
      else throw Error;
    } catch (error) {
      res.status(500).json({
        message: "There was an error while trying to delete the school."
      });
    }
  });

module.exports = router;
