const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/forgot-password').post(authController.forgetPassoword);
router.route('/verify-otp').post(authController.checkPasswordResetOTP);
router.route('/reset-password').post(authController.resetPassword);

/*
router.route('/protected-path').get(authController.protect, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: `Access granted to ${req.user.firstName}`,
  });
});
*/

// Token
router
  .route('/token')
  .get(authController.renewAccessToken)
  .delete(authController.revokeRefreshToken);

// User
router.route('/').get(userController.getUserById);

// Me
router
  .route('/me')
  .get(
    authController.protect,
    userController.getMe,
    userController.getUserById
  );
module.exports = router;
