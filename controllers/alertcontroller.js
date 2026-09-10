import mongoose from "mongoose";
import Alert from "../models/alert.js";

// In-memory fallback alerts if MongoDB is offline
const inMemoryAlerts = [
  { _id: "alert_1", message: "Flash Flood Warning: Water levels rising near Bhakra Canal bypass.", category: "Flash Flood Warning", priority: "high", timestamp: new Date() },
  { _id: "alert_2", message: "Medical Relief Camp active at Community Health Center.", category: "Medical Camp", priority: "medium", timestamp: new Date() },
  { _id: "alert_3", message: "Sirhind-Patiala Highway cleared for emergency supply vehicles.", category: "Route Advisory", priority: "low", timestamp: new Date() }
];

export const getAlerts = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const alerts = await Alert.find().sort({ timestamp: -1 });
      return res.status(200).json({ success: true, alerts });
    }
    return res.status(200).json({ success: true, alerts: inMemoryAlerts });
  } catch (error) {
    return res.status(200).json({ success: true, alerts: inMemoryAlerts });
  }
};

export const addAlert = async (req, res) => {
  try {
    const { message, category, priority } = req.body;
    let alert;

    if (mongoose.connection.readyState === 1) {
      alert = await Alert.create({ message, category, priority: priority || "low" });
    } else {
      alert = {
        _id: "alert_" + Date.now(),
        message,
        category: category || "General Alert",
        priority: priority || "low",
        timestamp: new Date()
      };
      inMemoryAlerts.unshift(alert);
    }

    // 🔴 REAL-TIME PUSH VIA WEBSOCKET
    const wss = req.app.get("wss");
    if (wss) {
      wss.clients.forEach(client => {
        if (client.readyState === 1) {
          client.send(JSON.stringify({
            type: "NEW_ALERT",
            payload: alert
          }));
        }
      });
    }

    res.status(201).json({ success: true, alert });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || "Error creating alert" });
  }
};
