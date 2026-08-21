const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

const htmlFiles = fs
  .readdirSync(rootDir)
  .filter((f) => f.toLowerCase().endsWith('.html'));

// Strict match: must include the exact heading AND both button labels.
const headingText = 'Ready to elevate your healthcare facility?';
const btn1Text = 'Get Started Today';
const btn2Text = 'Contact Sales';

// Prefer removing a whole <section> block that contains all identifiers.
const sectionRegex = new RegExp(
  String.raw`<section\b[\s\S]*?${escapeRegExp(headingText)}[\s\S]*?${escapeRegExp(
    btn1Text
  )}[\s\S]*?${escapeRegExp(btn2Text)}[\s\S]*?<\/section>`,
  'gi'
);

// Fallback: remove a whole <div> block that contains all identifiers (rare).
// Note: This is intentionally conservative; it won't match nested div structures perfectly,
// but catches common "single wrapper div" CTAs.
const divRegex = new RegExp(
  String.raw`<div\b[\s\S]*?${escapeRegExp(headingText)}[\s\S]*?${escapeRegExp(
    btn1Text
  )}[\s\S]*?${escapeRegExp(btn2Text)}[\s\S]*?<\/div>`,
  'gi'
);

let changedFiles = 0;
let removedBlocks = 0;

for (const file of htmlFiles) {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  const hadHeading = content.includes(headingText);
  if (!hadHeading) continue;

  const before = content;
  content = content.replace(sectionRegex, (m) => {
    removedBlocks++;
    return '';
  });

  if (content === before) {
    content = content.replace(divRegex, (m) => {
      removedBlocks++;
      return '';
    });
  }

  // Cleanup extra blank lines left by removal.
  content = content.replace(/\n{4,}/g, '\n\n\n');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    changedFiles++;
  }
}

console.log(
  JSON.stringify(
    {
      htmlFiles: htmlFiles.length,
      changedFiles,
      removedBlocks,
      headingText,
    },
    null,
    2
  )
);

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

