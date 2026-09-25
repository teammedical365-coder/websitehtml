const fs = require('fs');

function generateModernSvg(item) {
    const boxWidth = 152;
    const boxHeight = 78;
    const gap = 34;
    const startX = 30;
    const startY = 185;

    const nodeElements = item.nodes.map((nodeText, idx) => {
        const x = startX + idx * (boxWidth + gap);
        const y = startY;
        const arrow = idx < item.nodes.length - 1 ? `
        <!-- Connector ${idx+1} to ${idx+2} -->
        <g transform="translate(${x + boxWidth}, ${y + boxHeight/2})">
            <line x1="4" y1="0" x2="${gap - 6}" y2="0" stroke="${item.color}" stroke-width="2.5" stroke-dasharray="5,3"/>
            <polygon points="${gap - 2},0 ${gap - 10},-5 ${gap - 10},5" fill="${item.color}"/>
            <circle cx="${gap/2}" cy="0" r="3" fill="#ffffff" stroke="${item.color}" stroke-width="2"/>
        </g>` : '';

        // Split text nicely
        const words = nodeText.split(' ');
        const line1 = words.slice(0, 2).join(' ');
        const line2 = words.slice(2, 4).join(' ');
        const line3 = words.slice(4).join(' ');

        return `
        <!-- Node ${idx+1}: ${nodeText} -->
        <g transform="translate(${x}, ${y})">
            <rect width="${boxWidth}" height="${boxHeight}" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" filter="url(#cardShadow)"/>
            <rect width="${boxWidth}" height="5" rx="2.5" fill="${item.color}"/>
            <rect x="10" y="12" width="52" height="18" rx="9" fill="${item.color}15"/>
            <text x="36" y="24" text-anchor="middle" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-size="9" font-weight="800" fill="${item.color}" letter-spacing="0.5">
                STEP 0${idx+1}
            </text>
            <text x="12" y="44" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-size="11" font-weight="750" fill="#0f172a">
                ${line1}
            </text>
            <text x="12" y="58" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-size="10" font-weight="600" fill="#475569">
                ${line2}
            </text>
            ${line3 ? `<text x="12" y="70" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-size="9.5" fill="#64748b">${line3}</text>` : ''}
        </g>
        ${arrow}`;
    }).join('\n');

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 440" width="100%" height="100%" style="background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <defs>
        <filter id="cardShadow" x="-10%" y="-10%" width="125%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#0f172a" flood-opacity="0.06"/>
        </filter>
        <linearGradient id="brandBarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#1A56DB"/>
            <stop offset="60%" stop-color="${item.color}"/>
            <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
        <linearGradient id="logoCrossGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#37B39C"/>
            <stop offset="100%" stop-color="#1A56DB"/>
        </linearGradient>
        <pattern id="bgGrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#f1f5f9" stroke-width="1"/>
        </pattern>
    </defs>

    <!-- Subtle Background Grid -->
    <rect width="960" height="440" fill="url(#bgGrid)"/>

    <!-- Top Header Bar with Medical365 Brand Logo -->
    <rect x="0" y="0" width="960" height="74" fill="#0f172a"/>
    <rect x="0" y="71" width="960" height="3" fill="url(#brandBarGrad)"/>

    <!-- Official Medical365 Logo Vector Mark -->
    <g transform="translate(32, 18)">
        <!-- Logo Shield / Cross Icon -->
        <rect x="0" y="0" width="38" height="38" rx="10" fill="url(#logoCrossGrad)"/>
        <path d="M 19 9 L 19 29 M 9 19 L 29 19" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
        <!-- Brand Typography -->
        <text x="48" y="22" font-size="18" font-weight="900" fill="#ffffff" letter-spacing="-0.3">MEDICAL<tspan fill="#37B39C">365</tspan></text>
        <text x="49" y="34" font-size="8.5" font-weight="700" fill="#94a3b8" letter-spacing="1">HOSPITAL MANAGEMENT SYSTEM</text>
    </g>

    <!-- Top-Right Category Pill -->
    <g transform="translate(720, 22)">
        <rect width="208" height="30" rx="15" fill="rgba(255,255,255,0.1)"/>
        <circle cx="16" cy="15" r="5" fill="#37B39C"/>
        <text x="30" y="19" font-size="10.5" font-weight="800" fill="#ffffff" letter-spacing="0.5">
            ${item.cluster} CLINICAL PIPELINE
        </text>
    </g>

    <!-- Diagram Title & Subtitle Banner -->
    <g transform="translate(32, 104)">
        <text x="0" y="20" font-size="18" font-weight="850" fill="#0f172a" letter-spacing="-0.3">
            ${item.diagramTitle}
        </text>
        <text x="0" y="42" font-size="12.5" font-weight="500" fill="#64748b">
            Closed-loop bidirectional data flow integrating point-of-care clinical capture, diagnostic instruments, and EMR records.
        </text>
    </g>

    <!-- 5-Node Interactive Workflow Flowchart -->
    ${nodeElements}

    <!-- Bottom Regulatory Trust Bar -->
    <g transform="translate(32, 375)">
        <rect width="896" height="42" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
        
        <!-- Trust Badge 1: ABDM -->
        <g transform="translate(24, 14)">
            <circle cx="7" cy="7" r="6" fill="#059669"/>
            <path d="M 4 7 L 6 9 L 10 5" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
            <text x="20" y="11" font-size="11" font-weight="750" fill="#1e293b">ABDM Milestone 1, 2, 3</text>
            <text x="148" y="11" font-size="10" font-weight="500" fill="#64748b">| Full ABHA Linkage</text>
        </g>

        <!-- Trust Badge 2: DPDP Act -->
        <g transform="translate(340, 14)">
            <circle cx="7" cy="7" r="6" fill="#1A56DB"/>
            <path d="M 4 7 L 6 9 L 10 5" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
            <text x="20" y="11" font-size="11" font-weight="750" fill="#1e293b">DPDP Act 2023</text>
            <text x="105" y="11" font-size="10" font-weight="500" fill="#64748b">| AES-256 Encrypted</text>
        </g>

        <!-- Trust Badge 3: NABH -->
        <g transform="translate(630, 14)">
            <circle cx="7" cy="7" r="6" fill="#7c3aed"/>
            <path d="M 4 7 L 6 9 L 10 5" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
            <text x="20" y="11" font-size="11" font-weight="750" fill="#1e293b">NABH 5th Edition</text>
            <text x="125" y="11" font-size="10" font-weight="500" fill="#64748b">| Digital Audit-Proof</text>
        </g>
    </g>
</svg>`;
}

const sampleItem = {
    cluster: "CARDIOLOGY",
    diagramTitle: "12-Lead ECG Machine Integration & Diagnostic Flow",
    nodes: ["Patient 12-Lead Acquisition", "DICOM / SCP-ECG Ingestion", "Automated Caliper & Interval Math", "Cardiologist Review & ST-Elevation Alert", "EMR & ABHA Health Locker Sync"],
    color: "#e11d48"
};

const svg = generateModernSvg(sampleItem);
fs.writeFileSync('scratch/test_logo_diagram.svg', svg);
console.log('Generated scratch/test_logo_diagram.svg successfully!');
