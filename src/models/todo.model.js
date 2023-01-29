const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
	content: {
		type: String,
		trim: true,
		required: true
	},
	status: {
		type: String,
		enum: ['pending', 'ongoing', 'done'],
		default: 'pending',
		required: true
	},
	userId: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now
	}
});

/**
 * @typedef Todo
 */
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;