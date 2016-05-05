var mongoose = require('mongoose')
Schema = mongoose.Schema;

var responseSchema = new Schema({
  question:{
    type:String,
    required:true
  },
  isDefault:{
    type:Boolean,
    default:false
  }

});

responseSchema.statics.random = function(cb) {
  this.count(function(err, count) {
    if (err) return cb(err);
    var rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(cb);
  }.bind(this));
};

var Response = mongoose.model('Response', responseSchema, 'responses');
module.exports = Response;
