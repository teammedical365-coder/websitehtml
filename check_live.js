const https = require('https');

const urls = [
    "https://www.medical365.in/lims-laboratory-information-management-jaipur",
    "https://www.medical365.in/clinic-management-system-vaishali-nagar",
    "https://www.medical365.in/hospital-management-software-tonk-road",
    "https://www.medical365.in/revenue-cycle-management-bhilwara"
];

function checkUrl(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                const xRobots = res.headers['x-robots-tag'];
                const hasNoIndexInBody = body.includes('noindex');
                resolve({
                    url,
                    statusCode: res.statusCode,
                    xRobots: xRobots || 'none',
                    hasNoIndexInBody: hasNoIndexInBody
                });
            });
        }).on('error', (err) => {
            resolve({ url, error: err.message });
        });
    });
}

async function run() {
    console.log("Checking Live URLs...");
    for (const url of urls) {
        const result = await checkUrl(url);
        console.log(JSON.stringify(result, null, 2));
    }
}

run();
