var mongoose = require('mongoose'),
		Schema = mongoose.Schema();


var historySchema = new Schema({
				userId: {
					type: Schema.ObjectId,
					ref: 'User'
				},
				responseId: {
					type: Schema.ObjectId,
					ref: 'Response'
				},
				question: {
					type: String
				},
				created: {
        type: Date,
        default: Date.now
    		}		
});

mongoose.model('History', historySchema, 'histories');
