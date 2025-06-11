const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

const startServer = async () => {
  const port = process.env.PORT || 5000;

  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1); // Exit with failure
  }
};

startServer();
