const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/protected-path').get(authController.protect, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: `Access granted to ${req.user.firstName}`,
  });
});

// Token
router
  .route('/token')
  .get(authController.renewAccessToken)
  .delete(authController.revokeRefreshToken);

module.exports = router;
