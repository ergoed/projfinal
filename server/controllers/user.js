

 const bcrypt   = require("bcrypt");
 const mongoose = require("mongoose");
 const BCRYPT_COST = 4; // minimum=4
 const CONFIG = require("../config");
 const SECRET_TOKEN_KEY = CONFIG.SECRET_TOKEN_KEY;
 const JWT_EXPIRE = CONFIG.JWT_EXPIRE;

 const User = require ("../models/user");

 const jwt = require ("jsonwebtoken");

 const toObjectId = (_id)=>{
     return mongoose.Types.ObjectId.createFromHexString(_id);
 }

const userController = {

  authenticate:(req, res)=>{
        return User.findOne({name: req.body.name}).then(user => {
            if (!user)
              return res.json({success: false, message : 'User not found'});


            return bcrypt.compare(req.body.password, user.hash).then(success => {
              if (!success)
                return res.json({success: false, message: 'Wrong Password'});

              //créer token
              let token = jwt.sign(user.toJSON(), SECRET_TOKEN_KEY, {
                expiresIn: JWT_EXPIRE // expires in 24 hours
              });
              return res.json({success: true, message: 'Welcome', token: token});

            });
        });
  },

  createUser: (req, res, next) => {
    console.log('req.body->',req.body);

      //use bcrypt, set password to req.body.password
      bcrypt.hash(req.body.password, BCRYPT_COST).then(new_hash => {

           req.body.hash = new_hash;
           User.create(req.body).then(user => {
             //renvoyer objet { success: boolean, message: string, token?: string si success == true }
             //donc créer token
             let token = jwt.sign(user.toJSON(), SECRET_TOKEN_KEY, {
               expiresIn: JWT_EXPIRE // expires in 24 hours
             });
             return res.status(201).json({success: true, message: 'Bienvenue', token: token});

           }).catch(err => {
               if (err.name === 'ValidationError') {
                   return res.status(400 /* Bad Request */).send({
                     success: false,
                       message: err.message
                   });
               }
               return next(err);
           });
      });

  },

  getUsers: (req, res, next) => {
      console.log('getUsers');
      User.find({}).then(results => {
        results = results.map(user => user.toJSON());
          return res.send({success: true, message: '', users: results});
      }).catch(next);
  },

  getOneUser: (req, res, next) => {
      const user = res.locals.user;
      // mauvais car pas d'objet avec success, message
      //return res.send(user);
      return res.send({success: true, message: '', user: user.toJSON()});
  },

 addToFavorite: (req,res,next)=>{
  //  const uid = req.body.uid;
   var pid = req.body.pid;
   console.log("XXXXXXXXX", req.user, pid)
   //console.dir("UID HERE",uid, "PID HERE", pid)
   req.user.favoritePosts.push(pid);
   req.user.save().then(user => {
     return res.send({success: true, message: ''});
   }).catch(next)
 },

 deleteFavorite: (req,res,next)=>{
  //  const uid = req.body.uid;
   var pid = req.body.pid;
   console.log("XXXXXXXXX", req.user, pid)
   //console.dir("UID HERE",uid, "PID HERE", pid)
   req.user.favoritePosts.pull(pid);
   var id = 88;
//
// for(var i = 0; i < data.length; i++) {
//     if(data[i].id == id) {
//         data.splice(i, 1);
//         break;
//     }
// }
   req.user.save().then(user => {
     return res.send({success: true, message: ''});
   }).catch(next)
 },

 setAvatar:(req,res,next)=>{
     const uid    = req.params.uid;
     const input = req.body;
     const promise = User.findByIdAndUpdate(uid, {$set: input}, {new: true})
     promise.then(found => {
         if (found)
             return res.send(found);
         else
             return res.status(404 /* Not Found */).send();
     }).catch(next);
},

  changePwd: (req, res, next) =>{
      const logged_in = req.authUser;
      const target = req.user;
      console.dir(logged_in.toJSON(), {colors: true});
      console.dir(target.toJSON(), {colors: true});
      if (logged_in._id.toString() === target._id.toString()) {
         return bcrypt.hash(req.body.password, BCRYPT_COST).then(new_hash => {
            target.hash = new_hash;
            target.save();
            res.status(200).send(target.toJSON());
          }).catch(next);
      }
      else
          res.status(403 /* Forbidden */).end();
  },

  deleteUser: (req, res, next) => {
    const logged_in = req.authUser;
      const target = req.user;
      if (logged_in._id.toString() === target._id.toString())
          user.remove().then(removed => res.send(removed)).catch(next);
      else
          res.status(403 /* Forbidden */).end();
  },


  checkJWT: (req, jwtuser, next) => {
    console.log('checkJWT');
    User.findById(toObjectId(jwtuser._id)).then(user => {
      if (!user) {
        next(null, false);
       } else {
        req.authUser = user;
        next(null, user);
      }
    }).catch(next)
  },

  checkUID: (req, res, next, uid) => {
    User.findById(toObjectId(uid)).then(user => {
        if (!user) {
            return res.status(404 /* Not Found */).send();
        } else {
            //add user to request
            req.user = user;
            return next();
        }
    }).catch(next);
  },

  checkLogin: (req,res)=> {
    let token = jwt.sign(req.authUser.toJSON(), SECRET_TOKEN_KEY, {
      expiresIn: JWT_EXPIRE // expires in 24 hours
    });
    res.json({ success: true, message: 'JWT is correct', token: token});
  },

}
module.exports = userController;
