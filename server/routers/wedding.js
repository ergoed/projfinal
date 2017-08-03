"use strict";

const express  = require("express");
/* our applications modules */
const Wedding = require("../models/wedding");
const Post = require("../models/post");

const router = new express.Router();


router.param('mID', (req, res, next, mid) => {
    Wedding.findOne({mID: mid}).then(wedding => {
        if (!wedding) {
            return res.status(404 /* Not Found */).send();
        } else {
            res.locals.wedding = wedding;
            return next();
        }
    }).catch(next);
});

router.get("/:mID/posts", function(req, res, next) {
      const id = req.params.mID;
      Post.find({weddingID: id}).then(results => {
          return res.send(results);
      }).catch(next);
});

// read all the weddings
router.get("/", (req, res, next) => {
    Wedding.find({/* no conditions */}).then(results => {
        return res.send(results);
    }).catch(next);
});

// create a wedding
router.post("/", function (req, res, next) {
    const input = req.body;
    Wedding.create(input).then(created => {
        return res.status(201 /* Created */).send(created);
    }).catch(next);
});

// read one wedding
router.get("/:mID", (req, res, next) => {
  const wedding = res.locals.wedding;
  if ("people" in req.query)
    return res.send(wedding.table.people)
  else
    return res.send(wedding);
});

// expose our router to require()
module.exports = router;
