const User = require('./../models/users');

const userFind = async findBy => {
	return User.findOne(findBy);
};

const userCreate = async newUser => {
	return new User(newUser).save();
};

module.exports = {
	userFind,
	userCreate,
};
