var config = require('./config.js');

var express = require('express');
//var products = require('./models/product.js');
var users = require('./models/user.js');
var responses = require('./models/response.js');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(cookieParser());

//mongoose.connect('mongodb://localhost/crud');

var resourceManager = require('./resourceManager.js')();
//resourceManager.addResource('products', products);
resourceManager.addResource('users', users);
resourceManager.addResource('responses', responses);
var viewRouter = require('./viewRouter.js')(resourceManager, app);
var restRouter = require('./restRouteManager.js')(resourceManager);

//var crudProduct = restRouter.addRouter('products');
var responseRouter = restRouter.addRouter('responses', responses);
var userRouter = restRouter.addRouter('users', users);
//app.use(crudProduct);
app.use(userRouter);
app.use(responseRouter);
app.use(viewRouter);

app.listen(3080);


