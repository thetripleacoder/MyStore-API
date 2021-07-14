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
  products: [
    {
      productId: {
        type: String,
        required: [true, 'Course ID is required'],
      },
      addedOn: {
        type: date,
        default: date.now,
      },
      status: {
        type: String,
        default: 'ordered',
      },
    },
  ],
});

module.exports = mongoose.model('Order', orderSchema);
