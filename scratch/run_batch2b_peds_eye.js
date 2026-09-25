const path = require('path');
const { buildPages } = require('./page_builder_engine.js');

const repoRoot = path.resolve(__dirname, '..');
const diagramDir = path.join(repoRoot, 'images/diagrams');

console.log('=== EXECUTING BATCH 2B: PEDIATRICS (6) + OPHTHALMOLOGY (5) = 11 PAGES ===');

const pedsEyeData = {
    // ══════════════════════════════════════════════════
    // PEDIATRICS (6 pages)
    // ══════════════════════════════════════════════════
    "growth-charts": {
        cluster: "PEDIATRICS",
        title: "Pediatric Growth Charts Software | WHO & IAP Percentiles EMR | Medical365",
        h1: "Pediatric Growth Charts & Nutritional Assessment Software",
        metaDesc: "Medical365 pediatric growth charts software automates WHO and IAP growth percentiles, z-scores, failure to thrive alerts & BMI tracking for Indian child health clinics.",
        diagramTitle: "Pediatric Growth Monitoring & Nutritional Screening Pipeline",
        nodes: ["Child Anthropometric Intake", "WHO / IAP Growth Curve Engine", "Z-Score & Percentile Calculation", "Pediatrician Nutritional Assessment", "Parent Growth Report & App"],
        color: "#0284c7",
        quickAnswer: "Pediatric growth charts software is an essential clinical child healthcare module that automatically plots pediatric anthropometric measurements (weight, length/height, head circumference, BMI) on standardized World Health Organization (WHO) and Indian Academy of Pediatrics (IAP) growth curves. It computes exact percentiles and z-scores, alerting pediatricians to growth faltering, malnutrition, stunting, or childhood obesity.",
        bgText: "Child growth monitoring is the cornerstone of preventative pediatric medicine. India faces a complex dual burden of malnutrition: high rates of childhood stunting and wasting persist alongside an alarming rise in pediatric obesity and metabolic syndrome across urban centers. Detecting subtle deviations from a child's expected developmental trajectory requires continuous, accurate anthropometric tracking.\n\nIn conventional outpatient practice, pediatricians and nursing assistants weigh infants and measure length on examination tables, then record the numbers in handwritten mother-child booklets. Manually plotting dots on paper growth charts during busy clinical sessions is slow, prone to parallax errors, and frequently neglected. Consequently, early signs of growth faltering, celiac disease, or growth hormone deficiency often go unnoticed until significant stunting has occurred.\n\nMedical365's Pediatric Growth Charts module automates anthropometric assessment. Entering a child's weight, height, and head circumference instantly generates interactive WHO (0-5 years) and IAP (5-18 years) growth curves, calculates exact z-scores, and projects adult target height based on parental genetics.",
        capabilities: [
            { title: "WHO & IAP Standard Growth Curve Integration", text: "Pre-configured with official World Health Organization (WHO Child Growth Standards 0-5 yrs) and Indian Academy of Pediatrics (IAP 2015 revised charts for Indian children 5-18 yrs) reference datasets." },
            { title: "Instant Percentile & Z-Score Engine", text: "Automatically calculates exact age-and-gender-adjusted percentiles (3rd, 15th, 50th, 85th, 97th) and standard deviation z-scores for Weight-for-Age, Height-for-Age, Weight-for-Height, and BMI-for-Age." },
            { title: "Failure to Thrive & Growth Faltering Alerts", text: "Intelligent clinical surveillance flagging children crossing two major percentile lines downward or exhibiting weight-for-height below -2 z-scores (severe acute malnutrition)." },
            { title: "Head Circumference & Microcephaly Screening", text: "Plots occipitofrontal head circumference against age norms from birth to 36 months, alerting clinicians to early microcephaly, craniosynostosis, or hydrocephalus." },
            { title: "Mid-Parental Target Height Calculator", text: "Calculates mid-parental target height ([Father's ht + Mother's ht ± 13 cm] / 2) and plots target percentile corridors on the adolescent growth curve." },
            { title: "Visual Parent Growth Summary Sheets", text: "Generates colorful, easy-to-understand growth summary reports and smartphone graphs that pediatricians can share with parents via WhatsApp to reassure or counsel on nutrition." }
        ],
        workflowSteps: [
            { step: "Anthropometric Measurement", desc: "Nurse records infant weight (g), length/height (cm), and head circumference; data auto-loads into pediatrician chart." },
            { step: "Automated Curve Plotting", desc: "Software instantly plots data point on WHO/IAP curves, calculating exact percentiles and BMI-for-age." },
            { step: "Clinical Growth Evaluation", desc: "Pediatrician reviews growth trajectory across previous visits, checking for percentile crossing or stunting." },
            { step: "Nutritional Counseling & Plan", desc: "Doctor selects customized dietary guidance (exclusive breastfeeding, complementary feeding, iron/vitamin D supplementation)." },
            { step: "Parent App & WhatsApp Dispatch", desc: "Visual growth curve updates on parent mobile app and links to child's Ayushman Bharat Health Account (ABHA)." }
        ],
        compliance: "Medical365 Pediatric Growth Charts comply with World Health Organization (WHO) Child Growth Standards, Indian Academy of Pediatrics (IAP) clinical guidelines, and Rashtriya Bal Swasthya Karyakram (RBSK) screening benchmarks.\n\nAll child health records and anthropometric data are secured under AES-256 encryption compliant with the DPDP Act 2023. Growth summaries link seamlessly with ABDM digital health lockers.",
        table: [
            { feature: "Curve Plotting Method", manual: "Hand-drawn pencil dots on paper booklets; high error rate", m365: "Instant computerized plotting with sub-millimeter precision" },
            { feature: "Growth Standards", manual: "Often outdated Western charts or single generic curve", m365: "Dual WHO (0-5 yrs) and official revised IAP (5-18 yrs) charts" },
            { feature: "Z-Score Calculation", manual: "Impossible to compute manually during quick outpatient visits", m365: "Instant automated z-score calculation for stunting and wasting" },
            { feature: "Growth Faltering Detection", manual: "Relies on clinician memory between sporadic visits", m365: "Automated alert when trajectory crosses two major percentile lines" },
            { feature: "Parent Engagement", manual: "Paper booklet easily damaged, wet, or lost by parents", m365: "Interactive growth curve accessible anytime on parent smartphone" }
        ],
        faqs: [
            { q: "Why does the software use both WHO and IAP growth charts?", a: "The Indian Academy of Pediatrics (IAP) recommends the WHO Child Growth Standards for children under 5 years because all healthy children have similar growth potential under optimal conditions. For children aged 5 to 18 years, the IAP recommends specific Indian reference charts to reflect genetic differences and prevent over-diagnosing undernutrition." },
            { q: "How does the software handle premature and low birth weight infants?", a: "Medical365 includes dedicated Fenton and Intergrowth-21st growth charts for preterm infants, allowing clinicians to calculate corrected gestational age until 24 months of life." },
            { q: "Can the software calculate body mass index (BMI) percentiles automatically?", a: "Yes. BMI is calculated automatically from height and weight, and the corresponding age-and-gender-adjusted BMI percentile is plotted, categorizing children as underweight (<5th percentile), normal, overweight (85th-95th), or obese (≥95th)." },
            { q: "Does the module provide feeding and nutritional advice templates?", a: "Yes. Age-specific nutritional advice templates—covering exclusive breastfeeding, complementary feeding weaning schedules, protein-rich diets, and micronutrient supplementation—can be printed with 1 click." },
            { q: "Can parents view their child's growth curves on their mobile phones?", a: "Yes. Parents can view interactive, zoomable growth charts showing weight, height, and head circumference percentiles on the Medical365 patient mobile app." },
            { q: "Is the child's growth data private and secure under Indian law?", a: "Yes. Pediatric data is protected with the highest standards of data security, featuring AES-256 encryption and parent-consent management compliant with the DPDP Act 2023." }
        ]
    },

    "vaccination-tracking": {
        cluster: "PEDIATRICS",
        title: "Child Vaccination Tracking Software | Pediatric Immunization EMR | Medical365",
        h1: "Pediatric Vaccination & Immunization Tracking Software",
        metaDesc: "Medical365 child vaccination tracking software automates IAP and UIP immunization schedules, SMS/WhatsApp recall reminders, vaccine batch tracking & digital certificates.",
        diagramTitle: "Pediatric Immunization Lifecycle & Vaccine Inventory Pipeline",
        nodes: ["Child Birth Registration", "IAP / UIP Schedule Engine", "Automated WhatsApp Reminders", "Vaccine Administration & Lot Scan", "Digital Vaccine Card & U-WIN Sync"],
        color: "#0284c7",
        quickAnswer: "Pediatric vaccination tracking software is a comprehensive child immunization management and recall module. It automates both the Indian Academy of Pediatrics (IAP) recommended schedule and the government Universal Immunization Programme (UIP), tracks vaccine vial batch numbers and cold chain expiry dates, dispatches automated WhatsApp reminders to parents, and generates tamper-proof digital vaccination certificates.",
        bgText: "Immunization is the single most cost-effective clinical intervention in preventative child healthcare, protecting infants from lethal infections including tuberculosis, hepatitis B, rotavirus, pneumococcus, measles, and rubella. In Indian pediatric clinics, government maternity hospitals, and private child health centers, administering vaccines accounts for over 40% of all outpatient pediatric consultations.\n\nDespite widespread immunization efforts, vaccine dropout rates remain a major clinical issue. Parents frequently forget scheduled booster dates, lose paper immunization cards, or face confusion navigating differences between government UIP schedules and private IAP recommendations. Furthermore, clinics face significant medico-legal risks if vaccine batch numbers, manufacturer lot codes, and expiration dates are not meticulously recorded in patient charts.\n\nMedical365's Pediatric Vaccination module eliminates missed doses and documentation errors. By generating dynamic, birth-date-calculated immunization timelines, sending automated WhatsApp and SMS appointment reminders, tracking vaccine vial cold chain batch numbers, and issuing verifiable digital vaccination cards, Medical365 ensures complete child immunization coverage.",
        capabilities: [
            { title: "Dual IAP & Government UIP Schedule Support", text: "Pre-configured with the complete Indian Academy of Pediatrics (IAP 2023-24) advisory schedule as well as the National Universal Immunization Programme (UIP) schedule." },
            { title: "Automated Dynamic Milestone Calculation", text: "Calculates exact due dates for all vaccines (Birth, 6, 10, 14 weeks, 6, 9, 12, 15, 18 months, 4-6 years, and 10-12 years) based on the child's verified birth date." },
            { title: "Automated WhatsApp & SMS Parental Reminders", text: "Dispatches automated bilingual reminders to parents 7 days and 1 day prior to vaccination due dates, drastically reducing clinic drop-out rates." },
            { title: "Vaccine Inventory & Barcode Lot Tracking", text: "Scans vaccine vial barcodes to capture brand, manufacturer, batch/lot number, and expiration date directly into the child's permanent record, preventing expired administration." },
            { title: "Adverse Events Following Immunization (AEFI) Log", text: "Dedicated AEFI reporting form to document post-vaccine fever, local reactions, febrile seizures, or allergic responses compliant with national public health guidelines." },
            { title: "Tamper-Proof Digital Vaccination Passport", text: "Auto-generates official, branded digital immunization certificates with QR codes for school admissions, travel visas, and national health registry compliance." }
        ],
        workflowSteps: [
            { step: "Birth Registration & Schedule Generation", desc: "Child's date of birth is entered; system instantly generates a personalized immunization calendar from birth to 16 years." },
            { step: "Automated Recall Reminders", desc: "Automated WhatsApp notification alerts parents when the child turns 6 weeks old, detailing upcoming vaccines." },
            { step: "Vial Scan & Administration", desc: "Nurse scans vaccine packaging barcode (e.g. Hexavalent DTwP-HepB-Hib-IPV); lot number and site (Anterolateral thigh) are logged." },
            { step: "Pediatrician Verification & Sign-Off", desc: "Pediatrician confirms administration, provides post-vaccine paracetamol guidance, and signs digital record." },
            { step: "Certificate Issuance & U-WIN Linkage", desc: "Updated digital vaccination card instantly syncs to parent mobile app and exports to national immunization registries." }
        ],
        compliance: "Medical365 Pediatric Vaccination Tracking aligns with the Indian Academy of Pediatrics (IAP) Committee on Immunization guidelines and the Ministry of Health and Family Welfare (MoHFW) immunization standards.\n\nAll vaccination logs, batch serial numbers, and child demographic data are protected under AES-256 encryption compliant with the DPDP Act 2023. Certificates integrate with Ayushman Bharat Health Accounts (ABHA).",
        table: [
            { feature: "Schedule Management", manual: "Paper booklet carried by parents; frequently lost, torn, or misplaced", m365: "Cloud-based digital schedule accessible 24/7 on parent smartphone" },
            { feature: "Due Date Reminders", manual: "No reminders; parents must remember dates themselves resulting in high dropout", m365: "Automated WhatsApp & SMS reminders sent 7 days and 1 day before due date" },
            { feature: "Batch & Lot Tracking", manual: "Handwritten batch numbers often illegible; no check on expiration", m365: "Digital barcode scanning with automated expiry verification" },
            { feature: "School Admission Certificate", manual: "Doctor must manually fill and sign physical paper certificate", m365: "1-click verified digital immunization passport with secure QR code" },
            { feature: "Catch-up Vaccination", manual: "Complex manual calculation of catch-up intervals for missed doses", m365: "Automated catch-up schedule calculation adhering to IAP minimum intervals" }
        ],
        faqs: [
            { q: "Can the software handle delayed or missed vaccination catch-up schedules?", a: "Yes. If a child misses an appointment, Medical365's intelligent catch-up algorithm automatically recalculates all future vaccine milestones based on IAP minimum interval rules, ensuring safe and timely catch-up." },
            { q: "Does the system support optional vaccines like HPV, Varicella, and Meningococcal?", a: "Yes. The software includes full schedules for both mandatory and optional vaccines, including Varicella, Hepatitis A, PCV, Rotavirus, Typhoid conjugate, Meningococcal, and HPV." },
            { q: "How does the barcode scanner prevent the administration of expired vaccines?", a: "When a vaccine box is scanned, the software decodes the 2D DataMatrix barcode. If the vial is past its expiration date or if the temperature log flag is triggered, an immediate warning blocks documentation." },
            { q: "Can parents download the official vaccination certificate for school admission?", a: "Yes. Parents can download a digitally signed, PDF vaccination certificate containing complete vaccine dates, brand names, batch numbers, and hospital stamp directly from the patient portal." },
            { q: "Does the system support integration with national platforms like U-WIN?", a: "Yes. Medical365 conforms to ABDM FHIR immunization profiles, supporting standardized export to national child immunization databases including U-WIN." },
            { q: "Can multiple children in the same family be tracked under one parent account?", a: "Yes. Parents can switch between sibling profiles on the Medical365 mobile app to manage vaccination schedules and growth charts for all their children seamlessly." }
        ]
    },

    "pediatric-dosage-calculator": {
        cluster: "PEDIATRICS",
        title: "Pediatric Dosage Calculator Software | Child E-Prescribing EMR | Medical365",
        h1: "Pediatric Weight-Based Dosage Calculator & Prescription Software",
        metaDesc: "Medical365 pediatric dosage calculator automatically computes weight-based mg/kg doses, oral suspension volumes & maximum adult dose safety limits for child clinics.",
        diagramTitle: "Pediatric Weight-Based Dosage & Clinical Safety Architecture",
        nodes: ["Child Weight Ingestion", "Drug Formulary (mg/kg)", "Oral Liquid Concentration Engine", "Safety Ceiling & Interaction Check", "Bilingual Prescription Dispatch"],
        color: "#0284c7",
        quickAnswer: "A pediatric dosage calculator is a specialized clinical decision support module that automatically computes weight-based medication doses (mg/kg/day or mg/m² BSA) for infants and children. It converts active ingredient milligrams into exact milliliter (ml) or teaspoon measurements for oral syrups and suspensions, checks against maximum safe daily limits, and enforces age-specific contraindications.",
        bgText: "Prescribing medication for pediatric patients is inherently complex and high-risk. Unlike adult medicine, where standard fixed-dose tablets (e.g. 500 mg) are commonplace, pediatric pharmacotherapy requires personalized, weight-based calculations for every child. A 4 kg newborn, an 11 kg toddler, and a 35 kg adolescent require vastly different doses of the same antimicrobial agent.\n\nIn conventional outpatient practice, pediatricians must manually perform mental arithmetic or use handheld calculators during rapid consultations: multiplying weight in kilograms by the recommended mg/kg dose, dividing by the frequency of daily doses, and then converting milligrams into liquid volume based on the specific concentration of the prescribed oral syrup (e.g., Amoxicillin 125 mg/5ml vs. 250 mg/5ml). Under clinic time pressures, decimal point placement errors, confusion between syrup strengths, or exceeding adult safety ceilings represent leading causes of pediatric medication errors.\n\nMedical365's Pediatric Dosage Calculator eliminates calculation errors at the point of care. Integrated directly into the e-prescription interface, the software continuously pulls the child's latest verified weight, auto-computes the exact volume in milliliters, displays a clear dosing spoon/dropper guide for parents, and blocks any order exceeding established maximum pediatric safety limits.",
        capabilities: [
            { title: "Automated Weight-Based (mg/kg) & BSA Calculation", text: "Computes exact doses using validated pediatric formularies based on child weight (mg/kg/day or mg/kg/dose) and Body Surface Area (BSA in m² using Mosteller formula)." },
            { title: "Liquid Oral Suspension (ml) Volume Conversion", text: "Automatically converts milligrams into exact milliliters (ml) and dropper marks based on the specific brand strength (e.g., Paracetamol drops 100 mg/ml vs. syrup 120 mg/5ml vs. DS 250 mg/5ml)." },
            { title: "Maximum Dose Ceiling Safety Guard", text: "Automatically caps pediatric doses so they never exceed the established maximum safe adult dose (e.g., capping Amoxicillin at 1000 mg/dose or Ibuprofen at 400 mg/dose)." },
            { title: "Age-Specific Contraindication & Toxicity Alerts", text: "Intelligent safety engine flagging medications contraindicated in specific age brackets (e.g. Ceftriaxone in neonates, Aspirin in viral illness/Reye syndrome, Fluoroquinolones, Tetracyclines)." },
            { title: "Renal & Hepatic Dose Adjustment Calculator", text: "Prompts dose reductions and extended dosing intervals based on estimated Glomerular Filtration Rate (eGFR using Schwartz formula) for children with renal impairment." },
            { title: "Visual Parent Dosing Guide with Dropper/Spoon Graphics", text: "Generates clear, visual medicine instructions on the printed and digital prescription (e.g. 'Give 2.5 ml using the measuring syringe twice daily after meals') in English and regional languages." }
        ],
        workflowSteps: [
            { step: "Weight Acquisition", desc: "Child's weight is recorded at triage; weight auto-populates the consultation prescription screen." },
            { step: "Drug Selection", desc: "Doctor selects drug (e.g. Azithromycin); software displays standard indication-based dosage guidelines (10 mg/kg/day)." },
            { step: "Instant Volume Calculation", desc: "System calculates exact dose: 12 kg × 10 mg/kg = 120 mg = 3 ml of 200 mg/5ml suspension once daily." },
            { step: "Safety Ceiling & Allergy Check", desc: "Engine verifies absence of penicillin/macrolide allergies and confirms dose is below maximum adult ceiling." },
            { step: "Clear Prescription Dispatch", desc: "Prescription prints with visual measuring instructions and dispatches to parent's WhatsApp with audio dosing reminders." }
        ],
        compliance: "Medical365 Pediatric Dosage Calculator aligns with the Indian Academy of Pediatrics (IAP) Drug Formulary, British National Formulary for Children (BNFC), and WHO Model Formulary for Children.\n\nAll calculation logs, doctor overrides, and e-prescriptions are protected under AES-256 encryption compliant with the DPDP Act 2023. Prescriptions comply with Indian IT Act electronic signature standards and ABDM guidelines.",
        table: [
            { feature: "Dose Calculation Method", manual: "Mental arithmetic or phone calculator; high risk of decimal placement errors", m365: "Instant computerized calculation linked to verified scale weight" },
            { feature: "Liquid Volume Conversion", manual: "Doctor must remember different brand strengths (125mg/5ml vs 250mg/5ml)", m365: "Automatic calculation based on exact commercial product selected" },
            { feature: "Maximum Dose Protection", manual: "No safety check; heavy children easily prescribed doses higher than adult max", m365: "Automated safety ceiling capping pediatric doses at adult maximums" },
            { feature: "Parent Instructions", manual: "Vague handwriting like '1 tsp TDS' causing parental dosing confusion", m365: "Precise digital instructions: 'Give 3.5 ml using measuring syringe 3 times daily'" },
            { feature: "Age-Specific Warnings", manual: "Relies entirely on memory; risk of administering contraindicated drugs", m365: "Automated clinical block on drugs contraindicated in specific age tiers" }
        ],
        faqs: [
            { q: "How does the system prevent confusion between different syrup strengths?", a: "When a pediatrician chooses a medication like Paracetamol, Medical365 displays all available commercial formulations (drops 100 mg/ml, syrup 120 mg/5ml, syrup 250 mg/5ml). Selecting a formulation instantly recalculates the volume to administer in milliliters, eliminating conversion errors." },
            { q: "Does the calculator support Body Surface Area (BSA) dosing for chemotherapy?", a: "Yes. For pediatric oncology and specialized nephrology prescribing, the software calculates BSA in square meters (m²) using the Mosteller equation from height and weight." },
            { q: "Can pediatricians override the suggested dosage recommendations?", a: "Yes. Doctors retain complete clinical autonomy to customize doses, change dosing frequencies, or adjust treatment durations, with mandatory clinical justification logging." },
            { q: "How does the system handle obese pediatric patients?", a: "For children whose BMI exceeds the 95th percentile, the software alerts the pediatrician and provides options to calculate doses based on Actual Body Weight (ABW), Ideal Body Weight (IBW), or Adjusted Body Weight." },
            { q: "Can parents receive dosing instructions with visual dropper diagrams?", a: "Yes. The prescription can include illustrated syringe or dropper graphics highlighting the exact fill line (e.g. 2.5 ml), preventing parental under- or over-dosing at home." },
            { q: "Is the drug formulary updated with Indian pharmaceutical brands?", a: "Yes. Medical365 includes a comprehensive Indian pharmaceutical database containing over 50,000 branded and generic pediatric formulations with verified concentrations." }
        ]
    },

    "developmental-milestones": {
        cluster: "PEDIATRICS",
        title: "Child Developmental Milestones Tracking Software | Pediatrics EMR | Medical365",
        h1: "Child Developmental Milestones & Early Intervention Software",
        metaDesc: "Medical365 developmental milestones software tracks gross motor, fine motor, language & social milestones. Early autism & delay screening for Indian pediatric clinics.",
        diagramTitle: "Child Developmental Screening & Early Intervention Workflow",
        nodes: ["Age-Specific Milestone Intake", "Gross & Fine Motor Assessment", "Language & Social-Emotional Screen", "Developmental Delay & Red Flag Alert", "Early Intervention Referral & EMR"],
        color: "#0284c7",
        quickAnswer: "Developmental milestones tracking software is a specialized clinical child development module that screens and logs physical, cognitive, communication, and socio-emotional developmental progress. It maps developmental milestones against validated screening tools (Denver II, Ages and Stages Questionnaires ASQ-3, and Trivandrum Developmental Screening Chart TDSC), alerting pediatricians to developmental delays, autism spectrum red flags, and cerebral palsy early.",
        bgText: "The first 1,000 days of a child's life represent a critical window of neurodevelopmental plasticity. In India, an estimated 10% of children experience developmental delays or neurodevelopmental disorders, including speech delays, global developmental delay, autism spectrum disorder (ASD), and cerebral palsy. Detecting these conditions within the first two years of life dramatically improves outcomes through early intervention therapies.\n\nHowever, in routine outpatient practice, developmental assessment is frequently overlooked. In crowded OPDs, consultations often focus solely on acute complaints like fever or cough. Developmental screening using lengthy paper questionnaires is rarely completed, and red flags—such as lack of social smile at 2 months, inability to hold head steady at 4 months, or absence of babbling at 9 months—are often dismissed as 'late talking' until the child reaches school age.\n\nMedical365's Developmental Milestones module integrates structured, rapid developmental surveillance directly into routine well-child check-ups. With 1-click milestone pickers, visual developmental age calculators, standardized M-CHAT-R autism screening, and automated red-flag alerts, Medical365 empowers pediatricians to identify neurodevelopmental deviations early and initiate timely interventions.",
        capabilities: [
            { title: "Comprehensive 4-Domain Milestone Tracking", text: "Structured evaluation across Gross Motor (sitting, standing, walking), Fine Motor/Adaptive (pincer grasp, scribbling), Language/Communication (babbling, first words), and Social/Emotional (smiling, stranger anxiety) domains." },
            { title: "Trivandrum (TDSC) & Denver II Standard Integration", text: "Pre-configured with validated Indian and international screening tools, including the Trivandrum Developmental Screening Chart (TDSC) and Denver Developmental Screening Test II." },
            { title: "Automated Developmental Red-Flag Surveillance", text: "Highlights clinical developmental warning signs: persistent primitive reflexes, hand dominance before 12 months, lack of eye contact, or loss of previously acquired speech or social skills." },
            { title: "Integrated M-CHAT-R/F Autism Screening", text: "Embedded Modified Checklist for Autism in Toddlers (M-CHAT-R/F) for children aged 16 to 30 months, automatically scoring low, medium, or high risk for autism spectrum disorders." },
            { title: "Developmental Quotient (DQ) & Delay Calculator", text: "Computes Developmental Age (DA) and Developmental Quotient (DQ = [DA / Chronological Age] × 100) across individual developmental domains to quantify delay severity." },
            { title: "Early Intervention Referral & Multidisciplinary Coordination", text: "1-click generation of structured referrals to child psychologists, pediatric occupational therapists, speech-language pathologists, and developmental physiotherapists." }
        ],
        workflowSteps: [
            { step: "Age-Triggered Screening", desc: "When child attends clinic at 6, 9, 18, or 24 months, system presents age-specific developmental checklist." },
            { step: "Milestone Checklist Completion", desc: "Doctor or nurse ticks observed or parent-reported skills across motor, speech, and social domains in under 60 seconds." },
            { step: "Automated Delay Flagging", desc: "Software compares skills against upper age limits of normal; missing skills highlight in red as clinical delays." },
            { step: "Specialized Autism Screen", desc: "At 18-month visit, parent completes interactive M-CHAT-R questionnaire on tablet; risk category auto-calculates." },
            { step: "Early Intervention Plan", desc: "Doctor counsels parents, prints home stimulation guidance, and generates referral to developmental therapy center." }
        ],
        compliance: "Medical365 Developmental Milestones Tracking aligns with Indian Academy of Pediatrics (IAP) developmental screening protocols, Rashtriya Bal Swasthya Karyakram (RBSK) guidelines, and American Academy of Pediatrics (AAP) recommendations.\n\nAll developmental assessment records and developmental quotients are encrypted under AES-256 compliant with the DPDP Act 2023. Longitudinal child developmental records integrate into the Ayushman Bharat Digital Mission (ABDM).",
        table: [
            { feature: "Screening Process", manual: "Informal verbal questioning easily missing subtle developmental lags", m365: "Standardized 4-domain milestone checklist completed in 60 seconds" },
            { feature: "Screening Standards", manual: "Subjective clinical impressions without standardized scoring tools", m365: "Validated Trivandrum (TDSC), Denver II, and M-CHAT-R screening" },
            { feature: "Autism Screening", manual: "Rarely performed before 3-4 years of age when delay is severe", m365: "Mandatory automated M-CHAT-R screening prompts at 18 and 24 months" },
            { feature: "Parent Stimulation Advice", manual: "Generic verbal advice often forgotten by parents on returning home", m365: "Illustrated, age-specific home stimulation handouts shared via WhatsApp" },
            { feature: "Therapy Referral Coordination", manual: "Unlinked paper letters to speech or occupational therapists", m365: "Integrated digital multidisciplinary referral tracking progress in EMR" }
        ],
        faqs: [
            { q: "How does the software adjust milestones for premature infants?", a: "For infants born before 37 weeks of gestation, Medical365 automatically calculates milestones using Corrected Gestational Age (Chronological Age minus weeks premature) up to 2 years of age, preventing premature babies from being falsely labeled with developmental delays." },
            { q: "What is the Trivandrum Developmental Screening Chart (TDSC)?", a: "The TDSC is a validated Indian developmental screening tool developed by the Child Development Centre (CDC) in Kerala. It evaluates 17 key motor and cognitive milestones up to 2 years of age, calibrated specifically for Indian children." },
            { q: "Can parents fill out the developmental checklist before seeing the pediatrician?", a: "Yes. Parents can complete the developmental checklist and M-CHAT questionnaire on their smartphone or on a clinic waiting room tablet before entering the consultation chamber." },
            { q: "How does the system alert doctors to autism red flags?", a: "If a toddler fails key social-communication items on the M-CHAT-R (such as response to name, pointing to indicate interest, or shared eye contact), the software generates an alert advising formal developmental evaluation." },
            { q: "Can the software generate home developmental stimulation guides for parents?", a: "Yes. Pediatricians can print or WhatsApp customized developmental stimulation guides featuring age-appropriate games, speech exercises, and motor activities to promote child brain development." },
            { q: "Are developmental screening records accessible to school admission authorities?", a: "With parental digital consent under the DPDP Act 2023, pediatricians can export official developmental clearance certificates verifying healthy child milestones." }
        ]
    },

    "neonatal-records": {
        cluster: "PEDIATRICS",
        title: "NICU Neonatal EMR Software | Newborn Care Records India | Medical365",
        h1: "Neonatal Intensive Care Unit (NICU) & Newborn Records Software",
        metaDesc: "Medical365 neonatal records software manages APGAR scoring, phototherapy, TPN infusion calculations & NICU bed monitoring for Indian maternity hospitals.",
        diagramTitle: "Neonatal Intensive Care & Delivery Room Clinical Pipeline",
        nodes: ["Delivery Room Resuscitation & APGAR", "NICU Admission & Triage", "TPN & Fluid Calculation Engine", "Bilirubin & Phototherapy Nomogram", "Newborn Screening & Discharge EMR"],
        color: "#0284c7",
        quickAnswer: "Neonatal records software is a specialized critical care medical record module engineered for Neonatal Intensive Care Units (NICU), Special Newborn Care Units (SNCU), and labor room resuscitation teams. It manages immediate delivery room documentation (APGAR scoring at 1, 5, 10 mins), neonatal vital monitoring, total parenteral nutrition (TPN) fluid calculation, phototherapy management using Bhutani nomograms, and newborn genetic screening.",
        bgText: "The neonatal period—the first 28 days of life—is the most fragile phase of human survival. India accounts for nearly a quarter of all global neonatal deaths, with prematurity, low birth weight, birth asphyxia, and neonatal sepsis posing severe clinical challenges. In high-volume Indian maternity hospitals and tertiary NICUs, managing sick neonates requires intensive physiological surveillance and micro-precision medication dosing.\n\nIn conventional NICU environments, nursing and medical documentation is overwhelming. Staff must maintain multiple paper flowsheets: hourly vitals, ventilator settings, micro-drip infusion rates, blood gas analyses, phototherapy logs, and fluid balance charts. Calculating neonatal Total Parenteral Nutrition (TPN) fluids (glucose infusion rates in mg/kg/min, amino acids, lipids, and electrolytes) using paper worksheets is slow and carries high risks of electrolyte imbalances or fluid overload.\n\nMedical365's Neonatal Records module unifies newborn care from the labor room through NICU discharge. With automated APGAR recording, computerized TPN fluid calculators, interactive Bhutani hyperbilirubinemia nomograms, and comprehensive discharge summaries, Medical365 elevates clinical safety for the smallest, most vulnerable patients.",
        capabilities: [
            { title: "Delivery Room APGAR & Resuscitation Recording", text: "Captures 1-minute, 5-minute, and 10-minute APGAR scores (Appearance, Pulse, Grimace, Activity, Respiration), gestational Ballard score, and NRP resuscitation steps (bag-mask, chest compressions, intubation)." },
            { title: "Computerized Neonatal TPN & Fluid Calculator", text: "Automatically calculates total fluid requirements (TFR in ml/kg/day), Glucose Infusion Rate (GIR in mg/kg/min), amino acid titration (TrophAmine), lipid emulsions, and sodium/potassium/calcium additive volumes." },
            { title: "Interactive Bhutani Hyperbilirubinemia Nomogram", text: "Plots serum total bilirubin against postnatal age in hours on the AAP/Bhutani nomogram, categorizing risk zones and recommending phototherapy vs. exchange transfusion thresholds." },
            { title: "Neonatal Ventilator & Blood Gas (ABG) Tracking", text: "Logs invasive and non-invasive respiratory support parameters (HFOV, CPAP, High-Flow Nasal Cannula), arterial blood gas metrics (pH, pCO2, pO2, HCO3, base deficit), and calculates oxygenation indices (OI)." },
            { title: "Universal Newborn Screening & Hearing Test Log", text: "Tracks congenital hypothyroidism (TSH), G6PD deficiency, CAH screening, and Otoacoustic Emission (OAE) / BERA hearing screening results prior to hospital discharge." },
            { title: "Standardized High-Risk Neonatal Discharge Summary", text: "Auto-generates comprehensive NICU discharge summaries detailing birth weight, discharge weight, head ultrasound findings, ROP screening stages, and outpatient follow-up schedules." }
        ],
        workflowSteps: [
            { step: "Delivery & APGAR Scoring", desc: "Pediatrician records APGAR score at birth, weight, head circumference, and cord blood pH in the delivery room." },
            { step: "NICU Admission & Triage", desc: "Neonate admitted to NICU incubator; admission diagnoses, gestational age, and phototherapy orders logged." },
            { step: "Automated TPN Fluid Calculation", desc: "Doctor specifies target TFR (e.g. 120 ml/kg/day) and GIR (6 mg/kg/min); system calculates exact infusion rates." },
            { step: "Bilirubin Tracking & Phototherapy", desc: "Serum bilirubin is plotted on age-in-hours nomogram; phototherapy duration and irradiance levels are monitored." },
            { step: "ROP Screening & Discharge Summary", desc: "Retinopathy of Prematurity (ROP) eye exam results logged, and structured discharge summary dispatches to parents." }
        ],
        compliance: "Medical365 Neonatal Records comply with National Neonatology Forum (NNF) India accreditation standards, American Academy of Pediatrics (AAP) neonatal care guidelines, and WHO early essential newborn care (EENC) benchmarks.\n\nAll neonatal intensive care logs, maternal linkage records, and prescription data are encrypted under AES-256 compliant with the DPDP Act 2023. Newborn health summaries integrate directly with the Ayushman Bharat Digital Mission (ABDM).",
        table: [
            { feature: "TPN Calculation", manual: "Manual arithmetic on scrap paper; high risk of fatal glucose or electrolyte errors", m365: "Automated computerized TPN engine calculating exact ml/hr infusion rates" },
            { feature: "Jaundice Management", manual: "Looking up paper phototherapy charts or guessing based on visual skin color", m365: "Interactive Bhutani nomogram plotting bilirubin vs. exact postnatal hours" },
            { feature: "NICU Nursing Flowsheet", manual: "Heavy paper charts filled with hourly handwriting prone to missed entries", m365: "Real-time tablet-based digital flowsheet tracking vitals, feeds, and ventilator settings" },
            { feature: "Newborn Screening Tracking", manual: "Separate lab slips; congenital screening results easily lost or untracked", m365: "Centralized newborn screening dashboard tracking TSH, G6PD, and hearing test" },
            { feature: "Discharge Summary Generation", manual: "Hours spent manually writing complex multi-week NICU hospital course", m365: "Auto-generated structured discharge summary compiled in 2 minutes" }
        ],
        faqs: [
            { q: "How does the software calculate neonatal Glucose Infusion Rate (GIR)?", a: "The system computes GIR automatically: GIR (mg/kg/min) = [% Dextrose × Infusion Rate (ml/hr)] / [6 × Weight (kg)]. This ensures preterm infants maintain euglycemia without dangerous hypoglycemia or hyperosmolar spikes." },
            { q: "Can the module track Retinopathy of Prematurity (ROP) screening?", a: "Yes. The module enforces mandatory ROP screening schedules for infants born <34 weeks or <1750g, recording international classification of ROP (Zone I-III, Stage 1-5, Plus disease) and laser photocoagulation treatments." },
            { q: "Does the system support Kangaroo Mother Care (KMC) logging?", a: "Yes. Dedicated nursing fields log daily hours of Kangaroo Mother Care (skin-to-skin contact) and weight gain velocity (g/day), promoting evidence-based newborn care." },
            { q: "How are neonatal resuscitation medications calculated under emergency conditions?", a: "Medical365 includes a 1-click Neonatal Resuscitation Program (NRP) emergency drug guide based on the infant's birth weight, displaying exact volumes for Epinephrine (1:10,000), normal saline boluses, and Naloxone." },
            { q: "Can parents view their baby's weight gain and milestones while in the NICU?", a: "Yes. Hospitals can share daily weight progress charts, feeding milestones, and secure incubator photos with parents via the Medical365 parent mobile app, reducing parental anxiety." },
            { q: "Is the neonatal record linked with the mother's obstetric delivery history?", a: "Yes. The newborn's chart is automatically cross-referenced with the mother's obstetric file, providing immediate access to maternal blood group, antenatal steroid administration, and GBS status." }
        ]
    },

    "parent-communication": {
        cluster: "PEDIATRICS",
        title: "Pediatric Parent Communication Software | Child Clinic Portal | Medical365",
        h1: "Pediatric Parent Engagement & Digital Communication Software",
        metaDesc: "Medical365 pediatric parent communication software automates WhatsApp vaccine reminders, bilingual feeding guides, tele-triage & digital child health cards.",
        diagramTitle: "Pediatric Clinic to Parent Digital Communication Architecture",
        nodes: ["Pediatrician OPD Consultation", "Automated WhatsApp Bot Gateway", "Bilingual Child Care Handouts", "Parent Mobile Health Portal", "Emergency Tele-Triage & EMR"],
        color: "#0284c7",
        quickAnswer: "Pediatric parent communication software is an omnichannel parent engagement and clinical messaging module designed for child health clinics and pediatric hospitals. It automates bilingual WhatsApp vaccination reminders, delivers digital growth charts and e-prescriptions, provides verified age-specific feeding and illness advice, and offers secure tele-consultation triage for worried parents.",
        bgText: "Parental anxiety is an inseparable aspect of pediatric healthcare. In India, parents of infants and young children frequently struggle with confusing advice from family elders, internet misinformation, and late-night health dilemmas regarding fevers, teething, colic, and vaccinations. During outpatient clinic visits, stressed parents often absorb less than 40% of the verbal instructions provided by their pediatrician.\n\nIn conventional practice, communication between appointments is chaotic. Doctors are inundated with round-the-clock unorganized phone calls and personal WhatsApp messages from anxious parents asking 'what dose of paracetamol should I give?' or 'my baby has a rash, is it dangerous?'. Meanwhile, valuable educational guidance regarding exclusive breastfeeding, immunization, and fever management remains on paper pamphlets that are quickly discarded.\n\nMedical365's Parent Communication module transforms pediatric parent engagement through structured, automated digital channels. Powered by official WhatsApp Business API integration and a dedicated parent smartphone portal, Medical365 delivers verified pediatrician advice, automated recall reminders, bilingual nutrition guides, and triage protocols directly to parents' phones while protecting doctor work-life boundaries.",
        capabilities: [
            { title: "Official WhatsApp Business API Integration", text: "Dispatches automated appointment confirmations, vaccination recall alerts, growth milestone summaries, and digital prescriptions directly to parents' verified WhatsApp numbers." },
            { title: "Bilingual Pediatric Health & Feeding Handouts", text: "Pre-configured, illustrated health guides in English, Hindi, and regional languages covering newborn care, breastfeeding positions, complementary feeding schedules, and home fever management." },
            { title: "Automated Fever & Dehydration Triage Assistant", text: "Interactive symptom checker guiding parents through home triage for common complaints (fever, vomiting, diarrhea), alerting them to red-flag danger signs requiring urgent hospital care." },
            { title: "Digital Child Health Passport on Mobile App", text: "Provides parents with continuous 24/7 mobile access to their child's complete immunization record, blood group, allergies, past illnesses, and growth curves." },
            { title: "Protected Doctor-Parent Tele-Triage Messaging", text: "Enables parents to send structured clinical queries with photographs or videos through the clinic portal, allowing pediatricians to review and respond during designated clinic hours without sharing personal mobile numbers." },
            { title: "School Absence & Fitness Certificate Generator", text: "1-click generation of verifiable digital medical certificates for school absences due to chickenpox, mumps, viral illness, or sports fitness clearances with QR verification." }
        ],
        workflowSteps: [
            { step: "Consultation & Advice Finalization", desc: "Pediatrician finishes consultation; digital prescription, diet advice, and vaccination card auto-compile." },
            { step: "Instant WhatsApp Dispatch", desc: "Within seconds, an official WhatsApp message delivers PDF prescription, feeding guidelines, and next appointment date to parents." },
            { step: "Scheduled Milestone Alerts", desc: "System automatically schedules developmental tips and vaccination reminders timed to the child's exact age." },
            { step: "Parent Mobile App Access", desc: "Parents view interactive growth curves and vaccination records on their smartphone, sharing with family members." },
            { step: "Secure Communication & Triage", desc: "Parents submit non-emergency follow-up queries or rash photos through the portal, maintaining doctor privacy." }
        ],
        compliance: "Medical365 Parent Communication operates in full compliance with the Digital Personal Data Protection (DPDP) Act 2023, the Information Technology Act 2000, and National Medical Commission (NMC) Telemedicine Practice Guidelines.\n\nAll parental communications, child health records, and consent verifications are secured with AES-256 encryption. Patient summaries link to the Ayushman Bharat Health Account (ABHA).",
        table: [
            { feature: "Communication Channel", manual: "Unorganized personal WhatsApp messages and late-night phone calls to doctor", m365: "Official WhatsApp Business API and secure clinic portal with defined hours" },
            { feature: "Vaccine Reminders", manual: "Manual clinic phone calls or none; leading to high missed booster rates", m365: "Automated bilingual WhatsApp reminders sent 7 days and 1 day prior" },
            { feature: "Patient Education", manual: "Paper pamphlets lost or thrown away before parents read them", m365: "Digital illustrated feeding and fever care guides sent to parent smartphone" },
            { feature: "Child Record Access", manual: "Paper cards carried in physical files; damaged or lost over time", m365: "Permanent Digital Child Health Passport accessible anytime on mobile" },
            { feature: "Doctor Privacy", manual: "Doctor's personal phone number shared with thousands of parents", m365: "Protected clinic messaging preserving physician personal time and privacy" }
        ],
        faqs: [
            { q: "How does the WhatsApp integration protect the pediatrician's personal phone number?", a: "All automated reminders, prescriptions, and communications are routed through the clinic's official WhatsApp Business API account, so pediatricians never have to share their private personal mobile numbers with patients." },
            { q: "Can parents ask questions or send photos of rashes between visits?", a: "Yes. Parents can submit follow-up queries and photographs through the secure Medical365 clinic portal. The clinic can configure whether messages are free for 7 days post-visit or require a tele-consultation fee." },
            { q: "Are the educational handouts available in Indian regional languages?", a: "Yes. The module includes professionally translated educational materials in Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, and Kannada covering breastfeeding, weaning, immunization, and fever." },
            { q: "How does the system handle fever management advice for parents?", a: "The digital prescription includes an automated, weight-adjusted fever management box calculating the exact milliliter dose of paracetamol and safe dosing intervals (every 4-6 hours), preventing dangerous overdoses." },
            { q: "Can parents upload their child's external medical reports to the portal?", a: "Yes. Parents can photograph and upload past hospital discharge summaries, external blood tests, or previous vaccination records, organizing all child health documents in one secure cloud profile." },
            { q: "Is the child's communication data protected under Indian privacy laws?", a: "Yes. In full accordance with the DPDP Act 2023, parental consent is recorded for digital messaging, and all transmitted medical documents are encrypted end-to-end." }
        ]
    },

    // ══════════════════════════════════════════════════
    // OPHTHALMOLOGY (5 pages)
    // ══════════════════════════════════════════════════
    "vision-refraction-charts": {
        cluster: "OPHTHALMOLOGY",
        title: "Ophthalmic Vision & Refraction Software | Optometry EMR | Medical365",
        h1: "Ophthalmic Vision Testing & Refraction Charting Software",
        metaDesc: "Medical365 vision refraction software manages Snellen, LogMAR visual acuity, subjective refraction, autorefractor sync & optical prescription dispatch for eye clinics.",
        diagramTitle: "Ophthalmic Vision Testing & Refraction Workflow Architecture",
        nodes: ["Autorefractor Machine Ingestion", "Visual Acuity (Snellen / LogMAR)", "Subjective Refraction & Phoropter", "Ophthalmologist Slit Lamp Exam", "Optical Prescription & EMR Sync"],
        color: "#0d9488",
        quickAnswer: "Vision and refraction charting software is a core ophthalmology and optometry clinical documentation module. It manages visual acuity testing (Snellen, LogMAR, tumbling E), interfaces with autorefractor and lensmeter hardware, records subjective refraction parameters (Sphere, Cylinder, Axis, Addition, Prism), and auto-generates clean optical eyeglass prescriptions.",
        bgText: "Refractive errors—myopia, hyperopia, astigmatism, and presbyopia—are the single most prevalent cause of visual impairment in India, affecting over 300 million citizens. In high-volume Indian eye hospitals, optical retail chains, and private ophthalmology clinics, refraction testing constitutes the primary entry point for nearly every patient consultation.\n\nIn conventional eye clinics, recording refraction is notoriously prone to transcription errors. Optometrists examine patients using autorefractors and phoropters, then write prescription numbers on small paper chits (e.g., -2.50 DS / -0.75 DC × 90°). Transposing minus and plus signs, misreading handwritten cylinder axes by 10 degrees, or failing to record pupil distance (PD) leads to optical dispensing errors, customer dissatisfaction, and remade lenses.\n\nMedical365's Vision & Refraction module standardizes refractive documentation. Connecting directly with digital autorefractors, phoropters, and lensmeters, the software ingests objective measurements, structures subjective refraction charting with smart sign validators, computes transpupillary metrics, and produces legible digital optical prescriptions that patients can take to any optical shop or receive on WhatsApp.",
        capabilities: [
            { title: "Autorefractor & Digital Phoropter Integration", text: "Seamless serial, USB, and LAN connectivity with major ophthalmic hardware (Topcon, Nidek, Zeiss, Reichert, Canon), auto-importing objective sphere, cylinder, and axis." },
            { title: "Comprehensive Visual Acuity (VA) Charting", text: "Records uncorrected visual acuity (UCVA), best spectacle-corrected visual acuity (BSCVA), and pinhole acuity in Snellen (6/6 to 6/60, 20/20), LogMAR, or Decimal notation for distance and near." },
            { title: "Structured Subjective Refraction Grid", text: "Interactive, error-checked entry for Right Eye (OD) and Left Eye (OS): Sphere (±0.25 D steps), Cylinder, Axis (1° to 180°), Near Addition (+0.75 to +3.50 D), and Pupillary Distance (PD in mm)." },
            { title: "Prism & Contact Lens Specification Module", text: "Documents prism diopters (base up, down, in, out) for strabismus and records soft/RGP contact lens parameters: base curve (BC), diameter (DIA), brand, and replacement schedule." },
            { title: "Automated Transposition & Power Vector Calculation", text: "One-click conversion between plus-cylinder and minus-cylinder formats, with automated calculation of spherical equivalents for refractive surgery and intraocular lens (IOL) planning." },
            { title: "Branded Digital Eyeglass Prescription Dispatch", text: "Generates a clean, tamper-proof optical prescription with hospital logo, doctor digital signature, and lens advice (anti-reflective coating, blue filter, progressive lenses) sent via WhatsApp." }
        ],
        workflowSteps: [
            { step: "Autorefraction & Lensmeter Capture", desc: "Optometrist tests patient on autorefractor and measures existing glasses on digital lensmeter; data streams to EMR." },
            { step: "Visual Acuity Testing", desc: "Distance and near visual acuity recorded for each eye individually (OD, OS) and binocularly (OU)." },
            { step: "Subjective Refraction & Cross-Cylinder", desc: "Optometrist fine-tunes sphere and cylinder axis using Jackson cross-cylinder, confirming clearest comfortable vision." },
            { step: "Ophthalmologist Clinical Review", desc: "Eye specialist reviews refraction, conducts slit-lamp biomicroscopy and dilated fundus exam, and confirms spectacle advice." },
            { step: "Optical Prescription & Handout", desc: "Digital optical prescription prints, syncs to hospital optical counter, and dispatches to patient WhatsApp." }
        ],
        compliance: "Medical365 Vision & Refraction Charting conforms to the All India Ophthalmological Society (AIOS) clinical documentation guidelines and international ISO 13666 ophthalmic optics standards.\n\nAll vision records and clinical examination notes are protected under AES-256 encryption compliant with the DPDP Act 2023. Prescriptions comply with Indian electronic health record standards and link to ABDM health lockers.",
        table: [
            { feature: "Autorefractor Data Entry", manual: "Manual typing from paper printout slips; high risk of transposing numbers", m365: "Direct digital hardware import via serial/LAN into patient chart in 1 second" },
            { feature: "Prescription Legibility", manual: "Handwritten paper chits with easily misread signs (+ vs -) and axes", m365: "100% legible printed and digital optical prescription with verified formatting" },
            { feature: "Cylinder Transposition", manual: "Manual mathematical conversion between plus and minus cylinder", m365: "1-click automated algebraic transposition between plus and minus formats" },
            { feature: "Pupillary Distance Tracking", manual: "Often omitted or estimated by optical shop staff", m365: "Mandatory digital PD entry for accurate progressive lens manufacturing" },
            { feature: "Optical Shop Sync", manual: "Patient carries paper chit to optical counter; high re-entry errors", m365: "Instant digital synchronization with in-hospital optical dispensary billing" }
        ],
        faqs: [
            { q: "Which autorefractor and lensmeter brands can interface with Medical365?", a: "Medical365 supports all leading ophthalmic diagnostic brands utilized in India, including Topcon (KR series), Nidek (ARK series), Carl Zeiss (VISUREF), Reichert, Canon, and Potec via standard RS-232 serial or LAN protocols." },
            { q: "Can optometrists convert minus cylinder prescriptions to plus cylinder format?", a: "Yes. The interface features a 1-click 'Transpose' button that automatically recalculates sphere, cylinder, and axis between plus-cylinder and minus-cylinder conventions without calculation errors." },
            { q: "Does the software support pediatric visual acuity charts (Tumbling E, Lea Symbols)?", a: "Yes. The visual acuity selector includes options for Snellen letters, Tumbling E, Numbers, Lea Symbols, and Cardiff Acuity cards for pre-verbal children." },
            { q: "Can contact lens trial fittings and parameters be documented?", a: "Yes. The module includes a dedicated Contact Lens section recording base curve, diameter, power, movement on blink, push-up test tightness, and lens wear schedule." },
            { q: "Can patients receive their spectacle prescription via WhatsApp?", a: "Yes. Finalized optical prescriptions can be dispatched instantly to the patient's verified WhatsApp number as a professional PDF with the hospital branding and doctor's signature." },
            { q: "How does the system prevent prescription dispensing errors?", a: "The software enforces mandatory positive/negative sign selection and checks that cylinder axis values fall between 1° and 180°, preventing typographical submission of impossible optical values." }
        ]
    },

    "retina-imaging-integration": {
        cluster: "OPHTHALMOLOGY",
        title: "Retinal Imaging & Fundus PACS Software | Eye EMR India | Medical365",
        h1: "Retinal Imaging & Fundus Camera PACS Integration Software",
        metaDesc: "Medical365 retina imaging software connects fundus cameras & OCT scanners to eye hospital EMR. Diabetic retinopathy grading, macular thickness & ABDM compliant.",
        diagramTitle: "Retinal Imaging & Fundus OCT PACS Integration Pipeline",
        nodes: ["Fundus Camera & OCT Scanner", "Ophthalmic DICOM PACS Gateway", "Central Retinal Thickness Analysis", "Retina Specialist Annotation", "Treatment Plan & EMR Sync"],
        color: "#0d9488",
        quickAnswer: "Retinal imaging integration software is an advanced ophthalmic PACS and diagnostic documentation module. It connects fundus cameras, Optical Coherence Tomography (OCT) scanners, and fundus fluorescein angiography (FFA) machines directly to eye hospital EMR systems, supporting diabetic retinopathy grading, macular edema quantification, and choroidal neovascularization tracking.",
        bgText: "Diabetic retinopathy, age-related macular degeneration (AMD), and retinal vascular occlusions represent major causes of irreversible blindness across India. With India frequently termed the 'diabetes capital of the world', housing over 77 million diabetic patients, ophthalmic clinics and vitreo-retinal specialty hospitals manage an immense volume of retinal screening and treatment procedures daily.\n\nManaging retinal disease requires high-resolution multi-modal imaging: color fundus photographs, infrared reflectance, optical coherence tomography (OCT) cross-sections, and angiography sequences. In many eye hospitals, retinal imaging remains trapped on isolated diagnostic instrument hard drives. Vitreo-retinal surgeons must walk back and forth between laser rooms, injection cleanrooms, and imaging suites to review OCT B-scans or track changes in central subfield macular thickness.\n\nMedical365's Retinal Imaging Integration module unifies vitreo-retinal care by embedding a high-performance ophthalmic DICOM PACS viewer directly into the eye doctor's consultation view. Surgeons can review high-resolution fundus photos, compare serial OCT macular thickness maps over months of anti-VEGF injections, annotate retinal lesions, and plan targeted retinal laser photocoagulation.",
        capabilities: [
            { title: "Multi-Modal Retinal Imaging DICOM Integration", text: "Direct DICOM connectivity with fundus cameras, OCT machines, and FFA systems from Carl Zeiss (Cirrus/Visucam), Heidelberg Engineering (SPECTRALIS), Topcon (Maestro/Triton), and Optovue." },
            { title: "Standardized Diabetic Retinopathy (ETDRS) Grading", text: "Structured documentation of diabetic retinopathy severity based on International Clinical Diabetic Retinopathy Disease Severity Scales (No DR, Mild/Mod/Severe NPDR, PDR) and Diabetic Macular Edema (DME)." },
            { title: "Serial OCT Macular Thickness Trend Comparison", text: "Extracts central subfield thickness (CST in microns) and cube volumes from OCT scans, plotting longitudinal thickness trends to objectively evaluate response to anti-VEGF therapy (Ranibizumab, Aflibercept)." },
            { title: "Interactive Fundus Drawing & Lesion Annotation", text: "Digital fundus diagramming tool allowing retinal specialists to draw and color-code retinal findings (microaneurysms, hemorrhages, hard exudates, cotton wool spots, neovascularization, retinal tears) on a standard retinal schematic." },
            { title: "Intravitreal Injection Procedure Logging", text: "Documents intravitreal anti-VEGF and steroid injections: drug brand, batch number, eye (OD/OS), injection site (pars plana 3.5 vs 4.0 mm), pre/post-procedure IOP, and post-injection antibiotic drops." },
            { title: "Retinal Laser Photocoagulation Operative Records", text: "Records laser parameters for pan-retinal photocoagulation (PRP), focal/grid laser, and barrage laser: wavelength, spot size (microns), power (mW), pulse duration (ms), and total burn count." }
        ],
        workflowSteps: [
            { step: "Fundus Photography & OCT Acquisition", desc: "Optometrist or ophthalmic photographer captures fundus images and macular OCT scans on diagnostic cart." },
            { step: "Instant Cloud PACS Ingestion", desc: "High-resolution DICOM files stream across local network to Medical365 ophthalmic PACS vault within seconds." },
            { step: "Specialist Review & Thickness Tracking", desc: "Retina specialist reviews OCT B-scans, compares current CST with past scans, and grades diabetic retinopathy severity." },
            { step: "Treatment Indication & Execution", desc: "Doctor plans intravitreal anti-VEGF injection or retinal laser; procedure details and lot numbers are logged." },
            { step: "EMR Finalization & Follow-Up Alert", desc: "Annotated fundus images attach to patient record; next scheduled injection/review date sends to patient via WhatsApp." }
        ],
        compliance: "Medical365 Retinal Imaging Integration conforms to DICOM Supplement 91 (Ophthalmic Photography) and Supplement 110 (Ophthalmic Tomography), as well as Vitreo-Retina Society of India (VRSI) clinical guidelines.\n\nAll diagnostic imaging files and operative injection logs are secured with AES-256 encryption compliant with the DPDP Act 2023. Generated retinal health summaries integrate seamlessly with ABDM health lockers.",
        table: [
            { feature: "Image Viewing", manual: "Walking to the instrument workstation to view scans or printing paper sheets", m365: "Zero-footprint web DICOM viewer accessible from any consultation room" },
            { feature: "Macular Thickness Tracking", manual: "Comparing past paper printout sheets to see if central thickness decreased", m365: "Interactive visual timeline plotting CST (microns) across all injection visits" },
            { feature: "Retinal Diagramming", manual: "Hand-drawn sketches with colored pencils on physical paper charts", m365: "Digital fundus drawing tool with standardized ETDRS lesion color coding" },
            { feature: "Anti-VEGF Lot Tracking", manual: "Often unrecorded on paper notes; risk during drug safety alerts", m365: "Barcode scanning of anti-VEGF vial recording lot, brand, and serial number" },
            { feature: "Patient Education", manual: "Abstract verbal descriptions of retinal swelling", m365: "Side-by-side visual demonstration of OCT scans before and after treatment" }
        ],
        faqs: [
            { q: "Which OCT and fundus camera systems can connect to Medical365?", a: "Medical365 supports all major ophthalmic imaging modalities, including Carl Zeiss Cirrus OCT and Visucam, Heidelberg SPECTRALIS, Topcon Maestro 2 and Triton, Optovue Solix, and Canon retinal cameras via DICOM C-STORE protocols." },
            { q: "How does the software track response to anti-VEGF injections?", a: "The module extracts Central Subfield Thickness (CST) from sequential OCT scans and graphs them on a timeline alongside injection dates, allowing retina surgeons and patients to see tangible reductions in macular edema." },
            { q: "Can retina specialists draw fundus findings digitally?", a: "Yes. The interactive retinal canvas includes standardized color codes (red for retinal hemorrhages, yellow for hard exudates, blue for detached retina, black for laser scars) for documentation." },
            { q: "Does the system support Diabetic Retinopathy screening camps?", a: "Yes. In tele-ophthalmology and rural screening camps, non-mydriatic fundus cameras can capture photos that automatically upload to the Medical365 cloud, where remote vitreo-retinal specialists grade images and return triage reports." },
            { q: "How are intravitreal injection safety protocols enforced?", a: "The injection template includes safety checks verifying povidone-iodine antisepsis, post-injection central retinal artery perfusion, intraocular pressure (IOP) check, and sterile lot number capture." },
            { q: "Can patients view their retinal photos on their smartphones?", a: "Yes. High-resolution color fundus photographs and summary OCT scans can be shared securely with patients through the patient portal and WhatsApp, helping diabetic patients understand their disease." }
        ]
    },

    "eye-pressure-tracking": {
        cluster: "OPHTHALMOLOGY",
        title: "Glaucoma IOP Tracking Software | Goldmann Tonometry EMR | Medical365",
        h1: "Glaucoma Intraocular Pressure (IOP) Tracking & Tonometry Software",
        metaDesc: "Medical365 eye pressure tracking software plots Goldmann applanation tonometry trends, CCT corneal pachymetry corrections & visual field progression for eye clinics.",
        diagramTitle: "Glaucoma Intraocular Pressure (IOP) & Visual Field Surveillance",
        nodes: ["Tonometry IOP Measurement", "Central Corneal Thickness (CCT)", "Pachymetry-Adjusted IOP Calculation", "Glaucoma Specialist Target Review", "Longitudinal Trend & EMR Sync"],
        color: "#0d9488",
        quickAnswer: "Eye pressure tracking software is a specialized clinical glaucoma monitoring module that logs and graphs intraocular pressure (IOP) over time. It records Goldmann applanation tonometry, non-contact tonometry (NCT), and dynamic contour tonometry values, adjusts pressure readings for central corneal thickness (CCT pachymetry), and correlates longitudinal IOP control with visual field (HFA) progression.",
        bgText: "Glaucoma is the leading cause of irreversible blindness worldwide, often dubbed the 'silent thief of sight' because progressive optic nerve damage occurs painlessly without early symptoms. In India, an estimated 12 million people live with glaucoma, with over 90% of cases remaining undiagnosed in the community. For diagnosed patients, lifelong surveillance of intraocular pressure (IOP) is the only proven method to arrest disease progression.\n\nIn conventional eye clinic workflows, tracking glaucoma stability is challenging. A patient's pressure readings are scattered across dozens of handwritten consultation pages over years of visits. Glaucoma specialists must manually search old notes to answer critical questions: what was the untreated peak baseline IOP? What is the patient's target IOP? Has the current prostaglandin analog regimen achieved a 25-30% pressure reduction? Was the measured pressure adjusted for a thick (600 µm) or thin (480 µm) cornea?\n\nMedical365's Eye Pressure Tracking module transforms glaucoma management by plotting serial tonometry measurements into interactive longitudinal trend lines. Equipped with automated central corneal thickness (CCT) adjustment formulas, diurnal variation charting, and integrated Humphrey Visual Field (HFA) mean deviation tracking, Medical365 equips ophthalmologists to protect optic nerve health with precision.",
        capabilities: [
            { title: "Multi-Modality Tonometry Documentation", text: "Records intraocular pressure (in mmHg) measured via Goldmann Applanation Tonometry (GAT), Non-Contact Tonometry (NCT), Perkins tonometry, Tonopen, or iCare rebound tonometry." },
            { title: "Central Corneal Thickness (CCT) Adjustment Engine", text: "Automatically adjusts measured IOP based on ultrasound or optical corneal pachymetry readings using validated formulas (e.g. Dresden, Ehlers), preventing under-estimation in thin corneas." },
            { title: "Personalized Target IOP Benchmarking", text: "Enables clinicians to establish and visualize individualized Target IOP thresholds based on glaucoma severity (early, moderate, advanced) and baseline damage." },
            { title: "Diurnal Variation & Phasic Curve Tracking", text: "Charts multi-time-point IOP readings across a single day (e.g. 8 AM, 12 PM, 4 PM, 8 PM) to detect hazardous diurnal pressure spikes that occur outside routine OPD hours." },
            { title: "Antiglaucoma Medication Adherence & Regimen Log", text: "Correlates pressure reductions against specific topical hypotensive classes (Prostaglandin analogs, Beta-blockers, Carbonic anhydrase inhibitors, Alpha-2 agonists, Rho kinase inhibitors)." },
            { title: "Visual Field (HFA) Mean Deviation (MD) Correlation", text: "Plots visual field Mean Deviation (MD in dB) and Visual Field Index (VFI) progression slopes alongside the longitudinal IOP curve on a single unified screen." }
        ],
        workflowSteps: [
            { step: "Tonometry & Pachymetry Measurement", desc: "Optometrist or ophthalmologist measures IOP via Goldmann applanation and records corneal thickness." },
            { step: "Automated CCT Correction", desc: "Software computes pachymetry-adjusted IOP, highlighting whether the value falls within the patient's Target IOP zone." },
            { step: "Longitudinal Curve Visualization", desc: "During consultation, doctor reviews multi-year IOP trajectory graph showing pressure trends across drug changes." },
            { step: "Optic Disc & Visual Field Review", desc: "Doctor documents cup-to-disc ratio (CDR), neuroretinal rim thinning, and confirms visual field stability." },
            { step: "Therapy Adjustment & Recall Scheduling", desc: "Medications adjusted if target IOP is not achieved; automated WhatsApp recall scheduled for follow-up tonometry." }
        ],
        compliance: "Medical365 Eye Pressure Tracking aligns with the Glaucoma Society of India (GSI) guidelines, World Glaucoma Association (WGA) consensus, and MoHFW EHR standards.\n\nAll tonometry readings, pachymetry values, and visual field reports are secured under AES-256 encryption compliant with the DPDP Act 2023. Glaucoma registries link seamlessly with ABDM digital health summaries.",
        table: [
            { feature: "IOP Trend Analysis", manual: "Flipping through paper files trying to find past pressure readings", m365: "Interactive visual trend graph showing multi-year IOP trajectory in seconds" },
            { feature: "Corneal Thickness Correction", manual: "Mental calculation or ignored; risking misdiagnosing normal tension glaucoma", m365: "Automated CCT adjustment formula calculating true corrected IOP" },
            { feature: "Target IOP Tracking", manual: "Often unrecorded; no visual benchmark for therapeutic success", m365: "Visual target line overlaid on graph highlighting uncontrolled spikes" },
            { feature: "Diurnal Phasic Charting", manual: "Drawn on scrap paper or recorded on disconnected hospital bed charts", m365: "Standardized diurnal variation curve displaying peak-to-trough fluctuations" },
            { feature: "Drop Adherence Motivation", manual: "Verbal counseling with high patient non-compliance", m365: "Visual graphs shown to patient demonstrating how drops keep pressure safe" }
        ],
        faqs: [
            { q: "Why is Central Corneal Thickness (CCT) correction important in tonometry?", a: "Goldmann applanation tonometry is calibrated for a central corneal thickness of approximately 520 to 540 µm. A thin cornea artificially underestimates true eye pressure (masking severe glaucoma), while a thick cornea overestimates it. Medical365 automatically computes the adjusted IOP based on corneal pachymetry." },
            { q: "How does the software alert clinicians to glaucoma progression?", a: "If consecutive IOP readings exceed the patient's defined Target IOP or if Humphrey Visual Field Mean Deviation (MD) worsens by >1.5 dB/year, the software displays a visual alert recommending therapy escalation." },
            { q: "Can diurnal IOP variation curves be documented?", a: "Yes. The module includes a dedicated diurnal variation flowsheet logging serial pressure measurements throughout the day to detect nocturnal or early-morning spikes." },
            { q: "Does the system track surgical glaucoma procedures (trabeculectomy, valves)?", a: "Yes. Dedicated surgical templates track trabeculectomy with Mitomycin-C, Ahmed glaucoma valve implants, cyclophotocoagulation (CPC), and selective laser trabeculoplasty (SLT)." },
            { q: "Can patients receive automated eye drop refill and instillation reminders?", a: "Yes. The system can send automated daily WhatsApp reminders prompting patients to instill their evening prostaglandin drops, significantly improving therapeutic compliance." },
            { q: "Is the glaucoma data accessible across multi-specialty consultations?", a: "Yes. When a glaucoma patient sees an internist or cardiologist, the system flags the patient's eye pressure, alerting doctors to avoid systemic medications that can trigger acute angle closure or worsen open-angle glaucoma." }
        ]
    },

    "optical-prescription-mgt": {
        cluster: "OPHTHALMOLOGY",
        title: "Optical Prescription Management Software | Eye Clinic EMR | Medical365",
        h1: "Optical Prescription Management & Eyewear Dispensing Software",
        metaDesc: "Medical365 optical prescription management software streamlines spectacle Rx generation, lens material selection, inventory billing & WhatsApp dispatch for eye clinics.",
        diagramTitle: "Optical Prescription Generation & Dispensary Workflow Architecture",
        nodes: ["Optometrist Refraction Input", "Optical Lens Material Selector", "Optical Dispensary Billing Sync", "Digital Prescription Dispatch", "Inventory & Order Tracking"],
        color: "#0d9488",
        quickAnswer: "Optical prescription management software is a specialized ophthalmic dispensing and retail coordination module. It bridges the clinical optometrist's refraction findings with the hospital optical dispensary, managing lens designs (single vision, bifocal, progressive), index materials, lens coatings (blue cut, anti-glare, photochromic), optical frame inventory, and automated digital prescription dispatch.",
        bgText: "In eye care hospitals and optometry clinics, the optical dispensary represents both a vital patient service and a significant source of institutional revenue. Over 60% of outpatient eye consultations result in a recommendation for corrective eyeglasses or contact lenses.\n\nIn conventional hospital environments, the handoff between the clinical examination chamber and the optical shop is fragmented. Doctors write prescriptions on paper slips that patients carry to the dispensary counter. Optical staff must manually re-type the sphere, cylinder, axis, and pupillary distance into separate billing software. Inevitably, typos occur: an axis of 95° is typed as 65°, or a plus cylinder is entered as a minus cylinder, resulting in wrongly ground lenses, customer disputes, and costly remakes.\n\nMedical365's Optical Prescription Management module integrates clinical optometry with optical dispensary operations. The moment an optometrist or ophthalmologist signs off an eyeglass prescription, it appears instantly on the optical dispensary's counter dashboard. Dispensary staff select matching lens blanks, apply coatings, track frame barcodes, and bill the order in one seamless, error-free workflow.",
        capabilities: [
            { title: "Direct Refraction-to-Dispensary Synchronization", text: "Instantly transfers completed refractive parameters (OD/OS Sphere, Cylinder, Axis, Addition, Prism, PD) from the doctor's screen to the optical shop counter terminal." },
            { title: "Comprehensive Lens Design & Material Catalog", text: "Pre-configured catalogs for Single Vision, Kryptok/D-Bifocal, and Progressive Addition Lenses (PAL) across refractive index materials (CR-39 1.498, Polycarbonate 1.59, Hi-Index 1.60, 1.67, 1.74)." },
            { title: "Optical Coating & Treatment Specifications", text: "Structured selection for specialized lens treatments: Anti-Reflective Coating (ARC), Blue Light Blocking, Photochromic (Transitions), Hydrophobic, and Polarized sunglasses." },
            { title: "Frame Inventory Barcode Scanning & POS Billing", text: "Integrates barcode scanning for spectacle frames, sunglasses, and contact lens boxes, tracking stock levels, brand names, model numbers, and retail pricing." },
            { title: "Automated Lab Order Tracking & Status Alerts", text: "Tracks spectacle manufacturing stages: Order Sent to Lab, Surface Grinding, Edging & Fitting, Quality Inspection, and Ready for Delivery, with automated SMS/WhatsApp alerts to the patient." },
            { title: "Official Digital Prescription & Warranty Card", text: "Generates branded digital prescriptions with doctor signature, optician stamp, and optical warranty terms accessible on the patient's smartphone." }
        ],
        workflowSteps: [
            { step: "Refraction Confirmation", desc: "Optometrist completes subjective refraction, verifies binocular balance, and signs optical prescription in EMR." },
            { step: "Optical Dispensary Handoff", desc: "Prescription appears instantly on the optical shop queue; optician guides patient through frame and lens selection." },
            { step: "Barcode Frame & Lens Selection", desc: "Optician scans selected frame barcode; software calculates total package price with insurance or discount rules." },
            { step: "Lab Order & SMS Alert", desc: "Job order dispatches to surfacing laboratory; automated SMS confirms estimated delivery date to patient." },
            { step: "Fitting, Quality Check & Delivery", desc: "Fitted glasses verified on lensmeter, dispensed to patient, and digital prescription dispatches via WhatsApp." }
        ],
        compliance: "Medical365 Optical Prescription Management conforms to international ophthalmic optics standards (ISO 8980 for spectacle lenses, ISO 13666 for optical terminology) and MoHFW EHR guidelines.\n\nAll prescription records, transaction histories, and inventory logs are secured with AES-256 encryption compliant with the DPDP Act 2023. Digital prescriptions integrate seamlessly with ABDM digital health records.",
        table: [
            { feature: "Data Transfer to Optical Shop", manual: "Patient carries paper slip; staff re-types numbers into billing machine", m365: "Instant electronic sync from doctor's desk to optical counter terminal" },
            { feature: "Typographical Errors", manual: "High risk of transposing signs (+ vs -) or axis numbers causing lens remakes", m365: "Zero transcription error; direct automated transfer of verified clinical data" },
            { feature: "Manufacturing Order Tracking", manual: "Calling lab on phone to check status; patients arrive to unready glasses", m365: "Digital status board tracking surfacing, fitting, and delivery with SMS alerts" },
            { feature: "Frame Inventory Management", manual: "Manual stock register books; frequent stock shrinkage and missing models", m365: "Barcode scanner tracking frame stock levels, re-order points, and sales" },
            { feature: "Patient Prescription Access", manual: "Paper card easily lost; patient must return to hospital for duplicate", m365: "Permanent digital prescription stored on patient WhatsApp and portal" }
        ],
        faqs: [
            { q: "How does the system eliminate communication errors between doctors and opticians?", a: "Because Medical365 operates on a unified database, the optical dispensary sees the exact parameters entered by the doctor without manual re-entry. Any transposition or adjustment made by the optician requires digital confirmation, preventing lens grinding errors." },
            { q: "Can the module manage multiple optical store branches across a hospital network?", a: "Yes. The software supports multi-location optical chains, tracking frame inventory, lab transfers, and sales revenue across individual hospital counters and standalone retail outlets." },
            { q: "Does the system support Progressive Addition Lens (PAL) fitting measurements?", a: "Yes. Dedicated fields capture fitting height (segment height in mm), monocular pupillary distance (Mono PD), pantoscopic tilt, and vertex distance for precision progressive lens dispensing." },
            { q: "How are laboratory job slips generated for external lens surfacing labs?", a: "The module generates standardized electronic lab job orders with complete power specifications, diameter requirements, edging bevel instructions, and tint codes ready for email or direct lab portal integration." },
            { q: "Can patients track the manufacturing status of their glasses?", a: "Yes. When the laboratory finishes edging and fitting, the system automatically sends a WhatsApp message notifying the patient that their spectacles are ready for collection and trial." },
            { q: "Is GST billing supported for optical frames, lenses, and contact lenses?", a: "Yes. The module supports compliant Indian GST invoicing with pre-configured HSN codes and tax slabs for ophthalmic lenses, frames, sunglasses, and contact lens solutions." }
        ]
    },

    "lasik-surgery-records": {
        cluster: "OPHTHALMOLOGY",
        title: "LASIK & Refractive Surgery Software | Corneal EMR India | Medical365",
        h1: "LASIK & Corneal Refractive Surgery Documentation Software",
        metaDesc: "Medical365 LASIK surgery software manages corneal topography, pachymetry, ablation depth calculations, SMILE/Femto logs & post-refractive follow-up for eye centers.",
        diagramTitle: "Corneal Refractive Surgery & LASIK Clinical Lifecycle",
        nodes: ["Pre-Op Refractive & Topography Workup", "Pachymetry & Residual Bed Calculator", "Excimer / Femtosecond Laser Plan", "Intra-Operative Flap & Ablation Log", "Post-Op Visual Recovery EMR"],
        color: "#0d9488",
        quickAnswer: "LASIK surgery records software is a specialized refractive surgery documentation and clinical safety module designed for laser refractive centers. It structures pre-operative screening (Pentacam/Sirius topography, corneal pachymetry, pupil dynamics), calculates Residual Stromal Bed (RSB) thickness to prevent ectasia, logs excimer and femtosecond laser parameters (Femto-LASIK, SMILE, PRK), and tracks post-operative visual recovery.",
        bgText: "Corneal refractive surgery—spanning Femto-LASIK, SMILE (Small Incision Lenticule Extraction), and Photorefractive Keratectomy (PRK)—is among the most popular elective surgical procedures in modern ophthalmology. Young adult patients seek complete spectacle independence for career, social, and aesthetic reasons.\n\nHowever, refractive surgery carries immense medico-legal and clinical responsibility. Operating on an eye with subclinical keratoconus, insufficient corneal thickness, or an inadequate residual stromal bed (RSB) can lead to catastrophic post-LASIK corneal ectasia, irregular astigmatism, and permanent vision loss. In conventional eye centers, pre-operative workup data is scattered across multiple diagnostic devices: corneal topographers, anterior segment OCTs, specular microscopes, and aberrometers.\n\nMedical365's LASIK Surgery module integrates pre-operative safety screening, laser ablation planning, and post-operative monitoring into a unified digital environment. Featuring automated percent tissue altered (PTA) calculations, residual bed safety checks, flap thickness logs, and standardized informed consent documentation, Medical365 ensures uncompromised patient safety and pristine surgical outcomes.",
        capabilities: [
            { title: "Comprehensive Pre-Op Corneal Topography Screening", text: "Structured documentation of corneal tomography parameters: Keratometry (K1, K2, Kmax), anterior/posterior elevation, pachymetry at thinnest point, Belin-Ambrósio ectasia display (BAD-D), and white-to-white (WTW)." },
            { title: "Automated Residual Stromal Bed (RSB) & PTA Calculator", text: "Automatically calculates Residual Stromal Bed (RSB = Pre-op CCT - Flap Thickness - Ablation Depth) and Percent Tissue Altered (PTA), alerting surgeons if RSB falls below 250-300 µm or PTA exceeds 40%." },
            { title: "Multi-Platform Refractive Procedure Support", text: "Pre-configured operative templates for Femto-LASIK (femtosecond flap creation + excimer ablation), SMILE / CLEAR (lenticule extraction), PRK, Trans-PRK, and Phakic IOL (ICL) implantation." },
            { title: "Laser Machine Parameter & Energy Logging", text: "Records excimer and femtosecond laser settings: optical zone diameter (mm), transition zone, ablation depth (µm), hinge position, flap diameter, pulse energy, and track/spot spacing." },
            { title: "Comprehensive Refractive Informed Consent Module", text: "Digital informed consent capture covering dry eyes, glare, halos, starbursts, under/over-correction risks, and touch-up enhancement policies with electronic signatures." },
            { title: "Longitudinal Uncorrected Visual Acuity (UCVA) Tracking", text: "Tracks post-op recovery at Day 1, Week 1, Month 1, Month 3, and Year 1, plotting visual acuity gains, flap adherence, corneal clarity, and dry eye tear breakup time (TBUT)." }
        ],
        workflowSteps: [
            { step: "Pre-Op Diagnostic Workup", desc: "Optometrist completes cycloplegic refraction, topography (Pentacam), specular microscopy, and dry eye evaluation." },
            { step: "Ablation & Safety Calculation", desc: "Software computes ablation depth, flap thickness, and verifies RSB >300 µm and PTA <40% for safety clearance." },
            { step: "Laser Planning & Patient Consent", desc: "Surgeon plans customized wavefront/topo-guided profile; patient signs digital informed consent on tablet." },
            { step: "Intra-Operative Laser Execution", desc: "Femtosecond flap creation and excimer ablation parameters are logged in the laser suite operative note." },
            { step: "Post-Op Slit Lamp Follow-Up", desc: "Day-1 check verifies flap alignment and 6/6 uncorrected vision; post-op steroid and tear drops are prescribed." }
        ],
        compliance: "Medical365 LASIK Surgery Records conform to the International Society of Refractive Surgery (ISRS), American Academy of Ophthalmology (AAO) Preferred Practice Patterns, and AIOS refractive guidelines.\n\nAll pre-operative corneal diagnostic scans, laser calculation logs, and digital informed consents are encrypted under AES-256 compliant with the DPDP Act 2023. Refractive operative summaries link to ABDM health lockers.",
        table: [
            { feature: "Ectasia Risk Calculation", manual: "Manual arithmetic calculating residual bed prone to calculation errors", m365: "Automated RSB and PTA calculation with prominent safety threshold alerts" },
            { feature: "Diagnostic Data Integration", manual: "Flipping through paper printouts from Pentacam, pachymetry, and refraction", m365: "Unified pre-op refractive dashboard consolidating all parameters on one screen" },
            { feature: "Laser Parameter Logging", manual: "Handwritten operative notes often omitting optical zone or ablation depth", m365: "Structured operative log recording flap thickness, optical zone, and energy" },
            { feature: "Informed Consent Security", manual: "Paper consent forms easily misplaced or disputed during litigation", m365: "Legally binding digital informed consent with biometric/tablet signature" },
            { feature: "Post-Op Outcome Audit", manual: "Difficult to track percentage of patients achieving 20/20 vision", m365: "Automated surgical outcome analytics tracking refractive accuracy and safety" }
        ],
        faqs: [
            { q: "How does the software prevent post-LASIK corneal ectasia?", a: "Medical365 enforces strict safety calculation rules: it computes the Residual Stromal Bed (RSB) and Percent Tissue Altered (PTA). If the calculated RSB is less than 300 µm or if PTA exceeds 40%, the system triggers an amber/red warning prompting consideration of PRK or Phakic IOLs." },
            { q: "Which refractive laser systems can be documented?", a: "Medical365 includes pre-configured parameter templates for all leading laser systems: Alcon Wavelight (EX500, FS200), Carl Zeiss VisuMax (SMILE) and MEL 90, Schwind Amaris / ATOS, and Johnson & Johnson iFS / STAR S4." },
            { q: "Does the module support Phakic Intraocular Lens (ICL) documentation?", a: "Yes. For high myopes unsuitable for LASIK, the software includes a dedicated ICL module tracking anterior chamber depth (ACD), endothelial cell density (ECD), white-to-white (WTW), and post-op vault height." },
            { q: "Can corneal topography images and Pentacam maps be stored?", a: "Yes. Anterior and posterior elevation maps, pachymetry maps, and sagittal curvature maps can be uploaded and viewed side-by-side in the patient's refractive surgical chart." },
            { q: "How are post-operative dry eye and visual quality symptoms tracked?", a: "Post-operative follow-up forms track tear breakup time (TBUT), corneal staining, and subjective patient-reported visual symptoms (halos, glare, night driving comfort) across recovery visits." },
            { q: "Are the digital informed consent records legally valid under Indian law?", a: "Yes. Digital informed consent forms comply with the Indian Information Technology Act 2000 and National Medical Commission guidelines, incorporating timestamped electronic signatures and audit trails." }
        ]
    }
};

const done = buildPages(pedsEyeData, repoRoot, diagramDir);
console.log(`=== BATCH 2B SUCCESS: Generated ${done} Pediatrics & Ophthalmology pages! ===`);


module.exports = pedsEyeData;
