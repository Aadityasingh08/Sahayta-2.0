import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  userId: { type: String, default: "anonymous" },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  name: { type: String, default: "User Location" },
  address: { type: String, default: "" },
  accuracy: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Location", locationSchema);
