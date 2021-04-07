const Product = require('../models/productModel');
const catchAsyncHandler = require('../utils/catchAsyncHandler');

exports.getFeaturedProduct = catchAsyncHandler(async (req, res, next) => {
  // 1. Aggregate
  const products = await Product.aggregate([
    { $match: { featured: { $gte: 1 } } },
    {
      $group: {
        _id: '$type',
        count: { $sum: 1 },
        products: {
          $push: {
            productId: '$_id',
            name: '$name',
            shortInfo: '$shortInfo',
            ratingAvg: '$ratingAvg',
            ratingQty: '$ratingQty',
            price: '$price',
            oldPrice: '$oldPrice',
            image: '$images',
          },
        },
      },
    },
    { $addFields: { type: '$_id' } },
    { $project: { _id: 0 } },
  ]);

  // 2. Send response
  res.status(200).json({
    status: 'success',
    result: products.length,
    data: {
      products,
    },
  });
});

exports.getProductByID = catchAsyncHandler(async (req, res, next) => {
  // 1. Get ID from req
  const { id } = req.params;

  if (!id) return next(new AppError('ID is missing', 404));

  // 2. Get the product
  const product = await Product.findById(id);

  if (!product) return next(new AppError(`No product with id: ${id}`, 400));

  // 3. Return response
  res.status(200).json({
    status: 'success',
    product,
  });
});

exports.getSearchProducts = catchAsyncHandler(async (req, res, next) => {
  const s = req.params.name.split('-').join(' ');
  console.log(s);

  const products = await Product.find(
    {
      $text: { $search: s },
    },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });

  res.status(200).json({
    status: 'success',
    result: products.length,

    data: {
      products,
      count: { $sum: 1 },
    },
  });
});
