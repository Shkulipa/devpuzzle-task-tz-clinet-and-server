const { Schema, model } = require('mongoose');

const User = new Schema({
	email: {type: String, required: true, unique: true},
	username: {type: String},
	picture: {type: String},
	refreshToken: {type: String, default: null}
})

module.exports = model('User', User);
