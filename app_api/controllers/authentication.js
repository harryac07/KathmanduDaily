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
	User.findOne({
			'local.email': req.body.email
		})
		.exec(function(err, user) {
			if (err) {
				sendJSONresponse(res, 400, err);
				return;
			} else if (user) {
				console.log('user found');
				sendJSONresponse(res, 401, {
					"message": "User already exists"
				});
				return;
			} else {
				/* if user is not found then register new user */
				console.log('user not found, ready to register');
				var newUser = new User(); // create a new user instances
				newUser.local.name = req.body.name;
				newUser.local.email = req.body.email;
				newUser.local.photo="http://budhubz.com/wp-content/themes/budhubs/images/noavatar.png";
				if (req.body.email === 'harry_ac07@yahoo.com') {
					newUser.local.admin = true;
				}
				newUser.setPassword(req.body.password); // use setPassword method to set salt and hash

				newUser.save(function(err) {
					var token;
					if (err) {
						sendJSONresponse(res, 400, err);
						return;
					} else {
						token = newUser.generateJwt(); // Generate JWT using schema method and send it to browser

						sendJSONresponse(res, 200, {
							"token": token
						});
					}
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
	User.findOne({
			$or: [{
				'local.email': req.body.email
			}, {
				'facebook.email': req.body.email
			}]
		})
		.exec(function(err, user) {
			if (err) {
				sendJSONresponse(res, 400, err);
				return;
			} else if (!user) {
				sendJSONresponse(res, 404, {
					"message": "user not found"
				});
				return;
			} else {
				if (user.local.email === req.body.email) {
					user.local.subscription = true;
				} else if (user.facebook.email === req.body.email) {
					user.facebook.subscription = true;
				} else if (user.facebook.email === req.body.email && user.local.email === req.body.email) {
					user.local.subscription = true;
					user.facebook.subscription = true;
				} else {
					user.local.subscription = false;
					user.facebook.subscription = false;
				}

				user.save(function(err, user) {
					if (err) {
						sendJSONresponse(res, 400, err);
					} else {
						sendJSONresponse(res, 200, user);
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


/* facebook Login */
module.exports.facebookLogin = function(req, res) {

	passport.authenticate('facebook', function(err, user, info) {
		var token;
		if (err) {
			sendJSONresponse(res, 400, err);
			return;
		}

		if (user) {
			token = user.generateFacebookJwt();
			res.redirect('/#/facebook/' + token);
			// console.log(' token: ' + token);
		} else {
			sendJSONresponse(res, 401, info);
		}

	})(req, res); // make sure that req, res are available to the passport

};