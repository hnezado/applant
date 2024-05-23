const express = require("express");
const router = express.Router();

const Post = require("../models/Post.model");

router.get("/posts", (req, res, next) => {
  Post.find()
    .then((result) => {
      res.send({ data: result });
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post("/new-post", (req, res, next) => {
  Post.create(req.body)
    .then((result) => {
      res.send({ msg: `Post created`, data: result });
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post("/edit-post/:_id", (req, res, next) => {
  Post.findByIdAndUpdate(req.params._id, req.body)
    .then((result) => {
      res.send({ msg: `Post edited`, data: result });
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post("/delete-post/:_id", (req, res, next) => {
  Post.findByIdAndDelete(req.params._id)
    .then((result) => {
      res.send({ msg: `Post deleted`, data: result });
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post("/add-like/:_id", (req, res, next) => {
  Post.findByIdAndUpdate(req.params._id, req.body)
    .then((result) => {
      res.send({ msg: `Post like added`, data: result });
    })
    .catch((err) => {
      const msg = `Error adding like`;
      console.error({ msg, err });
    });
});

module.exports = router;
