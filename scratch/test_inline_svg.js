const fs = require('fs');
const path = require('path');
const engine = require('./page_builder_engine_v2.js');

const repoRoot = path.resolve(__dirname, '..');
const allData = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scratch/all_68_pages_data.json'), 'utf8'));

const slug = 'ecg-ekg-integration';
const item = allData[slug];

const filePath = path.join(repoRoot, slug + '.html');
const html = fs.readFileSync(filePath, 'utf8');

const headerIdx = html.indexOf('</header>');
const headerEnd = headerIdx !== -1 ? headerIdx + '</header>'.length : -1;
const footerIdx = html.indexOf('<footer');
const footerStart = footerIdx !== -1 ? footerIdx : -1;

const preHeader = html.substring(0, headerEnd);
const postFooter = html.substring(footerStart);

const svgContent = engine.generateSvgDiagram(item);

// Let's modify generateFullPageHtml to embed svgContent inline!
console.log('Testing inline SVG embedding for ecg-ekg-integration.html');
console.log('SVG content length:', svgContent.length);
console.log('PreHeader preserved:', preHeader.includes('<header class="main-header"'));
console.log('PostFooter preserved:', postFooter.includes('<footer class="main-footer"'));
