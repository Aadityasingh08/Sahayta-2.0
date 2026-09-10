import express from "express";
import mongoose from "mongoose";
import Location from "../models/location.js";

const router = express.Router();
const inMemoryLocations = [
  { _id: "loc_1", lat: 30.3564, lng: 76.3647, name: "Thapar University, Patiala", createdAt: new Date() }
];

/* TEST */
router.get("/", (req, res) => {
  res.json({ success: true, message: "Location API working" });
});

/* SAVE LOCATION */
router.post("/save", async (req, res) => {
  try {
    const { lat, lng, name } = req.body;

    if (lat === undefined || lng === undefined) {
      return res.status(400).json({ success: false, message: "lat & lng required" });
    }

    let saved;
    if (mongoose.connection.readyState === 1) {
      saved = await Location.create({ lat, lng, name: name || "User Location" });
    } else {
      saved = { _id: "loc_" + Date.now(), lat, lng, name: name || "User Location", createdAt: new Date() };
      inMemoryLocations.unshift(saved);
    }

    res.json({
      success: true,
      message: "Location saved",
      location: saved
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* GET ALL LOCATIONS */
router.get("/all", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const locations = await Location.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: locations.length, locations });
    }
    return res.json({ success: true, count: inMemoryLocations.length, locations: inMemoryLocations });
  } catch (err) {
    return res.json({ success: true, count: inMemoryLocations.length, locations: inMemoryLocations });
  }
});

export default router;
