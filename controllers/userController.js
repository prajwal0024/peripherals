const User = require('../models/userModel');
const catchAsyncHandler = require('../utils/catchAsyncHandler');
const AppError = require('../utils/appError');

exports.getMe = (req, res, next) => {
  req.query.id = req.user.id;
  next();
};

exports.getUserById = catchAsyncHandler(async (req, res, next) => {
  const { id } = req.query;
  console.log({ id });

  const user = await User.findById(id);

  if (!user) return next(new AppError('No user found', 404));

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
