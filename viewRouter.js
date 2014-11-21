var express = require('express');
var manager;
var mongoose = require('mongoose');
<<<<<<< HEAD
var passport = require('passport');
var session = require('express-session');
require('./config/passport')(passport);

//var authorization = require('./packages/authorization/userAuth.js');
=======
>>>>>>> 8193b2ab5fe74d959b24f25d8054f98a174844b9
function handleError(err){

};

var router = express.Router();

router.get('/', function(req, res){
	res.render('layout', {body: 'testing'});
});

<<<<<<< HEAD
router.post('/register', passport.authenticate('local', {
		failureRedirect : '/#/register'
}), function(req, res){
	var user = req.user;
	req.login(user, function(err){
			if(err){
				console.log(err);
				return next(err);
			}				
			return res.redirect('/#/home');
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
	req.logOut();
	res.redirect('/#/');	
});

module.exports = function(resourceManager, app){
	app.use(session({secret: 'whateverisclevermate'}));
	app.use(passport.initialize());
	app.use(passport.session());
=======
router.get('/admin/products', function(req, res){
	var prods = manager.models['products'].find({}, function(err, products){
			res.render('view', {products: products});	
	});
	});
router.get('/admin/products/:id', function(req, res){
				var id = req.params.id;
				console.log(id);
	var prods = manager.models['products'].findOne({_id: mongoose.Types.ObjectId(id)}, function(err, product){
			res.render('viewOne', {product: product});	
	});
	});
router.get('/admin/products/:id/edit', function(req, res){
				var id = req.params.id;
				console.log(id);
	var prods = manager.models['products'].findOne({_id: mongoose.Types.ObjectId(id)}, function(err, product){
			res.render('editOne', {product: product});	
	});
	});
module.exports = function(resourceManager){
>>>>>>> 8193b2ab5fe74d959b24f25d8054f98a174844b9
	manager = resourceManager;
	return router;
	
};
