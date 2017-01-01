var mongoose = require('mongoose');
var product = require('./posts');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

// create a schema
var userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	admin: {
		type: Boolean,
		default: false
	},
	subscription:{
		type:Boolean,
		default:true
	},
	hash: String,
	salt: String
});

userSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex'); // creating a random string for salt
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex'); // create encryted hash
};

userSchema.methods.validPassword = function(password) { // validating submitted password
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return this.hash === hash;
};
userSchema.methods.generateJwt = function() {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7); // create expiry date obj and set expiry for 7 days

	return jwt.sign({
		_id: this._id,
		email: this.email,
		name: this.name,
		admin: this.admin,
		subscription:this.subscription,
		exp: parseInt(expiry.getTime() / 1000)
	}, process.env.JWT_SECRET);
};


// we need to create a model using it
module.exports = mongoose.model('User', userSchema);