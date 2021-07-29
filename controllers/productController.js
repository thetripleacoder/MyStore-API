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
      res.send({
        message: 'Product created successfully!',
        newData: savedProduct,
      });
    })
    .catch((err) => {
      res.send({ message: 'All fields are required!' });
    });
};

module.exports.getAllProducts = (req, res) => {
  Product.find()
    .then((result) => {
      res.send({ message: 'List of all active products', data: result });
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
        res.send({ message: 'Product Information', data: result });
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
  let options = {
    new: true,
  };

  Product.findByIdAndUpdate(productId, req.body, options)
    .then((updatedProduct) => {
      res.send({
        message: 'Product updated successfully!',
        data: updatedProduct,
      });
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
              message: 'Product archived successfully!',
              archivedData: archivedProduct,
            });
          })
          .catch((err) => {
            res.send(err);
          });
      } else {
        res.send({ message: 'Product is already archived!' });
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.getAllArchiveProducts = (req, res) => {
  Product.find({ isActive: false })
    .then((result) => {
      res.send({ message: 'List of archived products', data: result });
    })
    .catch((err) => {
      res.send(err);
    });
};

const activateProduct = (productId) => {
  return Product.findOne({_id:productId}).then(result => {
      if(result.isActive === false){
        result.isActive = true
        return result.save().then(activatedProduct =>{
          return {
            message: "Product successfully re-activated",
            activatedData: activatedProduct
          }
        })
        .catch(err => {
            return err
        })
      } else {
        return {message: "Product is already active!"}
      }
  })
  .catch(err => {
    return err
  })
}

