const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');

// Test files from SAFE_REMOVE
const testFiles = [
    'canteen-management-software-hospitals-sikar.html',
    'hospital-management-software-tonk-road.html',
    'medical-asset-inventory-management-jodhpur.html'
];

function sanitizeJsonLdContent(rawJson) {
    let parsed;
    try {
        parsed = JSON.parse(rawJson.trim());
    } catch (e) {
        return { modified: false, error: e.message, output: rawJson };
    }

    let modified = false;

    function cleanObject(obj) {
        if (!obj || typeof obj !== 'object') return;

        if (Array.isArray(obj)) {
            // Filter out standalone AggregateRating or synthetic Review items
            for (let i = obj.length - 1; i >= 0; i--) {
                const item = obj[i];
                if (item && typeof item === 'object') {
                    if (item['@type'] === 'AggregateRating') {
                        obj.splice(i, 1);
                        modified = true;
                        continue;
                    }
                    if (item['@type'] === 'Review') {
                        // Synthetic review check
                        const author = typeof item.author === 'string' ? item.author : (item.author ? item.author.name : '');
                        if (author === 'Dr. Rajesh Kumar' || author === 'Amit Sharma' || !author) {
                            obj.splice(i, 1);
                            modified = true;
                            continue;
                        }
                    }
                    cleanObject(item);
                }
            }
            return;
        }

        // Object properties
        if (obj.aggregateRating !== undefined) {
            delete obj.aggregateRating;
            modified = true;
        }

        if (obj.review !== undefined) {
            // If reviews are the known synthetic ones, delete review property
            const revs = Array.isArray(obj.review) ? obj.review : [obj.review];
            const allSynthetic = revs.every(r => {
                const a = typeof r.author === 'string' ? r.author : (r.author ? r.author.name : '');
                return a === 'Dr. Rajesh Kumar' || a === 'Amit Sharma' || !a;
            });
            if (allSynthetic) {
                delete obj.review;
                modified = true;
            }
        }

        // Recursively clean child properties
        for (const key of Object.keys(obj)) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                cleanObject(obj[key]);
            }
        }
    }

    cleanObject(parsed);

    if (modified) {
        return { modified: true, output: JSON.stringify(parsed, null, 2), error: null };
    }
    return { modified: false, output: rawJson, error: null };
}

console.log('Testing schema sanitization on 3 sample candidate files:');
testFiles.forEach(f => {
    const filePath = path.join(repoRoot, f);
    const content = fs.readFileSync(filePath, 'utf8');

    const scriptRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
    let match;
    let matchCount = 0;
    let modCount = 0;

    while ((match = scriptRegex.exec(content)) !== null) {
        matchCount++;
        const res = sanitizeJsonLdContent(match[1]);
        if (res.modified) modCount++;
        console.log(`  File ${f} Block ${matchCount}: modified = ${res.modified}, error = ${res.error}`);
    }
});
