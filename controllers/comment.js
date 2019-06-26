const router = require("express").Router();

const Comment = require("../models/db/comment");
const Post = require("../models/db/post");

router.route("/").get(async (req, res, next) => {
  try {
    comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "There was an issue fetching the comments." });
  }
});

router
  .route("/:audit_id")
  .get(async (req, res, next) => {
    const { audit_id } = req.params;
    try {
      const comment = await Comment.find({ audit_id });
      if (comment) res.status(200).json(comment);
      else
        res.status(404).json({
          message: `The comment with the id, ${audit_id}, could not be located.`
        });
    } catch (error) {
      res.status(500).json({
        message: `There was an error while trying to locate the comment.`
      });
    }
  })
  .put(async (req, res, next) => {
    const { audit_id } = req.params;
    const { updates } = req.body;
    try {
      const comment = await Comment.update({ audit_id }, updates);
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({
        message: "There was an error while trying to update the comment."
      });
    }
  })
  .delete(async (req, res, next) => {
    const { audit_id } = req.params;
    try {
      const success = await Comment.remove({ audit_id });
      if (success) res.status(202).end();
      else throw Error;
    } catch (error) {
      res.status(500).json({
        message: "There was an error while trying to delete the comment."
      });
    }
  });

router
  .route("/:audit_id/posts")
  .get(async (req, res, next) => {
    let { audit_id } = req.params;
    try {
      const [{ id: post_id }] = await Post.find({ audit_id });
      const comments = await Post.find({ post_id });
      if (comments) res.status(200).json(comments);
      else
        res.status(404).json({
          message: `The comments for bubl id, ${audit_id}, could not be located.`
        });
    } catch (error) {
      res.status(500).json({
        message: `There was an error while trying to locate the comments.`
      });
    }
  })
  .post(async (req, res, next) => {
    const { audit_id } = req.params;
    const comment = req.body;
    if (comment) {
      try {
        const [{ id: post_id }] = await Post.find({ audit_id });
        const newComment = await Comment.add({ ...comment, post_id });
        res.status(201).json(newComment);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "There was an issue creating a new comment." });
      }
    }
    res.status(400).json({
      message: "Please provide all of the fields required to create a comment."
    });
  });

module.exports = router;
