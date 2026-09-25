const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');

// 1. Copy analytics.css
fs.copyFileSync(path.join(repoRoot, 'scratch/analytics.css'), path.join(repoRoot, 'medical365-analytics/analytics.css'));

// 2. Prepare analytics.js with logoutAnalytics handler
let js = fs.readFileSync(path.join(repoRoot, 'scratch/analytics.js'), 'utf8');
if (!js.includes('logoutAnalytics')) {
    js += `\n\nwindow.logoutAnalytics = function() {
    sessionStorage.removeItem('m365_auth_session');
    localStorage.removeItem('m365_auth_session');
    window.location.replace('./login.html');
};\n`;
}
fs.writeFileSync(path.join(repoRoot, 'medical365-analytics/analytics.js'), js, 'utf8');

// 3. Prepare index.html:
// - Sanitize sensitive static text (replace ₹61.8L, 1,284 leads with placeholder skeleton dashes)
// - Add inline session gate redirect at the top of <head>
// - Add Logout button to navbar header actions
let html = fs.readFileSync(path.join(repoRoot, 'scratch/index.html'), 'utf8');

// Add inline Auth Guard at the top of <head>
const authGuard = `
    <!-- Medical365 Session Guard: Instant Redirect if unauthenticated -->
    <script>
        (function() {
            var token = sessionStorage.getItem("m365_auth_session") || localStorage.getItem("m365_auth_session");
            var valid = false;
            if (token) {
                try {
                    var data = JSON.parse(atob(token));
                    if (data.auth && data.exp > Date.now()) valid = true;
                } catch(e) {}
            }
            if (!valid) {
                sessionStorage.removeItem("m365_auth_session");
                localStorage.removeItem("m365_auth_session");
                window.location.replace("./login.html");
            }
        })();
    </script>
`;

if (!html.includes('Medical365 Session Guard')) {
    html = html.replace('<head>', '<head>\n' + authGuard);
}

// Add Logout button next to header actions
const logoutBtn = `
                <button onclick="logoutAnalytics()" class="m365-analytics-btn" style="display:inline-flex; align-items:center; gap:5px; font-size:11.5px; font-weight:700; color:#ef4444; border:1px solid rgba(239,68,68,0.25); background:rgba(239,68,68,0.06); padding:5px 12px; border-radius:6px; cursor:pointer;">
                    <i data-lucide="log-out" style="width:13px; height:13px;"></i> Logout
                </button>
`;

if (!html.includes('logoutAnalytics()')) {
    html = html.replace('<div class="m365-analytics-header-actions">', '<div class="m365-analytics-header-actions">\n' + logoutBtn);
}

// Sanitize static revenue and lead metrics so raw HTML fetch contains no leak
html = html.replace(/₹61\.8L/g, '—');
html = html.replace(/1,284 leads/g, '— leads');
html = html.replace(/48,291 visitors/g, '— visitors');

fs.writeFileSync(path.join(repoRoot, 'medical365-analytics/index.html'), html, 'utf8');
console.log('Successfully prepared medical365-analytics directory with login guard, sanitized HTML, and logout controls!');
