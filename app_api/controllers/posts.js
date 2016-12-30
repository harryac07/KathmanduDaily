// cloudinary
//var cloudinary = require('cloudinary');

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');
var moment = require('moment');
var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};
/* create a post */
module.exports.postCreate = function(req, res) {
	Post.create({
		title: req.body.title,
		image: req.body.image,
		content: req.body.content,
		author: req.params.userid
	}, function(err, post) {
		if (err) {
			sendJSONresponse(res, 400, err);
			return;
		} else {
			sendJSONresponse(res, 201, post);
		}
	});
};

/*GET all post */
module.exports.listPosts = function(req, res) {

	Post.find()
		.populate('author', 'name email')
		.exec(function(err, post) {
			if (!post) {
				sendJSONresponse(res, 404, {
					"message": "Post not found."
				});
				return;
			} else if (err) {
				sendJSONresponse(res, 400, err);
				return;
			} else {
				var query = req.query.search;
				if (query && query.length > 0) {

					var results = [];
					var toSearch = query.toLowerCase();

					for (var i = 0; i < post.length; i++) {
						if(post[i].title.toLowerCase().includes(toSearch) || post[i].content.toLowerCase().includes(toSearch) ){
							results.push(post[i]);
						}
					}
					sendJSONresponse(res, 200, results);
					console.log(results);

				} else {
					sendJSONresponse(res, 200, post);
					console.log(post);
				}

			}
		});

};

/* get specific post with id */
module.exports.readPostOne = function(req, res) {
	var postId = req.params.postid;
	if (!postId) {
		sendJSONresponse(res, 404, {
			"message": "post id required."
		});
		return;
	}

	Post.
	findById(postId)
		.populate('author', 'name email')
		.exec(function(err, post) {
			if (!post) {
				sendJSONresponse(res, 404, {
					"message": "Post not found with that id."
				});
				return;
			} else if (err) {
				sendJSONresponse(res, 400, err);
				return;
			} else {
				sendJSONresponse(res, 200, post);
				console.log(post);
			}
		});
};

module.exports.postUpdateOne = function(req, res) {
	var postId = req.params.postid;
	if (!postId) {
		sendJSONresponse(res, 404, {
			"message": "post id required to delete the post."
		});
		return;
	}

	Post
		.findById(postId)
		.exec(function(err, post) {
			if (!post) {
				sendJSONresponse(res, 404, {
					"message": "post not found with that id."
				});
			} else if (err) {
				sendJSONresponse(res, 400, err);
			}
			post.title = req.body.title,
				post.image = req.body.image,
				post.content = req.body.content,
				post.comment = [{
					name: req.body.name,
					comment: req.body.comment
				}]

			post.save(function(err, post) {
				if (err) {
					sendJSONresponse(res, 400, err);
				} else {
					sendJSONresponse(res, 200, post);
				}
			});
		});
};

/* delete post */
module.exports.postDeleteOne = function(req, res) {
	var postId = req.params.postid;
	if (!postId) {
		sendJSONresponse(res, 404, {
			"message": "post id required to delete the post."
		});
		return;
	}

	Post
		.findByIdAndRemove(postId)
		.exec(function(err, post) {
			if (!post) {
				sendJSONresponse(res, 404, {
					"message": "Post not found with that id"
				});
				return;
			} else if (err) {
				sendJSONresponse(res, 400, err);
				return;
			} else {
				sendJSONresponse(res, 204, null);
			}
		});
};