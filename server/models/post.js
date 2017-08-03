"use strict";

const mongoose = require("mongoose");

/* Schema */
const postSchema = new mongoose.Schema({
    creator: {
      name: String,
      uid: String,
      avatarSRC: String
    },
    body:   String,
    imageSRC:  String,
    postdate: String,
    weddingID: String,
    testimagefaved: [String]

});

/* Model */
const Post = mongoose.model('Post', postSchema);

/* expose Post to require() */
module.exports = Post;
