const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  updateUserRole,
} = require("../controller/userController");
// const {isAuthenticatedUser , adminRoles} = require('../middleware/Auth')

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/forgot/reset/:token").put(resetPassword);

router.route("/password/update").put(updatePassword);
// router.route('/password/update').put(isAuthenticatedUser , updatePassword)

router.route("/me").get(getUserDetails);
// router.route('/me').get(isAuthenticatedUser, getUserDetails)

router.route("/me/update").put(updateProfile);
// router.route('/me/update').put(isAuthenticatedUser, updateProfile)

router.route("/admin/users").get(getAllUser);
// router.route('/admin/users').get(isAuthenticatedUser , adminRoles('admin'), getAllUser)

// router.route('/admin/user/:id')
//     .get(isAuthenticatedUser, adminRoles('admin'), getSingleUser)
//     .put(isAuthenticatedUser, adminRoles('admin'), updateUserRole)
//     .delete(isAuthenticatedUser, adminRoles('admin'), deleteUser)

module.exports = router;
