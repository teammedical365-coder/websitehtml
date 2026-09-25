const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const diagramDir = path.join(repoRoot, 'images/diagrams');

console.log('=== GENERATING BATCH 1B: REMAINING 4 ORTHOPEDICS PAGES ===');

const remaining4Data = {
    "joint-mobility-tracking": {
        cluster: "ORTHOPEDICS",
        title: "Joint Mobility Tracking Software | Range of Motion ROM EMR | Medical365",
        h1: "Joint Mobility & Range of Motion (ROM) Tracking Software",
        metaDesc: "Medical365 joint mobility tracking software documents goniometric range of motion, post-arthroplasty recovery & joint stiffness in hospital EMR. ABDM compliant.",
        diagramTitle: "Orthopedic Goniometric Joint Mobility & ROM Recovery Pipeline",
        nodes: ["Orthopedic Goniometric Exam", "Digital ROM Angle Capture", "Longitudinal Recovery Engine", "Orthopedic Surgeon Assessment", "Rehabilitation & Physio Sync"],
        color: "#d97706",
        quickAnswer: "Joint mobility tracking software is a specialized clinical orthopedic assessment module that digitally records and visualizes joint range of motion (ROM) in degrees. It logs active and passive flexion, extension, abduction, adduction, and rotation angles across pre-operative baselines and post-operative recovery visits following total knee arthroplasty (TKA), hip replacement, ligament reconstructions, or traumatic joint injuries.",
        bgText: "Restoring functional joint mobility is the primary therapeutic goal of orthopedic surgery and musculoskeletal rehabilitation. In Indian orthopedic clinics and specialty arthroplasty hospitals, orthopedic surgeons evaluate hundreds of patients recovering from total joint replacements, ACL reconstructions, and shoulder rotator cuff repairs each month.\n\nIn conventional practice, documenting joint range of motion is frequently reduced to rough visual estimates hastily scribbled in paper notes (e.g. 'knee flexion ~90°'). These subjective estimates lack consistency between examiners, obscure subtle plateaus in post-operative recovery, and fail to provide patients with objective visual feedback to motivate compliance with painful rehabilitation protocols.\n\nMedical365's Joint Mobility Tracking module standardizes goniometric assessment across all major peripheral joints (knee, hip, shoulder, elbow, wrist, ankle). By graphing degree-by-degree functional milestones against expected clinical recovery curves, the software alerts surgeons to early arthrofibrosis, monitors flexion contractures, and provides objective evidence of surgical efficacy.",
        capabilities: [
            { title: "Standardized Multi-Joint Goniometric Charting", text: "Interactive visual pickers to document active and passive range of motion (in degrees) for Knee, Hip, Shoulder, Elbow, Ankle, and Cervical/Lumbar spine with anatomical neutral-zero method (SFTR)." },
            { title: "Longitudinal Post-Arthroplasty Recovery Curves", text: "Plots post-total knee (TKA) and post-total hip (THA) flexion and extension recovery curves against standard normative benchmarks at 2 weeks, 6 weeks, 3 months, and 1 year." },
            { title: "Flexion Contracture & Extensor Lag Logging", text: "Dedicated fields to document fixed flexion deformities (FFD) and extensor lags, helping surgeons monitor quad strength deficits and identify persistent contractures early." },
            { title: "Patient-Reported Outcome Measures (PROMs)", text: "Integrates validated functional scorecards including Knee Society Score (KSS), Oxford Knee Score, Harris Hip Score (HHS), and QuickDASH shoulder disability indices." },
            { title: "Visual Patient Motivation Graphs", text: "Generates clear, color-coded recovery graphs that surgeons can show to patients to illustrate weekly degree gains and celebrate rehabilitation milestones." },
            { title: "Seamless Physiotherapy Interoperability", text: "Synchronizes range of motion measurements bidirectionally between the operating orthopedic surgeon and the in-hospital or outpatient physiotherapy rehabilitation team." }
        ],
        workflowSteps: [
            { step: "Baseline Pre-Op Goniometry", desc: "Pre-operative active and passive range of motion, fixed deformities, and baseline PROMs are recorded." },
            { step: "Post-Operative Milestone Logging", desc: "At day-1 post-op, bedside goniometric angles (passive extension and assisted flexion) are logged into EMR." },
            { step: "Outpatient Review & Trend Comparison", desc: "At 2-week, 6-week, and 3-month clinic visits, degree gains are compared against expected recovery trajectories." },
            { step: "Complication Alert & Intervention", desc: "If knee flexion stalls below 90° at 6 weeks, software flags potential arthrofibrosis, alerting surgeon for manipulation." },
            { step: "Functional Recovery Documentation", desc: "Final range of motion, return-to-activity clearance, and terminal PROMs score are documented in surgical record." }
        ],
        compliance: "Medical365 Joint Mobility Tracking adheres to the American Academy of Orthopaedic Surgeons (AAOS) clinical measurement standards and the Indian Orthopaedic Association (IOA) rehabilitation guidelines.\n\nAll clinical goniometric records and patient-reported outcome measures are stored under AES-256 encryption compliant with the DPDP Act 2023. Standardized FHIR observation resources link mobility metrics to the patient's Ayushman Bharat Health Account (ABHA).",
        table: [
            { feature: "Measurement Method", manual: "Subjective visual guesswork or inconsistent paper goniometer notes", m365: "Standardized Neutral-Zero (SFTR) digital goniometric angle logging" },
            { feature: "Progress Tracking", manual: "Flipping through paper pages trying to decipher past flexion degrees", m365: "Interactive visual recovery curve showing degree progression over time" },
            { feature: "Arthrofibrosis Detection", manual: "Often identified late when joint stiffness has already become fixed", m365: "Automated alert if expected milestone angles stall across visits" },
            { feature: "Functional Scoring", manual: "Rarely calculated due to time-consuming paper scorecards", m365: "1-click automated calculation of Knee Society Score & Harris Hip Score" },
            { feature: "Physiotherapy Sync", manual: "Verbal instructions or paper slips carried back and forth by patient", m365: "Instant digital synchronization with hospital physiotherapy records" }
        ],
        faqs: [
            { q: "What is the Neutral-Zero method used in the software?", a: "The Neutral-Zero (SFTR) method is the international standard for orthopedic joint measurement, where all movements are measured from a defined anatomical zero position. Medical365 incorporates this standard to ensure measurement reproducibility across different examiners." },
            { q: "Can the software calculate Knee Society Scores (KSS) automatically?", a: "Yes. Surgeons or clinical assistants can complete the digital Knee Society Score questionnaire in under 60 seconds; the software computes both the Objective Knee Score and Functional Knee Score automatically." },
            { q: "How does the system alert surgeons to poor post-operative progress?", a: "If a post-TKA patient fails to achieve 90° flexion by the 6-week milestone or exhibits worsening extensor lag, the software highlights the metric in amber and suggests a review for manipulation under anesthesia (MUA)." },
            { q: "Does the module track upper extremity joints (shoulder, elbow)?", a: "Yes. Full rotational and angular measurement sets are included for shoulder forward flexion, abduction, external/internal rotation, and elbow flexion/extension." },
            { q: "Can patients view their range of motion progress graphs at home?", a: "Yes. Patients can access their interactive mobility progress graphs on the Medical365 patient app, providing visual encouragement during home exercise routines." },
            { q: "Can physiotherapy staff enter daily exercise angles into the same chart?", a: "Yes. Authorized physical therapists can log daily or weekly goniometric angles directly into the rehabilitation section of the unified patient chart." }
        ]
    },

    "implant-records": {
        cluster: "ORTHOPEDICS",
        title: "Orthopedic Implant Tracking Software | Prosthesis Registry | Medical365",
        h1: "Orthopedic Implant Tracking & Surgical Prosthesis Registry",
        metaDesc: "Medical365 orthopedic implant tracking software scans barcodes, logs serial numbers & maintains 100% NABH-compliant prosthesis registries for Indian hospitals.",
        diagramTitle: "Orthopedic Implant Traceability & NABH Registry Architecture",
        nodes: ["Sterile Field Barcode Scan", "Implant Verification & Lot Parsing", "NABH Surgical Implant Register", "Operative Discharge Summary", "Recall Alert & Patient Card"],
        color: "#d97706",
        quickAnswer: "Orthopedic implant tracking software is a specialized surgical registry and traceability module that manages prosthetic joints (knees, hips, shoulders), trauma fixation plates, intramedullary nails, screws, and biologics. It captures barcode labels at the sterile field, verifies manufacturer lot and serial numbers, maintains an audit-ready NABH implant register, and auto-generates digital patient implant cards.",
        bgText: "Modern orthopedic surgery relies extensively on permanent surgical implants. Total joint arthroplasties, spinal instrumentation, and complex trauma fixations permanently place specialized titanium, cobalt-chromium alloys, and ultra-high-molecular-weight polyethylene prosthetics inside patients' bodies.\n\nEnsuring absolute traceability of these high-value medical devices is both an ethical necessity and a stringent regulatory mandate. In many Indian hospital operation theaters, implant documentation has traditionally involved nurses peeling sticky paper barcode labels from sterile boxes and pasting them into paper registers or physical charts. Over time, paper registers suffer from ink degradation, labels detach and get lost, and finding which patient received a specific lot number during a manufacturer recall can take weeks of manual archive searching.\n\nMedical365's Orthopedic Implant Tracking module digitizes surgical device governance from the sterile field to long-term patient follow-up. Using integrated 2D barcode and QR scanners, operating theater nurses scan implant boxes in seconds, automatically capturing manufacturer name, catalog model, diameter, length, lot number, serial number, and expiration date. The data immediately binds to the patient's permanent operative record, the hospital's central NABH implant register, and hospital billing.",
        capabilities: [
            { title: "Sterile Field Barcode & 2D DataMatrix Scanning", text: "Instantly captures surgical implant specifications directly from manufacturer packaging barcodes (Stryker, DePuy Synthes, Zimmer Biomet, Smith & Nephew, Meril Life Sciences), eliminating manual typing errors." },
            { title: "Audit-Ready NABH & Joint Registry Compliance", text: "Maintains an automated, searchable hospital-wide implant register compliant with NABH 5th Edition standards, recording patient UHID, surgery date, operating surgeon, implant site, and serial numbers." },
            { title: "Component Matching & Compatibility Verification", text: "Cross-checks modular components during surgery (e.g. verifying femoral head taper matches the femoral stem sleeve, and acetabular liner diameter matches the shell) to prevent intra-operative mismatch errors." },
            { title: "Automated Device Recall & Vigilance Engine", text: "Enables hospital administrators to query any recalled batch or serial number in seconds, instantly listing every patient implanted with that lot and their clinical contact details." },
            { title: "Digital Patient Implant Passport / Card", text: "Auto-generates a standardized patient implant card detailing prosthetic models, materials, MRI compatibility, and surgeon details accessible on the patient's mobile phone." },
            { title: "Automated Pharmacy & Billing Reconciliation", text: "Transfers consumed implants directly to inpatient billing and central inventory, preventing unbilled consignment discrepancies and ensuring transparent pricing." }
        ],
        workflowSteps: [
            { step: "Consignment Receipt & Verification", desc: "Implant sets delivered to hospital OT pharmacy are verified against purchase order and lot expiration dates." },
            { step: "Intra-Operative Sterile Scanning", desc: "Circulating nurse scans 2D barcode on sterile blister pack before opening; software confirms size and validity." },
            { step: "Compatibility & Expiry Check", desc: "System verifies component compatibility (e.g. head diameter to liner) and alerts if device is expired." },
            { step: "Operative Record & Registry Binding", desc: "All deployed components permanently bind to surgeon operative note, NABH register, and patient chart." },
            { step: "Billing Transfer & Patient Passport", desc: "Consumed items charge to inpatient bill and a digital implant passport is generated for the patient." }
        ],
        compliance: "Medical365 Orthopedic Implant Tracking strictly enforces the surgical traceability and medical device vigilance requirements established by the Central Drugs Standard Control Organisation (CDSCO), National Pharmaceutical Pricing Authority (NPPA), and NABH.\n\nThe software records unique device identification (UDI) codes in compliance with international FDA and IMDRF standards. All patient and device records are encrypted under AES-256 compliant with the DPDP Act 2023, and implant summaries synchronize seamlessly with the Ayushman Bharat Digital Mission (ABDM).",
        table: [
            { feature: "Implant Data Capture", manual: "Peeling paper barcode stickers and taping into paper register books", m365: "Digital 2D barcode scanner capture directly into electronic registry" },
            { feature: "Recall Traceability", manual: "Weeks spent manually searching physical storage rooms and paper files", m365: "1-second query identifying every affected patient by lot number" },
            { feature: "NABH Audit Readiness", manual: "Laborious manual compilation of implant registers before inspections", m365: "Always audit-ready searchable register with 1-click export to Excel/PDF" },
            { feature: "Component Matching", manual: "Manual verbal confirmation between scrub nurse and surgeon", m365: "Automated verification confirming taper and liner compatibility" },
            { feature: "Patient Implant Card", manual: "Handwritten paper card easily lost or forgotten by patient", m365: "Tamper-proof digital implant passport stored on patient mobile app" }
        ],
        faqs: [
            { q: "Which implant manufacturers are supported by the barcode scanner?", a: "Medical365 supports all major international and domestic orthopedic implant manufacturers, including Stryker, DePuy Synthes (Johnson & Johnson), Zimmer Biomet, Smith & Nephew, Meril Life Sciences, Biorad Medisys, and Ortho Care." },
            { q: "How does the system ensure compliance with NPPA orthopedic implant pricing rules?", a: "The software maintains pre-configured catalog pricing adhering to NPPA ceiling limits for primary knee replacement components, ensuring transparent itemized billing during discharge." },
            { q: "Can the system prevent expired implants from being opened?", a: "Yes. When an implant barcode is scanned, the software checks the embedded expiration date; if the device is past its sterilization expiry, a prominent red warning stops deployment." },
            { q: "Does the module support trauma plates and screws?", a: "Yes. Beyond total joint prosthetics, the module tracks trauma fixation hardware, including locking compression plates (LCP), intramedullary nails, cannulated screws, and bioabsorbable interference screws." },
            { q: "How does the patient prove they have an orthopedic implant at airport security?", a: "Patients can present their official Medical365 Digital Implant Passport on their smartphone, displaying the hospital seal, surgical date, titanium/alloy materials, and operating surgeon credentials." },
            { q: "Is the implant register accessible during hospital NABH accreditation inspections?", a: "Yes. The NABH implant register dashboard allows quality managers to filter by date range, surgical department, or surgeon, generating complete traceability audit reports in seconds." }
        ]
    },

    "physiotherapy-notes": {
        cluster: "ORTHOPEDICS",
        title: "Physiotherapy Clinical Documentation Software | PT Rehab EMR | Medical365",
        h1: "Physiotherapy & Rehabilitation Clinical Documentation Software",
        metaDesc: "Medical365 physiotherapy documentation software manages MMT muscle grading, VAS pain scores, exercise regimens & session billing for Indian clinics.",
        diagramTitle: "Physiotherapy Assessment & Session Treatment Workflow",
        nodes: ["Initial PT Assessment", "VAS Pain & MMT Grading", "Exercise Prescription Plan", "Daily Rehab Progress Notes", "Discharge & Functional Review"],
        color: "#d97706",
        quickAnswer: "Physiotherapy clinical documentation software is a specialized physical therapy and rehabilitation EMR module designed for physiotherapists and rehab centers. It captures initial functional assessments, Visual Analog Scale (VAS) pain ratings, Manual Muscle Testing (MMT) grades, posture analysis, customized home exercise prescriptions, daily session progress notes, and multi-session package billing.",
        bgText: "Physical rehabilitation is an essential pillar of orthopedic recovery, neurological restoration, and sports medicine. In Indian physical therapy clinics, hospital rehabilitation departments, and pain management centers, physiotherapists treat high patient volumes presenting with post-surgical stiffness, chronic low back pain, cervical spondylosis, stroke hemiparesis, and sports ligament injuries.\n\nDespite its clinical importance, physiotherapy documentation has historically suffered from fragmented paper logbooks, lack of objective functional scoring, and informal session tracking. Physical therapists often record little more than 'IFT + exercise given', omitting critical baseline metrics such as Visual Analog Scale (VAS) pain intensity, Oxford manual muscle power grades (0-5), or postural dysfunctions. This creates communication gaps with referring orthopedic surgeons and leads to billing leakage when session packages expire without renewal.\n\nMedical365's Physiotherapy Documentation module equips therapists with standardized digital evaluation templates, objective functional scoring tools, visual exercise prescription builders, and session package tracking. The software seamlessly connects physiotherapy progress notes with the referring doctor's EMR chart, ensuring transparent clinical collaboration and measurable patient recovery.",
        capabilities: [
            { title: "Standardized Initial Rehabilitation Assessment", text: "Structures initial evaluation: chief complaints, pain mapping on an anatomical body chart, aggravating/relieving factors, palpation tenderness, and postural alignment analysis." },
            { title: "Objective MMT Muscle Power Grading", text: "1-click documentation of Medical Research Council (MRC) Manual Muscle Testing grades (0 to 5) across key muscle groups for upper and lower extremities." },
            { title: "VAS & NPRS Pain Intensity Tracking", text: "Monitors Visual Analog Scale (VAS 0-10) and Numeric Pain Rating Scale (NPRS) scores across every treatment session to objectively prove pain reduction." },
            { title: "Visual Exercise Prescription Builder", text: "Enables therapists to prescribe customized exercise regimens (sets, reps, hold time, frequency) with linked illustrated exercise diagrams that patients can view on their mobile phones." },
            { title: "Electrotherapy & Modality Treatment Logging", text: "Logs physical therapy modalities: IFT, TENS, Ultrasound (US), Traction (cervical/lumbar), Short Wave Diathermy (SWD), and Dry Needling with dosage parameters." },
            { title: "Rehabilitation Package Billing & Session Countdown", text: "Tracks multi-session therapy packages (e.g., 10-session post-op rehab), decrementing sessions automatically at check-in and alerting reception when package renewal is due." }
        ],
        workflowSteps: [
            { step: "Referral & Initial Assessment", desc: "Patient arrives via orthopedic referral or direct walk-in; therapist performs baseline evaluation and pain mapping." },
            { step: "Therapy Protocol Formulation", desc: "Therapist defines treatment goals, prescribes electrotherapy modalities, and builds custom exercise regimen." },
            { step: "Session Check-In & Countdown", desc: "Receptionist or therapist logs session attendance; digital countdown tracks remaining package visits." },
            { step: "Daily Session Progress Note", desc: "Therapist records pre-session VAS pain, modalities applied, exercise compliance, and immediate post-session response." },
            { step: "Re-Evaluation & Orthopedic Report", desc: "At session 10, software generates a progress summary comparing baseline vs. current MMT and pain scores for the surgeon." }
        ],
        compliance: "Medical365 Physiotherapy Documentation complies with the Indian Association of Physiotherapists (IAP) clinical standards and the National Accreditation Board for Hospitals & Healthcare Providers (NABH) rehabilitation criteria.\n\nAll clinical evaluation sheets, treatment logs, and progress graphs are archived under AES-256 encryption compliant with the DPDP Act 2023. Rehabilitation summary reports integrate directly into the national Ayushman Bharat Digital Mission (ABDM) health record.",
        table: [
            { feature: "Progress Documentation", manual: "Informal register books with brief entries like 'IFT + exercise done'", m365: "Objective session notes with VAS pain scale, MMT grades, and modality parameters" },
            { feature: "Exercise Prescription", manual: "Verbal instructions or rough hand drawings on scrap paper", m365: "Illustrated digital exercise prescriptions with sets, reps, and video links" },
            { feature: "Session Package Tracking", manual: "Paper attendance cards easily lost or disputed by patients", m365: "Automated digital session decrementing with automated renewal reminders" },
            { feature: "Doctor-Therapist Communication", manual: "Disconnected; orthopedic surgeon rarely sees physiotherapy notes", m365: "Real-time visibility of therapy progress directly inside orthopedic EMR" },
            { feature: "Functional Scoring", manual: "Rarely performed due to time constraints and missing templates", m365: "Automated scorecards for Neck Disability Index (NDI), ODI, and DASH" }
        ],
        faqs: [
            { q: "Can physiotherapists prescribe home exercise programs with pictures?", a: "Yes. Medical365 includes a library of illustrated rehabilitation exercises. Therapists can select exercises, customize repetitions and hold times, and send an illustrated exercise program directly to the patient's WhatsApp." },
            { q: "How does the session package tracking prevent billing disputes?", a: "Each time a patient checks in for a session, the system decrements the package balance and sends an automated SMS/WhatsApp confirmation (e.g. 'Session 4 of 10 completed. 6 sessions remaining')." },
            { q: "Does the module support specialized neurological rehabilitation documentation?", a: "Yes. Specialized templates are provided for stroke rehabilitation, spinal cord injuries, and cerebral palsy, including Modified Ashworth Spasticity scale and Berg Balance Scale." },
            { q: "Can orthopedic surgeons view physiotherapy notes from their consultation room?", a: "Yes. Because Medical365 is a unified hospital platform, the orthopedic surgeon can click into the patient's chart and immediately review the physiotherapist's notes and pain reduction graphs." },
            { q: "Are standard electrotherapy modality settings pre-configured?", a: "Yes. Quick pickers allow therapists to log frequency, pulse width, intensity, and electrode placement for IFT, TENS, Ultrasound, and Class 4 laser therapy in seconds." },
            { q: "Can physical therapists use the software on mobile tablets during treatments?", a: "Yes. The interface is optimized for iPads and Android tablets, allowing therapists to document assessments, record VAS scores, and demonstrate exercise diagrams right at the treatment bed." }
        ]
    },

    "surgery-planning": {
        cluster: "ORTHOPEDICS",
        title: "Orthopedic Surgery Planning Software | OT Scheduling EMR | Medical365",
        h1: "Orthopedic Surgical Planning & Operation Theater Scheduling Software",
        metaDesc: "Medical365 orthopedic surgery planning software manages pre-op templating, implant requisitions, WHO safety checklists & OT booking for Indian hospitals.",
        diagramTitle: "Orthopedic Pre-Operative Planning & OT Execution Architecture",
        nodes: ["Pre-Operative Surgical Plan", "Implant & Consumable Requisition", "PAC & High-Risk Clearance", "WHO Surgical Safety Checklist", "Operative Note & Post-Op Plan"],
        color: "#d97706",
        quickAnswer: "Orthopedic surgery planning software is a comprehensive pre-operative workflow and operation theater (OT) coordination module. It structures orthopedic surgical plans, manages pre-anesthesia check-up (PAC) clearances, generates sterile implant and consumable requisitions for the OT pharmacy, coordinates surgery room scheduling, and enforces the digital WHO Surgical Safety Checklist.",
        bgText: "Orthopedic surgical procedures—from complex multi-level spinal fusions and revision total joint replacements to arthroscopic reconstructions and trauma emergency fixations—require meticulous pre-operative preparation. The success of an orthopedic operation depends not only on surgical technique but also on flawless logistical coordination.\n\nIn conventional hospital setups, surgical planning is frequently plagued by fragmented communication between the surgeon's OPD chamber, the pre-anesthetic check-up (PAC) clinic, the OT booking desk, and the surgical implant vendor. When implant requisitions are written on informal paper chits, critical sizes or specialized instrumentation (e.g. revision stems, drill bits, high-speed burrs) may be missing when the sterile field is opened, leading to costly delays, prolonged anesthesia times, or cancelled surgeries.\n\nMedical365's Orthopedic Surgical Planning module integrates surgical scheduling, clinical risk clearance, implant ordering, and intra-operative safety into a unified digital pipeline. Surgeons document intended procedures, required hardware specifications, and position requirements with 1-click order sets that simultaneously alert the OT manager, nursing supervisor, and central sterile supply department (CSSD).",
        capabilities: [
            { title: "Structured Pre-Operative Surgical Planning", text: "Documents proposed surgical procedure, ICD-10 and CPT codes, surgical approach (e.g. subvastus vs. medial parapatellar), patient positioning, and tourniquet pressure/time parameters." },
            { title: "Automated Implant & Instrument Requisitions", text: "Generates electronic equipment indents specifying prosthetic brand, expected sizes, bone cement type (antibiotic-loaded), saw blades, and specialized power tools, alerting the OT pharmacy instantly." },
            { title: "Pre-Anesthetic Check-up (PAC) Digital Sign-Off", text: "Integrates complete PAC clearance documentation: ASA physical status grade (I through V), airway Mallampati score, spine evaluation, baseline cardiac clearance, and NPO instructions." },
            { title: "Digital WHO Surgical Safety Checklist", text: "Enforces mandatory digital execution of the WHO Surgical Safety Checklist at 'Sign In' (before anesthesia), 'Time Out' (before incision), and 'Sign Out' (before leaving OT) with timestamped nurse verification." },
            { title: "Interactive OT Calendar & Room Booking", text: "Visual operation theater booking board that coordinates surgeon schedules, room allocation, turnover and sterilization buffers, and emergency add-on case prioritization." },
            { title: "Structured Operative Notes & Post-Op Protocol", text: "Auto-generates standardized orthopedic operative summaries with intra-operative findings, blood loss estimates, tourniquet duration, drain outputs, and post-op DVT prophylaxis orders." }
        ],
        workflowSteps: [
            { step: "Surgical Indication & Plan", desc: "Surgeon confirms surgery indication in OPD, documents approach, and specifies implant sizes and specialized instruments." },
            { step: "PAC & Medical Clearance", desc: "Anesthesiologist conducts PAC, evaluates airway, confirms NPO status, and signs off ASA risk classification in EMR." },
            { step: "OT Scheduling & Hardware Verification", desc: "OT manager schedules room; central pharmacy confirms implant sets and sterile loaner kits are on-site." },
            { step: "Intra-Op WHO Safety Checklist", desc: "Surgical team executes Sign In, Time Out, and Sign Out checklists on sterile OT wall monitor." },
            { step: "Operative Report & Post-Op Handoff", desc: "Surgeon completes structured operative note; post-op recovery orders and ICU/ward handoff instructions auto-populate." }
        ],
        compliance: "Medical365 Orthopedic Surgical Planning strictly complies with the National Accreditation Board for Hospitals & Healthcare Providers (NABH) surgical safety standards and the World Health Organization (WHO) Guidelines for Safe Surgery.\n\nAll surgical bookings, consent verifications, PAC clearances, and surgical safety checklists are recorded in immutable, timestamped digital logs protected by AES-256 encryption under the DPDP Act 2023. Operative summaries and discharge care plans integrate into the Ayushman Bharat Digital Mission (ABDM) national health locker.",
        table: [
            { feature: "Implant Requisitions", manual: "Paper chits or WhatsApp messages prone to lost sizes or missing tools", m365: "Structured digital indent specifying exact sizes, cement, and power tools" },
            { feature: "PAC Clearance Tracking", manual: "Paper PAC slip carried by patient; often missing on surgery morning", m365: "Instant visibility of anesthesiologist PAC clearance directly in OT schedule" },
            { feature: "WHO Safety Checklist", manual: "Paper checklist ticked hastily after surgery without real-time verification", m365: "Mandatory interactive digital checklist completed at Sign In, Time Out & Sign Out" },
            { feature: "OT Room Utilization", manual: "Whiteboard scheduling with frequent room double-bookings and idle time", m365: "Visual digital OT calendar optimizing room turnover and surgeon schedules" },
            { feature: "Operative Documentation", manual: "Handwritten operative notes completed hours or days post-surgery", m365: "Structured template completed in 2 minutes in OT control room with 1 click" }
        ],
        faqs: [
            { q: "How does the software prevent surgery cancellations due to missing implants?", a: "When a surgeon schedules a procedure, Medical365 generates an automated implant checklist that must be acknowledged by the OT pharmacy and device vendor 24 hours prior to surgery, preventing last-minute missing hardware." },
            { q: "Is the digital WHO Surgical Safety Checklist mandatory before incision?", a: "Yes. The system can be configured so that intra-operative documentation cannot proceed without recording the timestamped 'Time Out' verification (confirming patient identity, site marking, and antibiotic timing)." },
            { q: "Does the module track tourniquet pressure and inflation times?", a: "Yes. Dedicated safety fields log limb tourniquet pressure (mmHg), inflation start time, deflation time, and total ischemia duration, alerting nursing staff if inflation exceeds 90 minutes." },
            { q: "Can anesthetists document regional nerve blocks and anesthesia records?", a: "Yes. The module includes comprehensive anesthesia record templates covering spinal, epidural, general, and ultrasound-guided peripheral nerve blocks (e.g. adductor canal, femoral blocks)." },
            { q: "How does the system handle high-risk surgical consent documentation?", a: "Digital informed surgical consent forms—customized in English, Hindi, and regional languages—can be signed electronically via tablet by the patient and attendants, permanently binding to the record." },
            { q: "Can operative summaries be shared with the patient and referring doctor?", a: "Yes. Upon surgeon sign-off, a clean, professional surgical summary detailing the procedure, implants used, and post-operative weight-bearing status can be shared via the patient portal and WhatsApp." }
        ]
    }
};

// Import SVG generator and HTML builder from Batch 1 script
const b1Script = fs.readFileSync(path.join(repoRoot, 'scratch/generate_batch1_cardio_ortho.js'), 'utf8');

// Extract generateSvgDiagram function
const svgFnStart = b1Script.indexOf('function generateSvgDiagram(item)');
const svgFnEnd = b1Script.indexOf('function generateFullPageHtml(');
const generateSvgDiagram = eval('(' + b1Script.substring(svgFnStart, svgFnEnd).trim() + ')');

// Extract generateFullPageHtml function
const htmlFnStart = b1Script.indexOf('function generateFullPageHtml(');
const htmlFnEnd = b1Script.indexOf('// Execute Batch 1 Generation');
const generateFullPageHtml = eval('(' + b1Script.substring(htmlFnStart, htmlFnEnd).trim() + ')');

let count = 0;
for (const [slug, item] of Object.entries(remaining4Data)) {
    const filename = slug + '.html';
    const filePath = path.join(repoRoot, filename);
    if (!fs.existsSync(filePath)) {
        console.warn(`File ${filename} not found, skipping.`);
        continue;
    }

    // 1. Generate and save SVG diagram
    const svgContent = generateSvgDiagram(item);
    const svgPath = path.join(diagramDir, `${slug}-workflow.svg`);
    fs.writeFileSync(svgPath, svgContent, 'utf8');

    // 2. Read existing file boundaries
    const html = fs.readFileSync(filePath, 'utf8');
    const headerEndIdx = html.indexOf('</header>');
    let footerStartIdx = html.indexOf('<!-- ═══════════════════════════════════════════════════\n     MEDICAL365 MEGA FOOTER');
    if (footerStartIdx === -1) footerStartIdx = html.indexOf('<!-- ═══════════════════════════════════════════════════\r\n     MEDICAL365 MEGA FOOTER');
    if (footerStartIdx === -1) footerStartIdx = html.indexOf('<footer id="mega-footer"');

    const preHeader = html.substring(0, headerEndIdx + '</header>'.length);
    const postFooter = html.substring(footerStartIdx);

    // 3. Generate expanded HTML
    const expandedHtml = generateFullPageHtml(slug, item, preHeader, postFooter);
    fs.writeFileSync(filePath, expandedHtml, 'utf8');

    // 4. Calculate word count (text only)
    const textOnly = expandedHtml
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    const wordCount = textOnly.split(' ').filter(w => w.length > 0).length;

    count++;
    console.log(`[${count}/4] Enhanced ${filename} -> Words: ${wordCount}, SVG: ${slug}-workflow.svg generated!`);
}

console.log('=== BATCH 1B COMPLETE: All remaining 4 Orthopedics pages enhanced! ===');


module.exports = batch1bData;
