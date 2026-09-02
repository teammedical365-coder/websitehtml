const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const files = [
  'abha-compliance-software-jaipur.html',
  'best-clinic-management-software-jaipur.html',
  'emr-software-jaipur.html',
  'healthcare-crm-udaipur.html'
];

files.forEach(f => {
  console.log('========================================================');
  console.log('FILE:', f);
  console.log('========================================================');
  const c = fs.readFileSync(path.join(repoRoot, f), 'utf8');
  const regex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
  let match;
  let blockIdx = 0;
  while ((match = regex.exec(c)) !== null) {
    blockIdx++;
    const raw = match[1];
    if (raw.includes('AggregateRating') || raw.includes('Review') || raw.includes('ratingValue')) {
      console.log(`--- Block ${blockIdx} ---`);
      console.log(raw.trim());
    }
  }
});
