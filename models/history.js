var mongoose = require('mongoose'),
		Schema = mongoose.Schema;


var historySchema = new Schema({
				userId: {
					type: Schema.ObjectId,
					ref: 'User'
				},
				response: {
					type: String
				},
				question: {
					type: String
				},
				created: {
        type: Date,
        default: Date.now
    		}		
});

var History = mongoose.model('History', historySchema, 'histories');


module.exports = History;
