// ========================================================
// SAHAYTA 2.0 - UNIFIED LOCATION MANAGER & LIVE SYNC
// ========================================================
(function () {
  const LOC_KEY = "sahayta_user_location";

  // Default initial location (Thapar Institute, Patiala, Punjab)
  const DEFAULT_LOCATION = {
    lat: 30.3564,
    lng: 76.3647,
    name: "Patiala, Punjab",
    address: "Patiala, Punjab, India",
    accuracy: 10,
    source: "default",
    updatedAt: new Date().toISOString()
  };

  const POPULAR_HUBS = [
    { name: "Patiala, Punjab", lat: 30.3564, lng: 76.3647 },
    { name: "New Delhi (NDRF HQ)", lat: 28.6139, lng: 77.2090 },
    { name: "Chandigarh", lat: 30.7333, lng: 76.7794 },
    { name: "Mumbai, MH", lat: 19.0760, lng: 72.8777 },
    { name: "Lucknow, UP", lat: 26.8467, lng: 80.9462 },
    { name: "Jaipur, Rajasthan", lat: 26.9124, lng: 75.7873 },
    { name: "Shimla (Hill Hazards)", lat: 31.1048, lng: 77.1734 },
    { name: "Dehradun, UK", lat: 30.3165, lng: 78.0322 },
    { name: "Kolkata, WB", lat: 22.5726, lng: 88.3639 },
    { name: "Bengaluru, Karnataka", lat: 12.9716, lng: 77.5946 },
    { name: "Patna, Bihar", lat: 25.5941, lng: 85.1376 },
    { name: "Amritsar, Punjab", lat: 31.6340, lng: 74.8723 }
  ];

  function getStoredLocation() {
    try {
      const stored = localStorage.getItem(LOC_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return DEFAULT_LOCATION;
  }

  // Format short display string (e.g. "Shakarpur, Delhi" instead of 100 character full address)
  function formatShortLocation(loc) {
    if (!loc) return "Patiala, Punjab";
    if (loc.name && loc.name.length <= 28) return loc.name;
    const addr = loc.address || loc.name || "";
    const parts = addr.split(",").map(p => p.trim()).filter(Boolean);
    if (parts.length >= 2) {
      // e.g. "Shakarpur, Delhi" or "Patiala, Punjab"
      return `${parts[0]}, ${parts[parts.length > 2 ? 1 : 1]}`.substring(0, 26);
    }
    return addr.substring(0, 26);
  }

  async function reverseGeocode(lat, lng) {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14&addressdetails=1`, {
        headers: { "Accept-Language": "en" }
      });
      if (res.ok) {
        const data = await res.json();
        const suburb = data.address?.suburb || data.address?.neighbourhood || data.address?.city_district || '';
        const city = data.address?.city || data.address?.town || data.address?.county || '';
        const state = data.address?.state || '';
        const shortName = [suburb, city, state].filter(Boolean).slice(0, 2).join(", ");
        
        return {
          address: data.display_name || `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`,
          name: shortName || data.display_name?.split(",")[0] || `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`
        };
      }
    } catch (e) {
      console.warn("Reverse geocode fallback", e);
    }
    return {
      address: `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`,
      name: `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`
    };
  }

  async function saveLocation(locData, notifyBackend = true) {
    const fullLoc = {
      ...DEFAULT_LOCATION,
      ...locData,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(LOC_KEY, JSON.stringify(fullLoc));

    // Update backend API
    if (notifyBackend) {
      try {
        await fetch("/api/location/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lat: fullLoc.lat,
            lng: fullLoc.lng,
            name: fullLoc.name || fullLoc.address,
            address: fullLoc.address,
            accuracy: fullLoc.accuracy
          })
        }).catch(() => {});
      } catch (err) {
        console.warn("Location backend sync offline", err);
      }
    }

    // Update UI elements across page
    updateLocationUI(fullLoc);

    // Broadcast global event
    window.dispatchEvent(new CustomEvent("sahayta:locationchange", { detail: fullLoc }));
    return fullLoc;
  }

  function updateLocationUI(loc) {
    if (!loc) loc = getStoredLocation();
    const shortStr = formatShortLocation(loc);
    const fullStr = loc.address || loc.name || shortStr;

    // Header buttons & pills
    document.querySelectorAll(".sahayta-current-location").forEach(el => {
      el.textContent = shortStr;
      el.setAttribute("title", fullStr);
    });

    document.querySelectorAll(".loc-toggle-btn").forEach(btn => {
      btn.setAttribute("title", `Location: ${fullStr} (Click to Edit)`);
    });

    // Main Dashboard Location Card
    const dashTitle = document.getElementById("dashboard-location-title");
    if (dashTitle) {
      dashTitle.textContent = loc.name || shortStr;
    }
    const dashFull = document.getElementById("dashboard-location-address");
    if (dashFull) {
      dashFull.textContent = fullStr;
    }
    const dashCoords = document.getElementById("dashboard-location-coords");
    if (dashCoords) {
      dashCoords.textContent = `Lat: ${loc.lat.toFixed(4)}, Lng: ${loc.lng.toFixed(4)}`;
    }
    const dashTime = document.getElementById("dashboard-location-time");
    if (dashTime) {
      const isHi = window.SahaytaLang && window.SahaytaLang.getLanguage() === "hi";
      dashTime.textContent = isHi ? "अंतिम अपडेट: अभी-अभी" : "Last updated: Just now";
    }

    // Other elements
    document.querySelectorAll("#user-current-city, #sidebar-location, #location-text").forEach(el => {
      el.textContent = fullStr;
    });

    document.querySelectorAll(".sahayta-lat-lng").forEach(el => {
      el.textContent = `${loc.lat.toFixed(4)}°, ${loc.lng.toFixed(4)}°`;
    });
  }

  // Request GPS from browser
  function detectGPS(showToast = true) {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const isHi = window.SahaytaLang && window.SahaytaLang.getLanguage() === "hi";
        alert(isHi ? "आपके ब्राउज़र में जीपीएस उपलब्ध नहीं है।" : "Geolocation is not supported by your browser");
        return reject(new Error("No geolocation"));
      }

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const acc = Math.round(pos.coords.accuracy || 10);
          const geo = await reverseGeocode(lat, lng);

          const loc = await saveLocation({
            lat,
            lng,
            name: geo.name,
            address: geo.address,
            accuracy: acc,
            source: "gps"
          });

          if (showToast) {
            const isHi = window.SahaytaLang && window.SahaytaLang.getLanguage() === "hi";
            showLocationToast(isHi ? `📍 लोकेशन अपडेट: ${loc.name}` : `📍 Location Updated: ${loc.name}`);
          }
          resolve(loc);
        },
        (err) => {
          console.warn("GPS failed or denied:", err.message);
          const cur = getStoredLocation();
          if (showToast) {
            const isHi = window.SahaytaLang && window.SahaytaLang.getLanguage() === "hi";
            showLocationToast(isHi ? `📍 सक्रिय लोकेशन: ${cur.name}` : `📍 Current Location: ${cur.name}`);
          }
          resolve(cur);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    });
  }

  // Search Address or City via Nominatim
  async function searchLocation(query) {
    if (!query || !query.trim()) return [];
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=in&limit=6`);
      if (res.ok) {
        const data = await res.json();
        return data.map(item => ({
          name: item.display_name.split(",")[0],
          address: item.display_name,
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon)
        }));
      }
    } catch (e) {
      console.warn("Search location network error", e);
    }
    return [];
  }

  // Quick Toast Notification
  function showLocationToast(msg) {
    let toast = document.getElementById("sahayta-loc-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "sahayta-loc-toast";
      toast.style.cssText = "position:fixed; bottom:24px; right:24px; z-index:99999; background:#0f172a; color:#fff; padding:14px 22px; border-radius:12px; font-weight:600; font-size:14px; box-shadow:0 12px 30px rgba(0,0,0,0.35); border-left:4px solid #3b82f6; border:1px solid #334155; transition:opacity 0.3s ease;";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = "1";
    toast.style.display = "block";
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => { toast.style.display = "none"; }, 300);
    }, 3500);
  }

  // Build and Open Location Selector Modal
  function openLocationModal() {
    let modal = document.getElementById("sahayta-location-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "sahayta-location-modal";
      modal.style.cssText = "position:fixed; inset:0; background:rgba(15,23,42,0.8); backdrop-filter:blur(6px); z-index:99999; display:flex; align-items:center; justify-content:center; padding:16px;";
      document.body.appendChild(modal);
    }

    const current = getStoredLocation();
    const isHi = window.SahaytaLang && window.SahaytaLang.getLanguage() === "hi";

    modal.innerHTML = `
      <div style="background:#ffffff; color:#0f172a; width:100%; max-width:540px; border-radius:20px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.35); border:1px solid #cbd5e1; overflow:hidden; animation:fadeIn 0.2s ease;">
        <!-- Modal Header -->
        <div style="background:linear-gradient(135deg, #1e3a8a, #2563eb); color:white; padding:18px 24px; display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:12px;">
            <span style="font-size:26px;">📍</span>
            <div>
              <h3 style="margin:0; font-size:18px; font-weight:700;">${isHi ? "अपनी लोकेशन बदलें या सेट करें" : "Set & Edit Your Location"}</h3>
              <p style="margin:2px 0 0 0; font-size:12px; opacity:0.9;">${isHi ? "सटीक आपदा चेतावनी और नजदीकी राहत सेवाओं के लिए" : "For accurate live disaster triage & emergency services"}</p>
            </div>
          </div>
          <button id="close-loc-modal-btn" style="background:rgba(255,255,255,0.15); border:none; color:white; font-size:22px; width:34px; height:34px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; line-height:1;">&times;</button>
        </div>

        <div style="padding:20px 24px; max-height:75vh; overflow-y:auto;">
          <!-- Current Active Location Banner -->
          <div style="background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:14px; padding:14px 16px; margin-bottom:18px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:11px; font-weight:700; color:#475569; text-transform:uppercase; letter-spacing:0.5px;">${isHi ? "वर्तमान सक्रिय लोकेशन" : "Currently Active Location"}:</span>
              <span style="font-size:11px; background:#dcfce7; color:#15803d; font-weight:700; padding:2px 8px; border-radius:9999px;">● ${isHi ? "सक्रिय" : "Active"}</span>
            </div>
            <div style="font-weight:700; color:#0f172a; font-size:15px; margin-top:4px;" id="modal-current-display">
              📍 ${current.address || current.name}
            </div>
            <div style="font-size:12px; color:#64748b; margin-top:4px; font-family:monospace;">
              Lat: <strong>${current.lat.toFixed(4)}</strong>, Lng: <strong>${current.lng.toFixed(4)}</strong> (${current.source || 'default'})
            </div>
          </div>

          <!-- GPS Detect Button -->
          <button id="modal-detect-gps-btn" style="width:100%; background:linear-gradient(135deg, #2563eb, #1d4ed8); color:white; border:none; padding:12px 16px; border-radius:12px; font-weight:700; font-size:14px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; margin-bottom:18px; box-shadow:0 4px 12px rgba(37,99,235,0.25); transition:all 0.2s;">
            <span>📡</span> <span>${isHi ? "GPS द्वारा लाइव लोकेशन खोजें (Auto-Detect)" : "Auto-Detect My GPS Location"}</span>
          </button>

          <!-- Search City/Area or Type Custom Name -->
          <div style="margin-bottom:18px;">
            <label style="display:block; font-size:13px; font-weight:700; color:#1e293b; margin-bottom:6px;">
              ${isHi ? "शहर / इलाका का नाम लिखें या खोजें:" : "Type City, Area or Search Address:"}
            </label>
            <div style="display:flex; gap:8px;">
              <input type="text" id="modal-search-input" value="${current.name || ''}" placeholder="${isHi ? 'उदा. पटियाला, दिल्ली, मुंबई, जयपुर, शकरपुर...' : 'e.g. Patiala, Delhi, Mumbai, Jaipur, Shakarpur...'}" style="flex:1; padding:11px 14px; border:1.5px solid #cbd5e1; border-radius:10px; font-size:14px; outline:none; font-weight:500;" />
              <button id="modal-search-btn" style="background:#0f172a; color:white; border:none; padding:11px 16px; border-radius:10px; font-weight:600; font-size:13px; cursor:pointer; whitespace:nowrap;">
                🔍 ${isHi ? "खोजें" : "Search"}
              </button>
            </div>
            
            <div style="margin-top:6px; display:flex; justify-content:flex-end;">
              <button id="modal-custom-set-btn" style="background:#eff6ff; color:#2563eb; border:1px solid #bfdbfe; padding:6px 12px; border-radius:8px; font-size:12px; font-weight:600; cursor:pointer;">
                ✍️ ${isHi ? "लिखे गए नाम को सीधे लोकेशन बनाएं" : "Set typed text directly as location"}
              </button>
            </div>

            <div id="modal-search-results" style="margin-top:8px; max-height:140px; overflow-y:auto; display:none; border:1px solid #cbd5e1; border-radius:10px; background:#fff;"></div>
          </div>

          <!-- Quick Select Hubs -->
          <div>
            <label style="display:block; font-size:12px; font-weight:700; color:#64748b; text-transform:uppercase; margin-bottom:8px; letter-spacing:0.5px;">
              ${isHi ? "प्रमुख आपदा राहत केंद्र (1-क्लिक चयन):" : "Quick Select Hubs / Major Cities:"}
            </label>
            <div style="display:flex; flex-wrap:wrap; gap:6px;">
              ${POPULAR_HUBS.map(hub => `
                <button class="quick-hub-btn" data-name="${hub.name}" data-lat="${hub.lat}" data-lng="${hub.lng}" style="background:#f1f5f9; border:1px solid #cbd5e1; padding:7px 12px; border-radius:8px; font-size:12px; font-weight:600; cursor:pointer; color:#1e293b; transition:all 0.15s;">
                  📍 ${hub.name}
                </button>
              `).join("")}
            </div>
          </div>
        </div>

        <div style="background:#f8fafc; border-top:1px solid #e2e8f0; padding:14px 24px; display:flex; justify-content:flex-end; gap:10px;">
          <button id="modal-done-btn" style="background:#10b981; hover:bg-emerald-600; color:white; border:none; padding:9px 22px; border-radius:10px; font-weight:700; font-size:13px; cursor:pointer; box-shadow:0 2px 6px rgba(16,185,129,0.3);">
            ${isHi ? "सहेजें एवं बंद करें (Save & Close)" : "Save & Close"}
          </button>
        </div>
      </div>
    `;

    modal.style.display = "flex";

    // Bind modal close buttons
    const closeModal = () => { modal.style.display = "none"; };
    document.getElementById("close-loc-modal-btn").onclick = closeModal;
    document.getElementById("modal-done-btn").onclick = closeModal;

    // GPS Button in modal
    const gpsBtn = document.getElementById("modal-detect-gps-btn");
    gpsBtn.onclick = async () => {
      gpsBtn.innerHTML = `<span>⏳</span> <span>${isHi ? "GPS खोज रहा है..." : "Acquiring High-Accuracy GPS..."}</span>`;
      gpsBtn.style.opacity = "0.75";
      try {
        const loc = await detectGPS(false);
        document.getElementById("modal-current-display").textContent = `📍 ${loc.address || loc.name}`;
        showLocationToast(isHi ? `✅ लाइव GPS लोकेशन अपडेट: ${loc.name}` : `📍 GPS Location Updated: ${loc.name}`);
        setTimeout(closeModal, 600);
      } catch (e) {
        alert(isHi ? "जीपीएस उपलब्ध नहीं हो सका। कृपया नीचे सूची में से शहर चुनें या नाम लिखें।" : "Could not access GPS. Please choose a city from the list or type your city name.");
      } finally {
        gpsBtn.innerHTML = `<span>📡</span> <span>${isHi ? "GPS द्वारा लाइव लोकेशन खोजें (Auto-Detect)" : "Auto-Detect My GPS Location"}</span>`;
        gpsBtn.style.opacity = "1";
      }
    };

    // Direct custom text set button
    const customSetBtn = document.getElementById("modal-custom-set-btn");
    const searchInput = document.getElementById("modal-search-input");
    customSetBtn.onclick = async () => {
      const text = searchInput.value.trim();
      if (!text) {
        alert(isHi ? "कृपया लोकेशन का नाम लिखें" : "Please enter a location name");
        return;
      }
      const updated = await saveLocation({
        name: text,
        address: `${text}, India`,
        source: "custom_input"
      });
      showLocationToast(isHi ? `📍 लोकेशन सेट: ${updated.name}` : `📍 Location set to: ${updated.name}`);
      closeModal();
    };

    // Search button and input enter
    const searchBtn = document.getElementById("modal-search-btn");
    const searchResults = document.getElementById("modal-search-results");

    const doSearch = async () => {
      const q = searchInput.value.trim();
      if (!q) return;
      searchBtn.textContent = "⏳...";
      searchResults.style.display = "block";
      searchResults.innerHTML = `<div style="padding:12px; text-align:center; font-size:12px; color:#64748b;">${isHi ? "खोज रहा है..." : "Searching location..."}</div>`;

      const results = await searchLocation(q);
      searchBtn.innerHTML = `🔍 ${isHi ? "खोजें" : "Search"}`;

      if (!results.length) {
        searchResults.innerHTML = `
          <div style="padding:12px; text-align:center; font-size:12px; color:#64748b;">
            <p style="margin:0 0 6px 0; color:#dc2626; font-weight:600;">${isHi ? "मानचित्र पर सटीक पता नहीं मिला" : "Address not found on map"}</p>
            <button id="modal-fallback-set" style="background:#2563eb; color:#fff; border:none; padding:6px 14px; border-radius:6px; font-size:12px; cursor:pointer;">
              ${isHi ? `"${q}" को लोकेशन के रूप में सेट करें` : `Set "${q}" as Location anyway`}
            </button>
          </div>
        `;
        const fallbackBtn = document.getElementById("modal-fallback-set");
        if (fallbackBtn) {
          fallbackBtn.onclick = async () => {
            await saveLocation({ name: q, address: `${q}, India`, source: "custom_fallback" });
            showLocationToast(isHi ? `📍 लोकेशन सेट: ${q}` : `📍 Location set to: ${q}`);
            closeModal();
          };
        }
        return;
      }

      searchResults.innerHTML = results.map(r => `
        <div class="search-result-item" data-lat="${r.lat}" data-lng="${r.lng}" data-address="${r.address}" data-name="${r.name}" style="padding:10px 14px; border-bottom:1px solid #f1f5f9; cursor:pointer; font-size:13px; color:#1e293b; transition:background 0.15s;">
          <strong>📍 ${r.name}</strong><br><span style="font-size:11px; color:#64748b;">${r.address}</span>
        </div>
      `).join("");

      searchResults.querySelectorAll(".search-result-item").forEach(item => {
        item.onmouseover = () => { item.style.backgroundColor = "#eff6ff"; };
        item.onmouseout = () => { item.style.backgroundColor = "#fff"; };
        item.onclick = async () => {
          const lat = parseFloat(item.dataset.lat);
          const lng = parseFloat(item.dataset.lng);
          const address = item.dataset.address;
          const name = item.dataset.name;

          await saveLocation({ lat, lng, name, address, source: "search" });
          showLocationToast(isHi ? `📍 लोकेशन सेट: ${name}` : `📍 Location set to: ${name}`);
          closeModal();
        };
      });
    };

    searchBtn.onclick = doSearch;
    searchInput.onkeydown = (e) => { if (e.key === "Enter") doSearch(); };

    // Quick hubs buttons
    modal.querySelectorAll(".quick-hub-btn").forEach(btn => {
      btn.onmouseover = () => { btn.style.backgroundColor = "#e2e8f0"; };
      btn.onmouseout = () => { btn.style.backgroundColor = "#f1f5f9"; };
      btn.onclick = async () => {
        const name = btn.dataset.name;
        const lat = parseFloat(btn.dataset.lat);
        const lng = parseFloat(btn.dataset.lng);

        await saveLocation({ lat, lng, name, address: `${name}, India`, source: "hub" });
        showLocationToast(isHi ? `📍 लोकेशन सेट: ${name}` : `📍 Location set to: ${name}`);
        closeModal();
      };
    });
  }

  // Expose global methods
  window.SahaytaLocation = {
    getStoredLocation,
    saveLocation,
    detectGPS,
    searchLocation,
    openLocationModal,
    showLocationToast,
    formatShortLocation,
    updateLocationUI,
    DEFAULT_LOCATION
  };
  window.openLocationModal = openLocationModal;

  // Auto-init on page load
  document.addEventListener("DOMContentLoaded", () => {
    const cur = getStoredLocation();
    updateLocationUI(cur);

    // Bind any element with class 'open-location-modal' or 'loc-toggle-btn'
    document.querySelectorAll(".open-location-modal, .loc-toggle-btn, [data-action='change-location']").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openLocationModal();
      });
    });
  });

  // Re-update location formatting when language changes
  window.addEventListener("sahayta:langchange", () => {
    updateLocationUI(getStoredLocation());
  });

})();
