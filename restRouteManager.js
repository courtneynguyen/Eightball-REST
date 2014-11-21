var express = require('express');
var mongoose = require('mongoose');
var Response = require('./models/response.js');
// var auth = require('./auth.js');
var auth = function(req, res, next){ if (!req.isAuthenticated()) res.send(401); else next(); }; 
function handleError(err){

};

module.exports = function(resourceManager){

				return{
					addRouter: function(name){

									var router = express.Router();


								router.get('/api/'+name+'/:id', auth, function(req, res){
													var id = req.params.id;
													console.log('what is id?',id);
													console.log('name',name);
												resourceManager.models[name].findOne({_id: mongoose.Types.ObjectId(id)}, function(err, obj){

													if(err) console.log(err);
													res.json(obj);
												//	res.redirect('/#/'+name);				
												});
								});
									router.delete('/api/'+name+'/:id', auth, function(req, res){
													var id = req.params.id;
												resourceManager.models[name].remove({_id: mongoose.Types.ObjectId(id)}, function(err, obj){

													if(err) console.log(err);
													res.json(obj);
													//res.redirect('/#/'+name+'/'+id);				
												});
								});
									router.get('/api/'+name, function(req, res){
												resourceManager.models[name].find({}, function(err, obj){
																
																if(err) res.status(500).send("test");
																console.log(obj);
																res.json(obj);															
															//	res.send(obj);
																
												});	
									});
									router.get('/api/responses/random', function(req, res){
										Response.random(function(err, resp){
											res.json(resp);				
										});
									});
								router.post('/api/'+name, function(req, res){
												resourceManager.models[name].create(req.body, function(err, obj){
																
																if(err) res.status(500).send(err);
																res.json(obj);
															//	res.redirect('../products');															
															//	res.send(obj);
																
												});	
									});	
									router.put('/api/'+name+'/:id', auth, function(req, res){
													var id = req.params.id;
													console.log('what is id?',id);
												resourceManager.models[name].findOne({_id: mongoose.Types.ObjectId(id)}, function(err, obj){
									
																if(err) res.status(500).send(err);
															if(name === "responses"){
																obj.question = req.body.question || obj.question;
																obj.save();	
															//	res.json(obj);	
															}
															else if(name === "users"){

															obj.password = req.body.password;
															obj.save({_id: mongoose.Types.ObjectId(id)}, obj,function(err, user){
																if(err){
																				console.log(err);

																				
																}
																else console.log(user);				
															});
															}														
															res.json(obj);
																
												});	
									});
								
									return router;
					}
				}
};