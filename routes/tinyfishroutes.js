import express from "express";
import {
  getTinyFishStatus,
  runAgentTask,
  startAsyncAgentTask,
  getAgentRunStatus,
  verifyRumor,
  scoutIntel
} from "../controllers/tinyfishController.js";

const router = express.Router();

router.get("/status", getTinyFishStatus);
router.post("/run", runAgentTask);
router.post("/run-async", startAsyncAgentTask);
router.get("/runs/:id", getAgentRunStatus);
router.post("/verify", verifyRumor);
router.post("/scout", scoutIntel);

export default router;
