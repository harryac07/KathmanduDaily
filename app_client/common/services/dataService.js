angular
	.module('KD')
	.service('mainService', mainService);


function mainService($http) {
	var postList = function() {
		return $http.get('/api/posts');
	};
	var postSearch = function(searchQuery) {
		return $http.get('/api/posts?search=' + searchQuery);
	};

	var postById = function(postid) {
		return $http.get('/api/post/' + postid);
	};
	var postComment = function(postid,data) {
		return $http.post('/api/post/' + postid + '/comment', data);
	};

	return {
		postList: postList,
		postById: postById,
		postSearch: postSearch,
		postComment: postComment
	};
}