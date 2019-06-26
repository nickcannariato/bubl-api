const router = require("express").Router();

const School = require("../models/db/school");

router.route("/")
  .get(async (_, res) => {
    try {
      schools = await School.find();
      return res.status(200).json(schools);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ 
        message: "There was an issue fetching the schools." 
      });
    }
  })
  .post(async (req, res) => {
    const school = req.body;
    if (school) {
      try {
        const newSchool = await School.add(school);
        return res.status(201).json(newSchool);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ 
          message: "There was an issue creating a new school." 
        });
      }
    }
    return res.status(400).json({
      message: "Please provide all of the fields required to create a school."
    });
  });

router.route("/:audit_id")
  .get(async (req, res) => {
    const { audit_id } = req.params;
    try {
      const school = await School.find({ audit_id }).first();
      
      if (!school) {
        return res.status(404).json({
          message: `The school with the id, ${audit_id}, could not be located.`
        });
      }

      return res.status(200).json(school);
    } catch (error) {
      
      return res.status(500).json({
        message: `There was an error while trying to locate the school.`
      });
    }
  })
  .put(async (req, res) => {
    const updates = req.body;
    const { audit_id } = req.params
    try {
      const school = await School.update({ audit_id }, updates);
      return res.status(200).json(school);
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: "There was an error while trying to update the school."
      });
    }
  })
  .delete(async (req, res) => {
    const { audit_id } = req.params;
    try {
      const success = await School.remove({ audit_id });
      if (success) return res.status(204).end();
      else throw Error;
    } catch (error) {
      return res.status(500).json({
        message: "There was an error while trying to delete the school."
      });
    }
  });

module.exports = router;
