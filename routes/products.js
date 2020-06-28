const express = require('express');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controller/products');
const { isLoggedIn } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(getProducts).post(isLoggedIn, createProduct);
router.route('/:id').get(getProduct).put(isLoggedIn, updateProduct).delete(isLoggedIn, deleteProduct);

module.exports = router;
