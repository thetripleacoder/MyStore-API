const mongoose = require('mongoose');
// User Schema
const productSchema = new mongoose.Schema({
  picture: {
    type: String,
    required: [true, 'Picture is required'],
  },name: {
    type: String,
    required: [true, 'Name is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Product', productSchema);
