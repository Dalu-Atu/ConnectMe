const express = require("express");
const cors = require("cors");
const passport = require("./config/passport");
const authRoute = require("./Routes/authRoute"); // Comment this out temporarily

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
  })
);

app.use(express.json());
app.use(passport.initialize());

// Comment out the auth route temporarily
app.use("/api/v1/auth", authRoute);

module.exports = app;
