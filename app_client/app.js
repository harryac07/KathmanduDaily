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
		.when('/author/:authorid', {
			templateUrl: 'author/author.html',
			controller: 'authorCtrl'
		})
		.when('/register', {
			templateUrl: 'register/register.html',
			controller: 'registerCtrl'
		})
		.when('/login', {
			templateUrl: 'login/login.html',
			controller: 'loginCtrl'
		})
		.when('/facebook/:token', {
			templateUrl: 'social/facebook.html',
			controller: 'facebookCtrl'
		})
		.otherwise({
			redirectTo: '/'
		})
}