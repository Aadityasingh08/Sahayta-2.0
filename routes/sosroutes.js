import express from "express";
import mongoose from "mongoose";
import Sos from "../models/sos.js";

const router = express.Router();
const inMemorySos = [];

function computeAiTriageScore(desc, emergency) {
  const text = `${desc || ""} ${emergency || ""}`.toLowerCase();
  const critical = ["trapped", "paani", "flood", "injured", "bleeding", "unconscious", "heart", "fire", "drowning", "collapse", "chhat", "madad"];
  const high = ["pregnant", "elderly", "bacha", "child", "baby", "medicine", "insulin", "food", "water"];

  if (critical.some(k => text.includes(k))) {
    return { priority: "critical", score: 98, level: "🔴 CRITICAL", label: "Immediate Rescue Unit Required" };
  } else if (high.some(k => text.includes(k))) {
    return { priority: "high", score: 85, level: "🟠 HIGH", label: "Vulnerable Group / Medical Aid" };
  } else {
    return { priority: "medium", score: 55, level: "🟡 MEDIUM", label: "Standard Relief Assistance" };
  }
}

/* GET ALL SOS */
router.get("/", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const sos = await Sos.find().sort({ createdAt: -1 });
      return res.json({ success: true, sos });
    }
    return res.json({ success: true, sos: inMemorySos });
  } catch (err) {
    return res.json({ success: true, sos: inMemorySos });
  }
});

/* CREATE SOS */
router.post("/", async (req, res) => {
  try {
    const {
      phone,
      emergency,
      description,
      latitude,
      longitude,
      address
    } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Location required"
      });
    }

    const aiTriage = computeAiTriageScore(description, emergency);

    let sos;
    if (mongoose.connection.readyState === 1) {
      sos = await Sos.create({
        phone: phone || "NA",
        emergency: emergency || "general",
        description,
        latitude,
        longitude,
        address
      });
    } else {
      sos = {
        _id: "sos_" + Date.now(),
        phone: phone || "NA",
        emergency: emergency || "general",
        description,
        latitude,
        longitude,
        address,
        aiTriage,
        createdAt: new Date()
      };
      inMemorySos.unshift(sos);
    }

    // Broadcast if WebSocket available
    const wss = req.app.get("wss");
    if (wss) {
      wss.clients.forEach(client => {
        if (client.readyState === 1) {
          client.send(JSON.stringify({
            type: "NEW_ALERT",
            payload: {
              title: `${aiTriage.level} SOS: ${sos.emergency || "Emergency"}`,
              description: sos.description || "Emergency SOS broadcast activated",
              severity: aiTriage.priority,
              aiScore: aiTriage.score,
              location: sos.address || `Lat: ${sos.latitude}, Lng: ${sos.longitude}`
            }
          }));
        }
      });
    }

    res.status(201).json({
      success: true,
      message: "SOS created and AI triaged successfully",
      aiTriage,
      sos
    });

  } catch (err) {
    console.error("❌ SOS ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
