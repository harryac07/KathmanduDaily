angular
	.module('KD', ['ngRoute', 'ngSanitize','angularMoment'])
	.config(['$routeProvider', config]); // routes for controller

function config($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'posts/home.html',
			controller: 'homeCtrl'

		}).
	when('/post/:postid', {
			templateUrl: 'singlePost/singlePost.html',
			controller: 'singlePostCtrl'
		})
		.otherwise({
			redirectTo: '/'
		})
}