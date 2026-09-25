const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const indexPath = path.join(repoRoot, 'medical365-analytics/index.html');
const cssPath = path.join(repoRoot, 'medical365-analytics/analytics.css');
const jsPath = path.join(repoRoot, 'medical365-analytics/analytics.js');

function cleanRead(p) {
    let buf = fs.readFileSync(p);
    let str = '';
    if (buf[0] === 0xff && buf[1] === 0xfe) {
        str = buf.toString('utf16le');
    } else if (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
        str = buf.slice(3).toString('utf8');
    } else {
        str = buf.toString('utf8');
    }
    return str.replace(/\0/g, '');
}

// 1. Fix CSS
let css = cleanRead(cssPath);
fs.writeFileSync(cssPath, css, 'utf8');

// 2. Fix JS
let js = cleanRead(jsPath);
if (!js.includes('logoutAnalytics')) {
    js += `\n\nwindow.logoutAnalytics = function() {
    sessionStorage.removeItem('m365_auth_session');
    localStorage.removeItem('m365_auth_session');
    window.location.replace('./login.html');
};\n`;
}
fs.writeFileSync(jsPath, js, 'utf8');

// 3. Fix Index HTML
let html = cleanRead(indexPath);

// Ensure Session Guard is right inside <head>
const guard = `<script>
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
</script>`;

if (!html.includes('window.location.replace("./login.html")')) {
    html = html.replace('<head>', '<head>\n    ' + guard);
}

// Sanitize hardcoded metrics
html = html.replace(/₹61\.8L/g, '—');
html = html.replace(/1,284 leads/g, '— leads');
html = html.replace(/48,291 visitors/g, '— visitors');

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully saved all analytics files as clean UTF-8!');
