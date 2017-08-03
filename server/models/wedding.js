"use strict";

const mongoose = require("mongoose");

/* Schema */
const postSchema = new mongoose.Schema({
    mID:    {type: String, required: true},
    title:  {type: String, required: true},
    date:   {type: Date, required: true},
    place1:   String,
    place2:   String,
    table: [{
        number: Number,
        people: [String]
      }],
    admin: String
});

/* Model */
const Wedding = mongoose.model('Wedding', postSchema);

/* expose Post to require() */
module.exports = Wedding;
