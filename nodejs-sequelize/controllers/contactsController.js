const express = require("express");
const router = express();

const getAllResults = async (req, res) => {
  res.send("This is all results");
};

module.exports = {
  getAllResults,
};
