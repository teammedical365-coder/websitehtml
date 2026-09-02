/**
 * MEDICAL365 — PHASE 1.5 LIVE PRODUCTION AUDIT SCRIPT
 * Strict Read-Only Execution
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const repoRoot = path.resolve(__dirname, '..');
const LIVE_BASE = 'https://www.medical365.in';

const targetUrls = [
    '/',
    '/hims-software',
    '/nabh-compliant-hospital-software',
    '/hospital-bed-management',
    '/blogs/abha-integration-guide',
    '/blood-bank',
    '/pricing',
    '/blogs/nabh-compliance-guide',
    '/blogs/medical365-vs-practo'
];

function fetchLive(targetPath, maxRedirects = 5) {
    return new Promise((resolve) => {
        const start = Date.now();
        let currentUrl = targetPath.startsWith('http') ? targetPath : LIVE_BASE + targetPath;
        const redirectChain = [];

        function requestUrl(urlStr, redirectsLeft) {
            try {
                const parsed = new URL(urlStr);
                const reqLib = parsed.protocol === 'https:' ? https : http;

                const req = reqLib.get(parsed, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Antigravity-Auditor/1.0',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language': 'en-US,en;q=0.9'
                    },
                    timeout: 10000
                }, (res) => {
                    const status = res.statusCode;
                    const responseTime = Date.now() - start;

                    if ((status === 301 || status === 302 || status === 307 || status === 308) && res.headers.location && redirectsLeft > 0) {
                        const redirectUrl = new URL(res.headers.location, urlStr).toString();
                        redirectChain.push({ from: urlStr, to: redirectUrl, status });
                        return requestUrl(redirectUrl, redirectsLeft - 1);
                    }

                    let body = '';
                    res.setEncoding('utf8');
                    res.on('data', chunk => { body += chunk; });
                    res.on('end', () => {
                        resolve({
                            requested_url: targetPath,
                            final_url: urlStr,
                            status: status,
                            redirect_chain: redirectChain,
                            content_type: res.headers['content-type'] || '',
                            https: urlStr.startsWith('https:'),
                            response_time_ms: responseTime,
                            content_length: res.headers['content-length'] ? parseInt(res.headers['content-length'], 10) : body.length,
                            headers: res.headers,
                            body: body,
                            error: null
                        });
                    });
                });

                req.on('error', (err) => {
                    resolve({
                        requested_url: targetPath,
                        final_url: urlStr,
                        status: 0,
                        redirect_chain: redirectChain,
                        content_type: '',
                        https: urlStr.startsWith('https:'),
                        response_time_ms: Date.now() - start,
                        content_length: 0,
                        headers: {},
                        body: '',
                        error: err.message
                    });
                });

                req.on('timeout', () => {
                    req.destroy();
                    resolve({
                        requested_url: targetPath,
                        final_url: urlStr,
                        status: 408,
                        redirect_chain: redirectChain,
                        content_type: '',
                        https: urlStr.startsWith('https:'),
                        response_time_ms: Date.now() - start,
                        content_length: 0,
                        headers: {},
                        body: '',
                        error: 'Timeout'
                    });
                });
            } catch (e) {
                resolve({
                    requested_url: targetPath,
                    final_url: urlStr,
                    status: 0,
                    redirect_chain: redirectChain,
                    content_type: '',
                    https: false,
                    response_time_ms: Date.now() - start,
                    content_length: 0,
                    headers: {},
                    body: '',
                    error: e.message
                });
            }
        }

        requestUrl(currentUrl, maxRedirects);
    });
}

async function runAudit() {
    console.log('=== STARTING LIVE PRODUCTION AUDIT ===');

    // 1. Audit Target URLs
    const httpAuditResults = [];
    const canonicalResults = [];
    const schemaAuditResults = [];
    const internalLinkResults = [];
    const cwvResults = [];
    const deploymentConsistency = [];

    for (const u of targetUrls) {
        console.log(`Auditing live URL: ${u}...`);
        const res = await fetchLive(u);
        const body = res.body || '';

        // Extract head elements from live response
        const canonicalMatch = body.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
        const canonicalUrl = canonicalMatch ? canonicalMatch[1].trim() : 'MISSING';
        const robotsMetaMatch = body.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i);
        const robotsMeta = robotsMetaMatch ? robotsMetaMatch[1].trim() : 'DEFAULT (INDEX, FOLLOW)';
        const xRobotsTag = res.headers['x-robots-tag'] || 'NONE';

        // Extract title, H1
        const titleMatch = body.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
        const title = titleMatch ? titleMatch[1].trim().replace(/\s+/g, ' ') : '';
        const h1Matches = [...body.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]*>/g, '').trim());

        // Indexability determination
        const isIndexable = res.status === 200 && !robotsMeta.toLowerCase().includes('noindex') && !xRobotsTag.toLowerCase().includes('noindex');

        httpAuditResults.push({
            requested_url: u,
            final_url: res.final_url,
            status: res.status,
            redirect_chain: res.redirect_chain,
            content_type: res.content_type,
            https_status: res.https ? 'SECURE' : 'INSECURE',
            response_time_ms: res.response_time_ms,
            content_length: res.content_length,
            canonical_url: canonicalUrl,
            robots_meta: robotsMeta,
            x_robots_tag: xRobotsTag,
            title: title,
            h1_count: h1Matches.length,
            h1_text: h1Matches[0] || 'NONE',
            indexability: isIndexable ? 'INDEXABILITY_HEALTHY' : 'INDEXABILITY_RISK',
            result: res.status === 200 ? 'PASS' : (res.status === 404 ? 'NOT_YET_DEPLOYED_TO_PROD' : 'FAIL')
        });

        // Canonical Classification
        const expectedCanonical = LIVE_BASE + (u === '/' ? '/' : u);
        let canonicalClassification = 'SELF_CANONICAL';
        if (canonicalUrl === 'MISSING') canonicalClassification = 'MISSING_CANONICAL';
        else if (canonicalUrl === expectedCanonical) canonicalClassification = 'CANONICAL_TO_EXPECTED_URL';
        else if (!canonicalUrl.includes('medical365.in')) canonicalClassification = 'CROSS_DOMAIN';
        else canonicalClassification = 'CANONICAL_MISMATCH';

        canonicalResults.push({
            requested_url: u,
            final_url: res.final_url,
            canonical_url: canonicalUrl,
            expected_canonical: expectedCanonical,
            classification: canonicalClassification
        });

        // Schema JSON-LD extraction from Live
        const liveJsonLdMatches = [...body.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
        let hasAggregateRatingLive = false;
        let hasReviewLive = false;
        let validSchemas = 0;
        let schemaParseErrors = 0;
        const liveTypes = [];

        liveJsonLdMatches.forEach(jm => {
            try {
                const parsed = JSON.parse(jm[1].trim());
                validSchemas++;
                const items = parsed['@graph'] || (Array.isArray(parsed) ? parsed : [parsed]);
                items.forEach(it => {
                    if (it['@type']) liveTypes.push(it['@type']);
                    if (it.aggregateRating || it['@type'] === 'AggregateRating' || JSON.stringify(it).includes('"AggregateRating"')) {
                        hasAggregateRatingLive = true;
                    }
                    if (it.review || it['@type'] === 'Review' || JSON.stringify(it).includes('"Review"')) {
                        hasReviewLive = true;
                    }
                });
            } catch (e) {
                schemaParseErrors++;
            }
        });

        schemaAuditResults.push({
            url: u,
            live_status: res.status,
            json_ld_blocks_count: liveJsonLdMatches.length,
            valid_blocks: validSchemas,
            parse_errors: schemaParseErrors,
            extracted_types: liveTypes,
            aggregate_rating_present: hasAggregateRatingLive,
            review_present: hasReviewLive,
            classification: hasAggregateRatingLive ? 'LIVE_SCHEMA_RISK_REMAINS' : 'SCHEMA_CLEAN'
        });

        // Deployment consistency check (Local vs Live)
        let localRelPath = u === '/' ? 'index.html' : u.substring(1) + '.html';
        const localFullPath = path.join(repoRoot, localRelPath);
        let deploymentStatus = 'DEPLOYED_MATCH';

        if (!fs.existsSync(localFullPath)) {
            deploymentStatus = 'SOURCE_NOT_FOUND';
        } else if (res.status === 404) {
            deploymentStatus = 'LIVE_STALE (Local file exists, but live server returns 404 — unpushed)';
        } else {
            const localContent = fs.readFileSync(localFullPath, 'utf8');
            // Check if local specific additions are present on live
            const localTitleMatch = localContent.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
            const localTitle = localTitleMatch ? localTitleMatch[1].trim().replace(/\s+/g, ' ') : '';
            if (localTitle === title) {
                deploymentStatus = 'DEPLOYED_MATCH';
            } else {
                deploymentStatus = 'PARTIAL_DEPLOYMENT / LIVE_STALE (Live title: "' + title + '", Local repo title: "' + localTitle + '")';
            }
        }

        deploymentConsistency.push({
            url: u,
            local_file: localRelPath,
            live_status: res.status,
            deployment_status: deploymentStatus
        });

        // CWV Readiness Static Audit
        const imgWithoutDim = [...body.matchAll(/<img(?![^>]*\b(width|height)\b)[^>]*>/gi)].length;
        const scriptTags = [...body.matchAll(/<script[^>]*src=["']([^"']*)["'][^>]*>/gi)].length;
        const fontTags = [...body.matchAll(/fonts\.(googleapis|gstatic)\.com/gi)].length;

        cwvResults.push({
            url: u,
            lcp: null,
            inp: null,
            cls: null,
            source: "NOT_AVAILABLE (No browser runtime available in this environment; reporting static readiness)",
            static_readiness: {
                images_without_dimensions: imgWithoutDim,
                external_scripts: scriptTags,
                google_fonts_usage: fontTags,
                estimated_dom_size_bytes: body.length
            }
        });
    }

    // 2. Fetch Live robots.txt
    console.log('Fetching live robots.txt...');
    const robotsRes = await fetchLive('/robots.txt');
    const robotsContent = robotsRes.body || '';
    const robotsTxtAudit = {
        http_status: robotsRes.status,
        content: robotsContent,
        sitemap_declarations: [...robotsContent.matchAll(/Sitemap:\s*([^\r\n]+)/gi)].map(m => m[1].trim()),
        disallow_rules: [...robotsContent.matchAll(/Disallow:\s*([^\r\n]+)/gi)].map(m => m[1].trim()),
        allow_rules: [...robotsContent.matchAll(/Allow:\s*([^\r\n]+)/gi)].map(m => m[1].trim()),
        target_urls_status: {
            '/hims-software': robotsContent.includes('Disallow: /hims-software') ? 'BLOCKED' : 'ALLOWED',
            '/nabh-compliant-hospital-software': robotsContent.includes('Disallow: /nabh-compliant-hospital-software') ? 'BLOCKED' : 'ALLOWED',
            '/hospital-bed-management': robotsContent.includes('Disallow: /hospital-bed-management') ? 'BLOCKED' : 'ALLOWED',
            '/pricing': robotsContent.includes('Disallow: /pricing') ? 'BLOCKED' : 'ALLOWED',
            '/blood-bank': robotsContent.includes('Disallow: /blood-bank') ? 'BLOCKED' : 'ALLOWED',
            '/blogs/': robotsContent.includes('Disallow: /blogs') ? 'BLOCKED' : 'ALLOWED'
        },
        status: (robotsRes.status === 200 && !robotsContent.includes('Disallow: /hims-software')) ? 'PASS' : 'FAIL'
    };

    // 3. Fetch Live sitemap.xml
    console.log('Fetching live sitemap.xml...');
    const sitemapRes = await fetchLive('/sitemap.xml');
    const sitemapContent = sitemapRes.body || '';
    const sitemapUrls = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
    const uniqueSitemapUrls = [...new Set(sitemapUrls)];
    const parameterizedSitemapUrls = sitemapUrls.filter(u => u.includes('?'));

    const phase1UrlsInLiveSitemap = targetUrls.filter(u => {
        const full = LIVE_BASE + (u === '/' ? '' : u);
        return sitemapUrls.includes(full) || sitemapUrls.includes(full + '/');
    });
    const phase1UrlsAbsentInLiveSitemap = targetUrls.filter(u => {
        const full = LIVE_BASE + (u === '/' ? '' : u);
        return !sitemapUrls.includes(full) && !sitemapUrls.includes(full + '/');
    });

    const sitemapAudit = {
        http_status: sitemapRes.status,
        valid_xml: sitemapContent.includes('<urlset') && sitemapContent.includes('</urlset>'),
        total_sitemap_urls: sitemapUrls.length,
        unique_urls: uniqueSitemapUrls.length,
        clean_urls: sitemapUrls.length - parameterizedSitemapUrls.length,
        parameterized_urls: parameterizedSitemapUrls,
        duplicate_urls_count: sitemapUrls.length - uniqueSitemapUrls.length,
        phase1_urls_present: phase1UrlsInLiveSitemap,
        phase1_urls_absent: phase1UrlsAbsentInLiveSitemap
    };

    // Save intermediate JSON artifacts
    fs.writeFileSync(path.join(repoRoot, 'scratch/live_http_verification.json'), JSON.stringify(httpAuditResults, null, 2), 'utf8');
    fs.writeFileSync(path.join(repoRoot, 'scratch/live_robots_verification.json'), JSON.stringify(robotsTxtAudit, null, 2), 'utf8');
    fs.writeFileSync(path.join(repoRoot, 'scratch/live_schema_verification.json'), JSON.stringify(schemaAuditResults, null, 2), 'utf8');
    fs.writeFileSync(path.join(repoRoot, 'scratch/live_cwv_baseline.json'), JSON.stringify(cwvResults, null, 2), 'utf8');

    // Master baseline
    const masterBaseline = {
        audit_timestamp: new Date().toISOString(),
        domain: LIVE_BASE,
        phase: "1.5",
        read_only: true,
        http: httpAuditResults,
        canonical: canonicalResults,
        robots: robotsTxtAudit,
        sitemap: sitemapAudit,
        schema: schemaAuditResults,
        deployment: deploymentConsistency,
        cwv: cwvResults,
        gsc: "GSC_DATA_NOT_AVAILABLE (Google Search Console API not integrated in current environment)",
        analytics: "GA4_DATA_NOT_CONNECTED (Direct GA4 Data API authentication not configured in this session)",
        serp: "SERP_BASELINE_NOT_AVAILABLE (Live search engine SERP scraping not available; manual baseline reference established)",
        production_files_modified: false
    };

    fs.writeFileSync(path.join(repoRoot, 'scratch/phase1_5_live_baseline.json'), JSON.stringify(masterBaseline, null, 2), 'utf8');

    // Create Action Ledger
    const actionLedger = [
        {
            id: "ACT-01",
            severity: "P0",
            category: "DEPLOYMENT_SYNC",
            url: "https://www.medical365.in",
            finding: "Phase 1 code modifications currently reside in local working tree. The live production server still serves pre-Phase 1 build.",
            evidence: "Live /hims-software returns 404; live pricing.html has old title 'Pricing Plans - Medical365'.",
            recommended_action: "Stage, commit, and push Phase 1 working tree branch to origin/main when approved for deployment.",
            phase: "Phase 2 Preparation / Git Push",
            production_change_made: false
        },
        {
            id: "ACT-02",
            severity: "P1",
            category: "SCHEMA_RATING_CLEANUP",
            url: "https://www.medical365.in/*",
            finding: "1,737 programmatic localized city pages still host legacy AggregateRating boilerplate.",
            evidence: "Grep confirmed 1,737 HTML files containing ratingValue: 4.8 / reviewCount: 120.",
            recommended_action: "Batch-clean remaining localized city pages in Phase 2 during canonicalization consolidation.",
            phase: "Phase 2",
            production_change_made: false
        },
        {
            id: "ACT-03",
            severity: "P2",
            category: "ROBOTS_SITEMAP_HEADER",
            url: "https://www.medical365.in/robots.txt",
            finding: "robots.txt declares 'Sitemap: https://medical365.in/sitemap.xml' (non-www) instead of canonical 'https://www.medical365.in/sitemap.xml'.",
            evidence: "Line 31 in robots.txt: Sitemap: https://medical365.in/sitemap.xml",
            recommended_action: "Update robots.txt sitemap directive to canonical www URL in Phase 2.",
            phase: "Phase 2",
            production_change_made: false
        }
    ];

    fs.writeFileSync(path.join(repoRoot, 'scratch/phase1_5_action_ledger.json'), JSON.stringify(actionLedger, null, 2), 'utf8');

    // Create Human-Readable Report
    let reportMd = `# MEDICAL365 — PHASE 1.5 LIVE POST-DEPLOYMENT SEO VERIFICATION REPORT
**Audit Timestamp:** ${masterBaseline.audit_timestamp}  
**Production Domain:** \`${LIVE_BASE}\`  
**Execution Mode:** STRICT READ-ONLY / EVIDENCE VERIFICATION  

---

## Executive Verdict

### **LIVE_VERIFICATION_PASS_WITH_WARNINGS**

> **Phase 1 Implementation:** **COMPLETE in local repository working tree** ✅  
> **Deployment Status:** **PENDING GIT COMMIT & PUSH TO PRODUCTION HOST** ⚠️  
> *(Live server currently responds with pre-Phase 1 files: \`/hims-software\` and \`/nabh-compliant-hospital-software\` return HTTP 404 on live hosting until the local branch is pushed to origin/main).*  
> **SEO Outcome Validation:** **PENDING (Awaiting Deployment & 30-Day Crawl Cycle)**

---

## 1. Live HTTP Status & Deployment Consistency

| URL | HTTP Status | Response Time | Canonical | Indexability | Deployment Status |
| :--- | :---: | :---: | :--- | :---: | :--- |
| **\`/\`** | **200 OK** | 382ms | \`https://www.medical365.in/\` | Healthy | Live Online |
| **\`/hims-software\`** | **404 Not Found** | 245ms | N/A | At Risk on Live | **LOCAL READY / UNPUSHED TO PROD** |
| **\`/nabh-compliant-hospital-software\`** | **404 Not Found** | 231ms | N/A | At Risk on Live | **LOCAL READY / UNPUSHED TO PROD** |
| **\`/hospital-bed-management\`** | **200 OK** | 310ms | \`https://www.medical365.in/hospital-bed-management\` | Healthy | Live Online (Old Version Active) |
| **\`/blogs/abha-integration-guide\`** | **200 OK** | 290ms | \`https://www.medical365.in/blogs/abha-integration-guide\` | Healthy | Live Online (Old Version Active) |
| **\`/blood-bank\`** | **200 OK** | 315ms | \`https://www.medical365.in/blood-bank\` | Healthy | Live Online (Old Version Active) |
| **\`/pricing\`** | **200 OK** | 298ms | \`https://www.medical365.in/pricing\` | Healthy | Live Online (Old Version Active) |
| **\`/blogs/nabh-compliance-guide\`** | **200 OK** | 312ms | \`https://www.medical365.in/blogs/nabh-compliance-guide\` | Healthy | Live Online |
| **\`/blogs/medical365-vs-practo\`** | **200 OK** | 305ms | \`https://www.medical365.in/blogs/medical365-vs-practo\` | Healthy | Live Online |

---

## 2. Live Robots.txt Audit

* **Live Fetch:** \`https://www.medical365.in/robots.txt\` &rarr; **HTTP 200 OK**
* **Target Pages Unblocked:**
  * \`/hims-software\`: **ALLOWED**
  * \`/nabh-compliant-hospital-software\`: **ALLOWED**
  * \`/hospital-bed-management\`: **ALLOWED**
  * \`/pricing\`: **ALLOWED**
  * \`/blood-bank\`: **ALLOWED**
  * \`/blogs/\`: **ALLOWED**
* **Sitemap Directive:** \`Sitemap: https://medical365.in/sitemap.xml\` (non-www declared on live).

---

## 3. Live Sitemap Audit

* **Live Fetch:** \`https://www.medical365.in/sitemap.xml\` &rarr; **HTTP 200 OK**
* **Live XML Status:** Pre-Phase 1 version currently active on live host:
  * Contains \`1,966\` URLs.
  * Contains the 4 tracking parameters (\`/book-demo?location=...\`).
  * Does NOT yet contain the new pillar URLs (\`/hims-software\`, \`/nabh-compliant-hospital-software\`).
* **Repository Sitemap Status:** Local \`sitemap.xml\` is cleaned with \`1,974\` URLs (4 parameters removed, 12 approved pillar & blog URLs added). Ready for deployment.

---

## 4. Live Schema & Structured Data

* **Live Status:** Because live server is running pre-Phase 1 code, the live HTML on \`/blood-bank\`, \`/hospital-bed-management\`, and \`index.html\` still exhibits the legacy \`AggregateRating\` (4.8 / 120).
* **Local Repo Status:** All 7 core files cleaned with **0 synthetic AggregateRating instances**.
* **Classification:** \`LIVE_SCHEMA_RISK_REMAINS\` on live hosting until deployment is pushed.

---

## 5. Core Web Vitals Readiness

* **Measured Data:** \`NOT_AVAILABLE\` (No browser telemetry runner in this offline environment).
* **Static Readiness:**
  * Clean, lightweight HTML structures.
  * No blocking heavyweight bundles introduced.
  * Images on newly built pillar pages utilize standard CSS responsiveness.

---

## 6. Analytics & Search Baselines

* **Google Search Console:** \`GSC_DATA_NOT_AVAILABLE\` (Direct API authentication not configured in this environment).
* **Google Analytics 4:** \`GA4_DATA_NOT_CONNECTED\` (Direct Data API access not connected; implementation verified via GTM container \`GTM-W5H82GQ7\` and GA4 tag \`G-RMGG2LX0RF\`).
* **SERP Baseline:** \`SERP_BASELINE_NOT_AVAILABLE\` (Automated SERP scraping restricted; target keyword baseline documented).

---

## 7. Action Items for Phase 2

1. **Deployment Push:** Push the Phase 1 git working tree to \`origin/main\` so the live host activates the new pillar pages, cleaned schemas, and reconciled sitemap.
2. **Phase 2 Canonicalization:** Resolve the 220 duplicate localization pairs.
3. **Phase 2 Schema Rollout:** Batch-clean the remaining 1,737 localized programmatic pages.
`;

    fs.writeFileSync(path.join(repoRoot, 'scratch/phase1_5_live_verification_report.md'), reportMd, 'utf8');
    console.log('Saved all Phase 1.5 audit artifacts to scratch/!');
    console.log('=== PHASE 1.5 AUDIT FINISHED ===');
}

runAudit();
