const fs = require('fs');
const path = require('path');
const { buildPages } = require('./page_builder_engine.js');

const repoRoot = path.resolve(__dirname, '..');
const diagramDir = path.join(repoRoot, 'images/diagrams');

console.log('=== READING BATCH 2 DATA AND EXECUTING 17 PAGES ===');

// Check existing batch2_all_data.json
let batch2Data = {};
if (fs.existsSync(path.join(repoRoot, 'scratch/batch2_all_data.json'))) {
    batch2Data = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scratch/batch2_all_data.json'), 'utf8'));
    console.log(`Loaded ${Object.keys(batch2Data).length} pages from batch2_all_data.json`);
}

// Check how many pages we have:
console.log('Current pages in batch2Data:', Object.keys(batch2Data));
