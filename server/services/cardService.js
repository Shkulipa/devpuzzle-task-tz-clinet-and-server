const Cards = require('./../models/cards');

const cardFind = async (findBy, sort) => {
	if (sort) {
		return Cards.find(findBy).sort([[sort, -1]]);
	}

	return Cards.find(findBy);
};

const cardFindOne = async findBy => {
	return Cards.findOne(findBy);
};

const cardCreate = async card => {
	return new Cards(card).save();
};

module.exports = {
	cardFind,
	cardFindOne,
	cardCreate,
};
