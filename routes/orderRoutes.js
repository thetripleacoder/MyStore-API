// express framework
const express = require('express');

// Router / "mini app"
const router = express.Router();

// controllers
const orderController = require('../controllers/orderController');
const auth = require('../auth');

// order methods(endpoint, controller modules)
router.post(
  '/users/checkout',
  auth.verify,
  auth.verifyIsOrdinaryUser,
  orderController.createOrder
);
router.post(
  '/users/checkout/:orderId',
  auth.verify,
  auth.verifyIsOrdinaryUser,
  orderController.addProduct
);
router.get(
  '/user/orders',
  auth.verify,
  auth.verifyIsOrdinaryUser,
  orderController.getUserOrders
);
router.get(
  '/user/orders/:orderId',
  auth.verify,
  auth.verifyIsOrdinaryUser,
  orderController.getUserSpecificOrder
);
router.get(
  '/admin/orders',
  auth.verify,
  auth.verifyIsAdmin,
  orderController.getAllOrders
);
router.get(
  '/admin/orders/:orderId',
  auth.verify,
  auth.verifyIsAdmin,
  orderController.getSpecificOrder
);

module.exports = router;
