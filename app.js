'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var path = require('path');
var passport = require('passport');
var flash    = require('connect-flash');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var fs = require('fs');
var bcrypt = require('bcrypt');
var jwt  = require('jsonwebtoken'); // used to create, sign, and verify tokens
var url = require('url');
var session = require('express-session');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var globals = require('globals');

app.use(express.static(path.join(__dirname, 'www')));


var Store   = require('./www/config/storelocation');
var Storeline = require('./www/config/storeline.js');
var Track = require('./www/config/trackPosition.js');
var PeopleLine = require('./www/config/peopleline.js');
var UserStuff = require('./www/config/userinfo.js');
var User   = require('./www/config/user');
var Blue = require('./www/config/userblack.js');
var Blueadmin = require('./www/config/admin.js');


var expressValidator = require('express-validator'); //Declare Express-Validator

app.use(expressValidator());  //required for Express-Validator

app.use(express.static(path.join(__dirname, 'www')));
app.use(express.static(path.join(__dirname, '/')));
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', resave: true, saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

require('./www/config/passport')(passport); // pass passport for configuration
require('./www/routes/routes.js')(app, passport);


// 1) ADD REQUIRE MONGOOSE:
var mongoose = require('mongoose');

// 2) CONNECT MONGOOSE
 //mongoose.connect('mongodb://localhost/myappANG' , { useMongoClient: true });
 //mongoose.connect("mongodb://john:john1@ds013891.mlab.com:13891/white");

mongoose.connect("mongodb://john:john1@ds227565.mlab.com:27565/teal");

// 3) SIMPLE CHECK TO SEE IF CONNECTED TO DB
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {    console.log('Connected to DB!');   });


// grab the things we need
//  var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  date: { type: Date },

  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});


// the schema is useless so far
// we need to create a model using it
var Usertwo = mongoose.model('Usertwo', userSchema);





io.on('connection', function(socket){
     io.sockets.emit('broadcast',{ description:' clients connected!'});

     socket.on('clientEvent', function () {     console.log('socket worked!');   });

      socket.on('passInfo', function () {   console.log('this worked!');
  //  socket.emit('passInfoBack', { description: 'A custom event named testerEvent!'});
      });


      socket.on('storeName', function (data, callback) {
        console.log('data passed'); console.log(data);
          Store.find( {postal: data.postal})
            .exec(function(err, posts) {
              if (err) { return next(err); }
                  callback(posts);
                  console.log(posts );
            });
      });

      socket.on('storenameSearch', function (data, callback) {
             console.log(data);
              Store.find( {store: data.store})
              .exec(function(err, posts) {
              if (err) { return next(err); }
                  callback(posts);
                  console.log(posts );
            });
      });

/*
      socket.on('deleteStore44', function (data, callback) {
         Store.findOne({ $and: [{email: data.email}, {store: data.store}]})
          .exec(function(err, posts) {
              if (err) { return next(err); }
                  //  res.send(posts);
                    //res.status(200).send(posts);
                    //   posts.storeAdmin = 1;
                      //  posts.save();
                    if (posts.storeAdmin === 1) {
                    //  res.status(200).json(posts);
                    //    console.log(posts);

            } else {
              console.log("This email does not have StoreAdmin");
              callback('SORRY, YOU DO NOT HAVE AUTHORITY TO DELETE THAT STORE');
            }
          });
      });

*/

socket.on('addStore', function (data, callback) {
  console.log(data.store);
    Store.find( {store: data.store})
      .exec(function(err, post) {
         if (err) { return next(err); }
            //callback(posts);
            if (post.length === 0)  {
              var store = new Store({
                store: data.store,  postal: data.postal,
                latitude: data.latitude, longitude: data.longitude,
                Adminpassword: data.Adminpassword, email: data.email,
                  storeAdmin : '1'});
                store.save(function (err, post) {
                  if (err) { return next(err); }
              //   callback(post);
                io.emit('addStorename', post);
                 console.log(post);
                });
            } else {
              console.log(post.length);
              console.log('STORE IS ALREADY IN DB!');
              callback('STORE IS ALREADY IN DB!')
            //  res.status(401).send({success: false, msg: 'Passwords dont match.'});
          }
     });
});




    socket.on('deleteStore44', function (data, callback) {
  //    Store.find({store: data.store, email: data.email})
    //   Store.findOne({ $and: [{email: data.email}, {store: data.store}]})
    Store.findOne({store: data.store, email: data.email}, function( err, posts){
        //.exec(function(err, posts) {
            if (err) { return next(err); }
                     console.log(posts);   console.log(posts.store);
                    console.log(posts.email); console.log(posts.storeAdmin);

                  if (posts.storeAdmin == '1') {

                Store.remove({store: data.store}, function(err) {
                    Store.find().exec(function(err, posts) {
                      if (err) { return next(err); }
                         console.log(posts);
                     // callback(posts);
                      io.emit('deleteUpdate', posts);
                    });
                });
            //  io.emit('deleteUpdate', posts);
          } else {
            console.log("This email does not have StoreAdmin");
            callback('SORRY, YOU DO NOT HAVE AUTHORITY TO DELETE THAT STORE');
          }
        });
    });


    socket.on('deletestoreAdmin', function (data) {
       console.log(data);
       Store.remove({store: data.store}, function(err) {
           Store.find().exec(function(err, posts) {
             if (err) { return next(err); }
                console.log(posts);
            // callback(posts);
             io.emit('deleteUpdate', posts);
           });
       });
    });

/*
socket.on('deleteStore44', function (data) {
   console.log(data);
   Store.remove({store: data.store}, function(err) {
       Store.find().exec(function(err, posts) {
         if (err) { return next(err); }
            console.log(posts);
        // callback(posts);
         io.emit('deleteUpdate', posts);
       });
   });
});
*/


      socket.on('numberofLines', function (data, callback) {
         console.log(data);
         Storeline.find({store: data.store}, function( err, count){
             console.log( "Number of users:", count );
              callback(count);
           });
      });

      socket.on('optimizeData', function (data) {
        PeopleLine.update({ $and: [{store: data.store}, {line: data.line}, {email: data.email}]},
          {distance: data.distance})
          .exec(function(err, posts) {
              if (err) { return next(err); }

            PeopleLine.find({ $and: [{store: data.store}, {line: data.line}, {email: data.email}]})
              .exec(function(err, posts) {
                  if (err) { return next(err); }
                io.emit('optimizeReturned', posts);
                 console.log(posts);
                });
            });
      });

      socket.on('addLine1', function (data, callback) {
        console.log(data);
        console.log("number sent to DB: " + data.line);
        console.log("token: " + data.Adminpassword);
        console.log("lineAdmin: " + data.lineAdmin);

              Storeline.count({ $and: [{store: data.store}, {line: data.line}]}   )
                .exec(function(err, count) {
                    if (err) { return next(err); }
                 console.log( "Number of users:", count );
                if (count == 1) {
                  console.log('fcn ended b/c its in table');
                  callback('fcn ended b/c its in table');
              } else {
                  var storeline = new Storeline({
                  store: data.store, line: data.line, lineAdmin: data.lineAdmin});
                  storeline.save(function (err, post) {
                    if (err) { return next(err); }
                  //  res.send(post)
                  io.emit('addLineStuff', post);
                  console.log(post);
                //  callback(post);
              });
            }
        });
    });


socket.on('poll', function (data, callback) {
  console.log(data);
      callback(data);
});


socket.on('getPeopleLine', function (data, callback) {
  PeopleLine.find({ $and: [{store: data.store}, {line: data.line}]})
    .exec(function(err, posts) {
        if (err) { return next(err); }
      callback(posts);  console.log(posts);
      });
});

socket.on('getLineCoordinates', function (data, callback) {
  Store.find( {store: data.store})
    .exec(function(err, posts) {
      if (err) { return next(err); }
    callback(posts);  console.log(posts);
    });
});


/*        ***************** NOTE: PLEASE KEEP THIS!!! ********************
      socket.on('addperson11', function (data) {
        var newUser2 = PeopleLine({
          email : data.email, line: data.line,
          position: data.position,  store: data.store,
          fullname : data.fullName,  longitude: data.longitude,
          latitude: data.latitude,  distance: data.distance
        });

        newUser2.save(function (err, post) {
          if (err) {return next(err); }
        //  callback(post);
            io.emit('updatePeople', post);
          console.log(post);
        });
      });
      /*        ***************** NOTE: PLEASE KEEP THIS!!! ********************

*/

socket.on('addperson11', function (data, callback) {
  console.log(data.notificationkey);
  PeopleLine.findOne({store: data.store, line: data.line, email: data.email}).exec(function(err, posts) {
        if (err) { return next(err); }
          if (posts) {
            console.log(posts);
            callback('SORRY! THAT EMAIL IS ALREADY IN THE DATABASE!');

          } else {
            var newUser2 = PeopleLine({
              email : data.email, line: data.line,
              position: data.position,  store: data.store,
              fullname : data.fullName,  longitude: data.longitude,
              latitude: data.latitude,  distance: data.distance,
              notificationkey: data.notificationkey
            });

            newUser2.save(function (err, post) {
              if (err) {return next(err); }
            //  callback(post);
                io.emit('updatePeople', post);
              console.log(post);
            });
          }
        });
});

    socket.on('optimizeData', function (data) {
      PeopleLine.find({ $and: [{store: data.store}, {line: data.line}, {email: data.email}]})
        .exec(function(err, posts) {
            if (err) { return next(err); }
          //callback(posts);
          console.log(posts);
          });
    });

//     Storeline.remove({ $and: [{store: data.store}, {line: data.line}]}, function(err,removed) {

      socket.on('deletePeopleLine44', function (data, callback) {
        console.log(data.store); console.log(data.line); console.log(data.email);
        PeopleLine.remove({$and: [{store: data.store}, {line: data.line}, {email: data.email} ]}, function(err,removed) {
          PeopleLine.find({store: data.store})
            .exec(function(err, posts) {
          if (err) { return next(err); }
          callback(posts);  console.log(posts);
        });
        });
      });

      socket.on('deletePeopleLine55', function (data) {
        console.log(data.store); console.log(data.line); console.log(data.email);
        PeopleLine.remove({store: data.store, line: data.line, email: data.email}, function(err,removed) {
          PeopleLine.find({store: data.store, line: data.line}).exec(function(err, posts) {
          if (err) { return next(err); }
          //callback(posts);
          io.emit('deletePeople55', posts);
             console.log(posts);
               });
          });
      });

      socket.on('deletePersonnotify', function (data) {
        console.log(data.store); console.log(data.line); console.log(data.email);
        PeopleLine.remove({store: data.store, line: data.line, email: data.email}, function(err,removed) {
          PeopleLine.find({store: data.store, line: data.line}).exec(function(err, posts) {
          if (err) { return next(err); }
          //callback(posts);
          io.emit('deletePersonback', posts);
             console.log(posts);
               });
          });
      });

//          PeopleLine.find({ $and: [{store: data.store}, {line: data.line}]}).exec(function(err, posts) {


      socket.on('checkPeopleAdmin', function (data, callback) {
          var bob = data.store; var bob2 = data.Adminpassword;
          console.log("Store: "+ bob);  console.log("Admin: "+ bob2);

          if(bob2 !== undefined) {
            Store.find( {store: data.store, Adminpassword: data.Adminpassword})
              .exec(function(err, posts) {
                if (err) { return next(err); }

              callback(posts);  console.log(posts);
              });
          } else{
            console.log("Adminpassword was equal to undefined so query did not run!");
          }
      });


/*
      socket.on('deleteselectedLine', function (data) {
        console.log('store: '+data.store);
        console.log('line: '+data.line);
        Storeline.remove({ $and: [{store: data.store}, {line: data.line}]}, function(err,removed) {
          Storeline.find({store: data.store}).exec(function(err, posts) {
            if (err) { return next(err); }
            //callback(posts);
             io.emit('deleteLinesUpdate', posts);
               console.log(posts);
           });
        });
      });

            NOTE:     1) CHECK IF YOUR StoreAdmin
                      2) CHECK IF YOUR LineAdmin
                      3) Check your email with email of person you select....
*/


      socket.on('deleteselectedLine', function (data, callback) {
        //CHECK STORE FOR ADMIN
       Store.findOne({store: data.store, email: data.email}, function( err, posts){
             if (err) { return next(err); }
                  //   posts.storeAdmin = 1;
                    //  posts.save();
                    console.log(posts); console.log(posts.store);
                    console.log(posts.email); console.log(posts.storeAdmin);

                  if (posts.storeAdmin == '1') {
                        Storeline.remove({ $and: [{store: data.store}, {line: data.line}]},
                          function(err,removed) {
                          Storeline.find({store: data.store}).exec(function(err, posts) {
                            if (err) { return next(err); }
                            //callback(posts);
                             io.emit('deleteLinesUpdate', posts);
                               console.log(posts);
                           });
                        });
                 } else {
                    console.log("This email does not have StoreAdmin");
                    //CHECK STORELINE FOR LINE
                    Storeline.findOne({line: data.line, email: data.email, store: data.store},
                       function( err, posts){
                         if (err) { return next(err); }
                         console.log(posts);
                             //posts.lineAdmin = 1;
                            //  posts.save();
                          //  console.log(posts);
                            //console.log(posts.lineAdmin);

                          if (posts.lineAdmin == '1') {
                            Storeline.remove({ $and: [{store: data.store}, {line: data.line}]},
                              function(err,removed) {
                              Storeline.find({store: data.store}).exec(function(err, posts) {
                                if (err) { return next(err); }
                                //callback(posts);
                                 io.emit('deleteLinesUpdate', posts);
                                   console.log(posts);
                               });
                            });
                      } else {
                        console.log("This email does not have StoreAdmin");
                          callback('SORRY, YOU DO NOT HAVE AUTHORITY TO DELETE THAT LINE');
                        }
                    });
                }
          });
      });



socket.on('deleteselectedLineAdmin', function (data) {
  console.log('store: '+data.store);
  console.log('line: '+data.line);
  Storeline.remove({ $and: [{store: data.store}, {line: data.line}]}, function(err,removed) {
    Storeline.find({store: data.store}).exec(function(err, posts) {
      if (err) { return next(err); }
      //callback(posts);
       io.emit('deleteLinesUpdate', posts);
         console.log(posts);
         // Add a javascript object to this with store: data.store so
         //that it will work right.
    });
  });
});


        socket.on('addPerson244', function (data, callback) {
          console.log(data.number);
          number = data.number;
              PeopleLine.find({store: data.store, line: data.line})
              .sort('created')
              .exec(function(err, posts) {
              if (err) { return next(err); }
               console.log(posts);

                //gets certain timestamp:
                var blue = posts[number].created;
                console.log(blue);
                var  white = blue.addSeconds(1);
                console.log(white);


               var newUser2 = PeopleLine({
                 email : data.email, line: data.line,
                 position: data.position,  store: data.store,
                 fullname : data.fullName,  longitude: data.longitude,
                 latitude: data.latitude,  distance: data.distance,
                 created: white
               });

               newUser2.save(function (err, post) {
                 if (err) {return next(err); }
                 callback(post);     console.log(post);
               });

               });

        });

        /*************    Messaging   ****************/

        socket.on('findUserTokens', function (data, callback) {
        Blue.find({})
        .exec(function(err, posts) {
            if (err) { return next(err); }
        //res.status(200).json(posts);
          callback(posts);    console.log(posts);
          });
        });

        socket.on('findUserTokensPeopleLine', function (data, callback) {
        PeopleLine.find({})
        .exec(function(err, posts) {
            if (err) { return next(err); }
            callback(posts);    console.log(posts);
          });
        });

    });




  //CORS REQUEST WORKED!
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



//curl -X POST  http://localhost:3000/signup22
//curl -X POST -H 'Content-Type: application/json' -d '{"fname":"davidwalshr","lname":"davidwalshr","email":"davidwalshr","password":"fsomethingt", "passwordConf": "fsomethingt"}' http://localhost:3000/signup22

/*
app.post('/deletePeop', function (req, res, next) {
  PeopleLine.remove({store: req.body.store, line: req.body.line, email: req.body.email}, function(err,removed) {
    PeopleLine.find({store: req.body.store, line: req.body.line}).exec(function(err, posts) {
    if (err) { return next(err) }
    res.send(posts);    console.log(posts);
         })
    });
})
*/

//curl -X POST -H 'Content-Type: application/json' -d '{"email":"jlatouf2@gmail.comsadfasfaf888", "password":"jarredl"}' http://localhost:3000/signup22

/*---------- SIGNUP FUNCTION: --------------*/

app.post('/signup22', function (req, res, next) {
  console.log(req.body.noteToken);
//var noteTokenvar = req.body.noteToken;
      if (req.body.password !== req.body.passwordConf) {
         res.status(401).send({success: false, msg: 'Passwords dont match.'});
        console.log('Passwords dont match');
        //  return next(err);
      } else {
        console.log('blue');
      if (req.body.email && req.body.fname &&
          req.body.lname && req.body.password &&
          req.body.passwordConf) {

        var userData = {
          email: req.body.email, firstname: req.body.fname,
          lastname: req.body.lname, password: req.body.password,
          passwordConf: req.body.passwordConf, notificationkey: req.body.noteToken
        };

        Blue.findOne({ email: req.body.email }, function(err, user) {
                if (err) throw err;

                if (user) {
                  console.log('username didnt work');
                  res.status(401).send({success: false, msg: 'Authentication failed. User already exists!'});
                }  else {

                Blue.create(userData, function (err, user) {
                  if (err) { return next(err); }

                  res.status(200).send(user);
                    console.log(user);
                  //  return res.redirect('/profile');

                });

                   }
          })

      } else {
            res.status(401).send({success: false, msg: 'Please fill in all Userdata.'});
      }

       }
});


/*---------- LOGIN FUNCTION: --------------*/

/*   var Blue = require('./models/userblack.js');
//curl -X POST  http://localhost:3000/login22999
curl -X POST -H 'Content-Type: application/json' -d '{"email":"jlatouf23333@gmail.com", "password":"jarredl"}' http://localhost:3000/login22999
curl -X POST -H 'Content-Type: application/json' -d '{"email":"davidwalshr","password":"fsomethingt"}' http://localhost:3000/login22999
*/

app.post('/tokenReturned', function(req, res) {
  console.log('workedit!');
  console.log(req.body.token);
  res.send(req.body.token);
});

//curl -X POST -H 'Content-Type: application/json' -d '{"email":"davidwalshr","password":"fsomethingt"}' http://localhost:3000/getBlack
//curl -X POST  http://localhost:3000/getBlack

app.post('/getBlack', function(req, res) {
  Storeline.find({ store: 'bobby' }).where({line: '2'})
  .exec(function(err, users) {
  if (err) throw err;
  if (users.lineAdmin == '1') {
    console.log(users);

  }
  // show the admins in the past month
  console.log(users);
  });
});

app.post('/touchit', function(req, res) {
  console.log('workedit!');
});

app.post('/numberofLines', function(req, res, data) {
   console.log(data);
   Storeline.find({store: req.body.store}, function( err, count){
       console.log( "Number of users:", count );
        res.send(count);
     });
});


//NOTE: THIS ONE WORKS!!!!

//curl -X POST  http://localhost:3000/addNotificationtoken3

app.post('/addNotificationtoken3', function(req, res) {
Blue.findOne({ email: 'jlatouf2@gmail.com' })
.exec(function(err, posts) {
    if (err) { return next(err); }
//  res.send(posts);
//res.status(200).send(posts);
//  posts.notificationkey = 'small';
//  posts.save();

res.status(200).json(posts);
console.log(posts);
  });
});


//curl -X POST  http://localhost:3000/findUsers

app.post('/findUserTokensPeopleLine', function(req, res) {
PeopleLine.find({})
.exec(function(err, posts) {
    if (err) { return next(err); }
//  res.send(posts);
//res.status(200).send(posts);
//  posts.notificationkey = 'small';
//  posts.save();

//res.send(posts);

res.status(200).json(posts);
console.log(posts);
  });
});


app.post('/login22999', function(req, res) {
  console.log('PASSED TO BACKEND!');
  console.log(req.body.noteToken);
var noteTokenvar = req.body.noteToken;
  Blue.findOne({ email: req.body.email }, function(err, user) {
    if (err) throw err;

    if (!user) {
      console.log('username didnt work');
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {

        //  console.log(user);
          // if user is found and password is right create a token
        //  var token = jwt.sign(user, config.secret);
          // return the information including token as JSON
          //res.json({success: true});
          var secretKey = 'secrettoken';


        //  var token = jwt.sign({ foo: 'bar' }, secretKey);
          //console.log('TOKEN2 ' + token);

          console.log("USER FIRSTNAME" +user.firstname);

          var token = jwt.sign(user.firstname, secretKey);
          console.log('TOKEN ' + token);
          var push;
          var decoded = jwt.verify(token, secretKey);
          console.log('decoded: ' + decoded);
          console.log(user);
        //  var bob = user.push(token)
          //mything.NewField = 'foo';
    //      user.tokens = token;

      //NOTIFICAITON KEY SAVED:
         user.notificationkey = noteTokenvar;
          user.save();

          res.send({'user': user, 'token': token});

        } else {
          console.log('didnt work password');
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

            /*******    ADMIN LOGIN     ********/

//curl -X POST -H 'Content-Type: application/json' -d '{"email":"jlatouf2@gmail.comsadfasfaf777", "password":"jarredl"}' http://localhost:3000/adminLogin
//curl -X POST -H 'Content-Type: application/json' -d '{"email":"davidwalshr","password":"fsomethingt"}' http://localhost:3000/adminLogin

app.post('/adminLogin', function(req, res) {
  console.log('PASSED TO BACKEND!');
  console.log(req.body.noteToken);
var noteTokenvar = req.body.noteToken;
  Blueadmin.findOne({ email: req.body.email }, function(err, user) {
    if (err) throw err;

    if (!user) {
      console.log('username didnt work');
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {

         user.notificationkey = noteTokenvar;
          user.save();

          res.send({'user': user});

        } else {
          console.log('didnt work password');
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});



//curl -X POST -H 'Content-Type: application/json' -d '{"email":"jlatouf2@gmail.comsadfasfaf888", "password":"jarredl"}' http://localhost:3000/signup55


app.post('/adminSignup', function (req, res, next) {
  var userData = {
    email: req.body.email,  password: req.body.password
  };
        Blueadmin.findOne({ email: req.body.email }, function(err, user) {
                if (err) throw err;

                if (user) {
                  console.log('username didnt work');
                  res.status(401).send({success: false, msg: 'Authentication failed. User already exists!'});
                }  else {

                Blueadmin.create(userData, function (err, user) {
                  if (err) { return next(err); }

                  res.status(200).send(user);
                    console.log(user);
                  //  return res.redirect('/profile');
                });
                   }
          })
});



//curl -X POST -H 'Content-Type: application/json'  http://localhost:3000/checkDB
//curl -X POST -H 'Content-Type: application/json'  http://localhost:3000/checkDB
//"email": "jlatouf2@gmail.comsadfasfaf777",
//"password": "$2a$10$D.EVq82qb/XFtATWPhRwUuJwbqx4tQBqJzFvOPW9B5QIspKvQKpTG",

app.post('/checkDB', function(req, res) {
  Blueadmin.find({ }, function(err, user) {
    if (err) throw err;

    console.log(user);

    if (!user) {
      console.log('username didnt work');
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    }
  });
});


app.post('/addStore', function(req, res, data) {
   console.log(req.body.store);   console.log(req.body.latitude);

        var store = new Store({
          store: req.body.store,  postal: req.body.postal,
          latitude: req.body.latitude, longitude: req.body.longitude,
          Adminpassword: req.body.Adminpassword  });

          store.save(function (err, post) {
            if (err) { return next(err); }
        //   callback(post);
        //  io.emit('addStorename', post);
          res.send(post);
           console.log(post);
          });
});


app.post('/polling', function(req, res) {
res.send('posts');
  });

app.post('/storeName', function(req, res, data) {
       console.log(data);
        Store.find( {})
        .exec(function(err, posts) {
        if (err) { return next(err); }
              res.send(posts);
            console.log(posts );
      });
});

app.post('/deleteStore44', function(req, res, data) {
   console.log(req.body.store);
   Store.remove({store: req.body.store}, function(err) {
       Store.find().exec(function(err, posts) {
         if (err) { return next(err); }
            console.log(posts);
        // callback(posts);
        res.send(posts);
      //   io.emit('deleteUpdate', posts);
       });
   });
});


//curl -X POST  http://localhost:3000/addNotificationtoken
// curl -X POST -H 'Content-Type: application/json' -d '{"email":"jlatouf2@gmail.com","password":"jarredl"}' http://localhost:3000/backedTouched

// curl -X POST -H 'Content-Type: application/json' -d '{"email":"jlatouf2@gmail.com", "token" : "DFKDJFI3K3J3"}' http://localhost:3000/addNotificationtoken

app.post('/addNotificationtoken', function(req, res) {
//  Tank.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec(callback);
console.log(req.body.token);  console.log(req.body.email);
//Blue.find({ $and: [{store: req.body.store}, {line: req.body.line}]})

  //  Blue.save({ notificationkey: 'small' }).where({email:'jlatouf2@gmail.com'})
//  PeopleLine.find({ $and: [{store: req.body.store}, {line: req.body.line}]})

var blueUser = Blue({ notificationkey : 'small'});
    Blue.findOne({ email: 'jlatouf2@gmail.com' }, function(err, user) {
      if (err) { return next(err); }
        console.log(user);

        blueUser.save(function(err, post) {
        if (err) { return next(err); }

        console.log(post);
        res.send(post);
    });
  });

});

//curl -X POST  http://localhost:3000/addNotificationtoken2
/*
Model.findOne({ name: 'bourne' }, function (err, doc){
  doc.name = 'jason bourne';
  doc.visits.$inc();
  doc.save();
});
*/

app.post('/addNotificationtoken2', function(req, res) {
  //Blue.find({ $and: [{email: 'jlatouf2@gmail.com'}]})
  PeopleLine.findOne({ email: 'jlatouf2@gmail.com' })
    .exec(function(err, posts) {
        if (err) { return next(err); }
           posts.notificationkey = 'small';
          posts.save();
      res.status(200).json(posts);
        console.log(posts);
      });
});

          //NOTE: THIS ONE WORKS!!!!

//curl -X POST  http://localhost:3000/addNotificationtoken3

app.post('/addNotificationtoken3', function(req, res) {
  Blue.findOne({ email: 'jlatouf2@gmail.com' })
    .exec(function(err, posts) {
        if (err) { return next(err); }
    //  res.send(posts);
      //res.status(200).send(posts);
        //  posts.notificationkey = 'small';
        //  posts.save();

      res.status(200).json(posts);
        console.log(posts);
      });
});

//curl -X POST  http://localhost:3000/adminStore
// curl -X POST -H 'Content-Type: application/json' -d '{"email":"jlatouf2@gmail.com", "token" : "DFKDJFI3K3J3"}' http://localhost:3000/adminStore

// curl -X POST -H 'Content-Type: application/json' -d '{"email":"jlatouf2@gmail.com", "store" : "bobby"}' http://localhost:3000/adminStore


//paste on deletebutton of StorePage/Linepage/Peoplepage
//SO USE THIS FUNCTION ON DELETE OF ANYPAGE DATA, AND JUST SEND THE EMAIL OF THE PERSON AND IT WILL WORK!!1
app.post('/adminStore', function(req, res) {
   PeopleLine.findOne({ $and: [{email: req.body.email}, {store: req.body.store}]})
//PeopleLine.findOne({ $and: [{email: req.body.email}]})
  //Blue.findOne({ email: 'jlatouf2@gmail.com' })
    .exec(function(err, posts) {
        if (err) { return next(err); }
    //  res.send(posts);
      //res.status(200).send(posts);
      //    posts.storeAdmin = 1;
      //    posts.save();
      if (posts.storeAdmin === 1) {
        res.status(200).json(posts);
          console.log(posts);
      } else {
        console.log("This email does not have StoreAdmin");
      }

      });
});


//THIS WILL WORK FOR LINE AND PEOPLEDELETE:
app.post('/adminLine', function(req, res) {
   PeopleLine.findOne({ $and: [{email: req.body.email}, {storeAdmin: 1}]})
    .exec(function(err, posts) {
        if (err) { return next(err); }
      if (posts) {
            res.status(200).json(posts);
              console.log(posts);
      } else {

            PeopleLine.findOne({ $and: [{email: req.body.email}, {lineAdmin: 1}]})
             .exec(function(err, posts) {
                 if (err) { return next(err); }
               if (posts) {
                 res.status(200).json(posts);
                   console.log('THIS EMAIL IS LINEADMIN');
               } else {
                 console.log("This email does not have LineAdmin");

              }
             });
        }
      });
});


app.post('/getPeopleLine', function(req, res) {
  PeopleLine.find({ $and: [{store: req.body.store}, {line: req.body.line}]})
    .exec(function(err, posts) {
        if (err) { return next(err); }
    //  res.send(posts);
      //res.status(200).send(posts);
       res.status(200).json(posts);
        console.log(posts);
      });
});


app.get('/getData', function(req, res) {
  console.log('workedit!');
    res.send('getit!');
});


app.post('/postData', function(req, res, data) {
  console.log('workedit!');
  console.log(data);
  res.send(data);
});


app.post('/postData22', function(req, res, data) {
  console.log(data);
  console.log(req.body.responseType);

  res.send(req.body.responseType);
});

//curl -X POST  http://localhost:3000/backedTouched

app.post('/backedTouched', function(req, res) {
  console.log('workedit!');
  console.log(req.body.email);
  console.log(req.body.userID);
  console.log(req.body.name);

});



app.post('/facebookSignupLogin', function(req, res) {
  console.log('PASSED TO BACKEND!'); console.log(req.body.email);
  console.log(req.body.userID); console.log(req.body.name);
  console.log(req.body.noteToken);
  console.log(typeof(req.body.email)); console.log(typeof(req.body.userID));
  console.log(typeof(req.body.name));

  var noteTokenvar = req.body.noteToken;

  Blue.findOne({ email: req.body.email }, function(err, user) {
    if (err) {throw err;}
    console.log(user);
    if (!user) {
    //  res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});

    //  var userData = { email: 'jlatouf2@gmail.com' };
      var userData = {
        email: req.body.email, firstname: req.body.name,
        password: 'pass', notificationkey: req.body.noteToken,
        passwordConf: 'pass'
      };
      //use schema.create to insert data into the db
      Blue.create(userData, function (err, user) {
        if (err) { throw err;
        } else {
          res.send(user);
        //  return res.redirect('/profile');
        }
      });

    } else {
       console.log('user is already in database');

       user.notificationkey = noteTokenvar;
        user.save();

      console.log(user); console.log(user.email); console.log(user.firstname);
      res.send(user);
    }
  });
});





//    curl -X POST -H 'Content-Type: application/json' -d '{"email":"davidwalshr","password":"fsomethingt"}' http://localhost:3000/login3333




/*
//https://shitapp01.herokuapp.com/#/app/login
//https://shitapp01.herokuapp.com/auth/facebook/callback

  -change callback:
callbackURL: "https://shitapp01.herokuapp.com/auth/facebook/callback",

Valid OAuth redirect URIs
1)https://shitapp01.herokuapp.com/auth/facebook/callback
2)App domains: shitapp01.herokuapp.com
3)Site URL https://shitapp01.herokuapp.com

*/

      /*---------- FACEBOOK LOGIN  --------------*/

      app.get('/auth/facebook', passport.authenticate('facebook', {scope:'email'}));

      app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/#/login' }),
        function(req, res, user) {
        user : req.user// get the user out of session and pass to template
        //shitapp01.herokuapp.com
        //https://shitapp01.herokuapp.com/

        //thawing-ocean-11742.herokuapp.com
        //https://thawing-ocean-11742.herokuapp.com/#/:3000
        sess=req.session;       sess.data=req.user;
        console.log("THIS IS THE USER STUFF"  + sess);
        console.log("THIS IS THE USER STUFF"  + sess.data);
        console.log("THIS IS THE USER _id"  + sess.data.facebook._id);
        console.log("THIS IS THE USER email"  + sess.data.facebook.email);
        console.log("THIS IS THE USER TOKEN"  + sess.data.facebook.token);
        console.log("THIS IS THE USER PHOTOS"  + sess.data.facebook.photos);
        res.redirect('/#/profile');


        });
        //https://thawing-ocean-11742.herokuapp.com/#/:8100/auth/facebook/callback
        //  callbackURL: "https://shitapp01.herokuapp.com/auth/facebook/callback",
        //CHECK CODE/ANG APPS/MYPROJECTS/ALL LOGIN WORKS!!! for code for heroku logins!!!!
        passport.use(new FacebookStrategy({
              clientID: '506464429730479', clientSecret: 'efb8d95e6fc6a9d733769efa994d23fd',
              callbackURL: "/auth/facebook/callback",
              profileFields: ['id', 'displayName', 'link',  'photos', 'emails']
              },
              function(accessToken, refreshToken, profile, done) {
                  process.nextTick(function () {
                //     User.findOne({'facebook.id' : profile.id, 'facebook.name' : profile.name, 'facebook.email' : profile.email}, function (err, user) {
               User.findOne({'facebook.email' : profile.emails[0].value}, function (err, user) {

                    if (err) return done(err);
                       console.log('ERROR');

                    if (user) {
                      console.log('FOUND');     console.log(user);

                     return   done(null, user);

                    } else {
                      console.log('NEW');

                        var newUser = new User();
                        newUser.facebook.token = accessToken;
                        newUser.facebook.email = profile.emails[0].value;
                        newUser.facebook.id = profile.id;
                        newUser.facebook.name = profile.displayName;
                        newUser.facebook.photos = profile.photos;
                        newUser.facebook.password = profile.password;
                        console.log('PASSWORD' + profile.password)

                        console.log('ACCESSTOKEN' + accessToken);   console.log('EMAIL' + profile.emails[0].value);
                         console.log('NAME' + profile.displayName);   console.log('ID' + profile.id);
                         console.log('PHOTOS1' + profile.photos[0]);  console.log('PHOTOS3' + profile.photos[0].value);

                                 newUser.save(function(err) {
                              if (err)
                                  throw err;
                              // if successful, return the new user
                              return done(null, newUser);

                          });
                          }
                      });
                  });
              }
          ));





   // =========================================================================
   // GOOGLE ==================================================================
   // =========================================================================

   // =====================================
   // GOOGLE ROUTES =======================
   // =====================================
   // send to google to do the authentication
   // profile gets us their basic information including their name
   // email gets their emails
   app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

   // the callback after google has authenticated the user
  /* app.get('/auth/google/callback',  passport.authenticate('google', {
   								successRedirect : '/#/profile',
   								failureRedirect : '/#/login'
   				}));

          app.get('/auth/google/callback',  passport.authenticate('google', {
                          successRedirect : '/#/profile',
                          failureRedirect : '/#/login'
                  }));

*/



   				app.get('/connect/google', passport.authenticate('google', {
       scope: [
           'https://www.googleapis.com/auth/userinfo.profile',
           'https://www.googleapis.com/auth/userinfo.email'
       ]
   }));


    app.get('/auth/google/callback',  passport.authenticate('google', { failureRedirect : '/#/login' }),
    function(req, res, user) {

      user : req.user // get the user out of session and pass to template
      sess=req.session;       sess.data=req.user;
      console.log("THIS IS THE USER STUFF"  + sess);
      console.log("THIS IS THE USER STUFF"  + sess.data);
      console.log("THIS IS THE USER _id"  + sess.data.google.id);
      console.log("THIS IS THE USER email"  + sess.data.google.email);
      console.log("THIS IS THE USER TOKEN"  + sess.data.google.token);
      res.redirect('/#/profile');


      });

/*
<strong>id</strong>: <%= user.google.id %><br>
<strong>token</strong>: <%= user.google.token %><br>
<strong>email</strong>: <%= user.google.email %><br>
<strong>name</strong>: <%= user.google.name %>


-change callback:
callbackURL: "https://shitapp01.herokuapp.com/auth/google/callback",

Valid OAuth redirect URIs
1)https://shitapp01.herokuapp.com/auth/google/callback
2)App domains: shitapp01.herokuapp.com
3)Site URL https://shitapp01.herokuapp.com


*/


   passport.use(new GoogleStrategy({

       clientID        : '901561854903-rb6dnoqj33a4mbi0p44st9cruhk99kpm.apps.googleusercontent.com',
       clientSecret    : '_DUwq_Md4uN1sPRKw1l-8uTZ',
       callbackURL     : 'http://localhost:3000/auth/google/callback',

   },
   function(token, refreshToken, profile, done) {

       // make the code asynchronous
       // User.findOne won't fire until we have all our data back from Google
       process.nextTick(function() {

           // try to find the user based on their google id
           User.findOne({ 'google.id' : profile.id }, function(err, user) {
               if (err)
                   return done(err);

               if (user) {

                   // if a user is found, log them in
                   return done(null, user);
               } else {
                   // if the user isnt in our database, create a new user
                   var newUser          = new User();

                   // set all of the relevant information
                   newUser.google.id    = profile.id;
                   newUser.google.token = token;
                   newUser.google.name  = profile.displayName;
                   newUser.google.email = profile.emails[0].value; // pull the first email


                   console.log('ACCESSTOKEN' + token);   console.log('EMAIL' + profile.emails[0].value);
                    console.log('NAME' + profile.displayName);   console.log('ID' + profile.id);


                   // save the user
                   newUser.save(function(err) {
                       if (err)
                           throw err;
                       return done(null, newUser);
                   });
               }
           });
       });

   }));




   // =====================================
   // TWITTER ROUTES =======================
   // =====================================

   app.get('/auth/twitter', passport.authenticate('twitter'), function(req,res,user) {


   });

/*
   // handle the callback after twitter has authenticated the user
   app.get('/auth/twitter/callback',passport.authenticate('twitter', {
           successRedirect : '/#/profile',
           failureRedirect : '/#/login'
       }));
*/


//curl -X POST  http://localhost:3000/jp

app.post('/jp', function (req, res) {
/*  var hostname = req.headers.host; // hostname = 'localhost:8080'
  var pathname = url.parse(req.url).pathname; // pathname = '/MyApp'
  console.log('http://' + hostname );
*/
  console.log('This worked!');
  var hostname = req.headers.host; // hostname = 'localhost:8080'
  console.log('http://' + hostname );

  if (hostname == 'localhost:3000') {
     global.myhostCallback = 'http://localhost:3000/auth/twitter/callback';
     console.log(global.myhostCallback);
  } else if (hostname == "192.168.1.115:3000") {
    global.myhostCallback = 'http://localhost:3000:3000/auth/twitter/callback';
    console.log(global.myhostCallback);
//http://192.168.1.115: THIS WORKS FOR MOBILE LOGIN.
  }

  });

       app.get('/auth/twitter/callback',  passport.authenticate('twitter', { failureRedirect : '/#/login' }),
       function(req, res, user) {

         user : req.user // get the user out of session and pass to template
         sess=req.session;       sess.data=req.user;
         console.log("THIS IS THE USER STUFF"  + sess);
         console.log("THIS IS THE USER STUFF"  + sess.data);
         console.log("THIS IS THE USER _id"  + sess.data.twitter.id);
         console.log("THIS IS THE USER email"  + sess.data.twitter.email);
         console.log("THIS IS THE USER TOKEN"  + sess.data.twitter.token);
         res.redirect('/#/profile');


         });

        passport.use(new TwitterStrategy({

           consumerKey     : 'KvZbc8GfpjmOU2AoQ81NPrc7U',
           consumerSecret  : 'k0N77FqvqSgEqlEnGkfQedpu7V0wKbRJa1BNfuInicmf4YkOqD',
           callbackURL     : 'http://localhost:3000/auth/twitter/callback'
//https://shitapp01.herokuapp.com/auth/facebook/callback
       },
       function(token, tokenSecret, profile, done) {

           // make the code asynchronous
       // User.findOne won't fire until we have all our data back from Twitter
           process.nextTick(function() {

               User.findOne({ 'twitter.id' : profile.id }, function(err, user) {

                   // if there is an error, stop everything and return that
                   // ie an error connecting to the database
                   if (err)
                       return done(err);

                   // if the user is found then log them in
                   if (user) {
                       return done(null, user); // user found, return that user
                   } else {
                       // if there is no user, create them
                       var newUser                 = new User();

                       // set all of the user data that we need
                       newUser.twitter.id          = profile.id;
                       newUser.twitter.token       = token;
                       newUser.twitter.username    = profile.username;
                       newUser.twitter.displayName = profile.displayName;

                       // save our user into the database
                       newUser.save(function(err) {
                           if (err)
                               throw err;
                           return done(null, newUser);
                       });
                   }
               });

       });
     }));



        /*---------- CONFIRM LOGIN  --------------*/

        app.get('/confirm-login', function (req, res) {
        	user = req.user;     res.send(user);
          });


          /*---------- LOGOUT  --------------*/

        app.get('/logout', function(req, res, sess) {
              req.logout();     sess.destroy;
              console.log("THIS IS THE USER STUFF"  + sess.data);
              var data;         res.send(data)
          });







    //curl -X POST  http://localhost:3000/stuff
    app.post('/stuff', function (req, res, next) {
      console.log("Worked!");

    });

    /*---------- CHECKLINEADMIN --------------*/

    app.post('/checkLineAdmin', function (req, res, next) {
      var bob = req.body.store;    var bob2 = req.body.Adminpassword;
      console.log("Store: "+ bob);  console.log("Admin: "+ bob2);

      if(bob2 !== undefined) {

         Store.find( {store: req.body.store, Adminpassword: req.body.Adminpassword})
          .exec(function(err, posts) {
            if (err) { return next(err); }
          res.send(posts);  console.log(posts);
      //Either passes no data back: store that doesn't have Adminpassword or passes store with Adminpassword
    });
      } else{
        console.log("Adminpassword was equal to undefined so query did not run!");
      }
    });


    /*---------- ADDSTORE FUNCTION: --------------*/
    app.post('/getLineCoordinates', function (req, res, next) {
      Store.find( {store: req.body.store})
        .exec(function(err, posts) {
          if (err) { return next(err); }
        res.send(posts);  console.log(posts );
        });
    });

    /*---------- PEOPLELINE INFO  --------------*/
    //curl -X POST localhost:3000/peoplelineInfo

    app.post('/peoplelineInfo', function (req, res, next) {
      var newUser2 = PeopleLine({
        email : req.body.email, line: req.body.line,
        position: req.body.position,  store: req.body.store,
        fullname : req.body.fullName,  longitude: req.body.longitude,
        latitude: req.body.latitude,  distance: req.body.distance
      });

      newUser2.save(function (err, post) {
        if (err) {return next(err); }
        res.send(post);     console.log(post);
      });
    });


    /*---------- DELETE PEOPLE  --------------*/
    //curl -X POST  http://localhost:3000/deletePeopleLine44

    app.post('/deletePeopleLine44', function (req, res, next) {
      PeopleLine.remove({line: req.body.line}, function(err,removed) {
        PeopleLine.find({store: req.body.store}, {line: req.body.line}).exec(function(err, posts) {
        if (err) { return next(err); }
        res.send(posts);    console.log(posts);
      });
      });
    });

    app.post('/deletePeop', function (req, res, next) {
      PeopleLine.remove({store: req.body.store, line: req.body.line, email: req.body.email}, function(err,removed) {
        PeopleLine.find({store: req.body.store, line: req.body.line}).exec(function(err, posts) {
        if (err) { return next(err); }
        res.send(posts);    console.log(posts);
      });
        });
    });

 Date.prototype.addMinutes = function(minutes) {
     var copiedDate = new Date(this.getTime());
     return new Date(copiedDate.getTime() + minutes * 60000);
 };

 Date.prototype.addSeconds = function(seconds) {
     var copiedDate = new Date(this.getTime());
     return new Date(copiedDate.getTime() + seconds * 1000);
 };

 Date.prototype.addmSeconds = function(mseconds) {
     var copiedDate = new Date(this.getTime());
     return new Date(copiedDate.getTime() + mseconds * 100);
 };


 var now = new Date();
 console.log(""+now);
 console.log( "THIS IS DATE OBJECT:" + now.addMinutes(1));

 var now = new Date();
 console.log(""+now);
 console.log( "THIS IS DATE OBJECT:" + now.addSeconds(1));

/*
 var d = new Date();
 var n = d.getTime() ;
 var n1 = d.getTime() + 2 * 60000;
console.log(n);
console.log(n1);

var d = new Date();
console.log(d);

d.setMilliseconds(192);
var n = d
console.log(n);
*/
var d = new Date();
console.log(d);

d.setMilliseconds(192);
var n = d
console.log(n);


    app.post('/optimizeData2', function (req, res, next) {
      PeopleLine.find({ $and: [{store: req.body.store}, {line: req.body.line}, {email: req.body.email}]})
        .exec(function(err, posts) {
            if (err) { return next(err) }
          //callback(posts);
          console.log(posts);
          })
    });

    // curl -X POST -H 'Content-Type: application/json' -d '{"store":"bobby", "line":"2", "email":"jlatouf2@gmail.com"}' http://localhost:3000/optimizeData23

    // curl -X POST -H 'Content-Type: application/json' -d '{"number":"2"}' http://localhost:3000/addPerson2

    //curl -X POST  http://localhost:3000/optimizeData23


        /*   THIS   */

    app.post('/optimizeData23', function (req, res, next) {
      PeopleLine.update({ $and: [{store: req.body.store}, {line: req.body.line}, {email: req.body.email}]},
        {email:'jlatouf3@gmail.com'})
        .exec(function(err, posts) {
            if (err) { return next(err) }
          //callback(posts);
          console.log(posts);
          })
    });


    /*---------- CHECKPEOPLE FUNCTION: --------------*/
      app.post('/checkPeopleAdmin', function (req, res, next) {
        var bob = req.body.store; var bob2 = req.body.Adminpassword;
        console.log("Store: "+ bob);  console.log("Admin: "+ bob2);

        if(bob2 !== undefined) {
          Store.find( {store: req.body.store, Adminpassword: req.body.Adminpassword})
            .exec(function(err, posts) {
              if (err) { return next(err) }

          res.send(posts);  console.log(posts);
            })
        } else{
          console.log("Adminpassword was equal to undefined so query did not run!");
        }
      })



      app.post('/stuffwhite3', function (req, res) {
          console.log('worked');
          res.send('posts');
      });

            //validation:

        app.post('/stuffwhite', function (req, res) {


        req.assert('name', 'Name is required').notEmpty().trim().withMessage('must be an name');
         //Validate name
        req.assert('email', 'A valid email is required').trim().isEmail();
        req.assert('password', 'Password must be at least 4 characters long').len(4);
        var errors = req.validationErrors();
        //if (errors) return res.send(errors);
        if (errors) return res.status(400).send(errors);

        console.log('black');
        console.log(req.body.email);

        });
        console.log(/'\d+'/.test("'123'"));


/*
// Every sanitizer method in the validator lib is available as well!
.trim()
.normalizeEmail()

HAVE TO ADD A RANKING ELEMENT TO DB, [CALLED COORDINATE POSITION]
1)check people who are already in line time data
2)compare your created at times, and see if they are within 5 minutes of each other.
3)if true( time within 5 min) : then you compare coordinate distances, [which are already in db],
and the highest distance [furthest away person] is last in line
4)if false( time higher than 5 min) : then just add up all people and put yourself last.
*/

//curl -X POST -H 'Content-Type: application/json' -d '{"email":"davidwalshr44","password":"fsomethingt"}' http://localhost:3000/stuffwhite
//curl -X POST -H 'Content-Type: application/json' -d '{"email":"davidwalshr@black.com"}' http://localhost:3000/stuffwhite2

        app.post('/stuffwhite2', function (req, res) {
        //  req.assert('email', 'A valid email is required').trim();
          req.assert('email', 'A valid email is required').isEmail();

          var errors = req.validationErrors();
          if (errors) return res.status(400).send(errors);

          console.log('black');
          console.log(req.body.email);
          });



    app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname,  'www'));
    });

    app.set('port', (process.env.PORT || 3000));

    /*
    app.listen(app.get('port'), function () {
      console.log('Example app listening on port 3000!');
    });
    */

    http.listen(app.get('port'), function () {
      console.log('Example app listening on port 3000!');
    });
