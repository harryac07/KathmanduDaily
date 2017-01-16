angular
	.module('KD', ['ngRoute', 'ngSanitize', 'angularMoment', 'ui.bootstrap'])
	.config(['$routeProvider', config]); // routes for controller

function config($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'posts/home.html',
			controller: 'homeCtrl'

		})
		.when('/post/:postid', {
			templateUrl: 'singlePost/singlePost.html',
			controller: 'singlePostCtrl'
		})
		.when('/register', {
			templateUrl: 'register/register.html',
			controller: 'registerCtrl'
		})
		.when('/login', {
			templateUrl: 'login/login.html',
			controller: 'loginCtrl'
		})
		.otherwise({
			redirectTo: '/'
		})
}