var config = require('./config.js'), 
		mongoose = require('mongoose'),
		Products = require('./models/product.js');

mongoose.connect('mongodb://'+config.hostname+config.db);
									

module.exports = function(){
				var resources = {};

				return{

								addResource: function(name,resource){
												resources[name] = resource;
								},
								models: resources
				}

}
