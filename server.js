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
import tinyfishRoutes from "./routes/tinyfishroutes.js";

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
app.use("/api/tinyfish", tinyfishRoutes);

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

// Explicit route for all HTML views so serverless and cloud hosting never 404
app.get("/:page.html", (req, res, next) => {
  const filePath = path.join(__dirname, `${req.params.page}.html`);
  res.sendFile(filePath, (err) => {
    if (err) next();
  });
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

// In Vercel serverless environment, do not start standalone listener or WebSocket server
if (!process.env.VERCEL) {
  const server = app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`🚀 Sahayta Server is running!`);
    console.log(`🔗 Web Application: http://localhost:${PORT}`);
    console.log(`🔗 Dashboard: http://localhost:${PORT}/crisis_dashboard_homepage.html`);
    console.log(`=========================================`);
  });

  /* =======================
     WEBSOCKET SERVER (EMERGENCY BROADCAST & CHAT)
  ======================= */
  const wss = new WebSocketServer({ server });
  app.set("wss", wss);

  wss.on("connection", (ws, req) => {
    console.log("🟢 Client connected to Emergency Broadcast WebSocket");
    ws.send(JSON.stringify({ 
      type: "SYSTEM", 
      message: "Connected to Sahayta Emergency Mesh Network",
      timestamp: new Date().toLocaleTimeString()
    }));

    ws.on("message", (rawMessage) => {
      try {
        const dataStr = rawMessage.toString();
        let parsed;
        try {
          parsed = JSON.parse(dataStr);
        } catch (e) {
          parsed = {
            type: "CHAT_MESSAGE",
            text: dataStr,
            sender: "Responder",
            time: new Date().toLocaleTimeString()
          };
        }

        // Broadcast to all connected clients
        wss.clients.forEach((client) => {
          if (client.readyState === 1) { // 1 = OPEN
            client.send(JSON.stringify(parsed));
          }
        });
      } catch (err) {
        console.warn("WebSocket message handling error:", err.message);
      }
    });

    ws.on("error", (err) => {
      console.warn("WebSocket client error:", err.message);
    });

    ws.on("close", () => {
      console.log("🔴 Client disconnected from WebSocket");
    });
  });
}

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

export default app;
