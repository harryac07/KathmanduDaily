var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};
/* create a post */
module.exports.postComment = function(req, res) {
	var postId = req.params.postid;
	if (!postId) {
		sendJSONresponse(res, 404, {
			"message": "post id not found."
		});
		return;
	}
	Post.findById(postId)
		.exec(function(err, post) {
			if (!post) {
				sendJSONresponse(res, 404, {
					"message": "Post not found"
				});
				return;
			} else if (err) {
				sendJSONresponse(res, 400, err);
				return;
			} else {
				post.comment.push({ // put new data in subdocument array
					name: req.body.name,
					email: req.body.email,
					comment: req.body.comment

				});
				post.save(function(err, post) {
					if (err) {
						sendJSONresponse(res, 400, err);
						console.log(err);
					} else {
						sendJSONresponse(res, 200, post);
						console.log(post);
					}
				});
			}
		});
};

/*GET all post */
module.exports.getComment = function(req, res) {
	var postId = req.params.postid;
	var commentId = req.params.commentid;
	if (!postId && !commentId) {
		sendJSONresponse(res, 404, {
			"message": "Both post id and comment id are required."
		});
		return;
	}
	Post.findById(postId)
		.exec(function(err, post) {
			if (err) {
				sendJSONresponse(res, 400, err);

			} else if (!post) {
				sendJSONresponse(res, 404, {
					"message": "post not found"
				});
			} else {
				if (post.comment && post.comment.length > 0) { // check if comment is available
					// mongoose subdement.id method for searching matching id
					var comment = post.comment.id(req.params.commentid);
					if (!comment) {
						sendJSONresponse(res, 404, {
							"message": "comment id not found"
						});
					} else {
						response = {
							post: {
								title: post.title,
								id: req.params.postid
							},
							comment: comment
						};
						console.log(response);
						sendJSONresponse(res, 200, response);
					}

				}
			}
		});

};