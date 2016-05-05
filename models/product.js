var mongoose = require('mongoose');

function checkPositive(val){
  return val >= 0;
}
var custom = [checkPositive, 'Uh oh, {VALUE} of {PATH} is negative!'];
var productSchema = {
  name:{
    type:String,
    required:true
  },
  description:String,
  price:{
    type:Number,
    validate:custom,
    default:0
  },
  active:{
    type:Boolean,
    default:true
  }
}
var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;
