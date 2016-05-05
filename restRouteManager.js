var express = require('express');
var mongoose = require('mongoose');
var Response = require('./models/response.js');
var History = require('./models/history.js');
// var auth = require('./auth.js');
var auth = function(req, res, next){ if (!req.isAuthenticated()) res.send(401); else next(); };
function handleError(err){

};

module.exports = function(resourceManager){

  return{
    addRouter: function(name){

      var router = express.Router();
      router.get('/api/responses/random', function(req, res){
        Response.random(function(err, resp){
          res.json(resp);
        });
      });
      router.all('/api/*',function(req,res,next){
        if(req.isAuthenticated()){
          next();
        }else{

          console.log('req.url:',req.url);
          if(req.url.indexOf('random') > -1){
            console.log('inside indexOf');
            console.log(res);
            next(res);
          }
          else{
            res.send('401');
          }
          //	next(new Error(401)); // 401 Not Authorized
        }
      });
      router.get('/api/histories/count', function(req, res){
        History.aggregate(
          { $group:
            { _id: '$response', total_response: { $sum: 1 } }
          },
          function (err, resp) {
            if (err) return handleError(err);
            res.json(resp);
          }
        );
      });
      router.get('/api/'+name+'/:id', auth, function(req, res){
        var id = req.params.id;
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
        console.log('what is req?');
        console.log(req);
        if(req.query && req.query.user){
          console.log(req.query);
          resourceManager.models[name].find({userId:req.query.user}, function(err, obj){
            console.log('MADE IT INTO FINDDDD!',name);
            console.log(err);
            console.log('obj:');
            console.log(obj);

            res.json(obj);
          });

        }
        else{
          resourceManager.models[name].find({}, function(err, obj){

            if(err) res.status(500).send("test");
            res.json(obj);
          });
        }
      });

      router.post('/api/'+name, function(req, res){
        console.log('what is name?', name);
        console.log(resourceManager);
        console.log(resourceManager.models[name]);
        resourceManager.models[name].create(req.body, function(err, obj){

          if(err) res.status(500).send(err);
          res.json(obj);
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
