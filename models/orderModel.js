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
    required: [true, 'Total Amount is required'],
  },
  shippingFee: {
    type: Number,
    required: [true, 'Shipping Fee is required'],
  },
  buyer: [
    {
      userId: {
        type: String,
        required: [true, 'User Id is required'],
      },
      firstName: {
        type: String,
        required: [true, 'First Name is required'],
      },
      lastName: {
        type: String,
        required: [true, 'Last Name is required'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
      },
      address: {
        type: String,
        required: [true, 'Address is required'],
      },
      mobileNo: {
        type: Number,
        required: [true, 'Mobile Number is required'],
      },
    },
  ],
  // buyer: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  // },
  products: {
    type: Array,
  },
});

module.exports = mongoose.model('Order', orderSchema);
