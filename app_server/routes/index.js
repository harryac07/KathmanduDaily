var express = require('express');
var router = express.Router();
var ctrlHomepage=require('../controllers/main');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var cloudinary = require('cloudinary')  
  , fs = require('fs');

// Mongoose Model
var mongoose = require('mongoose');
var product = mongoose.model('Post');


/* GET home page. */
router.get('/',ctrlHomepage.homepage);

router.get('/post',ctrlHomepage.postCreate);
router.post('/post',multipartMiddleware,ctrlHomepage.post); // actual post

module.exports = router;
