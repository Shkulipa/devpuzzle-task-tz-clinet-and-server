//imports
const Router = require('express');
const router = new Router();

//authMiddlewares
const authMiddleware = require('./../middlewares/authMiddleware');

//controllers
const cardController = require('./../controllers/cardController');

router
	.get('/', authMiddleware, cardController.getCards)
	.post('/new-card', authMiddleware, cardController.addCard);

module.exports = router;
