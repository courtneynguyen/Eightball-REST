var express = require('express');
var manager;
var mongoose = require('mongoose');
function handleError(err){

};

var router = express.Router();

router.get('/', function(req, res){
	res.render('layout', {body: 'testing'});
});

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
	manager = resourceManager;
	return router;
	
};
