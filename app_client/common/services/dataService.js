angular
	.module('KD')
	.service('mainService', mainService);


function mainService($http) {
	var postList = function() {
		return $http.get('/api/posts');
	};

	var postById = function(postid) {
		return $http.get('/api/post/' + postid);
	};

	return {
		postList: postList,
		postById: postById
	};
}