var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose');
var User = mongoose.model('User');

// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(_id, done) {
	User.findById(_id, function(err, user) {
		done(err, user);
	});
});

/* for local passport */
passport.use(new LocalStrategy({
		usernameField: 'email'
	},
	function(username, password, done) {
		User.findOne({
			email: username
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