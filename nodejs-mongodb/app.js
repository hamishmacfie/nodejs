const dotenv = require("dotenv").config();
const colors = require("colors");
const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
// User Routes
app.use("/api/v1/users", require("./routes/userRoutes"));

// Goal Routes
app.use("/api/v1/goals", require("./routes/goalsRoutes"));

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
