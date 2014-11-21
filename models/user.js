var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var validateUniqueEmail = function(value, callback) {
    var User = mongoose.model('User');
    User.find({email : value}, function(err, user) {
        callback(err || user.length === 0);
    });
};

var userSchema = new Schema({
		email:{
			type:String,
			required:true,
			// match: [/.+\@.+\..+/, 'Please enter a valid email'],
       // validate: [validateUniqueEmail, 'E-mail address is already in-use']
		},
		password:{
			type:String,
			required: true
		}

});

userSchema.methods = {
authenticate: function(plainText) {
        return plainText === this.password;
}
}

var User = mongoose.model('User', userSchema, 'users');
module.exports = User;
