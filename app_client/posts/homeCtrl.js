angular
	.module('KD')
	.controller('homeCtrl', homeCtrl);



function homeCtrl($scope, $location, mainService) { // service as parameter
	$scope.title = "Welcome to KD";
	/* for pagination */
	$scope.filteredPosts = [], $scope.currentPage = 0, $scope.numPerPage = 4, $scope.maxSize = 5;
	mainService.postList()
		.success(function(data) {

			/////////////////////
			$scope.makeItems = function() {
				$scope.items = [];
				for (i = 0; i < data.length; i++) {
					$scope.items.push(data[i]);
				}
			};
			$scope.makeItems();

			/* Return total number of pages */
			$scope.numberOfPages = function() {
				return Math.ceil($scope.items.length / $scope.numPerPage);
			};
			/* watch the change in current page number */
			$scope.$watch('currentPage', function() {
				var begin = (($scope.currentPage) * $scope.numPerPage);
				$scope.end = begin + $scope.numPerPage;
				$scope.filteredPosts = $scope.items.slice(begin);
			});

			/* format time createdOn */
			$scope.formatDate=function(date){
				return moment(date).format('YYYY-MM-DD , hh:mm a');
			};

		})
		.error(function(err) {
			console.log(err);
		});

	/* Jquery/JS handler for page */

	$(document).ready(function() {
		// When search button is entered
		$('#search').keypress(function(e) {
			var query = $('#search').val();
			if (e.which === 13) {
				/* call api to search the page */
				mainService.postSearch(query)
					.success(function(data) {

						/* if data is avilable */
						if (data.length > 0) {
							/////////////////////
							$scope.makeItems = function() {
								$scope.items = [];
								for (i = 0; i < data.length; i++) {
									$scope.items.push(data[i]);
								}
							};
							$scope.makeItems();
							/* Return total number of pages */
							$scope.numberOfPages = function() {
								return Math.ceil($scope.items.length / $scope.numPerPage);
							};
							/* watch the change in current page number */
							$scope.$watch('currentPage', function() {
								var begin = (($scope.currentPage) * $scope.numPerPage);
								$scope.end = begin + $scope.numPerPage;
								$scope.filteredPosts = $scope.items.slice(begin);
							});

							/* simple jQuery handler for page */
							$scope.DataNotFound = "";
							$("#pager").show();
							$('#posts').show();
							$('#DataNotFound').hide();

						} else { /* if data is not  avilable */

							/* simple jQuery handler for page */
							$scope.DataNotFound = "Post not found.";
							$('#posts').hide();
							$('#DataNotFound').show();
							$('#pager').hide();

						}

						////////////////

					})
					.error(function(err) {
						console.log("error: " + err);
					});
				/* api call ends here */
				$(this).val('');
			} /*.ends search button condition here */

		});

		/* Managing the word in posts in front page view */

		$scope.trimContent = function(string) {

			for (var i = 0; i < string.length; i++) {
				if (string.length > 250) {
					string = string.substr(0, 250) + ' .........'; // Trim String and make upto 250 characters
				}
			}
			return string;
		};

		/* load page from top on next page click */
		$('#pager button').on('click', function() {
			$(window).scrollTop(0);
		});



	});



} /* function ends */