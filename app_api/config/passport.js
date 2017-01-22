var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
// load the auth variables
var configAuth = require('./auth');

var mongoose = require('mongoose');
var User = mongoose.model('User');

// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session

/* for local passport */
passport.use(new LocalStrategy({
		usernameField: 'email'
	},
	function(username, password, done) {
		User.findOne({
			'local.email': username
		}, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, {
					"message": "Incorrect Username."
				});
			}
			if (!user.validPassword(password)) {
				return done(null, false, {
					"message": "Incorrect Password." + password
				});
			}
			return done(null, user);

		});
	}
));

/* facebook auth */
passport.use(new FacebookStrategy({

		// pull in our app id and secret from our auth.js file
		clientID: configAuth.facebookAuth.clientID,
		clientSecret: configAuth.facebookAuth.clientSecret,
		callbackURL: configAuth.facebookAuth.callbackURL,
		passReqToCallback: true,
		profileFields: ['id', 'name', 'emails', 'photos']

	},
	// facebook will send back the token and profile
	function(req, token, refreshToken, profile, done) {

		User.findOne({
			'facebook.email': profile.emails[0].value
		}, function(err, user) {
			if (err) {
				return done(err);

			}

			if (user) { // if user found, return it
				return done(null, user);
			} else {
				// if there is no user, create them
				var newUser = new User();
				newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
				newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();
				newUser.facebook.photo = profile.photos[0].value;
				console.log(profile.photos[0].value);
				if (profile.emails[0].value = "harryac07@gmail.com") {
					newUser.facebook.admin = true;
				}

				newUser.save(function(err) {
					if (err) {
						return done(err);
					}

					return done(null, newUser);
				});
			}
		});


	}));