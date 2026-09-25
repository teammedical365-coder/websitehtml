const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');

const appendExport = (fileName, varName) => {
    const fullPath = path.join(repoRoot, 'scratch', fileName);
    let content = fs.readFileSync(fullPath, 'utf8');
    if (!content.includes(`module.exports =`)) {
        content += `\n\nmodule.exports = ${varName};\n`;
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Appended export to ${fileName}`);
    }
};

appendExport('run_batch1b.js', 'remaining4Data');

console.log('=== LOADING ALL 68 PAGES DATA ===');

const masterData = {
    ...require('./generate_batch1_cardio_ortho.js'),
    ...require('./run_batch1b.js'),
    ...require('./run_batch2a_neuro.js'),
    ...require('./run_batch2b_peds_eye.js'),
    ...require('./run_batch3a_dental_derma.js'),
    ...require('./run_batch3b_onco.js'),
    ...require('./run_batch4a.js'),
    ...require('./run_batch4b.js')
};

console.log(`GRAND TOTAL LOADED PAGES: ${Object.keys(masterData).length} / 68`);

fs.writeFileSync(path.join(repoRoot, 'scratch/all_68_pages_data.json'), JSON.stringify(masterData, null, 2), 'utf8');
console.log('Saved scratch/all_68_pages_data.json successfully!');
