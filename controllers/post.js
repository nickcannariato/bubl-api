const router = require("express").Router();

const Post = require("../models/db/post");
const Bubl = require("../models/db/bubl");

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      posts = await Post.find();
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "There was an issue fetching the posts." });
    }
  })
  .post(async (req, res, next) => {
    const post = req.body;
    if (post) {
      try {
        const newpost = await Post.add(post);
        res.status(201).json(newpost);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "There was an issue creating a new post." });
      }
    }
    res.status(400).json({
      message: "Please provide all of the fields required to create a post."
    });
  });

router
  .route("/:audit_id")
  .get(async (req, res, next) => {
    const { audit_id } = req.params;
    try {
      const post = await Post.find({ audit_id });
      if (post) res.status(200).json(post);
      else
        res.status(404).json({
          message: `The post with the id, ${audit_id}, could not be located.`
        });
    } catch (error) {
      res.status(500).json({
        message: `There was an error while trying to locate the post.`
      });
    }
  })
  .update(async (req, res, next) => {
    const { audit_id } = req.params;
    const { updates } = req.body;
    try {
      const post = await Post.update({ audit_id }, updates);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({
        message: "There was an error while trying to update the post."
      });
    }
  })
  .delete(async (req, res, next) => {
    const { audit_id } = req.params;
    try {
      const success = await Post.remove({ audit_id });
      if (success) res.status(202).end();
      else throw Error;
    } catch (error) {
      res.status(500).json({
        message: "There was an error while trying to delete the post."
      });
    }
  });

router.route("/:audit_id/posts").get(async (req, res, next) => {
  let { audit_id } = req.params;
  try {
    const { id: bubl_id } = await Bubl.find({ audit_id });
    const posts = await Post.find({ bubl_id });
    if (posts) res.status(200).json(posts);
    else
      res.status(404).json({
        message: `The posts for bubl id, ${audit_id}, could not be located.`
      });
  } catch (error) {
    res.status(500).json({
      message: `There was an error while trying to locate the posts.`
    });
  }
});

module.exports = router;
