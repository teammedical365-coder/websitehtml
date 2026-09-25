const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');

// Get all files modified in commit 2f1e3479
const stdout = execSync('git show --name-only --oneline 2f1e3479', { cwd: repoRoot }).toString();
const filesInCommit = stdout.split('\n')
    .map(l => l.trim())
    .filter(l => l.endsWith('.html'));

console.log(`Total HTML files in commit 2f1e3479: ${filesInCommit.length}`);

// Check which ones have diagrams in images/diagrams/
const diagramFiles = fs.readdirSync(path.join(repoRoot, 'images/diagrams'))
    .filter(f => f.endsWith('-workflow.svg'))
    .map(f => f.replace('-workflow.svg', '.html'));

const diagramSet = new Set(diagramFiles);

const missingDiagram = filesInCommit.filter(f => !diagramSet.has(f));
console.log(`Files with workflow diagrams: ${diagramFiles.length}`);
console.log(`Files needing expansion and diagrams: ${missingDiagram.length}`);
console.log('List of remaining files:');
missingDiagram.forEach((f, i) => console.log(`${i+1}. ${f}`));
