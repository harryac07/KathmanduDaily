var express = require('express');
var passport = require('passport');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var ctrlposts = require('../controllers/posts');
var ctrlUsers = require('../controllers/users');
var ctrlComment = require('../controllers/comments');
var ctrlAuth = require('../controllers/authentication');


router.post('/createpost/:userid', ctrlposts.postCreate);
router.get('/posts/', ctrlposts.listPosts);
router.get('/post/:postid', ctrlposts.readPostOne);
router.put('/post/:postid', ctrlposts.postUpdateOne);
router.delete('/post/:postid', ctrlposts.postDeleteOne);
router.get('/post/author/:authorid',ctrlposts.postByAuthor);

router.post('/createuser', ctrlUsers.userCreate);
router.get('/users', ctrlUsers.listUsers);
router.get('/user/:userid', ctrlUsers.readUserOne);
router.put('/user/:userid', ctrlUsers.updateUserOne);
router.post('/user/updateabout/:userid',ctrlUsers.updateAbout);
router.delete('/user/:userid', ctrlUsers.deleteUserOne);

/* comment routes */
router.post('/post/:postid/comment', ctrlComment.postComment);
router.get('/post/:postid/comment/:commentid', ctrlComment.getComment);

/* authentication */
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
/* facebook first login */
router.get('/auth/facebook', passport.authenticate('facebook', {
	scope: 'email'
}));
//facebook callback
router.get('/auth/facebook/callback', ctrlAuth.facebookLogin);


//Subscribe 
router.post('/subscribe', ctrlAuth.subscribe);


module.exports = router;