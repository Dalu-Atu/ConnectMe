const jwt = require("jsonwebtoken");

const createAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
      issuer: process.env.APP_NAME,
      audience: "users",
    }
  );
};

const createRefreshToken = (user) => {
  return jwt.sign(
    { userId: user._id, type: "refresh" },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports = { createAccessToken, createRefreshToken };
