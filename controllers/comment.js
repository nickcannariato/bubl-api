const router = require("express").Router();

const Comment = require("../models/db/comment");
const Post = require("../models/db/post");
const User = require('../models/db/user')

router.route("/:post_id")
  .post(async (req, res) => {
    const { post_id } = req.params;
    const { user } = res.locals
    const comment = req.body

    try {
      const post = await Post.find(
        { 'p.audit_id': post_id }, 
        { internal: true }
      ).first()

      const { id: author_id } = await User.find(
        { 'u.audit_id': user.audit_id },
        { internal: true }
      ).first()

      const newComment = await Comment.add({
        ...comment,
        post_id: post.id,
        author_id
      })

      return res.status(201).json(newComment)
    }
    catch (error) {
      console.error(error)
      res.status(500).json({
        message: `We encountered an error creating the comment`
      });
    }
  })

router.route('/:audit_id')
  .delete(async (req, res) => {
    const { audit_id } = req.params

    try {
      const success = await Comment.remove({'c.audit_id': audit_id})

      if (!success) {
        return res.status(404).json({
          message: "There's no comment at that ID"
        })
      }

      return res.status(204).end()
    }
    catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "We encountered an error deleting that comment"
      })
    }
  })

module.exports = router;
