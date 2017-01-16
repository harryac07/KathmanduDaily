var mongoose = require('mongoose');
var product = require('./posts');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

// create a schema
var userSchema = new mongoose.Schema({
	local: {
		name: {
			type: String
		},
		email: {
			type: String,

		},
		photo:String,
		address: {
			type: String,
		},
		about: {
			type: String,
		},
		admin: {
			type: Boolean
		},
		subscription: {
			type: Boolean
		},
		hash: String,
		salt: String
	},
	facebook: {
		name: String,
		email: {
			type: String
		},
		photo:String,
		address: {
			type: String,
		},
		about: {
			type: String,
		},
		admin: {
			type: Boolean
		},
		subscription: {
			type: Boolean
		}

	}
});

userSchema.methods.setPassword = function(password) {
	this.local.salt = crypto.randomBytes(16).toString('hex'); // creating a random string for salt
	this.local.hash = crypto.pbkdf2Sync(password, this.local.salt, 1000, 64).toString('hex'); // create encryted hash
};

userSchema.methods.validPassword = function(password) { // validating submitted password
	var hash = crypto.pbkdf2Sync(password, this.local.salt, 1000, 64).toString('hex');
	return this.local.hash === hash;
};

/*JWT handling for email login */
userSchema.methods.generateJwt = function() {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7); // create expiry date obj and set expiry for 7 days

	return jwt.sign({
		_id: this._id,
		email: this.local.email,
		name: this.local.name,
		photo:this.local.photo,
		admin: this.local.admin,
		address: this.local.address,
		about: this.local.about,
		exp: parseInt(expiry.getTime() / 1000)
	}, process.env.JWT_SECRET);
};

/*JWT handling for facebook login */
userSchema.methods.generateFacebookJwt = function() {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7); // create expiry date obj and set expiry for 7 days

	return jwt.sign({
		_id: this._id,
		email: this.facebook.email,
		name: this.facebook.name,
		photo:this.facebook.photo,
		admin: this.facebook.admin,
		address: this.facebook.address,
		about: this.facebook.about,
		exp: parseInt(expiry.getTime() / 1000)
	}, process.env.JWT_SECRET);
};


// we need to create a model using it
module.exports = mongoose.model('User', userSchema);