const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
	try {
		const token = req.headers.authorization;
		if (!token) {
			return res.status(401).json({ message: 'Not authorization' });
		}
		req.user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
		next();
	} catch (e) {
		res.status(401).json({ message: 'Not authorization' });
	}
};
