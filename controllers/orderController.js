const Order = require('../models/orderModel');
// const User = require('../models/userModel');
const Product = require('../models/productModel');

module.exports.createOrder = (req, res) => {
  let userId = req.user.id;
  let totalAmount = req.body.totalAmount;
  let shippingFee = req.body.shippingFee;
  let products = req.body.products;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let address = req.body.address;
  let mobileNo = req.body.mobileNo;

  let newOrder = new Order({
    totalAmount: totalAmount,
    shippingFee: shippingFee,
    products: products,
    userId: userid,
    buyer: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
      mobileNo: mobileNo,
    },
  });

  return newOrder
    .save()
    .then((savedOrder) => {
      res.send(savedOrder);
    })
    .catch((err) => {
      res.send({ message: 'All fields are required!' });
    });
};

module.exports.addProduct = (req, res) => {
  let userId = req.user.id;
  let orderId = req.params.orderId;
  let productId = req.body.productId;
  let product = req.body;
  Order.findOne({ buyer: userId, _id: orderId })
    .then((foundOrder) => {
      foundOrder.products.push(product);

      Product.findOne({ _id: productId })
        .then((foundProduct) => {
          let price = foundProduct.price;
          foundOrder.totalAmount += price;
          return foundOrder.save().then((savedOrder) => {
            res.send({
              message: 'Product added successfully!',
              newData: savedOrder,
            });
          });
        })
        .catch((err) => {
          res.send(err);
        });
    })

    .catch((err) => {
      res.send(err);
    });
};

module.exports.getUserOrders = (req, res) => {
  let userId = req.user.id;
  Order.find({ userId: userId })

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
    .populate('products.productId', {
      _id: 0,
      name: 1,
      description: 1,
      price: 1,
    })
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
    .populate('products.productId')
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

module.exports.setAsCompletedOrder = (req, res) => {
  let orderId = req.params.orderId;
  Order.findOne({ _id: orderId })
    .then((result) => {
      if (result.isPending == true) {
        result.isPending = false;
        result
          .save()
          .then((completedOrder) => {
            res.send({
              message: 'Order completed successfully!',
              completedOrder: completedOrder,
            });
          })
          .catch((err) => {
            res.send(err);
          });
      } else {
        res.send({ message: 'Order is already completed!' });
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.setAsPendingOrder = (req, res) => {
  let orderId = req.params.orderId;
  Order.findOne({ _id: orderId })
    .then((result) => {
      if (result.isPending == false) {
        result.isPending = true;
        result
          .save()
          .then((pendingOrder) => {
            res.send({
              message: 'Order pending successfully!',
              pendingOrder: pendingOrder,
            });
          })
          .catch((err) => {
            res.send(err);
          });
      } else {
        res.send({ message: 'Order is already pending!' });
      }
    })
    .catch((err) => {
      res.send(err);
    });
};
