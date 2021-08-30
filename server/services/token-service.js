const jwt = require('jsonwebtoken');
const User = require('./../models/users');
const moment = require('moment');

const generateTokens = (payload) => {
	const accessTokenExpires = moment().add(1, 'm');
	const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '1m'});

	const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '2m'});

	return {
		accessToken: {
			token: accessToken,
			expires: accessTokenExpires,
		},
		refreshToken
	}
}

const saveToken = async (email, refreshToken) => {
	const tokenData = await User.findOne({email});
	if(tokenData) {
		tokenData.refreshToken = refreshToken;
		return tokenData.save();
	}

	throw new Error(`User not exist in DB with this ${email} email`);
}

module.exports = {
	generateTokens,
	saveToken
}
