const path = require('path');
const { buildPages } = require('./page_builder_engine.js');

const repoRoot = path.resolve(__dirname, '..');
const diagramDir = path.join(repoRoot, 'images/diagrams');

console.log('=== EXECUTING BATCH 2A: NEUROLOGY (6 PAGES) ===');

const neuroData = {
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
    },

    "cognitive-assessment": {
        cluster: "NEUROLOGY",
        title: "Cognitive Assessment Software India | Dementia & MMSE EMR | Medical365",
        h1: "Cognitive Assessment & Dementia Screening Software",
        metaDesc: "Medical365 cognitive assessment software automates MMSE, MoCA & CDR scoring. Longitudinal memory tracking & dementia screening for Indian hospitals.",
        diagramTitle: "Cognitive Screening & Neuropsychological Evaluation Pipeline",
        nodes: ["Patient Cognitive Intake", "Automated MMSE & MoCA Engine", "Domain Scoring Breakdown", "Neurologist Assessment & CDR", "Caregiver Support & EMR Sync"],
        color: "#7c3aed",
        quickAnswer: "Cognitive assessment software is a specialized clinical neuropsychology and dementia evaluation module. It digitizes validated neuropsychological testing batteries, including the Mini-Mental State Examination (MMSE), Montreal Cognitive Assessment (MoCA), and Clinical Dementia Rating (CDR), standardizing memory, executive function, language, and visuospatial scoring across longitudinal geriatric evaluations.",
        bgText: "With India's aging demographic transition, dementia, Alzheimer's disease, and vascular cognitive impairment represent rapidly growing clinical challenges. Over 5.3 million elderly Indians live with dementia, a number projected to exceed 14 million by 2050. In neurology and memory clinics, clinicians evaluate elderly patients presenting with memory complaints, functional decline, and behavioral changes.\n\nIn conventional practice, conducting cognitive evaluations using paper scoring sheets presents significant operational friction. Clinicians must manually calculate scores, navigate complex education-adjusted cut-offs, and store hand-drawn clock-drawing tests in physical paper folders. Over consecutive visits, tracking subtle cognitive decline—distinguishing normal age-associated memory impairment from mild cognitive impairment (MCI) or early Alzheimer's—is cumbersome without computerized score comparisons.\n\nMedical365's Cognitive Assessment module streamlines memory clinic evaluations. With interactive on-screen MoCA and MMSE scoring, digital clock-drawing capture, automated education-level adjustments, and multi-year cognitive trajectory graphing, Medical365 helps clinicians diagnose neurodegenerative decline earlier and objectively evaluate therapeutic responses.",
        capabilities: [
            { title: "Standardized MoCA & MMSE Digital Scoring", text: "Interactive digital scorecards for the Montreal Cognitive Assessment (MoCA 30-point scale) and Mini-Mental State Examination (MMSE) with automated educational adjustments." },
            { title: "Multi-Domain Cognitive Breakdown", text: "Analyzes specific neuropsychological sub-domains: Orientation, Immediate & Delayed Recall, Attention & Calculation, Visuospatial/Executive function, and Language abstraction." },
            { title: "Digital Clock-Drawing & Visuospatial Capture", text: "Enables patients to draw the clock face directly on touchscreen tablets or capture photograph of paper drawing, automatically archiving it for multi-year visual comparison." },
            { title: "Clinical Dementia Rating (CDR) & GDS Staging", text: "Structures staging of dementia severity using the Clinical Dementia Rating (CDR 0 to 3) and Global Deterioration Scale (GDS) across memory, community affairs, and home care." },
            { title: "Neuropsychiatric Inventory (NPI-Q) Assessment", text: "Assesses behavioral and psychological symptoms of dementia (BPSD): agitation, apathy, hallucinations, disinhibition, and sleep disturbances, tracking caregiver distress." },
            { title: "Longitudinal Cognitive Trajectory Graphing", text: "Plots annual score changes against expected neurodegenerative trajectories, helping clinicians evaluate acetylcholinesterase inhibitor (Donepezil) or Memantine efficacy." }
        ],
        workflowSteps: [
            { step: "Patient & Informant Intake", desc: "Nurse or neuropsychologist gathers clinical history from patient and family informant regarding functional memory decline." },
            { step: "Interactive Digital Testing", desc: "Clinician administers MoCA or MMSE on tablet; scores auto-calculate with educational level adjustments (+1 point for <12 yrs education)." },
            { step: "Clock-Drawing & Executive Review", desc: "Patient's clock-drawing test is scored and permanently attached to the digital assessment record." },
            { step: "Neurological Formulation & Staging", desc: "Neurologist reviews domain scores, classifies cognitive impairment (Subjective vs. MCI vs. Mild/Moderate Dementia), and plans MRI/PET." },
            { step: "Care Plan & Family Guidance Dispatch", desc: "Comprehensive cognitive summary, safety recommendations (driving, medication supervision), and recall date dispatch to family." }
        ],
        compliance: "Medical365 Cognitive Assessment adheres to the Alzheimer's and Related Disorders Society of India (ARDSI) practice recommendations and Indian Academy of Neurology (IAN) guidelines.\n\nAll cognitive assessment records, caregiver scores, and neurological reports are encrypted under AES-256 compliant with the DPDP Act 2023. Generated cognitive health summaries link to ABDM health lockers.",
        table: [
            { feature: "Test Scoring", manual: "Manual scoring on paper sheets prone to addition and adjustment errors", m365: "Instant automated digital scoring with education-adjusted thresholds" },
            { feature: "Domain Analysis", manual: "Single total number (e.g. 'MoCA 22/30') without sub-domain insight", m365: "Detailed sub-score breakdown (Recall, Executive, Visuospatial, Language)" },
            { feature: "Clock-Drawing Archival", manual: "Loose paper drawing in folder; easily lost or misplaced over years", m365: "Permanent digital vector/photo archival linked to longitudinal chart" },
            { feature: "Longitudinal Comparison", manual: "Searching through heavy archives to locate tests done 3 years ago", m365: "Interactive trend line graphing 5-year cognitive trajectory in 1 click" },
            { feature: "Caregiver Assessment", manual: "Often omitted due to time constraints during outpatient visits", m365: "Structured NPI-Q caregiver distress screening questionnaire" }
        ],
        faqs: [
            { q: "How does the software adjust scores for patients with limited formal education?", a: "Medical365 includes validated education-adjusted cut-offs. For example, in the MoCA, the system automatically adds +1 point for individuals with ≤12 years of formal education, preventing false-positive dementia diagnoses in rural Indian populations." },
            { q: "Can the software administer the tests in Indian regional languages?", a: "Yes. The module supports validated Indian language adaptations of cognitive tests (including Hindi, Bengali, Tamil, Telugu, Marathi, and Gujarati versions of the MMSE and HMSE)." },
            { q: "How does the digital clock-drawing test work on tablets?", a: "Patients can use a digital stylus or finger on an iPad or Android tablet to draw the clock face and hands setting a specific time (e.g., '10 past 11'). The digital drawing is timestamped, saved as a high-resolution vector image, and scored on a standard 3 to 10-point scale." },
            { q: "Does the system screen for reversible causes of cognitive impairment?", a: "Yes. The cognitive intake form prompts clinicians with a 1-click checklist for reversible dementia workups, including serum Vitamin B12, Thyroid Stimulating Hormone (TSH), VDRL/RPR, and structural brain neuroimaging." },
            { q: "Can family members access home caregiving advice through the portal?", a: "Yes. When a diagnosis of dementia is confirmed, the system can share customized caregiver guides covering home safety, wandering prevention, and communication strategies via the patient portal and WhatsApp." },
            { q: "Is the patient's cognitive testing history protected under data privacy laws?", a: "Yes. Cognitive assessment data is classified as sensitive personal health information and protected by AES-256 encryption, role-based access control, and complete audit logging compliant with the DPDP Act 2023." }
        ]
    },

    "stroke-management": {
        cluster: "NEUROLOGY",
        title: "Acute Stroke Management Software | Code Stroke EMR | Medical365",
        h1: "Acute Stroke Management & Thrombolysis Protocol Software",
        metaDesc: "Medical365 stroke management software automates Code Stroke alerts, NIHSS calculation, tPA dosing & door-to-needle time tracking for Indian hospitals.",
        diagramTitle: "Acute Code Stroke Emergency Care & Thrombolysis Pathway",
        nodes: ["Emergency Code Stroke Triage", "Rapid NIHSS & NCCT Brain", "IV tPA Eligibility & Dosage", "Cath Lab Thrombectomy Referral", "Post-Stroke ICU Care & EMR"],
        color: "#7c3aed",
        quickAnswer: "Stroke management software is an emergency acute clinical workflow system designed for emergency departments and acute stroke units. It tracks door-to-needle time, automates National Institutes of Health Stroke Scale (NIHSS) calculations, checks intravenous thrombolysis (tPA / Tenecteplase) eligibility, supports mechanical thrombectomy referrals, and ensures comprehensive secondary stroke prevention documentation.",
        bgText: "Stroke is the second leading cause of mortality and the single largest cause of long-term adult physical disability in India. With nearly 1.8 million new stroke cases diagnosed annually across the country, rapid, coordinated acute intervention is paramount. In acute ischemic stroke, 'time is brain': every minute of delayed reperfusion leads to the destruction of nearly two million neurons.\n\nIn many Indian emergency rooms, acute stroke care is hindered by communication delays between casualty medical officers, on-call neurologists, radiographers, and ICU nurses. Calculating the 11-item NIHSS score manually on paper is slow, checking against dozens of tPA contraindications is error-prone, and calculating accurate intravenous thrombolysis dosages under emergency stress introduces medication calculation hazards.\n\nMedical365's Acute Stroke Management module powers hospital 'Code Stroke' protocols. Activated with a single emergency tap, the software starts an automated door-to-needle countdown timer, coordinates urgent neuroimaging, automates weight-based thrombolysis dosage calculations, and enforces the clinical documentation required for comprehensive NABH stroke center accreditation.",
        capabilities: [
            { title: "One-Tap 'Code Stroke' Emergency Activation", text: "Instantly alerts the on-duty stroke team (neurologist, radiologist, ER physician, and cath lab team) via priority push notifications and automated SMS with patient ETA." },
            { title: "Interactive Digital NIHSS Scoring Calculator", text: "Rapid 11-item National Institutes of Health Stroke Scale calculator (Level of consciousness, eye gaze, visual fields, facial palsy, motor drift, ataxia, sensory, language, dysarthria, extinction) auto-computing total score (0 to 42)." },
            { title: "Automated Door-to-Needle Benchmark Countdown", text: "Real-time visual clock tracking critical emergency benchmarks: Door-to-Doctor (<10 min), Door-to-CT (<25 min), Door-to-Interpretation (<45 min), and Door-to-Needle (<60 min)." },
            { title: "Thrombolysis Eligibility & Safety Checklist", text: "Interactive contraindication screening (active bleeding, recent surgery, platelet count <100,000, INR >1.7) with automated Tenecteplase and Alteplase weight-based dosing calculators." },
            { title: "Mechanical Thrombectomy & Cath Lab Workflow", text: "Tracks Large Vessel Occlusion (LVO) screening, ASPECTS scores on non-contrast CT, CT Angiography findings, and coordinates rapid transfer to the neuro-interventional cath lab." },
            { title: "Post-Thrombolysis Hemorrhage Surveillance Log", text: "Standardized neuro-vital checks: blood pressure, neurological checks every 15 minutes during infusion, and rapid protocols for symptomatic intracranial hemorrhage (sICH)." }
        ],
        workflowSteps: [
            { step: "ER Arrival & Code Stroke Call", desc: "Patient arrives within 4.5-hour window; triage nurse activates Code Stroke; door-to-needle stopwatch begins." },
            { step: "Immediate NIHSS & Stat Head CT", desc: "Emergency physician calculates NIHSS on mobile tablet; patient wheeled directly to CT scanner to rule out hemorrhage." },
            { step: "Thrombolytic Eligibility Check", desc: "Software verifies time of onset (last known normal), checks exclusion criteria, and computes exact Tenecteplase dose (0.25 mg/kg)." },
            { step: "IV Thrombolysis Administration", desc: "Bolus administered; system logs exact Door-to-Needle time and initiates mandatory 24-hour neuro-ICU observation orders." },
            { step: "LVO Evaluation & Thrombectomy", desc: "If CTA demonstrates carotid or M1 occlusion, software generates 1-click cath lab activation for mechanical thrombectomy." }
        ],
        compliance: "Medical365 Acute Stroke Management adheres to the Indian Stroke Association (ISA) guidelines, World Stroke Organization (WSO) roadmap, and NABH stroke center accreditation standards.\n\nAll emergency timestamps, medication dosage logs, and neurological clinical records are encrypted via AES-256 compliant with the DPDP Act 2023. Final stroke registries link seamlessly with ABDM health records.",
        table: [
            { feature: "Code Stroke Activation", manual: "Calling individual doctor phone numbers; delayed responses", m365: "1-tap simultaneous broadcast alert to neurologist, ER, CT, and ICU" },
            { feature: "NIHSS Scoring Speed", manual: "Flipping through paper booklet and manual addition (5-8 min)", m365: "Interactive digital touch calculator completed in under 90 seconds" },
            { feature: "Door-to-Needle Tracking", manual: "Estimated retrospectively from casualty registers with missing times", m365: "Automated real-time countdown timer tracking hospital benchmark adherence" },
            { feature: "Thrombolysis Dosage", manual: "Manual calculation of mg/kg under emergency stress; risk of overdose", m365: "Automated weight-based dosage calculator with maximum dose capping" },
            { feature: "Registry & Audit", manual: "Weeks of manual chart reviews to compile annual stroke statistics", m365: "Automated stroke registry reporting door-to-needle averages and outcomes" }
        ],
        faqs: [
            { q: "How does the system help hospitals achieve a Door-to-Needle time of under 60 minutes?", a: "By initiating a prominent, visual stopwatch the instant a stroke patient is registered, Medical365 keeps the entire emergency team focused on key time gates: CT completion within 25 minutes, lab review within 45 minutes, and thrombolysis initiation before 60 minutes." },
            { q: "Does the software support both Alteplase (rtPA) and Tenecteplase (TNK)?", a: "Yes. Clinicians can select either standard Alteplase (0.9 mg/kg, 10% bolus, remainder over 60 mins, max 90 mg) or Tenecteplase (0.25 mg/kg single bolus, max 25 mg), with automatic dosage safety capping." },
            { q: "How is the patient's 'Last Known Normal' time documented?", a: "The intake screen features a mandatory field for Last Known Normal (LKN) time and Wake-Up Stroke status, calculating the exact therapeutic window remaining (up to 4.5 hours for IV thrombolysis and up to 24 hours for thrombectomy)." },
            { q: "Can mechanical thrombectomy cases be tracked?", a: "Yes. Dedicated interventional neuroradiology fields capture arterial puncture time, TICI reperfusion score (0 to 3), number of stent-retriever passes, and complication logs." },
            { q: "What post-thrombolysis nursing monitoring protocols are included?", a: "The module auto-populates ICU nursing flows: blood pressure and neurological checks every 15 minutes for 2 hours, every 30 minutes for 6 hours, and hourly for 16 hours, alerting if systolic BP exceeds 180 mmHg." },
            { q: "Does the system maintain an audit-ready national stroke registry?", a: "Yes. Hospital stroke coordinators can export comprehensive, de-identified stroke registry datasets tracking thrombolysis rates, median door-to-needle times, and 90-day modified Rankin Scale (mRS) outcomes." }
        ]
    },

    "neurological-exam-forms": {
        cluster: "NEUROLOGY",
        title: "Neurology Clinical Examination Templates | EMR SOAP Notes | Medical365",
        h1: "Neurological Physical Examination Templates & EMR Notes",
        metaDesc: "Medical365 neurological examination templates standardize cranial nerve mapping, motor power (MRC), sensory dermatomes & deep tendon reflexes in hospital EMR.",
        diagramTitle: "Comprehensive Neurological Physical Examination Workflow",
        nodes: ["Mental Status & Higher Functions", "Cranial Nerves I-XII Assessment", "Motor System & MRC Power", "Sensory Dermatome Mapping", "Reflexes & Cerebellar Gait EMR"],
        color: "#7c3aed",
        quickAnswer: "Neurological physical examination templates are structured clinical documentation tools designed for adult and pediatric neurologists. They systematically document the complete nervous system examination: mental status, cranial nerves (I through XII), motor tone, bulk and muscle power (MRC grade 0-5), sensory dermatomes, deep tendon reflexes (0 to 4+), and cerebellar coordination and gait patterns.",
        bgText: "The physical neurological examination is among the most sophisticated diagnostic rituals in all of clinical medicine. A thorough neurological evaluation allows skilled clinicians to localize lesions to exact anatomical sites within the central or peripheral nervous system—from the cerebral cortex and brainstem to the spinal cord, nerve roots, peripheral nerves, and neuromuscular junctions.\n\nIn busy Indian outpatient departments and inpatient neurology wards, recording this extensive examination by hand is time-consuming and often leads to incomplete documentation. In high-volume settings, clinicians frequently abbreviate findings to generic phrases like 'CNS NAD' (Central Nervous System: No Abnormality Detected) or record muscle power without specifying tested muscle groups. This documentation gap undermines diagnostic localization, complicates handovers between shifts, and leaves hospitals vulnerable during clinical legal audits.\n\nMedical365's Neurological Examination module provides neurologists with intuitive, interactive visual anatomical charts. Equipped with rapid cranial nerve checklists, interactive muscle power selectors, sensory dermatome touch maps, and reflex pictograms, Medical365 allows doctors to document exhaustive neurological examinations in under three minutes.",
        capabilities: [
            { title: "Systematic Cranial Nerve (I to XII) Assessment", text: "Rapid structured evaluation of all twelve cranial nerves: visual acuity/fields, pupillary light reflexes, extraocular movements, facial sensation, facial motor symmetry, hearing, gag reflex, and tongue protrusion." },
            { title: "Interactive MRC Muscle Power Matrix", text: "Grid-based picker for Medical Research Council (MRC) muscle strength grades (0 to 5) across upper extremities (deltoid, biceps, triceps, wrist extension, hand grip) and lower extremities (iliopsoas, quadriceps, hamstrings, ankle dorsiflexion/plantarflexion)." },
            { title: "Visual Sensory Dermatome Mapping", text: "Interactive anatomical body map allowing clinicians to touch and shade sensory loss patterns (hypoesthesia, hyperalgesia, allodynia, loss of proprioception/vibration) across C2 to S5 dermatomes and peripheral nerve distributions." },
            { title: "Standardized Deep Tendon Reflex Pictogram", text: "Interactive stick-figure reflex chart to rapidly log reflex grades (0 absent, 1+ hypoactive, 2+ normal, 3+ brisk, 4+ clonus) for Biceps, Triceps, Brachioradialis, Knee (patellar), and Ankle (Achilles) with Babinski sign status." },
            { title: "Cerebellar & Coordination Testing Module", text: "Structured testing for cerebellar ataxia: finger-to-nose dysmetria, dysdiadochokinesia, heel-to-shin test, Romberg test, and gait patterns (hemiplegic, ataxic, parkinsonian, neuropathic/steppage)." },
            { title: "Glasgow Coma Scale (GCS) & Coma Scoring", text: "Automated Glasgow Coma Scale (Eye, Verbal, Motor: 3 to 15) and Full Outline of UnResponsiveness (FOUR) score calculator for stuporous and comatose neuro-critical care patients." }
        ],
        workflowSteps: [
            { step: "Patient Triage & Mental Status", desc: "Nurse records orientation and GCS; neurologist evaluates attention, language comprehension, and speech fluency." },
            { step: "Cranial Nerve Screening", desc: "1-click visual checklist quickly records normal findings or flags cranial neuropathies (e.g. Right Lower Motor Neuron VII palsy)." },
            { step: "Motor & Reflex Evaluation", desc: "Doctor selects muscle strength grades on the interactive MRC grid and taps tendon reflex pictogram." },
            { step: "Sensory & Coordination Mapping", desc: "Sensory deficit boundaries (pinprick, temperature, vibration) shaded on interactive digital dermatome map." },
            { step: "Clinical Localization & Note Finalization", desc: "Doctor documents anatomical localization (e.g. Left MCA territory, L5 radiculopathy) and signs structured consultation note." }
        ],
        compliance: "Medical365 Neurological Examination Templates comply with the Electronic Health Record (EHR) Standards for India, implementing SNOMED-CT international clinical terminology and LOINC codes.\n\nAll structured physical examination records are stored under AES-256 encryption compliant with the DPDP Act 2023. Generated clinical consultation summaries link seamlessly to ABDM national health lockers.",
        table: [
            { feature: "Documentation Speed", manual: "Writing out long narrative descriptions of multiple nerve roots by hand (10-15 min)", m365: "Interactive visual pickers and body diagrams completed in under 3 minutes" },
            { feature: "Reflex Recording", manual: "Informal shorthand sketches in margins easily misinterpreted", m365: "Standardized stick-figure pictogram with 0-to-4+ scoring and clonus flags" },
            { feature: "Sensory Mapping", manual: "Vague narrative notes like 'numbness in right leg'", m365: "Visual anatomical dermatome body shading specifying exact nerve root (e.g. L5)" },
            { feature: "Motor Power Specificity", manual: "Generic entries like 'power 4/5 in upper limbs'", m365: "Individual muscle group tracking (C5 to T1) distinguishing proximal vs. distal weakness" },
            { feature: "Clinical Audit Readiness", manual: "Illegible handwriting and missing fields during hospital accreditation", m365: "100% legible, structured, audit-ready digital neurological records" }
        ],
        faqs: [
            { q: "Can neurologists customize the physical examination templates?", a: "Yes. While Medical365 includes complete comprehensive neurological examination templates, specialists can create focused quick templates for specific conditions, such as Peripheral Neuropathy, Parkinsonism, or Headache." },
            { q: "How does the interactive sensory dermatome body map work?", a: "Clinicians can touch or click on specific anatomical dermatome zones on a high-resolution 2D body model to mark sensory alterations (e.g., sensory level at T10 in acute transverse myelitis)." },
            { q: "Does the system support pediatric neurological examinations?", a: "Yes. Specialized infant and pediatric templates include primitive neonatal reflexes (Moro, palmar grasp, rooting), fontanelle assessment, tone evaluation (traction test, scarf sign), and head circumference percentiles." },
            { q: "Can doctors dictate findings using medical speech recognition?", a: "Yes. Medical365 includes medical voice dictation trained on neurological terminology, allowing clinicians to speak findings like 'brisk bilateral patellar hyperreflexia with unsustained clonus' directly into the chart." },
            { q: "Is the Glasgow Coma Scale (GCS) tracked over time in the ICU?", a: "Yes. For hospitalized neuro-trauma and stroke patients, serial GCS scores are plotted on a continuous trend line, alerting staff if the score drops by 2 or more points." },
            { q: "Are physical exam records visible to referring orthopedic and spine surgeons?", a: "Yes. Because Medical365 operates on a unified hospital database, the orthopedic or neurosurgical team can review the complete neurological physical exam before spinal decompression surgery." }
        ]
    }
};

const done = buildPages(neuroData, repoRoot, diagramDir);
console.log(`=== BATCH 2A SUCCESS: Generated ${done} Neurology pages! ===`);


module.exports = neuroData;
