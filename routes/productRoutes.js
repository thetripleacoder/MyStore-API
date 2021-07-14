// express framework
const express = require('express');

// Router / "mini app"
const router = express.Router();

// controllers
const productController = require('../controllers/productController');
const auth = require('../auth');

// product methods(endpoint, controller modules)

router.post(
  '/products',
  auth.verify,
  auth.verifyIsAdmin,
  productController.createProduct
);
router.get('/products', productController.getAllProducts);

router.get('/products/:productId', productController.getSpecificProduct);
router.put(
  '/products/:productId',
  auth.verify,
  auth.verifyIsAdmin,
  productController.updateProduct
);
router.put(
  '/products/archive/:productId',
  auth.verify,
  auth.verifyIsAdmin,
  productController.archiveProduct
);

module.exports = router;
