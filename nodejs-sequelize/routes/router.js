const express = require("express");
const router = express.Router();

const { getAllResults } = require("../controllers/contactsController.js");

router.get("/", getAllResults);

module.exports = router;
