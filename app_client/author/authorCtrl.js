angular
	.module('KD')
	.controller('authorCtrl', authorCtrl);


function authorCtrl($scope, $routeParams, $location, $anchorScroll, $window, auth, mainService) { // service as parameter
	$window.scrollTo(0, 0); // for page load from top only 

	/* Socket starts here */
	var socket = io('http://kathmandudaily.herokuapp.com');

	/* When new client connects*/
	socket.on('welcome', function(data) {
		console.log(data);
	});

	$scope.isLoggedIn = auth.isLoggedIn(); // checking login status

	$scope.currentUser = auth.currentUser(); // current loggedin user

	/* when bottom of the posts by author */
	$scope.goToTop = function() {
		// the element you wish to scroll to.
		$location.hash('posts-div');
		// call $anchorScroll()
		$anchorScroll();
	};
	var authorId = $routeParams.authorid;
	/* get post by authors */
	mainService
		.postByAuthor(authorId).success(function(data) {


			$scope.posts = data;
			/* trim content and display */
			$scope.trimContent = function(string) {

				for (var i = 0; i < string.length; i++) {
					if (string.length > 200) {
						string = string.substr(0, 100) + ' .........'; // Trim String and make upto 250 characters
					}
				}
				return string;
			};

			/* total posts by author */
			$scope.totalPosts = data.length;

		})
		.error(function(err) {
			console.log(err);
		});

	/* get user details by userid */

	mainService
		.userById(authorId).success(function(data) {
			$scope.user = data;

			$scope.author = {}; // initialize the user object 
			if (data) {

				if (data.facebook) { // check if account is facebook or local
					$scope.author = data.facebook;
					if ($scope.author.about) {
						$scope.authorDetail = $scope.author.about.replace(/\r?\n/g, '<br />');
					}

				} else {
					$scope.author = data.local;
					if ($scope.author.about) {
						$scope.authorDetail = $scope.author.about.replace(/\r?\n/g, '<br />');
					}

				}

			}



			/*handling for smaller devices */
			$(document).ready(function() {
				/* make content editavble if user is logged in */
				if ($scope.isLoggedIn && $scope.currentUser.name.toLowerCase() === $scope.author.name.toLowerCase()) {

					$scope.startEdit = true;
					/* update about(details) of user */
					$scope.aboutVal = $("#about-text").text().replace(/\n\r?/g, '<br />');

					$scope.detail = {
						about: $scope.aboutVal
					};


					$scope.updateDetail = function() {
						if (!$scope.detail.about) {
							return; // do nothing
						}
						mainService
							.userUpdateAbout(authorId, $scope.detail).success(function() {
								//making live edit and post to view 
								socket.emit('message', $scope.detail.about);
							})
							.error(function(err) {
								console.log(err);
							}).then(function() {
								console.log($scope.detail);
								socket.on('message', function(msg) {
									$scope.authorDetail = msg.message.replace(/\r?\n/g, '<br />');
									// $('#about-text').html("<pre>"+msg.message+"<pre>");
								});
							});
					};

					//when edit button or save is clicked
					$('.edit-about').click(function(event) {
						event.preventDefault();
						$('#about p').attr('contenteditable', 'true');
						$scope.editing = true;
					});
					$('#edit-about-save').click(function(even) {
						$scope.editing = false;
						$('#about p').attr('contenteditable', 'false');
					});
					//when reset button is clicked
					$('#reset').click(function(event) {
						event.preventDefault();
						$('#about p').attr('contenteditable', 'false');
						$scope.editing = false;
					});

				} else {
					$scope.startEdit = false;
				}
				$(window).on('resize load onbeforeunload', function() {
					var width = $(window).width();

					/* for smaller devices : iphone 6 s plus */
					if (width < 450) {
						$("#social-buttons a").removeClass('btn-md');
						$("#social-buttons a").addClass('btn-xs');
					} else {
						$("#social-buttons a").removeClass('btn-xs');
						$("#social-buttons a").addClass('btn-md');
					}
				});

			});
		})
		.error(function(err) {
			console.log(err);
		});


}