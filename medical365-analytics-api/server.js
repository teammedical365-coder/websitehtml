import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const analyticsClient = new BetaAnalyticsDataClient();
const PROPERTY_ID = process.env.GA4_PROPERTY_ID;

// Persistent Leads Store File
const LEADS_FILE = path.join(__dirname, "leads_data.json");

function loadLeads() {
  try {
    if (fs.existsSync(LEADS_FILE)) {
      const data = fs.readFileSync(LEADS_FILE, "utf8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn("Could not read leads file:", err.message);
  }
  return [];
}

function saveLeads(leads) {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf8");
  } catch (err) {
    console.error("Could not save leads to file:", err.message);
  }
}

let leadsStore = loadLeads();

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Medical365 Analytics & Leads API"
  });
});

// ==========================================
// 1. Leads & Click Tracking Endpoints
// ==========================================

// 1.1 GET All Captured Leads & Realtime Inbound Stats
app.get("/api/leads", (req, res) => {
  const whatsappClicks = leadsStore.filter(l => l.type === "whatsapp").length;
  const callClicks = leadsStore.filter(l => l.type === "call").length;
  const demoRequests = leadsStore.filter(l => l.type === "book_demo").length;
  const contactForms = leadsStore.filter(l => l.type === "contact_form").length;
  const totalLeads = leadsStore.length;

  res.json({
    totalLeads,
    stats: {
      whatsappClicks,
      callClicks,
      demoRequests,
      contactForms
    },
    leads: leadsStore
  });
});

// 1.2 POST Record Form Submission (Book Demo or Contact Us)
app.post("/api/leads/record", (req, res) => {
  try {
    const { type, name, email, phone, organization, facilityType, bedCount, message, sourcePage, referrer } = req.body;

    const newLead = {
      id: "lead_" + Date.now(),
      type: type || "book_demo",
      name: name || "Website Prospect",
      email: email || "—",
      phone: phone || "—",
      organization: organization || "Healthcare Facility",
      facilityType: facilityType || "Clinic / Hospital",
      bedCount: bedCount || "1–10 Beds",
      message: message || "Inbound lead submitted via website form.",
      sourcePage: sourcePage || "/",
      referrer: referrer || "direct",
      status: "New",
      timestamp: new Date().toISOString()
    };

    leadsStore.unshift(newLead);
    saveLeads(leadsStore);

    res.status(201).json({ success: true, lead: newLead });
  } catch (err) {
    console.error("Error recording lead:", err);
    res.status(500).json({ error: "Failed to record lead", message: err.message });
  }
});

// 1.3 POST Track Click Event (WhatsApp Click or Call Now Click)
app.post("/api/leads/track", (req, res) => {
  try {
    const { eventType, sourcePage, phone, message } = req.body; // 'whatsapp' | 'call'

    const newInteraction = {
      id: "int_" + Date.now(),
      type: eventType === "call" ? "call" : "whatsapp",
      name: eventType === "call" ? "Direct Phone Call" : "WhatsApp Inquiry",
      email: "—",
      phone: phone || "+91 77919 10007",
      organization: "Website Inbound Visitor",
      facilityType: "Clinic / Hospital",
      bedCount: "—",
      message: message || (eventType === "call" ? "Inbound call initiated from website" : "WhatsApp chat initiated from website"),
      sourcePage: sourcePage || "/",
      referrer: req.headers.referer || "direct",
      status: "New",
      timestamp: new Date().toISOString()
    };

    leadsStore.unshift(newInteraction);
    saveLeads(leadsStore);

    res.json({ success: true, interaction: newInteraction });
  } catch (err) {
    console.error("Error tracking interaction:", err);
    res.status(500).json({ error: "Failed to track interaction", message: err.message });
  }
});

// 1.4 PATCH Update Lead Status
app.patch("/api/leads/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const lead = leadsStore.find(l => l.id === id);
  if (!lead) {
    return res.status(404).json({ error: "Lead not found" });
  }

  lead.status = status;
  saveLeads(leadsStore);
  res.json({ success: true, lead });
});

// ==========================================
// 2. Comprehensive GA4 Real-Time Overview API
// ==========================================
app.get("/api/analytics/realtime", async (req, res) => {
  try {
    if (!PROPERTY_ID) {
      return res.status(500).json({ error: "GA4_PROPERTY_ID is not configured" });
    }

    const [totalResponse] = await analyticsClient.runRealtimeReport({
      property: `properties/${PROPERTY_ID}`,
      metrics: [{ name: "activeUsers" }, { name: "eventCount" }]
    });

    const activeUsers = Number(totalResponse.rows?.[0]?.metricValues?.[0]?.value || 0);
    const eventCount = Number(totalResponse.rows?.[0]?.metricValues?.[1]?.value || 0);

    let minuteTimeline = [];
    let activeUsers5min = 0;
    try {
      const [minuteResponse] = await analyticsClient.runRealtimeReport({
        property: `properties/${PROPERTY_ID}`,
        dimensions: [{ name: "minutesAgo" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ dimension: { dimensionName: "minutesAgo" }, desc: true }]
      });

      minuteTimeline = (minuteResponse.rows || []).map(r => {
        const mins = Number(r.dimensionValues?.[0]?.value || 0);
        const users = Number(r.metricValues?.[0]?.value || 0);
        if (mins <= 5) activeUsers5min += users;
        return { minutesAgo: mins, label: `-${mins}m`, users };
      });
    } catch (minErr) {
      console.warn("Realtime minute timeline query:", minErr.message);
    }

    let topPages = [];
    try {
      const [pagesResponse] = await analyticsClient.runRealtimeReport({
        property: `properties/${PROPERTY_ID}`,
        dimensions: [{ name: "unifiedScreenName" }],
        metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
        limit: 10
      });

      topPages = (pagesResponse.rows || []).map(r => ({
        title: r.dimensionValues?.[0]?.value || "/",
        views: Number(r.metricValues?.[0]?.value || 0),
        users: Number(r.metricValues?.[1]?.value || 0)
      }));
    } catch (pagesErr) {
      console.warn("Realtime pages query:", pagesErr.message);
    }

    let topEvents = [];
    try {
      const [eventsResponse] = await analyticsClient.runRealtimeReport({
        property: `properties/${PROPERTY_ID}`,
        dimensions: [{ name: "eventName" }],
        metrics: [{ name: "eventCount" }],
        limit: 10
      });

      topEvents = (eventsResponse.rows || []).map(r => ({
        eventName: r.dimensionValues?.[0]?.value || "page_view",
        count: Number(r.metricValues?.[0]?.value || 0)
      }));
    } catch (eventsErr) {
      console.warn("Realtime events query:", eventsErr.message);
    }

    let topLocations = [];
    try {
      const [locResponse] = await analyticsClient.runRealtimeReport({
        property: `properties/${PROPERTY_ID}`,
        dimensions: [{ name: "city" }, { name: "country" }],
        metrics: [{ name: "activeUsers" }],
        limit: 10
      });

      topLocations = (locResponse.rows || []).map(r => ({
        city: r.dimensionValues?.[0]?.value || "(not set)",
        country: r.dimensionValues?.[1]?.value || "India",
        users: Number(r.metricValues?.[0]?.value || 0)
      }));
    } catch (locErr) {
      console.warn("Realtime location query:", locErr.message);
    }

    res.json({
      activeUsers,
      activeUsers5min,
      eventCount,
      minuteTimeline,
      topPages,
      topEvents,
      topLocations,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("GA4 Realtime API Error:", error);
    res.status(500).json({
      error: "Unable to retrieve real-time data",
      message: error.message
    });
  }
});

// ==========================================
// 3. Historical & Filtered Analytics Overview API
// ==========================================
app.get("/api/analytics/overview", async (req, res) => {
  try {
    if (!PROPERTY_ID) {
      return res.status(500).json({
        error: "GA4_PROPERTY_ID is not configured"
      });
    }

    const { range, startDate, endDate } = req.query;

    let start = "30daysAgo";
    let end = "today";

    if (startDate && endDate) {
      start = startDate;
      end = endDate;
    } else if (range) {
      switch (range) {
        case "today":
          start = "today";
          end = "today";
          break;
        case "yesterday":
          start = "yesterday";
          end = "yesterday";
          break;
        case "7d":
          start = "7daysAgo";
          end = "today";
          break;
        case "30d":
          start = "30daysAgo";
          end = "today";
          break;
        case "90d":
          start = "90daysAgo";
          end = "today";
          break;
        case "this-month":
          start = "startOfThisMonth";
          end = "today";
          break;
        case "this-year":
        case "365d":
        case "all":
          start = "365daysAgo";
          end = "today";
          break;
        default:
          start = "30daysAgo";
          end = "today";
      }
    }

    const [overviewResponse] = await analyticsClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: start, endDate: end }],
      metrics: [
        { name: "activeUsers" },
        { name: "sessions" },
        { name: "screenPageViews" },
        { name: "averageSessionDuration" },
        { name: "eventCount" },
        { name: "newUsers" }
      ]
    });

    const values = overviewResponse.rows?.[0]?.metricValues || [];
    const visitors = Number(values[0]?.value || 0);
    const sessions = Number(values[1]?.value || 0);
    const pageViews = Number(values[2]?.value || 0);
    const averageSessionDuration = Number(values[3]?.value || 0);
    const eventCount = Number(values[4]?.value || 0);
    const newUsers = Number(values[5]?.value || 0);

    let timeline = [];
    try {
      const [trendResponse] = await analyticsClient.runReport({
        property: `properties/${PROPERTY_ID}`,
        dateRanges: [{ startDate: start, endDate: end }],
        dimensions: [{ name: "date" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ dimension: { dimensionName: "date" }, desc: false }]
      });

      timeline = (trendResponse.rows || []).map(row => {
        const d = row.dimensionValues?.[0]?.value || "";
        const formattedDate = d.length === 8 
          ? `${d.substring(6, 8)}/${d.substring(4, 6)}`
          : d;
        return {
          date: formattedDate,
          rawDate: d,
          users: Number(row.metricValues?.[0]?.value || 0)
        };
      });
    } catch (trendErr) {
      console.warn("Could not fetch daily trend:", trendErr.message);
    }

    let topPages = [];
    try {
      const [pagesResponse] = await analyticsClient.runReport({
        property: `properties/${PROPERTY_ID}`,
        dateRanges: [{ startDate: start, endDate: end }],
        dimensions: [{ name: "pageTitle" }, { name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }, { name: "bounceRate" }],
        limit: 10
      });

      topPages = (pagesResponse.rows || []).map(row => ({
        title: row.dimensionValues?.[0]?.value || "Untitled",
        path: row.dimensionValues?.[1]?.value || "/",
        views: Number(row.metricValues?.[0]?.value || 0),
        users: Number(row.metricValues?.[1]?.value || 0),
        bounceRate: ((Number(row.metricValues?.[2]?.value || 0)) * 100).toFixed(1) + "%"
      }));
    } catch (pagesErr) {
      console.warn("Could not fetch top pages:", pagesErr.message);
    }

    let topSources = [];
    try {
      const [sourcesResponse] = await analyticsClient.runReport({
        property: `properties/${PROPERTY_ID}`,
        dateRanges: [{ startDate: start, endDate: end }],
        dimensions: [{ name: "sessionSourceMedium" }],
        metrics: [{ name: "sessions" }, { name: "activeUsers" }],
        limit: 10
      });

      topSources = (sourcesResponse.rows || []).map(row => ({
        sourceMedium: row.dimensionValues?.[0]?.value || "(direct) / (none)",
        sessions: Number(row.metricValues?.[0]?.value || 0),
        users: Number(row.metricValues?.[1]?.value || 0)
      }));
    } catch (sourcesErr) {
      console.warn("Could not fetch top sources:", sourcesErr.message);
    }

    let topCities = [];
    try {
      const [citiesResponse] = await analyticsClient.runReport({
        property: `properties/${PROPERTY_ID}`,
        dateRanges: [{ startDate: start, endDate: end }],
        dimensions: [{ name: "city" }],
        metrics: [{ name: "activeUsers" }],
        limit: 10
      });

      topCities = (citiesResponse.rows || []).map(row => ({
        city: row.dimensionValues?.[0]?.value || "(not set)",
        users: Number(row.metricValues?.[0]?.value || 0)
      }));
    } catch (citiesErr) {
      console.warn("Could not fetch top cities:", citiesErr.message);
    }

    // Include Realtime Inbound Counts
    const whatsappClicks = leadsStore.filter(l => l.type === "whatsapp").length;
    const callClicks = leadsStore.filter(l => l.type === "call").length;
    const demoRequests = leadsStore.filter(l => l.type === "book_demo").length;
    const contactForms = leadsStore.filter(l => l.type === "contact_form").length;

    res.json({
      range: range || "custom",
      startDate: start,
      endDate: end,
      visitors,
      sessions,
      pageViews,
      averageSessionDuration,
      eventCount,
      newUsers,
      timeline,
      topPages,
      topSources,
      topCities,
      inboundStats: {
        whatsappClicks,
        callClicks,
        demoRequests,
        contactForms,
        totalLeads: leadsStore.length
      }
    });

  } catch (error) {
    console.error("GA4 API Error:", error);

    res.status(500).json({
      error: "Unable to retrieve GA4 data",
      message: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Medical365 Analytics & Leads API running on port ${PORT}`);
});
