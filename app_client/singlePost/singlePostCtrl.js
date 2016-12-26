angular
	.module('KD')
	.controller('singlePostCtrl', singlePostCtrl);



function singlePostCtrl($scope,$routeParams, $location, mainService) { // service as parameter
	$scope.title = "";

	mainService.postById($routeParams.postid)
		.success(function(data) {
			$scope.post=data;
		})
		.error(function(err) {
			console.log(err);
		});


}