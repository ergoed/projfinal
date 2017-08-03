"use strict";

const mongoose = require("mongoose");

/* Schema */
const guestmessageSchema = new mongoose.Schema({
    creator: {
      name: String,
      uid: String,
      avatarSRC: String
    },
    title: String,
    body:   String
});

/* Model */
const Guestmessage = mongoose.model('Guestmessage', guestmessageSchema);

/* expose Post to require() */
module.exports = Guestmessage;
