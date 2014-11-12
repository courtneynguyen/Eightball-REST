var express = require('express');
var mongoose = require('mongoose');

function handleError(err){

};

module.exports = function(resourceManager){

				return{
					addRouter: function(name){

									var router = express.Router();

									router.post('/'+name, function(req, res){
												resourceManager.models[name].create(req.body, function(err, obj){
																
																if(err) res.status(500).send(err);
																res.redirect('../products');															
															//	res.send(obj);
																
												});	
									});
									router.get('/'+name, function(req, res){
												resourceManager.models[name].find({}, function(err, obj){
																
																if(err) res.status(500).send(err);
																res.send({status:'200', products:obj});															
															//	res.send(obj);
																
												});	
									});
									router.post('/'+name+'/:id/edit', function(req, res){
													var id = req.params.id;
												resourceManager.models[name].findOne({_id: mongoose.Types.ObjectId(id)}, function(err, obj){
									
																if(err) res.status(500).send(err);

																console.log(obj);
																obj.name = req.body.name || obj.name;
																obj.description = req.body.description || obj.description;
																obj.price = req.body.price || obj.price;
																obj.active = req.body.active || obj.active;
																obj.save();	
																res.redirect('/admin/products');															
															//	res.send(obj);
																
												});	
									});
								router.get('/'+name+'/:id/', function(req, res){
													var id = req.params.id;
												resourceManager.models[name].remove({_id: mongoose.Types.ObjectId(id)}, function(err, obj){

													if(err) console.log(err);
													res.redirect('/admin/products');				
												});
								});
									return router;
					}
				}
};
