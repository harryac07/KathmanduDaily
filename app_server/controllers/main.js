var request = require('request');
var cloudinary = require('cloudinary');

// Mongoose Model
var mongoose = require('mongoose');

var apiOptions = {
	server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
	apiOptions.server = 'http://localhost:3000';
}

/* CLoudinary setup */
cloudinary.config({
	cloud_name: 'haria',
	api_key: '114523583929527',
	api_secret: 'qq_hgWwFvd2Bcst4futLR2oVSYo'
});
/* Home Page */

module.exports.homepage = function(req, res) { // get all the products
	res.render('index', {
		title: 'Welcome to Home',
	});
};
module.exports.postCreate = function(req, res) { // get all the products
	res.render('post', {
		title: 'Welcome to Home',
	});
};

//actual POST creating form data
module.exports.post = function(req, res) {
	cloudinary.uploader.upload(req.files.image.path, function(result) {
		console.log(result);


		var postdata = {
			title: req.body.title,
			image: result.url,
			content: req.body.content
		};
		path = '/api/createpost/585fad2354451f145c6b6e21';
		//path = '/api/createpost/:userid';
		console.log('path : ' + path);
		requestOptions = {
			url: apiOptions.server + path,
			method: "POST",
			json: postdata
		};
		request(requestOptions, function(err, response, body) {
			if (response.statusCode === 201) {
				res.redirect('/');
				return;
			} else {
				res.send(err);
			}
		});
	});
};