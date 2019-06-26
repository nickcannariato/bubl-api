const router = require("express").Router();

const Bubl = require("../models/db/bubl");
const School = require("../models/db/school");

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      bubls = await Bubls.find();
      res.status(200).json(bubls);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "There was an issue fetching the bubls." });
    }
  })
  .post(async (req, res, next) => {
    const bubl = req.body;
    if (bubl) {
      try {
        const newbubl = await Bubl.add(bubl);
        res.status(201).json(newbubl);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "There was an issue creating a new bubl." });
      }
    }
    res.status(400).json({
      message: "Please provide all of the fields required to create a bubl."
    });
  });

router
  .route("/:audit_id")
  .get(async (req, res, next) => {
    const { audit_id } = req.params;
    try {
      const bubl = await Bubl.find({ audit_id });
      if (bubl) res.status(200).json(bubl);
      else
        res.status(404).json({
          message: `The bubl with the id, ${audit_id}, could not be located.`
        });
    } catch (error) {
      res.status(500).json({
        message: `There was an error while trying to locate the bubl.`
      });
    }
  })
  .put(async (req, res, next) => {
    const { audit_id } = req.params;
    const { updates } = req.body;
    try {
      const bubl = await Bubl.update({ audit_id }, updates);
      res.status(200).json(bubl);
    } catch (error) {
      res.status(500).json({
        message: "There was an error while trying to update the bubl."
      });
    }
  })
  .delete(async (req, res, next) => {
    const { audit_id } = req.params;
    try {
      const success = await Bubl.remove({ audit_id });
      if (success) res.status(202).end();
      else throw Error;
    } catch (error) {
      res.status(500).json({
        message: "There was an error while trying to delete the bubl."
      });
    }
  });

router.route("/:audit_id/bubls").get(async (req, res, next) => {
  let { audit_id } = req.params;
  try {
    const { id: school_id } = await School.find({ audit_id });
    const bubls = await Bubl.find({ school_id });
    if (bubls) res.status(200).json(bubls);
    else
      res.status(404).json({
        message: `The bubls for school id, ${audit_id}, could not be located.`
      });
  } catch (error) {
    res.status(500).json({
      message: `There was an error while trying to locate the bubls.`
    });
  }
});

module.exports = router;
