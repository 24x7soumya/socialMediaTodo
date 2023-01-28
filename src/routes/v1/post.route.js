const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const postValidation = require('../../validations/user.validation');
const postController = require('../../controllers/post.controller');

const router = express.Router();

router
	.route('/')
	.post(auth('createPost'), validate(postValidation.createPost), postController.createPost)
	.get(auth('viewPosts'), validate(postValidation.getPosts), postController.getPosts);

router
	.route('/:postId')
	.get(auth('viewPosts'), validate(postValidation.getPost), postController.getPost)
	.patch(auth('editPost'), validate(postValidation.updatePost), postController.updatePost)
	.delete(auth('deletePost'), validate(postValidation.deletePost), postController.deletePost)
	.post(auth('createComment'), validate(postValidation.createComment), postController.createComment);

router
	.route('/:postId/:commentId')
	.patch(auth('editComment'), validate(postValidation.updateComment), postController.updateComment)
	.delete(auth('deleteComment'), validate(postValidation.deleteComment), postController.deleteComment);

module.exports = router;