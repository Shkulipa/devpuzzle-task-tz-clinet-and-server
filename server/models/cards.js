const { Schema, model, ObjectId } = require('mongoose');

const Card = new Schema({
	id: { type: Number, required: true, unique: true },
	email: { type: String },
	name: { type: String },
	username: { type: String },
	address: { type: String },
	website: { type: String },
	userId: { type: ObjectId, ref: 'User' },
	date: { type: Date, default: Date.now },
});

module.exports = model('Card', Card);
