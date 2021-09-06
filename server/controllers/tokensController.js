const jwt = require('jsonwebtoken');
const tokenService = require('../services/tokenService');
const userService = require('../services/userService');

const refreshToken = async (req, res) => {
	try {
		const { refreshToken } = req.cookies;
		const isValidToken = jwt.verify(
			refreshToken,
			process.env.JWT_REFRESH_SECRET
		);

		if (isValidToken) {
			const candidate = await userService.userFind({ refreshToken });

			if (!candidate) {
				return res
					.status(401)
					.json({ error: true, msg: 'Error Auth' })
					.clearCookie();
			}

			const { username, picture, email, _id } = candidate;

			const tokens = await tokenService.generateTokens({
				username,
				picture,
				email,
			});
			await tokenService.saveToken(email, tokens.refreshToken);

			res.cookie('refreshToken', tokens.refreshToken, {
				maxAge: 1000 * 60 * 60 * 24 * 30,
				httpOnly: true,
			});
			return res.json({
				data: { email, name: username, picture, _id },
				msg: 'User exist in DB',
				accessToken: tokens.accessToken,
			});
		}

		return res
			.status(401)
			.json({ error: true, msg: 'Error Auth' })
			.clearCookie();
	} catch (e) {
		console.error(e);
		return res.json({ error: true, msg: e.message }).clearCookie();
	}
};

module.exports = {
	refreshToken,
};
