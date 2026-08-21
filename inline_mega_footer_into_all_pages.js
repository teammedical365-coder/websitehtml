const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const footerPath = path.join(rootDir, 'components', 'footer.html');

if (!fs.existsSync(footerPath)) {
  console.error(`Footer component not found: ${footerPath}`);
  process.exit(1);
}

const footerHtml = fs.readFileSync(footerPath, 'utf8').trim();
if (!footerHtml.toLowerCase().includes('<footer') || !footerHtml.includes('id="mega-footer"')) {
  console.error('components/footer.html does not look like the Mega Footer component.');
  process.exit(1);
}

const htmlFiles = fs
  .readdirSync(rootDir)
  .filter((f) => f.toLowerCase().endsWith('.html'));

let changedFiles = 0;
let alreadyHadFooter = 0;
let inserted = 0;

for (const file of htmlFiles) {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // If a footer already exists, skip.
  if (content.includes('id="mega-footer"')) {
    alreadyHadFooter++;
    continue;
  }

  // Insert footer right before </body>, otherwise before </html>, otherwise append.
  if (/<\/body>/i.test(content)) {
    content = content.replace(/<\/body>/i, `\n\n${footerHtml}\n\n</body>`);
  } else if (/<\/html>/i.test(content)) {
    content = content.replace(/<\/html>/i, `\n\n${footerHtml}\n\n</html>`);
  } else {
    content += `\n\n${footerHtml}\n`;
  }

  // Clean up a bit: avoid huge gaps.
  content = content.replace(/\n{4,}/g, '\n\n\n');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    changedFiles++;
    inserted++;
  }
}

console.log(
  JSON.stringify(
    {
      htmlFiles: htmlFiles.length,
      changedFiles,
      inserted,
      alreadyHadFooter,
    },
    null,
    2
  )
);

