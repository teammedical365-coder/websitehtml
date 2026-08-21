const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const componentsFooterPath = path.join(rootDir, 'components', 'footer.html');

if (!fs.existsSync(componentsFooterPath)) {
  console.error(`Missing footer component at: ${componentsFooterPath}`);
  process.exit(1);
}

const htmlFiles = fs
  .readdirSync(rootDir)
  .filter((f) => f.toLowerCase().endsWith('.html'))
  .filter((f) => f.toLowerCase() !== 'components/footer.html');

const footerRegexGlobal = /<footer\b[\s\S]*?<\/footer>/gi;
const globalScriptsRegex = /<script\b[^>]*\bsrc\s*=\s*["']global-scripts\.js["'][^>]*>\s*<\/script>/i;

let changed = 0;
let removedFooters = 0;
let addedGlobalScripts = 0;

for (const file of htmlFiles) {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Remove ALL existing footers.
  const matches = content.match(footerRegexGlobal);
  if (matches && matches.length) {
    removedFooters += matches.length;
    content = content.replace(footerRegexGlobal, '');
  }

  // Ensure global-scripts.js exists once, so footer injection runs.
  if (!globalScriptsRegex.test(content)) {
    // Insert before </body> if possible, else append.
    if (/<\/body>/i.test(content)) {
      content = content.replace(/<\/body>/i, `  <script src="global-scripts.js"></script>\n</body>`);
    } else {
      content += `\n<script src="global-scripts.js"></script>\n`;
    }
    addedGlobalScripts++;
  }

  // Remove duplicate global-scripts.js (keep first).
  const scriptMatches = content.match(new RegExp(globalScriptsRegex.source, 'gi'));
  if (scriptMatches && scriptMatches.length > 1) {
    let firstKept = false;
    content = content.replace(new RegExp(globalScriptsRegex.source, 'gi'), (m) => {
      if (!firstKept) {
        firstKept = true;
        return m;
      }
      return '';
    });
  }

  // Clean up excess blank lines caused by footer removal.
  content = content.replace(/\n{3,}/g, '\n\n');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    changed++;
  }
}

console.log(
  JSON.stringify(
    {
      htmlFiles: htmlFiles.length,
      changedFiles: changed,
      removedFooters,
      ensuredGlobalScriptsAddedOn: addedGlobalScripts,
    },
    null,
    2
  )
);

