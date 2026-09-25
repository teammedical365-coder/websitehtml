const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
console.log('=== PHASE 2: GENERATING UNIQUE SPECIALTY KEYWORD MAP ===');

// Master Specialty & Module Clinical Dictionary
const specialtyDefinitions = {
    // 1. CARDIOLOGY
    "ecg-ekg-integration": {
        cluster: "CARDIOLOGY",
        primaryKeyword: "ECG EKG integration software",
        secondaryKeywords: ["cardiology EMR integration", "digital ECG machine software", "12-lead ECG EMR sync", "ECG report management system"],
        longTailKeywords: ["ECG integration software for hospitals India", "automated ECG trace upload to EMR", "DICOM ECG report management software", "cardiology equipment EMR interface"],
        questionKeywords: ["What is ECG integration software?", "How does ECG machine integrate with hospital EMR?", "Can 12-lead ECG traces be stored digitally in EMR?", "Is digital ECG storage compliant with ABDM?"],
        entityTerms: ["Electrocardiogram", "12-Lead ECG", "Arrhythmia", "Cardiology PACS", "DICOM-ECG", "HL7", "ST-Elevation", "Waveform Analysis", "Cardiologist Review"],
        intent: "Integration / Product",
        whatItDoes: "Connects 12-lead ECG and EKG machines directly to Medical365 EMR, automatically synchronizing cardiac traces, rhythm measurements, and diagnostic waveforms into the patient electronic chart."
    },
    "echocardiography-reports": {
        cluster: "CARDIOLOGY",
        primaryKeyword: "echocardiography reporting software",
        secondaryKeywords: ["echo report software", "cardiac ultrasound reporting", "2D echo reporting system", "Doppler echo EMR module"],
        longTailKeywords: ["echocardiography report software for hospitals", "digital 2D echo report templates India", "cardiac Doppler reporting system for clinics", "structured echo reporting in EMR"],
        questionKeywords: ["What is echocardiography reporting software?", "How do cardiologists generate 2D echo reports digitally?", "Can cardiac Doppler measurements be automated in reports?", "Does echo software store ultrasound DICOM loops?"],
        entityTerms: ["Echocardiography", "2D Echo", "Color Doppler", "Ejection Fraction", "Left Ventricular Function", "Valvular Regurgitation", "DICOM Ultrasound", "Cardiology Workstation"],
        intent: "Product / Workflow",
        whatItDoes: "Streamlines 2D Echo, Color Doppler, and transesophageal echocardiography documentation with structured measurement calculation fields and DICOM clip attachments."
    },
    "stress-test-management": {
        cluster: "CARDIOLOGY",
        primaryKeyword: "cardiac stress test software",
        secondaryKeywords: ["TMT test management software", "treadmill test reporting system", "cardiac exercise stress test EMR", "stress ECG management"],
        longTailKeywords: ["treadmill test software for cardiology clinics", "cardiac stress test reporting software India", "TMT protocol tracking and automated report generation", "Bruce protocol stress test recording software"],
        questionKeywords: ["What is cardiac stress test software?", "How does TMT software record treadmill test protocols?", "Can target heart rate and METs be calculated automatically?", "How does stress test data link to cardiology EMR?"],
        entityTerms: ["Treadmill Test", "TMT", "Bruce Protocol", "METs", "Target Heart Rate", "Ischemia Detection", "Exercise ECG", "Cardiovascular Stress Analysis"],
        intent: "Feature / Workflow",
        whatItDoes: "Manages Bruce protocol treadmill tests (TMT) and stress echocardiograms, tracking stage-wise heart rate, blood pressure, METs, and automated diagnostic summaries."
    },
    "cardiac-risk-scoring": {
        cluster: "CARDIOLOGY",
        primaryKeyword: "cardiac risk assessment software",
        secondaryKeywords: ["cardiovascular risk calculator", "cardiac risk scoring system", "Framingham risk score EMR", "ASCVD risk calculator software"],
        longTailKeywords: ["cardiovascular risk assessment software for clinics", "automated cardiac risk scoring tool for EMR", "ASCVD and QRISK calculator for Indian patients", "preventive cardiology screening software"],
        questionKeywords: ["What is cardiac risk scoring software?", "How do cardiac risk calculators work inside hospital EMR?", "Can 10-year ASCVD risk be calculated automatically?", "Why is lipid and lifestyle cardiac risk assessment important?"],
        entityTerms: ["ASCVD", "Framingham Risk Score", "QRISK", "Cardiovascular Mortality", "Lipid Profile", "Hypertension", "Statin Therapy Guidance", "Preventive Cardiology"],
        intent: "Clinical Tool / Feature",
        whatItDoes: "Calculates 10-year ASCVD, Framingham, and QRISK cardiovascular scores automatically using real-time patient lab vitals, lipids, and lifestyle factors."
    },
    "angiography-reports": {
        cluster: "CARDIOLOGY",
        primaryKeyword: "coronary angiography reporting software",
        secondaryKeywords: ["cath lab reporting software", "cardiac angiography report system", "angio reporting module", "cath lab EMR"],
        longTailKeywords: ["coronary angiography reporting software for cath labs", "digital angiography report templates for Indian hospitals", "cath lab stent and vessel stenosis tracking software", "structured coronary artery reporting system"],
        questionKeywords: ["What is coronary angiography reporting software?", "How do interventional cardiologists generate cath lab reports?", "Can coronary artery stenosis percentages be diagrammed digitally?", "How does cath lab software track stent inventory?"],
        entityTerms: ["Coronary Angiography", "Cath Lab", "Vessel Stenosis", "LAD", "LCx", "RCA", "Drug-Eluting Stents", "TIMI Flow", "Interventional Cardiology"],
        intent: "Workflow / Product",
        whatItDoes: "Equips cardiac cath labs with structured coronary anatomy mapping, stenosis percentage recording, stent serial number logging, and post-angioplasty summaries."
    },
    "pacemaker-tracking": {
        cluster: "CARDIOLOGY",
        primaryKeyword: "pacemaker tracking software",
        secondaryKeywords: ["cardiac device follow-up system", "ICD pacemaker management software", "cardiac implant tracking EMR", "device clinic management"],
        longTailKeywords: ["pacemaker and ICD tracking software for hospitals", "cardiac implantable device follow-up system India", "pacemaker battery longevity and interrogation tracking", "cardiac electrophysiology device clinic software"],
        questionKeywords: ["What is pacemaker tracking software?", "How do hospitals track pacemaker interrogation data?", "Can cardiac device battery longevity and leads be monitored in EMR?", "Does device tracking software alert on pacemaker recalls?"],
        entityTerms: ["Pacemaker", "Implantable Cardioverter-Defibrillator (ICD)", "CRT", "Lead Impedance", "Pacing Threshold", "Battery Telemetry", "Electrophysiology"],
        intent: "Operational / Feature",
        whatItDoes: "Maintains comprehensive registries of cardiac implantable electronic devices (CIEDs), tracking battery longevity, pacing thresholds, lead impedance, and scheduled interrogation visits."
    },
    "lipid-profile-tracking": {
        cluster: "CARDIOLOGY",
        primaryKeyword: "lipid profile tracking software",
        secondaryKeywords: ["cholesterol tracking system", "dyslipidemia management software", "cardiac lipid trend analysis", "lipid panel monitoring EMR"],
        longTailKeywords: ["lipid profile monitoring software for cardiology clinics", "automated cholesterol and triglyceride trend tracking", "dyslipidemia treatment response tracking in EMR", "cardiac lipid target achievement software"],
        questionKeywords: ["What is lipid profile tracking software?", "How does EMR track cholesterol trends over time?", "Can dyslipidemia statin therapy response be visualized graphically?", "Why is longitudinal lipid monitoring crucial in cardiology?"],
        entityTerms: ["Lipid Profile", "Total Cholesterol", "LDL-C", "HDL-C", "Triglycerides", "Non-HDL Cholesterol", "Dyslipidemia", "Atherosclerosis Prevention"],
        intent: "Clinical Tool / Feature",
        whatItDoes: "Visualizes longitudinal cholesterol, LDL, HDL, and triglyceride trends, comparing patient biomarkers against target goals and alerting on statin therapy responses."
    },
    "cardiac-history-templates": {
        cluster: "CARDIOLOGY",
        primaryKeyword: "cardiology clinical documentation templates",
        secondaryKeywords: ["cardiac history forms EMR", "cardiology consultation notes", "cardiac SOAP note templates", "structured cardiology examination templates"],
        longTailKeywords: ["cardiology history taking templates for Indian hospitals", "structured cardiac consultation forms in EMR", "pre-op cardiac clearance documentation templates", "pediatric and adult cardiology EMR templates"],
        questionKeywords: ["What are cardiology clinical documentation templates?", "How do structured cardiac history templates improve documentation?", "Can cardiology SOAP notes integrate chest pain and NYHA class?", "Are cardiology templates customizable for OPD and IPD?"],
        entityTerms: ["Cardiac History", "Chest Pain Protocol", "NYHA Functional Class", "Cardiovascular Exam", "Murmur Classification", "Palpitations", "SOAP Templates"],
        intent: "Clinical Workflow",
        whatItDoes: "Provides standardized clinical templates for chest pain evaluation, heart failure staging, pre-operative cardiac clearance, and NYHA functional classification."
    },

    // 2. NEUROLOGY
    "eeg-reports": {
        cluster: "NEUROLOGY",
        primaryKeyword: "EEG reporting software",
        secondaryKeywords: ["electroencephalogram report system", "neurology EEG software", "digital EEG reporting EMR", "video EEG management system"],
        longTailKeywords: ["EEG reporting software for neurology clinics", "digital EEG report management for Indian hospitals", "routine and video EEG documentation software", "neurologist EEG montage and wave analysis reporting"],
        questionKeywords: ["What is EEG reporting software?", "How do neurologists generate digital EEG reports?", "Can EEG montage findings and background rhythms be documented in EMR?", "Does EEG software integrate with hospital PACS?"],
        entityTerms: ["Electroencephalogram (EEG)", "Epileptiform Discharges", "Spike-and-Wave", "Video-EEG", "Montage", "Alpha Rhythm", "Seizure Monitoring", "Neurology Workstation"],
        intent: "Product / Workflow",
        whatItDoes: "Streamlines routine, sleep-deprived, and video EEG interpretations with structured background rhythm recording, spike-wave localization, and automated report dispatch."
    },
    "mri-ct-integration": {
        cluster: "NEUROLOGY",
        primaryKeyword: "neuroimaging PACS integration software",
        secondaryKeywords: ["brain MRI CT EMR integration", "neurology radiology viewer", "DICOM neuroimaging viewer", "stroke imaging integration"],
        longTailKeywords: ["MRI and CT scan integration software for neurology clinics", "DICOM neuroimaging viewer embedded in EMR", "brain CT stroke protocol integration for hospitals", "radiology PACS to neurology consultation sync"],
        questionKeywords: ["What is neuroimaging PACS integration software?", "How do neurologists view brain MRI and CT scans inside EMR?", "Can DICOM brain images be accessed in real time during consultations?", "Does neuroimaging integration support zero-footprint web viewers?"],
        entityTerms: ["Magnetic Resonance Imaging (MRI)", "Computed Tomography (CT)", "DICOM", "PACS Integration", "Diffusion-Weighted Imaging (DWI)", "Brain Hemorrhage", "Neuro-Radiology"],
        intent: "Integration / Feature",
        whatItDoes: "Embeds zero-footprint DICOM neuroimaging viewers directly into neurological consultation notes, giving doctors instant access to brain MRI, MRA, and head CT slices."
    },
    "seizure-tracking": {
        cluster: "NEUROLOGY",
        primaryKeyword: "seizure tracking software",
        secondaryKeywords: ["epilepsy management system", "seizure diary EMR", "antiepileptic drug monitoring software", "epilepsy clinic software"],
        longTailKeywords: ["seizure tracking and epilepsy management software for hospitals", "digital seizure diary integrated with neurology EMR", "pediatric and adult seizure frequency monitoring system", "antiepileptic drug adherence and seizure trigger tracking"],
        questionKeywords: ["What is seizure tracking software?", "How do neurologists monitor seizure frequency and types in EMR?", "Can patient-reported seizure diaries be linked to hospital records?", "How does epilepsy software track antiepileptic drug levels?"],
        entityTerms: ["Seizure Tracking", "Epilepsy Management", "Tonic-Clonic", "Focal Seizures", "Antiepileptic Drugs (AEDs)", "Therapeutic Drug Monitoring", "Neurology EMR"],
        intent: "Clinical Workflow",
        whatItDoes: "Logs seizure types, durations, triggers, and post-ictal recovery times, correlating episode frequencies against antiepileptic drug (AED) dosages and serum levels."
    },
    "cognitive-assessment": {
        cluster: "NEUROLOGY",
        primaryKeyword: "cognitive assessment software",
        secondaryKeywords: ["neurocognitive screening tools", "dementia assessment software", "MMSE MoCA scoring EMR", "memory clinic management software"],
        longTailKeywords: ["cognitive assessment software for neurology and memory clinics", "digital MMSE and MoCA scoring system in hospital EMR", "dementia and mild cognitive impairment tracking software", "neuropsychological test battery recording tool"],
        questionKeywords: ["What is cognitive assessment software?", "How do doctors record MMSE and MoCA cognitive scores digitally?", "Can memory clinic assessments be tracked over longitudinal visits?", "Does cognitive assessment software generate patient progress graphs?"],
        entityTerms: ["Cognitive Assessment", "Mini-Mental State Exam (MMSE)", "MoCA", "Dementia Screening", "Mild Cognitive Impairment (MCI)", "Executive Function", "Memory Clinic"],
        intent: "Clinical Tool / Feature",
        whatItDoes: "Digitizes standardized cognitive batteries including MMSE, MoCA, and CDR, graphing longitudinal score changes to detect early neurodegenerative declines."
    },
    "stroke-management": {
        cluster: "NEUROLOGY",
        primaryKeyword: "stroke management software",
        secondaryKeywords: ["acute stroke protocol software", "code stroke tracking system", "thrombolysis window timer EMR", "NIHSS score calculator"],
        longTailKeywords: ["acute stroke management software for emergency departments", "code stroke protocol and door-to-needle tracking software", "NIHSS stroke severity scoring tool for hospitals India", "thrombolysis and thrombectomy clinical pathway software"],
        questionKeywords: ["What is stroke management software?", "How does code stroke protocol software reduce door-to-needle time?", "Can NIHSS stroke scores be calculated in emergency EMR?", "How does stroke software track IV tPA thrombolysis windows?"],
        entityTerms: ["Acute Ischemic Stroke", "Code Stroke", "Door-to-Needle Time", "NIHSS", "Intravenous Thrombolysis (tPA)", "Mechanical Thrombectomy", "Stroke Pathway"],
        intent: "Operational / Workflow",
        whatItDoes: "Orchestrates Code Stroke emergency protocols, calculating NIHSS scores and monitoring door-to-needle and door-to-groin puncture thrombolytic time windows."
    },
    "neurological-exam-forms": {
        cluster: "NEUROLOGY",
        primaryKeyword: "neurology examination templates",
        secondaryKeywords: ["neurological assessment forms EMR", "cranial nerve exam software", "motor sensory reflex documentation", "neurology consultation notes"],
        longTailKeywords: ["neurological examination documentation templates for hospitals", "structured cranial nerve and motor exam forms in EMR", "neurology outpatient consultation templates India", "deep tendon reflex and cerebellar sign charting software"],
        questionKeywords: ["What are neurological examination templates?", "How do neurologists document cranial nerves and motor strength digitally?", "Can neurological exam forms record sensory dermatomes and reflexes?", "Are neurology clinical templates customizable?"],
        entityTerms: ["Neurological Examination", "Cranial Nerves (I-XII)", "Motor Strength (MRC Scale)", "Deep Tendon Reflexes", "Cerebellar Signs", "Babinski Reflex", "Sensory Mapping"],
        intent: "Clinical Workflow",
        whatItDoes: "Delivers comprehensive examination forms covering cranial nerves I through XII, MRC motor grading, sensory dermatomes, and cerebellar ataxia tests."
    },

    // 3. PEDIATRICS
    "growth-charts": {
        cluster: "PEDIATRICS",
        primaryKeyword: "pediatric growth chart software",
        secondaryKeywords: ["WHO growth charts digital", "IAP growth chart software India", "child percentile calculator EMR", "pediatric anthropometry tracking"],
        longTailKeywords: ["pediatric growth chart software for Indian clinics", "WHO and IAP child growth percentile tracking system", "digital height weight head circumference tracking EMR", "pediatrician growth velocity and BMI z-score software"],
        questionKeywords: ["What is pediatric growth chart software?", "How do digital WHO and IAP growth charts work in clinic software?", "Can height, weight, and BMI percentiles be plotted automatically?", "Does pediatric software calculate z-scores for malnutrition?"],
        entityTerms: ["WHO Growth Standards", "IAP Growth Charts", "Percentile Curves", "BMI-for-Age", "Head Circumference", "Growth Velocity", "Stunting", "Wasting", "Pediatric EMR"],
        intent: "Product / Clinical Tool",
        whatItDoes: "Plots pediatric height, weight, head circumference, and BMI against WHO and Indian Academy of Pediatrics (IAP) percentiles automatically during every visit."
    },
    "vaccination-tracking": {
        cluster: "PEDIATRICS",
        primaryKeyword: "child vaccination tracking software",
        secondaryKeywords: ["pediatric immunization scheduler", "IAP vaccine schedule software", "vaccine due reminder system", "pediatric immunization record EMR"],
        longTailKeywords: ["child vaccination tracking software for pediatricians India", "IAP immunization schedule and automated reminder software", "pediatric vaccine inventory and batch tracking system", "digital child immunization card with WhatsApp reminders"],
        questionKeywords: ["What is child vaccination tracking software?", "How does digital immunization tracking follow IAP schedules?", "Can parents receive automated WhatsApp reminders for upcoming vaccines?", "Does vaccination software generate digital immunization certificates?"],
        entityTerms: ["Immunization Tracking", "IAP Vaccine Schedule", "BCG", "Pentavalent", "MMR", "Pneumococcal", "Rotavirus", "Vaccine Lot Number", "Digital Vaccine Card"],
        intent: "Workflow / Product",
        whatItDoes: "Automates National and IAP immunization schedules, logging vaccine batch numbers, generating digital immunization cards, and sending parents automated WhatsApp due-date reminders."
    },
    "pediatric-dosage-calculator": {
        cluster: "PEDIATRICS",
        primaryKeyword: "pediatric dosage calculator software",
        secondaryKeywords: ["child drug dose calculator", "weight-based pediatric dosing EMR", "pediatric medication safety software", "pediatric prescription calculator"],
        longTailKeywords: ["pediatric drug dosage calculator software for Indian doctors", "weight based child dosage calculation tool inside EMR", "pediatric suspension dose and concentration calculator", "safe pediatric dosing tool with overdose alerts"],
        questionKeywords: ["What is a pediatric dosage calculator?", "How does weight-based pediatric dosing work inside clinic EMR?", "Can the system calculate syrup concentrations and frequency automatically?", "Does pediatric software alert on maximum daily dose thresholds?"],
        entityTerms: ["Pediatric Dosing", "Weight-Based Dosing (mg/kg)", "Body Surface Area (BSA)", "Oral Suspension Concentrations", "Medication Safety", "Overdose Prevention"],
        intent: "Clinical Tool / Feature",
        whatItDoes: "Calculates precise weight-based (mg/kg) and BSA pediatric medication dosages, converting drug volumes directly to suspension ml with built-in maximum-dose guardrails."
    },
    "developmental-milestones": {
        cluster: "PEDIATRICS",
        primaryKeyword: "child developmental milestone tracking software",
        secondaryKeywords: ["pediatric milestone screening", "child development checklist EMR", "developmental delay detection software", "infant milestone tracking"],
        longTailKeywords: ["developmental milestone tracking software for pediatric clinics", "digital child development assessment checklist in EMR", "early detection of developmental delay software India", "gross motor fine motor speech milestone screening tool"],
        questionKeywords: ["What is developmental milestone tracking software?", "How do pediatricians screen for developmental delays digitally?", "Can motor, cognitive, and speech milestones be tracked by age?", "Does milestone tracking software support standardized screening tools?"],
        entityTerms: ["Developmental Milestones", "Gross Motor", "Fine Motor", "Speech & Language", "Social-Emotional", "Developmental Delay", "Early Intervention", "Trivandrum Scale"],
        intent: "Clinical Workflow",
        whatItDoes: "Tracks age-specific gross motor, fine motor, language, and cognitive developmental milestones, flagging developmental delays early for specialist referrals."
    },
    "neonatal-records": {
        cluster: "PEDIATRICS",
        primaryKeyword: "NICU neonatal records management software",
        secondaryKeywords: ["neonatal ICU documentation", "newborn admission record EMR", "NICU clinical management system", "birth details tracking software"],
        longTailKeywords: ["NICU neonatal records management software for hospitals", "digital newborn admission and APGAR score recording system", "NICU phototherapy ventilator and nutrition charting software", "neonatal discharge summary and follow-up tracking tool"],
        questionKeywords: ["What is neonatal records management software?", "How does NICU software track newborn vitals and APGAR scores?", "Can neonatal phototherapy, fluids, and incubator settings be documented?", "Does NICU software generate standardized newborn discharge summaries?"],
        entityTerms: ["NICU", "Neonatal Records", "APGAR Score", "Birth Weight", "Gestational Age", "Phototherapy", "Neonatal Jaundice", "Surfactant Administration", "KMC"],
        intent: "Operational / Product",
        whatItDoes: "Documents NICU admissions, birth weights, gestational age, APGAR scores, daily fluid balance, phototherapy charts, and specialized neonatal discharge summaries."
    },
    "parent-communication": {
        cluster: "PEDIATRICS",
        primaryKeyword: "pediatric parent communication software",
        secondaryKeywords: ["patient family communication portal", "pediatric WhatsApp alerts system", "child health guidance messaging", "pediatric clinic parent engagement"],
        longTailKeywords: ["pediatric parent communication software for clinics India", "automated vaccine reminders and appointment alerts for parents", "pediatric care advice and post-vaccination fever guides via WhatsApp", "secure parent communication portal for child health records"],
        questionKeywords: ["What is pediatric parent communication software?", "How do pediatric clinics send automated health updates to parents?", "Can immunization reminders be sent via WhatsApp automatically?", "Does parent communication software allow sharing digital prescriptions securely?"],
        entityTerms: ["Parent Communication", "WhatsApp Integration", "Vaccine Reminders", "Post-Vaccination Guidance", "Health Literacy", "Secure Health Portal", "Pediatric Engagement"],
        intent: "Operational / Communication",
        whatItDoes: "Connects pediatricians with parents via automated WhatsApp vaccine reminders, post-immunization care instructions, diet charts, and secure digital prescription sharing."
    },

    // 4. ORTHOPEDICS
    "xray-imaging-integration": {
        cluster: "ORTHOPEDICS",
        primaryKeyword: "orthopedic X-ray PACS integration software",
        secondaryKeywords: ["digital X-ray viewer EMR", "orthopedic radiology integration", "DICOM X-ray viewing software", "bone X-ray PACS module"],
        longTailKeywords: ["orthopedic X-ray integration software for hospitals India", "DICOM X-ray viewer integrated with orthopedic EMR", "digital radiographic measurement tools for orthopedic surgeons", "zero-footprint musculoskeletal X-ray viewing system"],
        questionKeywords: ["What is orthopedic X-ray integration software?", "How do orthopedic surgeons view high-resolution digital X-rays in EMR?", "Can digital angle and Cobb angle measurements be performed in software?", "Does orthopedic imaging integrate with DICOM PACS?"],
        entityTerms: ["Digital Radiography", "X-Ray PACS", "DICOM Viewer", "Cobb Angle", "Musculoskeletal Imaging", "Bone Density", "Orthopedic Workstation"],
        intent: "Integration / Product",
        whatItDoes: "Links digital X-ray and CR/DR machines to orthopedic consultation notes, featuring calibrated caliper tools, Cobb angle measurements, and joint spacing analysis."
    },
    "fracture-management": {
        cluster: "ORTHOPEDICS",
        primaryKeyword: "fracture management documentation software",
        secondaryKeywords: ["orthopedic trauma EMR", "fracture classification software", "AO trauma classification system", "bone cast and splint tracking"],
        longTailKeywords: ["fracture management documentation software for orthopedic clinics", "AO trauma fracture classification and implant planning in EMR", "bone healing and plaster cast follow-up tracking tool", "orthopedic emergency trauma clinical charting software"],
        questionKeywords: ["What is fracture management software?", "How do orthopedic surgeons document AO fracture classifications?", "Can cast application dates and bone union follow-ups be tracked?", "Does trauma software link pre-op fracture photos with post-reduction X-rays?"],
        entityTerms: ["Fracture Classification", "AO/OTA System", "Closed Reduction", "Open Reduction Internal Fixation (ORIF)", "Cast Management", "Bone Union", "Orthopedic Trauma"],
        intent: "Clinical Workflow",
        whatItDoes: "Standardizes orthopedic trauma documentation with AO/OTA fracture classifications, closed reduction notes, cast removal timelines, and bone union radiographic milestones."
    },
    "joint-mobility-tracking": {
        cluster: "ORTHOPEDICS",
        primaryKeyword: "joint mobility and range of motion tracking software",
        secondaryKeywords: ["goniometry tracking software", "orthopedic ROM measurement EMR", "joint flexibility assessment software", "arthroplasty mobility tracking"],
        longTailKeywords: ["joint mobility and range of motion tracking software for hospitals", "digital goniometer measurement documentation in EMR", "post-knee replacement range of motion progress tracking", "orthopedic joint stiffness and flexion extension monitoring"],
        questionKeywords: ["What is joint mobility tracking software?", "How do orthopedic surgeons document joint range of motion (ROM)?", "Can pre-operative and post-operative joint flexion degrees be compared?", "Does ROM tracking software generate patient recovery graphs?"],
        entityTerms: ["Range of Motion (ROM)", "Goniometry", "Flexion-Extension", "Knee Arthroplasty", "Hip Mobility", "Joint Stiffness", "Functional Recovery Scores"],
        intent: "Clinical Tool / Feature",
        whatItDoes: "Logs pre- and post-operative joint angles (degrees of flexion, extension, abduction, and rotation) to visualize functional recovery following arthroplasty or sports injuries."
    },
    "implant-records": {
        cluster: "ORTHOPEDICS",
        primaryKeyword: "orthopedic implant tracking software",
        secondaryKeywords: ["orthopedic prosthetic registry software", "surgical implant serial number EMR", "joint implant traceability system", "implant barcode scanner software"],
        longTailKeywords: ["orthopedic implant tracking software for Indian hospitals", "surgical prosthetic implant batch and barcode recording in EMR", "knee and hip implant serial number traceability system", "NABH compliant implant register for orthopedic OT"],
        questionKeywords: ["What is orthopedic implant tracking software?", "How do hospital OT teams track prosthetic implant serial numbers?", "Can implant barcode labels be scanned directly into patient records?", "Why is surgical implant traceability mandatory under NABH standards?"],
        entityTerms: ["Orthopedic Implants", "Joint Prosthesis", "Serial Number Traceability", "Barcode Scanning", "NABH Implant Register", "Implant Registry", "Recall Notification"],
        intent: "Operational / Compliance",
        whatItDoes: "Maintains a secure surgical implant registry, scanning barcodes of prosthetic joints, plates, screws, and nails to ensure 100% NABH-compliant traceability and patient card generation."
    },
    "physiotherapy-notes": {
        cluster: "ORTHOPEDICS",
        primaryKeyword: "physiotherapy clinical documentation software",
        secondaryKeywords: ["rehabilitation assessment EMR", "physiotherapy exercise prescription software", "PT progress notes system", "rehab physical therapy documentation"],
        longTailKeywords: ["physiotherapy documentation software for clinics and hospitals", "rehabilitation exercise plan and progress note tracking in EMR", "VAS pain score and muscle power grading documentation tool", "physical therapy treatment plan and package billing software"],
        questionKeywords: ["What is physiotherapy clinical documentation software?", "How do physiotherapists record patient exercise regimens digitally?", "Can pain scale (VAS) and muscle power (MMT) scores be tracked across sessions?", "Does physiotherapy software manage session package packages and renewals?"],
        entityTerms: ["Physiotherapy Notes", "Manual Muscle Testing (MMT)", "VAS Pain Scale", "Exercise Prescription", "Physical Rehabilitation", "Post-Op Rehab Protocol"],
        intent: "Clinical Workflow",
        whatItDoes: "Provides physiotherapists with specialized evaluation sheets, muscle power (MMT) grading, VAS pain score tracking, exercise regimen prescriptions, and session billing packages."
    },
    "surgery-planning": {
        cluster: "ORTHOPEDICS",
        primaryKeyword: "orthopedic surgical planning software",
        secondaryKeywords: ["pre-op orthopedic planning EMR", "joint replacement planning software", "orthopedic surgical checklist system", "orthopedic OT booking tool"],
        longTailKeywords: ["orthopedic surgical planning software for hospitals India", "pre-operative templating and implant requirement software", "WHO surgical safety checklist for orthopedic operations", "orthopedic operation theater scheduling and consent management"],
        questionKeywords: ["What is orthopedic surgical planning software?", "How do orthopedic surgeons document pre-operative surgical plans?", "Can implant sizing requirements and special instruments be logged for OT?", "Does surgical planning software integrate with WHO surgical safety checklists?"],
        entityTerms: ["Orthopedic Surgical Planning", "Pre-Op Assessment", "WHO Surgical Safety Checklist", "Implant Requisition", "OT Booking", "Informed Surgical Consent"],
        intent: "Operational / Workflow",
        whatItDoes: "Enables orthopedic surgeons to document pre-operative templating, specify prosthetic sizing requirements, requisition OT instruments, and execute WHO surgical safety checklists."
    },

    // 5. OPHTHALMOLOGY
    "vision-refraction-charts": {
        cluster: "OPHTHALMOLOGY",
        primaryKeyword: "ophthalmic refraction charting software",
        secondaryKeywords: ["digital vision testing EMR", "eye refraction documentation system", "Snellen chart recording software", "optometry refraction software"],
        longTailKeywords: ["ophthalmology refraction charting software for eye clinics", "digital autorefractor and subjective refraction recording EMR", "Snellen visual acuity and power prescription documentation", "optometrist refraction workstation software India"],
        questionKeywords: ["What is ophthalmic refraction charting software?", "How do eye doctors record objective and subjective refraction findings?", "Can autorefractor data sync with patient eye examination records?", "Does refraction software auto-generate spectacle prescriptions?"],
        entityTerms: ["Refraction Charting", "Visual Acuity", "Snellen Chart", "Spherical & Cylindrical Power", "Axis", "Autorefractor", "Subjective Refraction", "Eye Clinic EMR"],
        intent: "Product / Clinical Tool",
        whatItDoes: "Captures uncorrected visual acuity (UCVA), best corrected visual acuity (BCVA), auto-refractor readings, and subjective acceptance for both eyes with instant spectacle prescription output."
    },
    "retina-imaging-integration": {
        cluster: "OPHTHALMOLOGY",
        primaryKeyword: "retinal imaging PACS integration software",
        secondaryKeywords: ["fundus camera integration EMR", "OCT imaging software ophthalmology", "retina photo storage system", "diabetic retinopathy screening software"],
        longTailKeywords: ["retinal imaging and fundus camera integration software for hospitals", "ophthalmic OCT scan viewer embedded in patient EMR", "diabetic retinopathy fundus photo grading and tracking software", "digital retinal camera DICOM integration system"],
        questionKeywords: ["What is retinal imaging integration software?", "How do ophthalmologists view fundus camera photos inside EMR?", "Can optical coherence tomography (OCT) scans be linked to patient charts?", "Does retinal software assist in tracking diabetic retinopathy progression?"],
        entityTerms: ["Fundus Photography", "Optical Coherence Tomography (OCT)", "Retinal Imaging", "Diabetic Retinopathy", "Macular Degeneration", "DICOM Eye Care", "Vitreoretinal"],
        intent: "Integration / Feature",
        whatItDoes: "Integrates fundus photography and Optical Coherence Tomography (OCT) scans into ophthalmic records, allowing side-by-side comparison for diabetic retinopathy and glaucoma monitoring."
    },
    "eye-pressure-tracking": {
        cluster: "OPHTHALMOLOGY",
        primaryKeyword: "intraocular pressure IOP tracking software",
        secondaryKeywords: ["glaucoma monitoring software", "tonometry records system", "eye pressure trend charting EMR", "applanation tonometry software"],
        longTailKeywords: ["intraocular pressure IOP tracking software for glaucoma clinics", "digital tonometry graph and glaucoma medication monitoring in EMR", "Goldmann applanation and non-contact tonometry recording tool", "longitudinal eye pressure trend analysis software India"],
        questionKeywords: ["What is intraocular pressure (IOP) tracking software?", "How do ophthalmologists monitor eye pressure trends over time?", "Can tonometry readings be plotted on visual glaucoma progression charts?", "Does IOP tracking software flag spikes in eye pressure?"],
        entityTerms: ["Intraocular Pressure (IOP)", "Tonometry", "Glaucoma Progression", "Goldmann Applanation", "Pachymetry (CCT)", "Target IOP", "Anti-Glaucoma Drops"],
        intent: "Clinical Tool / Feature",
        whatItDoes: "Graphs longitudinal intraocular pressure (IOP) readings from Goldmann applanation and non-contact tonometers, correlating pressure changes with anti-glaucoma drop regimens."
    },
    "optical-prescription-mgt": {
        cluster: "OPHTHALMOLOGY",
        primaryKeyword: "optical prescription management software",
        secondaryKeywords: ["eyeglass prescription software", "contact lens prescription EMR", "optical shop inventory billing", "spectacle power printing software"],
        longTailKeywords: ["optical prescription management software for eye hospitals India", "digital spectacle and contact lens prescription printing tool", "in-house optical store billing and lens dispensing integration", "spectacle power WhatsApp sharing system for patients"],
        questionKeywords: ["What is optical prescription management software?", "How do eye clinics generate digital eyeglass prescriptions?", "Can optical prescriptions be dispatched to patients via WhatsApp?", "Does optical software integrate with in-hospital optical shop billing?"],
        entityTerms: ["Optical Prescription", "Spherical/Cylindrical/Axis", "Pupillary Distance (PD)", "Bifocal / Progressive Lenses", "Contact Lens Fitting", "Optical Dispensing"],
        intent: "Workflow / Operational",
        whatItDoes: "Generates clear digital spectacle and contact lens prescriptions with spherical, cylindrical, axis, addition, and pupillary distance (PD) measurements, routing directly to in-house optical shops."
    },
    "lasik-surgery-records": {
        cluster: "OPHTHALMOLOGY",
        primaryKeyword: "LASIK and refractive surgery software",
        secondaryKeywords: ["refractive surgery documentation EMR", "corneal topography records software", "pachymetry LASIK screening", "laser eye surgery EMR module"],
        longTailKeywords: ["LASIK refractive surgery records management software", "corneal pachymetry and topography documentation in eye EMR", "pre-LASIK workup and laser parameter recording software India", "post-refractive surgery visual acuity and flap check tracking"],
        questionKeywords: ["What is LASIK surgery records software?", "How do refractive surgeons document pre-LASIK corneal evaluations?", "Can corneal topography and pachymetry measurements be stored in EMR?", "Does refractive surgery software record excimer laser ablation parameters?"],
        entityTerms: ["Refractive Surgery", "LASIK", "PRK", "SMILE", "Corneal Topography", "Pachymetry", "Residual Bed Thickness", "Excimer Laser", "Post-Op Flap Review"],
        intent: "Clinical Workflow",
        whatItDoes: "Structures the entire refractive surgery workflow—from pre-operative corneal pachymetry, pupil size, and topography eligibility checks to laser treatment parameters and flap healing records."
    },

    // 6. DENTAL
    "dental-tooth-chart": {
        cluster: "DENTAL",
        primaryKeyword: "dental tooth chart odontogram software",
        secondaryKeywords: ["interactive dental chart software", "3D odontogram EMR", "adult pediatric dental charting", "tooth condition charting software"],
        longTailKeywords: ["interactive dental tooth chart odontogram software India", "adult and pediatric digital dental charting tool for clinics", "tooth wise caries restoration and extraction documentation in EMR", "periodontal pocket depth and odontogram charting software"],
        questionKeywords: ["What is dental tooth chart odontogram software?", "How do dentists chart tooth conditions interactively in dental software?", "Does dental software support both adult (FDI) and pediatric tooth numbering?", "Can caries, root canals, and crowns be visualized on a digital odontogram?"],
        entityTerms: ["Odontogram", "FDI Tooth Numbering", "Universal Numbering", "Dental Caries", "Restorations", "Endodontics", "Crown & Bridge", "Periodontal Charting"],
        intent: "Product / Clinical Tool",
        whatItDoes: "Provides dentists with an interactive visual odontogram supporting adult (32-tooth) and deciduous (20-tooth) FDI numbering to record caries, missing teeth, restorations, and crowns."
    },
    "dental-imaging": {
        cluster: "DENTAL",
        primaryKeyword: "dental imaging and RVG integration software",
        secondaryKeywords: ["dental X-ray PACS software", "OPG image viewer dental EMR", "intraoral camera integration", "dental radiograph storage software"],
        longTailKeywords: ["dental imaging and RVG sensor integration software for clinics", "intraoral camera and OPG scan viewing software inside dental EMR", "DICOM dental radiography storage and contrast enhancement tools", "digital dental X-ray management system India"],
        questionKeywords: ["What is dental imaging and RVG integration software?", "How do dental clinics connect digital RVG sensors to patient charts?", "Can OPG panoramic X-rays and intraoral photos be stored together?", "Does dental imaging software support image measurement and zoom tools?"],
        entityTerms: ["RadioVisioGraphy (RVG)", "Orthopantomogram (OPG)", "Intraoral Camera", "DICOM Dental", "Periapical X-Ray", "Contrast Enhancement", "Cephalometric"],
        intent: "Integration / Product",
        whatItDoes: "Connects digital RVG sensors, OPG panoramic scanners, and intraoral cameras directly to patient dental files with contrast enhancement, zooming, and measurement tools."
    },
    "dental-treatment-planning": {
        cluster: "DENTAL",
        primaryKeyword: "dental treatment planning software",
        secondaryKeywords: ["dental case presentation software", "multi-phase dental treatment plans", "dental treatment estimation software", "cosmetic dental planning EMR"],
        longTailKeywords: ["dental treatment planning and cost estimation software for clinics", "multi-phase dental treatment plan with patient consent in EMR", "orthodontic and implant multi-sitting treatment plan software India", "interactive dental treatment quotation and progress tracking tool"],
        questionKeywords: ["What is dental treatment planning software?", "How do dental clinics generate phased treatment plans and cost estimates?", "Can multi-sitting procedures like root canals and implants be scheduled?", "Does treatment planning software print transparent patient quotations?"],
        entityTerms: ["Treatment Planning", "Multi-Phase Dental Plan", "Cost Estimate", "Patient Consent", "Implantology", "Prosthodontics", "Informed Financial Consent"],
        intent: "Workflow / Commercial",
        whatItDoes: "Builds comprehensive phased dental treatment plans with itemized cost estimates, milestone dates, tooth-specific procedure breakdowns, and patient signature capture."
    },
    "dental-procedure-history": {
        cluster: "DENTAL",
        primaryKeyword: "dental procedure history and clinical notes software",
        secondaryKeywords: ["dental electronic records EMR", "tooth-wise procedure log", "dental sitting progress notes", "dental clinical history software"],
        longTailKeywords: ["dental procedure history and sitting-wise progress notes software", "tooth specific dental treatment history log in hospital EMR", "dentist clinical note templates for RCT extraction and fillings", "longitudinal dental record tracking system India"],
        questionKeywords: ["What is dental procedure history software?", "How do dentists track sitting-wise procedure history across multiple visits?", "Can root canal working lengths and obturation details be logged?", "Does dental software maintain lifetime dental records per patient?"],
        entityTerms: ["Dental Procedure History", "Root Canal Log", "Obturation", "Tooth Extraction", "Clinical Progress Notes", "Working Length", "Dental Materials"],
        intent: "Clinical Workflow",
        whatItDoes: "Maintains sitting-wise logs of every dental intervention performed per tooth, recording canal working lengths, obturation materials, shade guides, and anesthesia details."
    },
    "dental-insurance-billing": {
        cluster: "DENTAL",
        primaryKeyword: "dental insurance billing software",
        secondaryKeywords: ["dental clinic billing system", "dental procedure invoicing software", "dental package billing EMR", "cashless dental insurance claims"],
        longTailKeywords: ["dental billing and insurance claim management software India", "itemized dental procedure invoicing and installment tracking software", "corporate dental health plan and package billing system", "GST compliant dental clinic invoicing software with UPI payments"],
        questionKeywords: ["What is dental insurance billing software?", "How do dental clinics bill multi-sitting treatments and package installments?", "Can corporate tie-ups and dental insurance claims be processed digitally?", "Does dental billing software support GST invoicing and UPI payment links?"],
        entityTerms: ["Dental Billing", "Procedure-Wise Invoicing", "Installment Tracking", "GST Invoicing", "Corporate Dental Plans", "Cashless Claims", "UPI Counter Payments"],
        intent: "Commercial / Operational",
        whatItDoes: "Processes procedure-based dental invoicing, managing installment schedules for orthodontic aligners or implants, corporate empanelments, and GST-ready invoices."
    },

    // 7. DERMATOLOGY
    "skin-image-tracking": {
        cluster: "DERMATOLOGY",
        primaryKeyword: "dermatology lesion and skin image tracking software",
        secondaryKeywords: ["dermoscopy image storage software", "skin lesion mapping EMR", "mole tracking software dermatology", "dermatology photo documentation"],
        longTailKeywords: ["dermatology skin image and lesion tracking software for clinics", "dermoscopic photo mapping and serial lesion comparison in EMR", "body map skin lesion documentation tool for dermatologists India", "digital skin biopsy photo and pathology correlation system"],
        questionKeywords: ["What is skin image tracking software?", "How do dermatologists map lesions on an anatomical body chart?", "Can dermoscopic photos be compared side-by-side across visits?", "Does dermatology software protect high-resolution skin photos securely?"],
        entityTerms: ["Dermoscopy", "Skin Lesion Mapping", "Anatomical Body Chart", "Melanoma Screening", "Serial Photography", "Eczema", "Psoriasis", "Dermatology EMR"],
        intent: "Product / Clinical Tool",
        whatItDoes: "Enables dermatologists to tag high-resolution clinical and dermoscopy images to an interactive 3D body map, tracking changes in size, color, and border over time."
    },
    "dermatology-photos": {
        cluster: "DERMATOLOGY",
        primaryKeyword: "dermatology before and after photo software",
        secondaryKeywords: ["aesthetic clinic photo management", "clinical photo comparison software", "dermatology image gallery EMR", "medical photography storage"],
        longTailKeywords: ["dermatology before and after photo comparison software for clinics", "aesthetic clinic patient photo management and consent software India", "side by side clinical photo alignment and comparison tool", "secure medical photography storage compliant with DPDP Act"],
        questionKeywords: ["What is dermatology before and after photo software?", "How do aesthetic clinics compare pre- and post-procedure photos side-by-side?", "Can patient photo consent forms be stored with cosmetic photos?", "Is patient medical photography stored in compliance with Indian privacy laws?"],
        entityTerms: ["Before-and-After Photography", "Aesthetic Dermatology", "Image Alignment Grid", "Patient Photo Consent", "Cosmetic Dermatology", "DPDP Act Privacy"],
        intent: "Product / Feature",
        whatItDoes: "Stores standardized before-and-after clinical photography with split-screen comparison sliders, grid overlays, and built-in DPDP Act-compliant photo consent tracking."
    },
    "dermatology-treatment-plans": {
        cluster: "DERMATOLOGY",
        primaryKeyword: "dermatology treatment planning software",
        secondaryKeywords: ["chronic skin disease management EMR", "psoriasis acne treatment plans", "dermatology protocol templates", "dermatology follow-up tracking"],
        longTailKeywords: ["dermatology treatment planning software for skin clinics India", "chronic skin disease acne psoriasis and vitiligo care pathways", "topical and systemic medication regimen tracking in dermatology EMR", "dermatology clinical follow-up and flare-up documentation software"],
        questionKeywords: ["What is dermatology treatment planning software?", "How do dermatologists manage chronic skin protocols like psoriasis or vitiligo?", "Can step-up topical and systemic steroid therapies be tracked in EMR?", "Does dermatology software monitor periodic liver and kidney lab tests?"],
        entityTerms: ["Dermatology Treatment Protocols", "Psoriasis (PASI Score)", "Acne Grading", "Vitiligo", "Topical Corticosteroids", "Biologics", "Isotretinoin Monitoring"],
        intent: "Clinical Workflow",
        whatItDoes: "Structures chronic skin care pathways for acne, psoriasis (PASI scoring), vitiligo, and eczema with integrated baseline lab monitoring for systemic therapies."
    },
    "cosmetic-procedure-records": {
        cluster: "DERMATOLOGY",
        primaryKeyword: "aesthetic and cosmetic procedure documentation software",
        secondaryKeywords: ["botox filler injection charting", "laser treatment records software", "aesthetic clinic procedure EMR", "chemical peel documentation system"],
        longTailKeywords: ["cosmetic procedure documentation software for aesthetic clinics India", "Botox and dermal filler facial injection mapping software", "laser hair reduction and skin rejuvenation parameter recording tool", "cosmetic procedure informed consent and package session tracking"],
        questionKeywords: ["What is cosmetic procedure documentation software?", "How do aesthetic doctors map Botox units and filler injection points?", "Can laser energy settings (fluence, spot size, pulse duration) be logged?", "Does cosmetic procedure software manage multi-session laser packages?"],
        entityTerms: ["Cosmetic Dermatology", "Botox Injection Mapping", "Dermal Fillers", "Laser Hair Reduction (LHR)", "Chemical Peels", "Facial Aesthetics", "Laser Fluence"],
        intent: "Workflow / Specialized",
        whatItDoes: "Maps facial injection sites and unit dosages for neurotoxins and dermal fillers, while logging laser treatment parameters (wavelength, fluence, spot size) across multi-session packages."
    },
    "allergy-tracking": {
        cluster: "DERMATOLOGY",
        primaryKeyword: "allergy tracking and patch test software",
        secondaryKeywords: ["dermatology allergy testing EMR", "skin patch test recording software", "contact dermatitis documentation", "drug allergy alert system"],
        longTailKeywords: ["allergy tracking and skin patch test documentation software", "contact dermatitis allergen panel recording tool for dermatologists", "clinical drug allergy alert integration in outpatient EMR India", "prick test and patch test reaction grading software"],
        questionKeywords: ["What is allergy tracking software?", "How do dermatologists document skin patch test allergens and reaction grades?", "Can verified drug and contact allergies trigger critical prescribing alerts?", "Does allergy software print personalized allergen avoidance advice sheets?"],
        entityTerms: ["Skin Patch Testing", "Contact Dermatitis", "Allergen Panels", "Skin Prick Test", "Drug Allergies", "Prescription Safety Alerts", "ICDRG Grading"],
        intent: "Clinical Tool / Safety",
        whatItDoes: "Logs standardized patch test and skin prick test reaction grades (+ to +++), triggering instant, system-wide drug and substance allergy alerts during E-prescribing."
    },

    // 8. ONCOLOGY
    "cancer-staging": {
        cluster: "ONCOLOGY",
        primaryKeyword: "cancer staging documentation software",
        secondaryKeywords: ["TNM cancer staging system EMR", "oncology staging calculator", "AJCC cancer staging software", "tumor staging documentation"],
        longTailKeywords: ["cancer staging documentation software for oncology hospitals India", "AJCC 8th edition TNM staging calculator embedded in oncology EMR", "clinical and pathological tumor staging workflow software", "oncology multi-disciplinary tumor board staging record tool"],
        questionKeywords: ["What is cancer staging documentation software?", "How do oncologists document TNM classification in hospital EMR?", "Does oncology software support AJCC 8th edition staging criteria?", "Can cancer stage be correlated with pathology and radiology reports?"],
        entityTerms: ["TNM Classification", "AJCC 8th Edition", "Clinical Staging (cTNM)", "Pathological Staging (pTNM)", "Tumor Board", "Histopathology", "Oncology EMR"],
        intent: "Product / Clinical Tool",
        whatItDoes: "Embeds AJCC 8th Edition TNM staging calculators directly into oncology records, distinguishing between clinical (cTNM) and pathological (pTNM) classifications."
    },
    "chemotherapy-plans": {
        cluster: "ONCOLOGY",
        primaryKeyword: "chemotherapy protocol and regimen management software",
        secondaryKeywords: ["chemo ordering software", "oncology chemotherapy protocol EMR", "BSA-based chemo dosage calculator", "daycare chemotherapy charting"],
        longTailKeywords: ["chemotherapy protocol and cycle management software for hospitals", "body surface area BSA chemo dosage calculator with toxicity limits", "daycare chemotherapy administration and nurse verification software India", "chemotherapy extravasation and premedication charting tool"],
        questionKeywords: ["What is chemotherapy regimen management software?", "How does oncology software calculate BSA-adjusted chemotherapy dosages?", "Can multi-cycle chemotherapy regimens with rest days be scheduled?", "Does chemo software enforce dual-nurse sign-off before drug infusion?"],
        entityTerms: ["Chemotherapy Regimens", "Body Surface Area (BSA)", "Cycle Scheduling", "Premedication Protocols", "Toxicity Dose Reductions", "Dual-Nurse Verification", "Daycare Oncology"],
        intent: "Workflow / Safety",
        whatItDoes: "Calculates BSA-adjusted chemotherapeutic drug dosages, schedules multi-cycle regimens with rest intervals, enforces dual-nurse sign-offs, and tracks dose-limiting toxicities."
    },
    "radiation-therapy-records": {
        cluster: "ONCOLOGY",
        primaryKeyword: "radiation oncology records management software",
        secondaryKeywords: ["radiotherapy session tracking EMR", "fractionation dose documentation", "radiation oncology EMR module", "linear accelerator session log"],
        longTailKeywords: ["radiation oncology records management software for hospitals India", "fractionated radiotherapy cumulative dose tracking in EMR", "IMRT and IGRT radiation oncology treatment plan documentation", "radiation toxicity and skin reaction follow-up tracking tool"],
        questionKeywords: ["What is radiation oncology records software?", "How do radiation oncologists track fractionated dose delivery?", "Can cumulative gray (Gy) radiation dosages be monitored in EMR?", "Does radiotherapy software log treatment machine energy settings?"],
        entityTerms: ["Radiation Oncology", "Fractionation Schedule", "Cumulative Dose (Gray/Gy)", "IMRT", "IGRT", "Linear Accelerator", "Radiation Toxicity", "RTOG Scoring"],
        intent: "Operational / Clinical",
        whatItDoes: "Tracks radiation therapy treatment courses across daily fractions, monitoring cumulative radiation exposure (Gray/Gy), organs at risk, and acute RTOG toxicity scores."
    },
    "tumor-tracking": {
        cluster: "ONCOLOGY",
        primaryKeyword: "tumor response and RECIST tracking software",
        secondaryKeywords: ["tumor size monitoring EMR", "RECIST 1.1 evaluation software", "oncology tumor burden tracking", "target lesion response analysis"],
        longTailKeywords: ["tumor response and RECIST 1.1 tracking software for oncology clinics", "longitudinal tumor burden and target lesion measurement in EMR", "complete response partial response progressive disease calculation software", "oncology imaging tumor response correlation tool India"],
        questionKeywords: ["What is tumor tracking software?", "How do oncologists track tumor response using RECIST 1.1 criteria?", "Can baseline and follow-up target lesion diameters be graphed?", "Does tumor tracking software evaluate progression-free survival?"],
        entityTerms: ["RECIST 1.1", "Target Lesions", "Non-Target Lesions", "Tumor Burden", "Complete Response (CR)", "Partial Response (PR)", "Progressive Disease (PD)"],
        intent: "Clinical Tool / Research",
        whatItDoes: "Calculates RECIST 1.1 tumor responses automatically by tracking sum-of-diameters across baseline and follow-up CT/PET scans, categorizing responses from CR to PD."
    },
    "oncology-reports": {
        cluster: "ONCOLOGY",
        primaryKeyword: "comprehensive oncology reporting software",
        secondaryKeywords: ["tumor board documentation software", "cancer summary reports EMR", "multidisciplinary oncology notes", "oncology discharge summary system"],
        longTailKeywords: ["comprehensive oncology reporting and tumor board software India", "multidisciplinary tumor board meeting note documentation in EMR", "cancer patient longitudinal summary and staging report generator", "oncology clinical audit and registry reporting tool for hospitals"],
        questionKeywords: ["What is oncology reporting software?", "How do multidisciplinary tumor boards document collaborative treatment consensus?", "Can comprehensive cancer summary sheets be compiled from lab, imaging, and pathology?", "Does oncology software support hospital cancer registry reporting?"],
        entityTerms: ["Tumor Board", "Multidisciplinary Team (MDT)", "Pathology Correlation", "Biomarkers (ER/PR/HER2)", "Cancer Registry", "Longitudinal Oncology Summary"],
        intent: "Workflow / Reporting",
        whatItDoes: "Synthesizes multi-disciplinary tumor board consensus notes, genetic biomarker panels (ER/PR/HER2/EGFR), treatment histories, and longitudinal cancer summaries."
    },
    "clinical-trial-management": {
        cluster: "ONCOLOGY",
        primaryKeyword: "oncology clinical trial management software",
        secondaryKeywords: ["clinical trial patient tracking EMR", "GCP compliant trial software", "investigational drug tracking system", "clinical research study coordinator tool"],
        longTailKeywords: ["oncology clinical trial management software for research hospitals", "GCP compliant patient screening and protocol visit tracking in EMR", "investigational medical product accountability and adverse event logging", "clinical trial data capture and ethics committee reporting India"],
        questionKeywords: ["What is oncology clinical trial software?", "How do research hospitals manage patient screening and trial protocols?", "Can adverse events and serious adverse events (SAEs) be documented digitally?", "Is the clinical trial module compliant with ICH-GCP guidelines?"],
        entityTerms: ["Clinical Trials", "ICH-GCP", "Adverse Events (AE/SAE)", "Protocol Visits", "Investigational Product (IP)", "Subject Enrollment", "Informed Consent"],
        intent: "Research / Operational",
        whatItDoes: "Assists clinical trial coordinators with protocol milestone scheduling, subject enrollment screening, adverse event (AE/SAE) reporting, and investigational drug accountability."
    },

    // 9. GYNECOLOGY
    "pregnancy-tracking": {
        cluster: "GYNECOLOGY",
        primaryKeyword: "obstetric pregnancy tracking software",
        secondaryKeywords: ["antenatal care software", "EDD pregnancy calculator EMR", "trimester gestational age tracking", "maternity clinical documentation"],
        longTailKeywords: ["obstetric pregnancy tracking software for maternity hospitals India", "EDD LMP gestational age calculation and milestone tracking in EMR", "high-risk pregnancy flag and maternal weight gain tracking tool", "trimester-wise obstetric consultation notes and checklist software"],
        questionKeywords: ["What is pregnancy tracking software for hospitals?", "How does maternity EMR calculate estimated date of delivery (EDD) from LMP?", "Can high-risk pregnancy factors be flagged on patient dashboards?", "Does obstetric software track trimester-specific lab tests and scans?"],
        entityTerms: ["Obstetrics", "Gestational Age", "Estimated Date of Delivery (EDD)", "LMP", "High-Risk Pregnancy", "Trimester Care", "Maternal Vitals"],
        intent: "Product / Clinical Workflow",
        whatItDoes: "Calculates gestational age and EDD via LMP or ultrasound dating, tracking trimester milestones, maternal blood pressure trends, fundal heights, and fetal heart sounds."
    },
    "antenatal-care-records": {
        cluster: "GYNECOLOGY",
        primaryKeyword: "antenatal care ANC records software",
        secondaryKeywords: ["maternal health record system", "ANC visit documentation EMR", "Pradhan Mantri Surakshit Matritva Abhiyan software", "obstetric immunization tracking"],
        longTailKeywords: ["antenatal care ANC records management software for clinics India", "Pradhan Mantri Surakshit Matritva Abhiyan PMSMA tracking software", "maternal tetanus diphtheria vaccination and iron folic acid tracking", "antenatal visit clinical checklist and lab investigation EMR tool"],
        questionKeywords: ["What is antenatal care (ANC) records software?", "How does clinic software track routine ANC checkups and maternal health cards?", "Can obstetric software track maternal immunization like Td vaccines?", "Does ANC software support government maternity scheme documentation?"],
        entityTerms: ["Antenatal Care (ANC)", "PMSMA", "Maternal Anemia", "Td Vaccination", "Gestational Diabetes (GDM)", "Preeclampsia Screening", "Maternal Health Card"],
        intent: "Clinical Workflow / Compliance",
        whatItDoes: "Documents structured ANC visit schedules, maternal weight, preeclampsia urine protein checks, gestational diabetes screening, Td immunizations, and government maternity welfare data."
    },
    "ultrasound-reports": {
        cluster: "GYNECOLOGY",
        primaryKeyword: "obstetric ultrasound reporting software",
        secondaryKeywords: ["fetal biometry ultrasound reporting", "PNDT compliant ultrasound software", "anomaly scan report system", "NT scan documentation EMR"],
        longTailKeywords: ["obstetric ultrasound reporting software for diagnostic centers India", "PNDT Act compliant ultrasound documentation and reporting system", "fetal biometry BPD HC AC FL and estimated fetal weight software", "NT scan and anomaly ultrasound structured report templates"],
        questionKeywords: ["What is obstetric ultrasound reporting software?", "How does ultrasound software calculate estimated fetal weight (EFW) from biometry?", "Is the reporting software strictly compliant with PC-PNDT Act guidelines in India?", "Can ultrasound DICOM images and video clips be attached to reports?"],
        entityTerms: ["Obstetric Ultrasound", "PC-PNDT Act Compliance", "Fetal Biometry", "BPD, HC, AC, FL", "Estimated Fetal Weight (EFW)", "Anomaly Scan", "Amniotic Fluid Index (AFI)"],
        intent: "Product / Compliance",
        whatItDoes: "Calculates fetal biometry parameters (BPD, HC, AC, FL, EFW, AFI), generates structured anomaly scan reports, and enforces strict PC-PNDT Act compliance."
    },
    "delivery-records": {
        cluster: "GYNECOLOGY",
        primaryKeyword: "labor and delivery records software",
        secondaryKeywords: ["partograph software for hospitals", "maternity labor room EMR", "birth summary documentation system", "intrapartum monitoring software"],
        longTailKeywords: ["labor and delivery records management software for maternity hospitals", "digital WHO partograph labor progress monitoring software India", "normal delivery and cesarean section operative note EMR", "newborn birth register and maternal delivery summary tool"],
        questionKeywords: ["What is labor and delivery records software?", "How does digital partograph software monitor labor progression?", "Can delivery details like mode of birth and perineal tears be documented?", "Does delivery software automatically transfer newborn records to pediatric EMR?"],
        entityTerms: ["Labor & Delivery", "WHO Partograph", "Cervical Dilation", "Fetal Heart Decelerations", "Cesarean Section", "Perineal Repair", "Birth Registry"],
        intent: "Operational / Clinical",
        whatItDoes: "Features interactive digital WHO partographs tracking cervical dilation and fetal heart rates, logging delivery modes, maternal outcomes, and seamless newborn record handoffs."
    },
    "fertility-treatment-tracking": {
        cluster: "GYNECOLOGY",
        primaryKeyword: "IVF and fertility clinic management software",
        secondaryKeywords: ["ART clinic software India", "embryology lab documentation system", "ovulation induction tracking EMR", "IUI cycle management software"],
        longTailKeywords: ["IVF and fertility treatment tracking software for ART clinics India", "ART Act compliant embryology lab and oocyte cryopreservation software", "follicular monitoring scan and ovulation induction cycle tracking EMR", "IUI and IVF cycle documentation with transparent success tracking"],
        questionKeywords: ["What is fertility treatment tracking software?", "How do IVF clinics document follicular monitoring and hormone levels?", "Is the software compliant with the Indian ART (Regulation) Act 2021?", "Can embryology lab data like oocyte retrieval and grading be tracked?"],
        entityTerms: ["Assisted Reproductive Technology (ART)", "ART Act 2021", "IVF", "IUI", "Follicular Monitoring", "Oocyte Retrieval", "Embryo Grading", "Cryopreservation"],
        intent: "Specialized / Workflow",
        whatItDoes: "Manages ovulation induction, follicular scans, egg retrievals, and embryology lab records in full compliance with India's Assisted Reproductive Technology (ART) Act 2021."
    },

    // 10. PSYCHIATRY
    "mental-health-assessments": {
        cluster: "PSYCHIATRY",
        primaryKeyword: "psychiatric assessment and clinical evaluation software",
        secondaryKeywords: ["mental health screening EMR", "depression anxiety assessment software", "PHQ-9 GAD-7 scoring system", "psychiatric history software"],
        longTailKeywords: ["psychiatric assessment and clinical documentation software for hospitals", "digital PHQ-9 and GAD-7 mental health score tracking in EMR", "psychiatric emergency evaluation and risk assessment software India", "mental state examination MSE documentation templates for psychiatrists"],
        questionKeywords: ["What is psychiatric assessment software?", "How do mental health clinicians record standardized PHQ-9 and GAD-7 scores?", "Can psychiatric Mental State Examinations (MSE) be structured digitally?", "Does mental health software generate longitudinal symptom severity graphs?"],
        entityTerms: ["Psychiatric Assessment", "Mental State Examination (MSE)", "PHQ-9", "GAD-7", "Bipolar Screening", "Psychiatric History", "Symptom Severity"],
        intent: "Clinical Tool / Product",
        whatItDoes: "Digitizes Mental State Examinations (MSE), PHQ-9 depression screening, GAD-7 anxiety assessments, and suicide risk evaluations into confidential clinical charts."
    },
    "therapy-session-notes": {
        cluster: "PSYCHIATRY",
        primaryKeyword: "therapy session notes and psychotherapy EMR software",
        secondaryKeywords: ["psychotherapy progress notes software", "counseling documentation system", "CBT session notes EMR", "mental health therapy tracking"],
        longTailKeywords: ["psychotherapy session notes documentation software for psychologists", "CBT and counseling therapy progress notes inside secure EMR", "patient therapeutic goals and homework tracking software India", "psychology private practice case note management software"],
        questionKeywords: ["What is therapy session notes software?", "How do psychologists document psychotherapy sessions securely?", "Can cognitive behavioral therapy (CBT) goals and interventions be tracked?", "Does psychotherapy software protect session notes with privileged access controls?"],
        entityTerms: ["Psychotherapy Notes", "Cognitive Behavioral Therapy (CBT)", "Counseling", "Therapeutic Interventions", "Session Frequency", "Progress Tracking"],
        intent: "Clinical Workflow",
        whatItDoes: "Enables psychologists and counselors to document CBT interventions, homework assignments, emotional milestones, and session goals behind elevated privacy protections."
    },
    "medication-tracking": {
        cluster: "PSYCHIATRY",
        primaryKeyword: "psychotropic medication monitoring software",
        secondaryKeywords: ["psychiatry drug tracking EMR", "lithium clozapine monitoring software", "psychiatric prescription management", "metabolic side-effect tracking"],
        longTailKeywords: ["psychotropic medication monitoring software for psychiatric clinics", "lithium and clozapine therapeutic lab tracking inside hospital EMR", "metabolic syndrome and antipsychotic side effect monitoring tool", "psychiatric medication titration and adherence tracking system India"],
        questionKeywords: ["What is psychotropic medication monitoring software?", "How do psychiatrists track narrow therapeutic index drugs like lithium and clozapine?", "Can antipsychotic metabolic side-effects (weight, lipids, HbA1c) be graphed?", "Does psychiatry EMR warn on dangerous psychotropic drug interactions?"],
        entityTerms: ["Psychotropic Medications", "Therapeutic Drug Monitoring", "Lithium Levels", "Clozapine ANC Counts", "Metabolic Syndrome", "Antipsychotics", "Drug Interactions"],
        intent: "Clinical Safety / Feature",
        whatItDoes: "Monitors narrow therapeutic index psychotropics (Lithium, Clozapine), scheduling mandatory ANC and serum level labs while tracking antipsychotic metabolic side-effects."
    },
    "behavioral-history": {
        cluster: "PSYCHIATRY",
        primaryKeyword: "behavioral history documentation software",
        secondaryKeywords: ["psychiatric social history EMR", "longitudinal behavioral tracking", "substance abuse history documentation", "patient psychosocial charting"],
        longTailKeywords: ["behavioral and psychosocial history documentation software for psychiatry", "longitudinal patient behavioral episode and trigger tracking in EMR", "substance use addiction and rehabilitation history software India", "developmental and family psychiatric history mapping tool"],
        questionKeywords: ["What is behavioral history documentation software?", "How do mental health teams chart psychosocial histories and addiction patterns?", "Can family psychiatric pedigree and developmental trauma be mapped?", "Does behavioral history software track inpatient behavioral observation charts?"],
        entityTerms: ["Behavioral History", "Psychosocial Context", "Substance Use Disorder", "Family Psychiatric History", "Trauma History", "Inpatient Observation"],
        intent: "Clinical Workflow",
        whatItDoes: "Maps longitudinal psychosocial histories, substance abuse patterns, family psychiatric pedigrees, and developmental trauma within a unified timeline."
    },
    "confidential-records": {
        cluster: "PSYCHIATRY",
        primaryKeyword: "confidential psychiatric records security software",
        secondaryKeywords: ["mental health data privacy EMR", "Mental Healthcare Act 2017 compliance", "restricted psychiatric chart access", "psychiatry confidentiality software"],
        longTailKeywords: ["confidential psychiatric records security software for hospitals India", "Mental Healthcare Act 2017 compliant patient privacy controls in EMR", "role-based privileged access for psychiatric clinical notes", "DPDP Act healthcare data privacy and audit trail software"],
        questionKeywords: ["What is confidential psychiatric records software?", "How do hospitals isolate sensitive psychiatric therapy notes from general EMR?", "Is the mental health module compliant with the Mental Healthcare Act 2017?", "Can doctors track which hospital staff accessed psychiatric records?"],
        entityTerms: ["Confidentiality", "Mental Healthcare Act 2017", "DPDP Act 2023", "Privileged Clinical Access", "Break-Glass Audit Logs", "Patient Privacy"],
        intent: "Security / Compliance",
        whatItDoes: "Protects psychiatric records with role-based firewalls, break-glass audit logs, and patient consent directives in full compliance with the Mental Healthcare Act 2017."
    },

    // 11. GENERAL PRACTICE
    "patient-history": {
        cluster: "GENERAL PRACTICE",
        primaryKeyword: "electronic patient medical history software",
        secondaryKeywords: ["longitudinal patient records EMR", "clinical medical history software", "patient past medical history system", "general practice health records"],
        longTailKeywords: ["electronic patient medical history software for clinics India", "longitudinal patient medical surgical and family history in EMR", "chronic disease and childhood illness history charting tool", "integrated patient health summary software for general practitioners"],
        questionKeywords: ["What is electronic patient medical history software?", "How do clinics maintain comprehensive lifetime medical histories in EMR?", "Can past surgical procedures, family diseases, and allergies be charted?", "How does longitudinal patient history improve general practice diagnosis?"],
        entityTerms: ["Patient Medical History", "Past Surgical History", "Family History", "Chronic Conditions", "Allergies", "Longitudinal Health Record", "Primary Care EMR"],
        intent: "Core Product / Clinical",
        whatItDoes: "Consolidates lifelong medical, surgical, family, allergy, and social histories into a rapid-read timeline accessible within 2 clicks during primary care consultations."
    },
    "diagnosis-treatment": {
        cluster: "GENERAL PRACTICE",
        primaryKeyword: "clinical diagnosis and treatment planning software",
        secondaryKeywords: ["ICD-10 clinical coding software", "general practice clinical documentation", "doctor consultation SOAP notes", "treatment pathway software"],
        longTailKeywords: ["clinical diagnosis and treatment planning software for Indian clinics", "ICD-10 compliant doctor consultation and prescription software", "general practitioner structured SOAP clinical notes system", "differential diagnosis and evidence based treatment pathway tool"],
        questionKeywords: ["What is clinical diagnosis and treatment planning software?", "How do doctors document structured SOAP consultation notes in EMR?", "Can ICD-10 diagnostic codes be searched with intuitive auto-complete?", "Does clinical software provide evidence-based treatment templates?"],
        entityTerms: ["Clinical Diagnosis", "ICD-10 Coding", "SOAP Notes", "Differential Diagnosis", "Treatment Pathway", "Evidence-Based Medicine", "Clinical Decision Support"],
        intent: "Core Product / Clinical",
        whatItDoes: "Speeds clinical documentation with intelligent ICD-10 search, structured SOAP note templates, differential diagnosis prompts, and standardized treatment protocols."
    },
    "e-prescriptions": {
        cluster: "GENERAL PRACTICE",
        primaryKeyword: "e-prescription software for doctors",
        secondaryKeywords: ["digital prescription software India", "electronic prescribing system EMR", "medical prescription generator", "drug interaction prescription tool"],
        longTailKeywords: ["e-prescription software for clinics and doctors India", "digital prescription generator with WhatsApp and SMS sharing", "drug interaction and dosage check e-prescribing system", "medical council compliant electronic prescription software with digital signature"],
        questionKeywords: ["What is e-prescription software?", "How do doctors create and send digital prescriptions to patients in India?", "Does e-prescribing software check for drug-drug interactions automatically?", "Are digital prescriptions legal and compliant with National Medical Commission guidelines?"],
        entityTerms: ["e-Prescriptions", "Digital Rx", "Drug-Drug Interactions", "Generic Brand Database", "WhatsApp Rx Delivery", "NMC Guidelines", "Digital Signature"],
        intent: "Core Product / Workflow",
        whatItDoes: "Generates tamper-proof digital prescriptions with automatic drug-drug interaction alerts, generic drug equivalents, branded alternatives, and instant WhatsApp delivery."
    },
    "lab-integration": {
        cluster: "GENERAL PRACTICE",
        primaryKeyword: "diagnostic lab integration software",
        secondaryKeywords: ["pathology lab EMR integration", "LIMS hospital software sync", "automated lab test result software", "bidirectional lab analyzer interface"],
        longTailKeywords: ["diagnostic lab integration software for clinics and hospitals India", "automated pathology lab test ordering and result syncing in EMR", "bidirectional laboratory machine HL7 analyzer interface software", "patient abnormal lab value alert and WhatsApp report sharing tool"],
        questionKeywords: ["What is diagnostic lab integration software?", "How do clinics receive digital pathology lab results directly into patient charts?", "Can doctors order lab tests electronically during consultation?", "Does lab integration software flag critical and abnormal values automatically?"],
        entityTerms: ["Laboratory Integration", "LIMS", "HL7 / ASTM", "Bi-directional Interfacing", "Automated Result Sync", "Critical Value Alerts", "Pathology EMR"],
        intent: "Integration / Operational",
        whatItDoes: "Connects hospital and partner pathology labs directly to the doctor's screen, enabling 1-click test requisitions, automated result syncing, and critical-value color alerts."
    },
    "billing-reports": {
        cluster: "GENERAL PRACTICE",
        primaryKeyword: "clinic billing and revenue reporting software",
        secondaryKeywords: ["outpatient billing software India", "clinic financial reports system", "doctor collection and revenue dashboard", "GST clinic invoicing software"],
        longTailKeywords: ["clinic billing and financial reporting software for doctors India", "daily OPD collection cash card UPI revenue summary dashboard", "GST compliant medical billing and invoice management system", "clinic financial reporting and accounting software with Tally export"],
        questionKeywords: ["What is clinic billing and revenue reporting software?", "How do clinics track daily cash, card, and UPI fee collections?", "Can clinic billing software generate GST-compliant itemized receipts?", "Does medical billing software export financial data directly to accounting systems?"],
        entityTerms: ["Clinic Billing", "OPD Invoicing", "Daily Collection Summary", "UPI / Cash / Card Reconciliation", "GST Compliance", "Revenue Analytics", "Financial Reports"],
        intent: "Commercial / Operational",
        whatItDoes: "Automates OPD consultation invoicing, payment reconciliations (Cash, UPI, Cards), doctor revenue shares, and daily financial summary reports with GST compliance."
    },

    // 12. CORE PLATFORM
    "patient-registration": {
        cluster: "CORE PLATFORM",
        primaryKeyword: "hospital patient registration software",
        secondaryKeywords: ["outpatient patient registration system", "ABHA health ID registration EMR", "hospital front desk software India", "patient check-in software"],
        longTailKeywords: ["hospital patient registration software with ABHA integration India", "fast front desk patient check-in and barcode UHID generation", "outpatient and inpatient digital registration software for hospitals", "biometric and OTP patient demographic verification software"],
        questionKeywords: ["What is hospital patient registration software?", "How do front desk staff register patients quickly using ABHA / Ayushman Bharat ID?", "Does patient registration software generate unique hospital identification (UHID) numbers?", "Can repeat patients check in via QR code or mobile phone?"],
        entityTerms: ["Patient Registration", "UHID (Unique Hospital ID)", "ABHA Health ID", "Front Desk Check-in", "Demographic Verification", "Barcode Wristband", "ABDM M1"],
        intent: "Core Platform / Workflow",
        whatItDoes: "Accelerates front-desk check-in under 60 seconds with instant ABHA creation, Aadhaar/OTP verification, unique hospital identification (UHID) allocation, and barcode wristbands."
    },
    "emr-ehr-system": {
        cluster: "CORE PLATFORM",
        primaryKeyword: "cloud EMR EHR software India",
        secondaryKeywords: ["hospital electronic medical records", "ABDM compliant EHR system", "multi-specialty EMR software", "paperless hospital software"],
        longTailKeywords: ["cloud EMR EHR software for Indian hospitals and multi-specialty clinics", "ABDM and DPDP Act 2023 certified electronic medical record system", "customizable specialty clinical documentation and e-prescribing EMR", "offline capable fast cloud electronic health records platform India"],
        questionKeywords: ["What is cloud EMR EHR software?", "Why do Indian hospitals need ABDM-compliant electronic health records?", "How does an integrated EMR system reduce diagnostic and medical errors?", "Can doctors access patient charts securely across desktop, tablet, and mobile?"],
        entityTerms: ["Electronic Medical Records (EMR)", "Electronic Health Records (EHR)", "ABDM Compliance", "DPDP Act 2023", "Interoperability", "Paperless Hospital", "Cloud Healthcare"],
        intent: "Core Platform / Commercial Pillar",
        whatItDoes: "Provides an enterprise-grade, cloud-first electronic health record system unifying OPD notes, IPD admissions, lab results, radiology, vitals, and nursing charts under ABDM compliance."
    },
    "billing-invoicing": {
        cluster: "CORE PLATFORM",
        primaryKeyword: "hospital billing and invoicing software",
        secondaryKeywords: ["medical billing system India", "IPD OPD hospital billing software", "TPA insurance billing management", "hospital invoicing software GST"],
        longTailKeywords: ["hospital billing and invoicing software for private hospitals India", "comprehensive OPD and IPD itemized billing with TPA cashless claims", "GST compliant hospital invoice generator with automated tariff schedules", "hospital revenue cycle and counter payment reconciliation system"],
        questionKeywords: ["What is hospital billing and invoicing software?", "How do hospitals manage both OPD counter payments and IPD package bills?", "Can the billing system handle complex corporate and TPA cashless insurance claims?", "Does hospital invoicing support automated bed, OT, and medication charges?"],
        entityTerms: ["Hospital Billing", "IPD Invoicing", "OPD Billing", "TPA Cashless Claims", "Tariff Schedules", "GST Medical Invoice", "Revenue Cycle Management"],
        intent: "Core Platform / Commercial",
        whatItDoes: "Manages complex hospital tariff matrices, room rents, OT charges, pharmacy indents, package rates, TPA cashless pre-authorizations, and GST-compliant invoicing."
    },
    "notifications-system": {
        cluster: "CORE PLATFORM",
        primaryKeyword: "hospital patient notification and messaging software",
        secondaryKeywords: ["healthcare SMS WhatsApp alerts system", "hospital communication automation", "appointment reminder software", "patient notification engine"],
        longTailKeywords: ["hospital patient notification and messaging software India", "automated WhatsApp appointment reminder and report ready alerts", "critical lab alert and doctor duty notification software for hospitals", "multi-channel SMS WhatsApp and email healthcare communication system"],
        questionKeywords: ["What is hospital patient notification software?", "How do hospitals automate appointment reminders via WhatsApp and SMS?", "Can patients receive lab test ready alerts and download links automatically?", "Does the notification engine alert on-call doctors for emergency consultations?"],
        entityTerms: ["Patient Notifications", "WhatsApp API", "SMS Gateway", "Automated Reminders", "Report Ready Alerts", "Emergency Callout", "Patient Engagement"],
        intent: "Core Platform / Communication",
        whatItDoes: "Triggers automated WhatsApp, SMS, and email alerts for appointment confirmations, token queue updates, lab report downloads, vaccine due dates, and discharge follow-ups."
    },
    "cloud-security": {
        cluster: "CORE PLATFORM",
        primaryKeyword: "healthcare cloud security and compliance software",
        secondaryKeywords: ["hospital data security DPDP Act", "HIPAA ISO 27001 healthcare cloud", "medical data encryption software", "cloud EMR security India"],
        longTailKeywords: ["healthcare cloud data security and DPDP Act compliance software India", "ISO 27001 certified cloud hospital management security architecture", "end-to-end encrypted medical records and role-based access control", "disaster recovery and automated cloud backups for hospital databases"],
        questionKeywords: ["What is healthcare cloud security software?", "How does Medical365 protect sensitive patient data under the DPDP Act 2023?", "Are hospital electronic health records encrypted both in transit and at rest?", "What disaster recovery and backup safeguards protect cloud hospital databases?"],
        entityTerms: ["Cloud Security", "DPDP Act 2023", "ISO 27001", "AES-256 Encryption", "TLS 1.3", "Role-Based Access Control (RBAC)", "Disaster Recovery", "Healthcare Compliance"],
        intent: "Core Platform / Security & Trust",
        whatItDoes: "Enforces enterprise bank-grade security with AES-256 encryption at rest, TLS 1.3 in transit, role-based access controls (RBAC), immutable audit trails, and DPDP Act 2023 compliance."
    }
};

console.log('Generating complete keyword map for all 67 candidate pages...');
const keywordMap = [];

for (const [slug, data] of Object.entries(specialtyDefinitions)) {
    keywordMap.push({
        slug,
        url: `https://www.medical365.in/${slug}`,
        filename: `${slug}.html`,
        ...data
    });
}

console.log('Total mapped pages:', keywordMap.length);

const outPath = path.join(repoRoot, 'scratch/specialty_keyword_map.json');
fs.writeFileSync(outPath, JSON.stringify(keywordMap, null, 2), 'utf8');
console.log('Saved keyword map to scratch/specialty_keyword_map.json');
