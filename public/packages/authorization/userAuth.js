'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * Auth callback
 */
module.exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * Show login form
 */
module.exports.signin = function(req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.redirect('#!/login');
};

/**
 * Logout
 */
module.exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
module.exports.session = function(req, res) {
    res.redirect('/');
};

/**
 * Create user
 */
module.exports.create = function(req, res, next) {
//    console.log(req.body);
    var user = new User(req.body);

    user.provider = 'local';

    // because we set our user.provider to local our models/user.js validation will always be true
    req.assert('email', 'You must enter a valid email address').isEmail();
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }

    // Hard coded for now. Will address this with the user permissions system in v0.3.5
    user.roles = ['authenticated'];
    user.save(function(err) {
        if (err) {

            return res.send({status:400, msg:err});
        }
        res.status(200);
    });
};
/**
 * Send User
 */
module.exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
module.exports.user = function(req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};
