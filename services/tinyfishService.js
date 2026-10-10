/**
 * TinyFish Web Agent & Automation Service for Sahayta 2.0
 * Handles autonomous web crawling, disaster fact-checking, and live intelligence scouting.
 */

const TINYFISH_BASE_URL = "https://agent.tinyfish.ai";

function getApiKey() {
  return process.env.TINYFISH_API_KEY || "";
}

function getHeaders() {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("TINYFISH_API_KEY is not configured in environment variables.");
  }
  return {
    "X-API-Key": apiKey,
    "Content-Type": "application/json"
  };
}

/**
 * Check if TinyFish API key is configured and functional
 */
export async function checkStatus() {
  const apiKey = getApiKey();
  if (!apiKey) {
    return {
      configured: false,
      message: "TINYFISH_API_KEY is missing from environment"
    };
  }

  return {
    configured: true,
    maskedKey: `${apiKey.slice(0, 12)}...${apiKey.slice(-4)}`,
    status: "READY",
    baseUrl: TINYFISH_BASE_URL
  };
}

/**
 * Synchronous / Blocking Automation Run
 * Executes until completion and returns the final extracted results and steps
 */
export async function runAutomation({ url, goal }) {
  if (!url || !goal) {
    throw new Error("Both 'url' and 'goal' parameters are required for TinyFish automation.");
  }

  const response = await fetch(`${TINYFISH_BASE_URL}/v1/automation/run`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ url, goal })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || data.message || `TinyFish request failed with status ${response.status}`);
  }

  return data;
}

/**
 * Asynchronous Automation Run
 * Immediately returns run_id so client can poll or stream status with live screenshots
 */
export async function runAutomationAsync({ url, goal }) {
  if (!url || !goal) {
    throw new Error("Both 'url' and 'goal' parameters are required for TinyFish automation.");
  }

  const response = await fetch(`${TINYFISH_BASE_URL}/v1/automation/run-async`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ url, goal })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || data.message || `TinyFish async request failed with status ${response.status}`);
  }

  return data;
}

/**
 * Fetch Run Details & Execution Steps
 * Includes screenshots, current action, and result
 */
export async function getRunDetails(runId) {
  if (!runId) {
    throw new Error("runId is required");
  }

  const response = await fetch(`${TINYFISH_BASE_URL}/v1/runs/${runId}`, {
    method: "GET",
    headers: getHeaders()
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || data.message || `Failed to fetch run ${runId}`);
  }

  return data;
}

/**
 * Crisis Fact-Check & Rumor Verification
 * Uses TinyFish Web Agent to verify claims across official portals or source URLs
 */
export async function verifyRumorClaim({ claim, sourceUrl }) {
  if (!claim) {
    throw new Error("Claim text is required for fact-checking.");
  }

  const targetUrl = sourceUrl && sourceUrl.startsWith("http") ? sourceUrl : "https://en.wikipedia.org/wiki/Portal:Current_events";

  const goal = `You are a disaster response fact-checking assistant for Sahayta. 
Investigate the following claim: "${claim}".
Inspect the webpage for official bulletins, confirmed events, or disclaimers.
Extract the verification details and return JSON with the following structure:
{
  "claim": "${claim.replace(/"/g, '\\"')}",
  "verdict": "VERIFIED" | "DEBUNKED" | "UNCONFIRMED",
  "confidenceScore": number between 0 and 100,
  "summary": "Brief 1-2 sentence explanation of your findings",
  "evidencePoints": ["point 1", "point 2"],
  "recommendedAction": "Advise citizens on safe behavior based on this finding"
}`;

  // Start async run for smooth UX and live step updates
  const asyncResult = await runAutomationAsync({ url: targetUrl, goal });
  return {
    success: true,
    runId: asyncResult.run_id,
    targetUrl,
    claim
  };
}

/**
 * Scout Emergency Resources or Live Weather/Disaster Intel
 */
export async function scoutLiveCrisisIntel({ region, category }) {
  const targetUrl = "https://weather.com";
  const goal = `Find active emergency weather or disaster alerts for region: "${region || "National"}".
Focus on category: "${category || "general"}".
Return JSON with { "region": "${region}", "alerts": [{ "headline": string, "severity": "HIGH" | "MEDIUM" | "LOW", "detail": string }] }`;

  const asyncResult = await runAutomationAsync({ url: targetUrl, goal });
  return {
    success: true,
    runId: asyncResult.run_id,
    region,
    category
  };
}
