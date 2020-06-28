const Product = require('../models/Product');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc Get products
// @route Get /api/v1/products
// @access Public
exports.getProducts = asyncHandler(async (req, res, next) => {
	const products = await Product.find();

	return res.status(200).json({
		success: true,
		count: products.length,
		data: products,
	});
});

// @desc Get a product
// @route Get /api/v1/products/:id
// @access Public
exports.getProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
	}
	res.status(200).json({
		success: true,
		data: product,
	});
});

// @desc Create new product
// @route POST /api/v1/products
// @access Private
exports.createProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.create(req.body);
	res.status(201).json({
		success: true,
		data: product,
	});
});

// @desc Update a product
// @route PUT /api/v1/products/:id
// @access Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!product) {
		return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
	}

	res.status(200).json({
		success: true,
		data: product,
	});
});

// @desc Delete a product
// @route DELETE /api/v1/products/:id
// @access Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
	}

	await product.remove();
	res.status(200).json({
		success: true,
		msg: 'Product successfully deleted!!',
	});
});
