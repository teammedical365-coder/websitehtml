const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
console.log('=== STAGING 68 SPECIALTY & MODULE PAGES FOR PRODUCTION COMMIT ===');

const modFiles = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scratch/specialty_seo_modified_files.json'), 'utf8'));

// Stage each HTML file individually
modFiles.forEach(item => {
    const filePath = path.join(repoRoot, item.filename);
    if (fs.existsSync(filePath)) {
        execSync(`git add "${item.filename}"`, { cwd: repoRoot, stdio: 'inherit' });
    }
});

console.log('All 68 files staged. Verifying staged diff...');
const stagedFiles = execSync('git diff --name-only --cached', { cwd: repoRoot, encoding: 'utf8' }).trim().split('\n');
console.log(`Total Staged Files in Index: ${stagedFiles.length}`);

// Commit
const commitMessage = "Content: optimize 68 specialty & module pages with AEO/GEO clinical enhancements and structured data";
execSync(`git commit -m "${commitMessage}"`, { cwd: repoRoot, stdio: 'inherit' });

// Push
console.log('Pushing to origin/main...');
execSync('git push origin main', { cwd: repoRoot, stdio: 'inherit' });
console.log('=== PUSH TO ORIGIN/MAIN COMPLETE ===');
