const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moongoose = require('mongoose');

const UserSchema = new moongoose.Schema({
	email: {
		type: String,
		required: [true, 'Please add an email'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Please add a password'],
		minlength: 6,
		select: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

UserSchema.path('email').validate((val) => {
	const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailRegex.test(String(val).toLowerCase());
}, 'Please enter a valid Email');

UserSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

// match user entered password to hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = moongoose.model('User', UserSchema);
