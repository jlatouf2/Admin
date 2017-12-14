// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Store = new Schema({
  email : String,
	post_id: String,
	longitude: String,
	latitude: String,
	postal: String,
	store: String,
  storeAdmin:{
    type: String
  },
  Adminpassword: String,

});

module.exports = mongoose.model('Storelocation', Store);
