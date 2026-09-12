import express from "express";
import Location from "./models/location.js";

const router = express.Router();
let inMemoryLocations = [
  { _id: "loc_1", userId: "user_default", lat: 30.3564, lng: 76.3647, name: "Thapar University, Patiala", address: "Patiala, Punjab, India", accuracy: 15, createdAt: new Date() }
];

router.get("/", (req, res) => {
  res.json({ success: true, message: "Location API is operational" });
});

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
    try {
      saved = await Location.findOneAndUpdate(
        { userId: locData.userId },
        locData,
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
    } catch (dbErr) {
      const existingIdx = inMemoryLocations.findIndex(l => l.userId === locData.userId);
      if (existingIdx >= 0) {
        inMemoryLocations[existingIdx] = { ...inMemoryLocations[existingIdx], ...locData };
        saved = inMemoryLocations[existingIdx];
      } else {
        saved = { _id: "loc_" + Date.now(), ...locData, createdAt: new Date() };
        inMemoryLocations.unshift(saved);
      }
    }

    return res.json({
      success: true,
      message: "Location updated successfully",
      location: saved
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/latest", async (req, res) => {
  try {
    const latest = await Location.findOne().sort({ updatedAt: -1, createdAt: -1 });
    if (latest) return res.json({ success: true, location: latest });
  } catch (e) {}
  return res.json({ success: true, location: inMemoryLocations[0] });
});

router.get("/all", async (req, res) => {
  try {
    const locations = await Location.find().sort({ updatedAt: -1, createdAt: -1 }).limit(100);
    return res.json({ success: true, count: locations.length, locations });
  } catch (err) {
    return res.json({ success: true, count: inMemoryLocations.length, locations: inMemoryLocations });
  }
});

export default router;
