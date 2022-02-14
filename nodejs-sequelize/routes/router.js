const express = require("express");
const router = express.Router();

const { getAllResults } = "../controllers/contactsController.js";

router.get("/", (req, res) => {
  res.json({ message: "API working" });
});

module.exports = router;
