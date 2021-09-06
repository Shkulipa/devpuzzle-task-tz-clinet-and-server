const userService = require('../services/userService');
const cardsService = require('../services/cardService');

const getCards = async (req, res) => {
	try {
		const { email } = req.user;
		const { _id } = await userService.userFind({ email });
		const cardsUser = await cardsService.cardFind({ userId: _id }, 'date');
		return res.json(cardsUser);
	} catch (e) {
		console.error(e);
		return res.json({ error: true, msg: e.message });
	}
};

const addCard = async (req, res) => {
	try {
		const { card, userId } = req.body;
		const cardFind = await cardsService.cardFindOne({ id: card.id });
		if (!cardFind) {
			await cardsService.cardCreate({
				id: card.id,
				email: card.email,
				name: card.name,
				username: card.username,
				address: card.address.city,
				website: card.address.website,
				userId,
			});

			const cardsUsers = await cardsService.cardFind({ userId });

			return res.json({
				error: false,
				data: cardsUsers,
				msg: 'Card added',
			});
		}

		return res.json({ error: true, msg: 'Card exist in DB' });
	} catch (e) {
		console.error(e);
		return res.json({ error: true, msg: e.message });
	}
};

module.exports = {
	addCard,
	getCards,
};
