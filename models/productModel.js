const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is missing'],
    unique: true,
  },
  shortInfo: {
    type: String,
    required: [true, 'Product short description is missing'],
  },
  type: {
    type: String,
    required: [true, 'Product type is missing'],
  },
  brand: {
    type: String,
    required: [true, 'Product brand is missing'],
  },
  color: {
    type: String,
    required: [true, 'Product color is missing'],
  },

  price: {
    type: Number,
    required: [true, 'Product current price is missing'],
  },
  oldPrice: {
    type: Number,
    required: [true, 'Product old price is missing'],
  },
  discount: {
    type: Number,
    default: 0,
  },
  shipping: {
    type: Number,
    default: 0,
  },

  ratingAvg: Number,
  ratingQty: Number,

  featured: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    required: [true, 'Product quantity is missing'],
    default: 0,
  },
  images: [String],

  properties: Object,
  description: [String],
  information: Object,
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
