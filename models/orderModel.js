const mongoose = require('mongoose');
// User Schema
const orderSchema = new mongoose.Schema({
  // quantity: {
  //   type: Number,
  //   required: [true, 'Quantity is required'],
  // },
  totalAmount: {
    type: Number,
  },
  purchasedOn: {
    type: Date,
    default: new Date(),
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  products:{
    type: Array,
  },
});

module.exports = mongoose.model('Order', orderSchema);
