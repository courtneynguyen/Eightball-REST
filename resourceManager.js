var config = require('./config.js'), 
<<<<<<< HEAD
		mongoose = require('mongoose');

mongoose.connect('mongodb://'+config.hostname+config.db);
			var resources = {};						

module.exports = function(){
				
=======
		mongoose = require('mongoose'),
		Products = require('./models/product.js');

mongoose.connect('mongodb://'+config.hostname+config.db);
									

module.exports = function(){
				var resources = {};
>>>>>>> 8193b2ab5fe74d959b24f25d8054f98a174844b9

				return{

								addResource: function(name,resource){
												resources[name] = resource;
								},
								models: resources
				}

}
