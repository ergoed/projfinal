"use strict";

const bcrypt   = require("bcrypt");
const mongoose = require("mongoose");

/* Schema */
const userSchema = new mongoose.Schema({
    name:  {type: String, required: true, unique: true},
    hash:  {type: String, required:true},
    avatarSRC: String,
    mids: [String],
    id: String,
    activeMID: String,
    favoritePosts: [String]

});

/* when converting to JSON, we want to hide the sensitive hash information */
userSchema.options.toJSON = {
    transform(doc, ret, options) {
        delete ret.hash;
        return ret;
    }
};

/* Model */
const User = mongoose.model('User', userSchema);

/* expose User to require() */
module.exports = User;
