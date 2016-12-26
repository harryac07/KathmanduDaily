var mongoose = require('mongoose');

/* Schema for reviews */
var commentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	createdOn: {
		type: Date,
		"default": Date.now
	}
});

// create a schema
var postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	comment:[commentSchema],
	createdOn: {
		type: Date,
		default: Date.now
	},
	author: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
});


// we need to create a model using it
module.exports = mongoose.model('Post', postSchema);