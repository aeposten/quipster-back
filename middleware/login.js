import jwt from 'jsonwebtoken';

const login = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const isAppAuth = token.length < 500;
		let decodedToken;
		if (token && isAppAuth) {
			decodedToken = jwt.verify(token, 'secret');
			req.parentId = decodedToken?.id;
		} else {
			decodedToken = jwt.decode(token);
			req.parentId = decodedToken?.sub;
		}

        next();
	} catch (error) {
		console.log(error);
	}
};

export default login;