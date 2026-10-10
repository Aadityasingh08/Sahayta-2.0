import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["citizen", "ngo"], default: "citizen" },
  phone: { type: String },
  location: { type: String },
  bloodGroup: { type: String },
  // Specific to NGO / Voluntary Organization
  orgName: { type: String },
  regId: { type: String },
  services: [{ type: String }],
  teamSize: { type: String },
  verifiedBadge: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
