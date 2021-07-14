const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');

module.exports.createOrder = (req, res) => {
  let userId = req.user.id;
  let productId = req.body.productId;
  let quantity = req.body.quantity;

  let newOrder = new Order({
    buyer: userId,
    product: productId,
  });

  Product.findOne({ _id: productId })
    .then((foundProduct) => {
      let price = foundProduct.price;
      newOrder.quantity = quantity;
      newOrder.totalAmount = quantity * price;

      return newOrder
        .save()
        .then((savedOrder) => {
          res.send({ newData: savedOrder });
        })
        .catch((err) => {
          res.send({ message: 'All fields are required!' });
        });
    })
    .catch((err) => {
      res.send(err);
    });
};
module.exports.getUserOrders = (req, res) => {
  let userId = req.user.id;
  Order.find({ buyer: userId })

    .then((result) => {
      res.send({ data: result });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.getAllOrders = (req, res) => {
  Order.find({})
    .then((result) => {
      res.send({ data: result });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.getUserSpecificOrder = (req, res) => {
  let orderId = req.params.orderId;
  Order.find({ _id: orderId })
    .populate('buyer', {
      firstName: 1,
      lastName: 1,
      address: 1,
      email: 1,
      mobileNo: 1,
    })
    .populate('product', { name: 1, description: 1, price: 1 })
    .then((result) => {
      if (result.length > 0) {
        res.send({ data: result });
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
        res.send({ data: result });
      } else {
        res.send({ message: 'No order found!' });
      }
    })
    .catch((err) => {
      res.send(err);
    });
};
