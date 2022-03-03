const express = require("express");
const router = express();

const {
  getAllEvents,
  addEvent,
  deleteEvent,
} = require("../controllers/eventsController.js");

router.route("/").get(getAllEvents);
router.route("/add").post(addEvent);
router.route("/delete/:id").delete(deleteEvent);

module.exports = router;
