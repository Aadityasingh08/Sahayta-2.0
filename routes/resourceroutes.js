import express from "express";
import mongoose from "mongoose";
import Resource from "../models/resource.js";

const router = express.Router();

const defaultResources = [
  { _id: "res_1", title: "Patiala Civil Hospital", category: "Medical", address: "Mall Road, Patiala", phone: "+91-175-2212345", verified: true },
  { _id: "res_2", title: "Thapar Community Relief Shelter", category: "Shelters", address: "Bhadson Rd, Patiala", phone: "+91-175-2393021", verified: true },
  { _id: "res_3", title: "Red Cross Clean Water Supply", category: "Water", address: "Leela Bhawan, Patiala", phone: "+91-175-2224567", verified: true },
  { _id: "res_4", title: "Emergency Food Distribution Center", category: "Food", address: "Urban Estate Phase 2, Patiala", phone: "+91-175-2345678", verified: true }
];

/* GET ALL (with category filter) */
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (mongoose.connection.readyState === 1) {
      const resources = await Resource.find(filter);
      return res.json(resources);
    }

    let filtered = defaultResources;
    if (req.query.category) {
      filtered = defaultResources.filter(r => r.category.toLowerCase() === req.query.category.toLowerCase());
    }
    return res.json(filtered);
  } catch (error) {
    return res.json(defaultResources);
  }
});

/* CREATE */
router.post("/", async (req, res) => {
  try {
    let resource;
    if (mongoose.connection.readyState === 1) {
      resource = await Resource.create(req.body);
    } else {
      resource = { _id: "res_" + Date.now(), ...req.body, verified: true };
      defaultResources.push(resource);
    }
    res.status(201).json({ success: true, resource });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

export default router;
