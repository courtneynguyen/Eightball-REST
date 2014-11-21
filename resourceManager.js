var config = require('./config.js'), 
		mongoose = require('mongoose');

mongoose.connect('mongodb://'+config.hostname+config.db);
			var resources = {};						

module.exports = function(){
				
				return{

								addResource: function(name,resource){
												resources[name] = resource;
								},
								models: resources
				}

}
