import {
  checkStatus,
  runAutomation,
  runAutomationAsync,
  getRunDetails,
  verifyRumorClaim,
  scoutLiveCrisisIntel
} from "../services/tinyfishService.js";

/**
 * Health & Configuration check
 */
export const getTinyFishStatus = async (req, res) => {
  try {
    const status = await checkStatus();
    res.status(200).json({ success: true, ...status });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Execute synchronous automation run
 */
export const runAgentTask = async (req, res) => {
  try {
    const { url, goal } = req.body;
    if (!url || !goal) {
      return res.status(400).json({
        success: false,
        message: "Fields 'url' and 'goal' are required."
      });
    }

    const result = await runAutomation({ url, goal });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Start asynchronous automation run
 */
export const startAsyncAgentTask = async (req, res) => {
  try {
    const { url, goal } = req.body;
    if (!url || !goal) {
      return res.status(400).json({
        success: false,
        message: "Fields 'url' and 'goal' are required."
      });
    }

    const result = await runAutomationAsync({ url, goal });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Fetch execution status, steps, and results for a run_id
 */
export const getAgentRunStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: "Run ID parameter is required." });
    }

    const runData = await getRunDetails(id);
    res.status(200).json({ success: true, run: runData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Verify rumor or citizen report
 */
export const verifyRumor = async (req, res) => {
  try {
    const { claim, sourceUrl } = req.body;
    if (!claim) {
      return res.status(400).json({ success: false, message: "Claim text is required." });
    }

    const verificationJob = await verifyRumorClaim({ claim, sourceUrl });
    res.status(200).json({
      success: true,
      message: "TinyFish Fact-Checking Agent dispatched successfully",
      ...verificationJob
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Scout live crisis information
 */
export const scoutIntel = async (req, res) => {
  try {
    const { region, category } = req.body;
    const scoutJob = await scoutLiveCrisisIntel({ region, category });
    res.status(200).json({
      success: true,
      message: "TinyFish Crisis Web Scout dispatched successfully",
      ...scoutJob
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
