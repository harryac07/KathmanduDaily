var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
/* for nodemoailer login confirmation */
var nodemailer = require('nodemailer');

var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

/* register */
module.exports.register = function(req, res) {
	if (!req.body.name || !req.body.email || !req.body.password) {
		sendJSONresponse(res, 40, {
			"message": "All fields required"
		});
		return;
	}
	var user = new User(); // create a new user instances
	user.name = req.body.name;
	user.email = req.body.email;
	if (req.body.email === 'harry_ac07@yahoo.com') {
		user.admin = true;
	}
	user.setPassword(req.body.password); // use setPassword method to set salt and hash

	user.save(function(err, user) {
		var token;
		if (err) {
			sendJSONresponse(res, 400, err);
			return;
		} else {
			token = user.generateJwt(); // Generate JWT using schema method and send it to browser

			sendJSONresponse(res, 200, {
				"token": token
			});
		}
	});
};

/* subscription form handling */
module.exports.subscribe = function(req, res) {
	if (!req.body.email) {
		sendJSONresponse(res, 404, {
			"message": "valid email is required"
		});
		return;
	}
	User.findOne({email:req.body.email})
	.exec(function(err,user){
		if(err){
			sendJSONresponse(res,400,err);
			return;
		}else if(!user){
			sendJSONresponse(res,404,{
				"message":"user not found"
			});
			return;
		}else{
			user.subscription=true;
			user.save(function(err,user){
				if(err){
					sendJSONresponse(res,400,err);
				}else{
					sendJSONresponse(res,200,user);
				}
			});
		}
	});

};

/* Login */
module.exports.login = function(req, res) {
	if (!req.body.email || !req.body.password) {
		sendJSONresponse(res, 400, {
			"message": "All fields Required."
		});
		return;
	}

	passport.authenticate('local', function(err, user, info) {
		var token;
		if (err) {
			sendJSONresponse(res, 400, err);
			return;
		}

		if (user) {
			token = user.generateJwt();
			sendJSONresponse(res, 200, {
				"token": token
			});
		} else {
			sendJSONresponse(res, 401, info);
		}

	})(req, res); // make sure that req, res are available to the passport

};