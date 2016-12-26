var express = require('express');
var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var ctrlposts = require('../controllers/posts');
var ctrlUsers = require('../controllers/users');


router.post('/createpost/:userid',ctrlposts.postCreate);
router.get('/posts/',ctrlposts.listPosts);
router.get('/post/:postid',ctrlposts.readPostOne);
router.put('/post/:postid', ctrlposts.postUpdateOne);
router.delete('/post/:postid', ctrlposts.postDeleteOne);

router.post('/createuser',ctrlUsers.userCreate);
router.get('/users',ctrlUsers.listUsers);
router.get('/user/:userid',ctrlUsers.readUserOne);
router.put('/user/:userid',ctrlUsers.updateUserOne);
router.delete('/user/:userid',ctrlUsers.deleteUserOne);



module.exports = router;