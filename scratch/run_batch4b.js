const path = require('path');
const { buildPages } = require('./page_builder_engine.js');

const repoRoot = path.resolve(__dirname, '..');
const diagramDir = path.join(repoRoot, 'images/diagrams');

console.log('=== EXECUTING BATCH 4B: FINAL 11 CORE PLATFORM PAGES ===');

const batch4bData = {
    "appointment-scheduling": {
        cluster: "CORE",
        title: "Hospital Appointment Scheduling Software India | OPD Booking System | Medical365",
        h1: "Hospital & Clinic OPD Appointment Scheduling Software",
        metaDesc: "Medical365 appointment scheduling software automates multi-doctor OPD booking, token queues, WhatsApp booking bots & doctor calendar management in India.",
        diagramTitle: "Hospital OPD Appointment Scheduling & Token Flow Architecture",
        nodes: ["Omnichannel Patient Booking (WhatsApp/Web)", "Automated Doctor Calendar & Slot Engine", "Real-Time Digital Token Display", "OPD Consultation Check-In", "Automated WhatsApp Follow-Up Sync"],
        color: "#2563eb",
        quickAnswer: "Appointment scheduling software is an enterprise-grade outpatient department (OPD) queue and booking management system designed for multi-specialty hospitals and outpatient clinics. It unifies omnichannel appointment channels (official WhatsApp chatbot, hospital web portal, front-desk walk-ins, phone bookings), automates doctor consultation calendars and slot allocation, powers real-time waiting-room token displays, and minimizes clinic patient wait times.",
        bgText: "Outpatient department (OPD) congestion is among the most visible operational challenges facing Indian healthcare institutions. In high-volume hospitals and bustling specialty clinics, hundreds of patients arrive simultaneously in the morning hours, resulting in chaotic physical queues at registration counters, overcrowded waiting halls, frustrated patients, and overwhelmed reception staff.\n\nIn conventional hospital environments, scheduling is hindered by fragmented methods: paper appointment ledgers, disparate online booking portals that do not sync with doctor arrival times, and unmanaged walk-in patient loads. Overbooking occurs routinely, patient wait times routinely exceed 90 minutes for a 7-minute consultation, and clinic no-show rates hover between 25% and 35% because patients forget appointments or seek care elsewhere.\n\nMedical365's Appointment Scheduling module reorganizes hospital outpatient flow through intelligent, automated booking orchestration. Featuring an AI-powered WhatsApp booking assistant, real-time doctor roster synchronization, dynamic color-coded waiting-room token displays, and automated bilingual appointment reminders, Medical365 cuts patient wait times by over 60% and eliminates clinic chaos.",
        capabilities: [
            { title: "Omnichannel Booking Gateway (WhatsApp, Web, Kiosk, Phone)", text: "Enables patients to book, reschedule, or cancel consultations via official WhatsApp Business chatbot, hospital mobile app, website widget, interactive lobby kiosks, or front-desk phone lines." },
            { title: "Dynamic Doctor Consultation Roster & Shift Management", text: "Manages complex multi-specialty clinician calendars: recurring consultation days, slot durations (5 to 30 mins), emergency blockouts, leave coverage, and multi-branch hospital schedules." },
            { title: "Real-Time Digital Token Display & Queue Management", text: "Generates sequential digital tokens for scheduled appointments and emergency walk-ins, streaming live queue numbers to waiting-room TV displays and patient smartphones." },
            { title: "Automated Bilingual WhatsApp & SMS Reminder Engine", text: "Dispatches automated appointment confirmations, Google Maps directions, and reminder alerts 24 hours and 2 hours before the visit, cutting clinic no-show rates to under 8%." },
            { title: "Tele-Consultation Slot & Video Link Integration", text: "Integrates virtual tele-medicine booking slots, automatically generating end-to-end encrypted video consultation links sent to patient and doctor phones upon booking confirmation." },
            { title: "Integrated Pre-Payment & OPD Registration Fee Collection", text: "Collects advance consultation fees or token booking deposits via integrated dynamic UPI QR codes and payment gateways, reconciling automatically with hospital billing." }
        ],
        workflowSteps: [
            { step: "Patient Booking Requisition", desc: "Patient selects doctor, specialty, and preferred slot on WhatsApp bot or hospital website." },
            { step: "Instant Confirmation & Token Allocation", desc: "System locks slot, allocates unique token number, and dispatches digital appointment slip via WhatsApp." },
            { step: "Automated Journey Reminders", desc: "Automated reminders send 24h and 2h prior with clinic directions and estimated doctor arrival time." },
            { step: "Reception Check-In & Live Queue", desc: "Patient arrives; barcode on WhatsApp slip scans at kiosk, advancing patient to 'Arrived' status on waiting TV." },
            { step: "Doctor Chamber Call & Sync", desc: "Doctor clicks 'Next Patient' on EMR; chime sounds in waiting hall, updating TV screen to direct patient to chamber." }
        ],
        compliance: "Medical365 Appointment Scheduling operates in full compliance with the Digital Personal Data Protection (DPDP) Act 2023, Information Technology Act 2000, and ABDM appointment scheduling FHIR profiles.\n\nAll booking logs, patient phone numbers, and payment details are secured under AES-256 encryption. Consultation appointments link seamlessly to Ayushman Bharat Health Accounts (ABHA).",
        table: [
            { feature: "Booking Channels", manual: "Manual phone calls or long physical queues at 8 AM registration desk", m365: "24/7 automated WhatsApp bot, mobile app, web widget, and lobby kiosk" },
            { feature: "Wait Time Management", manual: "Unmanaged crowd in waiting hall; average wait time 90-120 minutes", m365: "Structured slot booking and live token display reducing wait time to <20 mins" },
            { feature: "No-Show Rates", manual: "25-35% missed appointments due to lack of automated reminders", m365: "Under 8% no-shows with automated WhatsApp confirmations and reminders" },
            { feature: "Doctor Calendar Flexibility", manual: "Doctor delayed in surgery; reception unable to notify waiting patients", m365: "1-click emergency delay broadcast notifying all booked patients via WhatsApp" },
            { feature: "Walk-In vs. Scheduled Flow", manual: "Walk-in patients crowd ahead of scheduled patients causing arguments", m365: "Fair interleaved queuing algorithm balancing scheduled and emergency walk-ins" }
        ],
        faqs: [
            { q: "How does the WhatsApp appointment booking chatbot work for patients?", a: "Patients simply send 'Hi' or 'Book Appointment' to the hospital's verified WhatsApp number. The automated bot prompts them to select their city/branch, specialty, doctor, and preferred time slot, instantly delivering a confirmed digital appointment card with a QR code." },
            { q: "Can the system handle emergency walk-in patients alongside booked appointments?", a: "Yes. Medical365 uses an intelligent hybrid queuing algorithm: it interleaves scheduled appointment slots with designated walk-in emergency tokens, ensuring smooth patient flow without disrupting booked consultation times." },
            { q: "What happens if a doctor is held up in emergency surgery or delayed?", a: "With 1 tap, the clinic administrator or doctor can trigger a 'Doctor Delay Alert'. The system automatically recalculates estimated consultation times and dispatches a polite WhatsApp update to all affected waiting patients, preventing waiting-hall frustration." },
            { q: "Can multi-specialty hospitals manage doctor rosters across multiple clinic branches?", a: "Yes. The software supports multi-location hospital networks, allowing doctors to define specific consultation hours for different hospital branches (e.g. Branch A on Monday/Wednesday, Branch B on Tuesday/Thursday)." },
            { q: "Does the system support advance consultation fee collection?", a: "Yes. Hospitals can configure mandatory or optional online fee collection (via UPI, credit/debit cards, net banking) during booking, significantly reducing casual appointment cancellations." },
            { q: "Can patients track their live queue position from their smartphones?", a: "Yes. Patients receive a live queue tracking link on WhatsApp allowing them to see how many patients are ahead of them in real time, so they can wait comfortably in nearby cafeterias or travel to the hospital exactly on time." }
        ]
    },

    "patient-registration": {
        cluster: "CORE",
        title: "Hospital Patient Registration Software India | ABHA & UHID System | Medical365",
        h1: "Hospital Patient Registration & ABHA Digital Onboarding Software",
        metaDesc: "Medical365 patient registration software automates 1-click ABHA creation, unique hospital UHID generation, biometric photo capture & paperless OPD onboarding in India.",
        diagramTitle: "Patient Digital Onboarding & ABHA Linkage Architecture",
        nodes: ["Patient Front-Desk / Kiosk Arrival", "Aadhaar / ABHA 1-Click Verification", "Permanent Hospital UHID Assignment", "Biometric Photo & Emergency Contact", "Digital OPD Card & EMR Profile Sync"],
        color: "#2563eb",
        quickAnswer: "Patient registration software is a foundational hospital information management module that standardizes patient intake, identification, and demographic onboarding. It automates 1-click Ayushman Bharat Health Account (ABHA) creation via Aadhaar/mobile OTP, generates unique lifetime Hospital Identification Numbers (UHID), captures biometric patient photographs, and creates digital OPD cards in under 30 seconds.",
        bgText: "Patient registration is the primary gateway through which every individual enters the hospital ecosystem. In Indian healthcare facilities, the front registration desk sets the tone for the entire patient experience. However, registering thousands of new and returning patients daily using outdated software or paper forms creates massive operational bottlenecks.\n\nIn conventional hospitals, front-desk clerks manually type patient names, addresses, and demographic details. Typographical errors occur constantly: misspelled names, wrong dates of birth, and mistyped phone numbers lead to duplicate patient files, fragmented medical histories, and billing discrepancies. Furthermore, returning patients who forget their physical hospital cards are frequently assigned new registration numbers, dividing their laboratory and diagnostic records across multiple isolated charts.\n\nMedical365's Patient Registration module modernizes hospital intake with lightning-fast, paperless digital onboarding. Deeply integrated with the Ayushman Bharat Digital Mission (ABDM), the software allows 1-click patient registration via ABHA QR code scanning or Aadhaar verification, auto-populating verified demographic data, creating permanent lifetime UHIDs, and printing barcode wristbands in seconds.",
        capabilities: [
            { title: "1-Click ABHA Creation & QR-Code Scan Registration", text: "Enables instant paperless registration by scanning patient ABHA QR codes or generating new 14-digit Ayushman Bharat Health Accounts via Aadhaar OTP in under 20 seconds." },
            { title: "Universal Unique Health Identifier (UHID) Architecture", text: "Generates an immutable, lifetime unique hospital identification number (UHID) for every patient, unifying all OPD visits, IPD admissions, lab results, and surgeries under one profile." },
            { title: "Intelligent Duplicate Patient Detection Engine", text: "Advanced phonetically-aware fuzzy matching algorithms checking for matching phone numbers, dates of birth, and name variants to prevent duplicate chart creation." },
            { title: "Biometric Web-Camera Patient Photo Capture", text: "Captures instant patient identification photographs via front-desk webcams, printing verified photos on OPD cards, IPD wristbands, and clinician EMR banners." },
            { title: "Comprehensive Socio-Demographic & Insurance Profiling", text: "Captures emergency contact kin details, corporate employer affiliations, government scheme eligibility (PMJAY, CGHS, ECHS, state health schemes), and insurance TPA policy numbers." },
            { title: "Thermal Barcode Label & Wristband Printing", text: "Instantly prints thermal adhesive barcode stickers for laboratory sample tubes and durable patient ID wristbands for inpatient admissions with 1 click." }
        ],
        workflowSteps: [
            { step: "Arrival & ABHA Scan", desc: "Patient arrives at desk; scans hospital ABDM QR code via Arogya Setu/ABHA app, sharing profile digitally." },
            { step: "Demographic Auto-Population", desc: "Verified name, gender, date of birth, address, and mobile number populate registration screen automatically." },
            { step: "Webcam Photo & Specialty Selection", desc: "Reception takes quick webcam photo, selects consulting doctor/specialty, and confirms registration fee." },
            { step: "UHID & Digital OPD Card Creation", desc: "System generates lifetime UHID; digital registration card with barcode dispatches to patient WhatsApp." },
            { step: "Automated Routing to Doctor Queue", desc: "Patient automatically appears on the consulting doctor's EMR consultation waiting list in real time." }
        ],
        compliance: "Medical365 Patient Registration complies with the National Health Authority (NHA) ABDM M1 milestones, Digital Personal Data Protection (DPDP) Act 2023, and Electronic Health Record (EHR) Standards for India.\n\nAll patient demographic records and identification documents are encrypted under AES-256 compliant with Indian data localization laws. Patient profiles link to Ayushman Bharat Health Accounts (ABHA).",
        table: [
            { feature: "Registration Speed", manual: "Manual typing of name, age, and address; takes 3-5 minutes per patient", m365: "1-click ABHA QR scan onboarding completed in under 20 seconds" },
            { feature: "Data Accuracy", manual: "Frequent typos in names, phone numbers, and birth dates causing record mixups", m365: "100% verified demographic data imported directly from government Aadhaar/ABHA" },
            { feature: "Duplicate File Prevention", manual: "Returning patients who forgot paper card get duplicate files created", m365: "Intelligent fuzzy matching preventing duplicate records across hospital history" },
            { feature: "Patient Identification", manual: "Paper card easily damaged; no photo verification leading to identity fraud", m365: "Biometric webcam photo and barcode wristband verifying patient identity" },
            { feature: "Queue Integration", manual: "Patient carries paper slip to OPD waiting room; receptionist must phone nurse", m365: "Instant automated digital dispatch to consulting doctor's electronic queue" }
        ],
        faqs: [
            { q: "How does the 'Scan and Share' ABHA registration work at the hospital counter?", a: "Patients scan the hospital's ABDM QR code using their smartphone camera or any ABDM-enabled app (like ABHA App, Aarogya Setu, or Paytm). Their verified demographic details instantly transfer to the reception counter screen, completing registration without typing a single word." },
            { q: "What happens if a patient does not have a smartphone or Aadhaar card?", a: "The software supports rapid manual registration: front-desk staff can enter the patient's name, phone number, and age manually, generating an instant hospital UHID in under 45 seconds." },
            { q: "How does the software prevent duplicate patient records?", a: "When a phone number or name is typed, Medical365's real-time deduplication engine checks existing hospital records using phonetic algorithms (Soundex / Metaphone). If a potential match is detected, it alerts the clerk to merge or select the existing file." },
            { q: "Can the system print barcode labels for blood collection tubes at registration?", a: "Yes. Integrated thermal label printers can instantly generate standardized patient barcode stickers for phlebotomy blood tubes, urine containers, and physical file folders." },
            { q: "Does the module support government health scheme verification (PMJAY, CGHS)?", a: "Yes. Staff can record scheme registration numbers (such as Ayushman Bharat PMJAY Golden Card ID or CGHS beneficiary ID) and upload scheme approval letters directly to the patient's profile." },
            { q: "Can patients register themselves on self-service lobby kiosks?", a: "Yes. Medical365 supports touchscreen lobby kiosks where patients can scan their ABHA QR code, choose their consulting doctor, pay the registration fee via UPI, and collect their printed token card." }
        ]
    },

    "patient-history": {
        cluster: "CORE",
        title: "Longitudinal Patient Medical History Software | Unified EMR | Medical365",
        h1: "Longitudinal Patient Medical History & Unified Health Record Software",
        metaDesc: "Medical365 patient history software aggregates lifelong OPD visits, surgical procedures, chronic conditions & past lab trends into a unified longitudinal EMR timeline.",
        diagramTitle: "Longitudinal Patient Health History & Unified EMR Architecture",
        nodes: ["Multi-Specialty Clinical Touchpoints", "Centralized Longitudinal Data Vault", "Automated Chronic Problem List (ICD-10)", "Multi-Year Lab & Vitals Trend Graphs", "Unified Clinician Summary & ABHA Sync"],
        color: "#2563eb",
        quickAnswer: "Patient history software is a core clinical medical record aggregation module that synthesizes a patient's complete lifelong health journey into a unified, chronological timeline. It consolidates outpatient consultations, hospital admissions, surgical operative notes, chronic condition registries, allergy alerts, past medications, and multi-year laboratory trend graphs into an instant 360-degree clinician view.",
        bgText: "Healthcare delivery is intrinsically longitudinal. A patient presenting to a cardiologist with chest pain may have a decade-long history of type 2 diabetes managed by an endocrinologist, a past orthopedic spinal fusion, and an adverse allergic reaction to penicillin documented five years earlier in another department. Effective, safe clinical decision-making requires immediate access to this complete clinical context.\n\nIn conventional hospital environments, patient history is dangerously fragmented. Information is buried inside thick, disheveled paper case folders containing hundreds of loose diagnostic slips, discharge summaries, and illegible clinical notes. During rapid consultations, doctors lack the 15 minutes required to excavate these paper archives. Critical past diagnoses—such as chronic kidney disease, past transient ischemic attacks, or previous drug toxicities—remain hidden, leading to redundant diagnostic testing, conflicting medication regimens, and preventable clinical errors.\n\nMedical365's Patient History module transforms fragmented data into an interactive, longitudinal clinical command center. Automatically organizing every clinical encounter, surgery, lab test, and prescription onto an intuitive chronological timeline with interactive vitals and lab trend graphs, Medical365 gives doctors complete clinical clarity in under five seconds.",
        capabilities: [
            { title: "360-Degree Unified Longitudinal Patient Timeline", text: "Consolidates all outpatient consultations, inpatient admissions, emergency visits, surgeries, and tele-consultations across all hospital departments into a single chronological view." },
            { title: "Active Chronic Problem List & Comorbidity Tracker", text: "Maintains an interactive, ICD-10 and SNOMED-CT coded chronic problem list (Hypertension, Diabetes, CKD, Asthma) tracking onset dates, status (active, resolved, in remission), and treating physicians." },
            { title: "Multi-Year Laboratory & Vitals Trend Graphing", text: "Interactive longitudinal trend lines plotting vital physiological parameters (HbA1c, serum creatinine, lipid profiles, blood pressure, weight) over 5+ years of clinical history." },
            { title: "Comprehensive Lifetime Medication & Allergy Registry", text: "Tracks active, past, and discontinued pharmacotherapies, highlighting adverse drug reactions, verified severe drug allergies, and past treatment discontinuations." },
            { title: "Past Surgical & Procedural History Timeline", text: "Documents major and minor surgical procedures: surgery date, operative indication, operating surgeon, surgical technique, and implant serial numbers." },
            { title: "External Document & PDF Record Ingestion with OCR", text: "Enables clinicians and patients to upload external discharge summaries, paper lab reports, and imaging scans, automatically indexing them with OCR searchability." }
        ],
        workflowSteps: [
            { step: "Patient Chart Opening", desc: "Doctor opens patient chart; 360-degree executive health summary displays key active problems, allergies, and vitals." },
            { step: "Interactive Timeline Exploration", desc: "Clinician scrolls through chronological timeline or filters by specialty (e.g. Cardiology only) in 1 click." },
            { step: "Longitudinal Trend Review", desc: "Doctor clicks 'Creatinine'; software graphs 3-year renal function trend alongside medication changes." },
            { step: "Problem List Update", desc: "Doctor resolves acute conditions (e.g. Pneumonia: Resolved) or adds new chronic diagnosis to the active registry." },
            { step: "Seamless Consultation Integration", desc: "Relevant past history auto-populates today's consultation note, eliminating redundant manual typing." }
        ],
        compliance: "Medical365 Patient History complies with Ministry of Health and Family Welfare (MoHFW) EHR Standards for India, SNOMED-CT terminology standards, and LOINC laboratory coding.\n\nAll historical health records are encrypted under AES-256 compliant with the DPDP Act 2023. Comprehensive patient histories integrate seamlessly with national ABDM health lockers.",
        table: [
            { feature: "History Retrieval Speed", manual: "Flipping through 100-page paper files; takes 10-15 minutes of doctor time", m365: "Instant 360-degree digital executive summary displayed in under 3 seconds" },
            { feature: "Lab Trend Analysis", manual: "Comparing multiple paper sheets across folders to see if HbA1c improved", m365: "Interactive visual trend graph plotting multi-year laboratory changes" },
            { feature: "Problem List Maintenance", manual: "Past diagnoses buried in narrative text notes; often forgotten", m365: "Structured, coded Active Problem List highlighting active comorbidities" },
            { feature: "Medication Reconciliation", manual: "Asking patient 'what tablets do you take?'; patients forget names", m365: "Permanent digital medication registry showing past and current prescriptions" },
            { feature: "Cross-Department Continuity", manual: "Surgical and medical OPD notes kept in separate physical records", m365: "Unified hospital-wide record connecting all medical and surgical specialties" }
        ],
        faqs: [
            { q: "How does the software display multi-year laboratory trends?", a: "Clinicians can click on any laboratory parameter (such as HbA1c, Serum Creatinine, or TSH) to view an interactive line graph showing all historical values plotted chronologically alongside clinical medication changes." },
            { q: "Can doctors upload past paper medical records from other hospitals?", a: "Yes. Staff and patients can photograph or scan past hospital discharge summaries, external lab reports, and vaccination cards. Medical365's optical character recognition (OCR) indexes the text, making historical records fully searchable." },
            { q: "How is patient confidentiality maintained when multiple doctors view the history?", a: "Medical365 enforces granular Role-Based Access Control (RBAC): doctors see clinical history relevant to medical care, while sensitive psychiatric evaluations or confidential notes are protected behind departmental security permissions." },
            { q: "Does the system maintain an active chronic problem list?", a: "Yes. The active problem list displays ongoing chronic illnesses (such as Type 2 Diabetes, Coronary Artery Disease, and Hypertension) coded in SNOMED-CT, ensuring all treating physicians are immediately aware of underlying comorbidities." },
            { q: "Can patients view their complete health timeline on their smartphones?", a: "Yes. Through the Medical365 patient app, patients can review their complete medical timeline, past prescriptions, and diagnostic reports, empowering them to manage their own health." },
            { q: "Is the patient history linked with the Ayushman Bharat Digital Mission (ABDM)?", a: "Yes. When connected to the patient's ABHA ID, the software can pull verified past health records from other ABDM-compliant hospitals across India with patient digital consent." }
        ]
    },

    "diagnosis-treatment": {
        cluster: "CORE",
        title: "Clinical Diagnosis & Treatment Planning Software | EMR CDS | Medical365",
        h1: "Clinical Diagnosis & Evidence-Based Treatment Planning Software",
        metaDesc: "Medical365 diagnosis and treatment software integrates ICD-10 coding, clinical decision support (CDS), evidence-based order sets & care plans for hospitals.",
        diagramTitle: "Clinical Diagnosis & Evidence-Based Order Set Architecture",
        nodes: ["Patient Clinical Symptom Intake", "ICD-10 / SNOMED-CT Diagnostic Search", "Clinical Decision Support (CDS) Engine", "Evidence-Based Treatment Order Set", "Structured Consultation Note & EMR Sync"],
        color: "#2563eb",
        quickAnswer: "Diagnosis and treatment software is a clinical decision support (CDS) and care planning module for outpatient and inpatient physicians. It accelerates diagnostic coding with intelligent ICD-10 and SNOMED-CT search, offers evidence-based disease order sets (labs, medications, nursing protocols), checks for drug-disease contraindications, and structures comprehensive multidisciplinary treatment plans.",
        bgText: "Clinical diagnosis and therapeutic decision-making form the intellectual core of medicine. In modern high-volume outpatient clinics and acute hospital wards, doctors evaluate complex multimorbid patients under intense time constraints: synthesizing symptoms, selecting precise diagnostic codes, prescribing multi-drug regimens, ordering appropriate laboratory panels, and formulating long-term follow-up strategies.\n\nIn conventional hospital environments, diagnostic documentation is unstructured and inconsistent. Doctors write informal abbreviations in paper notes (e.g. 'HTN + DM2 + OA') without standardized medical coding, making institutional clinical audits, insurance pre-authorizations, and disease registry reporting nearly impossible. Crucially, without computerized clinical decision support, doctors are vulnerable to prescribing medications contraindicated in specific underlying illnesses (such as prescribing NSAIDs to a patient with chronic kidney disease or beta-blockers to an asthmatic).\n\nMedical365's Diagnosis and Treatment module streamlines clinical care with intelligent decision support. Featuring ultra-fast ICD-10 and SNOMED-CT auto-complete search, pre-configured evidence-based clinical order sets for hundreds of diseases, real-time drug-disease contraindication alerts, and 1-click care plan generation, Medical365 enhances diagnostic accuracy and therapeutic safety.",
        capabilities: [
            { title: "Intelligent ICD-10 & SNOMED-CT Diagnostic Search Engine", text: "Sub-second predictive search across over 70,000 official ICD-10-CM diagnostic codes and SNOMED-CT clinical concepts, supporting colloquial medical synonyms and clinical acronyms." },
            { title: "Evidence-Based Clinical Order Sets & Care Bundles", text: "Pre-configured, customizable disease order bundles (e.g. Acute STEMI, Sepsis Bundle, Diabetic Ketoacidosis, Community-Acquired Pneumonia) grouping diagnostic labs, medications, and nursing orders." },
            { title: "Real-Time Drug-Disease Contraindication Safety Checks", text: "Automated clinical decision support engine flagging proposed medications that are contraindicated in the patient's documented diagnoses (e.g. Metformin in severe renal failure)." },
            { title: "Provisional vs. Confirmed Diagnostic Staging", text: "Allows clinicians to categorize diagnostic certainty: Differential Diagnosis, Provisional Diagnosis (pending lab/imaging results), and Confirmed Definitive Diagnosis." },
            { title: "Multidisciplinary Care Plan & Referral Workflow", text: "Enables clinicians to formulate structured treatment roadmaps: diet recommendations, physical activity guidelines, inter-specialty referrals, and scheduled follow-up milestones." },
            { title: "Automated Insurance TPA Diagnostic Justification", text: "Links prescribed diagnostic tests and inpatient treatments directly to primary diagnostic codes, streamlining cashless insurance approvals and minimizing TPA query rejections." }
        ],
        workflowSteps: [
            { step: "Symptom & Finding Review", desc: "Clinician reviews patient's history, physical examination, and latest diagnostic investigations." },
            { step: "Predictive Diagnostic Coding", desc: "Doctor types first few letters; system suggests matched ICD-10/SNOMED-CT codes with colloquial synonyms." },
            { step: "Evidence-Based Order Set Activation", desc: "Selecting diagnosis (e.g. Type 2 Diabetes) auto-suggests guideline lab orders (HbA1c, lipid panel, microalbumin) and therapies." },
            { step: "Clinical Decision Support Check", desc: "System verifies absence of drug-disease contraindications and drug-drug interactions in real time." },
            { step: "Care Plan Finalization & Patient Dispatch", desc: "Consultation note finalizes; clear bilingual treatment plan and dietary guidelines dispatch to patient WhatsApp." }
        ],
        compliance: "Medical365 Diagnosis and Treatment complies with the Ministry of Health and Family Welfare (MoHFW) EHR Standards for India, WHO ICD-10/ICD-11 standards, and International SNOMED-CT specifications.\n\nAll diagnostic formulations, clinical order logs, and CDS alerts are encrypted under AES-256 compliant with the DPDP Act 2023. Diagnostic summaries link seamlessly to national ABDM health lockers.",
        table: [
            { feature: "Diagnostic Coding", manual: "Handwritten informal abbreviations ('HTN/DM') without standard codes", m365: "Standardized ICD-10 and SNOMED-CT coding with sub-second predictive search" },
            { feature: "Order Set Efficiency", manual: "Writing out individual lab tests and medications by hand on every visit", m365: "1-click evidence-based order sets bundling labs, drugs, and dietary guidance" },
            { feature: "Drug-Disease Safety", manual: "Relies entirely on doctor memory; risk of prescribing contraindicated drugs", m365: "Automated clinical alerts blocking medications contraindicated in patient's illnesses" },
            { feature: "Insurance Claim Processing", manual: "High claim rejection rates due to missing diagnostic justification codes", m365: "Direct linkage between diagnostic codes and billed treatments ensuring rapid TPA approvals" },
            { feature: "Care Continuity", manual: "Vague verbal advice to patient; patients drop out of care plans", m365: "Clear, structured care roadmap delivered directly to patient mobile app" }
        ],
        faqs: [
            { q: "How does the predictive ICD-10 search handle non-standard medical terms?", a: "Medical365 includes an intelligent clinical vocabulary layer that maps thousands of colloquial synonyms, common abbreviations, and misspelled search terms (e.g. 'sugar', 'BP', 'heart attack', 'dengue') to their exact official ICD-10-CM codes instantly." },
            { q: "Can hospitals customize disease order sets according to institutional protocols?", a: "Yes. Clinical heads and department chairs can configure and standardize evidence-based order sets for their hospital (e.g. 'Standard Hospital Sepsis Protocol' or 'Day-1 Post-LSCS Care Bundle') with customized drug dosages and lab panels." },
            { q: "How do drug-disease contraindication alerts protect patient safety?", a: "When a doctor selects a drug, the clinical decision support engine cross-checks the patient's active diagnoses. For example, if a doctor attempts to prescribe an NSAID to a patient with documented Chronic Kidney Disease or Peptic Ulcer, the system immediately displays a warning." },
            { q: "Does the software support differential diagnosis recording?", a: "Yes. Clinicians can list differential diagnoses with probability rankings, converting them to confirmed diagnoses once confirmatory laboratory or radiological results return." },
            { q: "Can doctors prescribe lifestyle, dietary, and exercise recommendations?", a: "Yes. The treatment builder includes pre-configured lifestyle prescription modules covering diabetic diets, low-salt DASH diets, physical exercise targets, and smoking cessation guidance." },
            { q: "Are diagnostic codes exportable for hospital epidemiological analytics?", a: "Yes. Hospital administrators can generate disease incidence heat maps, seasonal viral outbreak trends, and morbidity statistics across any time period in 1 click." }
        ]
    },

    "e-prescriptions": {
        cluster: "CORE",
        title: "E-Prescribing Software India | Digital Rx & Pharmacy EMR | Medical365",
        h1: "E-Prescriptions & Electronic Medication Management Software",
        metaDesc: "Medical365 e-prescription software automates digital Rx writing, drug-drug interaction checks, dosage calculators, branded PDF generation & WhatsApp dispatch in India.",
        diagramTitle: "E-Prescription Generation & Closed-Loop Pharmacy Architecture",
        nodes: ["Clinician OPD Consultation", "Intelligent Drug Search & Dosage Selector", "Automated Drug-Drug & Allergy Safety Check", "Digital Signature & Branded Rx Builder", "Instant WhatsApp & Hospital Pharmacy Sync"],
        color: "#2563eb",
        quickAnswer: "E-prescriptions software is an advanced electronic prescribing and clinical medication safety module. It eliminates illegible handwritten prescriptions, provides predictive brand and generic drug search from an Indian formulary of over 50,000 medicines, executes real-time drug-drug interaction and allergy checks, applies digital clinician signatures, and dispatches bilingual digital prescriptions to patients via WhatsApp and hospital pharmacies.",
        bgText: "The written prescription is the most common and consequential therapeutic intervention in outpatient clinical practice. However, conventional paper prescriptions represent a significant source of medication errors, patient confusion, and dispensing mistakes. Handwritten doctor notes—often famously difficult to decipher—lead to pharmacists confusing look-alike, sound-alike (LASA) medications, dispensing incorrect drug strengths, or misinterpreting dosing frequencies.\n\nIn India, the National Medical Commission (NMC) regulations strongly advocate legible, generic-name prescribing and digital health adoption. Writing paper prescriptions by hand during high-volume OPD clinics (often 40-60 patients per session) causes severe physician fatigue, risks missing critical drug-drug interactions, and leaves no digital audit trail for future clinical reviews or insurance claims.\n\nMedical365's E-Prescription module empowers doctors to generate complete, elegant, and error-free digital prescriptions in under 45 seconds. Equipped with predictive drug search across all Indian pharmaceutical formulations, automated weight-based dosage calculators, real-time drug interaction safeguards, and 1-click WhatsApp delivery, Medical365 modernizes clinical prescribing.",
        capabilities: [
            { title: "Predictive Brand & Generic Indian Formulary Search", text: "Instant auto-complete search across over 50,000 branded and generic medicines available in India, detailing active ingredients, strengths, and available dosage forms." },
            { title: "Real-Time Drug-Drug & Drug-Food Interaction Checker", text: "Automated pharmacological safety engine alerting clinicians to severe, moderate, and minor drug-drug interactions (e.g. Warfarin + NSAIDs, ACE inhibitors + Potassium)." },
            { title: "Known Allergy & Cross-Reactivity Safety Shields", text: "Cross-checks prescribed active ingredients against patient's documented drug allergies (e.g. Penicillin, Sulfa drugs), triggering hard blocks on dangerous prescriptions." },
            { title: "Visual Multilingual Dosing Schedules (Morning, Noon, Night)", text: "Structures intuitive dosing instructions with visual icons (Morning, Afternoon, Evening, Bedtime) and food relationship instructions (Before Food, After Food) in English, Hindi, and regional languages." },
            { title: "Customizable 1-Click Frequent Prescription Favorites", text: "Allows individual doctors and departments to save frequently prescribed drug combinations (e.g. 'Standard URTI Kit' or 'Diabetic Starter Pack') for 1-click rapid prescribing." },
            { title: "Tamper-Proof Branded PDF Dispatch via WhatsApp & SMS", text: "Generates beautiful, professional PDF prescriptions with hospital logo, doctor credentials, NMC registration number, and digital signature delivered to patient WhatsApp." }
        ],
        workflowSteps: [
            { step: "Drug Selection & Strength Entry", desc: "Doctor types first 2 letters; system suggests formulation (e.g. Tab. Augmentin 625mg) with generic name." },
            { step: "Timing & Duration Specification", desc: "Doctor selects dosing pattern (1-0-1 after food for 5 days) using 1-click quick buttons." },
            { step: "Automated Safety Screening", desc: "Safety engine checks for drug interactions, allergies, and duplicate therapies in real time." },
            { step: "Digital Signature & Finalization", desc: "Doctor clicks 'Sign & Finish'; prescription locks with encrypted electronic signature." },
            { step: "Instant Patient & Pharmacy Sync", desc: "Branded PDF sends to patient WhatsApp; digital order routes to in-hospital pharmacy for dispensing." }
        ],
        compliance: "Medical365 E-Prescriptions adhere to National Medical Commission (NMC) Registered Medical Practitioner Regulations, Information Technology Act 2000 digital signature rules, and Drugs and Cosmetics Act 1940.\n\nAll prescriptions, doctor signatures, and pharmacy orders are encrypted under AES-256 compliant with the DPDP Act 2023. Prescriptions integrate with ABDM digital health lockers.",
        table: [
            { feature: "Prescription Legibility", manual: "Handwritten notes easily misread by pharmacists and patients", m365: "100% crystal-clear printed and digital prescription eliminating dispensing errors" },
            { feature: "Drug Interaction Checks", manual: "Relies on physician memory; easy to overlook subtle multi-drug interactions", m365: "Automated real-time safety screen alerting to drug-drug and food interactions" },
            { feature: "Allergy Verification", manual: "Doctor must ask or check old paper file; easily missed in busy OPD", m365: "Instant hard-stop alert if prescribing an agent matching patient allergy history" },
            { feature: "Patient Convenience", manual: "Paper slip easily lost, requiring another clinic visit for duplicate", m365: "Permanent digital PDF prescription accessible anytime on patient WhatsApp" },
            { feature: "Pharmacy Integration", manual: "Patient stands in long pharmacy line while staff manually re-enters drugs", m365: "Instant electronic order transmission to in-hospital pharmacy counter" }
        ],
        faqs: [
            { q: "Are digital e-prescriptions generated on Medical365 legally valid in India?", a: "Yes. Prescriptions generated on Medical365 strictly comply with the Information Technology Act 2000 and National Medical Commission (NMC) guidelines: they include the doctor's full name, medical qualification, state/national registration number, clinic address, timestamp, and verifiable digital signature." },
            { q: "Can doctors prescribe both brand names and generic names?", a: "Yes. In compliance with NMC guidelines, Medical365 automatically displays the generic chemical composition (active pharmaceutical ingredient) prominently underneath any selected commercial brand name." },
            { q: "How does the dosage frequency selector work?", a: "Doctors can use intuitive 1-click buttons (1-0-1, 1-1-1, 0-0-1, SOS, STAT) or custom intervals, with clear food timing toggles (Before Food, After Food, With Food) that translate automatically into the patient's preferred language." },
            { q: "Can doctors save personalized prescription templates for common ailments?", a: "Yes. Clinicians can create customized prescription bundles (e.g. 'Gastroenteritis Protocol', 'Hypertension Step-1') that populate complete medication lists with dosages, instructions, and lifestyle advice in a single click." },
            { q: "How do in-hospital pharmacies receive e-prescriptions?", a: "The moment a doctor signs an e-prescription, it appears on the hospital pharmacy's dispensing screen with patient UHID, allowing pharmacists to prepare the medication package before the patient reaches the counter." },
            { q: "Can patients request prescription refills through the mobile app?", a: "Yes. For chronic diseases, patients can request a prescription refill through the Medical365 app, allowing the doctor to review compliance and authorize an electronic refill with 1 tap." }
        ]
    },

    "medication-tracking": {
        cluster: "CORE",
        title: "Hospital Medication Administration (eMAR) Software | Pharmacy EMR | Medical365",
        h1: "Inpatient Medication Administration (eMAR) & Adherence Software",
        metaDesc: "Medical365 medication tracking software manages electronic medication administration records (eMAR), bedside barcode scanning & outpatient adherence for Indian hospitals.",
        diagramTitle: "Inpatient Medication Administration (eMAR) Closed-Loop Pipeline",
        nodes: ["Doctor E-Prescription Order", "Hospital Pharmacy Dispensing & Barcode", "Bedside Nurse Barcode Wristband Scan", "Five Rights Medication Administration (eMAR)", "Real-Time Dosage Chart & Clinical Audit"],
        color: "#2563eb",
        quickAnswer: "Medication tracking software is a comprehensive clinical medication administration and adherence system for inpatient wards and outpatient care. It powers electronic Medication Administration Records (eMAR), enforces bedside barcode scanning (verifying the 'Five Rights' of medication administration), tracks high-risk drug dual verifications (Insulin, Heparin, Chemotherapy), and manages outpatient medication compliance.",
        bgText: "Medication administration errors represent one of the leading causes of preventable patient morbidity in inpatient hospital care. In busy hospital wards and intensive care units, nursing staff administer hundreds of doses of oral, intravenous, and subcutaneous medications every shift.\n\nIn conventional hospitals, inpatient medication administration is tracked on paper nursing charts (Kardex). Nurses must manually read handwritten doctor orders, transcribe them into nursing flowsheets, and sign with pen after giving medicines. During busy shift changes, doses are frequently missed, delayed, or double-administered. Crucially, without bedside barcode verification, the risk of giving the wrong medication to the wrong patient remains a persistent clinical hazard.\n\nMedical365's Medication Tracking module brings closed-loop medication safety to hospital wards and ICU beds. Utilizing mobile barcode scanning, nurses scan the patient's wristband and the medication vial at the bedside, verifying the 'Five Rights' (Right Patient, Right Drug, Right Dose, Right Route, Right Time) before administration, creating an audit-proof digital flowsheet.",
        capabilities: [
            { title: "Electronic Medication Administration Record (eMAR)", text: "Real-time digital nursing flowsheet displaying scheduled, overdue, and PRN (as needed) medications color-coded by administration status (Given, Held, Refused, Missed)." },
            { title: "Bedside Closed-Loop Barcode Scanning Verification", text: "Requires nurses to scan the patient's barcode wristband and medication packaging barcode using a mobile tablet/scanner, verifying the Five Rights before administration." },
            { title: "High-Alert Medication Dual-Nurse Verification Shield", text: "Mandates independent digital dual-sign-off for high-alert medications (Insulin infusions, IV Heparin, concentrated electrolytes, narcotics, chemotherapy) before delivery." },
            { title: "Automated IV Infusion & Drip Rate Calculator", text: "Calculates micro-drip and macro-drip rates (drops/min) and IV infusion pump flow rates (ml/hr) based on doctor orders, tracking fluid volumes infused." },
            { title: "Outpatient Medication Adherence & WhatsApp Reminders", text: "Dispatches automated daily WhatsApp dosing alerts to chronic disease outpatients, allowing patients to confirm taken doses on their mobile phones." },
            { title: "Controlled Substance & Narcotic Registry Log", text: "Maintains an immutable digital ledger tracking Schedule X and narcotic drug administration, waste disposal, and witness sign-offs compliant with NDPS regulations." }
        ],
        workflowSteps: [
            { step: "Order Routing to eMAR", desc: "Doctor e-prescribes inpatient medication; order populates the nursing ward eMAR flowsheet automatically." },
            { step: "Medication Preparation", desc: "Pharmacy dispenses unit-dose barcoded medications to the nursing medication cart." },
            { step: "Bedside Patient & Drug Scan", desc: "Nurse scans patient wristband and medicine barcode; system confirms matching patient and correct timing." },
            { step: "Administration & eMAR Sign-Off", desc: "Nurse administers dose and taps 'Given' on mobile tablet; flowsheet updates in real time." },
            { step: "Doctor Ward Round Review", desc: "Attending doctor views real-time medication chart on tablet during rounds, checking given vs. held doses." }
        ],
        compliance: "Medical365 Medication Tracking adheres to NABH Hospital Accreditation Standards, WHO Patient Safety Guidelines, and the Narcotic Drugs and Psychotropic Substances (NDPS) Act.\n\nAll administration timestamps, nurse digital signatures, and barcode logs are encrypted under AES-256 compliant with the DPDP Act 2023. Inpatient drug records link to ABDM health summaries.",
        table: [
            { feature: "Administration Verification", manual: "Paper Kardex sheets without verification; risk of wrong patient error", m365: "Bedside barcode scanning guaranteeing the 5 Rights of medication safety" },
            { feature: "Missed Dose Detection", manual: "Missed doses discovered hours later at end-of-shift chart reconciliation", m365: "Prominent visual color alerts when doses are approaching or overdue" },
            { feature: "High-Alert Drug Safety", manual: "Informal verbal check; no permanent proof of second nurse verification", m365: "Mandatory digital dual-nurse sign-off for insulin, heparin, and narcotics" },
            { feature: "IV Fluid Balance", manual: "Manual arithmetic on intake/output paper charts prone to calculation errors", m365: "Automated cumulative fluid infusion tracking directly into EMR fluid balance" },
            { feature: "Audit Trail", manual: "Paper charts easily altered, misplaced, or damaged during legal disputes", m365: "Immutable digital timestamp and user ID log for every administered dose" }
        ],
        faqs: [
            { q: "How does bedside barcode scanning prevent medication administration errors?", a: "Before administering any medication, the nurse scans the barcode on the patient's ID wristband and the barcode on the unit-dose medicine packaging using a mobile tablet. If the drug, dose, or patient does not match the active doctor's order, an immediate audio-visual alarm blocks administration." },
            { q: "Can nurses document reasons why a medication was held or refused?", a: "Yes. If a patient refuses a dose or if clinical criteria require withholding (e.g. withholding Antihypertensives due to low blood pressure), the nurse selects the reason (e.g. 'Patient NPO for surgery' or 'Systolic BP <90'), alerting the attending doctor." },
            { q: "How does the system manage PRN (as needed) medications?", a: "For PRN orders (like painkillers or antiemetics), the software enforces minimum dosing intervals (e.g. 'every 6 hours as needed'), preventing accidental overdose if requested repeatedly." },
            { q: "Does the module support mobile tablets for nursing rounds?", a: "Yes. The eMAR interface is optimized for handheld tablets and mobile carts on wheels (COWs), allowing nurses to carry the complete medication flowsheet directly to the bedside." },
            { q: "How are controlled substances (narcotics) audited?", a: "Every narcotic dose requires dual-credential authentication. If a partial vial is used, the wasted quantity must be witnessed and signed off by a second registered nurse, maintaining a legally bulletproof digital register." },
            { q: "Can outpatients receive daily medicine reminder notifications?", a: "Yes. For discharged patients with complex regimens, the system can send automated daily WhatsApp dosing reminders prompting them to take morning and evening medications on time." }
        ]
    },

    "lab-integration": {
        cluster: "CORE",
        title: "Hospital LIS & Pathology Lab Integration Software | Lab EMR | Medical365",
        h1: "Laboratory Information System (LIS) & Pathology Integration Software",
        metaDesc: "Medical365 lab integration software connects bi-directional pathology analyzers, barcode sample tracking, critical panic alerts & digital PDF dispatch in India.",
        diagramTitle: "Pathology LIS & Bi-Directional Analyzer Integration Architecture",
        nodes: ["Doctor Lab Order Requisition", "Phlebotomy Barcode Tube Labeling", "Bi-Directional Clinical Analyzer Interface", "Pathologist Digital Review & Verification", "Panic Critical Alert & WhatsApp PDF Sync"],
        color: "#2563eb",
        quickAnswer: "Lab integration software is a comprehensive Laboratory Information System (LIS) and diagnostic pathology connectivity module. It manages bi-directional interfacing with clinical chemistry, hematology, and immunoassay analyzers, generates barcode sample tracking labels, automates normal reference range comparisons, triggers instant critical panic value alerts to physicians, and publishes digital pathology reports.",
        bgText: "Diagnostic laboratory investigations guide over 70% of all major clinical healthcare decisions. From routine complete blood counts (CBC) and liver function tests to cardiac troponins, blood cultures, and molecular histopathology, hospital efficiency depends on rapid, accurate diagnostic laboratory turnaround times.\n\nIn conventional hospital setups, the laboratory is often an operational bottleneck. Laboratory orders are written on paper chits that phlebotomists must manually re-type. Blood sample tubes are labeled with handwritten names that smudge, leading to misidentified specimens. Technicians must manually type test results from analyzer printouts into Word documents, introducing dangerous decimal point transcription errors. Crucially, when life-threatening critical values (such as serum potassium of 6.8 mEq/L) occur, delayed notification to treating doctors can prove fatal.\n\nMedical365's Lab Integration module establishes seamless, bi-directional connectivity between clinical diagnostic analyzers and hospital medical records. Test orders flow electronically to analyzers, results stream back automatically with zero human transcription, critical panic values trigger instant emergency notifications, and verified reports dispatch directly to patient smartphones.",
        capabilities: [
            { title: "Bi-Directional ASTM & HL7 Analyzer Interfacing", text: "Direct hardware interfacing with major clinical pathology analyzers (Roche Cobas, Beckman Coulter, Sysmex, Abbott Architect, Mindray, bioMérieux), eliminating manual typing." },
            { title: "Automated Barcode Sample Labeling & Chain of Custody", text: "Generates unique barcode labels at the phlebotomy chair, tracking sample collection timestamp, phlebotomist ID, centrifugation, and machine aspiration." },
            { title: "Intelligent Normal Reference Range & Delta Checks", text: "Compares test results against age-and-gender-adjusted reference ranges, executing delta checks against previous patient results to detect sudden unphysiological shifts." },
            { title: "Real-Time Critical Panic Value Alert Engine", text: "Immediately broadcasts high-priority emergency alerts via SMS, WhatsApp, and on-screen EMR banners to attending clinicians when panic values (e.g. Platelets <20,000) occur." },
            { title: "Digital Pathologist Workstation & Batch Verification", text: "Allows pathologists to review, cross-examine, and batch-approve hundreds of test results with digital electronic signatures and micro-morphology photo attachments." },
            { title: "Automated WhatsApp Report Dispatch with QR Verification", text: "Publishes official, tamper-proof NABL-compliant PDF reports with secure QR verification codes dispatched directly to the patient's verified WhatsApp." }
        ],
        workflowSteps: [
            { step: "Order Placement & Phlebotomy Queue", desc: "Doctor orders lab panel in EMR; test request appears immediately on the laboratory phlebotomy collection dashboard." },
            { step: "Barcode Labeling & Sample Draw", desc: "Phlebotomist scans patient UHID, prints barcode tube labels, collects sample, and registers sample intake." },
            { step: "Analyzer Aspiration & Auto-Result", desc: "Barcoded tube placed on analyzer; machine reads barcode, executes requested tests, and transmits raw values." },
            { step: "Pathologist Review & Delta Check", desc: "Pathologist reviews flags, compares with historical patient baseline, and signs report digitally." },
            { step: "Doctor Notification & WhatsApp Dispatch", desc: "Results attach to patient chart; critical panic alerts trigger immediately; PDF report dispatches via WhatsApp." }
        ],
        compliance: "Medical365 Lab Integration complies with National Accreditation Board for Testing and Calibration Laboratories (NABL) ISO 15189:2022 standards, HL7 v2/FHIR messaging protocols, and LOINC terminology.\n\nAll laboratory data, calibration logs, and patient test results are encrypted under AES-256 compliant with the DPDP Act 2023. Diagnostic reports link to ABDM national health lockers.",
        table: [
            { feature: "Data Transfer Method", manual: "Manual typing of results from machine paper printouts; high error risk", m365: "Bi-directional electronic interface streaming results with zero human typing" },
            { feature: "Sample Tracking", manual: "Handwritten stickers on tubes easily smudged, torn, or mixed up", m365: "Thermal barcode labeling with digital chain of custody from draw to disposal" },
            { feature: "Critical Panic Alerts", manual: "Phoning the ward, often reaching busy nurses or busy phone lines", m365: "Instant automated priority WhatsApp and on-screen alerts to treating doctor" },
            { feature: "Turnaround Time (TAT)", manual: "Hours spent in printing, sorting, and physically delivering paper reports", m365: "Instant automated digital report publishing upon pathologist digital sign-off" },
            { feature: "NABL Accreditation", manual: "Struggling with paper QC logs and delta checking during audits", m365: "Built-in NABL audit-ready Levey-Jennings QC charts and automated delta checks" }
        ],
        faqs: [
            { q: "Which clinical analyzer brands can interface with Medical365?", a: "Medical365 supports all leading pathology and diagnostic equipment manufacturers via standard ASTM, HL7, and serial protocols, including Roche (Cobas series), Sysmex (XN series), Beckman Coulter, Abbott (Architect/Alinity), Mindray, bioMérieux, and Horiba." },
            { q: "How do automated critical panic value alerts work?", a: "When an analyzer reports a result in the defined panic range (such as Troponin I >0.04 ng/ml, Blood Glucose <40 mg/dL, or Potassium >6.5 mEq/L), the software instantly sends priority push notifications, SMS alerts, and phone chimes to the treating consultant." },
            { q: "What is an automated 'Delta Check' in the laboratory module?", a: "A delta check automatically compares the patient's current test result with their most recent historical result (e.g. comparing today's Hemoglobin with yesterday's). If an impossible or unexpected physiological shift occurs, the system flags the sample for re-testing." },
            { q: "Can peripheral blood smear photographs be attached to CBC reports?", a: "Yes. Pathologists can attach high-resolution digital microscopy images of atypical lymphocytes, blast cells, or malarial parasites directly into the formatted report." },
            { q: "How do patients receive their diagnostic lab reports?", a: "The moment the pathologist applies their digital signature, an automated WhatsApp message delivers the official PDF report containing the laboratory's NABL accreditation logo and a secure QR code for verification." },
            { q: "Does the module support external sample collection from phlebotomy home visits?", a: "Yes. Home-visit phlebotomists use the Medical365 mobile app to verify patient identities, scan pre-printed tube barcodes, and log exact collection times and ice-box transport temperatures." }
        ]
    },

    "billing-invoicing": {
        cluster: "CORE",
        title: "Hospital Billing & Cashless Insurance Software | Hospital ERP | Medical365",
        h1: "Hospital Billing, Invoicing & Cashless Insurance Management Software",
        metaDesc: "Medical365 hospital billing software manages OPD/IPD invoicing, GST compliance, insurance TPA pre-authorization & multi-mode payments for Indian hospitals.",
        diagramTitle: "Hospital Billing, Invoicing & Cashless TPA Claims Architecture",
        nodes: ["Clinical Service Consumption Log", "Automated Tariff & GST Invoicing Engine", "Insurance TPA Cashless Pre-Auth", "Multi-Mode Payment Collection (UPI/POS)", "Financial Settlement & Discharge Clearance"],
        color: "#2563eb",
        quickAnswer: "Billing and invoicing software is an enterprise-grade hospital financial ERP and revenue cycle management (RCM) module. It automates outpatient and inpatient billing, applies tariff structures across general and private ward tiers, processes cashless insurance TPA pre-authorizations and government schemes (PMJAY), ensures GST compliance, and reconciles multi-mode payments.",
        bgText: "Financial management in a hospital is complex. Unlike retail businesses, hospital billing involves hundreds of interdependent clinical micro-transactions: doctor consultation fees, diagnostic investigations, nursing charges, bed tariffs, operating theater minute rates, surgical consumables, pharmacy items, and anesthesia fees.\n\nIn conventional Indian hospitals, billing is fragmented and prone to severe revenue leakage. Disconnected departmental billing leads to missed charges for inpatient consumables, delays in compiling discharge bills (often forcing patients to wait 4-6 hours on discharge day), and manual calculation errors. Crucially, managing private insurance TPAs (Third Party Administrators) and government cashless schemes using manual paperwork leads to frequent claim deductions, disputed pre-authorizations, and delayed hospital reimbursements.\n\nMedical365's Hospital Billing module integrates clinical care directly with financial accounting. As doctors order tests, nurses administer drugs, and surgeons execute procedures, charges flow automatically to the patient's digital folio. With 1-click insurance claim package compilation, dynamic UPI payment QR codes, and automated discharge bill generation, Medical365 eliminates revenue leakage and accelerates cash flow.",
        capabilities: [
            { title: "Unified OPD & IPD Revenue Cycle Management", text: "Seamlessly manages outpatient consultation billing, diagnostic test invoicing, day-care procedure packages, and multi-day inpatient hospital stays on a unified ledger." },
            { title: "Multi-Tiered Ward Tariff & Price List Configuration", text: "Automates differential pricing based on bed category: General Ward, Semi-Private, Deluxe Private, and ICU rates with customized doctor visit fee structures." },
            { title: "Cashless Insurance & Corporate TPA Claims Engine", text: "Manages end-to-end insurance workflows: initial pre-authorization request, query response, interim enhancement requests, and final discharge claim packages with attached bills and discharge summaries." },
            { title: "Government Health Scheme Billing (PMJAY / State Schemes)", text: "Pre-configured package rates and billing rules for Ayushman Bharat PMJAY, CGHS, ECHS, and state welfare schemes with automated pre-auth documentation." },
            { title: "GST-Compliant Healthcare Invoicing & HSN/SAC Codes", text: "Enforces Indian GST rules, segregating tax-exempt healthcare services (SAC 999312) from taxable pharmacy retail products, aesthetic procedures, and luxury private room categories." },
            { title: "Omnichannel Payment Reconciliation (UPI, Cards, Cash, NetBanking)", text: "Integrated dynamic UPI QR codes on billing screens, POS card swipe terminals, and automated payment links sent to family members for advance inpatient deposits." }
        ],
        workflowSteps: [
            { step: "Clinical Charge Ingestion", desc: "Doctor orders, nursing administrations, and OT charges stream automatically into patient billing folio." },
            { step: "Insurance Pre-Auth & Approval", desc: "TPA desk submits electronic pre-authorization request with estimated cost; initial approval letter attaches to bill." },
            { step: "Interim Deposit & Advance Tracking", desc: "Family deposits advances via UPI QR code at admission; digital receipt issues instantly to WhatsApp." },
            { step: "Discharge Bill Compilation", desc: "Final discharge bill compiles in under 3 minutes with itemized pharmacy, bed charges, and doctor visits." },
            { step: "Settlement & Gate Pass Issuance", desc: "Co-pay collected; TPA final approval confirms; system issues digital Gate Pass releasing patient." }
        ],
        compliance: "Medical365 Hospital Billing complies with Indian Goods and Services Tax (GST) healthcare regulations, Insurance Regulatory and Development Authority of India (IRDAI) claim guidelines, and National Health Authority (NHA) PMJAY standards.\n\nAll financial transactions, invoice ledgers, and insurance claims are encrypted under AES-256 compliant with the DPDP Act 2023.",
        table: [
            { feature: "Discharge Billing Speed", manual: "Manual compilation taking 4-6 hours on discharge day; angry families", m365: "Instant automated compilation completed in under 3 minutes" },
            { feature: "Revenue Leakage", manual: "Ward consumables, extra dressings, and night doctor visits forgotten", m365: "Zero leakage; all nursing administrations and doctor visits auto-post to folio" },
            { feature: "Insurance Claim Processing", manual: "Paper claim folders with photocopies mailed to TPAs; high rejection", m365: "Digital claim packages with attached EMR notes, lab reports, and itemized bills" },
            { feature: "Payment Convenience", manual: "Long queues at single cash counter; disputes over change", m365: "Dynamic UPI QR codes, debit/credit POS, and payment links on WhatsApp" },
            { feature: "Financial Audit Readiness", manual: "Disorganized paper ledgers and manual tallying prone to fraud", m365: "100% audit-proof digital ledger with real-time cashier shift reconciliations" }
        ],
        faqs: [
            { q: "How does the software eliminate long discharge billing delays?", a: "In conventional hospitals, discharge billing takes hours because staff must collect physical chits from pharmacy, labs, and wards. With Medical365, all clinical charges post in real time to the digital folio. The moment the doctor signs the discharge summary, the final itemized bill is ready instantly." },
            { q: "How does the system handle cashless insurance TPA claims?", a: "The insurance module compiles complete digital claim packages: it attaches the diagnosis code, itemized billing summary, diagnostic reports, and medical justification notes, reducing TPA query turnaround times." },
            { q: "Can hospitals configure different pricing for General Wards vs. Private Rooms?", a: "Yes. The software supports automated tariff tiers: doctor consultation fees, nursing charges, and room tariffs can scale automatically based on the patient's selected room category (General, Semi-Private, Deluxe, ICU)." },
            { q: "How does the dynamic UPI QR code feature work at the billing counter?", a: "When an invoice is generated, the cashier screen displays a dynamic UPI QR code encoded with the exact outstanding bill amount. Patients scan with Google Pay, PhonePe, or Paytm; payment confirms instantly without manual verification." },
            { q: "Does the system support Ayushman Bharat PMJAY scheme billing?", a: "Yes. Medical365 includes pre-loaded PMJAY specialty packages, pre-authorization workflows, and mandatory clinical documentation checklists required for state health scheme reimbursement." },
            { q: "Can billing reports be integrated with accounting software like Tally?", a: "Yes. Daily sales ledgers, receipt summaries, tax breakdowns, and doctor revenue-share data can be exported directly to Excel, CSV, or synced with Tally ERP." }
        ]
    },

    "billing-reports": {
        cluster: "CORE",
        title: "Hospital Revenue Analytics & Financial Reporting Software | Medical365",
        h1: "Hospital Financial Analytics, Revenue & MIS Reporting Software",
        metaDesc: "Medical365 billing reports software provides real-time hospital MIS dashboards, doctor revenue shares, departmental profitability & GST tax reports for healthcare leadership.",
        diagramTitle: "Hospital Financial Analytics & Executive MIS Architecture",
        nodes: ["Multi-Department Transaction Stream", "Real-Time Revenue Aggregation Engine", "Departmental Profitability & Bed Yield", "Doctor Revenue-Share Calculation", "Executive MIS Dashboard & Tally Export"],
        color: "#2563eb",
        quickAnswer: "Billing reports software is an executive financial analytics and Management Information System (MIS) module for hospital directors, CFOs, and healthcare administrators. It aggregates multi-departmental revenue streams, computes doctor commission splits, measures departmental profitability and bed yield, tracks corporate TPA insurance receivables, and exports audit-ready GST tax summaries.",
        bgText: "Managing a modern hospital or healthcare network requires sharp, real-time financial visibility. Hospital leadership must navigate high capital equipment costs, fluctuating bed occupancy rates, complex doctor revenue-sharing agreements, and lengthy insurance receivable cycles.\n\nIn conventional healthcare facilities, financial reporting is retrospective and delayed. Hospital directors must wait until the second week of the following month for accounts teams to manually compile revenue spreadsheets from disparate billing terminals. Critical operational questions—which department is generating the highest margin? What is the average revenue per occupied bed (ARPOB)? Which insurance TPA has overdue payments exceeding 60 days? Are doctor commission payouts accurate?—remain unanswered or rely on guesswork.\n\nMedical365's Billing Reports module transforms hospital transaction data into actionable executive intelligence. Featuring real-time visual dashboards, automated doctor revenue-share calculations, granular departmental profitability analytics, and 1-click accounting exports, Medical365 empowers healthcare leaders to optimize revenue cycle management.",
        capabilities: [
            { title: "Real-Time Hospital Executive Financial MIS Dashboard", text: "Visual executive command center displaying live daily revenue, cash vs. digital collections, bed occupancy yield, and department-by-department revenue breakdowns." },
            { title: "Automated Doctor Commission & Revenue-Share Ledger", text: "Computes complex clinician remuneration models (percentage of OPD consultations, surgical fees, IPD visit shares, after deducting lab/consumable expenses) with automated monthly payout summaries." },
            { title: "Departmental Profitability & Cost Center Analysis", text: "Granular margin analysis across clinical cost centers: Pharmacy, Radiology, Pathology, Operating Theaters, Dialysis, and Daycare Infusion." },
            { title: "Insurance TPA Aging & Accounts Receivable Tracking", text: "Tracks outstanding cashless claims categorized into aging buckets (0-30 days, 31-60 days, 61-90 days, >90 days), highlighting delayed TPA settlements and disputed deductions." },
            { title: "Average Revenue Per Occupied Bed (ARPOB) Metrics", text: "Computes essential hospital performance indicators: ARPOB, Average Length of Stay (ALOS), Bed Occupancy Rate (BOR), and bed turnover intervals." },
            { title: "1-Click Tally & ERP Export with GST Breakdown", text: "Exports audit-ready accounting journals with SAC/HSN code categorizations, exempt vs. taxable service splits, and B2B vs. B2C sales summaries ready for direct import into Tally ERP." }
        ],
        workflowSteps: [
            { step: "Automated Transaction Aggregation", desc: "Every billing transaction across OPD, IPD, lab, and pharmacy logs in real-time analytics warehouse." },
            { step: "Doctor Revenue-Share Computation", desc: "System applies contractual percentage rules, deducting lab expenses and hospital shares automatically." },
            { step: "Executive Dashboard Visualization", desc: "Hospital administrators review real-time revenue, occupancy yield, and collection modes on tablet or phone." },
            { step: "TPA Aging Reconciliation", desc: "Accounts team tracks pending insurance claims, flagging overdue payments for automated follow-up." },
            { step: "Monthly Accounting & Tax Export", desc: "Audited financial ledgers and GST summaries export to Tally and Excel with 1 click." }
        ],
        compliance: "Medical365 Billing Reports conform to Indian Accounting Standards (Ind AS), Indian Goods and Services Tax (GST) statutory audit requirements, and Corporate Governance reporting norms.\n\nAll financial analytics, doctor commission ledgers, and revenue reports are protected under AES-256 encryption compliant with the DPDP Act 2023.",
        table: [
            { feature: "Reporting Speed", manual: "Waiting 10-15 days after month-end for accountants to compile spreadsheets", m365: "Real-time, live financial analytics accessible 24/7 on smartphone and desktop" },
            { feature: "Doctor Commission Calculation", manual: "Days spent manually calculating doctor percentages on scrap paper; disputes", m365: "1-click automated calculation based on contractual revenue-share rules" },
            { feature: "Insurance Receivables (TPA)", manual: "Unclear how much money TPAs owe the hospital; delayed cash flow", m365: "Aging bucket analysis (30/60/90 days) highlighting overdue insurance claims" },
            { feature: "Department Profitability", manual: "Hospital owners see top-line revenue without knowing which department is losing money", m365: "Granular cost-center margin analytics for pharmacy, labs, and OT" },
            { feature: "Accounting Export", manual: "Manual re-entry of paper receipts into Tally taking weeks of clerk time", m365: "1-click seamless electronic XML/Excel export directly into Tally ERP" }
        ],
        faqs: [
            { q: "Can hospital owners view live revenue figures on their smartphones?", a: "Yes. Hospital directors and administrators have access to an executive mobile dashboard showing real-time gross revenue, patient footfalls, bed occupancy rates, and cash collections from anywhere in the world." },
            { q: "How does the software handle complex doctor revenue-sharing models?", a: "Medical365 allows clinics to define custom commission agreements for each consultant (e.g. 70% for OPD consultations, 50% for surgical procedures, flat rates for IPD visits, with or without deduction of consumables), generating transparent monthly payment sheets." },
            { q: "What is ARPOB and how does the software calculate it?", a: "Average Revenue Per Occupied Bed (ARPOB) measures institutional financial efficiency: ARPOB = Total Inpatient Revenue / Total Occupied Bed Days. Medical365 graphs ARPOB trends daily across general wards, private suites, and ICUs." },
            { q: "Can the system track pending payments from insurance companies and TPAs?", a: "Yes. The TPA Receivables module categorizes claims into 30, 60, and 90+ day aging buckets, tracking submitted claims, approved amounts, deductions, and received bank settlements." },
            { q: "Is the financial data exportable to Tally ERP?", a: "Yes. Financial journals, sales registers, cashier shift reconciliations, and tax summaries can be exported in standardized XML or Excel formats for seamless import into Tally ERP." },
            { q: "How are cashier shift handovers managed to prevent cash discrepancies?", a: "Every cashier closes their shift with a digital cash-drawer reconciliation: the software compares physical cash entered by the cashier with expected collections, instantly flagging any surplus or shortage before handoff." }
        ]
    },

    "notifications-system": {
        cluster: "CORE",
        title: "Healthcare Notifications & WhatsApp Messaging Software | Medical365",
        h1: "Healthcare Omnichannel Notification & Patient Messaging Software",
        metaDesc: "Medical365 notifications software automates WhatsApp appointment reminders, critical lab panic alerts, vaccination recalls & broadcast updates for Indian hospitals.",
        diagramTitle: "Healthcare Omnichannel Messaging & Notification Architecture",
        nodes: ["Clinical & Administrative Event Trigger", "Intelligent Message Routing Gateway", "WhatsApp Business API / SMS / Voice / Push", "Patient & Physician Delivery Confirmation", "EMR Communication Audit & DPDP Log"],
        color: "#2563eb",
        quickAnswer: "Notifications system software is an enterprise-grade healthcare communication and messaging orchestration module. It coordinates automated clinical and operational alerts across official WhatsApp Business API, SMS, push notifications, voice IVR, and email, managing appointment confirmations, critical lab panic alerts, medication recalls, vaccination reminders, and hospital emergency broadcasts.",
        bgText: "Timely, reliable communication is the lifeblood of efficient clinical operations and positive patient outcomes. In modern healthcare environments, delivering the right information to the right person at the exact right moment—whether alerting a surgeon to a critical emergency, reminding an expectant mother of a prenatal visit, or notifying a family of an available bed—is vital.\n\nIn conventional hospital setups, communication is fragmented and manual. Receptionists spend hours making repetitive manual phone calls to confirm tomorrow's appointments. Nurses struggle to reach busy doctors on personal phones during clinical crises. Meanwhile, vital patient education regarding fasting before blood tests or post-procedure wound care remains on paper slips that patients lose.\n\nMedical365's Notifications System automates and unifies all clinical and operational communication. Powered by deep integration with the official WhatsApp Business API and enterprise telecom gateways, the platform sends automated bilingual appointment reminders, instant critical lab alerts, vaccination recall sequences, and emergency hospital broadcasts with 99.9% delivery reliability and complete legal audit trails.",
        capabilities: [
            { title: "Official WhatsApp Business API Integration", text: "Dispatches rich interactive messages, verified PDF prescriptions, appointment reminder buttons, and diagnostic reports directly through the clinic's official green-tick WhatsApp profile." },
            { title: "High-Priority Critical Lab Panic Notification Engine", text: "Instantly routes life-threatening laboratory panic values and critical radiology findings to the attending physician via priority smartphone push chimes, SMS, and WhatsApp." },
            { title: "Automated Appointment Confirmation & Recall Sequences", text: "Dispatches automated multi-stage reminder sequences (24 hours and 2 hours prior to visit) with 1-click 'Confirm' or 'Reschedule' buttons, slashing clinic no-show rates." },
            { title: "Preventive Health & Vaccination Recall Automation", text: "Calculates child immunization milestones and chronic disease review dates, sending personalized WhatsApp reminders when booster vaccines or HbA1c tests are due." },
            { title: "Emergency Hospital Mass Broadcast System", text: "Enables administrators to broadcast targeted emergency alerts to specific staff groups (e.g. Code Blue resuscitation team, Code Red fire alert, or on-call disaster staff) with 1 tap." },
            { title: "DPDP Act 2023 Consent & Opt-Out Management", text: "Enforces Indian data privacy compliance: tracks patient digital consent for messaging and honors automated 'STOP' opt-out requests instantly." }
        ],
        workflowSteps: [
            { step: "Clinical Event Trigger", desc: "Patient books appointment, lab publishes critical value, or doctor signs prescription in EMR." },
            { step: "Message Template Assembly", desc: "System compiles personalized, bilingual notification with patient name, doctor details, and dynamic PDF link." },
            { step: "Omnichannel Dispatch", desc: "Message routes via highest-priority channel (WhatsApp primary, SMS secondary failover)." },
            { step: "Delivery & Read Receipt Confirmation", desc: "System tracks real-time delivery and read receipts, displaying status on administrative dashboard." },
            { step: "Patient Action & System Update", desc: "Patient taps 'Confirm' or 'Pay'; appointment status updates instantly in doctor's EMR queue." }
        ],
        compliance: "Medical365 Notifications System complies with the Digital Personal Data Protection (DPDP) Act 2023, Telecom Regulatory Authority of India (TRAI) DLT commercial messaging regulations, and Information Technology Act 2000.\n\nAll notification logs, patient phone numbers, and message contents are encrypted under AES-256 compliant with Indian data localization laws.",
        table: [
            { feature: "Delivery Channel", manual: "Manual phone calls or basic unbranded SMS that patients ignore", m365: "Official verified WhatsApp Business API with interactive buttons and rich PDFs" },
            { feature: "No-Show Reduction", manual: "High clinic no-show rate (25-35%) due to forgotten appointment dates", m365: "Automated 2-stage WhatsApp reminders slashing no-show rates to under 8%" },
            { feature: "Critical Lab Alerts", manual: "Phoning the ward; messages easily lost or delayed during emergencies", m365: "Instant priority push chimes and SMS sent directly to treating consultant" },
            { feature: "Vaccination Recalls", manual: "Parents forget booster shots; high drop-out rate in immunization", m365: "Automated birth-date-calculated recall messages sent before each vaccine due date" },
            { feature: "TRAI / DPDP Compliance", manual: "High risk of telecom fines due to non-compliant commercial messaging", m365: "100% compliant with TRAI DLT template registrations and DPDP consent rules" }
        ],
        faqs: [
            { q: "Why is WhatsApp messaging superior to traditional SMS for hospital notifications in India?", a: "In India, WhatsApp has over 500 million active users and achieves an open rate exceeding 95% within 30 minutes, compared to traditional SMS which is heavily filtered into spam folders. WhatsApp enables rich branded PDF delivery, clickable confirmation buttons, and interactive chatbots." },
            { q: "How does the system ensure compliance with TRAI DLT regulations in India?", a: "Medical365 routes all SMS communications through registered Distributed Ledger Technology (DLT) telecom portals, utilizing pre-approved transactional headers and templates to guarantee 100% delivery without regulatory blocking." },
            { q: "Can patients confirm or cancel appointments directly from WhatsApp?", a: "Yes. WhatsApp reminders include interactive buttons: 'Confirm Appointment', 'Reschedule', or 'Cancel'. Tapping a button instantly updates the hospital's appointment roster without receptionist involvement." },
            { q: "What happens if a WhatsApp message fails to deliver?", a: "Medical365 features automated intelligent channel failover: if a WhatsApp message fails to deliver within 5 minutes (due to lack of internet on the patient's phone), the system automatically falls back to transactional SMS." },
            { q: "Can hospital administrators send emergency mass alerts to staff?", a: "Yes. The mass broadcast tool allows administrators to send urgent notifications to specific staff groups (e.g. all ICU nurses, Code Blue doctors, or administrative heads) in a single broadcast." },
            { q: "How does the software handle patient consent and privacy under the DPDP Act 2023?", a: "The software records digital patient consent for transactional and health notification messages during registration, and respects patient opt-out preferences, maintaining complete audit logs." }
        ]
    },

    "emr-ehr-system": {
        cluster: "CORE",
        title: "Enterprise EMR & EHR Software India | ABDM Compliant Hospital System | Medical365",
        h1: "Enterprise Electronic Medical Records (EMR & EHR) Software",
        metaDesc: "Medical365 enterprise EMR/EHR software provides cloud electronic health records, ABDM M1-M3 certification, clinical decision support & multi-specialty workflows.",
        diagramTitle: "Enterprise EMR & ABDM Unified Digital Health Architecture",
        nodes: ["Omnichannel Patient Ingestion", "Multi-Specialty Clinical EMR Workstation", "Automated Clinical Decision Support (CDS)", "Closed-Loop Pharmacy, Lab & OT Flow", "Ayushman Bharat Digital Mission (ABDM) Sync"],
        color: "#2563eb",
        quickAnswer: "Enterprise EMR & EHR system software is a comprehensive clinical hospital information platform designed for multi-specialty hospitals, hospital networks, and clinical practices. Certified for Ayushman Bharat Digital Mission (ABDM M1, M2, M3), it unifies outpatient documentation, inpatient charts, clinical decision support, e-prescribing, laboratory LIS, imaging PACS, and digital health records on an enterprise-grade cloud architecture.",
        bgText: "Healthcare delivery in modern multi-specialty hospitals is an intricately coordinated clinical ecosystem. From outpatient clinics and emergency triage to operating theaters, intensive care units, diagnostic laboratories, and pharmacies, patient care requires continuous, high-fidelity information exchange.\n\nIn conventional Indian hospitals, clinical operations remain severely impaired by legacy software silos and fragmented paper charts. Outpatient notes, nursing flows, surgical records, and laboratory reports reside on disparate, incompatible systems that do not communicate with each other. Doctors spend valuable consultation time hunting for paper records, handovers between clinical shifts are prone to lost information, and hospitals struggle to achieve national accreditations (NABH) or integrate with government digital health platforms.\n\nMedical365's Enterprise EMR & EHR platform unites every hospital clinical department into a seamless, intelligent digital continuum. Certified for all milestones of the Ayushman Bharat Digital Mission (ABDM), equipped with sub-second clinical charting, multi-specialty templates, and closed-loop patient safety safeguards, Medical365 delivers world-class healthcare operations and clinical excellence.",
        capabilities: [
            { title: "Complete ABDM M1, M2 & M3 National Certification", text: "Certified by the National Health Authority (NHA) for all ABDM milestones: M1 (ABHA creation & verification), M2 (Health Information Provider HIP - linking health records), and M3 (Health Information User HIU - viewing consent-based longitudinal health records)." },
            { title: "Specialty-Specific Clinical Charting Templates", text: "Pre-configured, interactive clinical workstations tailored for Cardiology, Orthopedics, Neurology, Pediatrics, Ophthalmology, Gynecology, Dermatology, Dental, and Oncology." },
            { title: "Closed-Loop Inpatient (IPD) & Nursing Command Center", text: "Unifies bed management, nursing vitals flowsheets, electronic Medication Administration Records (eMAR), doctor ward rounds, and discharge summaries on mobile tablets." },
            { title: "Intelligent Clinical Decision Support (CDS) Engine", text: "Real-time safety shields alerting clinicians to drug-drug interactions, known allergies, duplicate therapies, abnormal pediatric dosages, and abnormal lab delta shifts." },
            { title: "Enterprise Scalability & Multi-Location Hospital Network", text: "Centralized cloud architecture supporting multi-hospital chains, regional clinics, and diagnostic franchises with unified patient UHIDs and consolidated financial reporting." },
            { title: "NABH & Joint Commission International (JCI) Audit Readiness", text: "Enforces mandatory clinical documentation standards, audit-proof electronic signatures, medication safety protocols, and quality indicators required for NABH accreditation." }
        ],
        workflowSteps: [
            { step: "Patient Intake & ABHA Verification", desc: "Patient registered via ABHA QR code; lifetime UHID assigned; digital chart activates across hospital." },
            { step: "Specialty Clinical Consultation", desc: "Doctor uses specialty-specific visual tools to document findings, select ICD-10 diagnoses, and e-prescribe." },
            { step: "Closed-Loop Departmental Execution", desc: "Diagnostic lab orders stream to LIS, medications route to pharmacy eMAR, and surgical requests populate OT schedule." },
            { step: "Inpatient Care & Bedside Nursing", desc: "Ward nurses record vitals and administer barcoded medicines on tablets, alerting doctors to any deterioration." },
            { step: "Discharge & National Health Sync", desc: "Discharge summary auto-compiles, bills settle, and verified health record links to patient's ABHA health locker." }
        ],
        compliance: "Medical365 Enterprise EMR/EHR complies with National Health Authority (NHA) ABDM standards, National Accreditation Board for Hospitals (NABH) guidelines, Ministry of Health and Family Welfare (MoHFW) EHR Standards for India, and ISO/IEC 27001.\n\nAll hospital data is protected under AES-256 encryption compliant with the DPDP Act 2023. Systems integrate seamlessly with national Ayushman Bharat Health Accounts (ABHA).",
        table: [
            { feature: "System Architecture", manual: "Disconnected software silos for billing, labs, and OPD; heavy paper charts", m365: "Unified enterprise cloud EMR connecting all hospital departments seamlessly" },
            { feature: "National ABDM Integration", manual: "Non-compliant with ABDM; unable to participate in government digital health", m365: "Fully certified ABDM M1, M2, and M3 supporting ABHA creation and record linking" },
            { feature: "Clinical Safety & CDS", manual: "No computerized decision support; high medication and transcription errors", m365: "Intelligent CDS checking drug interactions, allergies, and dose ceilings" },
            { feature: "Inpatient Nursing Workflow", manual: "Paper Kardex charts and handwriting; high risk of missed doses", m365: "Tablet-based digital nursing command center with bedside barcode scanning" },
            { feature: "Hospital Accreditation", manual: "Months of manual file preparation and anxiety during NABH inspection", m365: "100% audit-ready digital clinical records satisfying all NABH standards" }
        ],
        faqs: [
            { q: "What does ABDM M1, M2, and M3 certification mean for hospitals?", a: "National Health Authority (NHA) ABDM certification verifies that Medical365 can (M1) Create and verify patient ABHA IDs via Aadhaar/mobile, (M2) Act as a Health Information Provider (HIP) to digitally link and share diagnostic reports and discharge summaries, and (M3) Act as a Health Information User (HIU) allowing doctors to view past records from other hospitals with patient consent." },
            { q: "Can large hospital chains manage multiple branches on a single platform?", a: "Yes. Medical365's multi-tenant enterprise cloud architecture allows hospital groups to share a single centralized patient UHID database across all branches while maintaining separate departmental billing, rosters, and pharmacy inventories." },
            { q: "How does the system help hospitals achieve NABH accreditation?", a: "Medical365 enforces the clinical documentation standards required by the National Accreditation Board for Hospitals (NABH): structured clinical assessments, initial nursing triage within defined timeframes, closed-loop medication safety, infection control surveillance, and complete digital audit trails." },
            { q: "Can doctors access the EMR from their smartphones and iPads?", a: "Yes. The zero-footprint web application and responsive mobile app allow physicians to review inpatient vitals, view PACS imaging, sign lab reports, and conduct tele-consultations securely from any device." },
            { q: "How are patient records protected against data loss and cyberattacks?", a: "Medical365 utilizes military-grade AES-256 encryption at rest, TLS 1.3 in transit, automated multi-region replication across Indian Tier-IV data centers, and immutable air-gapped backups protecting against ransomware and hardware failures." },
            { q: "Can existing hospital patient records be migrated into Medical365?", a: "Yes. Medical365 includes automated data migration pipelines that import historical patient demographics, past diagnostic reports, and billing data from legacy SQL and CSV systems with complete data integrity verification." }
        ]
    }
};

const done = buildPages(batch4bData, repoRoot, diagramDir);
console.log(`=== BATCH 4B SUCCESS: Generated ${done} Core Platform pages! ===`);


module.exports = batch4bData;
