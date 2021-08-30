
//imports
const Router = require('express');
const router = new Router();

//controllers
const tokensController = require('./../controllers/tokensController');

router
	.post('/refresh-tokens', tokensController.refreshToken)

module.exports = router;
