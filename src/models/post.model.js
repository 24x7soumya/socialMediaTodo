const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: true
	},
	content: {
		type: String,
		trim: true,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	userId: { 
		type: String
	},
	comments: [{
		_id: false,
		content: String,
		date: {
			type: Date,
			default: Date.now
		},
		userId: String
	}]
});

// add plugin that converts mongoose to json
postSchema.plugin(toJSON);
postSchema.plugin(paginate);

/**
 * @typedef Post
 */
const Post = mongoose.model('Post', postSchema);

module.exports = Post;