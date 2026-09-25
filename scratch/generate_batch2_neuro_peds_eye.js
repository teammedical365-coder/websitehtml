const path = require('path');
const { buildPages } = require('./page_builder_engine.js');

const repoRoot = path.resolve(__dirname, '..');
const diagramDir = path.join(repoRoot, 'images/diagrams');

console.log('=== EXECUTING BATCH 2: NEUROLOGY (6) + PEDIATRICS (6) + OPHTHALMOLOGY (5) = 17 PAGES ===');

const batch2Data = {
    // ══════════════════════════════════════════════════
    // NEUROLOGY (6 pages)
    // ══════════════════════════════════════════════════
    "eeg-reports": {
        cluster: "NEUROLOGY",
        title: "EEG Reporting Software India | Neurophysiology EMR | Medical365",
        h1: "EEG Machine Integration & Neurophysiology Reporting Software",
        metaDesc: "Medical365 EEG reporting software integrates digital electroencephalographs with hospital EMR. Automated montage selection, spike detection & ABDM compliant.",
        diagramTitle: "Digital EEG Waveform Ingestion & Reporting Pipeline",
        nodes: ["Digital EEG Acquisition Cart", "DICOM / EDF Waveform Gateway", "Neurophysiologist Review Viewer", "Structured Neurological Report", "EMR & Patient Sync"],
        color: "#7c3aed",
        quickAnswer: "EEG reporting software is a specialized neurophysiology clinical module that interfaces digital electroencephalograph (EEG) diagnostic machines directly with hospital EMR systems. It ingests multi-channel cerebral electrical waveforms (EDF/EDF+ and DICOM), supports standard 10-20 montage reviews, enables digital spike and sharp wave annotation, and generates structured neurological diagnostic reports for epilepsy and encephalopathy.",
        bgText: "Epilepsy and paroxysmal neurological disorders represent a major public health challenge in India, affecting over 12 million individuals across urban and rural populations. In Indian neurology clinics, tertiary medical colleges, and comprehensive epilepsy care centers, neurologists evaluate dozens of routine, sleep-deprived, and video-EEG recordings every week.\n\nIn conventional hospital workflows, reviewing EEG studies is fraught with logistical bottlenecks. EEG machines are often isolated from the main hospital network. Technicians must print selected representative pages on paper or export proprietary viewer files onto USB drives or optical discs. Neurologists are forced to sit at dedicated physical recording machines to interpret studies, delaying urgent critical care reports for patients in non-convulsive status epilepticus in the ICU.\n\nMedical365's EEG Reporting module solves these challenges by converting proprietary multi-channel recordings into standardized, web-accessible formats (European Data Format EDF/EDF+ and DICOM). Neurologists can remotely review raw EEG traces, toggle montages (Bipolar, Referention, Average), adjust high/low pass filters, annotate epileptiform discharges, and sign clinical reports from any authorized hospital terminal or remote tablet.",
        capabilities: [
            { title: "Direct EDF/EDF+ & DICOM Waveform Ingestion", text: "Interfaces with digital EEG hardware from Nihon Kohden, Natus (Grass/Dantec), RMS India, Medicaid, and Micromed, ingesting continuous 16 to 32-channel raw brainwave data." },
            { title: "Interactive Montage Switching & Digital Filtering", text: "Allows instantaneous switching between standard 10-20 montages: Longitudinal Bipolar ('Double Banana'), Transverse Bipolar, Referention (A1/A2), and Laplacian Average with customized notch filter adjustments." },
            { title: "Epileptiform Discharge & Spike Tagging", text: "Enables clinicians to mark and categorize interictal epileptiform discharges: spikes (<70 ms), sharp waves (70-200 ms), spike-wave complexes, polyspikes, and focal slowing." },
            { title: "Activation Procedure Event Logging", text: "Structures documentation of standard activation maneuvers: hyperventilation (HV) response, photic stimulation frequency driving, and sleep deprivation transitions." },
            { title: "ICU Continuous Telemetry & Burst Suppression Tracking", text: "Tracks continuous bedside EEG telemetry in critical care units, logging burst-suppression ratios (BSR) and non-convulsive status epilepticus (NCSE) treatment responses." },
            { title: "Standardized IFCN Diagnostic Templates", text: "Features pre-configured reporting templates conforming to International Federation of Clinical Neurophysiology (IFCN) standards, eliminating ambiguous narrative notes." }
        ],
        workflowSteps: [
            { step: "Order & Montage Setup", desc: "Neurologist orders routine or sleep EEG; technician applies 10-20 electrodes and records baseline impedance (<5 kΩ)." },
            { step: "Waveform Recording & Streaming", desc: "Patient undergoes recording with activation procedures; raw trace streams securely to Medical365 cloud neuro-vault." },
            { step: "Remote Waveform Review", desc: "Neurologist opens browser viewer, switches montages, zooms into suspects leads, and measures wave voltage/amplitude." },
            { step: "Structured Interpretation", desc: "Doctor classifies background activity (alpha rhythm symmetry), notes focal/generalized discharges, and signs report." },
            { step: "EMR & ABHA Synchronization", desc: "Final report with representative waveform clips attaches to patient chart and dispatches to Ayushman Bharat Health Account." }
        ],
        compliance: "Medical365 EEG Reporting complies with International Federation of Clinical Neurophysiology (IFCN) guidelines, American Clinical Neurophysiology Society (ACNS) standardized terminology, and MoHFW EHR standards.\n\nAll continuous raw neurological trace files and patient clinical reports are secured with AES-256 encryption compliant with the DPDP Act 2023. Final diagnostic records link seamlessly with ABDM digital health records.",
        table: [
            { feature: "Waveform Review", manual: "Sitting physically at the acquisition machine or viewing paper printouts", m365: "Zero-footprint web viewer accessible securely from any doctor workstation" },
            { feature: "Montage Switching", manual: "Fixed during printout; cannot be altered retrospectively on paper", m365: "1-click dynamic switching between Bipolar, Average, and Reference montages" },
            { feature: "Spike Measurement", manual: "Visual estimation with plastic ruler on paper printout", m365: "Calibrated digital microvolt (µV) and millisecond (ms) caliper tools" },
            { feature: "ICU Status Monitoring", manual: "Neurologist must walk to ICU to inspect machine screen", m365: "Real-time remote telemetry review for urgent status epilepticus decisions" },
            { feature: "Longitudinal Storage", manual: "Optical discs or USBs easily corrupted, lost, or misplaced", m365: "Permanent, encrypted cloud archiving linked to longitudinal patient EMR" }
        ],
        faqs: [
            { q: "Can neurologists review raw EEG waveforms from home or mobile devices?", a: "Yes. Medical365 features a zero-footprint HTML5 neurophysiology viewer that allows neurologists to adjust paper speed (15, 30, 60 mm/s), gain (3, 5, 7, 10 µV/mm), and filters directly in any modern web browser without installing third-party software." },
            { q: "Which EEG file formats does the software support?", a: "The software supports universal European Data Format (EDF and EDF+), DICOM-waveform, and automated parsing from major manufacturers including Nihon Kohden, Natus, and RMS India." },
            { q: "How are activation procedures like photic stimulation documented?", a: "Technicians log exact timestamps and frequencies (1 Hz to 30 Hz) of photic stimulation, and the software tags corresponding points on the waveform timeline, highlighting photoparoxysmal responses." },
            { q: "Does the module support pediatric and neonatal EEG interpretation?", a: "Yes. Dedicated neonatal templates allow documentation of discontinuous background patterns (trace alternant, trace discontinu), sleep state transitions, and gestational age-adjusted maturation markers." },
            { q: "Can representative waveform snippets be embedded into the final PDF report?", a: "Yes. Neurologists can capture 2-to-5-second sample clips of abnormal discharges (e.g., 3 Hz spike-and-wave) that embed directly into the formatted printable consultation report." },
            { q: "Is the software compliant with Indian medical data protection laws?", a: "Yes. All neurophysiological recordings, patient demographics, and doctor notes are encrypted under AES-256 and protected by role-based access controls in full compliance with the DPDP Act 2023." }
        ]
    },

    "mri-ct-integration": {
        cluster: "NEUROLOGY",
        title: "Neuro MRI CT Integration Software | Brain Imaging PACS | Medical365",
        h1: "Neuroimaging MRI & CT Scan PACS Integration Software",
        metaDesc: "Medical365 neuro MRI/CT integration software connects hospital 1.5T/3T scanners to neurology EMR. Multi-planar reconstruction & stroke imaging workflows.",
        diagramTitle: "Neuroimaging MRI & CT DICOM Integration Pipeline",
        nodes: ["MRI / CT Diagnostic Scanner", "Neuroimaging PACS Gateway", "Multi-Planar Reconstruction (MPR)", "Neurologist & Radiologist Review", "Stroke Protocol & EMR Sync"],
        color: "#7c3aed",
        quickAnswer: "Neuro MRI CT integration software is an advanced musculoskeletal and brain radiology PACS integration module designed for neurologists, neurosurgeons, and radiologists. It transmits multi-sequence brain and spine DICOM imaging (T1, T2, FLAIR, DWI/ADC, perfusion, CT angiography) directly into the clinical EMR, providing multi-planar reconstruction (MPR), 3D volume rendering, and rapid acute stroke windowing.",
        bgText: "Brain and spine imaging—spanning magnetic resonance imaging (MRI) and computed tomography (CT)—forms the diagnostic bedrock of clinical neurology and neurosurgery. In Indian tertiary hospitals, trauma centers, and acute stroke units, clinicians review complex neuroimaging series to diagnose acute ischemic strokes, intracerebral hemorrhages, intracranial tumors, multiple sclerosis plaques, and spinal cord compressions.\n\nIn typical hospital setups, neurosurgeons and neurologists encounter substantial friction accessing high-resolution imaging. Viewing full volumetric studies (often comprising 1,000+ DICOM slices) requires walking to specialized radiology reporting suites. On general wards and emergency triage, clinicians are frequently reduced to examining compressed smartphone photos of lightboxes, running the severe risk of missing subtle hyperdense MCA signs, early infarct hypodensities, or micro-hemorrhages.\n\nMedical365's Neuro MRI/CT Integration module bridges the radiology-clinical divide by embedding an enterprise-grade, zero-footprint DICOM viewer into the neurology consultation screen. With multi-planar orthogonal reconstruction (axial, sagittal, coronal), side-by-side diffusion-perfusion mismatch mapping, and rapid windowing tools, clinicians make timely, confident neurovascular decisions.",
        capabilities: [
            { title: "Full-Volume Multi-Sequence Neuroimaging Viewing", text: "Streams high-resolution volumetric brain and spine scans (T1-weighted, T2-weighted, FLAIR, Diffusion-Weighted Imaging DWI, ADC maps, Gradient Echo/SWI, and 3D TOF MRA) with ultra-fast progressive rendering." },
            { title: "Multi-Planar Reconstruction (MPR)", text: "Real-time orthogonal reconstruction allowing clinicians to re-slice volumetric datasets into axial, coronal, sagittal, and oblique views to trace tortuous cranial nerves and subtle disk herniations." },
            { title: "Acute Stroke Rapid Windowing Presets", text: "One-click window presets: Stroke Window (W:40, L:40) to accentuate subtle gray-white matter blurring, Brain Tissue (W:80, L:40), Bone Window (W:2000, L:500) for fractures, and Subdural Window (W:150, L:80)." },
            { title: "Intracerebral Hemorrhage Volume (ABC/2) Calculator", text: "Integrated caliper tools automatically calculate hematoma volume using the validated ABC/2 formula on non-contrast head CT, aiding urgent surgical decompression decisions." },
            { title: "DWI / FLAIR & Diffusion-Perfusion Mismatch Review", text: "Enables split-screen synchronized scrolling between DWI and ADC maps to confirm acute cytotoxic edema, and correlates with FLAIR to estimate ischemic stroke symptom onset time." },
            { title: "Pre-Surgical Trajectory & Spine Annotation Tools", text: "Allows neurosurgeons to measure spinal canal diameter, vertebral height loss, spondylolisthesis grade (Meyerding), and plan pedicle screw trajectories directly on digital radiographs." }
        ],
        workflowSteps: [
            { step: "Scan Protocol Execution", desc: "CT or MRI completed in radiology; scanner automatically pushes DICOM dataset to Medical365 PACS gateway." },
            { step: "Intelligent Study Routing", desc: "Study instantly auto-matches patient UHID and routes to emergency stroke dashboard or neurologist workstation." },
            { step: "Synchronized Clinical Review", desc: "Neurologist reviews DWI/ADC sequences, applies acute stroke window presets, and measures lesion dimensions." },
            { step: "Radiologist Annotation & Sign-Off", desc: "Neuroradiologist provides structured diagnostic report with key image bookmarks and digital signature." },
            { step: "Surgical Planning & ABHA Linkage", desc: "Images and findings link directly into pre-operative theater planning and patient's Ayushman Bharat Health Account." }
        ],
        compliance: "Medical365 Neuro MRI/CT Integration operates in strict compliance with DICOM Part 10 and Part 14 standards, IHE (Integrating the Healthcare Enterprise) Radiology profiles, and MoHFW EHR standards.\n\nAll diagnostic imaging datasets and radiological annotations are encrypted via AES-256 and stored in compliance with the DPDP Act 2023. Diagnostic imaging study resources synchronize seamlessly with ABDM digital health summaries.",
        table: [
            { feature: "Image Access Speed", manual: "Waiting 30–60 minutes for printed film sheets or CD-ROM burning", m365: "Instant on-screen access within 60 seconds of scan completion" },
            { feature: "Acute Stroke Windowing", manual: "Fixed windowing on printed film; subtle early infarcts easily missed", m365: "Interactive Stroke Window preset (W:40, L:40) maximizing tissue contrast" },
            { feature: "Multi-Planar Reconstruction", manual: "Not possible on static films; clinician sees only scanned planes", m365: "Real-time 3D MPR re-slicing into axial, sagittal, coronal, and oblique" },
            { feature: "Hematoma Volume Calculation", manual: "Manual estimation with plastic ruler prone to mathematical errors", m365: "Automated ABC/2 calculation engine for intracerebral hemorrhage volume" },
            { feature: "Operation Theater Access", manual: "Surgeons tape physical film sheets onto dusty OT lightboxes", m365: "High-definition digital PACS display on sterile OT ceiling boom monitors" }
        ],
        faqs: [
            { q: "Can doctors view large MRI brain studies (1000+ slices) smoothly without lag?", a: "Yes. Medical365 utilizes high-performance server-side rendering and progressive WebAssembly streaming. Only the actively viewed slices are decoded in real time, enabling fluid, lag-free scrolling through thousands of images even on standard internet connections." },
            { q: "How does the software assist emergency stroke evaluations?", a: "The module features dedicated emergency stroke presets: instant 1-click stroke windowing (W:40, L:40) on non-contrast CT, synchronized cross-referencing between DWI and ADC maps to verify acute ischemia, and automated ASPECTS scoring documentation." },
            { q: "Can neurosurgeons perform spine measurements for surgical planning?", a: "Yes. Surgeons can measure spinal canal anteroposterior diameter, Cobb angles for scoliosis, vertebral body height loss for compression fractures, and angle trajectories for pedicle screw placement." },
            { q: "Is the viewer accessible on mobile tablets during ward rounds?", a: "Yes. The zero-footprint web viewer is fully responsive on iPads and Android tablets, supporting multi-touch gestures for zoom, pan, window/level adjustments, and slice navigation." },
            { q: "How are massive radiological image files stored cost-effectively?", a: "Medical365 employs intelligent tiered cloud storage: active recent studies reside in high-speed hot cache, while historical studies older than 90 days migrate to lossless compressed cold archives, optimizing hospital IT costs." },
            { q: "Can patients view and share their MRI/CT scans with outside specialists?", a: "Yes. Patients can generate an encrypted, time-limited viewing link from the Medical365 patient portal or download complete DICOM ISO packages for second opinions." }
        ]
    },

    "seizure-tracking": {
        cluster: "NEUROLOGY",
        title: "Epilepsy & Seizure Tracking Software | Neurology EMR | Medical365",
        h1: "Epilepsy & Seizure Frequency Tracking Software",
        metaDesc: "Medical365 seizure tracking software logs seizure frequency, semiology, anti-seizure medication (ASM) levels & ILAE classification in hospital EMR.",
        diagramTitle: "Longitudinal Seizure Tracking & Medication Titration Pipeline",
        nodes: ["Seizure Diary / Mobile Log", "ILAE Semiology Classification", "Anti-Seizure Medication (ASM) Engine", "Neurologist Epilepsy Review", "Rescue Protocol & EMR Sync"],
        color: "#7c3aed",
        quickAnswer: "Seizure tracking software is a specialized clinical epilepsy documentation module that logs seizure frequency, semiology, duration, post-ictal states, and anti-seizure medication (ASM) therapeutic levels. It standardizes diagnosis under the International League Against Epilepsy (ILAE) classification, plots monthly seizure diary trends, monitors drug side-effects, and generates personalized emergency rescue protocols.",
        bgText: "Epilepsy is a chronic neurological condition requiring meticulous, longitudinal clinical surveillance. In India, managing patients with epilepsy is compounded by inconsistent patient recall, varied seizure types, social stigma, and complex pharmacotherapy. When patients visit their neurologist every three to six months, asking 'how many seizures occurred since last visit?' often yields vague, unreliable estimates.\n\nIn traditional medical records, seizure documentation is fragmented into sporadic clinic notes without standardized categorization: were the episodes focal aware, focal impaired awareness, or generalized tonic-clonic? Was there an identifiable trigger such as sleep deprivation or missed medication? What were serum therapeutic drug levels? Without structured seizure logs, titrating anti-seizure medications (ASMs) becomes clinical guesswork.\n\nMedical365's Seizure Tracking module bridges this communication divide by combining a structured clinician epilepsy dashboard with a synchronized patient digital seizure diary. By tracking seizure semiology according to 2017 ILAE criteria, plotting seizure frequency trends against medication titration milestones, and monitoring therapeutic drug levels, Medical365 empowers neurologists to optimize seizure freedom while minimizing medication toxicity.",
        capabilities: [
            { title: "Standardized 2017 ILAE Seizure Semiology Picker", text: "Classifies seizure types into Focal (aware vs. impaired awareness, motor vs. non-motor), Generalized (motor tonic-clonic, absence, myoclonic, atonic), and Unknown onset with 1-click structured selection." },
            { title: "Interactive Longitudinal Seizure Diary & Trend Graphs", text: "Visualizes monthly seizure count, clustering patterns, and seizure-free days over time, correlating frequency shifts directly with medication adjustments." },
            { title: "Anti-Seizure Medication (ASM) Titration & Level Tracking", text: "Tracks dosages and therapeutic drug monitoring (TDM) serum levels for Levetiracetam, Valproate, Carbamazepine, Lamotrigine, Lacosamide, and Clobazam, flagging subtherapeutic or toxic levels." },
            { title: "Trigger & Precipitator Factor Documentation", text: "Structures logging of identifiable seizure triggers: sleep deprivation, fever/illness, missed medication doses, emotional stress, photic stimulation, and menstrual cycle correlations (catamenial epilepsy)." },
            { title: "Emergency Rescue Medication Protocol Builder", text: "Generates clear, patient-specific home emergency action plans (e.g. intranasal Midazolam or buccal Midazolam dosing for clusters or prolonged seizures >5 minutes)." },
            { title: "Patient & Caregiver Mobile Seizure Logging", text: "Enables patients or parents to log seizure events, duration, and video recordings via mobile smartphone app, immediately updating the hospital clinical record." }
        ],
        workflowSteps: [
            { step: "Patient Event Logging", desc: "Patient or caregiver logs seizure event, duration, and triggers via mobile app; video clips can be securely attached." },
            { step: "Automatic Frequency Graphing", desc: "Data aggregates on neurologist's consultation screen into monthly frequency charts and seizure-free day counters." },
            { step: "Therapeutic Drug Level Review", desc: "Neurologist checks recent serum ASM levels (e.g., serum valproate), liver function, and complete blood count." },
            { step: "Medication Adjustment & Plan", desc: "Doctor titrates ASM dose or introduces add-on therapy with automated drug-interaction and teratogenicity alerts." },
            { step: "Emergency Rescue Plan Dispatch", desc: "Updated emergency seizure action plan dispatches to patient WhatsApp and links to Ayushman Bharat Health Account." }
        ],
        compliance: "Medical365 Seizure Tracking strictly adheres to the 2017 International League Against Epilepsy (ILAE) classification of seizure types and the Indian Epilepsy Society (IES) clinical consensus guidelines.\n\nAll patient logs, medication histories, and clinical notes are protected under AES-256 encryption in full compliance with the DPDP Act 2023. Generated epilepsy care summaries integrate directly into ABDM digital health lockers.",
        table: [
            { feature: "Seizure Frequency Tracking", manual: "Patient recall memory during 5-minute OPD consultation; highly inaccurate", m365: "Real-time digital calendar tracking exact dates, times, and monthly counts" },
            { feature: "Semiology Classification", manual: "Vague descriptions like 'fits' or 'shaking episodes'", m365: "Standardized 2017 ILAE classification (Focal vs. Generalized motor/non-motor)" },
            { feature: "Medication Titration Timeline", manual: "Flipping through paper files trying to remember when a drug was started", m365: "Interactive timeline plotting drug dose changes alongside seizure frequency" },
            { feature: "Therapeutic Drug Monitoring", manual: "Lab reports filed separately; difficult to correlate with seizure control", m365: "Integrated serum drug levels plotted directly against clinical response" },
            { feature: "Emergency Rescue Plan", manual: "Verbal instructions to family frequently forgotten during emergencies", m365: "Illustrated Emergency Seizure Action Plan stored on patient phone" }
        ],
        faqs: [
            { q: "How does the software handle patient seizure diaries recorded on smartphones?", a: "Patients or family members can use the Medical365 mobile app to log a seizure in under 15 seconds, recording date, start time, duration, and triggers. When the patient attends clinic, the data is already graphed on the neurologist's consultation screen." },
            { q: "Can caregivers upload smartphone videos of seizure episodes for doctor review?", a: "Yes. Caregivers can securely upload smartphone video recordings of seizure events. Videos are stored in an encrypted clinical media vault and linked to the specific episode log for neurologist review." },
            { q: "Does the system check for teratogenic risks in women of childbearing potential?", a: "Yes. When prescribing anti-seizure medications (such as Sodium Valproate or Topiramate) to female patients of childbearing age, the system displays safety alerts advising folic acid supplementation and alternative agent counseling." },
            { q: "How are catamenial epilepsy patterns identified?", a: "The software includes a menstrual cycle correlation overlay, highlighting whether seizure spikes cluster around ovulatory or perimenstrual phases to guide targeted hormonal or intermittent benzodiazepine therapy." },
            { q: "Can the module calculate seizure-free intervals for driving license clearance?", a: "Yes. The system automatically tracks the exact duration of continuous seizure freedom in days and months, providing objective documentation for driving clearance or occupational certifications." },
            { q: "Is the patient's data private and protected under the DPDP Act 2023?", a: "Yes. Epilepsy data is treated as sensitive personal health data with end-to-end encryption, strict role-based access control, and complete audit logging compliant with Indian privacy laws." }
        ]
    }
};

const count = buildPages(batch2Data, repoRoot, diagramDir);
console.log(`=== BATCH 2 FIRST HALF: Processed ${count} pages! ===`);
