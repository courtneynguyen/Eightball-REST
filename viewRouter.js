var express = require('express');
var manager;
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
require('./config/passport')(passport);

//var authorization = require('./packages/authorization/userAuth.js');
function handleError(err){

};

var router = express.Router();

router.get('/', function(req, res){
  res.render('layout', {body: 'testing'});
});

router.post('/register', passport.authenticate('local', {
  failureRedirect : '/#/register'
}), function(req, res){
  var user = req.user;
  req.login(user, function(err){
    if(err){
      console.log(err);
      return next(err);
    }
    return res.redirect('/#/');
  });
});

router.post('/login', passport.authenticate('local-login', {
  failureRedirect : '/#/login'
}), function(req, res){
  var user = req.user;
  //res.send(req.user);
  req.login(user, function(err){
    if(err){
      console.log('error:');
      console.log(err);
      // return next(err);
    }
    res.json({sessionID: req.sessionID, user:user});

    // res.redirect('/#/home');
  });
});

router.get('/loggedin', function(req, res){
  res.send(req.isAuthenticated() ? req.user : '0');
});

router.post('/logout', function(req, res){
  console.log('LOGGING OUTTTTTTTTT');
  req.logOut();

  res.redirect('/#/');
});

module.exports = function(resourceManager, app){
  app.use(session({secret: 'whateverisclevermate'}));
  app.use(passport.initialize());
  app.use(passport.session());
  manager = resourceManager;
  return router;

};
