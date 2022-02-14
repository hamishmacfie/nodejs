const dotenv = require("dotenv");
dotenv.config({ path: "./config/envConfig.env" });
const express = require("express");

const app = express.Router();

const PORT = process.env.PORT || 3000;

// Routes
app.get("/", (req, res) => {
  res.send("Working");
});

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
