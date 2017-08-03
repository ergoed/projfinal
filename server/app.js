"use strict";

const passportJwt =require('passport-jwt');
const StrategyJwt = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyOptionsJwt = passportJwt.StrategyOptions;
const userController = require ("./controllers/user");

//const SECRET_TOKEN_KEY = require("./config")
const CONFIG = require("./config");
const SECRET_TOKEN_KEY = CONFIG.SECRET_TOKEN_KEY;
const express  = require("express");
const mongoose = require("mongoose");
/* Express Middlewares */
const bodyParser = require("body-parser");
const morgan     = require("morgan");
const passport   = require("passport");
/* Passport Strategies */
const BasicStrategy = require("passport-http").BasicStrategy;
/* our own modules */
const User = require("./models/user");

/* create our app */
const app = express();
const cors = require("cors")

/* configuration */
app.locals.name   = require("./package.json").name;
app.locals.config = require(`./config/${process.env.NODE_ENV}`);

/* mongoose & MongoDB stuff */
mongoose.Promise = global.Promise; // Use native promises
mongoose.set('debug', (process.env.NODE_ENV === 'development'));

/* mongoose connection */
app.locals.connect = function () {
    const dbname = app.locals.config.mongodb.database;
    console.log(`NODE_ENV=${process.env.NODE_ENV}, connecting to ${dbname}`);
    return mongoose.connect(dbname, {useMongoClient: true});
};

/* Express Middlewares setup */
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: false}))
if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));
if (process.env.NODE_ENV === 'production')
    app.use(morgan('combined'));

    let options = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      //jwtFromRequest: ExtractJwt.fromAuthHeader(),
      secretOrKey: SECRET_TOKEN_KEY,
      passReqToCallback: true,
    };

app.use(passport.initialize());

passport.use(new StrategyJwt(options, userController.checkJWT));

app.use(cors());

/* our routers */
app.use("/api/users", require("./routers/user"));
app.use("/api/posts", require("./routers/post"));
app.use("/api/weddings", require("./routers/wedding"));
app.use("/api/guestmessages", require("./routers/guestmessage"));

// expose our app to require()
module.exports = app;
