const fs = require('fs');
const path = require('path');

const dirPath = __dirname;
const hospitalsHtml = fs.readFileSync(path.join(dirPath, 'hospitals.html'), 'utf8');

// Extract Header and Footer from hospitals.html
const headerRegex = /<div\s+class="mobile-overlay"[\s\S]*?<\/header>/i;
const footerRegex = /<footer\b[^>]*>[\s\S]*?<\/footer>/i;

const headerMatch = hospitalsHtml.match(headerRegex);
const footerMatch = hospitalsHtml.match(footerRegex);

if (!headerMatch || !footerMatch) {
  console.error("Could not extract header or footer from hospitals.html");
  process.exit(1);
}

const masterHeader = headerMatch[0];
const masterFooter = footerMatch[0];

// Load competitors data
const competitors = [
  {
    name: 'Appointo',
    slug: 'appointo',
    category: 'Appointment Scheduling Plugin',
    tagline: 'Basic Appointment Scheduler vs Unified AI Healthcare Operating System',
    short_description: "Compare our unified AI hospital management system against Appointo's appointment booking widget to see how full-stack clinical workflows elevate care.",
    contrastHighlight: 'Appointo is only a calendar widget; Medical365 runs the entire hospital from AI triage to inpatient billing.',
    legacyWeaknesses: [
      'Limited strictly to calendar booking without clinical EHR or patient chart history',
      'No native inpatient (IPD), ICU vitals, or bed occupancy management',
      'Lacks pharmacy inventory, diagnostic laboratory (LIMS), and radiology (PACS)',
      'Requires multiple external software subscriptions to run a clinic or hospital'
    ],
    medical365Strengths: [
      'End-to-end hospital OS uniting OPD, IPD, OT, Pharmacy, and Diagnostics',
      'AI Clinical Voice-to-Text documentation saving doctors 2+ hours daily',
      'Integrated WhatsApp triage, automatic reminder journeys, and digital receipts',
      'Full ABHA M1/M2/M3 compliance and automated insurance TPA claim management'
    ],
    pricingComparison: {
      medical365: 'Transparent monthly/annual tiers with unlimited patient records and AI copilot included',
      competitor: 'Tiered add-on pricing with separate charges for SMS/integrations'
    },
    features: [
      { name: 'AI Clinical Documentation & Voice-to-EHR', medical365: true, competitor: false, category: 'AI & Automation' },
      { name: 'Full Hospital EHR & IPD/OPD Management', medical365: true, competitor: false, category: 'Clinical' },
      { name: 'Integrated Pharmacy & Inventory POS', medical365: true, competitor: false, category: 'Operations' },
      { name: 'Native WhatsApp Patient Workflow & Reminders', medical365: true, competitor: 'Add-on only', category: 'Integrations' },
      { name: 'ABHA (ABDM) & NABH Compliance Built-In', medical365: true, competitor: false, category: 'Operations' },
      { name: 'Zero-Hardware Cloud SaaS (99.99% SLA)', medical365: true, competitor: true, category: 'Deployment' }
    ],
    faq: [
      {
        question: 'How does Medical365 differ from Appointo?',
        answer: 'Appointo is solely an appointment booking widget. Medical365 is a full-featured, AI-powered cloud hospital and clinical management system handling everything from triage and electronic health records to pharmacy, OT, and insurance billing.'
      },
      {
        question: 'Can we import our existing Appointo patient appointments into Medical365?',
        answer: 'Yes. Medical365 provides 1-click CSV import and API synchronizers to seamlessly port patient contacts and past bookings into your unified clinic dashboard.'
      }
    ]
  },
  {
    name: 'KiviHealth',
    slug: 'kivihealth',
    category: 'Clinic & E-Prescription Management',
    tagline: 'Fragmented Clinic Tools vs Unified AI Healthcare Cloud OS',
    short_description: "Compare our unified AI hospital management system against KiviHealth's clinic tools to unlock autonomous clinical documentation and multi-branch telemetry.",
    contrastHighlight: 'Upgrade from fragmented clinic tools to Medical365\'s integrated hospital OS with AI diagnostic intelligence.',
    legacyWeaknesses: [
      'Basic clinic focus with limited capabilities for multi-specialty hospitals and surgical wards',
      'Manual prescription generation without proactive AI clinical decision support (CDS)',
      'Siloed modules requiring repetitive data entry across front desk and doctor desks',
      'Slow reporting engines for multi-branch hospital chain telemetry'
    ],
    medical365Strengths: [
      'Unified enterprise telemetry across all branches and hospital wards in real time',
      'Proactive drug-drug interaction checks and AI-suggested treatment pathways',
      'Zero-latency cloud performance with automated offline failover sync',
      'Comprehensive financial auditing and automated insurance claim reconciliation'
    ],
    pricingComparison: {
      medical365: 'Predictable all-inclusive pricing with enterprise support',
      competitor: 'Modular pricing with escalating costs per specialty'
    },
    features: [
      { name: 'AI Clinical Documentation & Voice-to-EHR', medical365: true, competitor: false, category: 'AI & Automation' },
      { name: 'Full Hospital EHR & IPD/OPD Management', medical365: true, competitor: 'OPD only', category: 'Clinical' },
      { name: 'Integrated Pharmacy & Inventory POS', medical365: true, competitor: 'Basic', category: 'Operations' },
      { name: 'Native WhatsApp Patient Workflow & Reminders', medical365: true, competitor: 'Limited', category: 'Integrations' },
      { name: 'ABHA (ABDM) & NABH Compliance Built-In', medical365: true, competitor: 'Partial', category: 'Operations' },
      { name: 'Multi-Branch Enterprise Sync', medical365: true, competitor: false, category: 'Deployment' }
    ],
    faq: [
      {
        question: 'Why are clinics migrating from KiviHealth to Medical365?',
        answer: 'Clinics switch to Medical365 for automated AI charting, integrated inpatient bed tracking, and seamless WhatsApp automation that drives patient return visits.'
      },
      {
        question: 'Does Medical365 support government healthcare schemes like ABHA and Ayushman Bharat?',
        answer: 'Yes, Medical365 is fully certified for ABHA M1, M2, and M3 milestones with instantaneous ABHA card generation and health record linkage.'
      }
    ]
  },
  {
    name: 'Practo Ray',
    slug: 'practo-ray',
    category: 'Practice Management & Marketplace',
    tagline: 'Third-Party Marketplace Dependency vs Sovereign Hospital Operating System',
    short_description: "Compare our unified AI hospital management system against Practo Ray's legacy portal to reclaim your hospital's patient brand equity and private EHR.",
    contrastHighlight: 'Own your patient relationships with zero marketplace middleman fees and native enterprise clinical workflows.',
    legacyWeaknesses: [
      'Patients are drawn into Practo\'s directory where competitor doctors are advertised',
      'Steep recurring licensing costs with limited control over your proprietary clinic data',
      'No deep inpatient (IPD) clinical workflows, surgical theater boards, or ICU flowcharts',
      'Slow customer support response times and rigid feature customizability'
    ],
    medical365Strengths: [
      '100% white-labeled branded patient experience with direct booking and zero commission fees',
      'Complete hospital command center: IPD, OPD, ER triage, OT scheduling, and blood bank',
      'Full clinical data sovereignty with bank-grade encryption and export freedom',
      'Autonomous WhatsApp conversational booking bot built right into your phone line'
    ],
    pricingComparison: {
      medical365: 'Flat platform fee without commission cuts or patient lead surcharges',
      competitor: 'High annual subscription plus platform marketplace dependencies'
    },
    features: [
      { name: 'Data Ownership & Zero Competitor Ads', medical365: true, competitor: false, category: 'Operations' },
      { name: 'AI Clinical Documentation & Voice-to-EHR', medical365: true, competitor: false, category: 'AI & Automation' },
      { name: 'Full Hospital EHR & IPD/OPD Management', medical365: true, competitor: 'Basic OPD', category: 'Clinical' },
      { name: 'Direct WhatsApp Bot (Zero Commission)', medical365: true, competitor: false, category: 'Integrations' },
      { name: 'End-to-End TPA Insurance Claims', medical365: true, competitor: false, category: 'Operations' },
      { name: 'Fast Modern Cloud UI', medical365: true, competitor: false, category: 'Deployment' }
    ],
    faq: [
      {
        question: 'How does Medical365 protect my patient database compared to Practo Ray?',
        answer: 'With Medical365, your hospital has 100% data ownership. We never market competing providers to your patients, cross-sell pharmaceuticals, or monetize your patient directory.'
      },
      {
        question: 'Can we switch from Practo Ray without losing historical patient medical charts?',
        answer: 'Yes, our automated onboarding concierge safely migrates your patient demographics, past prescriptions, and billing histories within 24 hours.'
      }
    ]
  },
  {
    name: 'Clinicea',
    slug: 'clinicea',
    category: 'Clinic & EMR Software',
    tagline: 'Complex Per-User Licensing vs Scalable Cloud AI Hospital Infrastructure',
    short_description: "Compare our unified AI hospital management system against Clinicea's multi-module platform for faster zero-lag charting and unified enterprise billing.",
    contrastHighlight: 'Replace rigid modules and steep user licensing with Medical365\'s cloud-native AI clinical ecosystem.',
    legacyWeaknesses: [
      'High per-provider pricing tiers that penalize growing clinic staff and nursing rosters',
      'Complex multi-step navigation making fast outpatient consults tedious',
      'Over-engineered interfaces for aesthetic clinics with weak multi-department hospital cohesion',
      'Limited automated follow-up workflows via WhatsApp and SMS'
    ],
    medical365Strengths: [
      'Intuitive 1-click clinical workflows tuned for peak doctor consultation efficiency',
      'Unified enterprise pricing designed for multi-doctor clinics and 500+ bed hospitals',
      'Real-time automated WhatsApp medicine reminders and diagnostic delivery',
      'Instant voice-to-structured prescription generation matching ICD-10 & SNOMED CT'
    ],
    pricingComparison: {
      medical365: 'Cost-effective scalable pricing with unlimited clinical staff accounts',
      competitor: 'Expensive per-doctor monthly licensing fees'
    },
    features: [
      { name: 'AI Clinical Documentation & Voice-to-EHR', medical365: true, competitor: false, category: 'AI & Automation' },
      { name: 'Inpatient (IPD) Ward & Bed Telemetry', medical365: true, competitor: 'Limited', category: 'Clinical' },
      { name: 'Integrated Pathology & Radiology Workflows', medical365: true, competitor: 'Basic', category: 'Operations' },
      { name: 'Automated WhatsApp Patient Retention', medical365: true, competitor: false, category: 'Integrations' },
      { name: 'Unlimited Staff & Nurse Seats', medical365: true, competitor: false, category: 'Operations' },
      { name: 'Modern Responsive Cloud App', medical365: true, competitor: true, category: 'Deployment' }
    ],
    faq: [
      {
        question: 'Why choose Medical365 over Clinicea for growing clinics?',
        answer: 'Medical365 offers unmatched speed, AI prescription generation, and unlimited staff seats without charging extra for every front-desk receptionist or nurse.'
      }
    ]
  },
  {
    name: 'Sparta HMS',
    slug: 'sparta-hms',
    category: 'Legacy On-Premise HMS',
    tagline: 'Fragile Local Server Hardware vs Resilient Zero-Maintenance Cloud AI OS',
    short_description: "Compare our unified AI hospital management system against Sparta HMS's on-premise architecture for modern cloud elasticity and zero server maintenance.",
    contrastHighlight: 'Ditch clunky local servers for Medical365\'s high-availability cloud infrastructure and AI operational insights.',
    legacyWeaknesses: [
      'Requires expensive on-premise server hardware, IT maintenance staff, and manual backups',
      'Prone to catastrophic data loss from local hard drive failures or power outages',
      'Outdated desktop UI requiring tedious software installations on every workstation',
      'No secure remote doctor access or mobile teleconsultation capabilities'
    ],
    medical365Strengths: [
      '100% cloud-hosted with automatic 99.99% uptime SLA and real-time geo-redundant backups',
      'Accessible securely from any browser, tablet, or smartphone without installation',
      'Continuous AI updates and weekly feature rollouts with zero system downtime',
      'Advanced enterprise cybersecurity meeting ISO 27001, HIPAA, and GDPR standards'
    ],
    pricingComparison: {
      medical365: 'Zero upfront hardware investment, simple subscription with included backups',
      competitor: 'Heavy capital expenditures for servers, AMC, and IT maintenance staff'
    },
    features: [
      { name: 'Zero Server Hardware Required', medical365: true, competitor: false, category: 'Deployment' },
      { name: 'Real-Time Cloud Backups & 99.99% Uptime', medical365: true, competitor: false, category: 'Deployment' },
      { name: 'AI Operational & Bed Optimization', medical365: true, competitor: false, category: 'AI & Automation' },
      { name: 'Remote Doctor Access on Any Device', medical365: true, competitor: false, category: 'Clinical' },
      { name: 'Instant Insurance Pre-Auth & Claims', medical365: true, competitor: 'Manual', category: 'Operations' },
      { name: 'Automatic Weekly Upgrades', medical365: true, competitor: false, category: 'Operations' }
    ],
    faq: [
      {
        question: 'What is the risk of staying on an on-premise system like Sparta HMS?',
        answer: 'On-premise systems expose hospitals to local ransomware, hard drive failures, high annual maintenance contracts (AMCs), and inability to access clinical charts remotely.'
      }
    ]
  },
  {
    name: 'DocEngage',
    slug: 'docengage',
    category: 'Healthcare CRM & Clinic Management',
    tagline: 'Marketing-Heavy CRM vs Full-Stack Clinical & Inpatient Hospital OS',
    short_description: "Compare our unified AI hospital management system against DocEngage's marketing-focused software to harmonize deep clinical EHR with revenue cycle automation.",
    contrastHighlight: 'Unify patient acquisition with real-time ward telemetry, smart OT scheduling, and AI medical audits.',
    legacyWeaknesses: [
      'Primary strength is lead marketing with superficial clinical and surgical documentation',
      'Lacks native deep hospital operational modules like ICU charting and blood inventory',
      'Complex configuration requiring extensive onboarding periods for hospital departments',
      'Fragmented billing flow between clinical interventions and pharmacy dispensation'
    ],
    medical365Strengths: [
      'Flawless bridge between high-converting patient CRM and deep clinical hospital execution',
      'AI triage that automatically classifies patient acuity and assigns ideal consultants',
      'Integrated surgical theater scheduler, anesthesia charts, and sterile inventory management',
      'Automated revenue cycle management eliminating unbilled consumables and leakages'
    ],
    pricingComparison: {
      medical365: 'All-in-one clinical and CRM platform under one predictable license',
      competitor: 'Separate licensing for CRM, EMR, and patient engagement modules'
    },
    features: [
      { name: 'Deep Inpatient (IPD) & Surgical EHR', medical365: true, competitor: 'Limited', category: 'Clinical' },
      { name: 'AI Patient Pipeline & Smart Triage', medical365: true, competitor: 'Rules only', category: 'AI & Automation' },
      { name: 'Integrated Operating Theater (OT) Management', medical365: true, competitor: false, category: 'Operations' },
      { name: 'Revenue Leakage Detection & Audit', medical365: true, competitor: false, category: 'Operations' },
      { name: 'Automated Multilingual WhatsApp Journeys', medical365: true, competitor: 'Basic', category: 'Integrations' },
      { name: 'Cloud Native High Concurrency', medical365: true, competitor: true, category: 'Deployment' }
    ],
    faq: [
      {
        question: 'Does Medical365 provide patient CRM capabilities like DocEngage?',
        answer: 'Yes, Medical365 includes a powerful healthcare CRM with lead tracking, campaign attribution, automated follow-ups, and integrates it directly with clinical records and hospital billing.'
      }
    ]
  },
  {
    name: 'HealthPlix',
    slug: 'healthplix',
    category: 'Doctor EMR & Digital Prescription',
    tagline: 'Solo Doctor Prescription Pad vs Enterprise Hospital Management System',
    short_description: "Compare our unified AI hospital management system against HealthPlix's outpatient prescription pad to integrate IPD, ICU, pharmacy, and laboratory in one platform.",
    contrastHighlight: 'Bridge the gap between individual doctor prescription pads and 360-degree hospital administration.',
    legacyWeaknesses: [
      'Designed solely as a doctor prescription pad; lacks hospital-wide operational infrastructure',
      'No inpatient bed tracking, ward nursing administration, or OT management',
      'No multi-department billing, central pharmacy POS, or lab analyzer interfacing',
      'Doctor-centric workflow without front-desk queue management or admission triage'
    ],
    medical365Strengths: [
      'Complete hospital ecosystem connecting front desk, nursing, diagnostics, and doctors',
      'Next-generation AI clinical copilot with real-time differential diagnosis suggestions',
      'Unified ward management with continuous vitals monitoring and automated nurse handover notes',
      'Full laboratory and radiology equipment integration via bidirectional HL7/DICOM'
    ],
    pricingComparison: {
      medical365: 'Complete hospital operating system with transparent hospital-wide licensing',
      competitor: 'Free/subsidized single-doctor app monetized through data/pharma partner channels'
    },
    features: [
      { name: 'Full Hospital-Wide Multi-Department Operations', medical365: true, competitor: false, category: 'Operations' },
      { name: 'Inpatient (IPD) & Bed Management', medical365: true, competitor: false, category: 'Clinical' },
      { name: 'Laboratory (LIMS) & PACS Radiology Link', medical365: true, competitor: false, category: 'Clinical' },
      { name: 'AI Voice Scribe & Diagnostic Copilot', medical365: true, competitor: 'Basic', category: 'AI & Automation' },
      { name: 'Autonomous WhatsApp Prescription Delivery', medical365: true, competitor: 'Limited', category: 'Integrations' },
      { name: 'Dedicated Private Cloud Infrastructure', medical365: true, competitor: false, category: 'Deployment' }
    ],
    faq: [
      {
        question: 'Can doctors who love HealthPlix easily use Medical365?',
        answer: 'Doctors transition seamlessly because Medical365 offers an even faster AI-powered prescription interface with voice dictation, plus direct connectivity to their hospital pharmacy and lab.'
      }
    ]
  },
  {
    name: 'SoftClinic GenX',
    slug: 'softclinic-genx',
    category: 'Hospital Information Management System',
    tagline: 'Traditional Legacy Menus vs Intuitive AI-Powered Hospital Experience',
    short_description: "Compare our unified AI hospital management system against SoftClinic GenX's complex legacy menus for a modern, frictionless clinical experience.",
    contrastHighlight: 'Transition to modern UI/UX with automated discharge summaries, real-time analytics, and instant WhatsApp updates.',
    legacyWeaknesses: [
      'Dense, dated user interface with steep learning curves for clinical staff and nurses',
      'Slow screen transitions and cluttered forms that bog down peak OPD hours',
      'Rigid reporting systems requiring manual exports to Excel for executive visibility',
      'Minimal patient-facing self-service capabilities or modern mobile interactions'
    ],
    medical365Strengths: [
      'Modern, lightning-fast UI designed for instant adoption with zero training overhead',
      'One-click automated discharge summaries generated in seconds using clinical AI',
      'Live executive command dashboard with predictive bed occupancy and cash flow forecasting',
      'Patient self-service portal for appointments, lab downloads, and digital payments'
    ],
    pricingComparison: {
      medical365: 'Modern all-inclusive SaaS with continuous cloud updates',
      competitor: 'Legacy software licensing model with substantial upfront setup fees'
    },
    features: [
      { name: 'Modern Intuitive Ultra-Fast UI', medical365: true, competitor: false, category: 'Deployment' },
      { name: 'AI Automated Discharge Summaries', medical365: true, competitor: false, category: 'AI & Automation' },
      { name: 'Instant Real-Time Executive Analytics', medical365: true, competitor: 'Basic', category: 'Operations' },
      { name: 'Unified Inpatient & Outpatient Engine', medical365: true, competitor: true, category: 'Clinical' },
      { name: 'Instant WhatsApp Lab & Bill Delivery', medical365: true, competitor: false, category: 'Integrations' },
      { name: 'Zero-Downtime SaaS Infrastructure', medical365: true, competitor: false, category: 'Deployment' }
    ],
    faq: [
      {
        question: 'How fast can our hospital transition from SoftClinic to Medical365?',
        answer: 'Our automated migration bridge extracts your patients, medicines, and billing codes with zero downtime. Most hospitals transition in under 48 hours.'
      }
    ]
  },
  {
    name: 'MyOPD',
    slug: 'myopd',
    category: 'Desktop Offline Clinic Software',
    tagline: 'Single-Device Desktop Lock-in vs Secure Anywhere Cloud Healthcare Platform',
    short_description: "Compare our unified AI hospital management system against MyOPD's desktop-bound offline software for accessible multi-device cloud operations.",
    contrastHighlight: 'Break free from single-computer desktop silos with cloud data redundancy, AI assisted diagnostics, and mobile rounds.',
    legacyWeaknesses: [
      'Desktop-only software bound to a single computer with high risk of local hardware failure',
      'Doctors cannot review patient charts or authorize admissions while away from their desk',
      'No real-time multi-branch synchronization or collaborative care workflows',
      'Absence of modern AI clinical assists or automated patient engagement bots'
    ],
    medical365Strengths: [
      'True cloud elasticity accessible from iPad, Android, Mac, or PC with end-to-end encryption',
      'Smart mobile rounds app for doctors to check inpatient vitals from anywhere',
      'Instant cloud backup guaranteeing you never lose a single patient prescription',
      'Automated appointment confirmations, follow-up alerts, and medication reminders'
    ],
    pricingComparison: {
      medical365: 'Cost-effective cloud subscription with multi-user and multi-device access',
      competitor: 'One-time or recurring license tied to single computer hardware'
    },
    features: [
      { name: 'Any-Device Cloud Access (Tablet/Mobile/PC)', medical365: true, competitor: false, category: 'Deployment' },
      { name: 'AI Voice Dictation & Scribe', medical365: true, competitor: false, category: 'AI & Automation' },
      { name: 'Multi-User Concurrent Collaboration', medical365: true, competitor: false, category: 'Operations' },
      { name: 'Automated Geo-Redundant Cloud Backups', medical365: true, competitor: false, category: 'Deployment' },
      { name: 'IPD, OT & Hospital Wards Support', medical365: true, competitor: false, category: 'Clinical' },
      { name: 'Integrated Teleconsultation Suite', medical365: true, competitor: false, category: 'Clinical' }
    ],
    faq: [
      {
        question: 'What happens if our hospital internet connection drops?',
        answer: 'Medical365 includes built-in offline synchronization. Your team can continue charting uninterrupted; changes automatically sync the moment connection restores.'
      }
    ]
  },
  {
    name: 'WATI',
    slug: 'wati',
    category: 'WhatsApp Business API Tool',
    tagline: 'Generic Chat Tool vs Deep Healthcare-Native AI Communication Platform',
    short_description: "Compare our unified AI hospital management system against WATI's generic messaging tool to get deep, HIPAA/ABHA-compliant medical workflows natively embedded.",
    contrastHighlight: 'More than chat: automated lab delivery, smart queue alerts, and billing receipts built directly into clinical care.',
    legacyWeaknesses: [
      'Generic customer support tool with zero understanding of healthcare, EHR, or hospital triage',
      'Requires costly custom third-party integrations to connect to your hospital database',
      'Non-compliant with strict medical data sovereignty and HIPAA/ABHA clinical audit trails',
      'Cannot generate prescriptions, process lab orders, or manage inpatient admissions'
    ],
    medical365Strengths: [
      'Native medical WhatsApp workflow built directly into your hospital management core',
      'Automated delivery of diagnostic lab reports, discharge summaries, and payment links',
      'Conversational AI bot trained on clinical triage to route emergency vs routine OPD cases',
      'Full patient privacy compliance with end-to-end encrypted medical attachments'
    ],
    pricingComparison: {
      medical365: 'Unified hospital system with native WhatsApp integration included',
      competitor: 'Standalone monthly subscription plus expensive per-message conversation fees'
    },
    features: [
      { name: 'Native Hospital Database Integration', medical365: true, competitor: false, category: 'Integrations' },
      { name: 'Automated Lab & Radiology Report Dispatch', medical365: true, competitor: false, category: 'Integrations' },
      { name: 'Clinical AI Triage & Doctor Routing', medical365: true, competitor: false, category: 'AI & Automation' },
      { name: 'Full Hospital EHR & Billing Core', medical365: true, competitor: false, category: 'Clinical' },
      { name: 'Zero Third-Party Middleware Setup', medical365: true, competitor: false, category: 'Deployment' },
      { name: 'ABHA & HIPAA Healthcare Privacy Compliant', medical365: true, competitor: false, category: 'Operations' }
    ],
    faq: [
      {
        question: 'Do we still need WATI if we use Medical365?',
        answer: 'No. Medical365 natively handles all WhatsApp patient communication, appointments, lab reports, and automated reminders without requiring WATI or third-party webhooks.'
      }
    ]
  },
  {
    name: 'MocDoc',
    slug: 'mocdoc',
    category: 'HMS & LIMS Software',
    tagline: 'Standard Healthcare Software vs Next-Gen Predictive AI Hospital Operating System',
    short_description: "Compare our unified AI hospital management system against MocDoc's suite for intelligent automated pre-authorizations and faster bedside workflows.",
    contrastHighlight: 'Harness next-gen AI automation, predictive bed turnover, and modern API interoperability at lower TCO.',
    legacyWeaknesses: [
      'Traditional rule-based logic lacks autonomous AI clinical decision support',
      'Insurance pre-authorization requires extensive manual paperwork and documentation gathering',
      'Inflexible reporting views for complex multi-entity hospital corporations',
      'High onboarding and ongoing technical customization charges'
    ],
    medical365Strengths: [
      'Autonomous insurance AI that analyzes clinical notes and prepares pre-auth filings in minutes',
      'Predictive bed management algorithms that forecast discharges and reduce room turnover lag',
      'Real-time clinical audit assistant flagging missing documentation before billing submission',
      'Substantially lower total cost of ownership with transparent enterprise pricing'
    ],
    pricingComparison: {
      medical365: 'Transparent pricing with zero hidden implementation fees or upgrade charges',
      competitor: 'Enterprise tiered pricing with extra costs for advanced hospital modules'
    },
    features: [
      { name: 'AI Insurance Pre-Authorization Engine', medical365: true, competitor: false, category: 'AI & Automation' },
      { name: 'Predictive Bed Turnover & Ward Telemetry', medical365: true, competitor: 'Basic', category: 'Operations' },
      { name: 'AI Clinical Documentation & Voice Scribe', medical365: true, competitor: false, category: 'AI & Automation' },
      { name: 'Unified Hospital, Clinic & LIMS Core', medical365: true, competitor: true, category: 'Clinical' },
      { name: 'Integrated Direct WhatsApp Bot', medical365: true, competitor: 'Add-on', category: 'Integrations' },
      { name: 'Rapid 48-Hour Implementation Cycle', medical365: true, competitor: false, category: 'Deployment' }
    ],
    faq: [
      {
        question: 'How does Medical365\'s AI benefit hospital insurance claim processing?',
        answer: 'Medical365 automatically cross-checks medical records against insurer requirements, reducing pre-authorization denials and speeding up cash collection by over 40%.'
      }
    ]
  },
  {
    name: 'Eka Care',
    slug: 'eka-care',
    category: 'EMR & Personal Health Records',
    tagline: 'Doctor App & Personal Health Records vs Enterprise Hospital Operating System',
    short_description: "Compare our unified AI hospital management system against Eka Care's practitioner tools for enterprise-grade IPD, OT management, and NABH-ready analytics.",
    contrastHighlight: 'Scale from basic ABHA creation to complete hospital operational orchestration and automated RCM.',
    legacyWeaknesses: [
      'Centered on individual doctor apps and patient PHR records rather than multi-bed hospital operations',
      'Limited hospital ward administration, nursing shift handovers, and ICU flows',
      'Does not support complex multi-tier surgical billing, blood bank, or central sterile supply (CSSD)',
      'Constrained enterprise multi-department financial ledger auditing'
    ],
    medical365Strengths: [
      'Industrial-grade hospital operational platform supporting 50 to 1,000+ bed institutions',
      'Full surgical suite: preoperative checklists, PACU logs, anesthesia monitoring, and OT booking',
      'Automated NABH audit trails and clinical KPI reporting ready with 1-click generation',
      'Seamless ABHA gateway integrated with comprehensive hospital revenue cycle management'
    ],
    pricingComparison: {
      medical365: 'Tailored enterprise plans designed for modern multi-specialty hospitals',
      competitor: 'Freemium app model with monetization directed at consumer health services'
    },
    features: [
      { name: 'Complete 50-1000+ Bed Hospital IPD Management', medical365: true, competitor: false, category: 'Clinical' },
      { name: 'Operating Theater (OT) & ICU Management', medical365: true, competitor: false, category: 'Clinical' },
      { name: 'Comprehensive ABHA M1/M2/M3 Integration', medical365: true, competitor: true, category: 'Operations' },
      { name: 'AI Voice Clinical Charting', medical365: true, competitor: 'Basic', category: 'AI & Automation' },
      { name: 'Hospital Financial Accounting & RCM', medical365: true, competitor: false, category: 'Operations' },
      { name: 'Dedicated Onsite & Online 24/7 Support', medical365: true, competitor: false, category: 'Deployment' }
    ],
    faq: [
      {
        question: 'Can Medical365 handle ABHA health record sharing like Eka Care?',
        answer: 'Yes. Medical365 is a certified ABHA HIP/HIU solution, allowing hospitals to link ABHA IDs, request consent, and share health records securely while running the entire hospital enterprise.'
      }
    ]
  },
  {
    name: 'DocPulse',
    slug: 'docpulse',
    category: 'Clinic & Hospital Queue Management',
    tagline: 'Queue & Booking Software vs Unified AI-Driven Hospital Intelligence OS',
    short_description: "Compare our unified AI hospital management system against DocPulse's clinic queuing tools for integrated PACS imaging and intelligent clinical decision support.",
    contrastHighlight: 'Streamline patient journeys from digital token kiosks to multi-tier surgical billing without third-party plugins.',
    legacyWeaknesses: [
      'Primarily focused on token queues and basic OPD appointments without deep clinical depth',
      'Lacks advanced AI voice documentation and automated clinical summarization',
      'Limited radiological PACS DICOM viewer integration for diagnostic departments',
      'Customizations require lengthy change requests and software developer fees'
    ],
    medical365Strengths: [
      'Intelligent digital token kiosks linked directly to doctor consult speeds and lab turnarounds',
      'Native cloud PACS viewer enabling doctors to view CT, MRI, and X-ray DICOMs inside the patient chart',
      'AI Clinical Decision Support highlighting abnormal vitals, allergy risks, and drug contraindications',
      'Unified billing covering pharmacy, diagnostics, room charges, and doctor consultation fees'
    ],
    pricingComparison: {
      medical365: 'Transparent per-facility SaaS with all modules included',
      competitor: 'Tiered module add-ons with separate fees for queue displays and SMS packs'
    },
    features: [
      { name: 'Smart AI Token Queue & Triage', medical365: true, competitor: 'Basic', category: 'Operations' },
      { name: 'Native DICOM / PACS Radiology Viewer', medical365: true, competitor: false, category: 'Clinical' },
      { name: 'AI Clinical Decision Support (CDS)', medical365: true, competitor: false, category: 'AI & Automation' },
      { name: 'Full Inpatient & Outpatient EHR', medical365: true, competitor: 'Limited', category: 'Clinical' },
      { name: 'Direct WhatsApp Bot Communication', medical365: true, competitor: 'Third-party', category: 'Integrations' },
      { name: 'Zero-Hardware Cloud Infrastructure', medical365: true, competitor: true, category: 'Deployment' }
    ],
    faq: [
      {
        question: 'How does Medical365 improve patient wait times compared to DocPulse?',
        answer: 'Medical365 combines smart queuing with AI clinical charting, reducing doctor consultation documentation time by 50% and cutting total OPD wait times by up to 35%.'
      }
    ]
  },
  {
    name: 'Docterz',
    slug: 'docterz',
    category: 'Pediatric & Specialty Clinic App',
    tagline: 'Niche Mobile Practice App vs Complete Enterprise AI Hospital Platform',
    short_description: "Compare our unified AI hospital management system against Docterz's pediatric/clinic app to expand into multi-specialty hospital management.",
    contrastHighlight: 'Empower all hospital departments—from emergency triage to central pharmacy—under a unified AI operating system.',
    legacyWeaknesses: [
      'Tailored primarily toward pediatric clinics with limited scope for multi-specialty hospital networks',
      'Constrained mobile app interfaces unsuitable for high-volume hospital reception desks and billing halls',
      'No multi-department inventory, central supply, or advanced corporate TPA insurance billing',
      'Weak integration with hospital pathology analyzers and diagnostic imaging machines'
    ],
    medical365Strengths: [
      'Comprehensive specialty templates for Pediatrics, Cardiology, Orthopedics, Oncology, and 40+ disciplines',
      'High-throughput reception, billing, and nursing station interfaces designed for enterprise scale',
      'Fully automated bidirectional lab machine interfacing (HL7/ASTM) for instant test result entry',
      'Robust corporate panel and Ayushman Bharat / insurance billing workflows'
    ],
    pricingComparison: {
      medical365: 'Enterprise-grade hospital pricing with multi-specialty clinical templates included',
      competitor: 'Single practitioner monthly subscription model'
    },
    features: [
      { name: '40+ Specialty Clinical Templates', medical365: true, competitor: 'Pediatrics mostly', category: 'Clinical' },
      { name: 'High-Volume Enterprise Billing Desk', medical365: true, competitor: false, category: 'Operations' },
      { name: 'Bidirectional Lab Machine Interfacing', medical365: true, competitor: false, category: 'Operations' },
      { name: 'AI Voice Consultation Dictation', medical365: true, competitor: false, category: 'AI & Automation' },
      { name: 'Full Inpatient & Emergency Triage', medical365: true, competitor: false, category: 'Clinical' },
      { name: 'Complete ABHA Compliance Suite', medical365: true, competitor: 'Basic', category: 'Operations' }
    ],
    faq: [
      {
        question: 'Does Medical365 include pediatric vaccination growth charts like Docterz?',
        answer: 'Yes! Medical365 includes specialized pediatric modules with WHO growth charts, automated vaccination schedules, and WhatsApp booster alerts, alongside 40+ other clinical specialties.'
      }
    ]
  },
  {
    name: 'Lybrate',
    slug: 'lybrate',
    category: 'Consultation Portal & Clinic Software',
    tagline: 'Lead Aggregator Marketplace vs Independent Hospital Brand & Cloud EHR',
    short_description: "Compare our unified AI hospital management system against Lybrate's marketplace model to retain patient loyalty and eliminate commission fees.",
    contrastHighlight: 'Keep 100% of patient revenue while offering AI diagnostic assistance and private telemedicine portals.',
    legacyWeaknesses: [
      'Focuses on patient marketplace listings where hospitals compete against rival clinics',
      'High patient acquisition cost and commission cuts on consultations',
      'Underdeveloped inpatient, nursing, pharmacy, and surgical hospital infrastructure',
      'Lack of granular clinical documentation tools and hospital operational telemetry'
    ],
    medical365Strengths: [
      '100% dedicated to your hospital brand; zero competitor listings or revenue sharing',
      'Native white-labeled telemedicine portal with automated prescription dispatch and digital payment',
      'Comprehensive enterprise EHR covering emergency, outpatient, inpatient, and ICU wards',
      'AI patient relationship manager that automatically nurtures existing patient loyalty'
    ],
    pricingComparison: {
      medical365: 'Fixed transparent SaaS model with zero per-consultation commissions',
      competitor: 'Lead fees, commissions, and advertising upsells'
    },
    features: [
      { name: 'Zero Commission Fees & Direct Patient Loyalty', medical365: true, competitor: false, category: 'Operations' },
      { name: 'White-Labeled Hospital Brand Portal', medical365: true, competitor: false, category: 'Operations' },
      { name: 'Full Hospital EHR & Ward Management', medical365: true, competitor: false, category: 'Clinical' },
      { name: 'AI Clinical Documentation & Scribe', medical365: true, competitor: false, category: 'AI & Automation' },
      { name: 'Integrated Hospital Pharmacy & POS', medical365: true, competitor: false, category: 'Operations' },
      { name: 'Bank-Grade Patient Privacy & Sovereignty', medical365: true, competitor: false, category: 'Deployment' }
    ],
    faq: [
      {
        question: 'Why are private hospitals moving away from Lybrate to Medical365?',
        answer: 'Hospitals want to build long-term institutional value and protect patient relationships without paying commissions or exposing their patients to competing doctor ads.'
      }
    ]
  },
  {
    name: 'DocOn',
    slug: 'docon',
    category: 'Tablet EMR & Prescription Software',
    tagline: 'Doctor Tablet Prescription Pad vs Unified Hospital Operational Ecosystem',
    short_description: "Compare our unified AI hospital management system against DocOn's OPD-focused tablet software to connect all clinical, surgical, and nursing operations.",
    contrastHighlight: 'Synchronize doctors, nurses, pharmacists, and lab techs seamlessly across all hospital departments.',
    legacyWeaknesses: [
      'Hardware-tethered tablet prescription experience with little hospital-wide connectivity',
      'No multi-bed inpatient management, ICU monitoring charts, or OT scheduling',
      'Fragmented communication between doctor orders and pharmacy dispensation',
      'Limited financial and insurance claim audit tools'
    ],
    medical365Strengths: [
      'Instant synchronization across doctors, nurses, pharmacists, lab techs, and front desk',
      'Runs seamlessly on any device: iPads, Android tablets, desktop PCs, laptops, and smartphones',
      'Automated bedside nursing charts and real-time vital sign tracking with early warning alerts',
      'Integrated corporate and cashless insurance management with automated claim tracking'
    ],
    pricingComparison: {
      medical365: 'Unified hospital system covering all staff seats at competitive rates',
      competitor: 'Hardware leasing and per-tablet recurring license fees'
    },
    features: [
      { name: 'Device Freedom (Works on Tablets, Laptops & Desktops)', medical365: true, competitor: 'Tablet-focused', category: 'Deployment' },
      { name: 'Hospital-Wide Staff Synchronization', medical365: true, competitor: false, category: 'Operations' },
      { name: 'Inpatient (IPD) & Nursing Ward Stations', medical365: true, competitor: false, category: 'Clinical' },
      { name: 'AI Voice Dictation & Rapid Charting', medical365: true, competitor: 'Basic', category: 'AI & Automation' },
      { name: 'Integrated Pharmacy POS & Inventory', medical365: true, competitor: 'Basic', category: 'Operations' },
      { name: 'Full Insurance Claims & TPA Portal', medical365: true, competitor: false, category: 'Operations' }
    ],
    faq: [
      {
        question: 'Can doctors continue using their tablets with Medical365?',
        answer: 'Yes! Medical365 is 100% responsive and optimized for touchscreens, iPads, Android tablets, and stylus writing, plus provides voice-to-text AI transcription.'
      }
    ]
  },
  {
    name: 'Genamet',
    slug: 'genamet',
    category: 'Cloud Practice Management System',
    tagline: 'Standard Practice Management vs Modern AI-Driven Healthcare Cloud OS',
    short_description: "Compare our unified AI hospital management system against Genamet's practice management platform for voice-driven charting and predictive bed occupancy.",
    contrastHighlight: 'Modernize healthcare delivery with real-time bed analytics, AI doctor summaries, and rapid insurance adjudication.',
    legacyWeaknesses: [
      'Standard practice management tools lack automated clinical intelligence and predictive insights',
      'Basic reporting tools that fail to highlight revenue leakage or operational bottlenecks',
      'Limited inpatient surgical workflows and nursing station handovers',
      'Manual patient re-engagement requiring labor-intensive staff calling'
    ],
    medical365Strengths: [
      'Clinical AI engine that predicts patient length of stay and streamlines bed turnover',
      'Autonomous patient re-engagement engine powered by intelligent WhatsApp journeys',
      'Comprehensive surgical and anesthesia record management with pre-op checklists',
      'Real-time cash flow and billing leak detection alerting administrators instantly'
    ],
    pricingComparison: {
      medical365: 'Value-driven transparent pricing with AI capabilities included standard',
      competitor: 'Standard SaaS subscription with separate fees for advanced features'
    },
    features: [
      { name: 'AI Clinical Documentation & Scribing', medical365: true, competitor: false, category: 'AI & Automation' },
      { name: 'Predictive Bed Occupancy & Discharge Workflows', medical365: true, competitor: false, category: 'Operations' },
      { name: 'Automated WhatsApp Patient Retention', medical365: true, competitor: 'Manual', category: 'Integrations' },
      { name: 'Comprehensive Hospital EHR (OPD & IPD)', medical365: true, competitor: 'Basic', category: 'Clinical' },
      { name: 'Real-Time Revenue Leakage Guard', medical365: true, competitor: false, category: 'Operations' },
      { name: 'Modern Cloud Architecture & High Speed', medical365: true, competitor: true, category: 'Deployment' }
    ],
    faq: [
      {
        question: 'How does Medical365 compare to Genamet for multi-specialty clinics?',
        answer: 'Medical365 provides deeper clinical workflows, automated voice documentation, integrated pharmacy inventory, and advanced surgical management that Genamet does not support.'
      }
    ]
  },
  {
    name: 'Adrine',
    slug: 'adrine',
    category: 'Hospital Information Management System',
    tagline: 'Outdated Legacy Interface vs High-Speed Modern Cloud Hospital Suite',
    short_description: "Compare our unified AI hospital management system against Adrine's complex interface to achieve rapid staff onboarding and automated cloud sync.",
    contrastHighlight: 'Cut training time by 80% with an intuitive, modern AI interface designed for speed in emergency and acute care.',
    legacyWeaknesses: [
      'Cumbersome interface with multiple sub-windows causing operator fatigue and errors',
      'Extended training periods required for new hospital staff and nursing teams',
      'Complicated system updates that disrupt hospital operations and billing flows',
      'Weak modern integrations with mobile messaging, telemedicine, and digital payments'
    ],
    medical365Strengths: [
      'Intuitive modern UI that new hospital staff can master in less than 30 minutes',
      'Zero-disruption seamless cloud updates delivered without closing counters or rebooting',
      'Instant mobile telemedicine and WhatsApp billing links sent with a single click',
      'Comprehensive clinical decision support to prevent medication errors and double-billing'
    ],
    pricingComparison: {
      medical365: 'Predictable subscription without unexpected upgrade or maintenance invoices',
      competitor: 'Traditional software contracts with expensive AMC and modification fees'
    },
    features: [
      { name: '30-Minute Staff Onboarding Curve', medical365: true, competitor: false, category: 'Operations' },
      { name: 'Zero-Downtime Silent Cloud Updates', medical365: true, competitor: false, category: 'Deployment' },
      { name: 'AI Medical Decision Support & Error Prevention', medical365: true, competitor: false, category: 'AI & Automation' },
      { name: 'Complete Hospital Operations (OPD, IPD, ICU, OT)', medical365: true, competitor: true, category: 'Clinical' },
      { name: 'Modern WhatsApp & Digital Payment Links', medical365: true, competitor: false, category: 'Integrations' },
      { name: 'End-to-End ABHA & NABH Compliance', medical365: true, competitor: 'Limited', category: 'Operations' }
    ],
    faq: [
      {
        question: 'Will our staff have difficulty learning Medical365 if they used Adrine?',
        answer: 'No. Users report Medical365 is dramatically easier and faster to use, requiring less than an hour of training compared to weeks on legacy systems.'
      }
    ]
  },
  {
    name: 'Marg ERP',
    slug: 'marg-erp',
    category: 'Pharma Inventory & Accounting Software',
    tagline: 'Retail Accounting Software vs Purpose-Built Healthcare & Clinical OS',
    short_description: "Compare our unified AI hospital management system against Marg ERP's accounting software to give doctors and clinicians purpose-built medical tools.",
    contrastHighlight: 'Do not run a hospital on generic accounting software: combine clinical precision with automatic financial compliance.',
    legacyWeaknesses: [
      'Designed primarily for retail pharmacy accounting, GST filing, and stock trade',
      'Severely lacks clinical electronic health records, nursing stations, and triage tools',
      'Clunky keyboard-driven DOS-like interface that doctors refuse to operate',
      'No patient mobile app, WhatsApp consultation booking, or telemedicine capabilities'
    ],
    medical365Strengths: [
      'Purpose-built for healthcare: merges clinical excellence with enterprise accounting',
      'Full clinical EHR, voice prescriptions, and digital patient charts doctors love using',
      'Automated hospital pharmacy dispensing directly linked to inpatient and OPD prescriptions',
      'Automated GST filing and financial ledger reconciliation alongside patient health management'
    ],
    pricingComparison: {
      medical365: 'Comprehensive hospital software replacing multiple standalone accounting and clinical tools',
      competitor: 'Low software purchase price with high hidden costs for add-ons and customizations'
    },
    features: [
      { name: 'Purpose-Built Healthcare & Clinical Workflows', medical365: true, competitor: false, category: 'Clinical' },
      { name: 'Doctor-Friendly AI Prescription Interface', medical365: true, competitor: false, category: 'AI & Automation' },
      { name: 'Hospital Pharmacy & Batch Expiry Tracking', medical365: true, competitor: true, category: 'Operations' },
      { name: 'Full Hospital IPD, OT & Bed Management', medical365: true, competitor: false, category: 'Clinical' },
      { name: 'Native WhatsApp Patient Journeys', medical365: true, competitor: false, category: 'Integrations' },
      { name: 'Modern Cloud Architecture (No Local Server)', medical365: true, competitor: false, category: 'Deployment' }
    ],
    faq: [
      {
        question: 'Can Medical365 handle our hospital pharmacy stock and GST accounting like Marg ERP?',
        answer: 'Yes! Medical365 provides complete pharmacy inventory management with barcode scanning, batch/expiry alerts, purchase orders, and automated GST billing—while fully integrating with doctor prescriptions.'
      }
    ]
  },
  {
    name: 'eHospital Systems',
    slug: 'ehospital-systems',
    category: 'Legacy Enterprise HMS Suite',
    tagline: 'Cumbersome Deployment Cycles vs Agile Cloud-Native AI Hospital OS',
    short_description: "Compare our unified AI hospital management system against eHospital Systems' cumbersome deployment to launch a cloud-native hospital in hours.",
    contrastHighlight: 'Enjoy zero server maintenance, automated weekly feature upgrades, and modern AI clinical intelligence.',
    legacyWeaknesses: [
      'Monolithic architecture with multi-month installation cycles and hefty upfront consultant fees',
      'Rigid codebase makes adapting to new clinical workflows or third-party APIs painful',
      'Demands dedicated on-premise IT personnel and high ongoing infrastructure costs',
      'Outdated UI leads to frequent operator friction and slow bedside charting'
    ],
    medical365Strengths: [
      'Cloud-native modern SaaS architecture deployed in hours instead of months',
      'Modern open APIs for effortless connection with insurance TPAs, lab analyzers, and CRM tools',
      'Zero server maintenance or IT staff overhead; automatic weekly continuous enhancements',
      'Integrated AI copilot that assists doctors in drafting discharge notes and coding diagnoses'
    ],
    pricingComparison: {
      medical365: 'Transparent per-bed or per-hospital monthly subscription with zero setup shocks',
      competitor: 'Heavy enterprise licensing, custom development charges, and annual AMC'
    },
    features: [
      { name: 'Fast 24-48 Hour Cloud Deployment', medical365: true, competitor: false, category: 'Deployment' },
      { name: 'AI Clinical Notes & Discharge Summaries', medical365: true, competitor: false, category: 'AI & Automation' },
      { name: 'Zero IT Server Maintenance Required', medical365: true, competitor: false, category: 'Deployment' },
      { name: 'Comprehensive Hospital Suite (50+ Modules)', medical365: true, competitor: true, category: 'Clinical' },
      { name: 'Modern Mobile & Tablet Responsive UI', medical365: true, competitor: false, category: 'Deployment' },
      { name: 'Built-in Direct WhatsApp Communication', medical365: true, competitor: false, category: 'Integrations' }
    ],
    faq: [
      {
        question: 'Why do multi-specialty hospitals switch from eHospital Systems to Medical365?',
        answer: 'Hospitals migrate to Medical365 to eliminate high server maintenance costs, cut onboarding time for new medical staff, and access cutting-edge AI clinical documentation.'
      }
    ]
  },
  {
    name: 'Open Dental',
    slug: 'open-dental',
    category: 'On-Premise Dental Software',
    tagline: 'On-Premise Desktop Dental Tool vs Modern Cloud Multi-Specialty Hospital OS',
    short_description: "Compare our unified AI hospital management system against Open Dental's on-premise dental tool for multi-specialty cloud expansion and zero backup headaches.",
    contrastHighlight: 'Seamlessly bridge dental procedures with general hospital care, insurance claims, and cloud accessibility anywhere.',
    legacyWeaknesses: [
      'Restricted solely to dental practices; cannot support general medical, IPD, or surgical hospital beds',
      'On-premise client-server setup requiring local database backups, server upgrades, and VPNs',
      'Windows-only desktop client requiring installation on every operatory terminal',
      'Lacks native patient WhatsApp automation and smart conversational booking bots'
    ],
    medical365Strengths: [
      'Comprehensive support for Dental, Maxillofacial, and 40+ general hospital specialties in one unified system',
      'Modern cloud platform accessible from Mac, iPad, Windows, or Chromebook without local server maintenance',
      'Integrated dental charting, periodontal charting, and DICOM dental X-ray/CBCT viewer',
      'Automated patient appointment recalls and treatment plan reminders via WhatsApp'
    ],
    pricingComparison: {
      medical365: 'Scalable cloud SaaS with dental, hospital, and multi-specialty modules included',
      competitor: 'Monthly support fee plus customer burden of local server hardware and backups'
    },
    features: [
      { name: 'Multi-Specialty & General Hospital Support', medical365: true, competitor: false, category: 'Clinical' },
      { name: 'Zero Local Server / Cloud-Native Access', medical365: true, competitor: false, category: 'Deployment' },
      { name: 'Integrated Periodontal & Dental Charting', medical365: true, competitor: true, category: 'Clinical' },
      { name: 'Native Cloud DICOM Imaging Viewer', medical365: true, competitor: 'Basic', category: 'Clinical' },
      { name: 'AI Treatment Plan Summarization', medical365: true, competitor: false, category: 'AI & Automation' },
      { name: 'Automated WhatsApp Recalls & Receipts', medical365: true, competitor: false, category: 'Integrations' }
    ],
    faq: [
      {
        question: 'Can dental clinics or dental departments in hospitals use Medical365?',
        answer: 'Yes! Medical365 offers complete tooth charting, perio charts, treatment planning, and digital imaging integration while unifying them with hospital billing and multi-specialty consults.'
      }
    ]
  }
];

// Helper to render check/cross badge
function renderFeatureBadge(val, isM365) {
  if (typeof val === 'boolean') {
    if (val) {
      return `<span class="cmp-badge-included">✓ Included</span>`;
    } else {
      return `<span class="cmp-badge-missing">✕ Missing</span>`;
    }
  }
  return `<span class="cmp-badge-partial">${val}</span>`;
}

// 1. Generate Hub Page (compare.html)
function generateHubPage() {
  const cardsHtml = competitors.map(c => `
    <a href="/medical365-vs-${c.slug}" class="cmp-card" data-name="${c.name.toLowerCase()}" data-category="${c.category.toLowerCase()}">
      <div>
        <div class="cmp-card-header">
          <span class="cmp-category-tag">${c.category}</span>
          <span class="cmp-ai-pill">AI-Ready</span>
        </div>
        <h3>Medical365 vs ${c.name}</h3>
        <p>${c.short_description}</p>
      </div>
      <div class="cmp-card-footer">
        <span class="cmp-cta-link">View Comparison &rarr;</span>
        <span class="cmp-card-tagline">Detailed Guide</span>
      </div>
    </a>
  `).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<!-- Clarity tracking code for https://www.medical365.in/ -->
<script>
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "ywggzyjc34");
</script>

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W5H82GQ7');</script>
<!-- End Google Tag Manager -->

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-RMGG2LX0RF"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-RMGG2LX0RF');
</script>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Medical365 vs Competitors (2026 Comparison Hub) | AI Hospital OS</title>
  <meta name="description" content="Compare Medical365 against 21 leading hospital and clinic management systems including Practo Ray, HealthPlix, MocDoc, Sparta HMS, Marg ERP, and more. See why healthcare organizations switch to our unified AI cloud platform.">
  <meta name="keywords" content="Medical365 vs Practo, Medical365 vs HealthPlix, hospital management system comparison, clinic software alternatives, best HMS India, healthcare CRM, cloud EHR">
  <link rel="canonical" href="https://www.medical365.in/compare">
  <link rel="icon" type="image/jpeg" href="medical365fav.jpg">

  <!-- Core Styles -->
  <link rel="stylesheet" href="global-styles.css?v=4.5">
  <link rel="stylesheet" href="redesign.css?v=1.2">
  <link rel="stylesheet" href="compare-styles.css?v=1.0">

  <!-- Open Graph -->
  <meta property="og:title" content="Medical365 vs Competitors | 2026 Healthcare Software Comparison Hub">
  <meta property="og:description" content="Detailed head-to-head comparison of Medical365 against 21 healthcare software solutions. Evaluate clinical features, AI scribing, and pricing.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.medical365.in/compare">
  <meta property="og:image" content="https://www.medical365.in/medical365logo1.png">
  <meta name="twitter:card" content="summary_large_image">

  <!-- JSON-LD Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.medical365.in/compare#webpage",
        "url": "https://www.medical365.in/compare",
        "name": "Medical365 Healthcare Software Comparison Hub",
        "description": "Comprehensive feature-by-feature evaluation of Medical365 against 21 hospital, clinic, and pharmacy management platforms.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.medical365.in/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Compare",
              "item": "https://www.medical365.in/compare"
            }
          ]
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "Medical365 Cloud Hospital OS",
        "operatingSystem": "Web, Cloud, Android, iOS",
        "applicationCategory": "HealthcareApplication, BusinessApplication",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "240"
        }
      }
    ]
  }
  </script>
</head>
<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W5H82GQ7"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

${masterHeader}

<main class="compare-page-wrapper">
  <!-- Breadcrumb -->
  <nav class="cmp-breadcrumb" aria-label="Breadcrumb">
    <a href="/">Home</a>
    <span class="cmp-breadcrumb-sep">&gt;</span>
    <span class="cmp-breadcrumb-current">Compare</span>
  </nav>

  <!-- Hero Section -->
  <section class="cmp-hero">
    <div class="cmp-badge">⚡ 2026 Competitive Benchmark Matrix</div>
    <h1>Medical365 vs The Healthcare Software Market</h1>
    <p class="cmp-hero-subtitle">
      Explore objective, feature-by-feature comparisons between Medical365's unified AI cloud hospital operating system and 21 leading legacy HMS, clinic EMR, and healthcare point solutions.
    </p>
    <div class="cmp-hero-actions">
      <a href="https://www.medical365.in/book-demo" class="cmp-btn-primary">Book Free Live Demo</a>
      <a href="tel:+917791910007" class="cmp-btn-secondary">Call Clinical Expert: +91 77919 10007</a>
    </div>
  </section>

  <!-- Interactive Search / Filter -->
  <div class="cmp-search-bar">
    <span class="cmp-search-icon">🔍</span>
    <input 
      type="text" 
      id="competitor-search" 
      class="cmp-search-input" 
      placeholder="Search 21 comparisons (e.g. Practo, HealthPlix, Marg ERP)..." 
      aria-label="Filter software comparisons"
    >
  </div>

  <!-- Comparison Grid -->
  <section class="comparison-grid" id="comparison-grid">
    ${cardsHtml}
  </section>

  <!-- No Results Message -->
  <div id="no-results" style="display: none; text-align: center; padding: 40px 20px; color: #64748B;">
    <p style="font-size: 16px; font-weight: 600;">No matching comparisons found.</p>
    <p style="font-size: 14px;">Try searching for another platform name or category.</p>
  </div>

  <!-- Migration FAQ -->
  <section class="cmp-faq-section" style="margin-top: 60px;">
    <h2>Frequently Asked Questions About Switching</h2>
    <div class="cmp-faq-grid">
      <div class="cmp-faq-card">
        <h3>How fast can we migrate data from our current software?</h3>
        <p>Medical365 offers automated ingestion pipelines for all 21 platforms above. Our technical concierge migrates patient demographics, past prescriptions, and billing masters with zero clinical downtime—typically in under 48 hours.</p>
      </div>
      <div class="cmp-faq-card">
        <h3>Do we need to buy local server hardware?</h3>
        <p>No. Medical365 is 100% cloud-native, eliminating expensive server capital expenditures, local maintenance fees, and risk of catastrophic hardware crashes.</p>
      </div>
      <div class="cmp-faq-card">
        <h3>Is Medical365 compliant with Indian healthcare regulations?</h3>
        <p>Yes. Medical365 is fully certified for Ayushman Bharat Digital Mission (ABDM) milestones M1, M2, and M3, and strictly complies with the DPDP Act 2023 and NABH guidelines.</p>
      </div>
      <div class="cmp-faq-card">
        <h3>Can our doctors try Medical365 before committing?</h3>
        <p>Yes. We provide a customized interactive sandbox demo tailored to your hospital or clinic specialty, allowing your clinical team to test our AI voice scribing and OPD speed firsthand.</p>
      </div>
    </div>
  </section>

  <!-- Bottom CTA Banner -->
  <section class="cmp-cta-banner">
    <div>
      <h3>Ready for an AI-Native Hospital OS?</h3>
      <p>Schedule a 30-minute personalized walkthrough and discover how Medical365 frees your doctors from paperwork while accelerating revenue collection.</p>
    </div>
    <div>
      <a href="https://www.medical365.in/book-demo" class="cmp-btn-primary" style="background: #fff; color: #0F766E;">
        Request Live Walkthrough
      </a>
    </div>
  </section>
</main>

${masterFooter}

<script src="global-scripts.js?v=4.8"></script>

<!-- Filter Script -->
<script>
  const searchInput = document.getElementById('competitor-search');
  const cards = document.querySelectorAll('.cmp-card');
  const noResults = document.getElementById('no-results');

  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const q = e.target.value.toLowerCase().trim();
      let visibleCount = 0;

      cards.forEach(card => {
        const name = card.getAttribute('data-name') || '';
        const cat = card.getAttribute('data-category') || '';
        const text = card.textContent.toLowerCase();

        if (name.includes(q) || cat.includes(q) || text.includes(q)) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      noResults.style.display = (visibleCount === 0) ? 'block' : 'none';
    });
  }
</script>
</body>
</html>`;
}

// 2. Generate Individual Competitor Page (medical365-vs-[slug].html)
function generateCompetitorPage(c) {
  const tableRows = c.features.map(f => `
    <tr>
      <td>
        <strong>${f.name}</strong>
        <span style="display: block; font-size: 11px; color: #64748B; text-transform: uppercase;">${f.category}</span>
      </td>
      <td class="m365-cell">${renderFeatureBadge(f.medical365, true)}</td>
      <td class="comp-cell">${renderFeatureBadge(f.competitor, false)}</td>
    </tr>
  `).join('\n');

  const weaknessesList = c.legacyWeaknesses.map(w => `<li>${w}</li>`).join('\n');
  const strengthsList = c.medical365Strengths.map(s => `<li>${s}</li>`).join('\n');
  const faqCards = c.faq.map(item => `
    <div class="cmp-faq-card">
      <h3>${item.question}</h3>
      <p>${item.answer}</p>
    </div>
  `).join('\n');

  const otherCompetitors = competitors
    .filter(other => other.slug !== c.slug)
    .slice(0, 6)
    .map(other => `
      <a href="/medical365-vs-${other.slug}" class="cmp-other-link">
        Medical365 vs ${other.name} &rarr;
      </a>
    `).join('\n');

  const pageTitle = `Medical365 vs ${c.name} (2026 Comparison & Review) | AI Hospital OS`;
  const metaDesc = `In-depth comparison of Medical365 vs ${c.name}. Compare AI clinical documentation, inpatient/outpatient EHR, WhatsApp automation, and pricing models.`;
  const canonicalUrl = `https://www.medical365.in/medical365-vs-${c.slug}`;

  // Structured Data Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        "url": canonicalUrl,
        "name": `Medical365 vs ${c.name} Software Comparison`,
        "description": c.short_description,
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.medical365.in/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Compare",
              "item": "https://www.medical365.in/compare"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": `Medical365 vs ${c.name}`,
              "item": canonicalUrl
            }
          ]
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "Medical365 Cloud Hospital OS",
        "applicationCategory": "HealthcareApplication, BusinessApplication",
        "operatingSystem": "Web, Cloud, Android, iOS",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "240"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": c.faq.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
<!-- Clarity tracking code for https://www.medical365.in/ -->
<script>
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "ywggzyjc34");
</script>

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W5H82GQ7');</script>
<!-- End Google Tag Manager -->

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-RMGG2LX0RF"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-RMGG2LX0RF');
</script>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
  <meta name="description" content="${metaDesc}">
  <meta name="keywords" content="Medical365 vs ${c.name}, ${c.name} alternative, ${c.name} competitors, ${c.name} review, hospital management system, healthcare software">
  <link rel="canonical" href="${canonicalUrl}">
  <link rel="icon" type="image/jpeg" href="medical365fav.jpg">

  <!-- Core Styles -->
  <link rel="stylesheet" href="global-styles.css?v=4.5">
  <link rel="stylesheet" href="redesign.css?v=1.2">
  <link rel="stylesheet" href="compare-styles.css?v=1.0">

  <!-- Open Graph -->
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="${metaDesc}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="https://www.medical365.in/medical365logo1.png">
  <meta name="twitter:card" content="summary_large_image">

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  ${JSON.stringify(jsonLd, null, 2)}
  </script>
</head>
<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W5H82GQ7"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

${masterHeader}

<main class="compare-page-wrapper">
  <!-- Breadcrumb -->
  <nav class="cmp-breadcrumb" aria-label="Breadcrumb">
    <a href="/">Home</a>
    <span class="cmp-breadcrumb-sep">&gt;</span>
    <a href="/compare">Compare</a>
    <span class="cmp-breadcrumb-sep">&gt;</span>
    <span class="cmp-breadcrumb-current">Medical365 vs ${c.name}</span>
  </nav>

  <!-- Hero Section -->
  <section class="cmp-hero">
    <div class="cmp-badge">🏆 2026 Head-to-Head Architectural Evaluation</div>
    <h1>Medical365 vs ${c.name}</h1>
    <p style="font-weight: 700; color: #0D9488; font-size: 18px; margin-bottom: 12px;">
      ${c.tagline}
    </p>
    <p class="cmp-hero-subtitle">
      ${c.short_description}
    </p>
    <div class="cmp-hero-actions">
      <a href="https://www.medical365.in/book-demo" class="cmp-btn-primary">Book Free Demo</a>
      <a href="tel:+917791910007" class="cmp-btn-secondary">Speak With a Migration Specialist</a>
    </div>
  </section>

  <!-- Executive Verdict Box -->
  <section class="cmp-verdict-box">
    <div class="cmp-verdict-title">
      <span>★</span> Executive Comparison Verdict
    </div>
    <div class="cmp-verdict-text">
      ${c.contrastHighlight}
    </div>
    <div class="cmp-verdict-grid">
      <div class="cmp-verdict-col">
        <h4>When to Consider ${c.name}</h4>
        <p>Best suited for single-purpose setups requiring standard ${c.category.toLowerCase()} without demand for unified inpatient beds, AI clinical documentation, or multi-department hospital billing.</p>
      </div>
      <div class="cmp-verdict-col highlight">
        <h4>Why Healthcare Leaders Switch to Medical365</h4>
        <p>Engineered for high-growth clinics and hospitals seeking autonomous voice EHR, native WhatsApp patient engagement, integrated pharmacy and lab, and zero server maintenance.</p>
      </div>
    </div>
  </section>

  <!-- Feature Matrix Table -->
  <section>
    <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 8px; text-align: center;">
      Side-by-Side Capability Matrix
    </h2>
    <p style="font-size: 14px; color: #64748B; text-align: center; margin-bottom: 24px;">
      A direct comparison of core clinical, operational, and technological capabilities.
    </p>

    <div class="cmp-table-container">
      <table class="cmp-table">
        <thead>
          <tr>
            <th>Module / Clinical Capability</th>
            <th class="m365-col">Medical365 (AI Cloud)</th>
            <th class="comp-col">${c.name}</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>
  </section>

  <!-- Split Pros & Cons -->
  <section class="cmp-split-section">
    <div class="cmp-split-card weaknesses">
      <div class="cmp-split-header">
        <span>⚠️</span> Reported Limitations of ${c.name}
      </div>
      <ul class="cmp-list">
        ${weaknessesList}
      </ul>
    </div>

    <div class="cmp-split-card strengths">
      <div class="cmp-split-header">
        <span>⚡</span> The Medical365 Advantage
      </div>
      <ul class="cmp-list">
        ${strengthsList}
      </ul>
    </div>
  </section>

  <!-- TCO & Pricing Box -->
  <section class="cmp-tco-box">
    <div class="cmp-tco-title">
      <span>💰</span> Total Cost of Ownership (TCO) & Pricing Comparison
    </div>
    <div class="cmp-tco-grid">
      <div class="cmp-tco-item">
        <strong style="color: #0D9488;">Medical365:</strong>
        ${c.pricingComparison.medical365}
      </div>
      <div class="cmp-tco-item">
        <strong style="color: #334155;">${c.name}:</strong>
        ${c.pricingComparison.competitor}
      </div>
    </div>
  </section>

  <!-- 3-Step Migration Roadmap -->
  <section class="cmp-steps-section">
    <h2>Switching from ${c.name} in 3 Simple Steps</h2>
    <p class="cmp-steps-sub">
      Our dedicated onboarding engineers ensure a smooth, zero-downtime transition without disrupting daily patient consultations.
    </p>
    <div class="cmp-steps-grid">
      <div class="cmp-step-card">
        <div class="cmp-step-number">1</div>
        <h4>Automated Data Export</h4>
        <p>We extract your patient rosters, treatment notes, drug inventories, and billing archives from ${c.name} securely.</p>
      </div>
      <div class="cmp-step-card">
        <div class="cmp-step-number">2</div>
        <h4>Custom Department Tuning</h4>
        <p>We configure your OPD queues, triage rules, WhatsApp templates, and conduct rapid 30-minute doctor and staff walkthroughs.</p>
      </div>
      <div class="cmp-step-card">
        <div class="cmp-step-number">3</div>
        <h4>Zero-Downtime Go-Live</h4>
        <p>Cut over seamlessly with our senior clinical deployment specialist actively supporting your front-desk and doctors live.</p>
      </div>
    </div>
  </section>

  <!-- Competitor FAQ -->
  <section class="cmp-faq-section">
    <h2>Frequently Asked Questions: Medical365 vs ${c.name}</h2>
    <div class="cmp-faq-grid">
      ${faqCards}
    </div>
  </section>

  <!-- Bottom CTA Banner -->
  <section class="cmp-cta-banner">
    <div>
      <h3>Ready to Modernize Past ${c.name}?</h3>
      <p>Book a confidential 30-minute consultation to see how Medical365 can transform your hospital workflow with intelligent AI automation.</p>
    </div>
    <div>
      <a href="https://www.medical365.in/book-demo" class="cmp-btn-primary" style="background: #fff; color: #0F766E;">
        Book Free Demonstration
      </a>
    </div>
  </section>

  <!-- Related Comparisons -->
  <section class="cmp-others-section">
    <div class="cmp-others-header">
      <h3>Compare Medical365 Against Other Software</h3>
      <a href="/compare" style="font-size: 13px; font-weight: 700; color: #0D9488; text-decoration: none;">View All 21 Comparisons &rarr;</a>
    </div>
    <div class="cmp-others-grid">
      ${otherCompetitors}
    </div>
  </section>
</main>

${masterFooter}

<script src="global-scripts.js?v=4.8"></script>
</body>
</html>`;
}

// Write files
console.log('Writing compare.html...');
fs.writeFileSync(path.join(dirPath, 'compare.html'), generateHubPage(), 'utf8');

// Ensure compare directory exists and write compare/index.html
const compareDir = path.join(dirPath, 'compare');
if (!fs.existsSync(compareDir)) {
  fs.mkdirSync(compareDir, { recursive: true });
}
fs.writeFileSync(path.join(compareDir, 'index.html'), generateHubPage(), 'utf8');

let count = 0;
competitors.forEach(c => {
  const pageHtml = generateCompetitorPage(c);
  
  // Write to root: medical365-vs-[slug].html
  fs.writeFileSync(path.join(dirPath, `medical365-vs-${c.slug}.html`), pageHtml, 'utf8');

  // Also write to compare/medical365-vs-[slug].html so /compare/medical365-vs-[slug] resolves directly
  fs.writeFileSync(path.join(compareDir, `medical365-vs-${c.slug}.html`), pageHtml, 'utf8');

  count++;
});

console.log(`Successfully generated compare.html and ${count} competitor comparison pages in both root and compare/ directories!`);

