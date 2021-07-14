const Product = require('../models/productModel');

module.exports.createProduct = (req, res) => {
  let name = req.body.name;
  let description = req.body.description;
  let price = req.body.price;

  let newProduct = new Product({
    name: name,
    description: description,
    price: price,
  });

  return newProduct
    .save()
    .then((savedProduct) => {
      res.send({ newData: savedProduct });
    })
    .catch((err) => {
      res.send({ message: 'All fields are required!' });
    });
};

module.exports.getAllProducts = (req, res) => {
  Product.find({ isActive: true })
    .then((result) => {
      res.send({ data: result });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.getSpecificProduct = (req, res) => {
  let productId = req.params.productId;
  Product.find({ _id: productId })
    .then((result) => {
      if (result.length > 0) {
        res.send({ data: result });
      } else {
        res.send({ message: 'No product found!' });
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.updateProduct = (req, res) => {
  let productId = req.params.productId;
  let updates = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };
  let options = {
    new: true,
  };

  Product.findByIdAndUpdate({ _id: productId }, updates, options)
    .then((updatedProduct) => {
      res.send(updatedProduct);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.archiveProduct = (req, res) => {
  let productId = req.params.productId;
  Product.findOne({ _id: productId })
    .then((result) => {
      if (result.isActive) {
        result.isActive = false;
        result
          .save()
          .then((archivedProduct) => {
            res.send({
              Message: 'Product archived successfully!',
              archivedData: archivedProduct,
            });
          })
          .catch((err) => {
            res.send(err);
          });
      } else {
        res.send({ Message: 'Product is already archived!' });
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.getAllArchiveProducts = (req, res) => {
  Product.find({ isActive: false })
    .then((result) => {
      res.send({ data: result });
    })
    .catch((err) => {
      res.send(err);
    });
};
