const asyncHandler = require("express-async-handler");
const Events = require("../models/Events");
const { Op } = require("sequelize");

const getAllEvents = asyncHandler(async (req, res) => {
  try {
    const data = await Events.findAll();
    if (!data) {
      res.status(400).json({ message: "Sorry, no events" });
    }
    res.status(200).json(data);
  } catch (error) {}
});

const addEvent = asyncHandler(async (req, res) => {
  const { title, start, end, category_id } = req.body;
  if (!start) {
    return res.status(400).json({ message: "Please enter a start date" });
  }

  const newEvent = await Events.create({
    title,
    start: new Date(start),
    end: new Date(end),
    category_id,
  });
  res.status(201).json({ message: newEvent.title + " added" });
});

const deleteEvent = asyncHandler(async (req, res) => {
  const deleteEvent = await Events.findByPk(req.params.id);
  if (!deleteEvent) {
    res.status(400).json({ message: "No event found!" });
  } else {
    await Events.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Event deleted" });
  }
});

module.exports = {
  getAllEvents,
  addEvent,
  deleteEvent,
};
