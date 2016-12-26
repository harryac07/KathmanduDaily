angular.module('KD', ['ngRoute']); // routes for controller

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

angular
	.module('KD')
	.config(['$routeProvider', config]);