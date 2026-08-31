import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const analyticsClient = new BetaAnalyticsDataClient();

const PROPERTY_ID = process.env.GA4_PROPERTY_ID;

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Medical365 Analytics API"
  });
});

app.get("/api/analytics/overview", async (req, res) => {
  try {
    if (!PROPERTY_ID) {
      return res.status(500).json({
        error: "GA4_PROPERTY_ID is not configured"
      });
    }

    const [response] = await analyticsClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: "7daysAgo",
          endDate: "today"
        }
      ],
      metrics: [
        { name: "activeUsers" },
        { name: "sessions" },
        { name: "screenPageViews" },
        { name: "averageSessionDuration" }
      ]
    });

    const values = response.rows?.[0]?.metricValues || [];

    res.json({
      visitors: Number(values[0]?.value || 0),
      sessions: Number(values[1]?.value || 0),
      pageViews: Number(values[2]?.value || 0),
      averageSessionDuration: Number(values[3]?.value || 0)
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
  console.log(`Medical365 Analytics API running on port ${PORT}`);
});
