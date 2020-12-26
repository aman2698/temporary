const express = require("express");
const {
  register,
  login,
  logout,
  confirmEmail,
  getMe,
  forgotPassword,
  resetPassword,
  ContactDetail,
  updatePassword,
  businessProfile,
  updateImage,
  createVendor,
  deleteVendor,
  getVendor,
  createOperation,
  deleteOperation,
  getOperation,
  getAll
} = require("../controllers/auth");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);
router.put("/updatepassword", protect, updatePassword);
router.get("/me", protect, getMe);
router.get("/getall", protect, getAll);

router.get("/confirmemail", confirmEmail);

module.exports = router;
