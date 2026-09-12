# 🚨 Sahayta 2.0 (सहायता 2.0) — Next-Gen AI Hyperlocal Crisis Response Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Backend-Express.js-blue.svg)](https://expressjs.com/)
[![Language: Bilingual](https://img.shields.io/badge/Language-English%20%26%20%E0%A4%B9%E0%A4%BF%E0%A4%82%E0%A4%A6%E0%A5%80-orange.svg)](#-full-bilingual-support)
[![Theme](https://img.shields.io/badge/Theme-Dark%20%26%20Light%20Modes-blueviolet.svg)](#-theme-engine)
[![Offline Ready](https://img.shields.io/badge/Mesh-P2P%20%26%20Zero--Internet-success.svg)](#-offline-mesh-network)

> **Sahayta 2.0 (सहायता 2.0)** is an intelligent, hyperlocal disaster management and emergency coordination platform designed to save lives during natural calamities and crises with real-time AI triage, offline P2P mesh resiliency, live GPS nearest-facility routing, bilingual Indic support, and multi-tier trust verification.

---

## 🌟 Major Core Features & Innovations

### 1. 🏥 100% Operational Nearest Emergency Resource Engine & Polyline Routing
- **Instant Multi-Category Finder**: Rapidly discovers and plots the closest:
  - 🏥 **Hospitals & Trauma Centers**
  - ⛺ **Emergency Shelters & Relief Camps**
  - 🍲 **Food & Community Langar Distribution Hubs**
  - 🚓 **Police Stations & First Responder Units**
  - 🩸 **Emergency Blood Banks & Medical Oxygen Depots**
  - 🤝 **NGO Relief Fleets & Volunteer Teams**
- **Live Polyline Routing**: High-visibility dashed routing line plotted directly between the user's location and the nearest facility.
- **1-Click Google Turn-by-Turn GPS**: Direct driving directions via Google Maps API.
- **Hyper-Local Dynamic Synthesis**: Automatically synthesizes realistic nearest facilities anywhere in India or globally (within 0.8 km - 2.5 km) based on live user GPS coordinates.

---

### 2. 🌐 Full Bilingual Language Engine (English & हिंदी)
- Complete, seamless one-tap switching between **English** and **हिंदी (Hindi)** across all pages, navigation menus, badges, triage feeds, modals, and emergency alerts.
- Persistent language preference saved in `localStorage`.
- Real-time reactive updates across all dynamic UI components.

---

### 3. 📍 Interactive Hyperlocal Location Engine & GPS Auto-Detection
- **Live GPS Auto-Detect**: High-accuracy satellite positioning via HTML5 Geolocation API.
- **Custom Text & Area Search**: Ability to type and set any custom location (e.g. *Patiala, Delhi, Shakarpur, Mumbai, Jaipur*).
- **Quick Hub Selector**: 1-click select for major disaster hubs across India.
- **Automatic Reverse-Geocoding**: Translates raw GPS latitude/longitude into human-readable street and city addresses.

---

### 4. 🚑 Volunteer & NGO Rescue Fleet Dispatch System
- Real-time field personnel allocation and skill tracking.
- Categorized unit filters:
  - 🚤 **NDRF Water & Boat Units** (Flood rescue)
  - 🚑 **Medical / Ambulance Teams**
  - 📻 **Civil Defense HAM Radio Relay Operators**
  - 🚜 **4x4 Off-Road Vehicle Teams**
- 1-tap **"Dispatch to Target"** and interactive Volunteer Registration Modal.

---

### 5. 🩸 Emergency Blood, Oxygen & ICU Bed Live Tracker
- Live verified inventory of life-support medical supplies:
  - **Blood Bank Reserves** (O+, A+, B+, and rare O- units)
  - **Medical Oxygen Cylinders** (Type D 46.7L cylinders ready for dispatch)
  - **Critical Care ICU Bed Availability & Ventilators**
- Instant one-tap emergency reservation modal with hospital coordination hotline.

---

### 6. 📡 Zero-Internet P2P Offline Mesh Network & Morse Audio Siren
- **Peer-to-Peer Communication**: Connects neighboring nodes via WebRTC Data Channels and BroadcastChannel API without cellular internet.
- **Web Audio API Morse SOS Siren**: Emits high-decibel acoustic emergency alarm (`... --- ...`) through device speakers.
- **SMS Fallback Broadcast**: Formats emergency GPS distress SMS to pre-configured disaster response helplines (`112` / `1077`).

---

### 7. 📋 Interactive Resource Directory Locator
- **Dynamic Live Distances**: Recalculates real-time distance (`Nearest: X.X km away`) for every category card based on active location.
- **One-Tap Nearest Action Bar**: Instant direct routing buttons for Hospital, Shelter, Food, Police, and Blood Bank.
- **Dynamic Sorting**: Sort resources by **Distance (Nearest First)**, **Availability**, and **Name**.
- **1-Click Card Navigation**: Direct **"🗺️ View on Map"** and **"🚗 Google GPS"** on every listing.

---

### 8. 🌓 High-Contrast Dark & Light Mode Theme Engine
- Universal theme toggle on all headers and floating toolbars.
- High-contrast emergency accessibility styling:
  - Light mode: Crisp `#0f172a` typography with soft borders.
  - Dark mode: Deep slate `#0f172a` backdrop with vibrant translucent badges (`#93c5fd`, `#6ee7b7`, `#fde68a`, `#fca5a5`) to ensure complete legibility in night rescue operations.

---

### 9. 🆘 AI Emergency Priority Triage Score & Live Alert Stream
- NLP-driven triage score engine (1-100):
  - 🔴 **Critical Priority (90-100)**: Structural collapse, trapped individuals.
  - 🟠 **High Priority (70-89)**: Infants, elderly, oxygen shortage.
  - 🟡 **Medium Priority (40-69)**: Supply requests, road blockages.
- Multi-tier verification badges (`UNVERIFIED` ➔ `COMMUNITY VERIFIED` ➔ `NGO VERIFIED` ➔ `AUTHORITY VERIFIED`).

---

### 10. 👨‍👩‍👧 Family Safety Circle Widget
- Instant one-tap safety status check-in (*"I am Safe"* / *"Needs Help"*).
- Visual family location tracker and emergency broadcast alerts.

---

## 📂 Project Architecture

```
Sahayta2.0/
├── controllers/                   # Express controllers (auth, SOS, alerts, resources)
├── routes/                        # Modular Express REST API routes
├── models/                        # In-memory & schema data models
├── css/
│   ├── theme.css                  # Universal Dark/Light mode engine & utility styling
│   └── main.css                   # Core responsive layout styles
├── lang.js                        # Bilingual (English & Hindi) translation engine
├── location.js                    # Interactive GPS & custom location manager
├── theme.js                       # Theme persistence & switcher script
├── server.js                      # Express backend API server & static file host
├── START_SAHAYTA.bat              # 1-Click launcher script for Windows
├── PUSH_TO_GITHUB.bat             # Automated GitHub synchronization script
├── crisis_dashboard_homepage.html # Main citizen & authority command dashboard
├── live_crisis_intelligence_map.html # Interactive tactical map & nearest router
├── resource_directory_locator.html# Searchable resource directory with live distances
├── offline_mesh_network.html      # Zero-internet P2P mesh & Morse siren communicator
├── communication_verification_centre.html # Trust verification & community intelligence
├── emergency_prepared_academy.html# Disaster preparedness guides & drills
├── sos_emergency_activation.html  # Voice & 1-tap SOS distress trigger
├── auth.html                      # Authentication & session portal
└── package.json                   # Project dependencies & scripts
```

---

## ⚡ Quick Start Guide

### Option 1: One-Click Launch (Windows)
Double-click **`START_SAHAYTA.bat`** in the project root:
1. Automatically verifies dependencies.
2. Starts the Node.js Express server on port `5000`.
3. Opens `http://localhost:5000` in your default browser.

---

### Option 2: Manual Setup (Any OS - Linux / macOS / Windows)

1. **Clone the Repository:**
```bash
git clone https://github.com/Aadityasingh08/Sahayta-2.0.git
cd Sahayta-2.0
```

2. **Install Node.js Dependencies:**
```bash
npm install
```

3. **Start the Platform:**
```bash
node server.js
```

4. **Open in Browser:**
Navigate to `http://localhost:5000` or `http://127.0.0.1:5000`.

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/resources` | Fetch all disaster resources with coordinates |
| `POST` | `/api/resources` | Register a new emergency facility |
| `GET` | `/api/sos` | Get live SOS emergency requests queue |
| `POST` | `/api/sos` | Dispatch a new SOS distress alert with GPS telemetry |
| `GET` | `/api/location` | Get active user location state |
| `POST` | `/api/location` | Set / update custom GPS coordinates |
| `GET` | `/api/alerts` | Stream verified disaster alerts & AI triage feed |

---

## 🛡️ License & Acknowledgements

- **License**: MIT License. Open-source and built for humanitarian disaster relief.
- **Built with**: Leaflet.js, OpenStreetMap, Web Audio API, WebRTC, Tailwind-compatible CSS Tokens, and Express.js.

---

## 👨‍💻 Author & Lead Architect

**Made with ❤️ by Aditya Singh**  
- **GitHub**: [@Aadityasingh08](https://github.com/Aadityasingh08)  
- **LinkedIn**: [Aditya Singh](https://www.linkedin.com/in/aditya-singh-392b9934b/)  
- **Project**: Sahayta 2.0 (सहायता 2.0) Crisis Response Platform

---

## 🤝 Contributors

- **Antigravity (Google DeepMind)** — Advanced Autonomous AI Engineering & Pair Programming Agent


