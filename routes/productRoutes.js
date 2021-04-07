const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.route('/search/:name').get(productController.getSearchProducts);
router.route('/features').get(productController.getFeaturedProduct);

router.route('/:id').get(productController.getProductByID);

module.exports = router;
