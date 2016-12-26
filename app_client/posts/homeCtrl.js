angular
	.module('KD')
	.controller('homeCtrl', homeCtrl);



function homeCtrl($scope, $location, mainService) { // service as parameter
	$scope.title = "Welcome to KD";

	mainService.postList()
		.success(function(data) {
			$scope.posts=data;
		})
		.error(function(err) {
			console.log(err);
		});


}