// imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routers/index');
const cookieParser = require('cookie-parser');

//options
const app = express();

//middlewares
app.use(
	cors({
		origin: true,
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());

//router
app.use('/api', router);

(async () => {
	try {
		await mongoose.connect(process.env.dbUrl);
		const check = mongoose.connection.readyState;

		switch (check) {
			case 0:
				console.log('0: disconnected DB');
				break;
			case 1:
				console.log('1: connected DB');
				break;
			case 2:
				console.log('2: connecting DB');
				break;
			case 3:
				console.log('3: disconnecting DB');
				break;
			default:
				console.log('Other');
		}

		await app.listen(process.env.PORT, () =>
			console.log(
				`Example app listening at http://${process.env.HOST}:${process.env.PORT}`
			)
		);
	} catch (e) {
		console.error(e);
	}
})();
