const mongoose = require('mongoose');
// User Schema
const orderSchema = new mongoose.Schema({
  // quantity: {
  //   type: Number,
  //   required: [true, 'Quantity is required'],
  // },
  isPending: {
    type: Boolean,
    default: true,
  },
  purchasedOn: {
    type: Date,
    default: new Date(),
  },
  totalAmount: {
    type: Number,
  },
  shippingFee: {
    type: Number,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  products: {
    type: Array,
  },
});

module.exports = mongoose.model('Order', orderSchema);
