const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const diagramDir = path.join(repoRoot, 'images/diagrams');
if (!fs.existsSync(diagramDir)) fs.mkdirSync(diagramDir, { recursive: true });

console.log('=== EXECUTING BATCH 1: CARDIOLOGY (8 PAGES) + ORTHOPEDICS (6 PAGES) ===');

// Master deep data for Batch 1
const batch1Data = {
    // 1. CARDIOLOGY
    "ecg-ekg-integration": {
        cluster: "CARDIOLOGY",
        title: "ECG EKG Integration Software India | Cardiology EMR Sync | Medical365",
        h1: "ECG & EKG Machine Integration Software for Hospitals",
        metaDesc: "Medical365 ECG/EKG integration software connects 12-lead machines directly to hospital EMR. Automatic waveform sync, DICOM export, and ABDM compliance.",
        diagramTitle: "12-Lead ECG Machine to EMR Integration Architecture",
        nodes: ["12-Lead ECG Device", "DICOM / HL7 Gateway", "Medical365 Core EMR", "Cardiologist Review & Sign-Off", "ABDM Health Locker"],
        color: "#dc2626",
        quickAnswer: "ECG EKG integration software is a specialized clinical healthcare technology that digitally interfaces electrocardiograph diagnostic equipment directly with hospital electronic medical records (EMR) and hospital information management systems (HIMS). Instead of printing thermal paper strips that fade, get misplaced, or require manual scanning, the integration software captures 12-lead digital waveforms, automated rhythm metrics (PR interval, QRS duration, QT/QTc), and clinician interpretations in real time, synchronizing them directly to the patient electronic health profile.",
        bgText: `Cardiovascular disease remains the leading cause of mortality across India, accounting for over 28% of all deaths. In Indian tertiary care centers, government civil hospitals, and bustling private cardiology clinics, outpatient departments often conduct dozens of electrocardiograms daily. Historically, the clinical workflow has relied on thermal paper printouts handed to patients or taped into paper files. 

This analog workflow introduces significant clinical vulnerabilities: thermal paper deteriorates and fades over time, physical traces frequently get misplaced during emergency transfers, and comparison between historical baseline ECGs and acute presentations is slow and error-prone. Furthermore, multi-branch hospital chains and tele-cardiology networks struggle to provide remote expert interpretations without immediate digital waveform access.

Medical365's ECG/EKG integration module solves these systemic bottlenecks by interfacing modern resting ECG machines, ambulatory telemetry, and stress ECG carts directly into a centralized, ABDM-compliant cloud healthcare infrastructure. By utilizing universal medical interoperability standards including DICOM-ECG (Supplement 30) and HL7 v2/FHIR observation resources, Medical365 allows cardiologists, emergency physicians, and intensivists to instantly review high-fidelity, zoomable waveforms from any authorized desktop, tablet, or smartphone terminal.`,
        capabilities: [
            { title: "Direct 12-Lead Digital Waveform Ingestion", text: "Interfaces via LAN, Wi-Fi, or serial RS-232 gateways with major diagnostic ECG hardware (including GE Healthcare, Philips, Schiller, BPL Medical Technologies, Mindray, and Contec). Captures raw voltage-time vectors for Leads I, II, III, aVR, aVL, aVF, and V1-V6 at standard calibration (10 mm/mV, 25 mm/s)." },
            { title: "Automated Parameter & Rhythm Vector Parsing", text: "Extracts machine-calculated intervals including Heart Rate, P-wave duration, PR interval, QRS complex width, QT/QTc intervals (Bazett and Fridericia formulas), and frontal electrical axes (P-QRS-T), auto-populating structured clinical consultation fields." },
            { title: "Interactive Zero-Footprint Waveform Viewer", text: "Provides clinicians with browser-based calibrated caliper tools to measure interval durations, ST-segment elevation or depression in millimeters, voltage criteria for left ventricular hypertrophy (Sokolow-Lyon index), and rhythm regularity without installing external desktop clients." },
            { title: "Side-by-Side Longitudinal Comparison", text: "Allows instant split-screen comparison between a patient's historical baseline ECG and current acute presentation to rapidly detect new ischemic changes, dynamic T-wave inversions, or evolving bundle branch blocks within critical emergency timeframes." },
            { title: "Digital Cardiological Sign-Off & Tele-Reporting", text: "Enables duty cardiologists to apply standardized diagnostic coding, review automated machine provisional statements, edit interpretations, and attach cryptographic digital signatures compliant with Indian Information Technology Act standards." },
            { title: "ABDM Ayushman Bharat Digital Mission Interoperability", text: "Converts finalized ECG diagnostic records into standardized FHIR DiagnosticReport packages, allowing automated binding to the patient's Ayushman Bharat Health Account (ABHA) for seamless longitudinal retrieval across Indian healthcare providers." }
        ],
        workflowSteps: [
            { step: "Order Generation", desc: "Clinician requests an ECG from OPD, IPD ward, or emergency triage; an automated worklist entry is generated with unique patient UHID." },
            { step: "Lead Placement & Acquisition", desc: "Technician executes 12-lead trace; modern ECG unit queries Medical365 DICOM Modality Worklist (MWL) to auto-match patient demographics." },
            { step: "Real-Time Cloud Synchronization", desc: "The raw digital trace file (DICOM or XML) streams over encrypted TLS 1.3 to Medical365's clinical vault within seconds of test completion." },
            { step: "Cardiologist Interpretation", desc: "Cardiologist reviews rhythm strips using calibrated on-screen calipers, modifies automated rhythm notes, and signs off." },
            { step: "Instant Report & EMR Distribution", desc: "Final PDF and interactive waveform link instantly attach to patient EMR, trigger doctor WhatsApp notification, and publish to ABHA locker." }
        ],
        compliance: `Medical365 ECG Integration operates under rigorous regulatory and data privacy frameworks mandated by Indian healthcare legislation. All stored waveform archives are encrypted using AES-256 at rest and TLS 1.3 in transit, satisfying the statutory requirements of the Digital Personal Data Protection (DPDP) Act 2023. 

The architecture strictly adheres to the Ministry of Health and Family Welfare (MoHFW) Electronic Health Record (EHR) Standards for India, implementing SNOMED-CT terminology for cardiology findings and LOINC codes for diagnostic measurements (LOINC 11524-6 for 12-lead ECG report). Furthermore, by generating M1, M2, and M3 ABDM milestones, hospitals using Medical365 ensure seamless compliance with National Health Authority (NHA) digital incentive schemes and NABH digital medical record documentation standards.`,
        table: [
            { feature: "Trace Storage Format", manual: "Fading thermal paper strips pasted into paper folders", m365: "Permanent, lossless digital DICOM/vector waveform storage" },
            { feature: "Baseline Comparison", manual: "Physically searching hospital archives for old paper files (30+ min)", m365: "1-click split-screen historical ECG comparison (3 seconds)" },
            { feature: "Remote Reporting", manual: "Taking smartphone photos of thermal paper and sending on WhatsApp", m365: "Calibrated, zero-footprint web viewer with digital caliper tools" },
            { feature: "Transcription Errors", manual: "High risk of manual data entry errors for heart rate and intervals", m365: "Zero transcription: direct automated parsing from device to EMR" },
            { feature: "Patient Portability", manual: "Patient must carry paper files; easily lost during emergencies", m365: "Instant ABDM ABHA health locker synchronization" }
        ],
        faqs: [
            { q: "Which ECG machine brands are compatible with Medical365?", a: "Medical365 supports all major ECG hardware manufacturers utilized in Indian healthcare facilities, including GE Healthcare (MAC series), Philips (PageWriter), Schiller (Cardiovit), BPL Medical Technologies, Mindray, Contec, and RMS. Integration operates via standard DICOM-ECG, HL7, or proprietary XML/PDF export gateways." },
            { q: "Can doctors measure intervals and ST elevations accurately on mobile screens?", a: "Yes. Medical365 features a zero-footprint HTML5 calibrated waveform viewer equipped with digital caliper measurement tools. Doctors can zoom into individual leads, adjust gain (5, 10, 20 mm/mV) and paper speed (25, 50 mm/s), and measure PR, QRS, QT, and ST deviations down to millisecond accuracy." },
            { q: "Does the system maintain patient data privacy under the DPDP Act 2023?", a: "Yes. All diagnostic waveforms, cardiological clinical notes, and patient identifiers are encrypted end-to-end with AES-256 encryption at rest and TLS 1.3 in transit. Access is governed by strict role-based access controls (RBAC) and immutable audit logging compliant with the DPDP Act 2023." },
            { q: "How does ECG integration help hospitals achieve NABH accreditation?", a: "NABH digital health standards require tamper-proof clinical records, standardized documentation of critical test results, and clear identification of reporting consultants. Medical365 ensures complete traceability from technician acquisition to cardiologist electronic signature with time-stamped audit logs." },
            { q: "Can emergency physicians access ECGs remotely before a patient arrives?", a: "Yes. Through tele-ECG synchronization, rural clinics or ambulances can transmit digital ECG traces directly to the central tertiary hospital's emergency dashboard, enabling cardiologists to confirm STEMI and activate the cardiac cath lab before patient arrival." },
            { q: "Does the software support pediatric ECG lead configurations and calculations?", a: "Yes. Medical365 accommodates both adult and pediatric 12-lead ECG traces, adjusting normative QTc calculation thresholds and providing specialized pediatric cardiology consultation note templates." }
        ]
    },

    // 2. ECHOCARDIOGRAPHY REPORTS
    "echocardiography-reports": {
        cluster: "CARDIOLOGY",
        title: "Echocardiography Reporting Software India | 2D Echo EMR | Medical365",
        h1: "Echocardiography Reporting Software & 2D Echo Management",
        metaDesc: "Medical365 echocardiography reporting software simplifies 2D Echo and Color Doppler documentation. Automated EF calculation, DICOM loop storage & ABDM compliant.",
        diagramTitle: "Echocardiography DICOM & Reporting Workflow Architecture",
        nodes: ["Ultrasound System", "DICOM Image & Video PACS", "Measurement Parsing Engine", "Cardiologist 2D Echo Report", "EMR & Patient Portal"],
        color: "#dc2626",
        quickAnswer: "Echocardiography reporting software is a specialized clinical cardiology reporting application that automates the documentation of transthoracic (TTE), transesophageal (TEE), and stress echocardiograms. It integrates ultrasound equipment with hospital EMR systems to automatically import chamber measurements, calculate ejection fraction (EF), record valvular Doppler velocities, and store high-resolution cine loops within the patient electronic chart.",
        bgText: `Echocardiography is the cornerstone of non-invasive cardiac imaging in modern clinical practice. In Indian healthcare institutions, from high-volume private diagnostic chains to specialty cardiac hospitals, cardiologists perform hundreds of 2D Echo and Color Doppler examinations each week to assess heart failure, valvular heart diseases, ischemic cardiomyopathy, and congenital cardiac anomalies.

Traditionally, generating an echocardiography report has been a labor-intensive, error-prone task. Technicians and cardiologists frequently type dozens of manual anatomical measurements—such as left ventricular internal dimensions (LVIDd, LVIDs), wall thickness (IVSd, LVPWd), aortic root dimensions, and Doppler inflow velocities—from ultrasound machine screen freezes onto paper forms or generic word processors. This manual transcription invites clinical errors, consumes valuable consultant time, and separates hemodynamic measurements from the patient's broader EMR clinical history.

Medical365's Echocardiography Reporting module revolutionizes this workflow through automated DICOM Structured Reporting (DICOM-SR) parsing and standardized ASE (American Society of Echocardiography) compliant report templates. By auto-populating chamber quantifications, calculating left ventricular ejection fraction via Teichholz and biplane Simpson's methods, and archiving representative Doppler waveforms and motion clips, Medical365 elevates reporting quality while saving cardiologists up to 15 minutes per study.`,
        capabilities: [
            { title: "Automated DICOM-SR Parameter Ingestion", text: "Automatically extracts quantitative measurements from GE, Philips, Siemens, and Mindray ultrasound systems via DICOM Structured Reporting (SR), instantly filling chamber dimensions, wall thicknesses, and Doppler gradient parameters." },
            { title: "Comprehensive Ejection Fraction (EF) Calculation", text: "Supports automated calculation of left ventricular ejection fraction using Teichholz formulas as well as biplane Simpson's rule of discs, ensuring accurate categorization of heart failure (HFrEF, HFmrEF, HFpEF)." },
            { title: "Valvular Morphology & Doppler Hemodynamics", text: "Includes dedicated assessment modules for Mitral, Aortic, Tricuspid, and Pulmonary valves. Documents regurgitant jet areas, vena contracta widths, mean pressure gradients, and valve area calculations (PHT and continuity equation)." },
            { title: "Diastolic Function & Strain Imaging Quantification", text: "Structures tissue Doppler imaging (TDI) evaluation (E/A ratio, E/e' ratio, deceleration time) to grade left ventricular diastolic dysfunction (Grade I through III) and records global longitudinal strain (GLS) percentages." },
            { title: "High-Resolution Cine-Loop PACS Integration", text: "Stores diagnostic DICOM video loops and static screen captures directly in secure cloud storage, allowing referring physicians and surgical teams to review cardiac wall motion abnormalities in motion." },
            { title: "Standardized ASE & BSE Reporting Templates", text: "Features pre-configured, customizable clinical templates adhering to American Society of Echocardiography (ASE) and British Society of Echocardiography guidelines, eliminating unstructured free-text ambiguity." }
        ],
        workflowSteps: [
            { step: "Ultrasound Study Execution", desc: "Sonographer or cardiologist conducts 2D Echo examination, recording standard parasternal, apical, and subcostal acoustic windows." },
            { step: "Automated Data Capture", desc: "Ultrasound console transmits DICOM-SR measurement packets and cine clips over hospital local network to Medical365 PACS gateway." },
            { step: "Intelligent Auto-Population", desc: "Software auto-fills chamber dimensions, calculates stroke volume and EF, and highlights values falling outside age-adjusted normative ranges." },
            { step: "Clinical Interpretation", desc: "Cardiologist reviews wall motion scoring, valvular regurgitation severity, selects structured diagnostic impressions, and signs electronically." },
            { step: "Distribution & Archival", desc: "Multi-page branded report with embedded high-resolution key frames dispatches to EMR chart, referring physician, and patient health locker." }
        ],
        compliance: `Medical365 Echocardiography Reporting is designed in accordance with Indian healthcare regulations and global medical informatics standards. The platform conforms to the Pre-Conception and Pre-Natal Diagnostic Techniques (PC-PNDT) regulatory frameworks where applicable, ensuring comprehensive audit logs of all ultrasound machine interactions and operator credentials.

All echocardiography imaging files and cine loops are archived in full compliance with DICOM Part 10 standards, and reports are mapped to SNOMED-CT clinical terms for cardiovascular anomalies and LOINC diagnostic codes. Data transmission is secured using TLS 1.3 encryption, and patient clinical records are preserved in full alignment with the DPDP Act 2023 and NABH digital health documentation criteria.`,
        table: [
            { feature: "Measurement Data Entry", manual: "Manual typing of 30+ anatomical numbers from machine screen freeze", m365: "100% automated DICOM-SR parsing directly into report fields" },
            { feature: "Ejection Fraction Calculation", manual: "Manual calculation or external estimation prone to discrepancies", m365: "Automated Teichholz & biplane Simpson rule calculation" },
            { feature: "Image & Clip Access", manual: "Thermal paper photo prints or CD-ROMs given to patients", m365: "Cloud DICOM cine-loop viewer accessible from any device" },
            { feature: "Report Generation Time", manual: "15–20 minutes per patient typing and formatting documents", m365: "Under 3 minutes with pre-structured diagnostic templates" },
            { feature: "Integration with EMR", manual: "Paper report filed in physical folder; invisible to OPD doctors", m365: "Instantly synchronized with patient longitudinal EMR profile" }
        ],
        faqs: [
            { q: "Does the software support automated Simpson's biplane ejection fraction calculation?", a: "Yes. When measurements are acquired on the ultrasound machine using biplane Simpson's methods, Medical365's DICOM-SR engine automatically extracts end-diastolic and end-systolic volumes (EDV, ESV) and populates the calculated ejection fraction directly into the report." },
            { q: "Can pediatric and congenital echocardiography studies be documented?", a: "Yes. Medical365 includes specialized pediatric and congenital echocardiography templates covering atrial septal defects (ASD), ventricular septal defects (VSD), patent ductus arteriosus (PDA), and complex anatomical shunts with pediatric z-score references." },
            { q: "How are video cine loops stored and viewed?", a: "High-resolution multi-frame DICOM clips are compressed using lossless medical codecs and stored in encrypted cloud object storage. Clinicians can review full-motion cine loops at native 30/60 fps using our zero-footprint web viewer without third-party plugins." },
            { q: "Can we customize echocardiography report templates with our hospital branding?", a: "Yes. Hospitals can customize headers, logos, doctor digital signatures, font formatting, normal reference ranges, and pre-defined clinical comment macros to match institutional branding and reporting conventions." },
            { q: "Does the module integrate with third-party hospital PACS servers?", a: "Yes. Medical365 supports bidirectional DICOM communication (C-STORE, C-FIND, C-MOVE), allowing seamless integration with existing hospital PACS archives or operating as an independent cloud PACS." },
            { q: "Is the reporting software compliant with PC-PNDT regulations in India?", a: "Yes. For facilities utilizing multi-purpose ultrasound systems, Medical365 provides dedicated operator log registers, patient declaration tracking, and audit-ready records compliant with Indian PC-PNDT regulatory standards." }
        ]
    },

    // 3. STRESS TEST MANAGEMENT
    "stress-test-management": {
        cluster: "CARDIOLOGY",
        title: "Cardiac Stress Test Management Software | TMT EMR India | Medical365",
        h1: "Cardiac Stress Test & Treadmill Test (TMT) Management Software",
        metaDesc: "Medical365 cardiac stress test software manages Bruce protocol TMTs, METs calculation, real-time stage monitoring, and automated reporting for Indian hospitals.",
        diagramTitle: "Treadmill Exercise Stress Test Workflow Architecture",
        nodes: ["TMT Treadmill Console", "Stage & Vitals Tracking", "METs & Target HR Engine", "Cardiologist Stress Report", "EMR & Patient Summary"],
        color: "#dc2626",
        quickAnswer: "Cardiac stress test management software is a specialized clinical software module that digitizes and streamlines treadmill exercise testing (TMT), bicycle ergometry, and pharmacologic stress evaluations. It records stage-by-stage heart rate responses, blood pressure readings, workload in Metabolic Equivalents (METs), and electrocardiographic ST-segment shifts, automatically generating comprehensive diagnostic reports for coronary artery disease evaluation.",
        bgText: `Exercise stress testing, particularly the Treadmill Test (TMT), is one of the most widely prescribed non-invasive screening modalities for inducible myocardial ischemia in India. With urban and semi-urban populations experiencing an escalating incidence of early-onset coronary artery disease (CAD), cardiology outpatient departments and diagnostic facilities conduct high volumes of exercise stress examinations daily.

Managing treadmill stress testing involves capturing time-critical physiological data across multiple exercise stages: tracking baseline parameters, incremental workload stages (standard Bruce, modified Bruce, or Naughton protocols), peak exertion vitals, and post-exercise recovery intervals. Relying on paper charts and disconnected treadmill thermal printouts introduces documentation delays, increases the likelihood of transcription errors for double product and METs calculations, and complicates retrospective clinical audits.

Medical365's Cardiac Stress Test Management module integrates directly with diagnostic TMT hardware to record multi-stage exercise vitals, track target heart rate achievement percentages, calculate Duke Treadmill Scores (DTS), and correlate patient chest symptoms with ST-segment deviations. The software generates standardized, professional diagnostic reports that seamlessly attach to the patient's centralized electronic health record.`,
        capabilities: [
            { title: "Standardized Exercise Protocol Support", text: "Pre-configured templates for standard Bruce, Modified Bruce, Naughton, and Balke treadmill protocols, as well as customized bicycle ergometry stages, automatically adjusting speed and elevation milestones." },
            { title: "Automated Target Heart Rate & METs Calculation", text: "Computes age-predicted maximum heart rate (220 - age or Tanaka formula), target heart rate (85% threshold), double product (RPP = HR × SBP), and stage-wise Metabolic Equivalents (METs) in real time." },
            { title: "Duke Treadmill Score (DTS) Risk Stratification", text: "Automatically computes the Duke Treadmill Score based on exercise duration, ST-segment deviation magnitude, and exercise-induced angina index, stratifying patients into low, intermediate, or high 5-year cardiovascular risk categories." },
            { title: "Multi-Stage Electrocardiographic Tracking", text: "Documents stage-by-stage ST-segment changes (horizontal, downsloping, or upsloping depression and ST-elevation) across anterior, inferior, and lateral lead groups to pinpoint coronary vascular territories." },
            { title: "Arrhythmia & Ectopy Event Logging", text: "Enables technicians and doctors to log exercise-induced arrhythmias—including premature ventricular contractions (PVCs), ventricular tachycardia runs, or conduction delays—with linked timestamped waveform captures." },
            { title: "Recovery Phase Hemodynamic Monitoring", text: "Monitors heart rate recovery (HRR) at 1 and 2 minutes post-exercise as well as blood pressure normalization trends, flagging abnormal vagal reactivation and blunted chronotropic response." }
        ],
        workflowSteps: [
            { step: "Pre-Test Clinical Evaluation", desc: "Technician reviews resting baseline ECG, confirms absence of contraindications, records resting vitals, and verifies patient consent." },
            { step: "Protocol Execution & Stage Capture", desc: "Patient exercises on treadmill; software logs blood pressure, heart rate, symptoms (angina, dyspnea), and RPE scale at each 3-minute stage." },
            { step: "Peak Effort & Termination Logging", desc: "Records reason for test termination (target HR achieved, limiting chest pain, significant ST depression, fatigue, or hypertensive response)." },
            { step: "Recovery Phase Tracking", desc: "Continuously tracks heart rate reduction and rhythm normalization across 1-minute, 3-minute, and 5-minute recovery intervals." },
            { step: "Automated Reporting & EMR Sync", desc: "Duke Treadmill Score, summary graphs, and diagnostic conclusions are compiled into a digital report and synced to hospital EMR." }
        ],
        compliance: `Medical365 Stress Test Management complies fully with national and international cardiovascular assessment standards, including the American College of Cardiology / American Heart Association (ACC/AHA) guidelines for exercise testing and the Cardiological Society of India (CSI) practice advisories. 

All clinical records, exercise logs, and digital trace attachments are stored in an immutable, timestamped electronic vault protected by AES-256 encryption, adhering to the statutory requirements of the DPDP Act 2023. Seamless FHIR diagnostic report packaging allows instant linkage to the patient's Ayushman Bharat Health Account (ABHA) under ABDM compliance.`,
        table: [
            { feature: "Workload & METs Calculation", manual: "Manual lookup tables prone to mathematical and rounding errors", m365: "Automated real-time calculation based on speed, grade, and duration" },
            { feature: "Risk Stratification", manual: "Subjective risk notes without standardized prognostic scoring", m365: "Automated Duke Treadmill Score (DTS) with 5-year mortality risk" },
            { feature: "Test Documentation", manual: "Handwritten paper sheets stapled to thermal ECG strips", m365: "Structured digital multi-stage workflow with automated PDF generation" },
            { feature: "Recovery Analysis", manual: "Often omitted or incompletely recorded on paper charts", m365: "Systematic logging of 1-minute and 2-minute heart rate recovery" },
            { feature: "Cross-Department Access", manual: "Paper report must be hand-carried to the cardiologist's chamber", m365: "Instantly accessible on doctor's consultation screen and patient app" }
        ],
        faqs: [
            { q: "What is the Duke Treadmill Score and how does Medical365 calculate it?", a: "The Duke Treadmill Score (DTS) is a validated prognostic score calculated as: DTS = Exercise Time (mins) - (5 × ST deviation in mm) - (4 × Angina Index). Medical365 computes this score automatically, categorizing patients into Low Risk (score ≥ +5), Moderate Risk (-10 to +4), and High Risk (≤ -11)." },
            { q: "Can the software accommodate customized treadmill protocols?", a: "Yes. While standard Bruce and Modified Bruce protocols are most common, administrators can define custom speed, grade, and stage duration milestones for elderly, orthopedic, or specialized rehabilitation patients." },
            { q: "Does the module support pharmacologic stress testing (Dobutamine / Adenosine)?", a: "Yes. Medical365 includes dedicated pharmacologic stress testing templates with dosage infusion protocols (e.g., Dobutamine titration stages with Atropine rescue) and linked hemodynamic monitoring." },
            { q: "How are pre-test contraindications and patient consents documented?", a: "The software incorporates a pre-test safety checklist verifying the absence of absolute contraindications (recent acute MI, high-risk unstable angina, severe aortic stenosis) along with digital informed consent signature capture." },
            { q: "Can stress test reports be sent to patients via WhatsApp?", a: "Yes. Upon cardiologist electronic sign-off, finalized branded PDF reports can be automatically dispatched to patients via secure WhatsApp Business messaging and published to the patient portal." },
            { q: "Does the system link stress test findings to catheterization lab referrals?", a: "Yes. When a patient demonstrates high-risk ischemia or a positive TMT, the system enables 1-click generation of an interventional cath lab referral order within the unified hospital EMR." }
        ]
    },

    // 4. CARDIAC RISK SCORING
    "cardiac-risk-scoring": {
        cluster: "CARDIOLOGY",
        title: "Cardiac Risk Assessment Software | Cardiovascular Scoring EMR | Medical365",
        h1: "Cardiovascular Risk Scoring & Preventive Cardiology Software",
        metaDesc: "Medical365 cardiac risk scoring software automates 10-year ASCVD, Framingham, and QRISK calculations. Preventive cardiology screening for Indian clinics.",
        diagramTitle: "Automated Cardiovascular Risk Calculation Engine",
        nodes: ["Patient Demographics & Vitals", "Lab Lipid Biomarkers", "Risk Calculator Algorithm", "Cardiovascular Risk Score", "Clinical Guideline Statin Plan"],
        color: "#dc2626",
        quickAnswer: "Cardiac risk scoring software is a specialized clinical decision support tool that calculates a patient's probability of developing atherosclerotic cardiovascular disease (ASCVD), heart attack, or stroke over a 10-year or lifetime horizon. By integrating real-time demographic data, blood pressure measurements, lipid profiles, diabetes status, and smoking history directly from the EMR, it automates validated algorithms such as Framingham, ACC/AHA ASCVD, QRISK3, and WHO South Asian risk charts.",
        bgText: `South Asian populations, and Indians in particular, carry a disproportionately elevated genetic and metabolic susceptibility to premature coronary artery disease. Studies consistently demonstrate that myocardial infarctions in Indian individuals occur on average a decade earlier than in Western populations, often with higher rates of multi-vessel disease and sudden cardiac death despite lower conventional thresholds of obesity.

Despite this heightened vulnerability, primary and secondary cardiovascular risk assessment in Indian outpatient clinics is frequently hindered by time constraints. Calculating multi-factorial risk scores manually during busy 10-minute consultations is impractical. Consequently, opportunities for timely statin initiation, blood pressure intensification, and lifestyle interventions are missed until an acute coronary event manifests.

Medical365's Cardiac Risk Scoring module embeds automated risk calculators directly into the physician's electronic consultation screen. By continuously harvesting age, gender, systolic blood pressure, total cholesterol, HDL-C, diabetes diagnosis, and tobacco exposure from the patient's existing chart, Medical365 calculates precise 10-year cardiovascular event percentages, classifies risk tiers (Low, Borderline, Intermediate, High), and provides evidence-based guidance for preventive therapy.`,
        capabilities: [
            { title: "Multi-Algorithm Risk Calculation Engine", text: "Supports validated cardiovascular risk models including ACC/AHA Pooled Cohort ASCVD Risk Estimator, Framingham Risk Score, QRISK3, and WHO South Asian-specific cardiovascular risk charts." },
            { title: "Real-Time EMR Data Harvesting", text: "Eliminates manual data entry by automatically pulling the latest laboratory lipid values, recent clinic blood pressure readings, and documented medical co-morbidities from the patient chart." },
            { title: "Lifetime & 10-Year Risk Trajectory Modeling", text: "Calculates both immediate 10-year cardiovascular risk percentages as well as lifetime ASCVD risk trajectories, helping clinicians motivate younger patients with early dyslipidemia or pre-hypertension." },
            { title: "Evidence-Based Statin & Therapy Decision Support", text: "Provides automated clinical guideline prompts aligned with American College of Cardiology and Cardiological Society of India guidelines regarding moderate-intensity versus high-intensity statin indications." },
            { title: "Risk-Enhancing Factor Documentation", text: "Structures documentation of non-traditional risk amplifiers such as family history of premature CAD, elevated Lipoprotein(a), High-Sensitivity CRP (hs-CRP), metabolic syndrome, and chronic kidney disease." },
            { title: "Visual Patient Counseling Infographics", text: "Generates intuitive, color-coded visual risk infographics that physicians can share with patients during consultations to illustrate how quitting smoking or lowering LDL-C reduces their personalized event risk." }
        ],
        workflowSteps: [
            { step: "Patient Data Ingestion", desc: "During consultation, the engine auto-retrieves age, gender, systolic BP, smoking status, and latest lipid panel from EMR." },
            { step: "Algorithm Execution", desc: "Selected risk engine (ACC/AHA ASCVD, Framingham, or WHO South Asia) computes exact 10-year and lifetime risk percentages." },
            { step: "Risk Stratification & Categorization", desc: "Patient is stratified into Low (<5%), Borderline (5-7.4%), Intermediate (7.5-19.9%), or High (≥20%) cardiovascular risk tier." },
            { step: "Guideline Statin & Lifestyle Prompts", desc: "Software displays evidence-based recommendations for lifestyle counseling, statin intensity, and blood pressure targets." },
            { step: "Patient Counseling & Follow-up Tracking", desc: "Visual risk report prints or sends via WhatsApp, scheduling automated recall visits to track risk score reductions over time." }
        ],
        compliance: `The Medical365 Cardiac Risk Scoring engine adheres strictly to established clinical practice guidelines, incorporating validated computational models approved by the American College of Cardiology (ACC), American Heart Association (AHA), and the Cardiological Society of India (CSI). 

All clinical calculations and decision support prompts are recorded in timestamped consultation logs with full clinician override capabilities, satisfying the clinical governance requirements of NABH. Patient biomarker data is protected under AES-256 encryption compliant with the DPDP Act 2023, and generated preventive care plans are fully compatible with ABDM digital health summaries.`,
        table: [
            { feature: "Risk Calculation Method", manual: "Manual calculation using external web tools or paper charts (3-5 min)", m365: "Instant automated background calculation during EMR consultation (0 sec)" },
            { feature: "Data Retrieval", manual: "Doctor must search past lab reports to find lipid and glucose numbers", m365: "Auto-harvested directly from centralized hospital laboratory database" },
            { feature: "South Asian Calibration", manual: "Often ignored; generic Western risk models applied without adjustment", m365: "Incorporates South Asian risk multipliers and WHO regional charts" },
            { feature: "Guideline Decision Support", manual: "Physician must remember complex statin indication criteria", m365: "Automated prompts recommending statin intensity based on risk tier" },
            { feature: "Patient Engagement", manual: "Abstract verbal explanations of cholesterol numbers", m365: "Visual color-coded risk graphs shared via WhatsApp to drive adherence" }
        ],
        faqs: [
            { q: "Why is specialized cardiac risk scoring critical for Indian patients?", a: "Indians have a high prevalence of premature coronary artery disease, elevated Lipoprotein(a), and visceral adiposity. Standard Western risk tools may underestimate risk unless calibrated with South Asian risk enhancers, which Medical365 incorporates natively." },
            { q: "Which risk calculation formulas does the software support?", a: "Medical365 includes the ACC/AHA 10-year ASCVD Risk Estimator, Framingham Risk Score, QRISK3, Reynolds Risk Score, and WHO South Asian Cardiovascular Risk Charts." },
            { q: "Can doctors override the automated clinical decision recommendations?", a: "Yes. Clinical decision support prompts are non-binding advisory tools designed to support clinical judgment. Doctors retain full autonomy to customize therapy, adjust targets, and document specific clinical rationales." },
            { q: "How does the system handle missing lab data like HDL or Total Cholesterol?", a: "If a recent lipid panel is absent from the patient's EMR, the system prompts the physician with an option to order a diagnostic lipid profile with 1 click or enter point-of-care test values." },
            { q: "Does the module track cardiovascular risk reduction over longitudinal visits?", a: "Yes. The software plots historical risk score trends across consultations, demonstrating tangible percentage reductions as patients achieve target blood pressure, quit smoking, and lower LDL levels." },
            { q: "Can patients view their cardiac risk scores on their mobile devices?", a: "Yes. An easy-to-understand visual summary of the patient's risk category and personalized lifestyle action plan can be published to the patient portal or shared via WhatsApp." }
        ]
    },

    // 5. ANGIOGRAPHY REPORTS
    "angiography-reports": {
        cluster: "CARDIOLOGY",
        title: "Coronary Angiography Reporting Software | Cath Lab EMR | Medical365",
        h1: "Coronary Angiography & Cath Lab Reporting Software",
        metaDesc: "Medical365 coronary angiography software streamlines cath lab reporting. Structured coronary anatomy mapping, stent inventory tracking & ABDM compliant.",
        diagramTitle: "Cardiac Cath Lab Angiography Reporting & Stent Tracking",
        nodes: ["Cath Lab X-Ray Fluoroscopy", "Coronary Anatomy Mapper", "Stent Barcode & Serial Registry", "Interventional Angio Report", "Inpatient Billing & EMR"],
        color: "#dc2626",
        quickAnswer: "Coronary angiography reporting software is a specialized cath lab documentation system designed for interventional cardiologists. It records coronary anatomical anatomy, lesion locations, vessel stenosis percentages, TIMI flow grades, and angioplasty intervention details (balloon dilatations, stent models, and serial numbers), generating structured, professional operative reports and maintaining a sterile surgical implant registry.",
        bgText: `Cardiac catheterization laboratories represent high-stakes, fast-paced clinical environments where interventional cardiologists diagnose and treat complex coronary artery disease, acute myocardial infarctions, and structural heart defects. In Indian cardiac specialty hospitals, cath labs operate around the clock, conducting diagnostic coronary angiograms (CAG) and percutaneous coronary interventions (PCI / angioplasty) under strict clinical timelines.

The documentation requirements for cardiac interventions are exhaustive: cardiologists must document access site (radial vs. femoral), coronary artery dominance, segment-by-segment stenosis percentages across the LAD, LCx, and RCA, pre- and post-intervention TIMI flow, contrast volume utilized, radiation fluoroscopy time, and exact stent specifications (diameter, length, serial numbers, and manufacturer lot codes). Relying on handwritten operatory notes or unlinked desktop templates creates documentation discrepancies, delays discharge summary generation, and introduces serious implant traceability gaps.

Medical365's Coronary Angiography Reporting module equips interventional cath labs with an interactive visual coronary tree editor, automated stent inventory barcode scanning, and structured operatory documentation. It transforms complex cath lab procedures into standardized, audit-ready clinical records that immediately synchronize with inpatient EMR, NABH implant registers, and hospital billing.`,
        capabilities: [
            { title: "Interactive Visual Coronary Tree Anatomy Editor", text: "Enables cardiologists to visually map coronary lesions on a standard 16-segment coronary anatomy model, plotting stenosis percentages, bifurcation classifications (Medina), and chronic total occlusions (CTO)." },
            { title: "Comprehensive PCI Intervention Logging", text: "Records percutaneous coronary intervention details: guiding catheter types, guide wires, pre-dilatation balloon pressures, post-dilatation NC balloons, and intra-vascular imaging findings (IVUS / OCT)." },
            { title: "Implant Traceability & Barcode Scanning", text: "Scans stent packaging barcodes to automatically record stent brand, model, diameter, length, lot number, and serial number directly into the patient's permanent surgical record and NABH implant register." },
            { title: "Hemodynamic & Fluoroscopy Safety Metrics", text: "Logs access site (Right Radial, Left Radial, Femoral), sheath size (5F, 6F, 7F), total fluoroscopy time (minutes), radiation Dose Area Product (DAP in Gy·cm²), and radiopaque contrast volume (ml)." },
            { title: "TIMI Flow & Myocardial Perfusion Grading", text: "Documents pre-intervention and post-intervention Thrombolysis in Myocardial Infarction (TIMI) flow grades (TIMI 0 to 3) and myocardial blush grades to evaluate reperfusion efficacy." },
            { title: "Automated Discharge Summary & Post-PCI Orders", text: "Auto-populates post-PCI monitoring orders, dual antiplatelet therapy (DAPT) regimens, puncture site care guidelines, and generates structured surgical discharge summaries in 1 click." }
        ],
        workflowSteps: [
            { step: "Patient Cath Lab Check-In", desc: "Pre-procedure check verifies informed consent, pre-op serum creatinine, baseline coagulation panel, and vascular access plan." },
            { step: "Diagnostic Angiogram Documentation", desc: "Cardiologist records vessel dominance, segmental lesion stenosis percentages, and decides on medical management vs. PCI." },
            { step: "PCI & Stent Implantation", desc: "Stent barcode is scanned at the sterile field; balloon pressures, deployment atmospheres, and post-dilatation are logged." },
            { step: "Immediate Operative Report Generation", desc: "Cardiologist confirms coronary diagrams, TIMI 3 flow outcomes, complications (if any), and electronically signs operatory note." },
            { step: "Implant Register & Billing Sync", desc: "Stent serial numbers automatically register in NABH implant tracker and transfer to hospital billing without manual data re-entry." }
        ],
        compliance: `Medical365 Coronary Angiography Reporting complies with Indian National Interventional Council (NIC) guidelines, National Pharmaceutical Pricing Authority (NPPA) stent pricing documentation mandates, and NABH surgical safety standards. Stent serial numbers and manufacturer lot details are permanently recorded in tamper-proof digital registries to ensure 100% implant traceability in case of medical device alerts or recalls.

The platform records radiation exposure metrics (fluoroscopy time and cumulative air kerma) in alignment with Atomic Energy Regulatory Board (AERB) patient safety advisories. All clinical data is encrypted via AES-256 compliant with the DPDP Act 2023 and formatted for seamless transmission to ABDM digital health records.`,
        table: [
            { feature: "Coronary Diagramming", manual: "Hand-drawn paper sketches prone to misinterpretation and fading", m365: "Interactive digital 16-segment coronary anatomy model with lesion markers" },
            { feature: "Stent Tracking", manual: "Cutting physical barcode stickers and pasting into paper charts", m365: "Digital barcode scanner integration into permanent searchable implant registry" },
            { feature: "Operative Note Turnaround", manual: "Written hours after procedure or dictated to third-party transcriptionists", m365: "Generated and electronically signed in the cath lab control room in 2 minutes" },
            { feature: "Radiation & Contrast Logging", manual: "Frequently omitted or recorded inconsistently on log sheets", m365: "Dedicated fields for fluoroscopy time, DAP radiation, and contrast volume" },
            { feature: "Billing Reconciliation", manual: "Manual paper slips sent to billing; high risk of unbilled consumables", m365: "Instant automated transfer of stents and catheters to hospital invoice" }
        ],
        faqs: [
            { q: "How does the software handle NPPA stent pricing and documentation rules in India?", a: "Medical365 automatically records stent brand, model, serial number, and category (Bare Metal Stent vs. Drug-Eluting Stent) in accordance with NPPA ceiling price guidelines, ensuring 100% compliance during billing and audits." },
            { q: "Can cardiologists attach intravascular ultrasound (IVUS) and OCT measurements?", a: "Yes. The module supports documentation of minimum lumen area (MLA), plaque burden percentages, stent expansion, and malapposition findings from IVUS and Optical Coherence Tomography (OCT)." },
            { q: "Does the system maintain an audit-ready NABH implant register?", a: "Yes. A dedicated hospital-wide implant register records every deployed stent with patient UHID, procedure date, operator, implant serial number, and manufacturer details, ready for instant NABH inspection." },
            { q: "Can reports be generated for peripheral and structural interventions?", a: "Yes. Beyond coronary angiograms, the module includes structured templates for peripheral angioplasty, renal stenting, carotid interventions, pacemaker implantations, and balloon mitral valvotomy (BMV)." },
            { q: "How are cath lab consumables and catheters tracked?", a: "Cath lab staff can log introducer sheaths, guide catheters, aspiration thrombectomy devices, and closure devices directly into the operatory record, automatically updating central pharmacy inventory." },
            { q: "Is the operatory report accessible to the post-op ICU team immediately?", a: "Yes. The moment the cardiologist signs the operative note in the cath lab control room, it is visible on ICU and CCU nursing station terminals with post-procedure puncture site monitoring protocols." }
        ]
    }
};

// Next, add the remaining 3 Cardiology + 6 Orthopedics pages
const remainingBatch1 = {
    // 6. PACEMAKER TRACKING
    "pacemaker-tracking": {
        cluster: "CARDIOLOGY",
        title: "Pacemaker Tracking Software | Cardiac Implant Registry | Medical365",
        h1: "Pacemaker & Cardiac Implantable Device Tracking Software",
        metaDesc: "Medical365 pacemaker tracking software manages CIED follow-ups, battery longevity, pacing thresholds & lead impedance for Indian hospitals. ABDM compliant.",
        diagramTitle: "Pacemaker & CIED Device Follow-Up Registry Architecture",
        nodes: ["Pacemaker Programmer", "Device Telemetry Parser", "Lead & Battery Clinic Registry", "Cardiologist Interrogation Note", "Patient Device ID Card"],
        color: "#dc2626",
        quickAnswer: "Pacemaker tracking software is a specialized clinical registry and interrogation documentation system designed for cardiology electrophysiology clinics. It tracks permanent pacemakers, implantable cardioverter-defibrillators (ICDs), and cardiac resynchronization therapy (CRT) devices, logging battery status, lead impedance, sensing and pacing thresholds, and programming parameters across regular follow-up visits.",
        bgText: `Cardiac implantable electronic devices (CIEDs)—including single-chamber and dual-chamber permanent pacemakers, ICDs, and biventricular CRT-D units—are life-sustaining therapies for hundreds of thousands of Indian cardiac patients. Ensuring patient safety over the lifetime of an implanted device requires meticulous, longitudinal clinical follow-up.

In traditional hospital practice, pacemaker follow-up is documented on disjointed paper programmer printouts, handwritten device clinic registers, and patient-held paper cards. When patients present to emergency rooms with syncope or device shocks, treating doctors frequently lack access to crucial device details: what model is implanted? When was it inserted? What are current battery voltages and estimated longevity? Are the leads showing signs of insulation failure or fracture?

Medical365's Pacemaker Tracking module establishes a centralized, digital device clinic registry. It records implantation surgical details, serial numbers of pulse generators and leads, interrogation telemetry trends (battery voltage, impedance, pacing thresholds), and manufacturer recall alerts, ensuring complete patient safety and immediate clinical visibility during emergency presentations.`,
        capabilities: [
            { title: "Comprehensive CIED Device Registry", text: "Maintains structured registries for Pacemakers (IPG), ICDs, CRT-P, and CRT-D devices from Medtronic, Abbott (St. Jude), Boston Scientific, and Biotronik, logging model numbers, serials, and implantation dates." },
            { title: "Lead Traceability & Specification Logging", text: "Tracks atrial and ventricular leads: manufacturer, model, fixation type (active vs. passive), polarity (unipolar vs. bipolar), and anatomical implantation position (RV apex, RV septum, His bundle, left bundle)." },
            { title: "Interrogation Telemetry Tracking", text: "Records serial follow-up metrics: battery voltage (V), battery impedance (Ω), estimated remaining longevity (months/years), sensing thresholds (mV), pacing capture thresholds (V at ms), and lead impedance trends." },
            { title: "Device Mode & Programming History", text: "Documents programmed pacing modes (DDDR, VVIR, CRT), lower and upper rate limits, AV delays, rate response settings, shock vector programming, and anti-tachycardia pacing (ATP) protocols." },
            { title: "Automated Device Recall & Safety Alerts", text: "Cross-references implanted generator and lead model numbers against manufacturer advisory notices and CDSCO medical device safety alerts, flagging affected patients for early review." },
            { title: "Digital Patient Device Identification Card", text: "Generates tamper-proof digital patient device cards containing implant details, doctor emergency contacts, and MRI safety guidelines accessible on the patient's mobile device." }
        ],
        workflowSteps: [
            { step: "Device Interrogation", desc: "Electrophysiologist or device technician interrogates pulse generator using device programmer in the outpatient device clinic." },
            { step: "Telemetry Data Entry", desc: "Battery voltage, lead impedance, pacing thresholds, and detected arrhythmia episodes are logged into structured clinic forms." },
            { step: "Longitudinal Trend Analysis", desc: "Software compares current impedance and thresholds against baseline to detect lead micro-dislodgement or insulation breaches." },
            { step: "Programming Adjustments", desc: "Any adjustments to pacing rate, voltage output, or sensitivity are documented with clinical justification." },
            { step: "Report & Next Visit Scheduling", desc: "Comprehensive interrogation summary generates, next follow-up appointment books, and updated device status reflects in EMR." }
        ],
        compliance: `Medical365 Pacemaker Tracking satisfies the strict implant traceability requirements established by the National Accreditation Board for Hospitals & Healthcare Providers (NABH) and the Central Drugs Standard Control Organisation (CDSCO). 

All device serial numbers, interrogation logs, and reprogramming records are encrypted via AES-256 and stored in compliance with the DPDP Act 2023. Seamless FHIR integration links device parameters into the patient's national Ayushman Bharat Health Account (ABHA).`,
        table: [
            { feature: "Device Registry", manual: "Paper register books or loose index cards at device clinic", m365: "Centralized, searchable cloud device registry accessible hospital-wide" },
            { feature: "Battery Longevity Tracking", manual: "Estimated manually by checking old thermal printout slips", m365: "Longitudinal graphing of battery voltage and impedance trends" },
            { feature: "Lead Failure Detection", manual: "Requires manually comparing handwritten impedance numbers across files", m365: "Automated visual alerts when lead impedance spikes or drops >200 Ω" },
            { feature: "Emergency Identification", manual: "Patient must carry paper card; unavailable if unconscious", m365: "Instant lookup in hospital EMR via patient phone number or UHID" },
            { feature: "MRI Safety Verification", manual: "Searching device manual to determine MR-conditional status", m365: "Automated flagging of MR-conditional status for generator and leads" }
        ],
        faqs: [
            { q: "How does the software alert clinicians to potential lead failure?", a: "Medical365 tracks lead impedance over time. If pacing impedance drops below 250 Ω (suggesting insulation defect) or rises above 1,500 Ω (suggesting lead fracture or loose set screw), the system triggers an immediate visual clinical warning." },
            { q: "Does the system track MRI conditional status for implanted devices?", a: "Yes. The registry records whether both the implanted pulse generator and all attached leads are MR-conditional, including specific magnet strength (1.5T / 3.0T) and SAR restrictions." },
            { q: "Can conduction system pacing (His bundle / LBB pacing) leads be documented?", a: "Yes. The software includes dedicated anatomical lead location tags for physiological conduction system pacing, including His-bundle pacing (HBP) and Left Bundle Branch Area Pacing (LBBAP)." },
            { q: "How are device arrhythmia episodes (AFib, VT/VF) documented?", a: "Clinicians can log arrhythmia burden percentages (e.g. daily AFib burden), non-sustained VT runs, and delivered therapies (anti-tachycardia pacing attempts or high-voltage defibrillation shocks)." },
            { q: "What happens when a manufacturer issues an advisory or recall?", a: "Administrators can search the device registry by model or lot number to instantly identify every patient implanted with the affected hardware, generating contact lists for urgent evaluation." },
            { q: "Can patients access their device card on their mobile phones?", a: "Yes. Patients and family members can view and present their digital device ID card—complete with model numbers, implant date, and emergency contact numbers—directly from the Medical365 patient mobile app." }
        ]
    },

    // 7. LIPID PROFILE TRACKING
    "lipid-profile-tracking": {
        cluster: "CARDIOLOGY",
        title: "Lipid Profile Tracking Software | Dyslipidemia EMR | Medical365",
        h1: "Lipid Profile Tracking & Dyslipidemia Management Software",
        metaDesc: "Medical365 lipid profile tracking software graphs cholesterol trends, LDL targets, and statin response for cardiology clinics. ABDM & DPDP compliant.",
        diagramTitle: "Lipid Profile Trend Analysis & Statin Optimization Architecture",
        nodes: ["Diagnostic Pathology LIMS", "Lipid Biomarker Parser", "Longitudinal Trend Engine", "Cardiologist Dyslipidemia Review", "Patient Diet & Statin Plan"],
        color: "#dc2626",
        quickAnswer: "Lipid profile tracking software is a specialized clinical monitoring module that analyzes and graphs longitudinal cholesterol and triglyceride trends over time. It extracts lab values (Total Cholesterol, LDL-C, HDL-C, Triglycerides, Non-HDL-C) from hospital and outpatient pathology systems, compares them against personalized cardiovascular risk-adjusted LDL targets, and evaluates patient response to lipid-lowering therapies.",
        bgText: `Dyslipidemia is an extraordinarily prevalent metabolic driver of atherosclerotic cardiovascular disease in India. Epidemiological studies reveal that over 75% of urban Indians exhibit at least one abnormal lipid parameter, characterized by the classic 'South Asian atherogenic dyslipidemia triad': low HDL-C, elevated triglycerides, and a high proportion of dense, atherogenic LDL particles.

In everyday clinical management, tracking a patient's response to dietary modifications, lifestyle changes, and statin or ezetimibe therapy requires reviewing lab panels conducted across multiple months or years. When lab results remain trapped in disconnected paper pathology slips or unindexed PDF attachments, clinicians cannot easily gauge therapeutic progress: has the patient achieved their risk-stratified LDL target of <55 mg/dL? Has statin intolerance occurred? Are triglycerides worsening despite therapy?

Medical365's Lipid Profile Tracking module solves this challenge by automatically parsing diagnostic lab panels into interactive, longitudinal trend graphs. It compares patient biomarkers against clinical target benchmarks, flags therapy non-adherence, monitors potential hepatic or muscle side-effects, and empowers cardiologists to practice precision lipid management.`,
        capabilities: [
            { title: "Automated LIMS Biomarker Ingestion", text: "Seamlessly pulls Total Cholesterol, LDL-C, HDL-C, Triglycerides, VLDL, and Non-HDL Cholesterol directly from hospital laboratory analyzers and external diagnostic labs via HL7 interfaces." },
            { title: "Risk-Stratified LDL-C Target Benchmark Visualizer", text: "Plots patient LDL-C levels against clinical guideline targets based on cardiovascular risk category: <55 mg/dL for extreme risk (post-ACS), <70 mg/dL for high risk, and <100 mg/dL for moderate risk." },
            { title: "Atherogenic Dyslipidemia Ratio Calculation", text: "Calculates critical atherogenic ratios automatically, including Total Cholesterol / HDL ratio, LDL / HDL ratio, and Triglyceride / HDL ratio, identifying insulin resistance and metabolic syndrome." },
            { title: "Statin & Non-Statin Response Tracking", text: "Correlates percentage reductions in LDL-C against specific drug regimens (Atorvastatin, Rosuvastatin, Ezetimibe, Bempedoic Acid, PCSK9 inhibitors), identifying hypo-responders and non-adherence." },
            { title: "Safety Biomarker Surveillance (SGOT / SGPT / CPK)", text: "Monitors baseline and follow-up liver enzymes (SGOT, SGPT) and creatine phosphokinase (CPK) to detect statin-associated transaminitis or myopathy early." },
            { title: "Interactive Longitudinal Progress Graphs", text: "Generates clear graphical timelines showing lipid changes over months and years that doctors can display to patients to encourage continued dietary and medication adherence." }
        ],
        workflowSteps: [
            { step: "Automated Lab Sync", desc: "Diagnostic lipid profile results stream into Medical365 from hospital laboratory or partner diagnostic center." },
            { step: "Ratio & Risk Calculation", desc: "Engine calculates non-HDL cholesterol, TG/HDL ratio, and checks whether LDL meets the patient's specific target." },
            { step: "Visual Consultation Review", desc: "During consultation, doctor views interactive multi-year trend graph showing lipid progression alongside current medications." },
            { step: "Therapy Titration & Decision", desc: "Doctor adjusts statin dose, adds combination therapy (Ezetimibe/Bempedoic Acid), or orders safety lab tests if indicated." },
            { step: "Patient Lifestyle Prescription", desc: "Graph summary, dietary goals, and next scheduled lipid re-check date are shared with the patient via WhatsApp and mobile app." }
        ],
        compliance: `Medical365 Lipid Profile Tracking aligns with the Lipid Association of India (LAI) consensus recommendations, the European Society of Cardiology (ESC) dyslipidemia guidelines, and Cardiological Society of India practice advisories. 

All laboratory values and consultation histories are stored under AES-256 encryption compliant with the DPDP Act 2023. Generated lab reports and clinical review summaries seamlessly synchronize with the patient's Ayushman Bharat Health Account (ABHA) under ABDM standards.`,
        table: [
            { feature: "Lipid Trend Analysis", manual: "Flipping through paper pathology printouts to compare past numbers", m365: "Interactive visual trend graph showing multi-year cholesterol trajectory" },
            { feature: "LDL Target Benchmarking", manual: "Mental calculation without visual guideline target lines", m365: "Color-coded target thresholds based on patient's specific risk category" },
            { feature: "Calculated Ratios", manual: "Manual division of Total/HDL or TG/HDL rarely done in OPD", m365: "Automated calculation of Non-HDL, LDL/HDL, and TG/HDL ratios" },
            { feature: "Therapy Correlation", manual: "Difficult to match specific medication changes to past lab dates", m365: "Drug dosage milestones plotted directly on the lipid timeline" },
            { feature: "Patient Adherence Motivation", manual: "Verbal reassurance with minimal visual engagement", m365: "Visual progress graphs shared to patient smartphone via WhatsApp" }
        ],
        faqs: [
            { q: "What LDL-C targets does the software use for Indian cardiovascular patients?", a: "Medical365 incorporates Lipid Association of India (LAI) benchmarks: <55 mg/dL for Extreme Risk (post-MI, multi-vessel CAD, diabetes with organ damage), <70 mg/dL for Very High Risk, and <100 mg/dL for High Risk." },
            { q: "Can the module calculate Non-HDL Cholesterol automatically?", a: "Yes. Non-HDL Cholesterol (Total Cholesterol minus HDL) is calculated automatically for every panel, providing a vital secondary target for patients with elevated triglycerides." },
            { q: "Does the system track specialized cardiovascular biomarkers like Lipoprotein(a)?", a: "Yes. Medical365 includes dedicated tracking fields for Lipoprotein(a), Apolipoprotein B (ApoB), and high-sensitivity C-reactive protein (hs-CRP)." },
            { q: "How does the software alert physicians to statin-induced muscle injury?", a: "If a patient's creatine phosphokinase (CPK) level rises above 3 to 5 times the upper limit of normal, the system displays a prominent safety alert advising medication review." },
            { q: "Can dietary and exercise goals be printed alongside the lipid report?", a: "Yes. Clinicians can select personalized dietary recommendations (e.g. saturated fat restriction, soluble fiber targets) that print directly on the patient's lipid consultation summary." },
            { q: "Does the system send automated reminders for follow-up lipid panels?", a: "Yes. When a new statin regimen is initiated, the system automatically schedules and sends a WhatsApp reminder for a 6-to-12-week repeat lipid and liver enzyme evaluation." }
        ]
    },

    // 8. CARDIAC HISTORY TEMPLATES
    "cardiac-history-templates": {
        cluster: "CARDIOLOGY",
        title: "Cardiology Clinical Documentation Templates | EMR Notes | Medical365",
        h1: "Cardiology Clinical Documentation Templates & SOAP Notes",
        metaDesc: "Medical365 cardiology clinical documentation templates standardize chest pain protocols, NYHA heart failure staging & pre-op cardiac clearance in hospital EMR.",
        diagramTitle: "Cardiology Structured Consultation & Clinical Note Workflow",
        nodes: ["Cardiology OPD / IPD Intake", "Structured Cardiac Template", "Clinical Decision Support Engine", "Cardiology Consultation Note", "EMR & Prescription Dispatch"],
        color: "#dc2626",
        quickAnswer: "Cardiology clinical documentation templates are structured, specialty-specific electronic medical record forms designed for adult and pediatric cardiologists. They replace unstructured free-text with standardized clinical evaluation fields for chest pain characterization, NYHA functional heart failure class, cardiovascular physical examination, cardiac risk factors, and evidence-based management plans.",
        bgText: `Clinical documentation in cardiology is uniquely demanding. A comprehensive cardiac evaluation must capture intricate symptom characteristics (chest pain quality, radiation, exacerbating factors), precise functional limitations (NYHA class I through IV), detailed physical examination signs (jugular venous distension, murmurs, gallops, peripheral edema), and complex polypharmacy regimens.

In high-volume Indian cardiology clinics, where doctors examine 40 to 80 patients per OPD session, typing long narrative notes or writing by hand on paper prescription pads leads to significant clinical variation and missing data. Key diagnostic details—such as radiation of pain to the jaw, presence of an S3 gallop, or family history of sudden death—often get omitted in the rush of outpatient practice.

Medical365's Cardiology Clinical Documentation module provides cardiologists with fast, structured SOAP (Subjective, Objective, Assessment, Plan) consultation templates. Equipped with 1-click clinical macros, anatomical murmur pickers, ICD-10 diagnostic coding, and automated prescription safety checks, Medical365 enables cardiologists to complete thorough, audit-ready clinical notes in under two minutes.`,
        capabilities: [
            { title: "Rapid Chest Pain Triaging & Characterization", text: "Structures chest pain evaluation using standard clinical parameters: onset, location, character (crushing, burning, pressure), radiation, duration, aggravating factors, and response to sublingual nitroglycerin." },
            { title: "NYHA & ACC/AHA Heart Failure Staging", text: "1-click classification of heart failure functional severity (NYHA Class I through IV) and ACC/AHA structural staging (Stage A through D) with automated clinical decision prompts for guideline-directed medical therapy (GDMT)." },
            { title: "Standardized Cardiovascular Examination Templates", text: "Structures physical examination findings: JVP elevation (in cm H2O), peripheral pulses, cardiac murmurs (grade I-VI, systolic/diastolic, radiation), abnormal heart sounds (S3, S4, clicks), and pulmonary rales." },
            { title: "Pre-Operative Cardiac Risk Clearance Module", text: "Incorporates Revised Cardiac Risk Index (Lee Index) and RCRI calculators for non-cardiac surgery clearance, providing structured documentation of perioperative risk and recommendations." },
            { title: "ICD-10 & SNOMED-CT Cardiology Terminology", text: "Instant auto-complete search for thousands of cardiovascular diagnoses, procedures, and symptoms mapped to standard ICD-10 and SNOMED-CT international clinical coding." },
            { title: "Customizable Clinical Macros & Quick Pickers", text: "Allows cardiologists to create personal clinical text macros and one-tap order sets for common presentations (e.g. stable angina, newly diagnosed hypertension, post-PCI follow-up)." }
        ],
        workflowSteps: [
            { step: "Patient Triage & Vitals", desc: "Nurse records blood pressure (both arms), pulse, SpO2, and BMI; data auto-loads into doctor's consultation view." },
            { step: "Template Selection", desc: "Doctor selects appropriate template: Routine Cardiology OPD, Acute Chest Pain, Heart Failure Follow-up, or Pre-Op Clearance." },
            { step: "Structured Examination", desc: "1-click pickers document cardiovascular exam findings, heart sounds, murmur characteristics, and peripheral signs." },
            { step: "Assessment & Coding", desc: "Primary diagnosis auto-codes to ICD-10; past diagnostic tests (ECG, Echo, TMT, Labs) are reviewed on the same screen." },
            { step: "Plan, Prescription & Handout", desc: "Cardiologist prescribes medications with automated drug interaction alerts, prints bilingual patient advice, and synchronizes with EMR." }
        ],
        compliance: `Medical365 Cardiology Clinical Documentation Templates conform strictly to the Electronic Health Record (EHR) Standards for India established by the Ministry of Health and Family Welfare (MoHFW), implementing SNOMED-CT for clinical findings and LOINC for diagnostic metrics. 

The structured notes meet all National Accreditation Board for Hospitals & Healthcare Providers (NABH) outpatient and inpatient documentation standards. All clinical consultation records are cryptographically timestamped and encrypted via AES-256 compliant with the DPDP Act 2023.`,
        table: [
            { feature: "Documentation Format", manual: "Handwritten paper prescription pads with illegible doctor handwriting", m365: "Standardized, structured digital SOAP notes with clean legible printing" },
            { feature: "Chest Pain Details", manual: "Often limited to 'chest pain since 2 days' without vital clinical qualifiers", m365: "Structured capture of radiation, character, severity (1-10), and triggers" },
            { feature: "Heart Failure Classification", manual: "Inconsistently documented; rarely updated across consecutive visits", m365: "Mandatory 1-click NYHA functional class and GDMT therapy tracking" },
            { feature: "Pre-Op Clearance", manual: "Unstructured 'fit for surgery' notes lacking objective risk calculations", m365: "Standardized Revised Cardiac Risk Index (RCRI) calculation documentation" },
            { feature: "Prescription Safety", manual: "No real-time drug interaction alerts; high risk of adverse reactions", m365: "Automatic alerts for dangerous cardiac drug-drug interactions (e.g. DOACs)" }
        ],
        faqs: [
            { q: "Can doctors customize the cardiology clinical templates?", a: "Yes. While Medical365 includes evidence-based standard templates, every doctor and cardiology department can easily modify fields, add institutional protocols, and create personalized quick-entry macros." },
            { q: "Does the software check for dangerous drug interactions during prescribing?", a: "Yes. When prescribing cardiac medications, the system automatically checks for drug-drug interactions (e.g. Amiodarone with Warfarin, Clopidogrel with Omeprazole), renal dose adjustments, and duplicate therapies." },
            { q: "How does the template handle hypertension follow-up visits?", a: "The hypertension follow-up template plots past blood pressure readings on a timeline, tracks anti-hypertensive medication adherence, and checks for end-organ damage screening (fundus exam, microalbuminuria)." },
            { q: "Can structured notes be dictated using speech-to-text?", a: "Yes. Medical365 includes built-in medical voice recognition optimized for Indian English accents and complex cardiovascular terminology." },
            { q: "Are consultation notes accessible to emergency doctors if the patient is admitted?", a: "Yes. Because Medical365 operates on a unified database, all outpatient consultation notes, ECGs, and echo reports are instantly visible on emergency and ICU screens upon patient arrival." },
            { q: "Can patients receive their consultation summary and prescription via WhatsApp?", a: "Yes. With a single click, a clean, tamper-proof digital prescription and diet/lifestyle advice sheet can be dispatched directly to the patient's verified WhatsApp number." }
        ]
    },

    // 9. X-RAY & IMAGING INTEGRATION (ORTHOPEDICS)
    "xray-imaging-integration": {
        cluster: "ORTHOPEDICS",
        title: "Orthopedic X-ray PACS Integration Software | Musculoskeletal EMR | Medical365",
        h1: "Orthopedic Digital X-ray & Musculoskeletal PACS Integration",
        metaDesc: "Medical365 orthopedic X-ray integration software connects CR/DR machines to orthopedic EMR. Calibrated calipers, Cobb angle measurements & ABDM compliant.",
        diagramTitle: "Orthopedic X-Ray CR/DR Machine to EMR Integration Architecture",
        nodes: ["Digital CR / DR Radiography", "Orthopedic DICOM PACS", "Calibrated Orthopedic Measurement Tools", "Surgeon Consultation & Templating", "EMR & Surgical Record"],
        color: "#d97706",
        quickAnswer: "Orthopedic X-ray PACS integration software is a specialized digital radiology integration module that links Computed Radiography (CR) and Digital Radiography (DR) X-ray systems directly into orthopedic outpatient consultation rooms and operation theaters. It provides orthopedic surgeons with calibrated caliper measurement tools, Cobb angle determination for scoliosis, joint space width analysis, and pre-operative prosthetic templating on high-resolution DICOM radiographs.",
        bgText: `Radiological imaging is the definitive diagnostic extension of the orthopedic physical examination. In Indian orthopedic clinics, trauma centers, and joint replacement hospitals, orthopedic surgeons review dozens of digital X-rays daily to evaluate bone fractures, arthritic joint degeneration, spinal deformities, and post-operative implant positioning.

In many hospitals, the radiology-orthopedic workflow remains frustratingly fragmented. Surgeons are forced to view compressed JPEG images on low-resolution monitors, wait for physical X-ray film printing, or switch between disconnected radiology workstations and the hospital EMR. Physical films are expensive, cumbersome to store, prone to fading or damage, and provide no calibrated digital measuring tools to calculate anatomical angles or implant sizing.

Medical365's Orthopedic X-ray Integration module eliminates these operational barriers by embedding a full-featured, zero-footprint DICOM PACS viewer directly into the orthopedic surgeon's consultation screen. With calibrated digital calipers, Cobb angle tools, femoral-tibial alignment measuring, and split-screen pre- and post-op comparisons, Medical365 delivers diagnostic precision right at the point of care.`,
        capabilities: [
            { title: "Zero-Footprint Web DICOM Viewer", text: "Browser-based, high-performance DICOM viewer that renders musculoskeletal radiographs in full 16-bit diagnostic depth without requiring heavy desktop workstation installations." },
            { title: "Calibrated Orthopedic Digital Calipers", text: "Allows precise linear and angle measurements calibrated against radiopaque calibration balls or known prosthetic dimensions to evaluate limb length discrepancy and bone union gap." },
            { title: "Cobb Angle & Spinal Alignment Tools", text: "Provides automated multi-line Cobb angle calculation tools for adolescent idiopathic scoliosis and kyphosis evaluation on full-spine standing radiographs." },
            { title: "Joint Space Width & Osteoarthritis Grading", text: "Enables quantitative measurement of medial and lateral knee joint space width (in millimeters) to accurately grade Kellgren-Lawrence osteoarthritis severity." },
            { title: "Pre-Operative Prosthetic Templating Support", text: "Allows orthopedic surgeons to overlay calibrated digital prosthetic templates (femoral stems, acetabular cups, tibial trays) on patient radiographs for surgical planning." },
            { title: "Split-Screen Pre-Op & Post-Op Comparison", text: "Displays historical injury radiographs side-by-side with post-reduction or post-surgical hardware fixation X-rays to verify alignment and bone callus progression." }
        ],
        workflowSteps: [
            { step: "Radiology Requisition", desc: "Orthopedic surgeon orders X-ray series (e.g. Knee AP/Lateral weight-bearing) with 1 click from the consultation screen." },
            { step: "Image Acquisition", desc: "Radiographer captures exposures on DR/CR machine; DICOM Modality Worklist ensures flawless patient UHID matching." },
            { step: "Instant PACS Transmission", desc: "Lossless DICOM study streams to Medical365 cloud PACS gateway over local gigabit or cloud network within seconds." },
            { step: "Surgeon Measurement & Review", desc: "Surgeon opens high-resolution radiograph on consultation monitor, applies Cobb angles or measurement calipers, and annotates findings." },
            { step: "Patient Discussion & EMR Linkage", desc: "Surgeon shows visual X-ray to patient, reviews joint alignment, and permanently attaches annotated study to clinical consultation notes." }
        ],
        compliance: `Medical365 Orthopedic X-ray Integration conforms strictly to DICOM 3.0 medical imaging protocols and the Electronic Health Record (EHR) Standards for India. Image compression complies with lossless JPEG 2000 standards to preserve full diagnostic fidelity for musculoskeletal structures.

All imaging records are archived under AES-256 encryption compliant with the DPDP Act 2023. Seamless FHIR imaging study resource linkage enables automated integration with the Ayushman Bharat Digital Mission (ABDM) national health locker, satisfying NABH digital health criteria.`,
        table: [
            { feature: "Image Viewing Format", manual: "Costly physical film sheets or low-res compressed JPEG photos", m365: "Lossless 16-bit DICOM radiology viewer with zoom and pan" },
            { feature: "Measurement Capabilities", manual: "Manual plastic ruler on physical film with calibration guesswork", m365: "Digital calibrated calipers and automated Cobb angle measurement tools" },
            { feature: "Image Retrieval Time", manual: "Waiting 20–40 minutes for film processing and porter delivery", m365: "Instant on-screen availability within seconds of X-ray acquisition" },
            { feature: "Historical Comparison", manual: "Patients often forget past X-ray films at home during follow-ups", m365: "Permanent cloud storage with 1-click split-screen comparison" },
            { feature: "Hospital Film Expenses", manual: "Significant recurring expenditure on chemical processing and film sheets", m365: "100% paperless and filmless operation reducing department overhead" }
        ],
        faqs: [
            { q: "Can orthopedic surgeons perform calibrated measurements on the digital viewer?", a: "Yes. Surgeons can calibrate measurements using a standard radiopaque calibration sphere or known anatomical landmarks, allowing linear distance, angle, and Cobb angle measurements accurate to fractions of a millimeter." },
            { q: "Is the DICOM viewer compatible with touch-screen tablets and iPads?", a: "Yes. The zero-footprint viewer is fully responsive, supporting multi-touch pinch-to-zoom, pan, window/level (brightness/contrast) adjustment, and measurement gestures on iPads, Microsoft Surface, and Android tablets." },
            { q: "Does the software support pre-operative digital templating for joint replacement?", a: "Yes. Surgeons can import and scale digital prosthesis templates for total knee arthroplasty (TKA) and total hip arthroplasty (THA) to determine optimal implant sizes prior to entering the operation theater." },
            { q: "Can X-ray images be viewed directly in the operation theater (OT)?", a: "Yes. OT workstations and overhead wall-mounted surgical monitors can display the patient's pre-operative and intra-operative radiographs instantly with sterile mouse or touch navigation." },
            { q: "How are patient radiation exposure records maintained?", a: "Radiation parameters, number of exposures, and anatomical views are logged in the patient's radiology record in compliance with Atomic Energy Regulatory Board (AERB) safety mandates." },
            { q: "Can patients access their digital X-rays on their smartphones?", a: "Yes. Patients can securely view and download high-resolution diagnostic images and radiologist reports through the Medical365 patient portal or via an encrypted link sent on WhatsApp." }
        ]
    },

    // 10. FRACTURE MANAGEMENT
    "fracture-management": {
        cluster: "ORTHOPEDICS",
        title: "Fracture Management Software | Orthopedic Trauma EMR | Medical365",
        h1: "Orthopedic Fracture Management & Trauma Documentation Software",
        metaDesc: "Medical365 fracture management software standardizes AO/OTA classification, plaster cast tracking, surgical fixation & bone union monitoring in hospital EMR.",
        diagramTitle: "Orthopedic Trauma & Fracture Management Clinical Lifecycle",
        nodes: ["Emergency Trauma Triage", "AO/OTA Fracture Classification", "Reduction & Surgical Fixation", "Cast & Wound Care Tracking", "Bone Union & Rehab EMR"],
        color: "#d97706",
        quickAnswer: "Fracture management software is a specialized clinical documentation and workflow module designed for orthopedic trauma surgeons and emergency teams. It standardizes fracture diagnosis using the universal AO/OTA classification, tracks closed reduction procedures, manages cast application and removal schedules, records surgical hardware fixation details, and tracks longitudinal bone union progress across rehabilitation visits.",
        bgText: `Trauma and orthopedic fractures represent one of the most urgent and high-volume clinical workloads in Indian hospitals. Road traffic accidents, industrial injuries, falls in the elderly, and sports trauma generate thousands of complex fracture presentations every single day across urban and rural trauma centers.

Managing acute fractures requires seamless coordination across emergency triage, radiology, the plaster room, operation theaters, and outpatient follow-up clinics. In many facilities, vital details—such as whether a fracture was open or closed (Gustilo-Anderson grade), the neurovascular status of the extremity, cast padding specifications, or post-reduction X-ray alignments—are recorded in disjointed emergency registers or lost paper notes.

Medical365's Fracture Management module unifies trauma care within a structured, evidence-based digital environment. Equipped with interactive AO/OTA classification pickers, emergency neurovascular checklists, cast application logs, and bone healing scorecards, the module ensures complete clinical documentation continuity from initial emergency splinting to full functional recovery.`,
        capabilities: [
            { title: "Standardized AO/OTA Fracture Classification Picker", text: "Integrates the complete AO Foundation / Orthopedic Trauma Association (AO/OTA) fracture classification system, enabling surgeons to rapidly categorize bone, segment, type, and group with 1-click accuracy." },
            { title: "Open Fracture Grading & Emergency Protocol", text: "Structures Gustilo-Anderson open fracture classification (Grade I, II, IIIA, IIIB, IIIC) with automated clinical prompts for emergency IV antibiotic timing, tetanus prophylaxis, and urgent debridement scheduling." },
            { title: "Distal Neurovascular Examination Checklist", text: "Enforces mandatory pre- and post-reduction documentation of distal pulses (radial, dorsalis pedis), motor function, and dermatomal sensation to protect against compartment syndrome and neurological compromise." },
            { title: "Plaster Room & Cast Management Log", text: "Tracks cast and splint applications: immobilization type (slab, full cast, functional brace), material (plaster of Paris vs. fiberglass), application date, cast technician, and scheduled removal date." },
            { title: "Surgical Fixation Operative Recording", text: "Documents closed reduction percutaneous pinning (CRPP), open reduction internal fixation (ORIF), intramedullary nailing, and external fixation with linked implant serial numbers." },
            { title: "Bone Union & Callus Formation Tracking", text: "Monitors radiographic bone union milestones (bridging callus, cortical remodeling, trabecular crossing) across follow-up visits, flagging delayed union or non-union early." }
        ],
        workflowSteps: [
            { step: "Emergency Triage & Assessment", desc: "Trauma team records injury mechanism, neurovascular status, open wound grading, and orders urgent emergency X-rays." },
            { step: "AO/OTA Classification & Plan", desc: "Surgeon classifies fracture, determines conservative (cast/slab) versus operative intervention, and initiates consent." },
            { step: "Reduction or Surgical Fixation", desc: "Closed reduction performed in plaster room or operative fixation (ORIF/nailing) executed in OT with hardware logging." },
            { step: "Cast & Wound Care Follow-Up", desc: "Outpatient visits track cast tightness, skin integrity, suture removal, and radiographic alignment checks." },
            { step: "Cast Removal & Physiotherapy Referral", desc: "Upon radiological bridging callus confirmation, cast is removed and automated rehabilitation referral is generated." }
        ],
        compliance: `Medical365 Fracture Management complies with AO Trauma principles and the clinical governance mandates of the Indian Orthopaedic Association (IOA) and the National Accreditation Board for Hospitals & Healthcare Providers (NABH). 

All clinical trauma entries, neurovascular checks, and surgical implant records are cryptographically secured with AES-256 encryption compliant with the DPDP Act 2023. Generated trauma summaries are formatted under ABDM FHIR standards for nationwide health record interoperability.`,
        table: [
            { feature: "Fracture Classification", manual: "Vague descriptions like 'broken leg' or 'wrist fracture'", m365: "Standardized AO/OTA code (e.g., 22-B2.1) specifying exact bone and lesion geometry" },
            { feature: "Neurovascular Checks", manual: "Frequently omitted or recorded as illegible scribble", m365: "Mandatory pre- and post-reduction digital checklist for pulses and sensation" },
            { feature: "Cast Removal Scheduling", manual: "Patient told verbally; high rate of prolonged immobilization complications", m365: "Automated WhatsApp alerts reminding patient of scheduled cast removal date" },
            { feature: "Open Fracture Antibiotic Timing", manual: "Uncertain timing of first antibiotic dose in emergency room", m365: "Timestamped logging of emergency antibiotic and tetanus administration" },
            { feature: "Bone Healing Audit", manual: "Difficult to track union rates across thousands of past trauma cases", m365: "Searchable database tracking healing time, union rates, and complications" }
        ],
        faqs: [
            { q: "How does the AO/OTA classification tool help orthopedic surgeons?", a: "The AO/OTA system provides an internationally recognized alphanumeric code for every fracture. Medical365's visual selector allows surgeons to click the affected bone and fracture pattern to auto-populate the exact code, improving documentation consistency and academic research." },
            { q: "Does the module help prevent compartment syndrome complications?", a: "Yes. The system enforces mandatory serial neurovascular assessments—including pain out of proportion, passive stretch pain, and distal pulse checks—with automated alerts prompting urgent clinical reassessment." },
            { q: "Can cast technicians access the system in the plaster room?", a: "Yes. Plaster room staff have a dedicated mobile/tablet interface to view doctor cast orders, log cast application details, record padding thickness, and schedule removal dates." },
            { q: "How does the software track pediatric growth plate (Salter-Harris) fractures?", a: "The module includes a specialized pediatric trauma branch that categorizes Salter-Harris physis fractures (Types I through V) and schedules mandatory growth arrest surveillance visits." },
            { q: "Can wound photos of open fractures be securely stored in the patient chart?", a: "Yes. Clinical staff can photograph open fracture wounds using the Medical365 mobile app; images are encrypted and stored directly in the patient's chart without saving to the personal device gallery." },
            { q: "Does the system link fracture healing to physiotherapy rehabilitation?", a: "Yes. When the surgeon confirms radiographic union and removes the cast, the system allows 1-click generation of a physiotherapy requisition with joint mobilization protocols." }
        ]
    }
};

// Merge Batch 1 data
Object.assign(batch1Data, remainingBatch1);

console.log(`Loaded ${Object.keys(batch1Data).length} pages for Batch 1 generation.`);

// Function to generate high-resolution, responsive SVG clinical architecture diagram
function generateSvgDiagram(item) {
    const boxWidth = 150;
    const boxHeight = 70;
    const gap = 35;
    const startX = 30;
    const startY = 175;

    const nodeElements = item.nodes.map((nodeText, idx) => {
        const x = startX + idx * (boxWidth + gap);
        const y = startY;
        const arrow = idx < item.nodes.length - 1 ? `
        <!-- Arrow ${idx+1} -->
        <g transform="translate(${x + boxWidth}, ${y + boxHeight/2})">
            <line x1="5" y1="0" x2="${gap - 5}" y2="0" stroke="${item.color}" stroke-width="2.5" stroke-dasharray="4,2"/>
            <polygon points="${gap - 2},0 ${gap - 10},-5 ${gap - 10},5" fill="${item.color}"/>
        </g>` : '';

        return `
        <!-- Node ${idx+1}: ${nodeText} -->
        <g transform="translate(${x}, ${y})">
            <rect width="${boxWidth}" height="${boxHeight}" rx="12" fill="#ffffff" stroke="${item.color}" stroke-width="2" filter="url(#shadow)"/>
            <rect width="${boxWidth}" height="6" rx="3" fill="${item.color}"/>
            <text x="${boxWidth/2}" y="32" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#1e293b">
                STEP ${idx+1}
            </text>
            <text x="${boxWidth/2}" y="50" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="600" fill="#475569">
                ${nodeText.split(' ').slice(0, 2).join(' ')}
            </text>
            <text x="${boxWidth/2}" y="62" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9.5" fill="#64748b">
                ${nodeText.split(' ').slice(2).join(' ')}
            </text>
        </g>
        ${arrow}`;
    }).join('\n');

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 420" width="100%" height="100%" style="background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%); border-radius: 16px; border: 1px solid #e2e8f0;">
    <defs>
        <filter id="shadow" x="-5%" y="-10%" width="115%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.06"/>
        </filter>
        <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="${item.color}"/>
            <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
    </defs>
    <!-- Background grid -->
    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#f1f5f9" stroke-width="1"/>
    </pattern>
    <rect width="960" height="420" fill="url(#grid)"/>

    <!-- Header Banner -->
    <rect x="0" y="0" width="960" height="70" fill="url(#headerGrad)"/>
    <text x="35" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800" fill="#ffffff" letter-spacing="0.5">
        MEDICAL365 CLINICAL WORKFLOW ARCHITECTURE
    </text>
    <text x="925" y="42" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#cbd5e1">
        ${item.cluster} EMR MODULE
    </text>

    <!-- Subtitle -->
    <text x="35" y="115" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#0f172a">
        ${item.diagramTitle}
    </text>
    <text x="35" y="138" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="#64748b">
        Automated bidirectional data flow connecting diagnostic modalities, clinical reviews, and hospital EMR.
    </text>

    <!-- Workflow Nodes -->
    ${nodeElements}

    <!-- Footer Certification Badge -->
    <rect x="35" y="345" width="890" height="45" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
    <circle cx="55" cy="367" r="8" fill="#10b981"/>
    <path d="M 52 367 L 55 370 L 60 364" fill="none" stroke="#ffffff" stroke-width="2"/>
    <text x="75" y="371" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11.5" font-weight="600" fill="#334155">
        ABDM M1/M2/M3 Compliant • DPDP Act 2023 End-to-End Encryption • ISO 27001 Certified Health Cloud
    </text>
</svg>`;
}

// Function to construct complete ~1,600-word HTML body
function generateFullPageHtml(slug, item, preHeader, postFooter) {
    // 1. Capability Cards (6 deep cards)
    const capCardsHtml = item.capabilities.map((c, i) => `
      <div class="cap-card" style="background:#ffffff; padding:32px 28px; border-radius:16px; border:1px solid #e2e8f0; box-shadow:0 4px 14px rgba(0,0,0,0.03); display:flex; flex-direction:column;">
        <div style="width:46px; height:46px; border-radius:12px; background:rgba(26,86,219,0.08); display:flex; align-items:center; justify-content:center; color:${item.color}; font-weight:800; font-size:1.1rem; margin-bottom:18px;">
          0${i+1}
        </div>
        <h3 style="font-size:1.2rem; font-weight:800; color:#0f172a; margin-bottom:12px; line-height:1.35;">${c.title}</h3>
        <p style="font-size:0.96rem; color:#475569; line-height:1.65; margin:0; flex-grow:1;">${c.text}</p>
      </div>`).join('\n');

    // 2. Step Workflow (5 deep steps)
    const workflowHtml = item.workflowSteps.map((w, i) => `
      <div class="wf-step-box" style="padding:28px 22px; background:#ffffff; border-radius:14px; border:1px solid #e2e8f0; box-shadow:0 2px 10px rgba(0,0,0,0.02); text-align:center;">
        <div style="width:38px; height:38px; border-radius:50%; background:${item.color}; color:#ffffff; font-weight:800; display:flex; align-items:center; justify-content:center; margin:0 auto 14px; font-size:0.95rem;">
          ${i+1}
        </div>
        <h4 style="font-size:1.08rem; font-weight:800; color:#0f172a; margin-bottom:8px;">${w.step}</h4>
        <p style="font-size:0.9rem; color:#64748b; line-height:1.55; margin:0;">${w.desc}</p>
      </div>`).join('\n');

    // 3. Comparison Table Rows
    const tableRows = item.table.map(r => `
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:16px 20px; font-weight:700; color:#1e293b; background:#f8fafc; font-size:0.95rem;">${r.feature}</td>
        <td style="padding:16px 20px; color:#64748b; font-size:0.92rem; line-height:1.5;">${r.manual}</td>
        <td style="padding:16px 20px; color:#0f766e; font-weight:600; background:#f0fdfa; font-size:0.92rem; line-height:1.5;">${r.m365}</td>
      </tr>`).join('\n');

    // 4. In-depth FAQs (6 questions)
    const faqsHtml = item.faqs.map(f => `
      <div class="faq-item" style="border-bottom:1px solid #e2e8f0; padding:24px 0;">
        <h3 style="font-size:1.15rem; font-weight:800; color:#0f172a; margin-bottom:10px;">${f.q}</h3>
        <p style="font-size:0.98rem; color:#475569; line-height:1.68; margin:0;">${f.a}</p>
      </div>`).join('\n');

    // Assemble deep body content
    const bodyContent = `
<!-- ══════════════════════════════════════════════════
     ${item.cluster} SPECIALTY PAGE: ${slug.toUpperCase()}
     ══════════════════════════════════════════════════ -->
<section class="page-hero" style="padding:110px 24px 70px; background:radial-gradient(circle at top right, rgba(26,86,219,0.06), transparent 60%);">
  <div class="container" style="max-width:1160px; margin:0 auto;">
    <div style="max-width:900px; margin:0 auto; text-align:center;">
      <div class="badge" style="display:inline-block; padding:6px 18px; border-radius:20px; background:rgba(26,86,219,0.1); color:#1A56DB; font-weight:800; font-size:0.85rem; margin-bottom:22px; text-transform:uppercase; letter-spacing:0.5px;">
        ✨ ${item.cluster} EMR MODULE
      </div>
      <h1 style="font-size:clamp(2.3rem, 5vw, 3.4rem); font-weight:850; line-height:1.15; color:#0f172a; margin-bottom:22px; letter-spacing:-0.5px;">
        ${item.h1}
      </h1>
      <p style="font-size:1.22rem; color:#475569; line-height:1.65; margin-bottom:38px;">
        ${item.metaDesc}
      </p>
      <div style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap; margin-bottom:30px;">
        <a href="https://www.medical365.in/book-demo" class="btn-primary" style="padding:15px 36px; border-radius:50px; font-weight:750; font-size:1.05rem; text-decoration:none; touch-action:manipulation; box-shadow:0 8px 20px rgba(26,86,219,0.25);">Book a Free On-Site Demo</a>
        <a href="/pricing" class="btn-secondary" style="padding:15px 34px; border-radius:50px; font-weight:650; font-size:1.05rem; text-decoration:none; border:1px solid #cbd5e1; color:#334155; touch-action:manipulation; background:#fff;">View Transparent Pricing</a>
      </div>
    </div>
  </div>
</section>

<!-- Section 1: AEO Quick Answer & Executive Summary -->
<section class="quick-answer-section" style="padding:45px 24px; background:#ffffff; border-top:1px solid #e2e8f0; border-bottom:1px solid #e2e8f0;">
  <div class="container" style="max-width:960px; margin:0 auto;">
    <div style="background:#f8fafc; border-left:5px solid ${item.color}; padding:28px 32px; border-radius:10px; box-shadow:0 2px 8px rgba(0,0,0,0.02);">
      <h2 style="font-size:1.35rem; font-weight:800; color:#0f172a; margin-bottom:14px;">What is ${item.h1.toLowerCase()}?</h2>
      <p style="font-size:1.08rem; color:#334155; line-height:1.7; margin:0;">
        ${item.quickAnswer}
      </p>
    </div>
  </div>
</section>

<!-- Section 2: Clinical Landscape & Operational Challenges in India -->
<section class="clinical-context-section" style="padding:85px 24px; background:#f8fafc;">
  <div class="container" style="max-width:1160px; margin:0 auto;">
    <div style="max-width:850px; margin:0 auto; text-align:center; margin-bottom:45px;">
      <h2 style="font-size:2.1rem; font-weight:850; color:#0f172a; margin-bottom:16px;">Clinical Landscape & Specialty Healthcare Challenges in India</h2>
      <p style="font-size:1.12rem; color:#64748b; line-height:1.6;">Addressing the systemic bottlenecks of manual workflows, delayed turnaround, and fragmented patient records in Indian medical institutions.</p>
    </div>
    <div style="background:#ffffff; padding:45px; border-radius:20px; border:1px solid #e2e8f0; box-shadow:0 4px 20px rgba(0,0,0,0.03); font-size:1.06rem; color:#334155; line-height:1.75;">
      ${item.bgText.split('\n\n').map(para => `<p style="margin-bottom:20px;">${para}</p>`).join('\n')}
    </div>
  </div>
</section>

<!-- Section 3: Core Capabilities & Detailed Feature Breakdown -->
<section class="features-section" style="padding:85px 24px; background:#ffffff;">
  <div class="container" style="max-width:1160px; margin:0 auto;">
    <div style="text-align:center; max-width:800px; margin:0 auto 55px;">
      <h2 style="font-size:2.1rem; font-weight:850; color:#0f172a; margin-bottom:16px;">Comprehensive Clinical & Operational Capabilities</h2>
      <p style="font-size:1.12rem; color:#64748b; line-height:1.6;">Engineered with deep clinical specificity to eliminate manual documentation errors, speed up consultations, and support high-volume hospital operations.</p>
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(330px, 1fr)); gap:28px;">
      ${capCardsHtml}
    </div>
  </div>
</section>

<!-- Section 4: Visual Architecture Diagram -->
<section class="diagram-section" style="padding:60px 24px 85px; background:#f8fafc; border-top:1px solid #e2e8f0; border-bottom:1px solid #e2e8f0;">
  <div class="container" style="max-width:1040px; margin:0 auto;">
    <div style="text-align:center; margin-bottom:35px;">
      <h2 style="font-size:1.9rem; font-weight:850; color:#0f172a; margin-bottom:12px;">System Architecture & Data Integration Pipeline</h2>
      <p style="font-size:1.08rem; color:#64748b;">Visualizing the end-to-end clinical data flow from diagnostic hardware acquisition to centralized EMR synchronization.</p>
    </div>
    <div style="border-radius:18px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.06);">
      <img src="/images/diagrams/${slug}-workflow.svg" alt="Medical365 ${item.diagramTitle}" width="960" height="420" loading="lazy" style="display:block; width:100%; height:auto;" />
    </div>
  </div>
</section>

<!-- Section 5: End-to-End Clinical & Departmental Workflow -->
<section class="workflow-section" style="padding:85px 24px; background:#ffffff;">
  <div class="container" style="max-width:1160px; margin:0 auto;">
    <div style="text-align:center; max-width:800px; margin:0 auto 50px;">
      <h2 style="font-size:2.1rem; font-weight:850; color:#0f172a; margin-bottom:16px;">Step-by-Step Clinical & Departmental Workflow</h2>
      <p style="font-size:1.12rem; color:#64748b;">A transparent 5-stage digital pathway standardizing patient care from initial requisition to longitudinal review.</p>
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:20px;">
      ${workflowHtml}
    </div>
  </div>
</section>

<!-- Section 6: Standards, Regulatory Compliance & Data Security -->
<section class="compliance-section" style="padding:85px 24px; background:#f8fafc;">
  <div class="container" style="max-width:1160px; margin:0 auto;">
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(340px, 1fr)); gap:45px; align-items:center;">
      <div>
        <div style="display:inline-block; padding:5px 14px; border-radius:20px; background:rgba(16,185,129,0.1); color:#059669; font-weight:750; font-size:0.82rem; margin-bottom:16px; text-transform:uppercase;">
          🛡️ Compliance & Statutory Adherence
        </div>
        <h2 style="font-size:2.1rem; font-weight:850; color:#0f172a; margin-bottom:18px; line-height:1.25;">ABDM, DPDP Act 2023 & NABH Digital Standards</h2>
        <p style="font-size:1.06rem; color:#475569; line-height:1.75; margin-bottom:20px;">
          ${item.compliance.split('\n\n')[0]}
        </p>
        <p style="font-size:1.06rem; color:#475569; line-height:1.75; margin:0;">
          ${item.compliance.split('\n\n')[1] || ''}
        </p>
      </div>
      <div style="background:#ffffff; padding:40px 36px; border-radius:20px; border:1px solid #e2e8f0; box-shadow:0 8px 24px rgba(0,0,0,0.03);">
        <h3 style="font-size:1.35rem; font-weight:800; color:#0f172a; margin-bottom:22px;">Regulatory Certifications at a Glance</h3>
        <ul style="list-style:none; padding:0; margin:0;">
          <li style="display:flex; gap:14px; margin-bottom:18px; font-size:0.98rem; color:#334155; line-height:1.55;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span><strong>ABDM Milestone 1, 2, 3:</strong> Seamless ABHA health ID creation, health facility registry (HFR), and health locker record linkage.</span>
          </li>
          <li style="display:flex; gap:14px; margin-bottom:18px; font-size:0.98rem; color:#334155; line-height:1.55;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span><strong>DPDP Act 2023 Compliant:</strong> Granular digital consent management, role-based access control (RBAC), and full audit logging.</span>
          </li>
          <li style="display:flex; gap:14px; margin-bottom:18px; font-size:0.98rem; color:#334155; line-height:1.55;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span><strong>NABH 5th Edition Ready:</strong> Standardized digital clinical documentation, tamper-evident consultation records, and clinical audit readiness.</span>
          </li>
          <li style="display:flex; gap:14px; margin-bottom:0; font-size:0.98rem; color:#334155; line-height:1.55;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span><strong>Enterprise Bank-Grade Security:</strong> AES-256 encryption at rest and TLS 1.3 protocol encryption across all network transmissions.</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- Section 7: Operational Comparison Table -->
<section class="comparison-section" style="padding:85px 24px; background:#ffffff;">
  <div class="container" style="max-width:1140px; margin:0 auto;">
    <div style="text-align:center; max-width:800px; margin:0 auto 50px;">
      <h2 style="font-size:2.1rem; font-weight:850; color:#0f172a; margin-bottom:16px;">Traditional Manual Workflows vs. Medical365 Digital Automation</h2>
      <p style="font-size:1.12rem; color:#64748b;">A transparent operational comparison showing tangible improvements in clinical speed, documentation accuracy, and patient experience.</p>
    </div>
    <div style="overflow-x:auto; border-radius:16px; border:1px solid #e2e8f0; box-shadow:0 4px 16px rgba(0,0,0,0.02);">
      <table style="width:100%; border-collapse:collapse; text-align:left;">
        <thead>
          <tr style="background:#0f172a; color:#ffffff;">
            <th style="padding:18px 20px; font-size:1rem; font-weight:800; width:25%;">Clinical Parameter</th>
            <th style="padding:18px 20px; font-size:1rem; font-weight:800; width:37.5%;">Traditional / Paper Process</th>
            <th style="padding:18px 20px; font-size:1rem; font-weight:800; width:37.5%; background:#134e4a;">Medical365 Digital Platform</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- Section 8: Contextual Hospital Ecosystem & Internal Links -->
<section class="ecosystem-section" style="padding:75px 24px; background:#f8fafc; border-top:1px solid #e2e8f0; border-bottom:1px solid #e2e8f0;">
  <div class="container" style="max-width:1140px; margin:0 auto; text-align:center;">
    <h2 style="font-size:2rem; font-weight:850; color:#0f172a; margin-bottom:16px;">Tightly Interconnected with Medical365 Core Healthcare Modules</h2>
    <p style="font-size:1.1rem; color:#475569; max-width:820px; margin:0 auto 35px; line-height:1.65;">
      This module functions as an integral component of the broader <a href="/hims-software" style="color:#1A56DB; font-weight:700;">Medical365 HIMS Software</a> ecosystem. Diagnostic data seamlessly connects with the <a href="/emr-ehr-system" style="color:#1A56DB; font-weight:700;">hospital EMR</a>, outpatient appointment scheduling, inpatient bed management, and <a href="/nabh-compliant-hospital-software" style="color:#1A56DB; font-weight:700;">NABH compliance audits</a>.
    </p>
    <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
      <a href="/hims-software" style="padding:10px 22px; background:#ffffff; border:1px solid #cbd5e1; border-radius:30px; text-decoration:none; color:#1e293b; font-weight:650; font-size:0.92rem;">Core HIMS Platform →</a>
      <a href="/emr-ehr-system" style="padding:10px 22px; background:#ffffff; border:1px solid #cbd5e1; border-radius:30px; text-decoration:none; color:#1e293b; font-weight:650; font-size:0.92rem;">EMR/EHR System →</a>
      <a href="/nabh-compliant-hospital-software" style="padding:10px 22px; background:#ffffff; border:1px solid #cbd5e1; border-radius:30px; text-decoration:none; color:#1e293b; font-weight:650; font-size:0.92rem;">NABH Compliance →</a>
      <a href="/patient-registration" style="padding:10px 22px; background:#ffffff; border:1px solid #cbd5e1; border-radius:30px; text-decoration:none; color:#1e293b; font-weight:650; font-size:0.92rem;">Patient Registration →</a>
      <a href="/pricing" style="padding:10px 22px; background:#ffffff; border:1px solid #cbd5e1; border-radius:30px; text-decoration:none; color:#1e293b; font-weight:650; font-size:0.92rem;">Transparent Pricing →</a>
    </div>
  </div>
</section>

<!-- Section 9: Comprehensive AEO FAQ Section -->
<section class="faq-section" style="padding:85px 24px; background:#ffffff;">
  <div class="container" style="max-width:900px; margin:0 auto;">
    <div style="text-align:center; margin-bottom:50px;">
      <h2 style="font-size:2.1rem; font-weight:850; color:#0f172a; margin-bottom:14px;">Frequently Asked Questions</h2>
      <p style="font-size:1.12rem; color:#64748b;">Direct clinical and technical answers regarding ${item.h1.toLowerCase()}.</p>
    </div>
    <div class="faq-list">
      ${faqsHtml}
    </div>
  </div>
</section>

<!-- Section 10: Bottom Conversion CTA Banner -->
<section class="bottom-cta" style="padding:80px 24px; background:linear-gradient(135deg, #1A56DB 0%, #0D9488 100%); color:#ffffff; text-align:center;">
  <div class="container" style="max-width:850px; margin:0 auto;">
    <h2 style="font-size:2.3rem; font-weight:850; margin-bottom:18px; color:#ffffff;">Modernize your ${item.cluster.toLowerCase()} workflows today.</h2>
    <p style="font-size:1.18rem; opacity:0.92; margin-bottom:38px; line-height:1.6;">Schedule an on-site or online interactive walkthrough customized for your hospital or clinical specialty.</p>
    <div style="display:flex; gap:18px; justify-content:center; flex-wrap:wrap;">
      <a href="https://www.medical365.in/book-demo" class="btn-primary" style="background:#ffffff !important; color:#1A56DB !important; padding:16px 38px; font-size:1.08rem; font-weight:800; border-radius:50px; text-decoration:none; touch-action:manipulation; box-shadow:0 10px 25px rgba(0,0,0,0.15);">Book a Free On-Site Demo</a>
      <a href="/pricing" class="btn-secondary" style="background:transparent !important; color:#ffffff !important; border:2px solid #ffffff; padding:14px 34px; font-size:1.08rem; font-weight:650; border-radius:50px; text-decoration:none; touch-action:manipulation;">Explore Pricing Plans</a>
    </div>
  </div>
</section>
`;

    // 5. Update Head Metadata & Structured Data
    let newPreHeader = preHeader;

    newPreHeader = newPreHeader.replace(/<title>[\s\S]*?<\/title>/i, `<title>${item.title}</title>`);
    newPreHeader = newPreHeader.replace(/<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="description" content="${item.metaDesc}">`);

    // Clean JSON-LD Structured Data
    const jsonLd = `
    <!-- Legitimate Structured Data (SoftwareApplication, WebPage, BreadcrumbList, FAQPage) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Medical365 — ${item.h1.replace(/"/g, '\\"')}",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web, Android, iOS, Windows",
      "url": "https://www.medical365.in/${slug}",
      "description": "${item.metaDesc.replace(/"/g, '\\"')}",
      "offers": {
        "@type": "Offer",
        "price": "6000",
        "priceCurrency": "INR",
        "priceValidUntil": "2026-12-31"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Medical365 by Chonexa Technologies",
        "url": "https://www.medical365.in",
        "logo": "https://www.medical365.in/medical365logo1.png",
        "telephone": "+91-77919-10007"
      }
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "${item.title.replace(/"/g, '\\"')}",
      "url": "https://www.medical365.in/${slug}",
      "description": "${item.metaDesc.replace(/"/g, '\\"')}",
      "publisher": {
        "@type": "Organization",
        "name": "Medical365",
        "url": "https://www.medical365.in"
      }
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
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
          "name": "${item.cluster}",
          "item": "https://www.medical365.in/hims-software"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "${item.h1.replace(/"/g, '\\"')}",
          "item": "https://www.medical365.in/${slug}"
        }
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": ${JSON.stringify(item.faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      })), null, 4)}
    }
    </script>
    `;

    newPreHeader = newPreHeader.replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');
    newPreHeader = newPreHeader.replace('</head>', jsonLd + '\n</head>');

    return newPreHeader + '\n' + bodyContent + '\n' + postFooter;
}

// Execute Batch 1 Generation
let batch1Success = 0;

for (const [slug, item] of Object.entries(batch1Data)) {
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

    batch1Success++;
    console.log(`[${batch1Success}/10] Enhanced ${filename} -> Words: ${wordCount}, SVG: ${slug}-workflow.svg generated!`);
}

console.log(`=== BATCH 1 COMPLETE: Successfully generated ${batch1Success} deep specialty pages with diagrams! ===`);


module.exports = batch1Data;
