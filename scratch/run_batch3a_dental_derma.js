const path = require('path');
const { buildPages } = require('./page_builder_engine.js');

const repoRoot = path.resolve(__dirname, '..');
const diagramDir = path.join(repoRoot, 'images/diagrams');

console.log('=== EXECUTING BATCH 3A: DENTAL (5) + DERMATOLOGY (5) = 10 PAGES ===');

const batch3aData = {
    // ══════════════════════════════════════════════════
    // DENTAL (5 pages)
    // ══════════════════════════════════════════════════
    "dental-tooth-chart": {
        cluster: "DENTAL",
        title: "Dental Tooth Charting Software | FDI & Universal Odontogram | Medical365",
        h1: "Interactive Dental Tooth Charting & 3D Odontogram Software",
        metaDesc: "Medical365 dental tooth charting software provides interactive adult and pediatric odontograms (FDI / Universal), periodontal probing & treatment tracking in dental EMR.",
        diagramTitle: "Interactive Dental Odontogram & Periodontal Charting Pipeline",
        nodes: ["Patient Dental Chair Intake", "FDI 2-Digit Tooth Grid", "Periodontal Pocket & Furcation Map", "Dentist Clinical Treatment Plan", "Dispensary Billing & EMR Sync"],
        color: "#059669",
        quickAnswer: "Dental tooth charting software is an interactive graphical odontogram module for dental surgeons and periodontists. It records adult (11-48) and pediatric (51-85) dentition under the FDI two-digit and Universal numbering systems, documents tooth-surface caries (MO, DO, MOD), missing teeth, restorations, root canal treatments, and tracks six-point periodontal pocket depths in real time.",
        bgText: "In dental practice, clear visual documentation of the oral cavity is essential for diagnosis, patient education, and legal protection. A complete dental examination requires charting 32 adult teeth across five anatomical surfaces each (mesial, distal, occlusal/incisal, buccal, lingual), evaluating existing restorations, probing periodontal pockets, and planning restorative or surgical interventions.\n\nIn conventional dental clinics across India, charting is still done on paper slips with colored pencils. Dentists scribble tooth numbers using inconsistent numbering systems, cross out extracted teeth, and sketch cavities by hand. These paper charts fade, tear, cannot be easily cross-referenced with digital RVG radiographs, and fail to provide patients with the visual clarity needed to understand the necessity of crowns, implants, or root canals.\n\nMedical365's Dental Tooth Charting module equips dentists with an interactive, responsive 3D odontogram. With 1-click status toggles for caries, composite fillings, crowns, RCTs, and implants, alongside automated periodontal probing scorecards, Medical365 standardizes oral health records and builds instant treatment acceptance.",
        capabilities: [
            { title: "Dual FDI & Universal Numbering Odontogram", text: "Supports both FDI Two-Digit World Dental Federation notation (11-48, 51-85) and the Universal Numbering System (1-32, A-T) with instant toggle between permanent and primary dentition." },
            { title: "Surface-Level Restorative Charting", text: "Interactive 5-surface tooth anatomy picker allowing clinicians to color-code caries, existing composite fillings, amalgam restorations, GIC, and fractures on Mesial, Distal, Occlusal, Buccal, and Lingual surfaces." },
            { title: "Six-Point Periodontal Probing Depth Matrix", text: "Comprehensive periodontal charting capturing 6-point probing depths (MB, B, DB, ML, L, DL in mm), gingival recession, bleeding on probing (BOP), and furcation involvement (Class I-III)." },
            { title: "Endodontic & Prosthodontic Status Visualizer", text: "Visual indicators for root canal treated (RCT) teeth, post-and-core build-ups, porcelain fused to metal (PFM) crowns, zirconia monolithic crowns, bridges, and dental implants." },
            { title: "Visual Treatment Estimate Builder", text: "Selecting proposed procedures on the odontogram auto-populates itemized treatment quotes with material choices, warranty terms, and multi-visit payment schedules." },
            { title: "Patient-Friendly Interactive Smile Preview", text: "Generates an easy-to-understand visual dental report that dentists can display to patients on chairside monitors or send via WhatsApp to explain treatment needs." }
        ],
        workflowSteps: [
            { step: "Chairside Oral Examination", desc: "Dentist examines oral cavity using mouth mirror and probe; dental assistant taps teeth on touchscreen tablet." },
            { step: "Surface Caries & Pathology Entry", desc: "Tooth surfaces touched on odontogram turn red for active decay, blue for existing fillings, and gold for crowns." },
            { step: "Periodontal Probing Recording", desc: "Assistant inputs voice or touch probing depths; pockets ≥4 mm highlight automatically in amber and red." },
            { step: "Treatment Plan Formulation", desc: "Dentist selects planned procedures (e.g. Tooth 36 RCT + Crown, Tooth 46 Class II Composite); quote compiles." },
            { step: "Patient Education & Handout", desc: "Interactive odontogram displays on chairside monitor; branded treatment summary dispatches to patient WhatsApp." }
        ],
        compliance: "Medical365 Dental Tooth Charting conforms to Dental Council of India (DCI) clinical documentation norms, FDI World Dental Federation standards, and MoHFW EHR guidelines.\n\nAll dental charts, periodontal measurements, and procedure histories are encrypted under AES-256 compliant with the DPDP Act 2023. Dental treatment summaries integrate with Ayushman Bharat Health Accounts (ABHA).",
        table: [
            { feature: "Charting Speed", manual: "Drawing and coloring paper charts with colored pencils (5-8 min)", m365: "Interactive touch odontogram completed chairside in under 90 seconds" },
            { feature: "Surface Specificity", manual: "Vague notations like 'cavity in lower molar' without surface details", m365: "Precise 5-surface mapping (MODBL) capturing exact lesion topography" },
            { feature: "Periodontal Probing", manual: "Rarely documented due to lack of structured paper measurement charts", m365: "Automated 6-point probing depth grid with automated bleeding alerts" },
            { feature: "Treatment Acceptance", manual: "Patient told verbally; struggles to visualize decay on back molars", m365: "Visual color-coded 3D tooth chart shown on chairside monitor" },
            { feature: "Billing Integration", manual: "Paper chart handed to front desk; risk of missed or unbilled procedures", m365: "Direct automated transfer of planned procedures to clinic billing" }
        ],
        faqs: [
            { q: "Can dental assistants chart findings using voice or tablet touch?", a: "Yes. The odontogram is optimized for iPads and touchscreen chairside monitors, allowing the dental assistant to tap tooth surfaces or use voice commands while the dentist performs the oral examination." },
            { q: "Does the software support mixed dentition for pediatric patients?", a: "Yes. The odontogram includes a 'Mixed Dentition' mode that displays primary deciduous teeth (51-85) alongside erupted permanent teeth (11-48) based on the child's age." },
            { q: "How are missing and impacted teeth documented?", a: "Tapping a tooth brings up a quick menu to mark it as Missing, Impacted, Congenitally Absent, Extracted, or Retained Root Piece, instantly updating the 3D visual display." },
            { q: "Can periodontal pocket depth progression be compared across visits?", a: "Yes. The software generates side-by-side periodontal charts comparing probing depths before and after scaling and root planing (SRP), objectively demonstrating healing." },
            { q: "Can the patient view their dental chart at home?", a: "Yes. Patients can view their color-coded dental chart, treatment quotes, and post-procedure care instructions on the Medical365 patient mobile app." },
            { q: "Is the dental charting software compliant with Indian medical data protection laws?", a: "Yes. All dental records, radiographic attachments, and billing data are protected by AES-256 encryption in full compliance with the DPDP Act 2023." }
        ]
    },

    "dental-imaging": {
        cluster: "DENTAL",
        title: "Dental Imaging PACS Software | RVG & OPG Software India | Medical365",
        h1: "Dental Digital Radiography (RVG) & OPG PACS Software",
        metaDesc: "Medical365 dental imaging software connects RVG sensors, OPG & CBCT machines to dental EMR. Contrast enhancement, root canal length tools & ABDM compliant.",
        diagramTitle: "Dental Digital Radiography (RVG/OPG) PACS Integration Pipeline",
        nodes: ["Intraoral RVG / OPG Sensor", "Dental DICOM PACS Gateway", "Endodontic Measurement Tools", "Dentist Chairside Review", "Tooth Chart & EMR Link"],
        color: "#059669",
        quickAnswer: "Dental imaging software is a specialized digital radiology PACS module that connects intraoral Radio-Visio-Graphy (RVG) sensors, Orthopantomograms (OPG), and Cone Beam Computed Tomography (CBCT) scanners directly to chairside dental workstations. It features endodontic working length measurement calipers, bone density measurement, caries contrast filters, and tooth-chart linking.",
        bgText: "Digital intraoral and extraoral radiography is the indispensable third eye of modern dentistry. Whether diagnosing interproximal caries, assessing alveolar bone resorption, determining endodontic working lengths, or planning dental implant trajectories, dentists take multiple digital radiographs during almost every clinical encounter.\n\nIn conventional Indian dental setups, imaging is fragmented. RVG sensors often store images on standalone PCs running proprietary software that does not communicate with the clinic's billing or patient record system. Dentists must take smartphone photos of computer screens to send on WhatsApp or manage separate software windows for every sensor brand (Vatech, Carestream, Dentsply Sirona, Woodpecker). Comparing radiographs taken before and after root canal obturation requires clicking through disorganized image folders.\n\nMedical365's Dental Imaging module provides a unified, zero-footprint dental PACS viewer that links directly with any TWAIN or DICOM-compatible RVG sensor and OPG panoramic unit. Images automatically attach to the specific tooth number on the patient's digital dental chart, equipped with endodontic measurement tools, bone density color mapping, and instant split-screen comparison.",
        capabilities: [
            { title: "Universal RVG Sensor & OPG TWAIN/DICOM Ingestion", text: "Seamless direct acquisition from all major RVG and panoramic brands: Vatech (EzSensor), Carestream (CS 5200/8100), Dentsply Sirona, Planmeca, Woodpecker (i-Sensor), and Owandy." },
            { title: "Tooth-Specific Image Association", text: "Captured intraoral periapical (IOPA) and bitewing radiographs automatically bind to specific tooth numbers (e.g. Tooth 46 IOPA) on the interactive dental odontogram." },
            { title: "Endodontic Working Length Calibrated Calipers", text: "Precision digital measurement tools to measure root canal length from incisal reference edge to apical constriction in millimeters, calibrated against sensor pixel dimensions." },
            { title: "Advanced Dental Image Enhancement Filters", text: "One-click clinical enhancement presets: Caries Detection (high-contrast edge enhancement), Periodontal Bone Level filter, Inverted Negative, and Endodontic Apex Zoom." },
            { title: "Bone Density & Implant Trajectory Measurement", text: "Measures grayscale bone density (Hounsfield-equivalent) and alveolar ridge height/width on digital OPGs to aid dental implant selection." },
            { title: "Split-Screen Pre-Op, Working & Post-Op Comparison", text: "Side-by-side layout displaying diagnostic pre-op X-ray, master cone trial X-ray, and post-obturation radiograph on a single chairside monitor." }
        ],
        workflowSteps: [
            { step: "X-Ray Acquisition Requisition", desc: "Dentist selects tooth on odontogram and clicks 'Take RVG'; sensor software activates automatically." },
            { step: "Sensor Exposure & Image Stream", desc: "Exposure captured in mouth; high-resolution 16-bit radiograph streams directly into patient chart." },
            { step: "Endodontic Measurement & Filter", desc: "Dentist applies edge-enhancement filter, measures working length with digital calipers, and notes canal curvature." },
            { step: "Patient Chairside Demonstration", desc: "Dentist shows zoomable X-ray on chairside monitor, demonstrating periapical radiolucency to patient." },
            { step: "Permanent Cloud Archival", desc: "Radiograph permanently binds to tooth history, exports to ABHA locker, and shares to patient mobile app." }
        ],
        compliance: "Medical365 Dental Imaging complies with DICOM Part 10 medical imaging standards, Atomic Energy Regulatory Board (AERB) radiation safety guidelines, and MoHFW EHR standards.\n\nAll radiographic files are archived under AES-256 encryption compliant with the DPDP Act 2023. Dental imaging studies integrate seamlessly with the Ayushman Bharat Digital Mission (ABDM).",
        table: [
            { feature: "Sensor Compatibility", manual: "Trapped in proprietary software for each sensor brand", m365: "Universal TWAIN/DICOM driver supporting all major RVG & OPG hardware" },
            { feature: "Chart Association", manual: "Images saved in generic desktop folders named by patient name", m365: "Automatically linked to specific tooth number on the 3D odontogram" },
            { feature: "Working Length Measurement", manual: "Rough visual estimation using handheld millimeter ruler on screen", m365: "Digital calibrated caliper measurement accurate to 0.1 mm" },
            { feature: "Comparative Review", manual: "Opening multiple windows and minimizing screens to compare past X-rays", m365: "1-click split-screen layout displaying Pre-Op, Working & Post-Op IOPAs" },
            { feature: "Patient Image Sharing", manual: "Taking phone photo of monitor screen and sending on WhatsApp", m365: "High-resolution digital X-ray shared directly via encrypted patient link" }
        ],
        faqs: [
            { q: "Which RVG sensor brands work directly with Medical365?", a: "Medical365 supports all TWAIN and DICOM-compliant dental sensors, including Vatech EzSensor, Carestream CS 5100/5200, Dentsply Sirona Xios, Planmeca ProSensor, Woodpecker i-Sensor, and Eighteeth Nanopix." },
            { q: "Can the software store extraoral OPG and CBCT scans?", a: "Yes. The module supports full panoramic Orthopantomograms (OPG), lateral cephalograms, and Cone Beam Computed Tomography (CBCT) DICOM volumetric slice viewing." },
            { q: "How does the working length measurement tool work?", a: "Dentists click the incisal reference edge and drag the line to the radiographic apex. The tool calculates the exact millimeter length based on the sensor's calibrated pixel ratio, compensating for minor angulation." },
            { q: "Can intraoral camera photos be stored in the same tooth history?", a: "Yes. Intraoral camera photos (showing cracked teeth, plaque buildup, or soft tissue lesions) can be captured and stored right alongside RVG radiographs for complete visual documentation." },
            { q: "Does the software slow down when storing thousands of dental X-rays?", a: "No. Medical365 utilizes lossless WebAssembly image compression and high-speed cloud caching, ensuring sub-second image loading even in high-volume multi-chair dental clinics." },
            { q: "Are patient radiographs accessible to referring orthodontists or oral surgeons?", a: "Yes. Authorized specialists can view high-resolution radiographs from any terminal or generate a secure, encrypted referral link for outside dental colleagues." }
        ]
    },

    "dental-treatment-planning": {
        cluster: "DENTAL",
        title: "Dental Treatment Planning Software | Case Presentation EMR | Medical365",
        h1: "Dental Treatment Planning & Multi-Phase Case Software",
        metaDesc: "Medical365 dental treatment planning software builds multi-phase restorative, ortho & implant plans. Transparent cost estimates, consent & patient acceptance.",
        diagramTitle: "Dental Multi-Phase Treatment Planning & Acceptance Architecture",
        nodes: ["Comprehensive Dental Exam", "Multi-Phase Treatment Plan Builder", "Transparent Cost & Financing Estimate", "Digital Patient Informed Consent", "Clinical Appointment Scheduling"],
        color: "#059669",
        quickAnswer: "Dental treatment planning software is a clinical case presentation and treatment sequencing module designed for dental surgeons and multispecialty dental clinics. It structures comprehensive oral rehabilitation into logical clinical phases (Emergency, Preventive, Restorative, Surgical/Implant, Maintenance), generates transparent itemized cost estimates, and secures digital patient informed consent.",
        bgText: "Comprehensive dental care frequently involves multi-stage clinical interventions: a patient presenting with generalized periodontitis, multiple missing teeth, and broken crowns cannot have everything treated in a single visit. Successful oral rehabilitation requires structured clinical sequencing: addressing acute pain first, completing scaling and extractions, executing endodontic therapies, placing implants, and delivering final prosthetics.\n\nIn conventional practice, conveying complex treatment plans on paper leads to confusion and poor case acceptance. Patients are handed handwritten estimate slips with dental shorthand (e.g. 'RCT 36 + PFM, FPD 14-16, Imp 46') and a lump-sum cost that triggers sticker shock. Without clear phasing and visual explanations, patients drop out after pain relief, leaving restorative and preventative treatments uncompleted.\n\nMedical365's Dental Treatment Planning module empowers dental clinics to build professional, phased treatment proposals. Clinicians organize procedures into Priority Phases (Phase 1: Emergency & Pain Relief, Phase 2: Restorative & Periodontal, Phase 3: Prosthetics & Implants), attach material options with transparent pricing, and present compelling visual case proposals that significantly increase treatment acceptance rates.",
        capabilities: [
            { title: "Multi-Phase Treatment Sequencing Engine", text: "Structures complex dental cases into distinct clinical phases: Phase 1 (Pain/Emergency), Phase 2 (Preventive & Hygiene), Phase 3 (Endodontics & Restorative), Phase 4 (Surgery & Implants), and Phase 5 (Aesthetic & Maintenance)." },
            { title: "Alternative Treatment Plan Comparison (Option A vs. Option B)", text: "Enables clinicians to present comparative treatment paths (e.g. Option A: 3-Unit Bridge vs. Option B: Single Dental Implant with Bone Graft), showing differences in longevity, visits, and cost." },
            { title: "Transparent Material & Warranty Selection", text: "Documents exact restorative materials (e.g. Standard PFM vs. CAD/CAM Zirconia 10-year warranty vs. E-max ceramic), detailing lab guarantees and durability benchmarks." },
            { title: "Interactive Chairside Case Presentation Mode", text: "Full-screen patient presentation view combining tooth charts, X-rays, and treatment steps with animated procedural videos to educate patients on why treatment is necessary." },
            { title: "Digital Informed Consent Capture with Regional Disclaimers", text: "Secures legally binding digital signatures on comprehensive procedure-specific consents (RCT risks, crown preparations, surgical extractions, implants) in English and regional languages." },
            { title: "Payment Milestone & Financing Schedule", text: "Structures multi-visit payment schedules (e.g. 40% advance on impression, 60% on crown cementation) and tracks dental financing/EMI integrations." }
        ],
        workflowSteps: [
            { step: "Clinical Examination & Mapping", desc: "Dentist completes visual exam and RVG X-rays; all pathological teeth populate the treatment planning engine." },
            { step: "Phasing & Sequencing", desc: "Procedures are grouped into Phase 1 (Immediate RCT), Phase 2 (Scaling), and Phase 3 (Crown placement)." },
            { step: "Chairside Presentation & Acceptance", desc: "Dentist reviews the phased proposal with patient on chairside tablet; patient approves plan and signs digital consent." },
            { step: "Appointment Schedule Generation", desc: "System automatically books the series of required clinical appointments with estimated chair time durations." },
            { step: "Billing & Progress Tracking", desc: "As each phase completes, the odontogram updates and payment milestones trigger automatically at the front desk." }
        ],
        compliance: "Medical365 Dental Treatment Planning adheres to Dental Council of India (DCI) professional practice regulations, Indian Dental Association (IDA) ethics guidelines, and Consumer Protection Act healthcare mandates.\n\nAll treatment plans, patient consents, and financial estimates are secured with AES-256 encryption compliant with the DPDP Act 2023. Treatment plans integrate with ABDM health records.",
        table: [
            { feature: "Case Presentation", manual: "Handwritten estimate on back of prescription slip with dental shorthand", m365: "Branded digital treatment plan with clear procedural descriptions and graphics" },
            { feature: "Treatment Phasing", manual: "All procedures listed together triggering patient price hesitation", m365: "Structured priority phases spreading treatment and costs across manageable visits" },
            { feature: "Alternative Options", manual: "Explained verbally; patients get confused between bridges vs. implants", m365: "Side-by-side comparison of treatment options detailing pros, cons, and costs" },
            { feature: "Informed Consent", manual: "Generic paper consent signed hastily or omitted entirely", m365: "Procedure-specific digital consent with tablet signature and legal timestamp" },
            { feature: "Payment Milestones", manual: "Informal verbal agreements leading to payment disputes upon completion", m365: "Structured payment schedule linked to specific clinical milestones" }
        ],
        faqs: [
            { q: "How does phased treatment planning improve patient acceptance?", a: "By breaking down a comprehensive treatment plan into distinct clinical phases (e.g. Phase 1: Immediate relief, Phase 2: Core restoration, Phase 3: Replacement), patients understand clinical priorities and can budget treatment costs across multiple appointments without feeling overwhelmed." },
            { q: "Can dentists present alternative options like Dental Bridge vs. Implant?", a: "Yes. Clinicians can create Option A and Option B side-by-side. The proposal displays procedural differences, estimated lifespans, and cost breakdowns, empowering patients to make informed decisions." },
            { q: "Does the software track lab work and warranty cards for crowns?", a: "Yes. The module tracks dental lab orders, shade selection, trial dates, and archives digital lab warranty certificates (e.g. 5-year, 10-year, or lifetime warranties) accessible on the patient app." },
            { q: "Are digital informed consents legally valid for surgical dental procedures?", a: "Yes. Digital consents comply with the Indian Information Technology Act 2000 and National Medical Commission standards, recording biometric/tablet signatures with encrypted timestamps." },
            { q: "Can patients view and approve their treatment plan on WhatsApp?", a: "Yes. Clinics can dispatch an interactive, mobile-optimized treatment proposal to the patient's verified WhatsApp, allowing them to review details with family and approve online." },
            { q: "How does the system handle installment payments and dental financing?", a: "The software links payment milestones to clinical progress: reception staff receive automated billing alerts when specific milestones (e.g. impression taken, crown delivered) are reached." }
        ]
    },

    "dental-procedure-history": {
        cluster: "DENTAL",
        title: "Dental Clinical Notes & Procedure History Software | Dental365 | Medical365",
        h1: "Dental Procedure Documentation & Clinical Notes Software",
        metaDesc: "Medical365 dental procedure history software logs RCT canal lengths, obturation materials, surgical extractions & crown cementation in dental EMR.",
        diagramTitle: "Dental Clinical Procedure Documentation & Audit Architecture",
        nodes: ["Patient Dental Chair Setup", "Specialty Procedure Template Selection", "Clinical Materials & Anesthesia Log", "Dentist Digital Sign-Off", "Tooth History & EMR Sync"],
        color: "#059669",
        quickAnswer: "Dental procedure history software is a clinical documentation module that maintains a permanent, tooth-by-tooth record of all dental interventions. It provides specialized operative templates for Endodontics (working lengths, rotary files, sealers), Oral Surgery (flap design, sutures, bone grafts), Periodontics, and Prosthodontics, creating complete clinical traceability for every tooth.",
        bgText: "Dental treatments are technically demanding micro-procedures that require rigorous clinical documentation. Performing a root canal on a maxillary first molar involves multiple canals (MB1, MB2, DB, Palatal), specific working lengths, file instrumentation tapers, irrigation protocols (NaOCl, EDTA), and obturation techniques. Similarly, complex surgical extractions require documenting local anesthesia volumes, flap designs, bone guttering, and suture materials.\n\nIn conventional dental clinics, clinical notes are often dangerously sparse. Busy dentists frequently write brief entries like 'RCT done' or 'ext done', omitting canal measurements, local anesthetic batch numbers, or post-operative instructions. If a patient returns years later with persistent pain or a cracked root, treating doctors have no record of previous canal lengths or whether an anatomical MB2 canal was located and negotiated.\n\nMedical365's Dental Procedure History module solves this documentation challenge with fast, specialty-specific clinical templates. Equipped with 1-click pickers for endodontic instrumentation, surgical steps, restorative shades, and local anesthetics, dentists can document thorough, audit-ready clinical notes in under 60 seconds.",
        capabilities: [
            { title: "Tooth-Specific Longitudinal Procedure Timeline", text: "Maintains an immutable chronologic history for every individual tooth number, displaying past restorations, RCTs, crowns, and diagnostic X-rays on a single clinical timeline." },
            { title: "Specialized Endodontic Clinical Operative Notes", text: "Structured capture of canal-by-canal metrics: canal identification (MB1, MB2, DB, P), reference points, working length (mm), master apical file (MAF), sealer brand, and obturation technique." },
            { title: "Oral Surgery & Extraction Documentation", text: "Documents simple and surgical extractions, impaction classifications (Pell & Gregory, Winter's), flap design, bone removal, tooth sectioning, and suture types (silk, vicryl) with stitch removal dates." },
            { title: "Local Anesthesia & Vasoconstrictor Safety Log", text: "Records local anesthetic agent (Lignocaine 2% with Adrenaline 1:80,000, Articaine 4%, Mepivacaine), cartridge volume (ml), injection technique (inferior alveolar nerve block, infiltration), and batch numbers." },
            { title: "Restorative Shade & Material Traceability", text: "Documents composite resin brand, VITA classical tooth shade (A1, A2, A3), bonding agent generation, curing time, and occlusion check status." },
            { title: "Automated Post-Operative Instructions Dispatch", text: "Dispatches procedure-specific post-operative instructions (e.g. post-extraction bite pack care, warm saline rinses, post-RCT pain expectations) automatically to the patient's WhatsApp." }
        ],
        workflowSteps: [
            { step: "Procedure Initiation", desc: "Dentist selects tooth on odontogram and opens operative template (e.g. Root Canal Treatment)." },
            { step: "Canal & Material Logging", desc: "Canal lengths (MB 21mm, DB 20.5mm, P 22mm), rotary file system, and sealer type are logged in seconds." },
            { step: "Anesthesia & Safety Verification", desc: "Local anesthetic agent, dosage, and patient tolerance are documented in the clinical log." },
            { step: "Radiograph & Photo Attachment", desc: "Working length and post-obturation RVG radiographs are attached directly to the procedure record." },
            { step: "Sign-Off & Post-Op Dispatch", desc: "Doctor signs note electronically; post-operative instructions and painkiller prescriptions dispatch to patient phone." }
        ],
        compliance: "Medical365 Dental Procedure History conforms to Dental Council of India (DCI) record-keeping regulations, Indian Dental Association (IDA) clinical guidelines, and MoHFW EHR standards.\n\nAll procedure notes, anesthetic records, and radiographic attachments are encrypted under AES-256 compliant with the DPDP Act 2023. Patient summaries link to the Ayushman Bharat Digital Mission (ABDM).",
        table: [
            { feature: "Documentation Detail", manual: "Brief, vague notes like 'RCT done' without canal measurements", m365: "Structured canal-by-canal working lengths, file systems, and obturation notes" },
            { feature: "Tooth History Access", manual: "Flipping through physical paper files to see what was done 2 years ago", m365: "1-click longitudinal timeline displaying complete history for any tooth" },
            { feature: "Local Anesthesia Tracking", manual: "Rarely recorded; risk during allergic or systemic adverse events", m365: "Mandatory logging of anesthetic agent, vasoconstrictor, and cartridge volume" },
            { feature: "Post-Op Care Handout", manual: "Verbal instructions quickly forgotten by patient upon leaving clinic", m365: "Automated WhatsApp delivery of procedure-specific post-op care guides" },
            { feature: "Medico-Legal Safety", manual: "Vulnerable to patient litigation due to missing clinical details", m365: "Legally robust, timestamped digital records with attached radiographs" }
        ],
        faqs: [
            { q: "How does the software handle multi-rooted endodontic documentation?", a: "The endodontic template provides dedicated rows for every canal (Mesiobuccal, Mesiolingual, Distobuccal, Palatal, etc.), capturing reference cusp, working length (mm), master apical file size, and obturation quality individually." },
            { q: "Can dentists record implant placement surgical notes?", a: "Yes. Dedicated implant surgery templates capture osteotomy protocol, bone density (D1-D4), insertion torque (N·cm), ISQ stability values, implant brand, diameter, length, and bone graft/membrane used." },
            { q: "Does the system track local anesthetic maximum recommended doses?", a: "Yes. When entering the number of anesthetic cartridges, the software automatically calculates total Lignocaine and Epinephrine milligrams based on patient body weight, preventing toxic overdoses." },
            { q: "Can clinical notes be dictated using speech-to-text?", a: "Yes. Medical365 includes built-in dental speech recognition supporting dental terminology (e.g., 'buccal cusp fracture', 'mesial marginal ridge caries') for hands-free charting." },
            { q: "How are post-operative instructions delivered to patients?", a: "The moment the dentist finalizes the procedure note, an automated WhatsApp message dispatches procedure-specific post-op care advice (e.g. keeping gauze bite for 45 minutes, avoiding hot food) to the patient." },
            { q: "Is the procedure history preserved if a patient transfers to another branch?", a: "Yes. Multi-clinic dental chains can access the patient's centralized tooth history, past X-rays, and operative notes across all authorized hospital and clinic locations." }
        ]
    },

    "dental-insurance-billing": {
        cluster: "DENTAL",
        title: "Dental Billing & Insurance Claims Software India | Dental POS | Medical365",
        h1: "Dental Clinic Billing, Invoicing & Insurance Management Software",
        metaDesc: "Medical365 dental billing software manages chairside invoicing, GST compliance, dental insurance TPA pre-auth & multi-visit payment milestones for Indian clinics.",
        diagramTitle: "Dental Clinic Billing & Insurance Claims Architecture",
        nodes: ["Chairside Procedure Completion", "Automated GST Invoicing Engine", "Insurance Pre-Auth & TPA Claim", "Multi-Mode Payment (UPI / Cards)", "Financial Revenue Dashboard"],
        color: "#059669",
        quickAnswer: "Dental insurance billing software is a specialized clinic financial and claims management module for private dental practices and dental hospital chains. It automates itemized chairside invoicing, handles GST compliance (HSN/SAC codes), manages multi-visit installment milestones, processes dental insurance and corporate cashless pre-authorizations, and reconciles payments.",
        bgText: "Financial management in dental practice involves unique operational challenges. Unlike medical OPD visits that involve a single consultation fee, dental treatments are multi-visit clinical projects spanning weeks or months: root canals require 2-3 sittings, crowns require impressions and trials, and orthodontic alignment spans 12-24 months. Managing partial payments, tracking lab expenses, and billing consumables without dedicated dental software leads to severe revenue leakage.\n\nFurthermore, the dental insurance landscape in India is expanding rapidly. Corporate health plans, private TPAs, and outpatient dental coverages now offer cashless dental benefits for cleanings, extractions, and trauma care. In conventional clinics, managing insurance claims using manual paper forms and non-specialized billing machines results in delayed reimbursements, disputed pre-authorizations, and patient frustration.\n\nMedical365's Dental Billing module unifies clinical dentistry with practice financial management. Connecting directly to the digital tooth chart, completed procedures transfer to invoices with 1 click, enforcing transparent pricing, tracking lab fee deductions, managing installment plans, and accelerating TPA insurance claim settlements.",
        capabilities: [
            { title: "Direct Tooth Chart to Invoice Synchronization", text: "Procedures completed on the interactive odontogram transfer directly to patient billing in 1 click, eliminating manual billing re-entry and preventing unbilled services." },
            { title: "GST-Compliant Dental Healthcare & Cosmetic Invoicing", text: "Pre-configured with appropriate Indian GST rates and SAC/HSN codes (SAC 999312 for dental healthcare services vs. taxable cosmetic dentistry and whitening products)." },
            { title: "Multi-Visit Installment & Milestone Payment Tracking", text: "Manages treatment package installment schedules (e.g. Orthodontic initial down payment + monthly EMI), tracking outstanding dues with automated WhatsApp payment reminders." },
            { title: "Dental Insurance & TPA Pre-Authorization Engine", text: "Structures dental insurance claim packages: attaching diagnostic RVG X-rays, treatment justification notes, and standardized pre-auth forms for corporate TPAs." },
            { title: "Dental Laboratory Expense & Profit Margin Reconciliation", text: "Links external dental lab bills (crowns, bridges, aligners) to specific patient invoices, calculating true net profit margins per procedure and doctor commission shares." },
            { title: "Omnichannel Payment Gateway (UPI / QR / Cards / Cash)", text: "Integrated dynamic UPI QR codes on chairside invoice screens, debit/credit card POS terminals, and payment link generation for remote advance deposits." }
        ],
        workflowSteps: [
            { step: "Clinical Procedure Completion", desc: "Dentist signs off procedure note; completed services flow automatically to the front desk billing queue." },
            { step: "Itemized Invoice Generation", desc: "Reception confirms bill items; software applies corporate discount, package rules, or insurance copay." },
            { step: "Insurance Pre-Auth / Claim Submission", desc: "If insured, claims package with attached pre- and post-op RVG radiographs submits electronically to TPA portal." },
            { step: "Payment Collection & Receipting", desc: "Patient scans dynamic UPI QR code on desk; payment reconciles instantly and digital GST receipt dispatches via WhatsApp." },
            { step: "Financial Analytics & Doctor Payout", desc: "System allocates doctor commission share, deducts lab expenses, and updates daily clinic revenue analytics." }
        ],
        compliance: "Medical365 Dental Billing complies with Indian Goods and Services Tax (GST) healthcare invoicing regulations, Insurance Regulatory and Development Authority of India (IRDAI) dental claim guidelines, and DPDP Act 2023 financial privacy rules.\n\nAll invoices, transaction records, and tax filings are encrypted with AES-256 and stored in audit-ready digital archives.",
        table: [
            { feature: "Billing Accuracy", manual: "Manual handwriting of receipts; frequent under-billing of consumables", m365: "Direct 1-click transfer of completed procedures from dental chart to invoice" },
            { feature: "Payment Milestones", manual: "Paper ledger books tracking who paid advance; high unpaid balances", m365: "Automated digital ledger tracking advances, dues, and sending payment links" },
            { feature: "Dental Insurance Claims", manual: "Paper claim forms with printed X-rays mailed to TPAs; high rejection", m365: "Digital claim packages with embedded high-resolution pre/post-op RVG X-rays" },
            { feature: "Lab Cost Tracking", manual: "Lab bills paid separately; dentists don't know true profit margins", m365: "Automatic linking of lab costs to patient bills calculating true net profit" },
            { feature: "GST Compliance", manual: "Manual calculation of tax exemptions vs taxable cosmetic services", m365: "Automated GST invoicing with pre-configured SAC codes and tax rules" }
        ],
        faqs: [
            { q: "How does the software handle dental insurance and TPA pre-authorizations?", a: "Medical365 generates standardized insurance claim summaries: it packages the treatment plan, clinical diagnosis, and attaches required pre-operative and post-operative RVG radiographs in an audit-ready format for TPA submission." },
            { q: "Can orthodontic treatment packages be billed in monthly installments?", a: "Yes. The system allows clinics to define customized payment schedules (e.g. 25% down payment on bonding, followed by 12 equal monthly installments), sending automated WhatsApp payment reminders before each appointment." },
            { q: "Does the software calculate doctor revenue shares and lab expenses?", a: "Yes. Clinic owners can set commission percentages for associate dentists and visiting specialists (e.g. 40% for visiting endodontist after deducting lab crown cost), generating automated monthly payout summaries." },
            { q: "How does the dynamic UPI QR code feature work at reception?", a: "When an invoice is finalized, the screen displays a dynamic UPI QR code encoded with the exact bill amount. Patients scan with Google Pay, PhonePe, or Paytm; payment confirms instantly without manual verification." },
            { q: "Can invoices distinguish between tax-exempt dental treatment and taxable cosmetics?", a: "Yes. Curative dental treatments (fillings, RCTs, extractions) are categorized under tax-exempt healthcare SAC codes, while elective cosmetic procedures (whitening, veneers) apply appropriate GST slabs automatically." },
            { q: "Are financial reports and revenue summaries exportable for accounting?", a: "Yes. Daily cash-drawer summaries, payment mode breakdowns, doctor commission ledgers, and GST-ready sales reports can be exported to Excel and Tally in 1 click." }
        ]
    },

    // ══════════════════════════════════════════════════
    // DERMATOLOGY (5 pages)
    // ══════════════════════════════════════════════════
    "skin-image-tracking": {
        cluster: "DERMATOLOGY",
        title: "Dermatology Image Tracking Software | Skin Lesion EMR India | Medical365",
        h1: "Dermatology Clinical Image Tracking & Skin Lesion Software",
        metaDesc: "Medical365 skin image tracking software captures calibrated dermatoscope photos, body mapping, ABCDE melanoma checks & vitiligo progress in dermatology EMR.",
        diagramTitle: "Dermatology Clinical Photography & Skin Lesion Tracking Pipeline",
        nodes: ["Patient Skin Examination", "Calibrated Dermatoscope Image Ingestion", "Total Body Map Anatomical Tagging", "Dermatologist Lesion Comparison", "Treatment Plan & EMR Sync"],
        color: "#ec4899",
        quickAnswer: "Skin image tracking software is a specialized clinical dermatology photography and lesion monitoring module. It captures high-resolution clinical and dermatoscope photographs, maps lesion locations on a 3D anatomical body canvas, executes ABCDE criteria checks for atypical nevi, and tracks longitudinal treatment responses for chronic dermatoses such as psoriasis, vitiligo, and acne.",
        bgText: "Dermatology is an intensely visual medical specialty. Clinical decision-making—from distinguishing benign seborrheic keratosis from malignant melanoma to evaluating the repigmentation of vitiligo macules—depends entirely on high-fidelity morphological observation.\n\nIn conventional Indian dermatology clinics, clinical photography is fraught with documentation hazards. Dermatologists frequently take lesion photos on personal smartphones. These unorganized photos get mixed with personal photo galleries, lack standardized lighting or scale calibration, and are separated from the patient's medical history. When a patient returns for follow-up three months later, searching through thousands of unlabelled smartphone photos to verify if a lesion has grown is virtually impossible.\n\nMedical365's Skin Image Tracking module equips dermatologists with an enterprise-grade, privacy-compliant clinical imaging vault. Photos captured via tablet or wireless camera automatically attach to the patient's electronic chart, pinned to specific anatomical coordinates on a 3D body map with standardized color calibration, digital measurement calipers, and split-screen before-and-after comparisons.",
        capabilities: [
            { title: "Total Body Photography & 3D Anatomical Mapping", text: "Interactive 3D body avatar allowing clinicians to pin photographs to exact anatomical locations (e.g. Right Malar Eminence, Left Scapula, Lower Lumbar) for longitudinal tracking." },
            { title: "Dermatoscope & Polarized Light Camera Integration", text: "Direct connectivity with digital dermatoscopes (DermLite, Dino-Lite, Heine) capturing high-magnification polarized epiluminescence microscopy images of pigment networks and vascular structures." },
            { title: "ABCDE Melanoma & Dysplastic Nevus Scorecard", text: "Structured screening checklist evaluating Asymmetry, Border irregularity, Color variegation, Diameter (>6mm), and Evolution/change over time with standardized risk scoring." },
            { title: "Longitudinal Vitiligo & Psoriasis Score Tracking", text: "Tracks repigmentation percentages using the Vitiligo Area Scoring Index (VASI) and monitors erythema, induration, and scaling using the Psoriasis Area and Severity Index (PASI)." },
            { title: "Split-Screen Before-and-After Treatment Comparison", text: "Displays baseline pre-treatment photographs side-by-side with follow-up photos under identical magnification and alignment to visually prove therapeutic efficacy." },
            { title: "Secure Patient Camera Privacy Architecture", text: "Captures clinical photos directly into encrypted cloud storage via the Medical365 mobile app without saving any image copies to the personal smartphone camera roll." }
        ],
        workflowSteps: [
            { step: "Clinical Examination & Anatomical Pinning", desc: "Dermatologist examines skin lesions and taps location on the 3D body avatar." },
            { step: "Calibrated Image Acquisition", desc: "Photo captured using mobile app or dermatoscope; cross-polarization eliminates surface glare." },
            { step: "Lesion Annotation & Measurement", desc: "Digital caliper measures lesion diameter in millimeters; ABCDE criteria or PASI scores are logged." },
            { step: "Side-by-Side Comparison", desc: "System displays historical photo alongside new image to evaluate lesion evolution or therapeutic response." },
            { step: "EMR Attachment & Patient Handout", desc: "Images permanently attach to consultation note; visual progress comparison can be shared via WhatsApp." }
        ],
        compliance: "Medical365 Skin Image Tracking conforms to the Indian Association of Dermatologists, Venereologists and Leprologists (IADVL) practice guidelines and DICOM Supplement 107 (Medical Photography).\n\nAll clinical photographs, patient identifiers, and morphological notes are encrypted under AES-256 in strict compliance with the DPDP Act 2023. Patient records integrate with Ayushman Bharat Health Accounts (ABHA).",
        table: [
            { feature: "Photo Storage", manual: "Doctor's personal smartphone camera gallery mixed with private photos", m365: "Encrypted clinical media vault linked directly to patient EMR chart" },
            { feature: "Anatomical Location", manual: "Unlabeled photos; difficult to recall which specific mole was photographed", m365: "Interactive 3D body map pinning photo to exact anatomical coordinate" },
            { feature: "Longitudinal Comparison", manual: "Scrolling through endless camera rolls trying to find baseline photos", m365: "1-click split-screen before-and-after comparison with aligned scaling" },
            { feature: "Patient Privacy", manual: "High privacy risk under DPDP Act 2023; photos stored on unencrypted phones", m365: "100% compliant; photos never save to local phone memory or gallery" },
            { feature: "Scoring Tools", manual: "Manual calculation of PASI or VASI rarely done in busy clinics", m365: "Interactive PASI and VASI calculators auto-computing severity scores" }
        ],
        faqs: [
            { q: "How does the mobile app protect patient photo privacy under the DPDP Act 2023?", a: "When using the Medical365 mobile camera, photographs are encrypted in memory and uploaded directly to the hospital's secure cloud repository via TLS 1.3. The photo is never written to the smartphone's camera roll or gallery, ensuring zero data leakage." },
            { q: "Can digital dermatoscopes be connected directly to the software?", a: "Yes. USB and Wi-Fi dermatoscopes (including DermLite, Dino-Lite, and Heine Delta) can stream high-resolution polarized dermoscopy images directly into the consultation record." },
            { q: "How does the software track vitiligo repigmentation over time?", a: "The module records anatomical location, lesion area in cm², and repigmentation percentage using the Vitiligo Area Scoring Index (VASI), displaying serial photos on a chronological progress timeline." },
            { q: "Can the software calculate Psoriasis Area and Severity Index (PASI) scores?", a: "Yes. Dermatologists can enter erythema, induration, and desquamation grades across head, trunk, upper, and lower extremities; the software computes the overall PASI score (0 to 72) automatically." },
            { q: "Can before-and-after comparison photos be shared with patients?", a: "Yes. Dermatologists can generate side-by-side progress cards showing clinical improvement (e.g. acne scarring reduction or hair regrowth) that can be shared via the patient portal or WhatsApp." },
            { q: "Does the software support hair and scalp trichoscopy examinations?", a: "Yes. Specialized trichoscopy templates record hair shaft diameter diversity, yellow dots, perifollicular erythema, and follicular density for alopecia evaluations." }
        ]
    },

    "dermatology-photos": {
        cluster: "DERMATOLOGY",
        title: "Clinical Dermatology Photography Software | Skin Photo PACS | Medical365",
        h1: "Clinical Dermatology Photography & Secure Media Vault Software",
        metaDesc: "Medical365 dermatology photography software provides HIPAA/DPDP-compliant photo capture, ghosting alignment, skin lesion comparison & EMR integration for skin clinics.",
        diagramTitle: "Secure Clinical Photography & Image Comparison Workflow",
        nodes: ["Patient Clinical Presentation", "Standardized Mobile Camera Capture", "Ghosting Silhouette Alignment", "Encrypted Cloud Media Vault", "Dermatology EMR & Before/After Portal"],
        color: "#ec4899",
        quickAnswer: "Clinical dermatology photography software is an enterprise clinical media management and medical photography module designed for dermatologists and aesthetic clinics. It ensures standardized photographic reproduction (consistent framing, lighting, angles), features ghosting silhouette alignment tools, organizes photos by anatomical tag, and maintains strict patient consent and privacy compliance under the DPDP Act 2023.",
        bgText: "In dermatology and aesthetic medicine, clinical photographs serve as the primary objective record of disease severity and procedural efficacy. Documenting chemical peel outcomes, laser skin resurfacing, hair restoration, or biologics response requires standardized clinical photography across multiple months.\n\nHowever, clinical photography in most outpatient clinics lacks standardization. Photographs taken across different visits vary drastically in patient posture, camera distance, angle, and room lighting. A post-treatment photo taken with brighter ambient lighting or a different angle can create a false appearance of clinical improvement or obscure disease recurrence, compromising scientific validity and legal defensibility.\n\nMedical365's Dermatology Photography module brings standardized clinical photography to everyday practice. Equipped with real-time 'ghosting' overlays that project the baseline photograph onto the live camera viewfinder, clinicians achieve millimeter-precise alignment across consecutive visits, producing scientific-grade before-and-after comparison series that withstand scrutiny.",
        capabilities: [
            { title: "Live Ghosting Silhouette Alignment Viewfinder", text: "Projects a semi-transparent overlay of the baseline pre-treatment photograph onto the live camera screen, ensuring identical framing, angle, and distance for follow-up photos." },
            { title: "Standardized Multi-Angle Facial & Scalp Profiles", text: "Pre-configured photographic series for full-face aesthetics (Frontal, Right 45°, Left 45°, Right 90°, Left 90°) and scalp hair loss (Vertex, Frontal hairline, Temporal peaks)." },
            { title: "Granular Anatomical Tagging & Metadata Indexing", text: "Every photograph is tagged with anatomical region, diagnostic ICD-10 code, treatment modality, visit milestone (Pre-op, 2 weeks, 1 month, 3 months), and doctor notes." },
            { title: "Interactive Zoom & Cross-Polarization Viewer", text: "Browser-based high-resolution viewer supporting synchronized split-screen zooming, pan, and cross-polarized light analysis to evaluate epidermal vs. dermal pigment." },
            { title: "Digital Patient Photographic Consent Module", text: "Captures explicit digital patient consent for clinical documentation, educational sharing, or marketing publication, with biometric signatures stored in the permanent chart." },
            { title: "Branded Aesthetic Before-and-After Collages", text: "Generates high-impact, professional before-and-after comparison cards with clinic watermarks, procedure labels, and time intervals for patient counseling." }
        ],
        workflowSteps: [
            { step: "Patient Photographic Consent", desc: "Patient selects consent preferences (internal clinical chart only vs. anonymous academic sharing) on tablet." },
            { step: "Ghosting Viewfinder Alignment", desc: "Doctor opens camera app; baseline photo appears as a semi-transparent silhouette guiding live framing." },
            { step: "Multi-Angle Series Capture", desc: "Standardized 5-angle facial series captured in seconds; photos encrypt and stream directly to cloud vault." },
            { step: "Synchronized Comparative Review", desc: "Doctor opens consultation chart; baseline and current photos load side-by-side with synchronized zoom." },
            { step: "Before/After Collage Generation", desc: "Clinic generates branded progress collage to celebrate improvement with patient and attach to chart." }
        ],
        compliance: "Medical365 Dermatology Photography conforms to the American Academy of Dermatology (AAD) standards for clinical photography and IADVL ethical documentation codes.\n\nAll photographic files are encrypted using AES-256 and stored in compliant Indian data centers under the DPDP Act 2023. Patient photographic records integrate with ABDM health lockers.",
        table: [
            { feature: "Framing Consistency", manual: "Inconsistent angles and distance between visits; unscientific comparison", m365: "Live ghosting silhouette alignment ensuring identical posture and framing" },
            { feature: "Photo Indexing", manual: "Unorganized files in phone memory; difficult to find past photos", m365: "Structured indexing by anatomical site, visit milestone, and procedure" },
            { feature: "Patient Consent", manual: "Verbal consent easily disputed; high legal risk for aesthetic clinics", m365: "Explicit digital consent capturing permitted usage tiers with audit trail" },
            { feature: "Comparison Tools", manual: "Holding two smartphones side-by-side trying to match images", m365: "Synchronized dual-image viewer with linked zoom and pan controls" },
            { feature: "Marketing Collages", manual: "Hours spent in external photo editing software cropping images", m365: "1-click auto-generation of branded before-and-after comparison cards" }
        ],
        faqs: [
            { q: "How does the 'ghosting' silhouette alignment feature work?", a: "When capturing a follow-up photo, the Medical365 camera app displays a semi-transparent 'ghost' overlay of the patient's baseline image on the screen. The clinician simply aligns the patient's eyes, nose, and chin with the overlay, guaranteeing identical distance and angle." },
            { q: "How does the software handle patient consent for clinical photos under Indian law?", a: "The module includes a tiered digital consent form complying with the DPDP Act 2023: patients can consent to (1) Medical chart documentation only, (2) Anonymous academic/training use, or (3) Social media/promotional publication." },
            { q: "Can high-resolution SLR cameras be connected to the system?", a: "Yes. Beyond mobile and tablet capture, the system supports SD card hot-folder synchronization and tethered Wi-Fi transfer from Canon, Nikon, and Sony DSLR/mirrorless cameras." },
            { q: "Does the system maintain photo watermarks to prevent image theft?", a: "Yes. Exported before-and-after comparison cards automatically include the clinic's official watermark, procedure name, and elapsed treatment time (e.g., 'After 3 sessions of Q-switched laser')." },
            { q: "Can dermatologists zoom into both baseline and follow-up photos simultaneously?", a: "Yes. The synchronized viewer locks pan and zoom between the before-and-after images, allowing clinicians to inspect pigment clearance down to individual pores simultaneously." },
            { q: "What happens if a patient revokes photo consent in the future?", a: "Under the DPDP Act 2023, patients have the right to revoke consent. Updating the patient's privacy settings in Medical365 instantly flags the media as restricted and blocks external export." }
        ]
    },

    "dermatology-treatment-plans": {
        cluster: "DERMATOLOGY",
        title: "Dermatology Treatment Planning Software | Skin Clinic EMR | Medical365",
        h1: "Dermatology Treatment Planning & Multi-Session Protocol Software",
        metaDesc: "Medical365 dermatology treatment planning software manages chemical peels, laser sessions, acne protocols, biologics & session package tracking in skin clinics.",
        diagramTitle: "Dermatology Multi-Session Treatment Planning Architecture",
        nodes: ["Dermatology Skin Evaluation", "Multi-Session Protocol Builder", "Laser & Peel Parameter Prescription", "Session Check-In & Countdown", "Longitudinal Clearance & EMR Sync"],
        color: "#ec4899",
        quickAnswer: "Dermatology treatment planning software is a clinical protocol and session tracking module designed for clinical and aesthetic dermatologists. It manages multi-session treatment regimens for acne, melasma, psoriasis, and laser hair reduction, structures chemical peel and energy-based device parameters, tracks multi-session packages, and monitors medication safety for systemic agents like Isotretinoin and biologics.",
        bgText: "Dermatology and aesthetic medicine rely heavily on multi-session treatment protocols. Managing chronic dermatological conditions—from severe nodulocystic acne and recalcitrant melasma to plaque psoriasis and alopecia areata—requires long-term clinical planning rather than isolated one-off prescriptions. Similarly, aesthetic procedures like laser hair reduction, fractional CO2 laser, and chemical peels require standardized multi-sitting protocols spanning 4 to 8 months.\n\nIn conventional skin clinics, multi-session packages are managed on messy paper cards. Patients frequently arrive for session 4 without records of which laser fluence (J/cm²) was used in session 3, what peel concentration was applied, or whether pre-peel priming was completed. Furthermore, systemic therapies like oral Isotretinoin require strict safety surveillance (baseline lipid profiles, liver enzymes, and pregnancy tests) that is easily overlooked on paper charts.\n\nMedical365's Dermatology Treatment Planning module unifies protocol standardization, energy-based device parameters, and package tracking. Dermatologists configure personalized multi-session plans, record exact device fluences, track package countdowns automatically, and monitor systemic drug safety checklists in one streamlined interface.",
        capabilities: [
            { title: "Specialty-Specific Protocol Builder (Acne, Melasma, Scars)", text: "Pre-configured, customizable treatment pathways for Acne Vulgaris (Grade I-IV), Melasma (epidermal vs. dermal), Psoriasis, Atopic Dermatitis, and Alopecia with scheduled clinical review milestones." },
            { title: "Energy-Based Device & Laser Parameter Documentation", text: "Dedicated parameter fields for Q-switched Nd:YAG, Fractional CO2, Diode 808nm, and Intense Pulsed Light (IPL): wavelength (nm), spot size (mm), fluence (J/cm²), pulse width (ms), and pass count." },
            { title: "Chemical Peel Protocol & Neutralization Log", text: "Structures chemical peeling workflows: peeling agent (Glycolic acid 20-70%, Salicylic acid 20-30%, TCA 15-35%, Yellow peel), pre-peel priming status, application time (minutes), frosting grade, and neutralizer." },
            { title: "Systemic Isotretinoin Safety & Teratogenicity Monitor", text: "Enforces mandatory pre-prescription safety checks: baseline liver function tests (SGOT/SGPT), fasting lipid profile, pregnancy test (urine hCG), and cumulative target dose (120-150 mg/kg) tracking." },
            { title: "Multi-Session Package Tracking & Session Countdown", text: "Tracks prepaid procedure packages (e.g. 6-session Laser Hair Reduction), decrementing sessions at check-in and sending automated WhatsApp alerts when package renewal is due." },
            { title: "Post-Procedure Skincare Regimen Generator", text: "Auto-generates branded post-procedure instructions and home skincare regimens (broad-spectrum sunscreen SPF 50+, gentle cleanser, barrier repair creams) with 1 click." }
        ],
        workflowSteps: [
            { step: "Clinical Diagnosis & Staging", desc: "Dermatologist evaluates skin condition, grades severity, and selects treatment protocol." },
            { step: "Protocol Configuration & Quoting", desc: "Doctor customizes number of sittings, interval spacing (e.g. every 3 weeks), and home priming regimen." },
            { step: "Session Execution & Parameter Entry", desc: "During treatment, nurse or doctor logs exact laser fluence, spot size, passes, and patient tolerance." },
            { step: "Automated Package Decrement", desc: "Reception confirms session completion; digital balance decrements (e.g. Session 2 of 6 completed)." },
            { step: "Post-Procedure Home Care Dispatch", desc: "Post-peel care instructions, sunscreen guidelines, and next appointment date dispatch to patient WhatsApp." }
        ],
        compliance: "Medical365 Dermatology Treatment Planning aligns with IADVL procedural guidelines, American Society for Laser Medicine and Surgery (ASLMS) safety protocols, and MoHFW clinical documentation standards.\n\nAll treatment logs, laser parameter records, and systemic drug surveillance data are encrypted under AES-256 compliant with the DPDP Act 2023. Patient plans link to the Ayushman Bharat Digital Mission (ABDM).",
        table: [
            { feature: "Device Parameter Logging", manual: "Handwritten notes often omitting fluence, pulse width, or pass count", m365: "Structured digital log capturing exact laser Joules, spot size, and passes" },
            { feature: "Session Package Tracking", manual: "Paper punch cards easily lost, manipulated, or disputed by patients", m365: "Automated digital session countdown with real-time SMS/WhatsApp updates" },
            { feature: "Isotretinoin Safety Surveillance", manual: "Flipping through lab files to check if cumulative dose has been reached", m365: "Automated cumulative mg/kg tracking and mandatory pregnancy test alerts" },
            { feature: "Post-Procedure Instructions", manual: "Generic verbal reminders; patients often forget sun protection rules", m365: "Automated WhatsApp delivery of customized post-laser skincare guides" },
            { feature: "Clinic Revenue Reconciliation", manual: "Delayed billing; reception unsure if session was part of package", m365: "Seamless billing integration preventing unpaid sessions and package leakage" }
        ],
        faqs: [
            { q: "How does the software track cumulative Isotretinoin dosages?", a: "Medical365 calculates cumulative drug intake: it multiplies daily dose by duration and divides by body weight, graphing progress toward the target cumulative dose of 120 to 150 mg/kg to minimize acne relapse rates." },
            { q: "Can clinics customize laser hair reduction parameters by skin type?", a: "Yes. Parameters can be stratified according to the Fitzpatrick Skin Phototype (Types I through VI), providing safe baseline fluence and pulse duration recommendations for Indian skin types (IV and V)." },
            { q: "What happens when a patient completes all sessions in a package?", a: "When the final session is logged, the software alerts reception to offer maintenance packages and sends an automated WhatsApp message to the patient thanking them and scheduling a follow-up review." },
            { q: "Does the module support patch testing documentation for chemical peels?", a: "Yes. Dedicated fields capture pre-treatment patch test location, concentration, and 24-48 hour reaction grading to prevent post-inflammatory hyperpigmentation (PIH)." },
            { q: "Can dermatologists prescribe combination medical and procedural plans?", a: "Yes. The treatment plan builder allows simultaneous prescribing of daily topical medications, oral antibiotics, and scheduled clinic procedures (e.g. oral Doxycycline + Comedone extraction + Salicylic peel)." },
            { q: "Are before-and-after photos linked directly to individual treatment sessions?", a: "Yes. Photos captured at each session are tagged with that specific sitting number (e.g. 'Session 3 - Pre-laser'), creating a clear chronological visual timeline." }
        ]
    },

    "cosmetic-procedure-records": {
        cluster: "DERMATOLOGY",
        title: "Aesthetic Cosmetic Procedure Software | Botox & Filler EMR | Medical365",
        h1: "Cosmetic Dermatology & Aesthetic Procedure Documentation Software",
        metaDesc: "Medical365 cosmetic procedure software tracks Botox injection facial maps, dermal filler volumes, lot numbers & digital aesthetic consent in dermatology EMR.",
        diagramTitle: "Aesthetic Cosmetic Dermatology Clinical Lifecycle Architecture",
        nodes: ["Aesthetic Facial Assessment", "Injectable Facial Mapping (Botox/Fillers)", "Product Lot & Barcode Registry", "Digital Aesthetic Informed Consent", "Post-Procedure Care & Recall EMR"],
        color: "#ec4899",
        quickAnswer: "Cosmetic procedure records software is a specialized clinical aesthetic documentation module designed for cosmetic dermatologists and plastic surgeons. It manages facial mapping for neuromodulators (Botox, Dysport) and hyaluronic acid dermal fillers, logs product lot numbers and reconstitution volumes, captures digital cosmetic informed consents, and tracks thread lifts and PRP aesthetic treatments.",
        bgText: "Aesthetic medicine is among the fastest growing healthcare segments in urban India. Young professionals and older adults increasingly seek non-surgical facial rejuvenation, including botulinum toxin injections for dynamic wrinkles, hyaluronic acid dermal fillers for volume loss, Platelet-Rich Plasma (PRP) for facial rejuvenation and hair restoration, and absorbable thread lifts.\n\nHowever, aesthetic clinical documentation carries profound medico-legal and anatomical complexity. Injecting botulinum toxin or dermal fillers requires exact anatomical recording: how many units were injected into the corrugator, procerus, frontalis, or orbicularis oculi? Which layer (subcutaneous, periosteal) received filler? What were the lot and serial numbers of the injected syringe? In conventional clinics, recording this on generic paper prescription pads is completely inadequate, leaving clinicians legally vulnerable during disputes regarding symmetry or longevity.\n\nMedical365's Cosmetic Procedure module equips aesthetic doctors with an interactive visual facial injection canvas. Clinicians tap exact anatomical facial zones to drop injection markers, record units/volumes, scan product packaging barcodes, and secure legally robust aesthetic informed consents in under two minutes.",
        capabilities: [
            { title: "Interactive Facial Anatomical Injection Mapping", text: "High-resolution 2D and 3D facial diagram canvas allowing clinicians to plot injection sites for Glabella, Forehead, Crow's feet, Tear troughs, Nasolabial folds, Lips, and Jawline." },
            { title: "Neuromodulator (Botox / Dysport / Xeomin) Unit Tracker", text: "Records exact unit breakdown per muscle group (e.g., Glabella 20U, Frontalis 12U, Crow's feet 16U), reconstitution diluent volume (normal saline in ml), and vial expiration date." },
            { title: "Dermal Filler Volume & Depth Logging", text: "Documents hyaluronic acid (HA) filler brand, volume (ml per site), needle gauge vs. cannula (25G/27G), injection plane (supra-periosteal, deep subcutaneous, dermis), and aspiration safety checks." },
            { title: "Sterile Implant & Injectable Barcode Traceability", text: "Scans product packaging barcodes (Allergan Botox, Juvederm, Restylane, Teosyal) to auto-record manufacturer lot and serial numbers directly into the patient's permanent aesthetic chart." },
            { title: "Aesthetic Procedure Informed Consent Module", text: "Comprehensive digital informed consent covering bruising, asymmetry, touch-up policies, rare vascular occlusion risks, and post-procedure restrictions with electronic signatures." },
            { title: "Platelet-Rich Plasma (PRP) & Thread Lift Logging", text: "Specialized templates for scalp and facial PRP (centrifugation speed, anticoagulant, activation agent) and PDO/PLLA thread lifts (thread type, barb design, length, insertion vectors)." }
        ],
        workflowSteps: [
            { step: "Aesthetic Consultation & Facial Analysis", desc: "Doctor assesses dynamic facial rhytids, volume depletion, and discusses patient aesthetic goals." },
            { step: "Digital Facial Mapping", desc: "Clinician taps interactive facial diagram to drop units per zone (e.g. 4U per corrugator point)." },
            { step: "Barcode Verification & Injection", desc: "Botox or filler syringe barcode is scanned at chairside; batch number and expiration date bind to chart." },
            { step: "Digital Consent Sign-Off", desc: "Patient signs procedure-specific aesthetic consent and touch-up policy on chairside tablet." },
            { step: "Post-Care Dispatch & Touch-Up Booking", desc: "Post-injection care instructions (avoiding lying down for 4 hours) dispatch via WhatsApp; 2-week review booked." }
        ],
        compliance: "Medical365 Cosmetic Procedure Records conform to the Indian Association of Dermatologists, Venereologists and Leprologists (IADVL) aesthetic task force guidelines and CDSCO medical device regulations.\n\nAll facial mapping records, product batch numbers, and photographic consents are secured with AES-256 encryption compliant with the DPDP Act 2023. Patient aesthetic records integrate with ABDM health lockers.",
        table: [
            { feature: "Injection Documentation", manual: "Handwritten notes like 'Botox 30U given' without anatomical mapping", m365: "Interactive visual facial map detailing exact units per injection site" },
            { feature: "Product Lot Traceability", manual: "Peeling barcode stickers and pasting in register; easily misplaced", m365: "Digital barcode scanning auto-binding serial numbers to patient record" },
            { feature: "Vascular Safety Aspiration", manual: "Often unrecorded in paper charts; high legal risk during complications", m365: "Mandatory clinical check verifying negative blood aspiration before filler delivery" },
            { feature: "Informed Consent Security", manual: "Paper consent easily disputed during aesthetic asymmetry complaints", m365: "Legally binding digital consent with tablet signature and time audit trail" },
            { feature: "Touch-Up Scheduling", manual: "Patient calls randomly weeks later; clinic staff unsure what was promised", m365: "Automated 2-week follow-up booking to evaluate symmetry and touch-ups" }
        ],
        faqs: [
            { q: "How does the visual facial injection map work?", a: "Clinicians use an interactive high-definition face diagram on their tablet. Tapping specific anatomical sites (e.g., corrugators, orbicularis oculi, lips) allows the doctor to drop color-coded injection pins and specify the exact units (for Botox) or volume in milliliters (for fillers)." },
            { q: "Which injectable brands are supported by the barcode scanner?", a: "Medical365 supports all major commercial injectables in India, including Allergan Botox, Dysport, Xeomin, Juvederm (Ultra, Voluma, Volux), Restylane, Belotero, Profhilo, and Sculptra." },
            { q: "How does the software protect doctors during aesthetic litigation?", a: "The software captures mandatory pre-procedure multi-angle baseline photographs, records exact product lot numbers, documents negative blood aspiration checks, and secures legally binding digital informed consent forms." },
            { q: "Can Platelet-Rich Plasma (PRP) treatments for hair loss be documented?", a: "Yes. The PRP module logs blood draw volume, anticoagulant (ACD-A), centrifuge RPM and duration, platelet concentration factor, activation agent (Calcium Chloride), and scalp injection grids." },
            { q: "How are post-injection care guidelines shared with the patient?", a: "The moment the procedure note is signed, an automated WhatsApp message delivers visual post-procedure advice (e.g. keeping head upright for 4 hours, avoiding strenuous workouts and saunas for 24 hours)." },
            { q: "Can aesthetic clinics manage retail skincare product sales on the same bill?", a: "Yes. The billing engine supports retail POS inventory for specialized cosmeceuticals (sunblocks, peptide serums, retinol creams) on the same GST-compliant invoice." }
        ]
    },

    "allergy-tracking": {
        cluster: "DERMATOLOGY",
        title: "Allergy Tracking & Patch Testing Software | Dermatology EMR | Medical365",
        h1: "Allergy Tracking, Patch Testing & Skin Prick Test Software",
        metaDesc: "Medical365 allergy tracking software documents skin prick tests, patch test reaction grades (+ to +++), drug allergies & ABDM health alerts for dermatology clinics.",
        diagramTitle: "Dermatology Allergy Testing & Patch Test Clinical Pipeline",
        nodes: ["Allergy Clinical History Intake", "Patch Test / Skin Prick Application", "48h & 72h Reaction Reading", "Automated Allergen Avoidance Engine", "Patient Allergy Card & EMR Alert"],
        color: "#ec4899",
        quickAnswer: "Allergy tracking software is a specialized clinical allergy and contact dermatitis documentation module. It manages Skin Prick Testing (SPT) for aeroallergens and food allergies, standardizes European and Indian Standard Series Patch Testing (+ to +++ reaction grading at 48h and 72h), triggers instant system-wide drug allergy alerts, and generates personalized allergen avoidance guides.",
        bgText: "Allergic contact dermatitis, atopic eczema, chronic urticaria, and drug hypersensitivity reactions represent a massive clinical burden in Indian dermatology. Thousands of patients suffer from chronic, unexplained dermatitis triggered by occupational allergens, hair dyes (PPD), cosmetics, fragrance mixes, topical medicaments, or leather tanning chemicals (potassium dichromate).\n\nIdentifying culprit contact allergens requires structured diagnostic testing: applying standardized patch test panels to the patient's upper back, leaving them under occlusion for 48 hours, and performing serial readings at 48 hours, 72 hours, and sometimes 7 days. In conventional paper records, documenting dozens of individual allergen test spots is cumbersome and chaotic. Crucially, when severe adverse drug reactions (e.g. Stevens-Johnson Syndrome, DRESS, or severe penicillin anaphylaxis) are documented on loose paper files, the warning is invisible when the patient visits other hospital departments, creating life-threatening risks.\n\nMedical365's Allergy Tracking module standardizes diagnostic patch testing and enforces system-wide allergy vigilance. Equipped with pre-configured Indian Standard Patch Test series grids, automated ICD-10 cross-reactivity alerts, and prominent banner warnings across all hospital screens, Medical365 ensures uncompromised patient safety.",
        capabilities: [
            { title: "Indian Standard Series (ISSI) Patch Test Grid", text: "Pre-configured digital testing templates for the Indian Standard Series patch test (30 common allergens including Nickel, Fragrance mix, PPD, Neomycin, Colophony, Epoxy resin, and Parthenium)." },
            { title: "Standardized ICDRG Patch Reaction Grading (+ to +++)", text: "Structures reaction scoring at 48h and 72h based on International Contact Dermatitis Research Group criteria: ? (doubtful), + (weak erythema/papules), ++ (strong vesicles), +++ (extreme bullous), and IR (irritant)." },
            { title: "Skin Prick Testing (SPT) Wheal-and-Flare Engine", text: "Records millimeter wheal and flare diameters compared against positive (Histamine) and negative (Saline) controls for food allergens, dust mites, pollens, and fungal molds." },
            { title: "System-Wide Severe Drug Allergy Banner Alerts", text: "Documents confirmed drug allergies (Penicillins, Cephalosporins, NSAIDs, Sulfonamides); displays an unmissable red banner across all hospital OPD, IPD, and pharmacy screens." },
            { title: "Automated Allergen Avoidance Guide Generator", text: "Selecting a positive allergen (e.g. Paraphenylenediamine PPD) auto-generates comprehensive consumer product avoidance lists (hair dyes, temporary tattoos) sent via WhatsApp." },
            { title: "Digital Patient Emergency Allergy Passport", text: "Issues a verified digital allergy card accessible on the patient's mobile device detailing confirmed allergies, reaction severity, and emergency antihistamine/epinephrine guidance." }
        ],
        workflowSteps: [
            { step: "Allergy History & Series Application", desc: "Dermatologist reviews exposure history; technician applies allergen chambers to upper back with anatomical tape mapping." },
            { step: "48-Hour Chamber Removal & First Reading", desc: "Tape removed at 48 hours; clinician grades erythema, papules, and vesicles (+ to +++) on the digital grid." },
            { step: "72-Hour Confirmatory Reading", desc: "Second reading differentiates true allergic crescendo responses from decrescendo irritant reactions." },
            { step: "Cross-Reactivity Analysis", desc: "Software cross-references positive allergens, flagging hidden chemical names in cosmetics and pharmaceuticals." },
            { step: "Allergy Passport & EMR Banner Activation", desc: "Confirmed allergens permanently bind to patient EMR banner and dispatch to patient's Ayushman Bharat Health Account." }
        ],
        compliance: "Medical365 Allergy Tracking conforms to International Contact Dermatitis Research Group (ICDRG) criteria, Contact and Occupational Dermatoses Forum of India (CODFI) guidelines, and MoHFW EHR standards.\n\nAll allergy records, reaction logs, and patient safety alerts are encrypted under AES-256 compliant with the DPDP Act 2023. Confirmed allergies integrate with national ABDM health lockers.",
        table: [
            { feature: "Patch Test Grid", manual: "Handwriting dozens of chemical names on paper slips; easily confused", m365: "Pre-configured digital Indian Standard Series grid with 1-click grading" },
            { feature: "Reaction Grading", manual: "Subjective shorthand descriptions without standard ICDRG definitions", m365: "Standardized ICDRG scoring (+ to +++) at both 48-hour and 72-hour intervals" },
            { feature: "Drug Allergy Visibility", manual: "Written on paper file; invisible to doctor in casualty or surgery", m365: "Prominent red safety banner visible across all hospital departments and pharmacy" },
            { feature: "Allergen Avoidance Lists", manual: "Doctor must verbally explain or write complex chemical names", m365: "Automated consumer product avoidance guides dispatched via WhatsApp" },
            { feature: "Emergency Identification", manual: "Paper card easily lost; patient arrives unconscious without allergy record", m365: "Digital Emergency Allergy Passport stored on patient smartphone" }
        ],
        faqs: [
            { q: "What patch test series are pre-loaded into the software?", a: "Medical365 includes the official Contact and Occupational Dermatoses Forum of India (CODFI) Indian Standard Series (30 allergens), the European Baseline Series, and specialized series for Cosmetics, Dental Materials, and Footwear allergens." },
            { q: "How does the system alert doctors if they prescribe an allergic medication?", a: "If a physician attempts to prescribe a medication to which the patient has a documented allergy (or an agent with known cross-reactivity, such as Amoxicillin in a Penicillin-allergic patient), the software displays a hard clinical alert blocking prescription completion." },
            { q: "Can Skin Prick Test (SPT) wheal sizes be recorded?", a: "Yes. Clinicians record millimeter wheal and flare diameters for each allergen alongside histamine and saline controls, automatically calculating the allergen-to-histamine ratio." },
            { q: "How are consumer product avoidance guides generated for patients?", a: "When an allergen like Nickel or Fragrance Mix is confirmed positive, the software generates an illustrated patient guide listing everyday items containing the allergen and safe alternative products." },
            { q: "Can patients access their verified allergy card on their mobile phones?", a: "Yes. Patients and emergency physicians can view the official Digital Allergy Card on the Medical365 patient app, displaying confirmed allergens and recommended emergency care." },
            { q: "Does the system support photo attachment of positive patch test reactions?", a: "Yes. Dermatologists can photograph positive ++ or +++ reactions at 48h and 72h; photos link directly to the corresponding chemical name on the digital patch test scorecard." }
        ]
    }
};

const done = buildPages(batch3aData, repoRoot, diagramDir);
console.log(`=== BATCH 3A SUCCESS: Generated ${done} Dental & Dermatology pages! ===`);


module.exports = batch3aData;
