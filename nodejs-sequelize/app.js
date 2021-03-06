const dotenv = require("dotenv").config();
const express = require("express");
const { router } = require("./routes/router");

const app = express();

const PORT = process.env.PORT || 3030;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Default page for the API");
});
app.use("/api/v1", require("./routes/router"));
app.use("/api/v1/events", require("./routes/eventsRouter"));

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
