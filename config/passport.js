var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-login', new LocalStrategy(
    {
      usernameField : 'email',
      passwordField : 'password'
    },
    function(email, password, done) {
      User.findOne({
        email: email
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: 'Unknown user'
          });
        }
        if (!user.authenticate(password)) {
          return done(null, false, {
            message: 'Invalid password'
          });
        }

        console.log(err);
        return done(err, user);
      });

    }));

    passport.use('local', new LocalStrategy(
      {
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
      },
      function(req, email, password, done) {


        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
          console.log('GET HERE');
          // find a user whose email is the same as the forms email
          // we are checking to see if the user trying to login already exists
          User.findOne({ 'email' :  email }, function(err, user) {
            console.log('INSIDE FIND');
            if (user)	console.log(user);
            else console.log(err);
            // if there are any errors, return the error
            if (err)
            return done(err);

            // check to see if theres already a user with that email
            if (user) {
              return done(err, false);
            } else {

              console.log('CREATING USER');
              // if there is no user with that email
              // create the user
              var newUser            = new User();

              // set the user's local credentials
              newUser.email    = email;
              newUser.password = password;

              // save the user
              newUser.save(function(err) {
                if (err)
                throw err;
                return done(err, newUser);
              });
            }

          }
        );
      });
    }
  ));
}
