angular
	.module('KD')
	.controller('singlePostCtrl', singlePostCtrl);



function singlePostCtrl($scope, $rootScope, $routeParams, $location, $window, mainService) { // service as parameter
	$window.scrollTo(0, 0); // for page load from top only 

	$scope.go_back = function() { // for back to previous page
		$window.history.back();
	};

	// /*String replace */
	// $scope.stringReplace = function(str) {
	// 	str=str.replace(new RegExp('\r?\n','g'), '<br />');
	// 	console.log(str);
	// 	return str;
	// };

	mainService.postById($routeParams.postid)
		.success(function(data) {
			$scope.post = data;

			$scope.author=""; // author name for post.
			if(data.author[0].facebook){
				$scope.author=data.author[0].facebook.name;
			}else{
				$scope.author=data.author[0].local.name;
			}
			$scope.content = data.content.replace(/\r?\n/g, '<br />');

			/* format time createdOn */
			$scope.formatDate = moment(data.createdOn).format('YYYY-MM-DD , hh:mm a');
		})
		.error(function(err) {
			console.log(err);
		});

	$scope.comments = {
		name: "",
		email: "",
		comment: ""
	};
	$scope.onSubmit = function() {
		$scope.formError = "";
		if (!$scope.comments.name || !$scope.comments.email || !$scope.comments.comment) {
			$scope.formError = "All fields required. Try again!";
			return false;
		} else {
			/* Auth called*/

			mainService
				.postComment($routeParams.postid, $scope.comments)
				.success(function() {
					console.log('success posting comment');
					$window.location.reload();
				})
				.error(function(err) {
					$scope.formError = 'Please enter valid email or password.';
				});
			return false; // prevent from submission and reload
		}
	};



}

/* load page from top on next page click */