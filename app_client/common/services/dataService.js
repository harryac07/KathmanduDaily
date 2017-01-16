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
	var postComment = function(postid, data) {
		return $http.post('/api/post/' + postid + '/comment', data);
	};
	var subscribe = function(email) {
		return $http.post('/api/subscribe', email);
	};
	var postByAuthor = function(authorId) {
		return $http.get('/api/post/author/' + authorId);
	};
	var userById = function(userid) {
		return $http.get('/api/user/' + userid);
	};
	var userUpdateAbout = function(userid,data) {
		return $http.post('/api/user/updateabout/'+userid, data);
	};

	return {
		postList: postList,
		postById: postById,
		postSearch: postSearch,
		postComment: postComment,
		subscribe: subscribe,
		postByAuthor: postByAuthor,
		userById: userById,
		userUpdateAbout: userUpdateAbout
	};
}