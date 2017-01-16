angular
	.module('KD')
	.service('auth', auth);


function auth($http, $window, $location) {

	var saveToken = function(token) {
		$window.localStorage['user-token'] = token;
	};
	var getToken = function() {
		return $window.localStorage['user-token'];
	};
	var isLoggedIn = function() {
		var token = getToken();

		if (token) {
			var payload = JSON.parse($window.atob(token.split('.')[1]));

			return payload.exp > Date.now() / 1000;
		} else {
			return false;
		}
	};
	var currentUser = function() {
		if (isLoggedIn()) {
			var token = getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return {
				_id:payload._id,
				email: payload.email,
				name: payload.name,
				admin: payload.admin
			};
		}
	};
	var register = function(user) {
		return $http.post('/api/register', user).success(function(data) {
			// saveToken(data.token);
		});
	};

	var login = function(user) {
		return $http.post('/api/login', user).success(function(data) {

			saveToken(data.token);
		});
	};

	var facebookLogin = function(token) {// save the token when logged in with facebook
		saveToken(token);

	};

	var logout = function() {
		$window.localStorage.removeItem('user-token');
	};

	return {
		currentUser: currentUser,
		saveToken: saveToken,
		getToken: getToken,
		isLoggedIn: isLoggedIn,
		register: register,
		login: login,
		facebookLogin: facebookLogin,
		logout: logout
	};

}