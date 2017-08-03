
const express = require("express");
const auth    = require("../auth");
const bcrypt   = require("bcrypt");
const passport = require('passport');
const BCRYPT_COST = 4; // minimum=4
const userController = require('../controllers/user')
/* our applications modules */
const User = require("../models/user");

const router = new express.Router();

/* when we see the uid parameter, set res.locals.user to the User found in the
   database or return a 404 Not Found directly. */
   router.param('uid', (req, res, next, uid) => {
       User.findById(uid).then(user => {
           if (!user) {
               return res.status(404 /* Not Found */).send();
           } else {
               req.user = user;
               return next();
           }
       }).catch(next);
   });


const log = (req, res,next) => {
    if (process.env.NODE_ENV != 'test') {
        console.log("NEW REQUEST", req.route.path);
    }
    next();
}

//login
router.post('/login', userController.authenticate);
// create a user
router.post("/", userController.createUser);
// read all the users
router.get("/", log, userController.getUsers);

router.get("/isauth", passport.authenticate('jwt', {session: false}), userController.checkLogin);

// read a user
router.get("/:uid", userController.getOneUser);
// change a user's password
router.post("/:uid/actions/reset-password", passport.authenticate('jwt', {session: false}), userController.changePwd);
// delete a user
router.delete("/:uid", passport.authenticate('jwt', {session: false}), userController.deleteUser);
// add favoritePosts
router.post("/:uid/actions/addtofavorite/", userController.addToFavorite);

router.delete("/:uid/actions/deletefavorite/", userController.deleteFavorite);

router.put("/:uid/actions/setavatar/", userController.setAvatar);


//
// // set/update user's avatar
// router.put("/:uid/actions/set-avatar", (req, res, next) => {
//     const uid    = req.params.uid;
//     const input = req.body;
//     const promise = User.findByIdAndUpdate(uid, {$set: input}, {new: true})
//     promise.then(found => {
//         if (found)
//             return res.send(found);
//         else
//             return res.status(404 /* Not Found */).send();
//     }).catch(next);
// });
//
// router.post('/addfavorite', (req, res) => {
//   const uid = req.body.uid;
//   const pid = req.body.pid;
//
//   //get user by id
//   //then add pid to favoritePosts
//   //save user
//   //return reponse like { success: true, message:'saved successfully' }
//
// })

// router.get("/:uid/actions/addtofavorite/", auth.basic(), (req, res, next) => {
//   const uid = req.body.uid;
//   const pid = req.body.pid;
//   req.user.favoritePosts.push(req.params.pid);
//   req.user.save().then(user => {
//     req.send(user)
//   }).catch(next)
// });

// expose our router to require()
module.exports = router;
