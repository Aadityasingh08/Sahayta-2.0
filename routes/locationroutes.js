import express from "express";
import mongoose from "mongoose";
import Location from "../models/location.js";

const router = express.Router();
let inMemoryLocations = [
  { _id: "loc_1", userId: "user_default", lat: 30.3564, lng: 76.3647, name: "Thapar University, Patiala", address: "Patiala, Punjab, India", accuracy: 15, createdAt: new Date() }
];

/* TEST */
router.get("/", (req, res) => {
  res.json({ success: true, message: "Location API is operational" });
});

/* SAVE OR UPDATE LOCATION */
router.post("/save", async (req, res) => {
  try {
    const { lat, lng, name, address, userId, accuracy } = req.body;

    if (lat === undefined || lng === undefined || lat === null || lng === null) {
      return res.status(400).json({ success: false, message: "Valid latitude & longitude required" });
    }

    const numLat = parseFloat(lat);
    const numLng = parseFloat(lng);

    if (isNaN(numLat) || isNaN(numLng)) {
      return res.status(400).json({ success: false, message: "Latitude and longitude must be numbers" });
    }

    const locData = {
      userId: userId || "user_" + (req.ip || "anon").replace(/[^a-zA-Z0-9]/g, ""),
      lat: numLat,
      lng: numLng,
      name: name || address || "User Location",
      address: address || "",
      accuracy: accuracy || 10,
      updatedAt: new Date()
    };

    let saved;
    if (mongoose.connection.readyState === 1) {
      saved = await Location.findOneAndUpdate(
        { userId: locData.userId },
        locData,
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
    } else {
      const existingIdx = inMemoryLocations.findIndex(l => l.userId === locData.userId);
      if (existingIdx >= 0) {
        inMemoryLocations[existingIdx] = { ...inMemoryLocations[existingIdx], ...locData };
        saved = inMemoryLocations[existingIdx];
      } else {
        saved = { _id: "loc_" + Date.now(), ...locData, createdAt: new Date() };
        inMemoryLocations.unshift(saved);
      }
    }

    // Broadcast if WebSocket available
    const wss = req.app.get("wss");
    if (wss) {
      wss.clients.forEach(client => {
        if (client.readyState === 1) {
          client.send(JSON.stringify({
            type: "LOCATION_UPDATE",
            payload: saved
          }));
        }
      });
    }

    return res.json({
      success: true,
      message: "Location updated successfully",
      location: saved
    });

  } catch (err) {
    console.error("Location Save Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/* GET LATEST USER LOCATION */
router.get("/latest", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const latest = await Location.findOne().sort({ updatedAt: -1, createdAt: -1 });
      if (latest) return res.json({ success: true, location: latest });
    }
    const latestMem = inMemoryLocations[0] || { lat: 30.3564, lng: 76.3647, address: "Patiala, Punjab", name: "Patiala" };
    return res.json({ success: true, location: latestMem });
  } catch (err) {
    return res.json({ success: true, location: inMemoryLocations[0] || { lat: 30.3564, lng: 76.3647, address: "Patiala, Punjab" } });
  }
});

/* GET ALL LOCATIONS */
router.get("/all", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const locations = await Location.find().sort({ updatedAt: -1, createdAt: -1 }).limit(100);
      return res.json({ success: true, count: locations.length, locations });
    }
    return res.json({ success: true, count: inMemoryLocations.length, locations: inMemoryLocations });
  } catch (err) {
    return res.json({ success: true, count: inMemoryLocations.length, locations: inMemoryLocations });
  }
});

export default router;
