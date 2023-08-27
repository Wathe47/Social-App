const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const passport = require("passport");

//Post model
const Post = require("../../models/Post");
//Profil model
const Profile = require("../../models/Profile");
const { removeAllListeners } = require("../../models/User");

//import validation
const validatePostInput = require("../../validation/post");

//@route GET api/posts/test
//@desc  Tests posts route
//@access Public
router.get("/test", (req, res) => {
  res.json({ msg: "posts works" });
});

//@route POST api/posts
//@desc  Create a post
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    });

    newPost.save().then((post) => res.json(post));
  }
);

//@route GET api/posts
//@desc  Get posts
//@access Public
router.get("/", (req, res) => {
  let errors = {};
  Post.find()
    .sort({ date: -1 })
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => res.status(404).json({ noposts: "No Posts to show" }));
});

//@route GET api/posts/:id
//@desc  Get post by ID
//@access Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      res.json(post);
    })
    .catch((err) => res.status(404).json({ nopost: "No Post with that ID" }));
});

//@route DELETE api/posts/:id
//@desc  Delete post by ID
//@access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not Authorized" });
          }

          //remove
          post
            .deleteOne()
            .then(() => {
              res.json({ success: true });
            })
            .catch((err) => res.json({ removed: false }));
        })
        .catch((err) => res.status(404).send("post not found"));
    });
  }
);

//@route POST api/posts/like/:id
//@desc  Like to Posts
//@access Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }

          //Add user to likes
          post.likes.unshift({ user: req.user.id });

          //save
          post.save().then((post) => res.json(post));
        })
        .catch((err) => res.status(404).json(err));
    });
  }
);

//@route POST api/posts/unlike/:id
//@desc  Unlike to Posts
//@access Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notlked: "User has not liked this post" });
          }

          //Get the remove index
          const removeIndex = post.likes
            .map((like) => like.user.toString())
            .indexOf(req.user.id);

          console.log(removeIndex);

          post.likes.splice(removeIndex, 1);
          //save
          post.save().then((post) => res.json(post));
        })
        .catch((err) => res.status(404).json({ e: "Something went wrong" }));
    });
  }
);

//@route POST api/posts/comment/:id
//@desc  Comment to Posts
//@access Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };

        //add comments to the array
        post.comments.unshift(newComment);

        //save
        post.save().then((post) => res.json(post));
      })
      .catch((err) => {
        res.status(404).json({ nopost: "No Post Found!" });
      });
  }
);

//@route DELETE api/posts/comment/:id/:comment_id
//@desc  Delete comments
//@access Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res.status(404).json({ error: "no such commment found" });
        }

        const removeIndex = post.comments
          .map((comment) => comment._id.toString())
          .indexOf(req.params.comment_id);

        post.comments.splice(removeIndex, 1);

        post.save().then((post) => res.json(post));
      })
      .catch(() => res.status(404).json({ noPostFound: "No Post Found" }));
  }
);

module.exports = router;
