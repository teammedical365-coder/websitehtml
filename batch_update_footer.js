const fs = require('fs');
const path = require('path');

const dirPath = __dirname;
const htmlFiles = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));

const oldSnippet = `<p class="mf-copy">© 2026 Medical365 — Bhamashah Techno Hub, Malviya Nagar, Jaipur,
                            Rajasthan 302017. All rights reserved.</p>
                        <p class="mf-copy mf-copy-sm">CIN: U72900RJ2022PTC080000 &nbsp;|&nbsp; GST: 08AAAAA0000A1Z5
                            &nbsp;|&nbsp; Made in India 🇮🇳</p>`;

const newSnippet = `<p class="mf-copy">© 2026 Medical365 — Bhamashah Techno Hub, Malviya Nagar, Jaipur,
                            Rajasthan 302017. All rights reserved.</p>
                        <p class="mf-copy mf-copy-sm">Medical365 is a product of Chonexa Technologies | Udyam Reg: UDYAM-RJ-17-0526964</p>
                        <p class="mf-copy mf-copy-sm">CIN: U72900RJ2022PTC080000 &nbsp;|&nbsp; GST: 08AAAAA0000A1Z5
                            &nbsp;|&nbsp; Made in India 🇮🇳</p>`;

let count = 0;
htmlFiles.forEach(file => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(oldSnippet)) {
        content = content.replace(oldSnippet, newSnippet);
        fs.writeFileSync(filePath, content);
        count++;
    } else {
        // Try with potential \r\n variations
        const oldSnippetCRLF = oldSnippet.replace(/\n/g, '\r\n');
        if (content.includes(oldSnippetCRLF)) {
            content = content.replace(oldSnippetCRLF, newSnippet.replace(/\n/g, '\r\n'));
            fs.writeFileSync(filePath, content);
            count++;
        }
    }
});

console.log(`Updated footer in ${count} files.`);
