const router = require("express").Router();

const Bubl = require("../models/db/bubl");
const School = require("../models/db/school");

router.route("/")
  .get(async (_, res) => {
    const { user } = res.locals
    try {
      bubls = await Bubl.find({ 's.audit_id': user.school_audit_id });
      res.status(200).json(bubls);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "There was an issue fetching the bubls." });
    }
  })
  .post(async (req, res) => {
    const { user } = res.locals
    try {
      const { topic } = req.body
      const { id: school_id } = await School.find({ 
        's.audit_id': user.school_audit_id 
      }, { internal: true }).first()

      if (!topic) {
        return res.status(400).json({
          message: "Must include the topic of the bubl to create a new bubl"
        })
      }

      const newBubl = await Bubl.add({ topic, school_id })

      return res.status(201).json(newBubl)
    }
    catch (error) {}
  })

router.route("/:audit_id")
  .get(async (req, res) => {
    const { audit_id } = req.params;
    try {
      const bubl = await Bubl.find({ 'b.audit_id': audit_id }).first();
      if (bubl) return res.status(200).json(bubl);
      else
        return res.status(404).json({
          message: `The bubl with the id, ${audit_id}, could not be located.`
        });
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: `There was an error while trying to locate the bubl.`
      });
    }
  })
  .put(async (req, res) => {
    const { audit_id } = req.params;
    const updates = req.body;
    try {
      const bubl = await Bubl.update({ audit_id }, updates);
      return res.status(200).json(bubl);
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: "There was an error while trying to update the bubl."
      });
    }
  })
  .delete(async (req, res) => {
    const { audit_id } = req.params;
    try {
      const success = await Bubl.remove({ audit_id });
      if (success) return res.status(202).end();
      else throw Error;
    } catch (error) {
      return res.status(500).json({
        message: "There was an error while trying to delete the bubl."
      });
    }
  });

module.exports = router;
