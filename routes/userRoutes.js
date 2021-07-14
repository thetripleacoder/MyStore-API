// express framework
const express = require('express');

// Router / "mini app"
const router = express.Router();

// controllers
const userController = require('../controllers/userController');
const auth = require('../auth');

// user methods(endpoint, controller modules)
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', auth.verify, userController.getUserDetails);
// update user details
router.put('/profile/update', auth.verify, userController.updateUserDetails);

// router.put(
//   '/profile/update',
//   auth.verify,
//   auth.verifyIsOrdinaryUser,
//   userController.updateUserDetails
// );
router.get(
  '/users',
  auth.verify,
  auth.verifyIsAdmin,
  userController.getAllUsers
);

router.put(
  '/admin/user_access/:userId',
  auth.verify,
  auth.verifyIsAdmin,
  userController.setUserAsAdmin
);

module.exports = router;
