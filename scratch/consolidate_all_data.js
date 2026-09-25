const fs = require('fs');
const path = require('path');
const vm = require('vm');

const repoRoot = path.resolve(__dirname, '..');

function extractObjectFromScript(filePath, varName) {
    const code = fs.readFileSync(filePath, 'utf8');
    const marker = `const ${varName} = {`;
    const startIdx = code.indexOf(marker);
    if (startIdx === -1) {
        throw new Error(`Marker ${marker} not found in ${filePath}`);
    }

    const afterMarker = code.substring(startIdx);
    const endIdx = afterMarker.indexOf('buildPages(');
    const codeSlice = afterMarker.substring(0, endIdx);
    // Directly assign to global target
    const sanitized = codeSlice.replace(`const ${varName} =`, `this.__extracted =`);

    const sandbox = { console: { log: () => {} } };
    vm.createContext(sandbox);
    vm.runInContext(sanitized, sandbox);
    return sandbox.__extracted;
}

console.log('=== EXTRACTING DATA FROM ALL BATCH SCRIPTS ===');

const masterData = {};

// Batch 1
const b1 = extractObjectFromScript(path.join(repoRoot, 'scratch/generate_batch1_cardio_ortho.js'), 'batch1Data');
Object.assign(masterData, b1);
console.log(`[Batch 1] Loaded: ${Object.keys(b1).length} pages`);

// Batch 2A (Neuro)
const b2a = extractObjectFromScript(path.join(repoRoot, 'scratch/run_batch2a_neuro.js'), 'neuroData');
Object.assign(masterData, b2a);
console.log(`[Batch 2A] Loaded: ${Object.keys(b2a).length} pages`);

// Batch 2B (Peds & Eye)
const b2b = extractObjectFromScript(path.join(repoRoot, 'scratch/run_batch2b_peds_eye.js'), 'pedsEyeData');
Object.assign(masterData, b2b);
console.log(`[Batch 2B] Loaded: ${Object.keys(b2b).length} pages`);

// Batch 3A (Dental & Derma)
const b3a = extractObjectFromScript(path.join(repoRoot, 'scratch/run_batch3a_dental_derma.js'), 'batch3aData');
Object.assign(masterData, b3a);
console.log(`[Batch 3A] Loaded: ${Object.keys(b3a).length} pages`);

// Batch 3B (Onco)
const b3b = extractObjectFromScript(path.join(repoRoot, 'scratch/run_batch3b_onco.js'), 'oncoData');
Object.assign(masterData, b3b);
console.log(`[Batch 3B] Loaded: ${Object.keys(b3b).length} pages`);

// Batch 4A (OBGYN & Psych)
const b4a = extractObjectFromScript(path.join(repoRoot, 'scratch/run_batch4a.js'), 'batch4aData');
Object.assign(masterData, b4a);
console.log(`[Batch 4A] Loaded: ${Object.keys(b4a).length} pages`);

// Batch 4B (Core Platform)
const b4b = extractObjectFromScript(path.join(repoRoot, 'scratch/run_batch4b.js'), 'batch4bData');
Object.assign(masterData, b4b);
console.log(`[Batch 4B] Loaded: ${Object.keys(b4b).length} pages`);

console.log('----------------------------------------------------');
console.log(`GRAND TOTAL EXTRACTED PAGES: ${Object.keys(masterData).length} / 68`);

fs.writeFileSync(path.join(repoRoot, 'scratch/all_68_pages_data.json'), JSON.stringify(masterData, null, 2), 'utf8');
console.log('Successfully saved scratch/all_68_pages_data.json!');
