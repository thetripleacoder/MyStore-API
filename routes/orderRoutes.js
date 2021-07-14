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
router.get(
  '/user/orders/details',
  auth.verify,
  auth.verifyIsOrdinaryUser,
  orderController.getUserOrders
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
