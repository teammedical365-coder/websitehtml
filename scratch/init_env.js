const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');

function walk(dir) {
    let files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
        if (e.name === '.git' || e.name === 'node_modules' || e.name === 'scratch' || e.name === '.system_generated') continue;
        const full = path.join(dir, e.name);
        if (e.isDirectory()) {
            files = files.concat(walk(full));
        } else {
            files.push(full);
        }
    }
    return files;
}

const allFiles = walk(repoRoot);
const htmlFiles = allFiles.filter(f => f.endsWith('.html'));

const gitStatus = execSync('git status --short', { cwd: repoRoot }).toString('utf8').trim();

const envData = {
    repository_root: repoRoot,
    audit_timestamp: new Date().toISOString(),
    git_status_before: gitStatus || 'clean',
    total_files: allFiles.length,
    html_file_count: htmlFiles.length,
    sitemap_found: fs.existsSync(path.join(repoRoot, 'sitemap.xml')),
    robots_found: fs.existsSync(path.join(repoRoot, 'robots.txt')),
    package_json_found: fs.existsSync(path.join(repoRoot, 'package.json')),
    modification_allowed: false
};

fs.writeFileSync(path.join(__dirname, 'audit_environment.json'), JSON.stringify(envData, null, 2), 'utf8');
console.log('Environment recorded successfully:', envData);
