import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";

// Route imports
import authRoutes from "./routes/authroutes.js";
import sosRoutes from "./routes/sosroutes.js";
import locationRoutes from "./routes/locationroutes.js";
import resourceRoutes from "./routes/resourceroutes.js";
import alertRoutes from "./routes/alertroutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* =======================
   MIDDLEWARE
======================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets and HTML files from current directory and css subfolder
app.use(express.static(__dirname));
app.use("/css", express.static(path.join(__dirname, "css")));

// Request logger (debugging)
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

/* =======================
   API ROUTES
======================= */
app.use("/api/auth", authRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/alerts", alertRoutes);

// DB Health Check
app.get("/api/db-check", (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.status(200).json({
    success: true,
    mongoConnected: isConnected,
    message: isConnected ? "✅ Backend & MongoDB connected" : "⚠️ Running in standalone/in-memory mode (MongoDB offline)"
  });
});

/* =======================
   ROOT & FALLBACK ROUTE
======================= */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

/* =======================
   GLOBAL ERROR HANDLER
======================= */
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

/* =======================
   START SERVER
======================= */
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 Sahayta Server is running!`);
  console.log(`🔗 Web Application: http://localhost:${PORT}`);
  console.log(`🔗 Dashboard: http://localhost:${PORT}/crisis_dashboard_homepage.html`);
  console.log(`=========================================`);
});

/* =======================
   WEBSOCKET SERVER
======================= */
const wss = new WebSocketServer({ server });
app.set("wss", wss);

wss.on("connection", (ws) => {
  console.log("🟢 Client connected to Live Alerts WebSocket");
  ws.send(JSON.stringify({ type: "INFO", message: "Connected to Sahayta Live Broadcast" }));

  ws.on("close", () => {
    console.log("🔴 Client disconnected");
  });
});

/* =======================
   MONGODB CONNECTION (NON-BLOCKING)
======================= */
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/sahayta";
mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 3000 })
  .then(() => {
    console.log("✅ MongoDB Connected successfully");
  })
  .catch((error) => {
    console.warn("ℹ️ MongoDB Connection Info: MongoDB is not running locally. Using in-memory fallback store so app works seamlessly!");
  });
