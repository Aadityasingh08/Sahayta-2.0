# 🚨 Sahayta 2.0 (सहायता 2.0) — Next-Gen AI Hyperlocal Crisis Response Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Backend-Express.js-blue.svg)](https://expressjs.com/)
[![Theme](https://img.shields.io/badge/Theme-Dark%20%26%20Light%20Modes-blueviolet.svg)](#-theme-toggle)

> **Sahayta 2.0** is an intelligent, hyperlocal disaster management and emergency coordination platform designed to save lives during natural calamities and crises with real-time AI triage, offline resiliency, voice activation, and multi-tier trust verification.

---

## 🌟 Key Super Features

### 1. 🆘 AI Emergency Priority Triage Score
- Automatically calculates real-time priority using NLP and symptom analysis:
  - 🔴 **Critical Priority (90-100)**: Severe injuries, structural collapse, trapped individuals.
  - 🟠 **High Priority (70-89)**: Elderly, infants, pregnant women, medical emergencies.
  - 🟡 **Medium Priority (40-69)**: Supply shortages, displacement, stranded.
  - 🟢 **Low Priority (1-39)**: General queries, non-urgent reports.

### 2. 📍 Hyperlocal Live Disaster Map
- Interactive geospatial dashboard tracking:
  - 🏠 Safe Shelters & Capacity
  - 🏥 Hospitals & Emergency ICUs
  - 🍱 Food & Clean Water Distribution Hubs
  - 🚧 Blocked Roads & Active Danger Zones
  - 🆘 Real-Time Live SOS Geofenced Beacons

### 3. 🎙️ Multilingual Indic Voice SOS
- One-tap hands-free speech emergency dispatcher supporting:
  - **Hindi (हिंदी)**: *"मुझे तुरंत मदद चाहिए, पानी भर गया है"*
  - **English**, **Bengali**, **Tamil**, **Marathi**, etc.
  - Real-time Speech-to-Text conversion with keyword extraction and automated geo-tagging.

### 4. 🛡️ 4-Stage Trust Verification Layer & AI Rumour Detector
- Combats misinformation during disasters with a real-time credibility badge system:
  - `UNVERIFIED` ➔ `COMMUNITY VERIFIED (3+ citizens)` ➔ `NGO VERIFIED` ➔ `AUTHORITY VERIFIED`
  - Automated rumor & hoax cross-verification score.

### 5. 👨‍👩‍👧 Family Safety Circle & Offline Beacon
- Instant one-click status broadcast: *"I AM SAFE"* / *"NEED HELP"*.
- Offline browser storage and fallback coordination for intermittent internet connectivity.

### 6. 🌓 Seamless Dark & Light Themes
- Smooth dynamic theme switcher on all pages with persistent user preference storage.
- High-contrast emergency accessibility styling for night operations and bright daylight readability.

---

## 📂 Project Structure

```
Sahayta2.0/
├── controllers/          # Express route controllers (auth, SOS, alerts, resources)
├── routes/               # Modular REST API endpoints
├── models/               # MongoDB/Mongoose data schemas & In-Memory Offline DB
├── css/                  # Styling system (main.css, tailwind.css, theme.css)
├── theme.js              # Universal Dark/Light mode engine
├── server.js             # Node.js Express server + API Gateway
├── START_SAHAYTA.bat     # One-click Windows launch script
├── PUSH_TO_GITHUB.bat    # Automated GitHub push utility
├── crisis_dashboard_homepage.html
├── sos_emergency_activation.html
├── live_crisis_intelligence_map.html
├── communication_verification_centre.html
├── resource_directory_locator.html
├── emergency_prepared_academy.html
├── auth.html
└── package.json
```

---

## ⚡ Quick Start Guide

### Option 1: One-Click Launch (Windows)
Simply double-click **`START_SAHAYTA.bat`** in the root folder. It will:
1. Verify and install Node.js dependencies if needed.
2. Launch the backend server.
3. Automatically open `http://localhost:5000` in your default browser!

---

### Option 2: Manual Setup (Any OS)

1. **Clone the Repository:**
```bash
git clone https://github.com/Aadityasingh08/Sahayta-2.0.git
cd Sahayta-2.0
```

2. **Install Dependencies:**
```bash
npm install
```

3. **Start the Platform:**
```bash
node server.js
```

4. **Open in Browser:**
```
http://localhost:5000
```

---

## 👥 Built with ❤️ for Disaster Relief & Public Safety
Developed by **Aaditya Singh** & Team for hackathons and humanitarian emergency response.
