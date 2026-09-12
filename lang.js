// ========================================================
// SAHAYTA 2.0 - COMPLETE BILINGUAL LANGUAGE ENGINE (ENGLISH & HINDI)
// ========================================================
(function () {
  const LANG_KEY = "sahayta_lang";

  const translations = {
    en: {
      // Header & Navigation
      "brand.name": "Sahayta",
      "brand.subtitle": "Crisis Response",
      "nav.dashboard": "Dashboard",
      "nav.map": "Crisis Map",
      "nav.resources": "Resources",
      "nav.community": "Community",
      "nav.preparedness": "Preparedness",
      "nav.sos": "SOS",
      "nav.mesh": "Offline Mesh",
      "nav.theme_dark": "Dark Mode",
      "nav.theme_light": "Light Mode",
      "nav.change_lang": "हिंदी",
      "nav.location_btn": "📍 Update Location",

      // Top Banner
      "banner.ai_badge": "🚀 Sahayta 2.0 AI",
      "banner.ai_subtitle": "AI-Powered Disaster Triage & Multi-Tier Verification Active",
      "banner.battery_on": "🔋 Battery Saver: ON",
      "banner.battery_off": "🔋 Battery Saver: OFF",
      "banner.citizen_view": "Citizen View",
      "banner.command_view": "🚨 Command Center",

      // Command Center
      "cmd.title": "SAHAYTA DISASTER COMMAND CENTER",
      "cmd.subtitle": "Real-Time Autonomous Triage & NGO/First-Responder Dispatch Engine",
      "cmd.live_stream": "● LIVE TELEMETRY STREAM",
      "cmd.active_sos_queue": "ACTIVE SOS QUEUE",
      "cmd.critical_triage": "🔴 CRITICAL TRIAGE",
      "cmd.high_priority": "🟠 HIGH PRIORITY",
      "cmd.verified_reports": "VERIFIED REPORTS",
      "cmd.open_shelters": "OPEN SHELTERS",
      "cmd.feed_title": "AI Priority Feed:",
      "cmd.all_sos": "All SOS (1,284)",
      "cmd.critical_filter": "🔴 Critical (236)",
      "cmd.high_filter": "🟠 High (418)",
      "cmd.open_map": "Open Tactical Map View ➔",
      "cmd.dispatch_ndrf": "🚑 Dispatch NDRF Boat (0.8km)",
      "cmd.dispatch_redcross": "📦 Dispatch Red Cross Unit (1.4km)",

      // Location Card
      "loc.status_safe": "Safe Zone",
      "loc.status_monitored": "Monitored Zone",
      "loc.last_updated": "Last updated: 2 minutes ago",
      "loc.edit_btn": "✏️ Change Location",
      "loc.gps_refresh": "📡 Auto GPS",

      // Family Safety Circle
      "family.title": "👨‍👩‍👧 Family Safety Circle",
      "family.members_count": "3 Members",
      "family.subtitle": "Instant one-tap safety check-in for your emergency group",
      "family.i_am_safe": "✅ I am Safe",
      "family.alert_family": "🚨 Alert Family",
      "family.safe_badge": "✅ Safe",
      "family.on_route_badge": "🟡 On Route",
      "family.needs_help_badge": "🔴 Needs Help",
      "family.mom": "Mom",
      "family.dad": "Dad",
      "family.brother": "Brother (Rohan)",
      "family.mom_loc": "📍 Sector 4, Patiala",
      "family.dad_loc": "📍 Sirhind Rd • 12m ago",
      "family.brother_loc": "📍 Hostel Gate • Rising Water",

      // Live Alerts
      "alerts.title": "🚨 Live Alerts",
      "alerts.from_backend": "Live telemetry & verified reports",
      "alerts.loading": "Loading live emergency alerts...",
      "alerts.verified": "VERIFIED",
      "alerts.critical": "CRITICAL",
      "alerts.high": "HIGH",
      "alerts.medium": "MEDIUM",
      "alerts.score": "AI Verification Score: 96%",

      // NEW FEATURE 1: Volunteer & NGO Rescue Fleet Dispatch System
      "fleet.title": "🚑 Volunteer & NGO Rescue Fleet Dispatch",
      "fleet.subtitle": "Real-time field personnel allocation, skill tracking & rapid triage dispatch",
      "fleet.active_units": "Active Units Online",
      "fleet.join_btn": "🤝 Join Volunteer Fleet",
      "fleet.filter_all": "All Units",
      "fleet.filter_boats": "Water / Boats",
      "fleet.filter_med": "Medical / Ambulance",
      "fleet.filter_ham": "HAM Radio / Comm",
      "fleet.status_available": "🟢 Available",
      "fleet.status_dispatched": "⏳ Dispatched",
      "fleet.status_on_scene": "📍 On Scene",
      "fleet.dispatch_action": "🚨 Dispatch to Target",
      "fleet.reassign_action": "🔄 Reassign",
      "fleet.modal_title": "Volunteer Registration — Sahayta Fleet",
      "fleet.name_label": "Full Name:",
      "fleet.phone_label": "Phone / WhatsApp:",
      "fleet.skills_label": "Primary Emergency Skill:",
      "fleet.skill_first_aid": "First Aid & Triage",
      "fleet.skill_boat": "Boat / Flood Water Rescue",
      "fleet.skill_4x4": "4x4 Off-Road Vehicle",
      "fleet.skill_medical": "Doctor / Nurse / Paramedic",
      "fleet.skill_radio": "HAM / Wireless Operator",
      "fleet.submit_btn": "Register & Join Fleet",

      // NEW FEATURE 2: Emergency Blood, Oxygen & ICU Bed Live Tracker
      "med.title": "🩸 Blood, Oxygen & ICU Bed Live Availability",
      "med.subtitle": "Verified hospital life-support reserves with instant emergency reservation",
      "med.tab_all": "All Supplies",
      "med.tab_blood": "🩸 Blood Bank",
      "med.tab_oxygen": "💨 Oxygen Supply",
      "med.tab_icu": "🏥 ICU & Ventilators",
      "med.blood_rare": "Critical Reserve",
      "med.units_avail": "Units Available",
      "med.beds_avail": "Beds Available",
      "med.cylinders_avail": "Cylinders In Stock",
      "med.reserve_btn": "📞 Reserve / Request",
      "med.reserve_modal_title": "Emergency Medical Supply Reservation",
      "med.reserve_confirm": "Confirm Emergency Reservation",

      // NEW FEATURE 3: Offline Bluetooth / WiFi-Direct P2P Mesh Communication
      "mesh.title": "📡 Offline Mesh & Disaster P2P Communicator",
      "mesh.subtitle": "Zero-internet emergency communication via WebRTC, local subnet & Bluetooth beacon",
      "mesh.status_online": "🟢 Mesh Node Active (P2P Channel Ready)",
      "mesh.status_scanning": "📡 Scanning for nearby emergency peers...",
      "mesh.peers_connected": "Connected Local Nodes:",
      "mesh.distress_beacon_btn": "🚨 BROADCAST OFFLINE DISTRESS BEACON",
      "mesh.siren_btn": "🔊 Audio Morse SOS Siren",
      "mesh.sms_btn": "📱 SMS Fallback Broadcast (No Internet)",
      "mesh.channel_general": "🌐 General Rescue Channel",
      "mesh.channel_medical": "🩸 Medical Emergency Channel",
      "mesh.channel_supplies": "📦 Food & Clean Water Requests",
      "mesh.type_placeholder": "Type message to broadcast across local mesh nodes...",
      "mesh.send_btn": "Broadcast",
      "mesh.beacon_transmitted": "Distress beacon broadcasted to 4 nearby mesh nodes with GPS telemetry!",

      // Current Threat Level
      "threat.title": "Current Threat Level",
      "threat.live_badge": "Live",
      "threat.weather": "Weather",
      "threat.weather_val": "Clear",
      "threat.traffic": "Traffic",
      "threat.traffic_val": "Moderate",
      "threat.incidents": "Incidents",
      "threat.incidents_val": "2 Active",
      "threat.actions_title": "Recommended Actions",
      "threat.action_1": "Stay informed about local weather and evacuation alerts",
      "threat.action_2": "Review your family emergency preparedness kit",
      "threat.action_3": "Check on vulnerable elderly neighbors & children",

      // Emergency Actions
      "actions.title": "Emergency Actions",
      "actions.sos_title": "SOS Alert",
      "actions.sos_desc": "Send immediate emergency alert to NDRF, police and family contacts",
      "actions.sos_btn": "Activate SOS",
      "actions.resources_title": "Find Resources",
      "actions.resources_desc": "Locate nearby shelters, medical facilities, oxygen, and emergency food",
      "actions.resources_btn": "Find Help",
      "actions.report_title": "Report Incident",
      "actions.report_desc": "Share verified information and ground hazard alerts with responders",
      "actions.report_btn": "Report Now",

      // Quick Access
      "quick.title": "Quick Access",
      "quick.shelters": "Shelters",
      "quick.medical": "Medical",
      "quick.volunteers": "Volunteers",
      "quick.map": "Crisis Map",

      // Live Activity Feed
      "feed.title": "Live Activity Feed",
      "feed.live_updates": "Live updates",
      "feed.verified": "Verified",
      "feed.view_all": "View all activity →",
      "feed.helpful": "helpful",
      "feed.comments": "comments",
      "feed.views": "views",

      // Offline Indicator
      "offline.title": "Offline Mode Available",
      "offline.subtitle": "Core emergency features and SMS alerts work without internet connection",

      // Footer
      "footer.desc": "Empowering communities through AI-driven crisis intelligence and coordinated rapid emergency response.",
      "footer.emergency": "Emergency",
      "footer.community": "Community",
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms of Service",
      "footer.contact": "Contact",
      "footer.rights": "© 2025 Sahayta Crisis Response. All Rights Reserved. • Made with ❤️ by Aditya Singh",

      // Location Modal
      "loc.modal_title": "Set / Update Your Location",
      "loc.detect_gps": "📍 Auto-Detect GPS (Live)",
      "loc.search_label": "Type City, Area or Search Address:",
      "loc.search_placeholder": "e.g. Patiala, Delhi, Mumbai, Jaipur, Shakarpur...",
      "loc.search_btn": "Search",
      "loc.quick_cities": "Quick Select Hubs / Major Cities:",
      "loc.current_label": "Currently Active Location:",
      "loc.save_btn": "Save & Update Sahayta",

      // Nearest Resources Engine
      "nearest.title": "Find Nearest Emergency Resource",
      "nearest.subtitle": "Instant routing to closest life-saving facilities near your location",
      "nearest.hospital": "🏥 Nearest Hospital / Trauma",
      "nearest.shelter": "⛺ Nearest Emergency Shelter",
      "nearest.food": "🍲 Nearest Food / Langar Point",
      "nearest.police": "🚓 Nearest Police Station",
      "nearest.blood": "🩸 Nearest Blood / Oxygen Depot",
      "nearest.ngo": "🤝 Nearest NGO Relief Fleet",
      "nearest.view_map": "🗺️ Open Live Map & Route",
      "nearest.navigate": "🚗 Start GPS Turn-by-Turn Navigation",
      "nearest.route_ready": "Route plotted to closest facility!",
      "nearest.one_tap_bar": "⚡ One-Tap Emergency Nearest Finder",
      "loc.close_btn": "Cancel",
      "loc.success_msg": "✅ Location successfully updated!"
    },
    hi: {
      // Header & Navigation
      "brand.name": "सहायता",
      "brand.subtitle": "आपदा प्रबंधन एवं राहत",
      "nav.dashboard": "डैशबोर्ड",
      "nav.map": "संकट मानचित्र",
      "nav.resources": "संसाधन",
      "nav.community": "समुदाय",
      "nav.preparedness": "तैयारी",
      "nav.sos": "आपातकालीन SOS",
      "nav.mesh": "ऑफलाइन मेश",
      "nav.theme_dark": "डार्क मोड",
      "nav.theme_light": "लाइट मोड",
      "nav.change_lang": "English",
      "nav.location_btn": "📍 लोकेशन बदलें",

      // Top Banner
      "banner.ai_badge": "🚀 सहायता 2.0 AI",
      "banner.ai_subtitle": "एआई-संचालित आपदा प्रबंधन और बहु-स्तरीय सत्यापन सक्रिय",
      "banner.battery_on": "🔋 बैटरी सेवर: चालू",
      "banner.battery_off": "🔋 बैटरी सेवर: बंद",
      "banner.citizen_view": "नागरिक दृश्य",
      "banner.command_view": "🚨 कमांड सेंटर",

      // Command Center
      "cmd.title": "सहायता आपदा कमांड सेंटर (NDRF & NGO)",
      "cmd.subtitle": "वास्तविक समय आपदा वर्गीकरण एवं बचाव दल प्रेषण इंजन",
      "cmd.live_stream": "● लाइव टेलीमेट्री स्ट्रीम",
      "cmd.active_sos_queue": "सक्रिय SOS कतार",
      "cmd.critical_triage": "🔴 अत्यंत गंभीर (Critical)",
      "cmd.high_priority": "🟠 उच्च प्राथमिकता",
      "cmd.verified_reports": "सत्यापित रिपोर्ट",
      "cmd.open_shelters": "खुले राहत शिविर",
      "cmd.feed_title": "एआई प्राथमिकता फ़ीड:",
      "cmd.all_sos": "सभी SOS (1,284)",
      "cmd.critical_filter": "🔴 गंभीर (236)",
      "cmd.high_filter": "🟠 उच्च (418)",
      "cmd.open_map": "रणनीतिक मानचित्र देखें ➔",
      "cmd.dispatch_ndrf": "🚑 NDRF नाव रवाना करें (0.8km)",
      "cmd.dispatch_redcross": "📦 रेड क्रॉस टीम भेजें (1.4km)",

      // Location Card
      "loc.status_safe": "सुरक्षित क्षेत्र",
      "loc.status_monitored": "निगरानी क्षेत्र",
      "loc.last_updated": "अंतिम अपडेट: 2 मिनट पहले",
      "loc.edit_btn": "✏️ लोकेशन बदलें",
      "loc.gps_refresh": "📡 ऑटो GPS",

      // Family Safety Circle
      "family.title": "👨‍👩‍👧 परिवार सुरक्षा समूह",
      "family.members_count": "3 सदस्य",
      "family.subtitle": "अपने आपातकालीन परिवार समूह के लिए त्वरित 1-टैप सुरक्षा चेक-इन",
      "family.i_am_safe": "✅ मैं सुरक्षित हूँ",
      "family.alert_family": "🚨 परिवार को अलर्ट भेजें",
      "family.safe_badge": "✅ सुरक्षित",
      "family.on_route_badge": "🟡 रास्ते में",
      "family.needs_help_badge": "🔴 मदद चाहिए",
      "family.mom": "माता जी (Mom)",
      "family.dad": "पिता जी (Dad)",
      "family.brother": "भाई (रोहन)",
      "family.mom_loc": "📍 सेक्टर 4, पटियाला",
      "family.dad_loc": "📍 सरहिंद रोड • 12 मिनट पहले",
      "family.brother_loc": "📍 हॉस्टल गेट • पानी बढ़ रहा है",

      // Live Alerts
      "alerts.title": "🚨 लाइव आपदा अलर्ट",
      "alerts.from_backend": "लाइव टेलीमेट्री एवं सत्यापित रिपोर्ट",
      "alerts.loading": "लाइव अलर्ट लोड हो रहे हैं...",
      "alerts.verified": "सत्यापित",
      "alerts.critical": "अत्यंत गंभीर",
      "alerts.high": "उच्च जोखिम",
      "alerts.medium": "मध्यम",
      "alerts.score": "एआई सत्यापन स्कोर: 96%",

      // NEW FEATURE 1: Volunteer & NGO Rescue Fleet Dispatch System
      "fleet.title": "🚑 स्वयंसेवक एवं NGO बचाव बेड़ा प्रेषण",
      "fleet.subtitle": "वास्तविक समय बचाव दल आवंटन, कौशल ट्रैकिंग एवं त्वरित प्रेषण",
      "fleet.active_units": "सक्रिय दल ऑनलाइन",
      "fleet.join_btn": "🤝 स्वयंसेवक दल से जुड़ें",
      "fleet.filter_all": "सभी दल",
      "fleet.filter_boats": "जल बचाव / नावें",
      "fleet.filter_med": "चिकित्सा / एम्बुलेंस",
      "fleet.filter_ham": "हैम रेडियो / संचार",
      "fleet.status_available": "🟢 उपलब्ध",
      "fleet.status_dispatched": "⏳ रवाना किया गया",
      "fleet.status_on_scene": "📍 घटनास्थल पर",
      "fleet.dispatch_action": "🚨 घटनास्थल पर भेजें",
      "fleet.reassign_action": "🔄 पुनः आवंटित करें",
      "fleet.modal_title": "स्वयंसेवक पंजीकरण — सहायता बचाव बेड़ा",
      "fleet.name_label": "पूरा नाम:",
      "fleet.phone_label": "फ़ोन / व्हाट्सएप:",
      "fleet.skills_label": "प्राथमिक आपातकालीन कौशल:",
      "fleet.skill_first_aid": "प्राथमिक उपचार एवं वर्गीकरण",
      "fleet.skill_boat": "बाढ़ जल बचाव एवं नाव संचालन",
      "fleet.skill_4x4": "4x4 ऑफ-रोड वाहन चालक",
      "fleet.skill_medical": "चिकित्सक / नर्स / पैरामेडिक",
      "fleet.skill_radio": "हैम / वायरलेस संचार विशेषज्ञ",
      "fleet.submit_btn": "पंजीकरण करें एवं दल से जुड़ें",

      // NEW FEATURE 2: Emergency Blood, Oxygen & ICU Bed Live Tracker
      "med.title": "🩸 रक्त, ऑक्सीजन एवं ICU बेड लाइव उपलब्धता",
      "med.subtitle": "सत्यापित अस्पताल जीवन रक्षक संसाधन एवं तत्काल आपातकालीन आरक्षण",
      "med.tab_all": "सभी संसाधन",
      "med.tab_blood": "🩸 ब्लड बैंक",
      "med.tab_oxygen": "💨 ऑक्सीजन आपूर्ति",
      "med.tab_icu": "🏥 ICU एवं वेंटिलेटर",
      "med.blood_rare": "दुर्लभ / आपातकालीन आरक्षित",
      "med.units_avail": "यूनिट उपलब्ध",
      "med.beds_avail": "बेड उपलब्ध",
      "med.cylinders_avail": "सिलेंडर स्टॉक में",
      "med.reserve_btn": "📞 आरक्षित / अनुरोध करें",
      "med.reserve_modal_title": "आपातकालीन चिकित्सा आपूर्ति आरक्षण",
      "med.reserve_confirm": "आपातकालीन आरक्षण की पुष्टि करें",

      // NEW FEATURE 3: Offline Bluetooth / WiFi-Direct P2P Mesh Communication
      "mesh.title": "📡 ऑफलाइन मेश एवं आपदा पीयर-टू-पीयर संचार",
      "mesh.subtitle": "बिना इंटरनेट WebRTC, लोकल सबनेट एवं ब्लूटूथ बीकन द्वारा आपातकालीन संचार",
      "mesh.status_online": "🟢 मेश नोड सक्रिय (P2P चैनल तैयार)",
      "mesh.status_scanning": "📡 नजदीकी आपातकालीन नोड्स खोज रहा है...",
      "mesh.peers_connected": "जुड़े हुए स्थानीय नोड्स:",
      "mesh.distress_beacon_btn": "🚨 ऑफलाइन संकट बीकन प्रसारित करें",
      "mesh.siren_btn": "🔊 ऑडियो मोर्स कोड SOS सायरन",
      "mesh.sms_btn": "📱 SMS फॉलबैक प्रसारण (बिना इंटरनेट)",
      "mesh.channel_general": "🌐 सामान्य बचाव चैनल",
      "mesh.channel_medical": "🩸 चिकित्सा आपातकालीन चैनल",
      "mesh.channel_supplies": "📦 भोजन एवं स्वच्छ जल अनुरोध",
      "mesh.type_placeholder": "स्थानीय मेश नोड्स पर संदेश प्रसारित करने के लिए लिखें...",
      "mesh.send_btn": "प्रसारित करें",
      "mesh.beacon_transmitted": "GPS टेलीमेट्री के साथ 4 नजदीकी मेश नोड्स पर संकट बीकन भेजा गया!",

      // Current Threat Level
      "threat.title": "वर्तमान जोखिम स्तर",
      "threat.live_badge": "लाइव",
      "threat.weather": "मौसम",
      "threat.weather_val": "साफ़ / सामान्य",
      "threat.traffic": "यातायात",
      "threat.traffic_val": "मध्यम",
      "threat.incidents": "सक्रिय घटनाएं",
      "threat.incidents_val": "2 सक्रिय",
      "threat.actions_title": "अनुशंसित सुरक्षा कदम",
      "threat.action_1": "स्थानीय मौसम और राहत घोषणाओं से अपडेट रहें",
      "threat.action_2": "अपनी आपातकालीन किट और आवश्यक दवाइयां तैयार रखें",
      "threat.action_3": "बुजुर्गों, बच्चों और पड़ोसियों का हालचाल लेते रहें",

      // Emergency Actions
      "actions.title": "आपातकालीन त्वरित सेवाएं",
      "actions.sos_title": "आपातकालीन SOS",
      "actions.sos_desc": "NDRF, पुलिस, एम्बुलेंस और परिवार को तुरंत संकट संदेश भेजें",
      "actions.sos_btn": "SOS सक्रिय करें",
      "actions.resources_title": "संसाधन एवं आश्रय",
      "actions.resources_desc": "नजदीकी राहत शिविर, अस्पताल, दवाइयां और भोजन केंद्र खोजें",
      "actions.resources_btn": "मदद खोजें",
      "actions.report_title": "खतरे की सूचना दें",
      "actions.report_desc": "बाढ़, आग या सड़क बंद होने की सत्यापित जानकारी साझा करें",
      "actions.report_btn": "अभी रिपोर्ट करें",

      // Quick Access
      "quick.title": "त्वरित पहुंच",
      "quick.shelters": "राहत शिविर",
      "quick.medical": "चिकित्सा सहायता",
      "quick.volunteers": "स्वयंसेवक",
      "quick.map": "संकट मानचित्र",

      // Live Activity Feed
      "feed.title": "लाइव सामुदायिक गतिविधि",
      "feed.live_updates": "लाइव अपडेट",
      "feed.verified": "सत्यापित",
      "feed.view_all": "सभी गतिविधियां देखें →",
      "feed.helpful": "मददगार",
      "feed.comments": "टिप्पणियां",
      "feed.views": "देखा गया",

      // Offline Indicator
      "offline.title": "ऑफलाइन मोड उपलब्ध",
      "offline.subtitle": "इंटरनेट न होने पर भी मुख्य आपातकालीन सुविधाएं और SMS अलर्ट कार्य करते हैं",

      // Footer
      "footer.desc": "एआई-संचालित संकट बुद्धिमत्ता और समन्वित आपातकालीन त्वरित प्रतिक्रिया द्वारा समुदायों का सशक्तिकरण।",
      "footer.emergency": "आपातकालीन सेवाएं",
      "footer.community": "समुदाय",
      "footer.privacy": "गोपनीयता नीति",
      "footer.terms": "सेवा की शर्तें",
      "footer.contact": "संपर्क करें",
      "footer.rights": "© 2025 सहायता आपदा प्रबंधन। सर्वाधिकार सुरक्षित। • Made with ❤️ by Aditya Singh",

      // Location Modal
      "loc.modal_title": "अपनी लोकेशन बदलें या सेट करें",
      "loc.detect_gps": "📍 GPS द्वारा लाइव लोकेशन खोजें (Auto-Detect)",
      "loc.search_label": "शहर / इलाका का नाम लिखें या खोजें:",
      "loc.search_placeholder": "उदा. पटियाला, दिल्ली, मुंबई, जयपुर, शकरपुर...",
      "loc.search_btn": "खोजें",
      "loc.quick_cities": "प्रमुख आपदा राहत केंद्र (1-क्लिक चयन):",
      "loc.current_label": "वर्तमान सक्रिय लोकेशन:",
      "loc.save_btn": "सहेजें एवं सहायता अपडेट करें",
      "loc.close_btn": "रद्द करें",
      "loc.success_msg": "✅ लोकेशन सफलतापूर्वक अपडेट हो गई!",

      // Nearest Resources Engine
      "nearest.title": "नजदीकी आपातकालीन सुविधा खोजें",
      "nearest.subtitle": "आपकी वर्तमान लोकेशन से सबसे नजदीकी जीवन रक्षक केंद्रों का तुरंत नेविगेशन",
      "nearest.hospital": "🏥 नजदीकी अस्पताल / ट्रॉमा",
      "nearest.shelter": "⛺ नजदीकी राहत शिविर",
      "nearest.food": "🍲 नजदीकी भोजन व लंगर केंद्र",
      "nearest.police": "🚓 नजदीकी पुलिस स्टेशन",
      "nearest.blood": "🩸 नजदीकी ब्लड व ऑक्सीजन डिपो",
      "nearest.ngo": "🤝 नजदीकी NGO राहत दल",
      "nearest.view_map": "🗺️ लाइव मैप पर देखें व रूट बनाएं",
      "nearest.navigate": "🚗 GPS टर्न-बाय-टर्न नेविगेशन शुरू करें",
      "nearest.route_ready": "नजदीकी आपातकालीन सुविधा का रूट तैयार है!",
      "nearest.one_tap_bar": "⚡ त्वरित नजदीकी सहायता खोजें"
    }
  };

  function getLanguage() {
    return localStorage.getItem(LANG_KEY) || "en";
  }

  function setLanguage(lang) {
    if (lang !== "en" && lang !== "hi") lang = "en";
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
    applyLanguage(lang);
  }

  function toggleLanguage() {
    const current = getLanguage();
    const next = current === "en" ? "hi" : "en";
    setLanguage(next);
  }

  function t(key, defaultVal) {
    const lang = getLanguage();
    return (translations[lang] && translations[lang][key]) || (translations.en && translations.en[key]) || defaultVal || key;
  }

  function applyLanguage(lang) {
    const dict = translations[lang] || translations.en;

    // Update all elements with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // Update language toggle button text
    document.querySelectorAll(".lang-toggle-btn").forEach(btn => {
      btn.innerHTML = lang === "en"
        ? `<span>🌐</span> <span>हिंदी</span>`
        : `<span>🌐</span> <span>English</span>`;
      btn.setAttribute("title", lang === "en" ? "Switch to Hindi (हिंदी)" : "Switch to English");
    });

    // Update standard navigation text if not using data-i18n
    document.querySelectorAll("nav a, #mobile-menu a, .header-nav a").forEach(link => {
      const href = link.getAttribute("href") || "";
      if (href.includes("crisis_dashboard")) link.textContent = dict["nav.dashboard"];
      else if (href.includes("live_crisis")) link.textContent = dict["nav.map"];
      else if (href.includes("resource_directory")) link.textContent = dict["nav.resources"];
      else if (href.includes("communication_verification")) link.textContent = dict["nav.community"];
      else if (href.includes("emergency_prepared")) link.textContent = dict["nav.preparedness"];
      else if (href.includes("sos_emergency")) link.textContent = dict["nav.sos"];
      else if (href.includes("offline")) link.textContent = dict["nav.mesh"];
    });

    // Re-render alerts or dynamic feeds if available
    if (typeof window.loadAlertsFromBackend === "function") {
      window.loadAlertsFromBackend();
    }
    if (typeof window.renderFleetUnits === "function") {
      window.renderFleetUnits();
    }
    if (typeof window.renderMedicalSupplies === "function") {
      window.renderMedicalSupplies();
    }

    // Dispatch global event
    window.dispatchEvent(new CustomEvent("sahayta:langchange", { detail: { lang } }));
  }

  // Expose global methods
  window.SahaytaLang = {
    getLanguage,
    setLanguage,
    toggleLanguage,
    t,
    translations,
    applyLanguage
  };
  window.toggleLanguage = toggleLanguage;

  // Run on DOM ready
  document.addEventListener("DOMContentLoaded", () => {
    applyLanguage(getLanguage());
  });

})();
