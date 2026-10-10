import express from "express";

const router = express.Router();

let activeBookings = [];
let mockRescueDrivers = [
  { id: "drv_1", name: "Vikram Singh (SDRF Volunteer)", phone: "+91 98765 43210", vehicle: "Rescue 4x4 Bolero (UP16-EV-2024)", type: "4x4", rating: 4.9, rescues: 142 },
  { id: "drv_2", name: "Amit Sharma (Quick Evac)", phone: "+91 98123 45678", vehicle: "Emergency Van (UP16-EV-8841)", type: "Van", rating: 4.8, rescues: 98 },
  { id: "drv_3", name: "Ramesh Verma (Paramedic)", phone: "+91 98990 11223", vehicle: "Medical Evac Ambulance (UP16-AMB-108)", type: "Ambulance", rating: 5.0, rescues: 215 },
  { id: "drv_4", name: "Mohan Lal (Community Taxi)", phone: "+91 97110 33445", vehicle: "Standard Evac Sedan (UP16-CAB-3312)", type: "Cab", rating: 4.9, rescues: 76 }
];

/* GET NEARBY RESCUE CABS */
router.get("/nearby", (req, res) => {
  const lat = parseFloat(req.query.lat) || 28.4725;
  const lng = parseFloat(req.query.lng) || 77.4910;

  const nearbyVehicles = mockRescueDrivers.map((drv, idx) => {
    // Generate realistic nearby coordinates around user's location
    const offsetLat = (Math.sin(idx + 1) * 0.008);
    const offsetLng = (Math.cos(idx + 1) * 0.008);
    return {
      ...drv,
      lat: lat + offsetLat,
      lng: lng + offsetLng,
      etaMins: 3 + (idx * 2),
      isAvailable: true
    };
  });

  res.json({
    success: true,
    vehicles: nearbyVehicles
  });
});

/* BOOK EMERGENCY EVACUATION CAB (HOME TO SHELTER) */
router.post("/book", (req, res) => {
  const { pickupLocation, shelterDestination, vehicleType, passengers, notes, contactPhone } = req.body;

  if (!pickupLocation || !shelterDestination) {
    return res.status(400).json({
      success: false,
      message: "Pickup location and Safe Shelter destination are required."
    });
  }

  // Pick matching driver or default
  const matchedDriver = mockRescueDrivers.find(d => d.type.toLowerCase() === (vehicleType || 'cab').toLowerCase()) || mockRescueDrivers[0];

  const bookingId = "EVAC-" + Math.floor(100000 + Math.random() * 900000);
  const newBooking = {
    bookingId,
    status: "DISPATCHED", // DISPATCHED -> EN_ROUTE -> ARRIVED_PICKUP -> HEADING_SHELTER -> COMPLETED
    vehicleType: vehicleType || "Standard Evac Cab",
    pickup: pickupLocation, // { address, lat, lng }
    shelter: shelterDestination, // { name, address, lat, lng, capacity, phone }
    passengers: passengers || 1,
    notes: notes || "Immediate disaster evacuation to shelter",
    contactPhone: contactPhone || "+91 98765 00000",
    driver: matchedDriver,
    etaMins: 4,
    currentLocation: {
      lat: (pickupLocation.lat || 28.4725) + 0.007,
      lng: (pickupLocation.lng || 77.4910) + 0.006
    },
    createdAt: new Date().toISOString()
  };

  activeBookings.unshift(newBooking);

  // Broadcast to WebSocket if active
  const wss = req.app.get("wss");
  if (wss) {
    wss.clients.forEach(client => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({
          type: "CAB_DISPATCHED",
          booking: newBooking
        }));
      }
    });
  }

  res.status(201).json({
    success: true,
    message: "🚨 Emergency Evacuation Cab Dispatched Successfully! 100% Free Humanitarian Ride.",
    booking: newBooking
  });
});

/* GET CURRENT ACTIVE BOOKING */
router.get("/active", (req, res) => {
  const booking = activeBookings[0] || null;
  res.json({
    success: true,
    booking
  });
});

/* CANCEL BOOKING */
router.post("/cancel", (req, res) => {
  const { bookingId } = req.body;
  activeBookings = activeBookings.filter(b => b.bookingId !== bookingId);
  res.json({
    success: true,
    message: "Cab request cancelled."
  });
});

export default router;
