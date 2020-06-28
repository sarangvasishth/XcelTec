const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');

// Protect routes
exports.isLoggedIn = asyncHandler(async (req, res, next) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return next(new ErrorResponse('User is required to login to perform this action.', 401));
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findById(decoded.id);
		next();
	} catch (error) {
		return next(new ErrorResponse('Unauthorized', 401));
	}
});
