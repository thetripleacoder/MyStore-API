const Order = require('../models/orderModel');
// const User = require('../models/userModel');
// const Product = require('../models/productModel');

module.exports.createOrder = (req, res) => {
  let userId = req.user.id;
  let productId = req.body;

  let newOrder = new Order({
    buyer: userId,
    products: products.push(productId),
  });

  return newOrder
    .save()
    .then((savedOrder) => {
      res.send({
        message: 'Order created successfully!',
        newData: savedOrder,
      });
    })
    .catch((err) => {
      res.send({ message: 'All fields are required!' });
    });
};
module.exports.getUserOrders = (req, res) => {
  let userId = req.user.id;
  Order.find({ buyer: userId })

    .then((result) => {
      res.send({ message: 'List of user orders', data: result });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.getAllOrders = (req, res) => {
  Order.find({})
    .then((result) => {
      res.send({ message: 'List of all orders', data: result });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.getUserSpecificOrder = (req, res) => {
  let userId = req.user.id;
  let orderId = req.params.orderId;
  Order.find({ buyer: userId, _id: orderId })
    .populate('buyer', {
      _id: 0,
      firstName: 1,
      lastName: 1,
      address: 1,
      email: 1,
      mobileNo: 1,
    })
    .populate('product', { _id: 0, name: 1, description: 1, price: 1 })
    .then((result) => {
      if (result.length > 0) {
        res.send({ message: 'Order Information', data: result });
      } else {
        res.send({ message: 'No order found!' });
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.getSpecificOrder = (req, res) => {
  let orderId = req.params.orderId;
  Order.find({ _id: orderId })
    .populate('buyer')
    .populate('product')
    .then((result) => {
      if (result.length > 0) {
        res.send({ message: 'Order Information', data: result });
      } else {
        res.send({ message: 'No order found!' });
      }
    })
    .catch((err) => {
      res.send(err);
    });
};
