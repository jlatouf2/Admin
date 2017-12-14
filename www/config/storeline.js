// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Storeline = new Schema({
  email: String,
	post_id: String,
	line: String,
	store: String,
  Adminpassword: String,
  lineAdmin: String

});

module.exports = mongoose.model('storeline', Storeline);
