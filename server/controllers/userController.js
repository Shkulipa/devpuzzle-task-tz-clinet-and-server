const fetch = require('node-fetch');
const userService = require('../services/userService');
const tokenService = require('../services/tokenService');

const googleLogin = async (req, res) => {
	const idToken = req.headers.authorization.replace('Bearer ', '');

	try {
		const resVerification = await fetch(
			`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
		)
			.then(res => res.json())
			.then(res => {
				return res;
			});

		if (resVerification.error) {
			//error auth from api google
			return res.json({ error: true, msg: 'Error Auth' });
		} else {
			//find user
			const { email, name, picture } = resVerification;
			const candidate = await userService.userFind({ email });

			//exist user
			if (candidate) {
				const { refreshToken, accessToken } =
					tokenService.generateTokens({
						email,
						name,
						picture,
					});
				await tokenService.saveToken(email, refreshToken);

				res.cookie('refreshToken', refreshToken, {
					maxAge: 14000,
					httpOnly: true,
				});
				return res.json({
					data: { ...resVerification, _id: candidate._id },
					msg: 'User exist in DB',
					accessToken,
				});
			}

			//new user
			const { refreshToken, accessToken } = tokenService.generateTokens({
				email,
				name,
				picture,
			});

			await userService.userCreate({
				email,
				picture,
				username: name,
				refreshToken,
			});

			return res
				.json({
					data: { ...resVerification, _id: candidate._id },
					msg: 'User created',
					accessToken,
				})
				.cookie('refreshToken', refreshToken, {
					maxAge: 14000,
					httpOnly: true,
				});
		}
	} catch (e) {
		console.error(e);
		return res.json({ error: true, msg: e.message });
	}
};

module.exports = {
	googleLogin,
};
