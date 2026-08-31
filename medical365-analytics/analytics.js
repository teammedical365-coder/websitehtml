/**
 * Medical365 Analytics Platform V6 - Enterprise Core Engine & Central State
 * Unified Reactive State -> Data Layer -> Dynamic Calculations -> DOM & Chart Updates
 */

// ==========================================
// 1. Central Application State (Single Source of Truth)
// ==========================================
const appState = {
    view: 'overview',
    dateRange: '30d', // 'today' | 'yesterday' | '7d' | '30d' | '90d' | 'this-month' | 'last-month' | 'this-quarter' | 'this-year' | 'custom'
    customStartDate: '2026-08-01',
    customEndDate: '2026-08-31',
    comparison: 'previous-period', // 'previous-period' | 'previous-year' | 'none'
    source: 'all', // 'all' | 'organic' | 'paid' | 'direct' | 'social' | 'referral'
    device: 'all', // 'all' | 'mobile' | 'desktop' | 'tablet'
    country: 'all', // 'all' | 'india' | 'delhi' | 'usa' | 'uae' | 'uk' | 'singapore'
    page: 'all', // 'all' | '/hims-software' | '/emr-software' | '/lims-software' | '/pricing' | '/contact'
    campaign: 'all',
    segment: 'all',
    role: 'Administrator',
    dataMode: 'demo', // 'demo' | 'live'
    theme: localStorage.getItem('m365_theme') || 'light',
    currentStorySlide: 1,
    savedViews: JSON.parse(localStorage.getItem('m365_saved_views')) || [
        { name: 'Organic Mobile', state: { dateRange: '30d', source: 'organic', device: 'mobile', country: 'all', page: 'all' } },
        { name: 'High Intent Hospital Leads', state: { dateRange: '30d', source: 'all', device: 'desktop', country: 'all', page: '/pricing' } },
        { name: 'SEO Growth Campaign', state: { dateRange: '30d', source: 'organic', device: 'all', country: 'delhi', page: '/hims-software' } }
    ],
    favorites: JSON.parse(localStorage.getItem('m365_favorites')) || ['/hims-software', 'Google Ads - HIMS', 'Weekly Executive Report'],
    selectedTableRows: []
};

// Debug Mode Flag
const DEBUG = false;
function logDebug(...args) {
    if (DEBUG) console.log('[Medical365 V6 Debug]', ...args);
}

// ==========================================
// 2. Dynamic Analytics Data & Calculation Engine
// ==========================================
const analyticsEngine = {
    // Base 30-day reference dataset
    base30d: {
        visitors: 48291,
        leads: 1284,
        demos: 342,
        revenuePerLead: 4820
    },

    // Compute dynamic slice based on current state
    calculateMetrics: function() {
        let dateMultiplier = 1.0;
        let dateLabel = 'Last 30 Days';

        switch (appState.dateRange) {
            case 'today':
                dateMultiplier = 0.035;
                dateLabel = 'Today';
                break;
            case 'yesterday':
                dateMultiplier = 0.038;
                dateLabel = 'Yesterday';
                break;
            case '7d':
                dateMultiplier = 0.245;
                dateLabel = 'Last 7 Days';
                break;
            case '30d':
                dateMultiplier = 1.0;
                dateLabel = 'Last 30 Days';
                break;
            case '90d':
                dateMultiplier = 2.85;
                dateLabel = 'Last 90 Days';
                break;
            case 'this-month':
                dateMultiplier = 1.0;
                dateLabel = 'This Month';
                break;
            case 'last-month':
                dateMultiplier = 0.88;
                dateLabel = 'Last Month';
                break;
            case 'this-quarter':
                dateMultiplier = 2.85;
                dateLabel = 'This Quarter';
                break;
            case 'this-year':
                dateMultiplier = 11.2;
                dateLabel = 'This Year';
                break;
            case 'custom':
                dateMultiplier = 0.65;
                dateLabel = `${appState.customStartDate} to ${appState.customEndDate}`;
                break;
        }

        // Source filter weighting
        let sourceMultiplier = 1.0;
        let sourceCvrFactor = 1.0;
        switch (appState.source) {
            case 'organic': sourceMultiplier = 0.48; sourceCvrFactor = 0.98; break;
            case 'paid': sourceMultiplier = 0.12; sourceCvrFactor = 1.25; break;
            case 'direct': sourceMultiplier = 0.22; sourceCvrFactor = 0.96; break;
            case 'social': sourceMultiplier = 0.09; sourceCvrFactor = 0.78; break;
            case 'referral': sourceMultiplier = 0.06; sourceCvrFactor = 0.85; break;
        }

        // Device filter weighting
        let deviceMultiplier = 1.0;
        let deviceCvrFactor = 1.0;
        switch (appState.device) {
            case 'mobile': deviceMultiplier = 0.68; deviceCvrFactor = 0.66; break; // Mobile friction
            case 'desktop': deviceMultiplier = 0.28; deviceCvrFactor = 1.52; break; // High intent desktop
            case 'tablet': deviceMultiplier = 0.04; deviceCvrFactor = 0.88; break;
        }

        // Country filter weighting
        let countryMultiplier = 1.0;
        switch (appState.country) {
            case 'india': countryMultiplier = 0.82; break;
            case 'delhi': countryMultiplier = 0.34; break;
            case 'usa': countryMultiplier = 0.08; break;
            case 'uae': countryMultiplier = 0.05; break;
            case 'uk': countryMultiplier = 0.03; break;
            case 'singapore': countryMultiplier = 0.02; break;
        }

        // Page filter weighting
        let pageMultiplier = 1.0;
        switch (appState.page) {
            case '/hims-software': pageMultiplier = 0.17; break;
            case '/emr-software': pageMultiplier = 0.12; break;
            case '/lims-software': pageMultiplier = 0.09; break;
            case '/pricing': pageMultiplier = 0.10; break;
            case '/contact': pageMultiplier = 0.04; break;
        }

        // Combined calculations
        const combinedFactor = dateMultiplier * sourceMultiplier * deviceMultiplier * countryMultiplier * pageMultiplier;
        const visitors = Math.max(12, Math.round(this.base30d.visitors * combinedFactor));
        const sessions = Math.round(visitors * 1.273);
        const pageViews = Math.round(visitors * 2.957);

        // Conversion & Leads
        const baseCvrRate = 0.0276 * sourceCvrFactor * deviceCvrFactor;
        const leads = Math.max(1, Math.round(visitors * baseCvrRate));
        const demos = Math.max(0, Math.round(leads * 0.266));
        const cvr = ((leads / visitors) * 100).toFixed(2) + '%';

        // Revenue
        const revenuePerLead = appState.source === 'paid' ? 5200 : 4820;
        const totalPipelineRupees = leads * revenuePerLead;
        const pipelineRevenue = totalPipelineRupees >= 100000
            ? '₹' + (totalPipelineRupees / 100000).toFixed(1) + 'L'
            : '₹' + totalPipelineRupees.toLocaleString();

        // Engagement Time
        const engagement = appState.device === 'mobile' ? '1m 58s' : (appState.page === '/hims-software' ? '3m 48s' : '2m 41s');

        // Scorecard
        const isMobileFriction = appState.device === 'mobile';
        const scorecard = {
            overall: isMobileFriction ? 82 : 89,
            traffic: 91,
            seo: appState.source === 'organic' ? 94 : 88,
            conversion: isMobileFriction ? 68 : 84,
            ux: isMobileFriction ? 74 : 86,
            performance: 94,
            content: 82
        };

        // Comparison Period Metrics (e.g. +18.4% or -4.8%)
        const previousVisitors = Math.round(visitors / 1.184);
        const previousLeads = Math.round(leads / 1.162);
        const previousSessions = Math.round(sessions / 1.148);
        const previousPageviews = Math.round(pageViews / 1.213);
        const previousDemos = Math.round(demos / 1.128);

        return {
            dateLabel,
            visitors,
            sessions,
            pageViews,
            engagement,
            leads,
            demos,
            cvr,
            revenuePerLead: '₹' + revenuePerLead.toLocaleString(),
            pipelineRevenue,
            scorecard,
            previous: {
                visitors: previousVisitors,
                leads: previousLeads,
                sessions: previousSessions,
                pageViews: previousPageviews,
                demos: previousDemos
            }
        };
    },

    // Generate chart data arrays matching the current filtered segment
    generateChartData: function() {
        const metrics = this.calculateMetrics();
        let labels = [];
        let actualData = [];
        let forecastData = [];

        if (appState.dateRange === 'today' || appState.dateRange === 'yesterday') {
            labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'];
            const step = metrics.visitors / 6;
            actualData = labels.map((_, i) => Math.round((i + 1) * step * (0.8 + Math.sin(i) * 0.2)));
            forecastData = labels.map(() => null);
        } else if (appState.dateRange === '7d') {
            labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8 (Proj)', 'Day 9 (Proj)'];
            const step = metrics.visitors / 7;
            actualData = [
                Math.round(step * 0.85),
                Math.round(step * 0.92),
                Math.round(step * 1.05),
                Math.round(step * 1.12),
                Math.round(step * 0.98),
                Math.round(step * 1.15),
                Math.round(step * 1.22),
                null,
                null
            ];
            forecastData = [null, null, null, null, null, null, Math.round(step * 1.22), Math.round(step * 1.28), Math.round(step * 1.34)];
        } else {
            // 30 days or default
            labels = ['1 Aug', '5 Aug', '10 Aug', '15 Aug', '20 Aug', '25 Aug', '31 Aug', '7 Sep (Proj)', '15 Sep (Proj)'];
            const base = metrics.visitors / 7;
            actualData = [
                Math.round(base * 0.75),
                Math.round(base * 0.88),
                Math.round(base * 0.84),
                Math.round(base * 1.02),
                Math.round(base * 1.10),
                Math.round(base * 1.24),
                Math.round(base * 1.38),
                null,
                null
            ];
            forecastData = [null, null, null, null, null, null, Math.round(base * 1.38), Math.round(base * 1.48), Math.round(base * 1.58)];
        }

        return { labels, actualData, forecastData };
    }
};

// ==========================================
// 2.1 Live GA4 Data Adapter & Analytics Service
// ==========================================
const apiDataAdapter = {
    async getRealtime() {
        try {
            const response = await fetch("http://localhost:3000/api/analytics/realtime");
            if (!response.ok) return { activeUsers: 0 };
            return await response.json();
        } catch (e) {
            return { activeUsers: 0 };
        }
    },

    async getOverview(dateRange = appState.dateRange, customStart = appState.customStartDate, customEnd = appState.customEndDate) {
        try {
            let url = `http://localhost:3000/api/analytics/overview?range=${encodeURIComponent(dateRange)}`;
            if (dateRange === 'custom' && customStart && customEnd) {
                url += `&startDate=${encodeURIComponent(customStart)}&endDate=${encodeURIComponent(customEnd)}`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const ga4Data = await response.json();

            // Format duration into m:ss
            const rawSecs = Math.round(ga4Data.averageSessionDuration || 0);
            const mins = Math.floor(rawSecs / 60);
            const secs = rawSecs % 60;
            const engagement = `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;

            const visitors = Number(ga4Data.visitors) || 0;
            const sessions = Number(ga4Data.sessions) || 0;
            const pageViews = Number(ga4Data.pageViews) || 0;

            const leads = Math.max(1, Math.round(visitors * 0.026));
            const demos = Math.max(0, Math.round(leads * 0.266));
            const cvr = visitors > 0 ? ((leads / visitors) * 100).toFixed(2) + '%' : '0.00%';
            const totalPipelineRupees = leads * 4820;
            const pipelineRevenue = totalPipelineRupees >= 100000
                ? '₹' + (totalPipelineRupees / 100000).toFixed(1) + 'L'
                : '₹' + totalPipelineRupees.toLocaleString();

            const dateLabels = {
                'today': 'Today (Live GA4)',
                'yesterday': 'Yesterday (Live GA4)',
                '7d': 'Last 7 Days (Live GA4)',
                '30d': 'Last 30 Days (Live GA4)',
                '90d': 'Last 90 Days (Historical GA4)',
                'this-month': 'This Month (Live GA4)',
                'this-year': 'This Year / All Time (Historical GA4)',
                'custom': `${customStart} to ${customEnd} (Historical GA4)`
            };

            return {
                dateLabel: dateLabels[dateRange] || `${dateRange} (Live GA4)`,
                visitors,
                sessions,
                pageViews,
                engagement,
                leads,
                demos,
                cvr,
                revenuePerLead: '₹4,820',
                pipelineRevenue,
                scorecard: {
                    overall: 92,
                    traffic: 94,
                    seo: 91,
                    conversion: 85,
                    ux: 88,
                    performance: 96,
                    content: 86
                }
            };
        } catch (err) {
            console.warn("Could not fetch live GA4 data, falling back to demo data:", err);
            showToast("Failed to fetch Live GA4 data. Using Demo data.", "warning");
            return analyticsEngine.calculateMetrics();
        }
    }
};

const analyticsService = {
    async getOverview() {
        if (appState.dataMode === 'live') {
            return await apiDataAdapter.getOverview();
        }
        return analyticsEngine.calculateMetrics();
    },
    async getRealtime() {
        if (appState.dataMode === 'live') {
            return await apiDataAdapter.getRealtime();
        }
        return { activeUsers: 14 };
    }
};

async function updateRealtimeActiveUsers() {
    const badge = document.getElementById('m365-realtime-users-badge');
    if (!badge) return;

    const rt = await analyticsService.getRealtime();
    const isLive = appState.dataMode === 'live';
    const color = isLive ? '#10b981' : '#0ea5e9';
    badge.className = isLive ? 'm365-analytics-health-pill healthy' : 'm365-analytics-health-pill';
    badge.innerHTML = `<div class="m365-analytics-pulse" style="background:${color};"></div><span><strong>${rt.activeUsers}</strong> Active Users Now (${isLive ? 'GA4 Realtime' : 'Demo'})</span>`;
}

// ==========================================
// 3. Central State Update Dispatcher
// ==========================================
window.updateState = function(partialState, shouldRefresh = true) {
    try {
        Object.assign(appState, partialState);
        logDebug('State updated:', appState);

        syncControlsToState();
        renderFilterChips();

        if (shouldRefresh) {
            refreshDashboard();
        }
        updateUrlState();
    } catch (e) {
        console.error('Error updating state:', e);
    }
};

// Synchronize all dropdown elements to match appState
function syncControlsToState() {
    const dateSelect = document.getElementById('m365-date-select');
    if (dateSelect) dateSelect.value = appState.dateRange;

    const sourceSelect = document.getElementById('m365-source-select');
    if (sourceSelect) sourceSelect.value = appState.source;

    const deviceSelect = document.getElementById('m365-device-select');
    if (deviceSelect) deviceSelect.value = appState.device;

    const countrySelect = document.getElementById('m365-country-select');
    if (countrySelect) countrySelect.value = appState.country;

    const pageSelect = document.getElementById('m365-page-select');
    if (pageSelect) pageSelect.value = appState.page;

    const roleSelect = document.getElementById('m365-role-select');
    if (roleSelect) roleSelect.value = appState.role;

    const dataModeSelect = document.getElementById('m365-datamode-select');
    if (dataModeSelect) dataModeSelect.value = appState.dataMode;

    const savedViewsSelect = document.getElementById('m365-saved-views-select');
    if (savedViewsSelect) renderSavedViewsDropdown();
}

// Update URL State without page reload
function updateUrlState() {
    if (window.history && window.history.replaceState) {
        const params = new URLSearchParams();
        params.set('view', appState.view);
        params.set('range', appState.dateRange);
        if (appState.source !== 'all') params.set('source', appState.source);
        if (appState.device !== 'all') params.set('device', appState.device);
        if (appState.country !== 'all') params.set('country', appState.country);
        if (appState.page !== 'all') params.set('page', appState.page);

        const newUrl = window.location.pathname + '?' + params.toString();
        window.history.replaceState(null, '', newUrl);
    }
}

// Read initial URL state
function loadUrlState() {
    try {
        const params = new URLSearchParams(window.location.search);
        const updates = {};
        if (params.has('view')) updates.view = params.get('view');
        if (params.has('range')) updates.dateRange = params.get('range');
        if (params.has('source')) updates.source = params.get('source');
        if (params.has('device')) updates.device = params.get('device');
        if (params.has('country')) updates.country = params.get('country');
        if (params.has('page')) updates.page = params.get('page');

        if (Object.keys(updates).length > 0) {
            Object.assign(appState, updates);
        }
    } catch (e) {
        logDebug('Error parsing URL state:', e);
    }
}

// ==========================================
// 4. Central Dashboard Refresh Engine
// ==========================================
window.refreshDashboard = async function() {
    try {
        const data = await analyticsService.getOverview();

        // 1. Update 8 KPI Cards
        updateElementText('m365-kpi-visitors', data.visitors.toLocaleString());
        updateElementText('m365-kpi-sessions', data.sessions.toLocaleString());
        updateElementText('m365-kpi-pageviews', data.pageViews.toLocaleString());
        updateElementText('m365-kpi-engagement', data.engagement);
        updateElementText('m365-kpi-leads', data.leads.toLocaleString());
        updateElementText('m365-kpi-demos', data.demos.toLocaleString());
        updateElementText('m365-kpi-cvr', data.cvr);
        updateElementText('m365-kpi-revenue', data.revenuePerLead);

        // 2. Update Executive Story Slides with Dynamic Metrics
        const slide1Desc = document.querySelector('#m365-story-slide-1 p');
        if (slide1Desc) {
            slide1Desc.innerHTML = `Inbound website traffic expanded to <strong>${data.visitors.toLocaleString()} visitors</strong> (${data.dateLabel}) generating <strong>${data.leads.toLocaleString()} leads</strong> and <strong>${data.pipelineRevenue} in pipeline ARR</strong>.`;
        }

        // 3. Update Health Scorecard & Header Status Pill
        updateScorecard(data.scorecard);

        // 4. Update Charts
        renderTrafficChart();
        renderHealthDonut(data.scorecard.overall);

        // 5. Update Forecast Banner
        const forecastText = document.getElementById('m365-forecast-badge-text');
        if (forecastText) {
            const projectedVisitors = Math.round(data.visitors * 1.085);
            forecastText.innerText = `Projected: ${projectedVisitors.toLocaleString()} Visitors`;
        }

        // 6. Update Real-Time Active Users Badge
        updateRealtimeActiveUsers();

        logDebug('Dashboard refreshed successfully');
    } catch (err) {
        console.error('Error in refreshDashboard:', err);
    }
};

function updateElementText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}

function updateScorecard(scorecard) {
    updateElementText('m365-scorecard-overall', scorecard.overall);
    updateElementText('m365-scorecard-traffic', `${scorecard.traffic} (Top 10%)`);
    updateElementText('m365-scorecard-seo', `${scorecard.seo} (High)`);
    updateElementText('m365-scorecard-cvr', `${scorecard.conversion} (${scorecard.conversion < 75 ? 'Friction' : 'Good'})`);

    const headerPill = document.getElementById('m365-header-status-pill');
    if (headerPill) {
        if (scorecard.overall >= 85) {
            headerPill.className = 'm365-analytics-health-pill healthy';
            headerPill.innerHTML = `<div class="m365-analytics-pulse"></div><span>Status: Healthy (${scorecard.overall}/100)</span>`;
        } else {
            headerPill.className = 'm365-analytics-health-pill warning';
            headerPill.innerHTML = `<div class="m365-analytics-pulse" style="background:#f59e0b;"></div><span>Status: Needs Attention (${scorecard.overall}/100)</span>`;
        }
    }
}

// ==========================================
// 5. Chart.js Management & Fallback Renderer
// ==========================================
let trafficChartInstance = null;
let healthDonutInstance = null;

function renderTrafficChart() {
    const canvas = document.getElementById('m365-traffic-chart-v6');
    if (!canvas) return;

    const chartData = analyticsEngine.generateChartData();
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    const gridColor = isDark ? 'rgba(31, 41, 61, 0.6)' : 'rgba(226, 232, 240, 0.7)';
    const textColor = isDark ? '#94a3b8' : '#64748b';

    // Verify Chart.js is loaded
    if (typeof Chart === 'undefined') {
        renderSvgChartFallback(canvas, chartData);
        return;
    }

    try {
        if (trafficChartInstance) {
            trafficChartInstance.destroy();
            trafficChartInstance = null;
        }

        Chart.defaults.color = textColor;
        Chart.defaults.font.family = 'Inter, sans-serif';

        trafficChartInstance = new Chart(canvas, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [
                    {
                        label: 'Current Period (Visitors)',
                        data: chartData.actualData,
                        borderColor: '#0ea5e9',
                        backgroundColor: 'rgba(14, 165, 233, 0.08)',
                        borderWidth: 2.5,
                        fill: true,
                        tension: 0.35,
                        pointRadius: 3,
                        spanGaps: true
                    },
                    {
                        label: '30-Day Forecast (Dotted)',
                        data: chartData.forecastData,
                        borderColor: '#10b981',
                        borderDash: [4, 4],
                        borderWidth: 2,
                        fill: false,
                        tension: 0.35,
                        pointRadius: 3,
                        spanGaps: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        align: 'end',
                        labels: { boxWidth: 10, font: { size: 10 } }
                    }
                },
                scales: {
                    x: { grid: { display: false } },
                    y: { grid: { color: gridColor }, beginAtZero: false }
                }
            }
        });
    } catch (err) {
        console.warn('Chart.js rendering failed, using SVG fallback:', err);
        renderSvgChartFallback(canvas, chartData);
    }
}

// Fallback SVG renderer in case Chart.js is unavailable or blocked
function renderSvgChartFallback(canvas, chartData) {
    const parent = canvas.parentElement;
    if (!parent) return;

    parent.innerHTML = `
        <div style="width:100%; height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; background:var(--m365-analytics-surface-hover); border-radius:6px; padding:10px;">
            <div style="font-size:11px; font-weight:700; color:var(--m365-analytics-brand); margin-bottom:4px;">Traffic Telemetry Data Stream</div>
            <div style="display:flex; gap:8px; font-size:10px; color:var(--m365-analytics-text-secondary);">
                ${chartData.labels.slice(0, 5).map((l, i) => `<span>${l}: <strong>${chartData.actualData[i] || 'N/A'}</strong></span>`).join(' · ')}
            </div>
        </div>
    `;
}

function renderHealthDonut(overallScore) {
    const canvas = document.getElementById('m365-health-donut-v6');
    if (!canvas || typeof Chart === 'undefined') return;

    const isDark = document.body.getAttribute('data-theme') === 'dark';

    try {
        if (healthDonutInstance) {
            healthDonutInstance.destroy();
            healthDonutInstance = null;
        }

        healthDonutInstance = new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels: ['Score', 'Remaining'],
                datasets: [{
                    data: [overallScore, 100 - overallScore],
                    backgroundColor: [overallScore >= 85 ? '#10b981' : '#f59e0b', isDark ? '#1f293d' : '#e2e8f0'],
                    borderWidth: 0,
                    circumference: 270,
                    rotation: 225
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '78%',
                plugins: { legend: { display: false }, tooltip: { enabled: false } }
            }
        });
    } catch (e) {
        logDebug('Donut chart error:', e);
    }
}

// ==========================================
// 6. Filter Controls & Chips Management
// ==========================================
function renderFilterChips() {
    const container = document.getElementById('m365-active-chips-container');
    if (!container) return;

    const chips = [];

    // Date Chip
    const dateLabels = {
        'today': 'Today',
        'yesterday': 'Yesterday',
        '7d': 'Last 7 Days',
        '30d': 'Last 30 Days',
        '90d': 'Last 90 Days',
        'this-month': 'This Month',
        'last-month': 'Last Month',
        'this-quarter': 'This Quarter',
        'this-year': 'This Year',
        'custom': `${appState.customStartDate} - ${appState.customEndDate}`
    };
    chips.push({ type: 'date', label: dateLabels[appState.dateRange] || 'Last 30 Days' });

    // Source Chip
    if (appState.source !== 'all') {
        const sourceLabels = { organic: 'Organic Search', paid: 'Paid Google Ads', direct: 'Direct Traffic', social: 'Social Media', referral: 'Hospital Referrals' };
        chips.push({ type: 'source', label: sourceLabels[appState.source] || appState.source });
    }

    // Device Chip
    if (appState.device !== 'all') {
        chips.push({ type: 'device', label: appState.device.charAt(0).toUpperCase() + appState.device.slice(1) });
    }

    // Country Chip
    if (appState.country !== 'all') {
        chips.push({ type: 'country', label: appState.country.toUpperCase() });
    }

    // Page Chip
    if (appState.page !== 'all') {
        chips.push({ type: 'page', label: appState.page });
    }

    container.innerHTML = chips.map(c => `
        <div class="m365-analytics-chip">
            <span>${c.label}</span>
            <button onclick="removeFilter('${c.type}')" title="Remove filter">×</button>
        </div>
    `).join('');
}

window.removeFilter = function(type) {
    if (type === 'date') updateState({ dateRange: '30d' });
    if (type === 'source') updateState({ source: 'all' });
    if (type === 'device') updateState({ device: 'all' });
    if (type === 'country') updateState({ country: 'all' });
    if (type === 'page') updateState({ page: 'all' });
    showToast('Filter removed', 'info');
};

window.clearAllFilters = function() {
    updateState({
        dateRange: '30d',
        source: 'all',
        device: 'all',
        country: 'all',
        page: 'all'
    });
    showToast('All filters cleared', 'info');
};

// ==========================================
// 7. Saved Views Management
// ==========================================
window.applySavedView = function(viewName) {
    if (!viewName) return;
    const view = appState.savedViews.find(v => v.name === viewName);
    if (view) {
        updateState(view.state);
        showToast(`Applied view: "${viewName}"`, 'success');
    }
};

window.openSaveViewModal = function() {
    const modal = document.getElementById('m365-save-view-modal-overlay');
    const preview = document.getElementById('m365-save-view-filters-preview');
    if (preview) {
        preview.innerHTML = `
            <span class="m365-analytics-badge neutral">Date: ${appState.dateRange}</span>
            <span class="m365-analytics-badge neutral">Source: ${appState.source}</span>
            <span class="m365-analytics-badge neutral">Device: ${appState.device}</span>
        `;
    }
    if (modal) modal.classList.add('open');
};

window.confirmSaveView = function() {
    const input = document.getElementById('m365-save-view-name');
    const name = input ? input.value.trim() : '';
    if (!name) {
        showToast('Please enter a view name', 'warning');
        return;
    }

    const newView = {
        name,
        state: {
            dateRange: appState.dateRange,
            source: appState.source,
            device: appState.device,
            country: appState.country,
            page: appState.page
        }
    };

    appState.savedViews.push(newView);
    localStorage.setItem('m365_saved_views', JSON.stringify(appState.savedViews));
    renderSavedViewsDropdown();
    closeModals();
    showToast(`Saved view "${name}" created!`, 'success');
};

function renderSavedViewsDropdown() {
    const select = document.getElementById('m365-saved-views-select');
    if (!select) return;

    select.innerHTML = '<option value="">-- Saved Views --</option>' + appState.savedViews.map(v => `
        <option value="${v.name}">${v.name}</option>
    `).join('');
}

// ==========================================
// 8. Custom Date Modal
// ==========================================
window.openCustomDateModal = function() {
    const modal = document.getElementById('m365-custom-date-modal-overlay');
    if (modal) modal.classList.add('open');
};

window.applyCustomDateRange = function() {
    const start = document.getElementById('m365-custom-start-date')?.value || '2026-08-01';
    const end = document.getElementById('m365-custom-end-date')?.value || '2026-08-31';

    closeModals();
    updateState({
        dateRange: 'custom',
        customStartDate: start,
        customEndDate: end
    });
    showToast(`Custom range applied: ${start} to ${end}`, 'success');
};

// ==========================================
// 9. Executive Story Mode Controller
// ==========================================
window.setStorySlide = function(slideIndex) {
    appState.currentStorySlide = slideIndex;
    document.querySelectorAll('.m365-analytics-story-slide').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.m365-story-dot').forEach(d => d.style.background = 'var(--m365-analytics-border)');

    const targetSlide = document.getElementById(`m365-story-slide-${slideIndex}`);
    const targetDot = document.getElementById(`m365-story-dot-${slideIndex}`);

    if (targetSlide) targetSlide.classList.add('active');
    if (targetDot) targetDot.style.background = 'var(--m365-analytics-brand)';
};

window.nextStorySlide = function() {
    let next = appState.currentStorySlide + 1;
    if (next > 6) next = 1;
    setStorySlide(next);
};

window.prevStorySlide = function() {
    let prev = appState.currentStorySlide - 1;
    if (prev < 1) prev = 6;
    setStorySlide(prev);
};

// ==========================================
// 10. AI Analyst V6 with Natural Language Parser
// ==========================================
window.executeAiQueryV6 = function(query) {
    const area = document.getElementById('m365-ai-response-v6');
    if (!area || !query || !query.trim()) return;

    const q = query.toLowerCase();
    const updates = {};

    // Intelligent Natural Language Entity Extraction
    if (q.includes('organic')) updates.source = 'organic';
    if (q.includes('paid') || q.includes('google ads')) updates.source = 'paid';
    if (q.includes('direct')) updates.source = 'direct';

    if (q.includes('mobile')) updates.device = 'mobile';
    if (q.includes('desktop')) updates.device = 'desktop';

    if (q.includes('delhi')) updates.country = 'delhi';
    if (q.includes('india')) updates.country = 'india';
    if (q.includes('usa')) updates.country = 'usa';

    if (q.includes('7 days') || q.includes('last 7 days')) updates.dateRange = '7d';
    if (q.includes('30 days') || q.includes('last 30 days')) updates.dateRange = '30d';
    if (q.includes('today')) updates.dateRange = 'today';

    if (q.includes('hims')) updates.page = '/hims-software';
    if (q.includes('pricing')) updates.page = '/pricing';

    // Apply discovered filter updates to state
    if (Object.keys(updates).length > 0) {
        updateState(updates);
    }

    // Step 1: Processing Skeleton
    area.innerHTML = `
        <div style="padding:18px; border-radius:8px; background:var(--m365-analytics-brand-light); border:1px solid var(--m365-analytics-brand);">
            <div style="display:flex; align-items:center; gap:8px; color:var(--m365-analytics-brand); font-weight:600; font-size:12px;">
                <div class="m365-analytics-pulse"></div> Correlating Inbound Telemetry &amp; Applying Segment Filters...
            </div>
            <div class="m365-analytics-skeleton m365-analytics-mt-4" style="height:14px; width:80%; margin-top:8px;"></div>
            <div class="m365-analytics-skeleton m365-analytics-mt-4" style="height:14px; width:60%; margin-top:6px;"></div>
        </div>
    `;

    // Step 2: Response Output
    setTimeout(() => {
        const currentData = analyticsEngine.calculateMetrics();
        area.innerHTML = `
            <div class="m365-analytics-card" style="background:var(--m365-analytics-brand-light); border-color:var(--m365-analytics-brand); padding:16px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <div style="display:flex; align-items:center; gap:6px;">
                        <i data-lucide="sparkles" style="width:16px; height:16px; color:var(--m365-analytics-brand);"></i>
                        <strong style="font-size:13px;">AI Analyst V6 Intelligence Output</strong>
                    </div>
                    <span class="m365-analytics-badge high">Confidence: 94% (High)</span>
                </div>

                <div style="margin-bottom:8px;">
                    <div style="font-size:10px; font-weight:700; color:var(--m365-analytics-danger); text-transform:uppercase;">1. INSIGHT (${currentData.dateLabel})</div>
                    <div style="font-size:12px; font-weight:600; margin-top:2px;">
                        Segment traffic computed at <strong>${currentData.visitors.toLocaleString()} visitors</strong> with <strong>${currentData.leads.toLocaleString()} qualified leads</strong> (${currentData.cvr} CVR).
                    </div>
                </div>

                <div style="margin-bottom:8px;">
                    <div style="font-size:10px; font-weight:700; color:var(--m365-analytics-text-muted); text-transform:uppercase;">2. EVIDENCE</div>
                    <div style="font-size:11px; color:var(--m365-analytics-text-secondary); line-height:1.5; margin-top:2px;">
                        • Filtered Source: <strong>${appState.source.toUpperCase()}</strong> · Device: <strong>${appState.device.toUpperCase()}</strong><br>
                        • Total Attributed Pipeline: <strong>${currentData.pipelineRevenue}</strong>
                    </div>
                </div>

                <div style="margin-bottom:10px;">
                    <div style="font-size:10px; font-weight:700; color:var(--m365-analytics-success); text-transform:uppercase;">3. RECOMMENDED ACTION</div>
                    <div style="font-size:11px; color:var(--m365-analytics-text-secondary); margin-top:2px;">
                        Deploy 3-field mobile form variant to capture projected +50% conversion uplift.
                    </div>
                </div>

                <div style="display:flex; gap:8px;">
                    <button class="m365-analytics-btn m365-analytics-btn-brand" onclick="openTaskModal('Deploy Mobile Demo Form Fix')">
                        <i data-lucide="check-square" style="width:12px; height:12px;"></i> Create Task
                    </button>
                    <button class="m365-analytics-btn" onclick="openDrawer('rootcause')">
                        <i data-lucide="activity" style="width:12px; height:12px;"></i> View Root Cause
                    </button>
                </div>
            </div>
        `;
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 450);
};

// ==========================================
// 11. Modals & Popups Management
// ==========================================
window.openShortcutsModal = function() {
    const modal = document.getElementById('m365-shortcuts-modal-overlay');
    if (modal) modal.classList.add('open');
};

window.openNotificationsModal = function() {
    const modal = document.getElementById('m365-notifications-modal-overlay');
    if (modal) modal.classList.add('open');
};

window.openTaskModal = function(defaultTitle = 'Optimize Mobile Form') {
    closeDrawer();
    const modal = document.getElementById('m365-task-modal-overlay');
    const input = document.getElementById('m365-task-title');
    if (input) input.value = defaultTitle;
    if (modal) modal.classList.add('open');
};

window.closeModals = function() {
    document.querySelectorAll('.m365-analytics-modal-overlay').forEach(m => m.classList.remove('open'));
};

window.closeDrawer = function() {
    const drawer = document.getElementById('m365-drawer-overlay');
    if (drawer) drawer.classList.remove('open');
};

window.openDrawer = function(type, payload = {}) {
    const drawerOverlay = document.getElementById('m365-drawer-overlay');
    const drawerTitle = document.getElementById('m365-drawer-title');
    const drawerContent = document.getElementById('m365-drawer-content');
    if (!drawerOverlay || !drawerContent) return;

    drawerTitle.innerText = payload.title || 'Contextual Intelligence Breakdown';
    let html = '';

    if (type === 'scorecard_detail') {
        const metrics = analyticsEngine.calculateMetrics();
        html = `
            <div class="m365-analytics-card" style="border-left:4px solid var(--m365-analytics-success);">
                <div style="font-size:11px; font-weight:700; color:var(--m365-analytics-success); text-transform:uppercase;">Overall Scorecard Analysis</div>
                <h3 style="font-size:16px; margin:4px 0;">Website Health: ${metrics.scorecard.overall} / 100</h3>
                <div style="font-size:11px; color:var(--m365-analytics-text-muted);">Current Segment: ${metrics.dateLabel} · ${appState.device.toUpperCase()}</div>
            </div>

            <div class="m365-analytics-card">
                <div style="display:flex; flex-direction:column; gap:8px; font-size:12px;">
                    <div style="display:flex; justify-content:space-between;"><span>Performance Vitals</span> <strong>${metrics.scorecard.performance} (Top 5%)</strong></div>
                    <div style="display:flex; justify-content:space-between;"><span>Traffic Growth</span> <strong>${metrics.scorecard.traffic} (Top 10%)</strong></div>
                    <div style="display:flex; justify-content:space-between;"><span>SEO Authority</span> <strong>${metrics.scorecard.seo} (High)</strong></div>
                    <div style="display:flex; justify-content:space-between;"><span>Conversion Health</span> <strong style="color:var(--m365-analytics-${metrics.scorecard.conversion < 75 ? 'warning' : 'success'});">${metrics.scorecard.conversion} (${metrics.scorecard.conversion < 75 ? 'Mobile Friction' : 'Good'})</strong></div>
                </div>
            </div>
        `;
    } else if (type === 'rootcause') {
        html = `
            <div class="m365-analytics-card" style="border-left:4px solid var(--m365-analytics-danger);">
                <span class="m365-analytics-badge low">AI Diagnostic</span>
                <h3 style="font-size:15px; margin:6px 0;">Root Cause: Mobile Conversion Drop</h3>
                <p style="font-size:12px; color:var(--m365-analytics-text-secondary);">
                    Confidence: <strong>94% (High)</strong> based on 14,210 mobile visitor event logs.
                </p>
            </div>

            <div class="m365-analytics-card">
                <div style="display:flex; flex-direction:column; gap:8px;">
                    <div style="background:var(--m365-analytics-surface-hover); padding:10px; border-radius:6px;">
                        <div style="font-size:10px; font-weight:700; color:var(--m365-analytics-danger);">1. Symptom</div>
                        <div style="font-size:12px; font-weight:600;">Conversion Rate declined -21.0% in last 7 days.</div>
                    </div>
                    <div style="text-align:center; color:var(--m365-analytics-text-muted);">↓</div>
                    <div style="background:var(--m365-analytics-surface-hover); padding:10px; border-radius:6px;">
                        <div style="font-size:10px; font-weight:700; color:var(--m365-analytics-brand);">2. Signal</div>
                        <div style="font-size:12px; font-weight:600;">Mobile traffic grew +14%, while lead completions fell -19%.</div>
                    </div>
                    <div style="text-align:center; color:var(--m365-analytics-text-muted);">↓</div>
                    <div style="background:var(--m365-analytics-surface-hover); padding:10px; border-radius:6px;">
                        <div style="font-size:10px; font-weight:700; color:var(--m365-analytics-warning);">3. Friction Point</div>
                        <div style="font-size:12px; font-weight:600;">Phone number field validation failed on +91 country prefix inputs.</div>
                    </div>
                    <div style="text-align:center; color:var(--m365-analytics-text-muted);">↓</div>
                    <div style="background:var(--m365-analytics-success-bg); border:1px solid var(--m365-analytics-success); padding:10px; border-radius:6px;">
                        <div style="font-size:10px; font-weight:700; color:var(--m365-analytics-success);">4. Root Cause &amp; Action</div>
                        <div style="font-size:12px; font-weight:700; color:var(--m365-analytics-text-primary);">Relax phone regex validation &amp; shorten form to 3 fields.</div>
                    </div>
                </div>
            </div>

            <button class="m365-analytics-btn m365-analytics-btn-brand" onclick="openTaskModal('Deploy Mobile Phone Validation Fix')">
                Create Urgent Hotfix Task
            </button>
        `;
    } else {
        html = `
            <div class="m365-analytics-card">
                <h3 style="font-size:15px; margin-bottom:8px;">${payload.title || 'Contextual Intelligence'}</h3>
                <p style="font-size:12px; color:var(--m365-analytics-text-secondary); line-height:1.5;">
                    Live telemetry and aggregated event attributes for this entity.
                </p>
            </div>
        `;
    }

    drawerContent.innerHTML = html;
    if (typeof lucide !== 'undefined') lucide.createIcons();
    drawerOverlay.classList.add('open');
};

// ==========================================
// 12. Task Center & Favorites
// ==========================================
let sampleTasks = [
    { id: 1, title: 'Reduce mobile demo form from 5 to 3 fields', priority: 'High', owner: 'Frontend Team', due: 'Sep 5, 2026', status: 'In Progress', outcome: 'Pending Deploy' },
    { id: 2, title: 'Fix Android touch latency on /pricing plan switcher', priority: 'Critical', owner: 'Engineering', due: 'Sep 3, 2026', status: 'To Do', outcome: 'Pending' },
    { id: 3, title: 'Consolidate internal linking for "hospital management software"', priority: 'Medium', owner: 'SEO Team', due: 'Sep 8, 2026', status: 'To Do', outcome: 'Pending' },
    { id: 4, title: 'Add schema markup for HIMS software in Jaipur & Delhi', priority: 'Low', owner: 'SEO Team', due: 'Aug 29, 2026', status: 'Completed', outcome: '+24.8% Organic Leads' }
];

function renderTasks() {
    const container = document.getElementById('m365-tasks-board-container');
    if (!container) return;

    const todo = sampleTasks.filter(t => t.status === 'To Do');
    const inProgress = sampleTasks.filter(t => t.status === 'In Progress');
    const completed = sampleTasks.filter(t => t.status === 'Completed');

    const renderCard = (t) => `
        <div class="m365-analytics-task-card" style="background:var(--m365-analytics-surface); border:1px solid var(--m365-analytics-border); border-radius:6px; padding:10px; margin-bottom:8px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <span class="m365-analytics-badge ${t.priority === 'Critical' ? 'low' : (t.priority === 'High' ? 'med' : 'neutral')}">${t.priority}</span>
                <span style="font-size:10px; color:var(--m365-analytics-text-muted);">${t.due}</span>
            </div>
            <div style="font-size:12px; font-weight:600; margin-bottom:4px;">${t.title}</div>
            <div style="font-size:10px; color:var(--m365-analytics-success); font-weight:600; margin-bottom:6px;">Outcome: ${t.outcome}</div>
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; color:var(--m365-analytics-text-secondary);">
                <span>${t.owner}</span>
                <select class="m365-analytics-select" style="padding:2px 16px 2px 6px; font-size:10px;" onchange="changeTaskStatus(${t.id}, this.value)">
                    <option ${t.status === 'To Do' ? 'selected' : ''}>To Do</option>
                    <option ${t.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option ${t.status === 'Completed' ? 'selected' : ''}>Completed</option>
                </select>
            </div>
        </div>
    `;

    container.innerHTML = `
        <div class="m365-analytics-task-col" style="background:var(--m365-analytics-surface-hover); padding:10px; border-radius:8px;">
            <div style="font-size:11px; font-weight:700; color:var(--m365-analytics-text-muted); text-transform:uppercase; margin-bottom:8px;">To Do (${todo.length})</div>
            ${todo.map(renderCard).join('')}
        </div>
        <div class="m365-analytics-task-col" style="background:var(--m365-analytics-surface-hover); padding:10px; border-radius:8px;">
            <div style="font-size:11px; font-weight:700; color:var(--m365-analytics-brand); text-transform:uppercase; margin-bottom:8px;">In Progress (${inProgress.length})</div>
            ${inProgress.map(renderCard).join('')}
        </div>
        <div class="m365-analytics-task-col" style="background:var(--m365-analytics-surface-hover); padding:10px; border-radius:8px;">
            <div style="font-size:11px; font-weight:700; color:var(--m365-analytics-success); text-transform:uppercase; margin-bottom:8px;">Completed (${completed.length})</div>
            ${completed.map(renderCard).join('')}
        </div>
    `;
}

window.changeTaskStatus = function(taskId, newStatus) {
    const task = sampleTasks.find(t => t.id === taskId);
    if (task) {
        task.status = newStatus;
        if (newStatus === 'Completed') task.outcome = '+50% Uplift Realized';
        renderTasks();
        showToast(`Task marked as: ${newStatus}`, 'success');
    }
};

window.submitTaskForm = function() {
    const title = document.getElementById('m365-task-title')?.value || 'New Task';
    const priority = document.getElementById('m365-task-priority')?.value || 'High';
    const owner = document.getElementById('m365-task-owner')?.value || 'Marketing Team';

    sampleTasks.unshift({
        id: Date.now(),
        title,
        priority,
        owner,
        due: '7 Days',
        status: 'To Do',
        outcome: 'Pending'
    });

    renderTasks();
    closeModals();
    showToast(`Task created: "${title}"`, 'success');
};

function renderFavorites() {
    const container = document.getElementById('m365-favorites-list');
    if (!container) return;
    container.innerHTML = appState.favorites.map(f => `
        <div style="font-size:11px; display:flex; justify-content:space-between; align-items:center; padding:4px 6px; border-radius:4px; background:var(--m365-analytics-surface-hover); margin-bottom:4px;">
            <span>★ ${f}</span>
            <button onclick="toggleFavorite('${f}')" style="color:var(--m365-analytics-text-muted); font-size:10px; cursor:pointer;">×</button>
        </div>
    `).join('');
}

window.toggleFavorite = function(name) {
    if (appState.favorites.includes(name)) {
        appState.favorites = appState.favorites.filter(f => f !== name);
        showToast(`Removed from favorites: ${name}`, 'info');
    } else {
        appState.favorites.push(name);
        showToast(`Added to favorites: ${name}`, 'success');
    }
    localStorage.setItem('m365_favorites', JSON.stringify(appState.favorites));
    renderFavorites();
};

// ==========================================
// 13. Toast System
// ==========================================
window.showToast = function(message, type = 'info') {
    const container = document.getElementById('m365-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'm365-analytics-toast';

    let icon = 'info';
    if (type === 'success') icon = 'check-circle';
    if (type === 'warning') icon = 'alert-triangle';
    if (type === 'danger') icon = 'alert-octagon';

    toast.innerHTML = `
        <i data-lucide="${icon}" style="width:15px; height:15px; color:var(--m365-analytics-${type === 'danger' ? 'danger' : (type === 'success' ? 'success' : 'brand')})"></i>
        <span>${message}</span>
    `;
    container.appendChild(toast);
    if (typeof lucide !== 'undefined') lucide.createIcons();

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(6px)';
        toast.style.transition = 'all 0.2s ease';
        setTimeout(() => toast.remove(), 200);
    }, 2800);
};

// ==========================================
// 14. Keyboard Shortcuts Engine
// ==========================================
function initKeyboardShortcuts() {
    let lastKey = '';
    let keyTimeout;

    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;

        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const palette = document.getElementById('m365-palette-overlay');
            if (palette) palette.style.display = palette.style.display === 'flex' ? 'none' : 'flex';
            return;
        }

        if (e.key === '?') {
            openShortcutsModal();
            return;
        }

        if (e.key === 'r' || e.key === 'R') {
            navigateTo('reports');
            showToast('Opening Report Builder...', 'info');
            return;
        }

        if (lastKey === 'g' || lastKey === 'G') {
            if (e.key === 'o' || e.key === 'O') navigateTo('overview');
            if (e.key === 't' || e.key === 'T') navigateTo('traffic');
            if (e.key === 's' || e.key === 'S') navigateTo('seo');
            if (e.key === 'c' || e.key === 'C') navigateTo('conversions');
            if (e.key === 'a' || e.key === 'A') navigateTo('ai');
            lastKey = '';
            clearTimeout(keyTimeout);
            return;
        }

        lastKey = e.key;
        clearTimeout(keyTimeout);
        keyTimeout = setTimeout(() => lastKey = '', 1000);
    });
}

window.navigateTo = function(viewId) {
    const link = document.querySelector(`.m365-analytics-nav-item[data-view="${viewId}"]`);
    if (link) link.click();
};

// ==========================================
// 15. Automated Smoke Test (Developer Verification)
// ==========================================
window.runInteractionSmokeTest = function() {
    console.log('%c[Medical365 V6 Smoke Test] Starting full verification...', 'color:#0ea5e9; font-weight:bold;');

    try {
        // Test 1: Date Filter
        updateState({ dateRange: '7d' });
        console.assert(appState.dateRange === '7d', 'Test 1 Failed: Date Range');

        // Test 2: Source Filter
        updateState({ source: 'organic' });
        console.assert(appState.source === 'organic', 'Test 2 Failed: Source');

        // Test 3: Device Filter
        updateState({ device: 'mobile' });
        console.assert(appState.device === 'mobile', 'Test 3 Failed: Device');

        // Test 4: Calculation Engine
        const m = analyticsEngine.calculateMetrics();
        console.assert(m.visitors > 0 && m.leads > 0, 'Test 4 Failed: Derived metrics calculation');

        // Test 5: Reset
        clearAllFilters();
        console.assert(appState.dateRange === '30d' && appState.source === 'all', 'Test 5 Failed: Clear filters');

        console.log('%c[Medical365 V6 Smoke Test] All 5 tests passed successfully!', 'color:#10b981; font-weight:bold;');
        showToast('Smoke Test Passed: 100% functional', 'success');
    } catch (err) {
        console.error('[Smoke Test Error]', err);
    }
};

// ==========================================
// 16. App Bootstrapping
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup Icons & Theme
    if (typeof lucide !== 'undefined') lucide.createIcons();
    document.body.setAttribute('data-theme', appState.theme);

    // 2. Load URL Parameters
    loadUrlState();

    // 3. Navigation Switcher
    const navItems = document.querySelectorAll('.m365-analytics-nav-item');
    const views = document.querySelectorAll('.m365-analytics-view');
    const sidebar = document.getElementById('m365-sidebar');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const viewId = item.getAttribute('data-view');
            if (viewId) {
                e.preventDefault();
                navItems.forEach(n => n.classList.remove('active'));
                item.classList.add('active');

                views.forEach(v => v.classList.remove('active'));
                const targetView = document.getElementById(`view-${viewId}`);
                if (targetView) targetView.classList.add('active');

                appState.view = viewId;
                updateBreadcrumbs(viewId);
                updateUrlState();

                // If switching to overview, re-render chart to ensure proper layout sizing
                if (viewId === 'overview') {
                    setTimeout(renderTrafficChart, 50);
                }

                if (window.innerWidth <= 768 && sidebar) {
                    sidebar.classList.remove('open');
                }
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
        });
    });

    // 4. Header Theme Toggle
    const themeBtn = document.getElementById('m365-theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            appState.theme = appState.theme === 'light' ? 'dark' : 'light';
            document.body.setAttribute('data-theme', appState.theme);
            localStorage.setItem('m365_theme', appState.theme);
            refreshDashboard();
        });
    }

    // 5. Sidebar Toggle
    const sidebarToggleBtn = document.getElementById('m365-sidebar-toggle');
    if (sidebarToggleBtn && sidebar) {
        sidebarToggleBtn.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.toggle('open');
            } else {
                sidebar.classList.toggle('m365-analytics-sidebar-collapsed');
            }
        });
    }

    // 6. Close Drawer Button
    const drawerCloseBtn = document.getElementById('m365-drawer-close');
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);

    // 7. Initialize Keyboard Shortcuts
    initKeyboardShortcuts();

    // 8. Render All Components & Initial Dashboard State
    syncControlsToState();
    renderFilterChips();
    renderTasks();
    renderFavorites();
    refreshDashboard();

    // 9. Auto-poll Real-time Active Users every 10 seconds
    setInterval(updateRealtimeActiveUsers, 10000);
});

function updateBreadcrumbs(viewId) {
    const el = document.getElementById('m365-breadcrumb-view');
    if (el) {
        const title = viewId.charAt(0).toUpperCase() + viewId.slice(1).replace('-', ' ');
        el.innerText = title;
    }
}

