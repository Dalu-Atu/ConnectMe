const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../Models/User");
const {
  createAccessToken,
  createRefreshToken,
} = require("../utils/tokenCreation");
const { sendVerificationEmail } = require("../utils/emailService");

exports.signIn = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    // Find user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account is deactivated. Please contact support.",
      });
    }

    // Check if account is locked due to too many failed attempts
    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res.status(423).json({
        success: false,
        message:
          "Account is temporarily locked due to too many failed attempts",
        lockUntil: user.lockUntil,
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // Increment failed login attempts
      await user.incFailedAttempts();

      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Reset failed attempts on successful login
    if (user.failedAttempts > 0) {
      await user.resetFailedAttempts();
    }

    // Generate JWT tokens
    const tokenExpiry = rememberMe ? "30d" : "24h";

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    // Store refresh token in database (for token rotation)
    user.refreshToken = refreshToken;
    user.lastLogin = new Date();
    user.loginCount = (user.loginCount || 0) + 1;
    await user.save();

    // Set HTTP-only cookie for refresh token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: rememberMe ? 60 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000, // 60 days or 7 days
    });

    // Log successful sign-in
    console.log(`User ${user.email} signed in successfully at ${new Date()}`);

    // Prepare user data (exclude sensitive information)
    const userData = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      avatar: user.avatar,
      preferences: user.preferences,
      lastLogin: user.lastLogin,
    };

    res.status(200).json({
      success: true,
      message: "Sign-in successful",
      data: {
        user: userData,
        accessToken,
        expiresIn: tokenExpiry,
      },
    });
  } catch (error) {
    console.error("Sign-in error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error during sign-in",
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    const { email, password, firstName, lastName, role = "user" } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    // Generate email verification token
    const emailVerificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create new user
    const newUser = new User({
      email: email.toLowerCase().trim(),
      password: password, // Will be hashed by pre-save middleware
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      role: role,
      emailVerificationToken,
      emailVerificationExpires,
      isEmailVerified: false,
      preferences: {
        theme: "light",
        notifications: {
          email: true,
          push: true,
        },
        language: "en",
      },
    });
    newUser.googleId = newUser._id;
    // Save user to database
    await newUser.save();

    // Generate JWT tokens
    const accessToken = createAccessToken(newUser);
    const refreshToken = createRefreshToken(newUser);
    newUser.refreshToken = refreshToken;
    newUser.loginCount = 0;
    newUser.lastLogin = new Date();
    await newUser.save();

    // Set HTTP-only cookie for refresh token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Log successful signup
    console.log(`New user registered: ${newUser.email} at ${new Date()}`);

    const userData = {
      id: newUser._id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: newUser.role,
      avatar: newUser.avatar,
      preferences: newUser.preferences,
      isEmailVerified: newUser.isEmailVerified,
      createdAt: newUser.createdAt,
    };

    await sendVerificationEmail(newUser.email, emailVerificationToken);

    res.status(201).json({
      success: true,
      message:
        "Account created successfully. Please check your email to verify your account.",
      data: {
        user: userData,
        accessToken,
        expiresIn: "24h",
        requiresEmailVerification: true,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during signup",
    });
  }
};
// controllers/authController.js

exports.getCurrentUser = async (req, res) => {
  try {
    // Assuming req.user is populated by an auth middleware (like verifyToken)
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    res.status(200).json({
      success: true,
      user: req.user, // this should be safe, filtered user data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get current user",
    });
  }
};

exports.googleCallback = (req, res) => {
  try {
    // User is set on req.user by passport after successful OAuth
    const user = req.user;

    // Create tokens
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    // Save refreshToken to DB (optional)
    user.refreshToken = refreshToken;
    user.save();

    // Set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true only in prod with HTTPS
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Redirect to frontend dashboard or home page
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  } catch (error) {
    console.error("Google OAuth callback error:", error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`);
  }
};

// Email verification function
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Provide 6 digit code sent to your email",
      });
    }

    // Find user by verification token
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    // Mark email as verified
    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpires = null;
    await user.save();

    const accessToken = createAccessToken(user);
    console.log(`Email verified for user: ${user.email} at ${new Date()}`);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user,
      accessToken,
    });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during email verification",
    });
  }
};

// Resend verification email function
exports.resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    // Generate new verification token
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");
    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.emailVerificationToken = emailVerificationToken;
    user.emailVerificationExpires = emailVerificationExpires;
    await user.save();

    // TODO: Send verification email
    // await sendVerificationEmail(user.email, emailVerificationToken);

    console.log(`Verification email resent to: ${user.email} at ${new Date()}`);

    res.status(200).json({
      success: true,
      message: "Verification email sent successfully",
    });
  } catch (error) {
    console.error("Resend verification email error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while resending verification email",
    });
  }
};
