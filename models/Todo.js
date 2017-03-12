import mongoose from 'mongoose';

const schema = mongoose.Schema;
const todoSchema = new schema({
	title: String,
	description: String,
	status: String,
	priority: String
});

const TodoModel = mongoose.model('Bug',todoSchema);

export default TodoModel;