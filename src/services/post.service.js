const httpStatus = require('http-status');
const { Post } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a post
 * @param {Object} postBody
 * @returns {Promise<Post>}
 */
const createPost = async (userId, postBody) => {
	postBody.userId = userId;
	return Post.create(postBody);
};

/**
 * Query for posts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPosts = async (filter, options) => {
	const posts = await Post.paginate(filter, options);
	return posts;
};

/**
 * Get post by id
 * @param {ObjectId} id
 * @returns {Promise<Post>}
 */
const getPostById = async (id) => {
	return Post.findById(id);
};

/**
 * Update post by id
 * @param {ObjectId} postId
 * @param {Object} updateBody
 * @returns {Promise<Post>}
 */
const updatePostById = async (userId, postId, updateBody) => {
	const post = await getPostById(postId);
	if (!post) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
	}
	if (post.userId !== userId) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Access denied');
	}
	updateBody.userId = userId;
	Object.assign(post, updateBody);
	await post.save();
	return post;
};

/**
 * Delete post by id
 * @param {ObjectId} postId
 * @returns {Promise<Post>}
 */
const deletePostById = async (userId, postId) => {
	const post = await getPostById(postId);
	if (!post) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
	}
	if (post.userId !== userId) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Access denied');
	}
	await post.remove();
	return post;
};

/**
 * Create a post
 * @param {Object} postBody
 * @returns {Promise<Post>}
 */
const createComment = async (userId, postId, commentBody) => {
	const post = await getPostById(postId);
	if (!post) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
	}
	commentBody.userId = userId;
	post.comments.push(commentBody);
	await post.save();
	return post;
};

/**
 * Update post by id
 * @param {ObjectId} postId
 * @param {Object} updateBody
 * @returns {Promise<Post>}
 */
const updateComment = async (userId, postId, commentId, updateBody) => {
	const post = await getPostById(postId);
	if (!post) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
	}
	if (post.comments.length - 1 < commentId) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
	}
	const comment = post.comments[commentId];
	if (comment.userId !== userId) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Access denied');
	}
	updateBody.userId = userId;
	Object.assign(post, updateBody);
	await post.save();
	return post;
};

/**
 * Delete post by id
 * @param {ObjectId} postId
 * @returns {Promise<Post>}
 */
const deleteComment = async (userId, postId, commentId) => {
	const post = await getPostById(postId);
	if (!post) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
	}
	if (post.comments.length - 1 < commentId) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
	}
	const comment = post.comments[commentId];
	if (comment.userId !== userId) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Access denied');
	}
	post.comments.splice(commentId, 1);
	await post.save();
	return post;
};

module.exports = {
	createPost,
	queryPosts,
	getPostById,
	updatePostById,
	deletePostById,
	createComment,
	updateComment,
	deleteComment
};
