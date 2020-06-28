const User = require('../models/User');

const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc Register a user
// @route POST /api/v1/auth/register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;
	const user = await User.create({
		email,
		password,
	});

	const token = user.getSignedJwtToken();
	res.status(200).json({ success: true, token });
});

// @desc Login a user
// @route POST /api/v1/auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	// Validate email & password
	if (!email && !password) {
		return next(new ErrorResponse('Please provide an email and password', 400));
	}

	// Check for user
	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return next(new ErrorResponse('Invalid credentials!', 401));
	}

	// Check password is correct
	const isMatch = await user.matchPassword(password);

	if (!isMatch) {
		return next(new ErrorResponse('Invalid credentials!', 401));
	}

	const token = user.getSignedJwtToken();
	res.status(200).json({ success: true, token });
});
