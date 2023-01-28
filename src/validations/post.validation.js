const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPost = {
	body: Joi.object().keys({
		title: Joi.string().required(),
		content: Joi.string().required()
	}),
};

const getPosts = {
	query: Joi.object().keys({
		sortBy: Joi.string(),
		limit: Joi.number().integer(),
		page: Joi.number().integer(),
	}),
};

const getPost = {
	params: Joi.object().keys({
		postId: Joi.string().custom(objectId),
	}),
};

const updatePost = {
	params: Joi.object().keys({
		postId: Joi.required().custom(objectId),
	}),
	body: Joi.object()
		.keys({
			title: Joi.string(),
			content: Joi.string()
		})
		.min(1),
};

const deletePost = {
	params: Joi.object().keys({
		postId: Joi.string().custom(objectId),
	}),
};

const createComment = {
	params: Joi.object().keys({
		postId: Joi.required().custom(objectId),
	}),
	body: Joi.object()
		.keys({
			content: Joi.string()
		})
		.min(1),
};

const updateComment = {
	params: Joi.object().keys({
		postId: Joi.required().custom(objectId),
	}),
	body: Joi.object()
		.keys({
			content: Joi.string()
		})
		.min(1),
};

const deleteComment = {
	params: Joi.object().keys({
		postId: Joi.string().custom(objectId),
		commentId: Joi.number().required(),
	}),
};

module.exports = {
	createPost,
	getPosts,
	getPost,
	updatePost,
	deletePost,
	createComment,
	updateComment,
	deleteComment
};
