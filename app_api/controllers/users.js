// cloudinary
//var cloudinary = require('cloudinary');

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};
/* create users */
module.exports.userCreate = function(req, res) {
	User.create({
		name: req.body.name,
		email: req.body.email
	}, function(err, user) {
		if (err) {
			sendJSONresponse(res, 400, err);
			return;
		} else {
			sendJSONresponse(res, 201, user);
		}
	});
};

/*GET all users */
module.exports.listUsers = function(req, res) {
	User.find()
		.exec(function(err, user) {
			if (!user) {
				sendJSONresponse(res, 404, {
					"message": "user not found."
				});
				return;
			} else if (err) {
				sendJSONresponse(res, 400, err);
				return;
			} else {
				sendJSONresponse(res, 200, user);
			}
		});
};

/* get specific post with id */
module.exports.readUserOne = function(req, res) {
	var userId = req.params.userid;
	if (!userId) {
		sendJSONresponse(res, 404, {
			"message": "user id required."
		});
		return;
	}

	User.
	findById(userId)
		.populate('posts', 'title content')
		.exec(function(err, user) {
			if (!user) {
				sendJSONresponse(res, 404, {
					"message": "user not found with that id."
				});
				return;
			} else if (err) {
				sendJSONresponse(res, 400, err);
				return;
			} else {
				sendJSONresponse(res, 200, user);
			}
		});
};

module.exports.updateUserOne = function(req, res) {
	var userId = req.params.postid;
	if (!postId) {
		sendJSONresponse(res, 404, {
			"message": "post id required to delete the post."
		});
		return;
	}

	Post
		.findById(postId)
		.exec(function(err, post) {
			if(!post){
				sendJSONresponse(res,404,{
					"message":"post not found with that id."
				});
			}else if(err){
				sendJSONresponse(res,400,err);
			}
			post.title = req.body.title,
				post.image= req.body.image,
				post.content= req.body.content,
				post.comment= [{
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
module.exports.deleteUserOne = function(req, res) {
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