const router = require("express").Router();

const Post = require("../models/db/post");
const Bubl = require("../models/db/bubl");
const User = require('../models/db/user');

router.route("/:bubl_id")
  .get(async (req, res) => {
    const { bubl_id } = req.params

    try {
      posts = await Post.find({'b.audit_id': bubl_id });
      return res.status(200).json(posts);

    } 
    
    catch (error) {
      console.error(error);
      return res.status(500).json({ 
        message: "There was an issue fetching the posts." 
      });
    }
  })
  .post(async (req, res) => {
    const { bubl_id: bubl_audit_id } = req.params
    const { user } = res.locals
    const post = req.body

    try {
      const { id: author_id } = await User.find({
        'u.audit_id': user.audit_id }, 
        { internal: true }
      ).first()

      const { id: bubl_id } = await Bubl.find({ 
        'b.audit_id': bubl_audit_id 
      }, { internal: true }).first()

      if (!post.title && !post.body) {
        return res.status(400).json({
          message: "Posts must include a title and a body"
        })
      }

      newPost = await Post.add({
        ...post,
        bubl_id,
        author_id
      })

      return res.status(201).json(newPost)
    }
    catch (error) {
      console.error(error)
      return res.status(500).json({
        message: "There was an error creating that Post"
      })
    }
  })

router.route("/:bubl_id/:audit_id")
  .get(async (req, res) => {
    const { audit_id } = req.params;
    try {
      const post = await Post.find({ 'p.audit_id': audit_id }).first();
      
      if (!post) {
        return res.status(404).json({
          message: `The post with the id, ${audit_id}, could not be located.`
        });
      }

      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({
        message: `There was an error while trying to locate the post.`
      });
    }
  })
  .put(async (req, res) => {
    const { audit_id } = req.params;
    const updates = req.body;

    try {
      const post = await Post.update({ 'p.audit_id': audit_id }, updates);
      return res.status(200).json(post);
    } 
    
    catch (error) {
      return res.status(500).json({
        message: "There was an error while trying to update the post."
      });
    }
  })
  .delete(async (req, res, next) => {
    const { audit_id } = req.params;
    try {
      const success = await Post.remove({ 'p.audit_id': audit_id });
      if (!success) {
        return res.status(404).json({
          message: "There's no Post to delete at that ID"
        })
      }
      
      return res.status(204).end();
    } catch (error) {
      res.status(500).json({
        message: "There was an error while trying to delete the post."
      });
    }
  });

module.exports = router;
