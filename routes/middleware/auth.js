const jwt = require('jsonwebtoken');
module.exports = {

	generateAccessToken: (user, cb) => {
		jwt.sign({
				username: user.username,
				password: user.password

			}, process.env.SECRET, {expiresIn: 60 * 60 * 60}, (err, token) => {
				if (err) cb(err)
				else cb(null, token)
			});

	},

	verifyToken: (req, res, next) => {
		let token = req.body.token || req.query.token || req.headers['x-access-token'];
		if (!token) return res.status(401).json('No token provided');
		
		jwt.verify(token, process.env.SECRET, verifyCallBack);

		function verifyCallBack(error, decoded) {
			if (error) return res.status(401).json(error.message);

			res.decoded = decoded;
			next();
		}
	}
}