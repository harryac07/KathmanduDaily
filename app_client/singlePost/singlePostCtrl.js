angular
	.module('KD')
	.controller('singlePostCtrl', singlePostCtrl);



function singlePostCtrl($scope,$rootScope, $routeParams, $location, $window, mainService) { // service as parameter
	$window.scrollTo(0, 0); // for page load from top only 

	$scope.go_back = function() { // for back to previous page
		$window.history.back();
	};

	mainService.postById($routeParams.postid)
		.success(function(data) {
			$scope.post = data;
			console.log(data);
		})
		.error(function(err) {
			console.log(err);
		});

	/* load page from top on next page click */

    





}