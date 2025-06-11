const rateLimit = require("express-rate-limit");

const createLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      message,
      retryAfter: Math.ceil(windowMs / 60000) + " minutes",
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

const authLimiter = createLimiter(
  15 * 60 * 1000, // 15 minutes
  5, // 5 attempts
  "Too many authentication attempts, please try again later"
);

const generalLimiter = createLimiter(
  15 * 60 * 1000, // 15 minutes
  100, // 100 requests
  "Too many requests, please try again later"
);

module.exports = {
  authLimiter,
  generalLimiter,
};

const requestLogger = (req, res, next) => {
  const start = Date.now();

  // Override res.end to capture response time
  const originalEnd = res.end;
  res.end = function (...args) {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`
    );
    originalEnd.apply(this, args);
  };

  next();
};

module.exports = requestLogger;

// ===========================================
// middleware/index.js (Main export file)
// ===========================================
const auth = require("./auth");
const validation = require("./validation");
const security = require("./security");
const error = require("./error");
const requestLogger = require("./logging/requestLogger");

module.exports = {
  // Auth middlewares
  ...auth,

  // Validation middlewares
  validation,

  // Security middlewares
  ...security,

  // Error middlewares
  ...error,

  // Logging
  requestLogger,
};
