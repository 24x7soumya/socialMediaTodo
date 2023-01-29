const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTodo = {
	body: Joi.object().keys({
		content: Joi.string().required(),
		status: Joi.string().required().valid('pending', 'ongoing', 'done').default('pending'),
	}),
};

const getTodos = {
	query: Joi.object().keys({
		sortBy: Joi.string(),
		limit: Joi.number().integer(),
		page: Joi.number().integer(),
	}),
};

const getTodo = {
	params: Joi.object().keys({
		todoId: Joi.string().custom(objectId),
	}),
};

const updateTodo = {
	params: Joi.object().keys({
		todoId: Joi.required().custom(objectId),
	}),
	body: Joi.object()
		.keys({
			content: Joi.string(),
			status: Joi.string().valid('pending', 'ongoing', 'done').default('pending'),
		})
		.min(1),
};

const deleteTodo = {
	params: Joi.object().keys({
		todoId: Joi.string().custom(objectId),
	}),
};

module.exports = {
	createTodo,
	getTodos,
	getTodo,
	updateTodo,
	deleteTodo,
};
