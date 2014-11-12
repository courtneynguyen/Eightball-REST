var config = require('./config.js');

var express = require('express');
var products = require('./models/product.js');
var app = express();
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
//mongoose.connect('mongodb://localhost/crud');

var resourceManager = require('./resourceManager.js')();
resourceManager.addResource('products', products);
var viewRouter = require('./viewRouter.js')(resourceManager);
var restRouter = require('./restRouteManager.js')(resourceManager);

var crudProduct = restRouter.addRouter('products', products);
app.use(viewRouter);
app.use(crudProduct);
app.listen(3080);


