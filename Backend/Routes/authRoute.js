const express = require("express");
const {
  signIn,
  signUp,
  googleCallback,
  verifyEmail,
} = require("../Controllers/authController");
const {
  signUpValidation,
  signInValidation,
  runValidation,
} = require("../middlewares/validation/validation");
const router = express.Router();
const passport = require("../config/passport");

router.post("/signup", signUpValidation, runValidation, signUp);
router.post("/signin", signInValidation, runValidation, signIn);
router.post("/verify-email", verifyEmail);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleCallback
);

module.exports = router;
