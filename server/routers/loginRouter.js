//imports
const Router = require('express');
const router = new Router();

//controllers
const loginController = require('./../controllers/userController');

router.post('/google', loginController.googleLogin);

module.exports = router;
