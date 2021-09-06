//imports
const Router = require('express');
const router = new Router();

//routers
const cardRouter = require('./cardRouter');
const loginRouter = require('./loginRouter');
const tokensRouter = require('./tokensRouter');

router.use('/cards', cardRouter);
router.use('/login', loginRouter);
router.use('/tokens', tokensRouter);

module.exports = router;
