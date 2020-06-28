const moongoose = require('mongoose');

const ProductSchema = new moongoose.Schema({
	name: {
		type: String,
		trim: true,
		unique: true,
		required: [true, 'Please add a product name'],
	},
	description: {
		type: String,
		required: [true, 'Please add a product description'],
	},
	price: {
		type: Number,
		required: [true, 'Please add a product price'],
	},
	quantity: {
		type: Number,
		required: [true, 'Please add a product quantity'],
	},
	action: {
		type: String,
		required: [true, 'Please add a product action'],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = moongoose.model('Product', ProductSchema);
