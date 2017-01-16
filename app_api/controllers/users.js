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
	// var userId = req.params.postid;
	// if (!postId) {
	// 	sendJSONresponse(res, 404, {
	// 		"message": "user id required to delete the post."
	// 	});
	// 	return;
	// }

	// Post
	// 	.findById(postId)
	// 	.exec(function(err, post) {
	// 		if(!post){
	// 			sendJSONresponse(res,404,{
	// 				"message":"post not found with that id."
	// 			});
	// 		}else if(err){
	// 			sendJSONresponse(res,400,err);
	// 		}
	// 		post.title = req.body.title,
	// 			post.image= req.body.image,
	// 			post.content= req.body.content,
	// 			post.comment= [{
	// 				name: req.body.name,
	// 				comment: req.body.comment
	// 			}]

	// 		post.save(function(err, post) {
	// 			if (err) {
	// 				sendJSONresponse(res, 400, err);
	// 			} else {
	// 				sendJSONresponse(res, 200, post);
	// 			}
	// 		});
	// 	});
};
module.exports.updateAbout = function(req, res) {
	var userId = req.params.userid;
	if (!userId) {
		sendJSONresponse(res, 404, {
			"message": "user id required to update ."
		});
		return;
	}
	User
		.findById(userId)
		.exec(function(err, user) {
			if(err){
				sendJSONresponse(res,400,err);
				return;
			}else if(!user){
				sendJSONresponse(res,404,{
					"message":"user not found to update"
				});
				return;
			}else{
				console.log(req.body.about);
				if(user.local.name){
					console.log('local true');
					user.local.about=req.body.about;
				}else{
					console.log('facebook true');
					user.facebook.about=req.body.about;
				}
				
				user.save(function(err){
					if(err){
						sendJSONresponse(res,400,err);
					}else{
						sendJSONresponse(res,200,user);
					}
				})
			}
		});
};

/* delete post */
module.exports.deleteUserOne = function(req, res) {
	var userId = req.params.userid;
	if (!userId) {
		sendJSONresponse(res, 404, {
			"message": "user id required to delete the user."
		});
		return;
	}

	User
		.findByIdAndRemove(userId)
		.exec(function(err, user) {
			if (!user) {
				sendJSONresponse(res, 404, {
					"message": "user not found with that id"
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