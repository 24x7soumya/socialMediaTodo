const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const todoValidation = require('../../validations/user.validation');
const todoController = require('../../controllers/todo.controller');

const router = express.Router();

router
	.route('/')
	.post(auth('createTodo'), validate(todoValidation.createTodo), todoController.createTodo)
	.get(auth('viewTodos'), validate(todoValidation.getTodos), todoController.getTodos);

router
	.route('/:todoId')
	.get(auth('viewTodos'), validate(todoValidation.getTodo), todoController.getTodo)
	.patch(auth('editTodo'), validate(todoValidation.updateTodo), todoController.updateTodo)
	.delete(auth('deleteTodo'), validate(todoValidation.deleteTodo), todoController.deleteTodo);

module.exports = router;