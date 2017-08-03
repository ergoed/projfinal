"use strict";

const express  = require("express");
/* our applications modules */
const Guestmessage = require("../models/guestmessage");
const User = require("../models/user");

const router = new express.Router();


// create a guestmessage
router.post("/", function (req, res, next) {
    const input = req.body;
    Guestmessage.create(input).then(created => {
        return res.status(201 /* Created */).send(created);
    }).catch(next);
});

// read all the guestmessages
router.get("/", (req, res, next) => {
    Guestmessage.find({/* no conditions */}).then(results => {

        return res.send(results);
    }).catch(next);
});

// read one guestmessage
router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    // callback example
    Guestmessage.findById(id, (err, found) => {
        if (found)
            return res.send(found);
        else
            return res.status(404 /* Not Found */).send();
    });
});


// partial update
router.patch("/:id", (req, res, next) => {
    const id    = req.params.id;
    const input = req.body;
    const promise = Guestmessage.findByIdAndUpdate(id, {$set: input}, {new: true})
    promise.then(found => {
        if (found)
            return res.send(found);
        else
            return res.status(404 /* Not Found */).send();
    }).catch(next);
});



// expose our router to require()
module.exports = router;
