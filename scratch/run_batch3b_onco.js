const path = require('path');
const { buildPages } = require('./page_builder_engine.js');

const repoRoot = path.resolve(__dirname, '..');
const diagramDir = path.join(repoRoot, 'images/diagrams');

console.log('=== EXECUTING BATCH 3B: ONCOLOGY (6 PAGES) ===');

const oncoData = {
    "cancer-staging": {
        cluster: "ONCOLOGY",
        title: "Cancer Staging Software | AJCC 8th Edition TNM EMR | Medical365",
        h1: "Cancer Staging & AJCC 8th Edition TNM Classification Software",
        metaDesc: "Medical365 cancer staging software automates AJCC 8th Edition TNM staging, prognostic groupings & biomarker tracking for comprehensive cancer centers in India.",
        diagramTitle: "Oncology AJCC TNM Cancer Staging & Prognostic Workflow",
        nodes: ["Multidisciplinary Tumor Board Intake", "Histopathology & Biomarker Engine", "AJCC 8th Edition TNM Calculator", "Clinical / Pathological Stage Grouping", "Oncologist Treatment Protocol & EMR"],
        color: "#b91c1c",
        quickAnswer: "Cancer staging software is a specialized clinical oncology decision support module that standardizes anatomical and prognostic cancer staging. It automates the American Joint Committee on Cancer (AJCC 8th Edition) and UICC TNM classification across solid organ and hematological malignancies, integrates essential molecular biomarkers (ER/PR/HER2, Ki-67, EGFR, ALK, PD-L1), and generates standardized stage groupings for tumor boards.",
        bgText: "Cancer is one of the most devastating non-communicable diseases in India, with over 1.4 million new cases diagnosed annually. In Indian comprehensive cancer centers, tertiary government oncology institutes, and private cancer hospitals, oncologists manage complex patient cohorts presenting with head and neck carcinomas, breast cancer, cervical cancer, gastrointestinal malignancies, and lung cancer.\n\nAccurate cancer staging is the critical foundation of modern evidence-based oncology. Determining whether a tumor is operable, curable with definitive chemoradiation, or palliative requires precise classification under the latest AJCC 8th Edition guidelines. However, navigating the hundreds of pages of complex, site-specific staging rules manually during busy tumor boards is challenging. Key prognostic variables—such as depth of invasion in oral cancer, extranodal extension (ENE), or hormone receptor status in breast cancer—are frequently omitted on handwritten paper files.\n\nMedical365's Cancer Staging module automates AJCC 8th Edition staging directly within the oncologist's electronic consultation screen. Equipped with interactive, organ-specific TNM selectors, molecular biomarker grids, and automatic clinical (cTNM) versus pathological (pTNM) stage grouping calculators, Medical365 standardizes oncology documentation and drives precision cancer therapy.",
        capabilities: [
            { title: "Complete AJCC 8th Edition & UICC System Integration", text: "Pre-configured with official AJCC 8th Edition staging manuals across all anatomical sites (Head & Neck, Breast, Thoracic, GI, Gynecological, Genitourinary, Hematological, Musculoskeletal)." },
            { title: "Automated Clinical (cTNM) & Pathological (pTNM) Calculation", text: "Computes overall Stage Group (Stage 0, I, II, III, IV) automatically based on individual Tumor (T), Regional Node (N), and Distant Metastasis (M) selections, preventing manual calculation errors." },
            { title: "Integrated Molecular Biomarker & Genomic Profiling Grid", text: "Structures molecular and histological biomarkers: Breast (ER, PR, HER2, Ki-67, Oncotype DX), Lung (EGFR, ALK, ROS1, PD-L1), Colorectal (MSI-H/dMMR, KRAS, BRAF), and Cervix (HPV status)." },
            { title: "Multidisciplinary Tumor Board (MDT) Staging Integration", text: "Enables tumor board teams to project, review, and finalize staging consensus collaboratively, recording multidisciplinary decisions in the permanent chart." },
            { title: "Depth of Invasion (DOI) & Extranodal Extension (ENE) Logic", text: "Incorporates modern 8th edition rules, including Depth of Invasion (in mm) for oral cavity squamous cell carcinomas and clinical/pathological Extranodal Extension for nodal staging." },
            { title: "Automated National Cancer Registry (NCRP) Data Export", text: "Formats staged cancer case records for 1-click export to the National Cancer Registry Programme (NCRP) of the Indian Council of Medical Research (ICMR)." }
        ],
        workflowSteps: [
            { step: "Patient Pathology & Imaging Review", desc: "Surgical biopsy, histopathology report, and PET-CT/MRI scans are loaded into the oncology consultation dashboard." },
            { step: "Interactive Organ-Specific TNM Selection", desc: "Oncologist clicks organ site (e.g. Breast); system displays exact T, N, M criteria with biomarker pickers." },
            { step: "Automated Stage Group Determination", desc: "Engine calculates exact Prognostic Stage Group (e.g. cT2 N1 M0, ER+, PR+, HER2- = Stage IIA)." },
            { step: "MDT Tumor Board Consensus", desc: "Multidisciplinary team reviews staging, confirms resectability, and selects guideline therapy protocol." },
            { step: "EMR Attachment & ABHA Health Locker Link", desc: "Final staging summary permanently binds to patient oncology profile and synchronizes to national health records." }
        ],
        compliance: "Medical365 Cancer Staging strictly complies with American Joint Committee on Cancer (AJCC 8th Edition) standards, Union for International Cancer Control (UICC) rules, and ICMR National Cancer Grid (NCG) clinical guidelines.\n\nAll oncological records, histological reports, and genomic data are protected under AES-256 encryption compliant with the DPDP Act 2023. Staged records link seamlessly with ABDM digital health summaries.",
        table: [
            { feature: "Staging Method", manual: "Looking up thick printed AJCC manuals or online web tools; high error rate", m365: "Interactive organ-specific digital calculator auto-computing exact Stage Group" },
            { feature: "Molecular Biomarkers", manual: "Flipping through separate IHC paper slips; often missing from staging notes", m365: "Integrated biomarker fields directly influencing prognostic stage calculation" },
            { feature: "Tumor Board Recording", manual: "Paper register books or informal email minutes; difficult to retrieve", m365: "Centralized digital Tumor Board module documenting consensus staging and plans" },
            { feature: "National Registry Export", manual: "Manual data re-entry into ICMR registries taking months of clerk time", m365: "1-click automated electronic data export to National Cancer Registry (NCRP)" },
            { feature: "Guideline Therapy Link", manual: "Doctor must manually cross-reference NCCN guidelines with staging", m365: "Automated recommendation of guideline chemotherapy regimens based on stage" }
        ],
        faqs: [
            { q: "How does the software handle recent AJCC 8th Edition changes?", a: "Medical365 includes all 8th Edition updates, such as Depth of Invasion (DOI) for oral cancers, Extranodal Extension (ENE) for head/neck nodes, HPV-associated p16-positive oropharyngeal staging, and prognostic biomarker-based staging for breast cancer." },
            { q: "Can the software calculate both Clinical and Pathological stages?", a: "Yes. Clinicians can maintain separate and linked records for Clinical Staging (cTNM based on physical exam and pre-op scans) and Pathological Staging (pTNM based on post-surgical resected specimens)." },
            { q: "Does the module support hematological malignancies (Leukemia, Lymphoma)?", a: "Yes. Beyond TNM solid organ staging, the module supports Ann Arbor / Lugano staging for Hodgkin and Non-Hodgkin Lymphomas, Rai and Binet staging for CLL, and ISS / R-ISS staging for Multiple Myeloma." },
            { q: "Can multidisciplinary tumor boards record their clinical consensus?", a: "Yes. The Tumor Board module allows medical, surgical, and radiation oncologists to review cases collaboratively, log votes, and document official institutional recommendations in the patient chart." },
            { q: "Is the software compliant with the National Cancer Grid (NCG) India guidelines?", a: "Yes. Medical365's staging algorithms and diagnostic pathways are fully aligned with the evidence-based consensus guidelines of the National Cancer Grid (NCG) of India." },
            { q: "Can patients view their cancer stage and treatment plan on their mobile phones?", a: "Yes. Patients and family members can access their verified cancer stage summary, biomarker status, and treatment roadmap through the secure Medical365 patient portal." }
        ]
    },

    "chemotherapy-plans": {
        cluster: "ONCOLOGY",
        title: "Chemotherapy Protocol Software | Medical Oncology EMR | Medical365",
        h1: "Chemotherapy Regimen Planning & Daycare Infusion Software",
        metaDesc: "Medical365 chemotherapy planning software manages BSA-based dosing, cycle scheduling, premedication orders & cumulative anthracycline tracking for Indian cancer centers.",
        diagramTitle: "Chemotherapy Regimen Prescription & Daycare Infusion Architecture",
        nodes: ["Oncology Staging & Protocol Selection", "Automated BSA (m²) & AUC Calculator", "Pre-Medication & Antiemetic Order Set", "Daycare Nursing Infusion Barcode Flowsheet", "Toxicity Screening & EMR Sync"],
        color: "#b91c1c",
        quickAnswer: "Chemotherapy plans software is an advanced medical oncology chemotherapy ordering and daycare infusion management module. It automates Body Surface Area (BSA) and Calvert AUC dosage calculations, manages multi-cycle regimens (AC-T, FOLFOX, R-CHOP, Paclitaxel/Carboplatin), enforces toxic cumulative dose ceilings (Doxorubicin, Bleomycin), and verifies daycare nursing safety administration.",
        bgText: "Chemotherapy and immunotherapy administration represents one of the highest-risk clinical environments in hospital medicine. Cytotoxic antineoplastic agents carry narrow therapeutic indices, where a minor calculation error can lead to fatal systemic toxicity, bone marrow aplasia, or ineffective subtherapeutic treatment.\n\nIn conventional Indian oncology daycare centers, chemotherapy orders are frequently written by hand on paper prescription charts. Oncologists must manually calculate Body Surface Area (BSA) from height and weight, look up multi-drug regimens, compute milligram dosages, specify infusion bag diluents (Normal Saline vs. 5% Dextrose), and write complex pre-medication antiemetic orders. In crowded daycare wards, nurses struggle to decipher handwritten infusion sequences, track extravasation risks, or verify cumulative lifetime anthracycline doses.\n\nMedical365's Chemotherapy Planning module brings computerized physician order entry (CPOE) and closed-loop infusion safety to medical oncology. Pre-loaded with hundreds of validated NCCN and NCG regimens, the software automatically computes doses based on verified weight, manages multi-day cycle calendars, enforces dual-nurse barcode administration verification, and tracks laboratory toxicity parameters before authorizing cycle release.",
        capabilities: [
            { title: "Comprehensive Validated Regimen Library", text: "Pre-configured with standard NCCN and National Cancer Grid (NCG) regimens across all tumor sites: AC-T, TCH, FOLFOX, FOLFIRINOX, R-CHOP, ABVD, BEP, and immunotherapy combinations." },
            { title: "Automated BSA (m²) & Calvert Carboplatin AUC Calculator", text: "Computes exact Body Surface Area using Mosteller formulas (with BSA capping at 2.0-2.2 m²) and calculates Carboplatin doses using the Calvert formula: Total Dose (mg) = Target AUC × (GFR + 25)." },
            { title: "Cumulative Lifetime Dose Toxicity Ceiling Guards", text: "Tracks cumulative lifetime exposure to high-toxicity antineoplastics, automatically blocking orders exceeding established cardiotoxic or pulmonary ceilings (Doxorubicin 450-550 mg/m², Bleomycin 400 units)." },
            { title: "Structured Pre-Medication & Hydration Protocols", text: "Auto-populates pre-chemotherapy hydration regimens, antiemetics (Ondansetron, Aprepitant, Dexamethasone), and hypersensitivity prophylaxis (Diphenhydramine, Ranitidine) for taxanes and platinum agents." },
            { title: "Automated Pre-Cycle Laboratory Toxicity Clearance", text: "Mandatory pre-chemo safety gate checking absolute neutrophil count (ANC ≥1,500/µL), platelets (≥100,000/µL), serum creatinine, and bilirubin before releasing medication orders." },
            { title: "Daycare Nursing Infusion Flowsheet & Dual Verification", text: "Barcode scanning of patient wristband and chemo infusion bag, requiring independent dual-nurse sign-off before cytotoxic infusion begins." }
        ],
        workflowSteps: [
            { step: "Regimen Selection & Cycle Scheduling", desc: "Medical oncologist selects protocol (e.g. FOLFOX6, Cycle 3 of 12) from validated clinical library." },
            { step: "Automated Dose Calculation & Lab Check", desc: "System checks current weight and ANC/platelet counts; doses calculate automatically based on BSA." },
            { step: "Pharmacy Sterile Cytotoxic Compounding", desc: "Chemo pharmacy receives clean electronic order with diluent, infusion duration, and protective light-shielding instructions." },
            { step: "Dual-Nurse Barcode Infusion Verification", desc: "Daycare nurse scans patient band and IV bag barcode; dual-sign-off confirms drug, dose, and rate." },
            { step: "Toxicity Logging & Cycle Completion", desc: "Infusion vitals, adverse events, and next cycle appointment date log into EMR and dispatch to patient." }
        ],
        compliance: "Medical365 Chemotherapy Planning complies with American Society of Clinical Oncology (ASCO) / Oncology Nursing Society (ONS) Chemotherapy Administration Safety Standards and National Cancer Grid (NCG) India guidelines.\n\nAll cytotoxic orders, dose recalculations, and dual-nurse verification logs are encrypted under AES-256 compliant with the DPDP Act 2023. Chemotherapy cycles link to ABDM digital health summaries.",
        table: [
            { feature: "Dose Calculation Method", manual: "Manual calculation with phone calculator; high risk of decimal placement errors", m365: "Automated computerized calculation based on verified weight, height, and GFR" },
            { feature: "Cumulative Toxicity Guard", manual: "Flipping through past physical charts to calculate lifetime Doxorubicin dose", m365: "Automated lifetime cumulative tracker with prominent hard-stop toxicity alerts" },
            { feature: "Lab Safety Verification", manual: "Doctor must remember to look up CBC; chemo sometimes started with low ANC", m365: "Mandatory automated lab clearance gate verifying ANC ≥1500 and Platelets ≥100k" },
            { feature: "Pre-Medication Regimens", manual: "Handwritten orders often omitting vital hydration or antiemetic drugs", m365: "Pre-configured comprehensive pre-medication and antiemetic order bundles" },
            { feature: "Nursing Administration", manual: "Paper flowsheets without independent verification; high medication error risk", m365: "Closed-loop barcode scanning requiring mandatory dual-nurse digital sign-off" }
        ],
        faqs: [
            { q: "How does the software calculate Carboplatin dosing?", a: "Medical365 uses the validated Calvert formula: Dose (mg) = Target AUC × (GFR + 25). The software pulls serum creatinine to compute GFR using the Cockcroft-Gault equation (capped at 125 ml/min), ensuring safe dosing." },
            { q: "Can oncologists reduce chemotherapy doses based on patient toxicity?", a: "Yes. Clinicians can apply percentage dose reductions (e.g. 20% or 25% dose reduction for Grade 3-4 febrile neutropenia or neuropathy) across all or selected drugs in the regimen with mandatory clinical rationale logging." },
            { q: "Does the system track cumulative lifetime doses of Doxorubicin?", a: "Yes. The software maintains a running cumulative total of Doxorubicin (Adriamycin), Epirubicin, Daunorubicin, and Bleomycin across all treatment cycles, triggering hard alerts when approaching cardiotoxic limits." },
            { q: "How does the software handle oral targeted therapy and immunotherapy?", a: "The module supports oral targeted agents (TKIs, CDK4/6 inhibitors, PARP inhibitors) and immunotherapy infusions (Pembrolizumab, Nivolumab) with specialized monitoring for immune-related adverse events (irAEs)." },
            { q: "Can daycare nurses use tablets to record chemo infusions chairside?", a: "Yes. Daycare nurses use touch tablets to execute dual-verification sign-offs, log infusion start/stop times, record vital signs, and monitor extravasation checks right at the patient's infusion chair." },
            { q: "Are chemotherapy treatment calendars shared with patients?", a: "Yes. Patients receive a clear, visual chemotherapy treatment calendar on their mobile app showing cycle dates, mandatory pre-chemo blood test dates, and expected rest periods." }
        ]
    },

    "radiation-therapy-records": {
        cluster: "ONCOLOGY",
        title: "Radiation Oncology Software | Radiotherapy EMR India | Medical365",
        h1: "Radiation Oncology & Radiotherapy Treatment Management Software",
        metaDesc: "Medical365 radiation therapy software manages external beam radiotherapy (EBRT), IMRT, VMAT, fractionation doses, brachytherapy & LINAC sync for cancer centers.",
        diagramTitle: "Radiation Oncology Simulation & Treatment Delivery Architecture",
        nodes: ["Radiation Oncology Consultation", "CT Simulation & Contouring (TPS)", "LINAC Treatment Delivery & OBI", "Daily Fraction Verification Log", "Weekly On-Treatment Review EMR"],
        color: "#b91c1c",
        quickAnswer: "Radiation therapy records software is a specialized clinical radiation oncology management and treatment delivery module. It interfaces Treatment Planning Systems (TPS) and linear accelerators (LINAC), manages External Beam Radiotherapy (EBRT, IMRT, VMAT, SBRT) and brachytherapy prescriptions, tracks daily fraction delivery and cumulative Gray (Gy) radiation doses, and structures weekly on-treatment toxicity reviews.",
        bgText: "Radiation oncology is an essential curative and palliative modality in comprehensive cancer care, utilized in over 60% of all cancer patients. Whether treating localized head and neck squamous cell carcinoma, breast cancer following lumpectomy, or brain metastases with stereotactic radiosurgery (SRS), radiotherapy requires micro-millimeter spatial precision and absolute dosimetric accuracy.\n\nIn Indian radiation oncology centers, managing radiotherapy involves coordinating complex multi-step workflows: clinical simulation on CT scanners, contouring target volumes (GTV, CTV, PTV) and organs-at-risk (OAR) on Treatment Planning Systems (TPS), calculating beam arrangements, and delivering daily fractions on linear accelerators (LINACs) over 5 to 7 weeks.\n\nMedical365's Radiation Therapy Records module bridges treatment planning systems with clinical oncology practice. Connecting seamlessly with DICOM-RT protocols, the software records prescribed target doses, tracks daily delivered fractions, monitors organs-at-risk dose constraints, and structures weekly on-treatment clinical toxicity reviews, ensuring total patient safety throughout the radiotherapy course.",
        capabilities: [
            { title: "Comprehensive Radiotherapy Prescription Engine", text: "Documents target volumes (PTV, CTV, GTV), total prescribed dose (Gy), fraction size (e.g. 2 Gy/fraction), fractionation schedule, machine energy (6 MV, 15 MV photons / electrons), and treatment technique." },
            { title: "Advanced Technique Support (IMRT, VMAT, IGRT, SBRT)", text: "Pre-configured clinical templates for 3D-CRT, Intensity-Modulated Radiation Therapy (IMRT), Volumetric Modulated Arc Therapy (VMAT), Stereotactic Body Radiotherapy (SBRT), and SRS." },
            { title: "DICOM-RT Export & Treatment Planning System Integration", text: "Integrates with major Treatment Planning Systems (Varian Eclipse, Elekta Monaco, Philips Pinnacle, Accuray), importing RT Plan, RT Structure Set, and RT Dose metrics." },
            { title: "Daily Fraction Delivery & Verification Log", text: "Records daily delivered radiation fractions: date, time, linear accelerator unit, machine MU (monitor units), technician sign-off, and image-guided radiotherapy (IGRT) couch shifts." },
            { title: "Weekly On-Treatment Clinical Review Flowsheet", text: "Structured toxicity evaluation based on CTCAE v5.0 criteria: radiation dermatitis (Grade 1-4), oral mucositis, dysphagia, xerostomia, fatigue, and weekly weight monitoring." },
            { title: "High-Dose-Rate (HDR) Brachytherapy Management", text: "Specialized documentation for gynecological and interstitial brachytherapy: applicator type (Fletcher-Suit, ring and tandem), channel dwell times, source activity (Ir-192), and Point A / Point B doses." }
        ],
        workflowSteps: [
            { step: "Clinical Simulation & Immobilization", desc: "Radiation oncologist defines patient position, thermoplastic mask/mold, and orders 3D CT simulation." },
            { step: "Contouring & Dosimetric Planning", desc: "Doctor contours PTV and OARs on TPS; medical physicist calculates beam angles and verifies dose-volume histograms (DVH)." },
            { step: "Prescription Approval & Quality Assurance", desc: "Radiation oncologist confirms plan conformity, approves total Gy and fraction size, and signs off pre-treatment QA." },
            { step: "Daily LINAC Delivery & IGRT Shift", desc: "Radiographer matches on-board cone-beam CT (CBCT), verifies couch shifts, and delivers scheduled fraction." },
            { step: "Weekly On-Treatment Review", desc: "Doctor conducts weekly clinical checkup, monitors radiation dermatitis and oral mucositis, and prescribes supportive care." }
        ],
        compliance: "Medical365 Radiation Therapy Records comply with Atomic Energy Regulatory Board (AERB) radiation safety codes, American Society for Radiation Oncology (ASTRO) guidelines, and Association of Radiation Oncologists of India (AROI) standards.\n\nAll dosimetric records, DICOM-RT objects, and clinical consultation notes are protected under AES-256 encryption compliant with the DPDP Act 2023. Treatment summaries link to ABDM health records.",
        table: [
            { feature: "Fraction Tracking", manual: "Handwritten paper treatment sheets; risk of misplaced fraction counts", m365: "Automated digital fraction log counting delivered vs. remaining fractions" },
            { feature: "TPS Integration", manual: "Physician must manually re-type dose numbers from planning computer", m365: "Direct DICOM-RT import capturing exact Gy, fraction size, and PTV coverage" },
            { feature: "Weekly Toxicity Review", manual: "Informal notes in margins; inconsistent CTCAE grading", m365: "Standardized CTCAE v5.0 flowsheet tracking dermatitis, mucositis, and weight" },
            { feature: "Radiation Safety Audit", manual: "Sifting through paper logs during AERB regulatory inspections", m365: "1-click AERB-compliant audit log showing patient doses and beam parameters" },
            { feature: "Treatment Interruption Tracking", manual: "Machine breakdown days recorded informally; gap compensation missed", m365: "Automated tracking of missed fractions with gap correction dose calculations" }
        ],
        faqs: [
            { q: "How does the software handle missed radiation fractions and gap correction?", a: "If a patient misses treatments due to machine maintenance, severe toxicity, or personal reasons, Medical365 logs the interruption duration and computes biologically effective dose (BED) gap corrections based on linear-quadratic radiobiology models." },
            { q: "Which linear accelerator (LINAC) brands are supported?", a: "The module interfaces with all major radiotherapy delivery systems, including Varian Medical Systems (TrueBeam, Halcyon, Clinac), Elekta (Versa HD, Infinity, Synergy), and Accuray (CyberKnife, TomoTherapy)." },
            { q: "How are Organs-at-Risk (OAR) dose constraints tracked?", a: "The software imports Dose-Volume Histogram (DVH) parameters from the treatment planning system, displaying maximum and mean doses for critical organs (spinal cord, optic chiasm, parotid glands, heart, lungs) alongside clinical tolerance limits." },
            { q: "Does the module support stereotactic radiosurgery (SRS/SBRT) records?", a: "Yes. Dedicated templates support high-dose hypo-fractionated stereotactic treatments (e.g. lung SBRT 54 Gy in 3 fractions or brain SRS 18 Gy in 1 fraction) with rigorous sub-millimeter localization tracking." },
            { q: "Can brachytherapy applicator details and radioactive sources be documented?", a: "Yes. The brachytherapy module logs radionuclide source details (Iridium-192, Cobalt-60), source calibration activity, insertion geometry, and applicator sterilization records." },
            { q: "Are radiation oncology records accessible during future surgical or medical reviews?", a: "Yes. Because Medical365 operates on a unified hospital database, medical and surgical oncologists can view the patient's previous radiation fields and cumulative doses before planning surgery or re-irradiation." }
        ]
    },

    "tumor-tracking": {
        cluster: "ONCOLOGY",
        title: "Tumor Response Tracking Software | RECIST 1.1 Oncology EMR | Medical365",
        h1: "Tumor Response Tracking & RECIST 1.1 Measurement Software",
        metaDesc: "Medical365 tumor tracking software automates RECIST 1.1 lesion measurement, target/non-target tracking & PET Lugano response evaluation in oncology EMR.",
        diagramTitle: "Tumor Lesion Response Tracking & RECIST 1.1 Architecture",
        nodes: ["Baseline Radiological CT / MRI", "Target & Non-Target Lesion Selection", "Sum of Diameters (SLD) Engine", "RECIST 1.1 Response Evaluation (CR/PR/SD/PD)", "Oncology Treatment Decision & EMR"],
        color: "#b91c1c",
        quickAnswer: "Tumor tracking software is a specialized clinical oncology response assessment module. It tracks anatomical target and non-target tumor lesions across longitudinal CT, MRI, and PET scans, automates RECIST 1.1 (Response Evaluation Criteria in Solid Tumors) calculations, determines sum of longest diameters (SLD), and categorizes clinical therapeutic response into Complete Response (CR), Partial Response (PR), Stable Disease (SD), or Progressive Disease (PD).",
        bgText: "In clinical oncology, objectively evaluating whether a tumor is shrinking, stable, or progressing under chemotherapy, immunotherapy, or targeted therapy is the definitive criterion for clinical decision-making. Continuing an ineffective cytotoxic regimen wastes valuable time and subjects patients to unnecessary toxicity; conversely, terminating an effective drug prematurely compromises survival.\n\nIn conventional practice, tumor response assessment is often subjective and inconsistent. Radiologists and oncologists review CT scans and write narrative impressions such as 'tumor appears slightly smaller' or 'subtle interval progression'. Without systematic measurement of defined baseline target lesions, calculating the exact percentage change in the Sum of Longest Diameters (SLD) according to international RECIST 1.1 standards is virtually impossible during rapid clinical rounds.\n\nMedical365's Tumor Tracking module embeds standardized RECIST 1.1 and iRECIST (immunotherapy response) criteria directly into the oncology chart. Clinicians select baseline target lesions (up to 5 total, maximum 2 per organ), record longest diameters, track non-target lesions, and visualize tumor trajectory graphs that instantly prove whether criteria for partial response (≥30% decrease) or disease progression (≥20% increase) have been met.",
        capabilities: [
            { title: "Standardized RECIST 1.1 Target & Non-Target Tracking", text: "Structures baseline selection of up to 5 measurable target lesions (longest diameter for non-nodal lesions ≥10 mm, short axis for lymph nodes ≥15 mm) and qualitative non-target lesions." },
            { title: "Automated Sum of Longest Diameters (SLD) Engine", text: "Automatically sums target lesion diameters across consecutive imaging scans and computes exact percentage changes from baseline and nadir (smallest previous sum)." },
            { title: "Automated Response Category Categorization", text: "Applies RECIST 1.1 mathematical rules to categorize response: Complete Response (CR), Partial Response (PR ≥30% decrease), Progressive Disease (PD ≥20% increase + 5mm absolute increase), or Stable Disease (SD)." },
            { title: "iRECIST Immunotherapy Response Evaluation", text: "Incorporates immune-related response criteria to distinguish pseudoprogression from true progression: unconfirmed progressive disease (iUPD) requiring repeat imaging confirmation versus confirmed progression (iCPD)." },
            { title: "PET-CT Lugano & Deauville Lymphoma Response Criteria", text: "Specialized lymphoma tracking utilizing the 5-point Deauville score (1-5) on FDG-PET scans to grade metabolic response following frontline chemotherapy." },
            { title: "Interactive Tumor Burden Watermark & Spider Plots", text: "Generates intuitive visual spider plots and waterfall graphs displaying tumor size trajectory over months of systemic therapy that doctors can share with patients." }
        ],
        workflowSteps: [
            { step: "Baseline Imaging & Lesion Identification", desc: "Oncologist and radiologist define baseline target lesions (e.g. Target 1: RLL Lung 32mm, Target 2: Liver Segment IV 24mm; Baseline SLD = 56mm)." },
            { step: "Interim Scan Re-Evaluation", desc: "At 3-month scan, same lesions are re-measured (Target 1: 18mm, Target 2: 12mm; New SLD = 30mm)." },
            { step: "Automated Percentage Change Calculation", desc: "Software calculates: (30 - 56) / 56 = -46.4% reduction from baseline." },
            { step: "Categorical Response Assignment", desc: "System auto-categorizes response as Partial Response (PR) and checks for any new suspicious lesions." },
            { step: "Clinical Decision & Continuation", desc: "Oncologist confirms therapeutic efficacy, continues current regimen, and updates patient's longitudinal EMR profile." }
        ],
        compliance: "Medical365 Tumor Tracking conforms to international RECIST 1.1 guidelines, iRECIST criteria for immunotherapy clinical trials, and ICMR oncology standards.\n\nAll anatomical measurement logs, radiologic calibrations, and response categories are encrypted under AES-256 compliant with the DPDP Act 2023. Tumor response registries link seamlessly with ABDM digital health lockers.",
        table: [
            { feature: "Response Evaluation", manual: "Subjective narrative notes like 'tumor seems smaller'", m365: "Standardized RECIST 1.1 calculating exact percentage change in SLD" },
            { feature: "Target Lesion Consistency", manual: "Different lesions measured on different visits; comparing apples to oranges", m365: "Permanent anatomical tagging tracking the identical baseline lesions over time" },
            { feature: "Nadir Calculation", manual: "Physicians forget smallest historical size; easily missing subtle progression", m365: "Automated nadir tracking calculating ≥20% increase from lowest point" },
            { feature: "Immunotherapy Pseudoprogression", manual: "Immunotherapy stopped prematurely due to initial tumor flare/swelling", m365: "iRECIST criteria distinguishing unconfirmed (iUPD) vs confirmed (iCPD) progression" },
            { feature: "Patient Visualization", manual: "Abstract millimeter numbers confusing to anxious patients and families", m365: "Intuitive waterfall graphs and spider plots illustrating tumor shrinkage" }
        ],
        faqs: [
            { q: "What is the difference between Target and Non-Target lesions in RECIST 1.1?", a: "Target lesions are measurable lesions (longest diameter ≥10 mm on CT, or lymph nodes with short axis ≥15 mm) up to a maximum of 5 lesions total. Non-target lesions are all other disease sites (e.g. bone metastases, pleural effusion, small nodules), which are tracked qualitatively." },
            { q: "How does the system distinguish true progression from pseudoprogression in immunotherapy?", a: "Using iRECIST guidelines, an initial increase in tumor size is classified as immune Unconfirmed Progressive Disease (iUPD). Treatment continues, and a repeat scan at 4 to 8 weeks confirms whether the tumor is growing (iCPD) or demonstrating delayed shrinkage (iPR/iSD)." },
            { q: "Can radiologists enter RECIST measurements directly from the PACS viewer?", a: "Yes. Radiologists can use digital calipers on the integrated Medical365 DICOM viewer to measure lesion diameters; measurements auto-populate the oncology RECIST tracking flowsheet." },
            { q: "How does the software handle the emergence of a new lesion?", a: "The appearance of any unequivocal new malignant lesion on follow-up imaging automatically triggers an overall assessment of Progressive Disease (PD), regardless of the measurements of existing target lesions." },
            { q: "Does the module support lymphoma response tracking (Lugano criteria)?", a: "Yes. The module supports the Lugano classification for lymphomas, incorporating 5-point Deauville scores on FDG-PET/CT to define complete metabolic response (CMR) and partial metabolic response (PMR)." },
            { q: "Are tumor response curves exportable for clinical trial documentation?", a: "Yes. Comprehensive RECIST 1.1 audit sheets—including baseline measurements, interim scans, percentage changes, and attached DICOM key frames—can be exported to PDF or Excel for clinical trials and academic audits." }
        ]
    },

    "oncology-reports": {
        cluster: "ONCOLOGY",
        title: "Oncology Reporting Software | Cancer Consultation EMR | Medical365",
        h1: "Comprehensive Oncology Clinical Reporting & MDT Software",
        metaDesc: "Medical365 oncology reporting software manages multidisciplinary tumor board summaries, structured cancer progress notes & palliative plans for Indian cancer hospitals.",
        diagramTitle: "Oncology Comprehensive Clinical Reporting & MDT Architecture",
        nodes: ["Patient Oncology Intake", "Multidisciplinary Specialty Review", "Tumor Board Consensus Summary", "Structured Operative & Chemo Note", "Patient Cancer Care Plan & EMR"],
        color: "#b91c1c",
        quickAnswer: "Oncology reporting software is a comprehensive clinical documentation and care coordination module designed for cancer centers and multidisciplinary oncology teams. It standardizes outpatient oncology consultation notes, compiles Multidisciplinary Tumor Board (MDT) summaries, structures palliative and pain management scorecards (ESAS), and auto-generates comprehensive oncology discharge reports.",
        bgText: "Cancer management is uniquely multidisciplinary. A single oncology patient frequently interacts with surgical oncologists, medical oncologists, radiation oncologists, pathologists, radiologists, and palliative care specialists throughout their therapeutic journey. Ensuring seamless, high-integrity documentation across these diverse medical sub-specialties is vital for patient survival.\n\nIn conventional hospital environments, oncology documentation is heavily fragmented. Surgical notes, pathology biopsies, radiation logs, and chemotherapy flowsheets reside in separate physical binders or disconnected departmental software. During acute emergencies—such as febrile neutropenia or spinal cord compression—casualty doctors struggle to decipher previous chemotherapy regimens, radiation field boundaries, or advance care directives from thick, disorganized paper charts.\n\nMedical365's Oncology Reporting module establishes a unified, structured cancer documentation ecosystem. Integrating all clinical touchpoints—from initial biopsy and tumor board consensus to systemic therapy, radiation, surgery, and survivorship—into a single longitudinal timeline, Medical365 delivers unmatched clinical transparency and audit-ready oncology governance.",
        capabilities: [
            { title: "Multidisciplinary Tumor Board (MDT) Consensus Reporting", text: "Structures tumor board case presentations: clinicopathological history, radiological findings, histological biomarkers, panel discussion notes, and signed institutional treatment recommendations." },
            { title: "Standardized Oncology SOAP Consultation Notes", text: "Specialized outpatient oncology evaluation forms capturing ECOG Performance Status (0 to 4), Palliative Performance Scale (PPS), pain scores, appetite, and treatment side effects." },
            { title: "Edmonton Symptom Assessment System (ESAS) Integration", text: "Visual digital symptom screening tool tracking 9 key physical and psychological symptoms: pain, tiredness, drowsiness, nausea, appetite, shortness of breath, depression, anxiety, and wellbeing." },
            { title: "Cancer Survivorship Care Plan Generator", text: "Auto-generates structured survivorship care summaries detailing completed surgical, radiation, and chemotherapy treatments, potential late toxicities, and long-term surveillance testing schedules." },
            { title: "Palliative Care & WHO Pain Ladder Documentation", text: "Structures cancer pain management following the WHO 3-step analgesic ladder, tracking opioid prescriptions (Morphine, Fentanyl patches), equianalgesic dose conversions, and breakthrough pain rescue doses." },
            { title: "ICD-O-3 & SNOMED-CT Topography/Morphology Coding", text: "Instant auto-complete search for thousands of cancer diagnoses mapped to International Classification of Diseases for Oncology (ICD-O-3) topography and morphology codes." }
        ],
        workflowSteps: [
            { step: "Patient Intake & ECOG Evaluation", desc: "Nurse logs vitals; oncologist assesses ECOG performance status (0-4) and functional independence." },
            { step: "Symptom Burden Screening (ESAS)", desc: "Patient or assistant rates symptoms on 0-to-10 ESAS scale; severe pain or nausea highlights in red." },
            { step: "Multidisciplinary Staging & Plan Review", desc: "Doctor reviews integrated staging, pathology, and past chemo cycles on a single unified timeline." },
            { step: "Clinical Formulation & Prescription", desc: "Oncologist prescribes targeted therapies or supportive medications with automated drug-drug interaction alerts." },
            { step: "Survivorship or Palliative Summary Dispatch", desc: "Personalized care plan dispatches to patient WhatsApp and permanently archives in Ayushman Bharat Health Account." }
        ],
        compliance: "Medical365 Oncology Reporting complies with National Cancer Grid (NCG) India clinical guidelines, American Society of Clinical Oncology (ASCO) standards, and WHO Palliative Care documentation norms.\n\nAll oncology consultation records, tumor board summaries, and opioid logs are secured under AES-256 encryption compliant with the DPDP Act 2023. Oncology health summaries link seamlessly with ABDM digital health lockers.",
        table: [
            { feature: "Documentation Format", manual: "Disjointed paper charts scattered across medical, surgical, and radiation OPDs", m365: "Unified digital oncology timeline accessible across all cancer sub-specialties" },
            { feature: "Performance Status", manual: "Informal notes like 'looks weak' without standardized scoring", m365: "Mandatory ECOG Performance Status (0-4) tracking across all visits" },
            { feature: "Symptom Tracking", manual: "Patients verbally describe symptoms; subtle functional decline missed", m365: "Standardized ESAS symptom scale tracking pain, fatigue, and nausea over time" },
            { feature: "Cancer Pain Management", manual: "Unstructured opioid notes without rescue dose calculations", m365: "WHO 3-step analgesic ladder tracking with equianalgesic opioid converters" },
            { feature: "Survivorship Care", manual: "Patients discharged with thick binders without long-term follow-up roadmaps", m365: "Auto-generated Cancer Survivorship Care Plan detailing surveillance scans" }
        ],
        faqs: [
            { q: "How does the software document Multidisciplinary Tumor Board (MDT) meetings?", a: "The MDT module structures case presentation: it pulls patient demographics, pathology, and scans, allows participating specialists to document their recommendations, and generates an official signed Tumor Board Consensus Document in 1 click." },
            { q: "What is the Edmonton Symptom Assessment System (ESAS) and how is it used?", a: "The ESAS is a validated 9-item clinical tool assessing pain, fatigue, nausea, depression, anxiety, drowsiness, appetite, wellbeing, and shortness of breath on a 0-to-10 scale. Medical365 graphs these scores longitudinally to evaluate palliative symptom relief." },
            { q: "Does the system track opioid prescriptions and legal regulatory requirements?", a: "Yes. The software conforms to Indian Narcotic Drugs and Psychotropic Substances (NDPS) rules, maintaining audit-ready registers for oral Morphine, Fentanyl, and Methadone with daily balance reconciliations." },
            { q: "Can oncologists generate Cancer Survivorship Care Plans automatically?", a: "Yes. When curative therapy concludes, Medical365 compiles all delivered surgeries, chemo regimens, and radiation doses into a patient-friendly Survivorship Care Plan detailing recommended surveillance mammograms, colonoscopies, or CT scans." },
            { q: "Can palliative care nurses record home-visit notes on mobile tablets?", a: "Yes. Home-care palliative teams can use the Medical365 mobile app to update symptom scores, document bedsore wound care, and adjust pain medication orders during home visits." },
            { q: "Is the patient's oncology record accessible in emergency rooms?", a: "Yes. If a cancer patient presents to the emergency room with fever or dyspnea, casualty doctors can immediately view current chemo drugs, last day of chemotherapy, and nadir blood counts in seconds." }
        ]
    },

    "clinical-trial-management": {
        cluster: "ONCOLOGY",
        title: "Clinical Trial Management Software (CTMS) | Oncology EMR | Medical365",
        h1: "Oncology Clinical Trial Management (CTMS) & Research Software",
        metaDesc: "Medical365 clinical trial management software manages GCP compliance, patient screening logs, electronic source data (eSource) & SAE reporting for Indian cancer hospitals.",
        diagramTitle: "Oncology Clinical Trial Lifecycle & Regulatory Architecture",
        nodes: ["Protocol Setup & Eligibility Screening", "Digital Informed Consent (eICF)", "eSource Clinical Trial Data Capture", "Adverse Event (AE / SAE) Safety Logging", "CDSCO & Ethics Committee Audit Sync"],
        color: "#b91c1c",
        quickAnswer: "Clinical trial management software (CTMS) is a specialized clinical research module designed for comprehensive cancer research institutes and academic hospitals. It manages ICH-GCP compliant trial protocols, subject screening and randomization logs, electronic source data capture (eSource), Serious Adverse Event (SAE) reporting to regulatory authorities (CDSCO / DCGI), and investigational product (IP) accountability.",
        bgText: "Clinical trials in oncology provide cancer patients with access to breakthrough novel therapeutics—including immunotherapy checkpoint inhibitors, antibody-drug conjugates (ADCs), and CAR-T cell therapies—years before commercial availability. In Indian academic medical colleges and cancer research centers, oncologists lead multi-center international and investigator-initiated clinical trials.\n\nHowever, conducting clinical trials carries immense regulatory scrutiny and documentation overhead. Clinical investigators and study coordinators must comply with strict International Council for Harmonisation Good Clinical Practice (ICH-GCP) guidelines and Central Drugs Standard Control Organisation (CDSCO) regulations. Recording research data on paper case report forms (CRFs) is labor-intensive, invites transcription errors during monitor audits, and risks regulatory penalties if Serious Adverse Events (SAEs) are not reported within mandatory 24-hour statutory windows.\n\nMedical365's Clinical Trial Management module bridges everyday patient care with clinical research compliance. Featuring automated inclusion/exclusion eligibility screening, electronic informed consent (eICF), audit-proof eSource clinical documentation, investigational drug accountability logs, and automated 24-hour SAE notification engines, Medical365 empowers cancer centers to conduct world-class clinical research with absolute regulatory confidence.",
        capabilities: [
            { title: "Protocol Setup & Automated Eligibility Screening Engine", text: "Pre-configures trial-specific inclusion and exclusion criteria, automatically cross-referencing patient histology, stage, prior lines of therapy, and lab values to flag eligible trial candidates." },
            { title: "Audio-Visual Electronic Informed Consent (eICF) Module", text: "Complies with CDSCO Indian clinical trial mandates requiring audio-visual recording of informed consent for vulnerable populations, securing timestamped biometric/digital signatures." },
            { title: "ICH-GCP Compliant Electronic Source Data (eSource)", text: "Enables direct electronic source data entry with 21 CFR Part 11 compliant immutable audit trails, capturing user ID, timestamp, and rationale for any retrospective data modification." },
            { title: "Serious Adverse Event (SAE) 24-Hour Regulatory Workflow", text: "Standardized CTCAE v5.0 adverse event grading (Grade 1-5) with automated countdown timers and pre-formatted regulatory reporting templates for CDSCO, Sponsor, and Institutional Ethics Committee (IEC)." },
            { title: "Investigational Product (IP) Pharmacy Accountability Log", text: "Tracks investigational drug shipments: temperature log verification, bottle/vial serial numbers, dispensing logs, patient return counts, and pill destruction certificates." },
            { title: "Subject Visit Window & Protocol Milestone Scheduler", text: "Calculates exact study visit windows (e.g. Cycle 2 Day 1 ± 2 days) based on protocol rules, alerting study coordinators to upcoming pharmacokinetic (PK) blood draws and imaging windows." }
        ],
        workflowSteps: [
            { step: "Patient Eligibility Screening", desc: "Oncologist reviews protocol criteria; software cross-checks patient chart and confirms trial eligibility." },
            { step: "Audio-Visual eICF Consent Capture", desc: "Clinical research coordinator conducts informed consent discussion; audio-visual record and digital signature are archived." },
            { step: "Subject Enrollment & Randomization", desc: "Subject assigned unique trial ID; investigational product dispensed with barcode verification at research pharmacy." },
            { step: "Protocol Visit & eSource Capture", desc: "Study coordinator logs protocol-specific vitals, toxicity scores (CTCAE), and lab draws directly into eSource forms." },
            { step: "Safety Event & Sponsor Reporting", desc: "Any adverse event auto-grades; SAEs trigger instant automated alert to Principal Investigator and Ethics Committee." }
        ],
        compliance: "Medical365 Clinical Trial Management complies with CDSCO New Drugs and Clinical Trials Rules 2019, ICH-GCP E6(R2) standards, US FDA 21 CFR Part 11 electronic records regulations, and Indian Council of Medical Research (ICMR) ethical guidelines.\n\nAll trial data, audit logs, and electronic signatures are secured under AES-256 encryption compliant with the DPDP Act 2023. Patient summaries integrate with national ABDM health records.",
        table: [
            { feature: "Subject Screening", manual: "Manual chart review of paper files; many eligible candidates missed", m365: "Automated electronic screening flagging patients matching protocol criteria" },
            { feature: "Audit Trail & Compliance", manual: "Paper source documents with manual correction marks and missing dates", m365: "21 CFR Part 11 compliant immutable audit trail tracking all edits" },
            { feature: "SAE Reporting", manual: "Typing Word documents under tight deadlines; high risk of missing 24h window", m365: "Automated 24-hour SAE clock generating pre-formatted CDSCO/IEC reports" },
            { feature: "Drug Accountability", manual: "Paper logbooks prone to arithmetic errors during sponsor monitoring visits", m365: "Digital barcode tracking of received, dispensed, and returned study drug" },
            { feature: "Visit Window Scheduling", manual: "Manual calculation of study visit calendar; risk of protocol deviations", m365: "Automated protocol calendar calculating exact visit windows (± days)" }
        ],
        faqs: [
            { q: "How does the software comply with CDSCO audio-visual consent rules in India?", a: "Under Indian clinical trial regulations, audio-visual recording of informed consent is mandatory for new drug trials involving vulnerable subjects. Medical365 includes built-in webcam/tablet recording that encrypts and securely stores the AV consent file alongside the signed digital consent document." },
            { q: "Is the software compliant with US FDA 21 CFR Part 11 standards?", a: "Yes. Medical365 includes strict access controls, unique user credentials, automated session timeouts, electronic signatures, and tamper-proof computer-generated audit trails recording the date, time, user, and reason for every data modification." },
            { q: "How does the 24-hour Serious Adverse Event (SAE) reporting alert work?", a: "When an investigator logs an event classified as serious (death, life-threatening, hospitalization, disability, or congenital anomaly), the software starts a 24-hour countdown and drafts pre-filled regulatory reporting packages for the CDSCO, Ethics Committee, and Trial Sponsor." },
            { q: "Can external Clinical Research Associates (CRAs) monitor data remotely?", a: "Yes. The system provides secure, role-based remote monitoring portals for Sponsor CRAs, allowing source data verification (SDV) and query resolution without exposing non-trial patient data." },
            { q: "How does the module track Investigational Product (IP) temperatures?", a: "The pharmacy module logs daily min/max refrigerator and room temperature readings, automatically flagging temperature excursions and holding affected drug batches from being dispensed." },
            { q: "Can investigator-initiated trials be configured easily without programming?", a: "Yes. Principal investigators can use the visual form builder to configure custom Case Report Forms (eCRFs), eligibility checklists, and visit schedules for academic research in under an hour." }
        ]
    }
};

const done = buildPages(oncoData, repoRoot, diagramDir);
console.log(`=== BATCH 3B SUCCESS: Generated ${done} Oncology pages! ===`);


module.exports = oncoData;
