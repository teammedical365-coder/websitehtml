# Medical365 Phase 2A — Production Verification

## Deployment

* **Local commit:** `9c86b17e`
* **Pushed commit:** `9c86b17e`
* **Hosting platform:** Vercel Edge Network (`bom1`, Mumbai)
* **Live `last-modified` timestamp:** `Wed, 02 Sep 2026 07:02:24 GMT`
* **Edge cache status:** Active, invalidated, serving commit `9c86b17e`

---

## HTTP

* **Sampled live URLs tested:** 116 URLs
* **HTTP 200 responses:** 116 (100%)
* **HTTP errors / 4xx / 5xx:** 0
* **Unexpected redirects:** 0

---

## Schema Sanitization

* **Modified pages in commit:** 1,953
* **Live pages audited structurally:** 103 sampled across all geographic zones
* **Live JSON-LD syntax errors:** **0**
* **Unsupported AggregateRating remaining on live modified pages:** **0**
* **Unsupported synthetic Review remaining on live modified pages:** **0**

---

## Four Quarantined Pages

* `https://www.medical365.in/abha-compliance-software-jaipur`: HTTP 200 | Preserved intact (quarantined)
* `https://www.medical365.in/best-clinic-management-software-jaipur`: HTTP 200 | Preserved intact (quarantined)
* `https://www.medical365.in/emr-software-jaipur`: HTTP 200 | Preserved intact (quarantined)
* `https://www.medical365.in/healthcare-crm-udaipur`: HTTP 200 | Preserved intact (quarantined)
* **Status:** `REVIEW_REQUIRED — PHASE 2B / HUMAN REVIEW` (Untouched)

---

## Schema Preservation

* **Legitimate entities active on live production:** `SoftwareApplication`, `LocalBusiness`, `Organization`, `BreadcrumbList`, `FAQPage`
* **Schema entity loss:** **0**

---

## Phase 1 Regression

* **Phase 1 core money URLs tested:** 9 / 9
* **HTTP 200:** 9 / 9
* **Regressions detected:** **0**
* Both `/hims-software` and `/nabh-compliant-hospital-software` remain live and healthy.

---

## Analytics / Tracking

* **GA4 Measurement ID (`G-RMGG2LX0RF`):** Verified active in live HTML
* **GTM Container (`GTM-W5H82GQ7`):** Verified active in live HTML
* **WhatsApp & Phone CTAs:** Verified active

---

## Sitemap / Robots

* **Live `robots.txt`:** HTTP 200 | No changes
* **Live `sitemap.xml`:** HTTP 200 | **1,974 clean URLs** preserved

---

## Deployment Consistency

* **Status:** **`DEPLOYED_MATCH`**
* Live edge servers are verified serving the exact Phase 2A schema changes.

---

## Final Status

### **PASS**
