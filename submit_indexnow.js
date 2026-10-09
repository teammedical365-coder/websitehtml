const https = require("https");
const fs = require("fs");

const API_KEY = "026ee2a2aa824a18b74e9385bd3d4177";
const HOST = "www.medical365.in";
const KEY_LOCATION = `https://${HOST}/${API_KEY}.txt`;

// Extract URLs from sitemaps if available, or fallback to core URLs
let urls = [
  `https://${HOST}/`,
  `https://${HOST}/pricing`,
  `https://${HOST}/locations`,
  `https://${HOST}/about`,
  `https://${HOST}/blogs`,
  `https://${HOST}/hims-software`,
  `https://${HOST}/emr`,
  `https://${HOST}/clinics`,
  `https://${HOST}/hospitals`,
  `https://${HOST}/nabh-compliant-hospital-software`
];

// Helper to extract URLs from sitemap files
function extractUrls(filePath) {
  if (fs.existsSync(filePath)) {
    const xml = fs.readFileSync(filePath, "utf8");
    const matches = xml.match(/<loc>(https:\/\/www\.medical365\.in\/[^<]+)<\/loc>/g);
    if (matches) {
      return matches.map(m => m.replace(/<\/?loc>/g, ""));
    }
  }
  return [];
}

const mainUrls = extractUrls("sitemap-main.xml");
const locUrls = extractUrls("sitemap-locations.xml");

const allUrls = Array.from(new Set([...urls, ...mainUrls, ...locUrls]));

// IndexNow allows up to 10,000 URLs per request
const payload = JSON.stringify({
  host: HOST,
  key: API_KEY,
  keyLocation: KEY_LOCATION,
  urlList: allUrls.slice(0, 5000)
});

const options = {
  hostname: "api.indexnow.org",
  port: 443,
  path: "/indexnow",
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(payload)
  }
};

console.log(`Submitting ${allUrls.length} URLs to IndexNow...`);

const req = https.request(options, (res) => {
  console.log(`IndexNow Response Status: ${res.statusCode} ${res.statusMessage}`);
  let responseData = "";

  res.on("data", (chunk) => {
    responseData += chunk;
  });

  res.on("end", () => {
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log("SUCCESS: URLs submitted successfully to IndexNow (Bing, Copilot & AI Engines)!");
    } else {
      console.log("Response body:", responseData);
    }
  });
});

req.on("error", (e) => {
  console.error("Error submitting to IndexNow:", e.message);
});

req.write(payload);
req.end();
