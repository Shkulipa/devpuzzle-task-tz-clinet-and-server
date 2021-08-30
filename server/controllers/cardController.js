const Cards = require('./../models/cards');
const Users = require('./../models/users');

const getCards = async (req, res) => {
	try {
		const { email } = req.user;
		const { _id } = await Users.findOne({ email });
		const cardsUser = await Cards.find({ userId: _id }).sort([['date', -1]]);
		return res.json(cardsUser)
	} catch (e) {
		console.error(e);
		return res.json({error: true, msg: e.message})
	}
}

const addCard = async (req, res) => {
	try {
		const {card, userId} = req.body;

		const cardFind = await Cards.findOne({ id: card.id });
		if(!cardFind) {
			await new Cards({
				id: card.id,
				email: card.email,
				name: card.name,
				username:  card.username,
				address: card.address.city,
				website: card.address.website,
				userId
			}).save();

			const cardsUsers = await Cards.find({userId});
			return res.json({error: false, data: cardsUsers, msg: 'Card added'})
		}

		return res.json({error: true, msg: 'Card exist in DB'})
	} catch (e) {
		console.error(e);
		return res.json({error: true, msg: e.message})
	}
}

module.exports = {
	addCard,
	getCards
};



