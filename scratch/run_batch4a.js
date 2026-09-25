const path = require('path');
const { buildPages } = require('./page_builder_engine.js');

const repoRoot = path.resolve(__dirname, '..');
const diagramDir = path.join(repoRoot, 'images/diagrams');

console.log('=== EXECUTING BATCH 4A: OB/GYN (5) + PSYCHIATRY (4) + SECURITY (1) = 10 PAGES ===');

const batch4aData = {
    // ══════════════════════════════════════════════════
    // OB/GYN (5 pages)
    // ══════════════════════════════════════════════════
    "antenatal-care-records": {
        cluster: "GYNECOLOGY",
        title: "Antenatal Care (ANC) Software | Obstetric EMR India | Medical365",
        h1: "Antenatal Care (ANC) & High-Risk Pregnancy Management Software",
        metaDesc: "Medical365 antenatal care software manages gestational age, EDD calculation, trimester lab profiles, fetal growth & high-risk pregnancy screening for maternity hospitals.",
        diagramTitle: "Antenatal Care (ANC) Clinical Surveillance & Trimester Pipeline",
        nodes: ["First Trimester Registration & EDD", "Trimester Lab Screening & Anemia Check", "Symphysio-Fundal Height & FHR Tracking", "High-Risk Pregnancy Flagging (PIH/GDM)", "Delivery Plan & Mother-Child Protection Sync"],
        color: "#be185d",
        quickAnswer: "Antenatal care (ANC) software is a specialized clinical obstetrics module that tracks maternal and fetal health from conception through delivery. It automates Estimated Date of Delivery (EDD) calculations using Naegele's rule, manages trimester-specific screening visits, records symphysio-fundal height and fetal heart rate (FHR), screens for gestational diabetes and pre-eclampsia, and integrates with national mother-child protection registers.",
        bgText: "Antenatal care is the cornerstone of maternal and child survival. In India, maternal mortality and neonatal morbidity remain major public health priorities. Every pregnancy requires structured, compassionate, and meticulous clinical surveillance to ensure maternal well-being, detect hypertensive disorders of pregnancy, prevent maternal anemia, and monitor fetal growth.\n\nIn conventional maternity hospitals and obstetric clinics, antenatal tracking is burdened by fragmented paper cards. Expectant mothers carry paper ANC booklets that are easily lost, stained, or torn. Obstetricians must manually calculate gestational age in weeks and days from the Last Menstrual Period (LMP), calculate Expected Date of Delivery (EDD), and navigate separate lab registers for hemoglobin, blood group, Rh antibody titers, OGTT blood sugars, and VDRL/HIV serologies. Subtle warning signs—such as a plateauing fundal height curve indicating intrauterine growth restriction (IUGR) or creeping systolic blood pressure—frequently escape notice during high-volume OPD clinics.\n\nMedical365's Antenatal Care module digitizes the entire obstetric journey. Automatically computing gestational age, plotting fundal height and maternal weight gain against gestational weeks, flagging high-risk factors (PIH, gestational diabetes, previous LSCS, Rh-negative pregnancy), and generating trimester milestone checklists, Medical365 ensures safe motherhood and healthy newborns.",
        capabilities: [
            { title: "Automated EDD & Gestational Age Calculator", text: "Calculates Estimated Date of Delivery (EDD) using Naegele's rule from verified LMP or dating ultrasound, automatically updating gestational age in exact weeks and days at every clinical contact." },
            { title: "Trimester-Specific Standardized Visit Protocols", text: "Pre-configured visit checklists for First (up to 12w), Second (13-28w), and Third (29-40w) trimesters tracking maternal weight gain, blood pressure, urine albumin/sugar, and pedal edema." },
            { title: "Symphysio-Fundal Height (SFH) & Fetal Heart Tracking", text: "Plots SFH in centimeters against gestational age from 20 weeks onward, logging fetal heart rate (FHR via Doppler/Fetoscope) and fetal presentation/lie." },
            { title: "High-Risk Pregnancy (HRP) Automated Flagging", text: "Surveillance engine flagging maternal risk factors: Gestational Diabetes Mellitus (DIPSI criteria), Pregnancy-Induced Hypertension / Preeclampsia, severe anemia (Hb <7 g/dL), placenta previa, and twin gestation." },
            { title: "Comprehensive Antenatal Lab & Serology Grid", text: "Structured capture of complete obstetric laboratory panels: ABO/Rh typing, ICT antibody screening for Rh-negative mothers, Rubella IgG, Thalassemia HPLC screening, TSH, and double/quadruple marker screening." },
            { title: "Digital Mother-Child Protection (MCP) Card Integration", text: "Auto-generates a bilingual digital Mother & Child Protection passport with QR code, emergency contact numbers, and delivery preparedness guides shared via WhatsApp." }
        ],
        workflowSteps: [
            { step: "LMP Entry & Baseline Dating", desc: "Obstetrician inputs LMP; software computes EDD and baseline dating ultrasound concordance." },
            { step: "Trimester Screening & Vitals", desc: "Nurse records maternal weight, BP, and urine dipstick; system alerts if BP exceeds 140/90 mmHg." },
            { step: "Fetal Assessment & SFH Plotting", desc: "Doctor measures fundal height, listens to fetal heart sounds, and logs fetal movement counts." },
            { step: "High-Risk Stratification", desc: "If oral glucose tolerance (OGTT) or Doppler is abnormal, patient chart auto-flags as High-Risk Pregnancy." },
            { step: "Care Plan & Mother WhatsApp Dispatch", desc: "Iron-folic acid, calcium prescriptions, diet advice, and warning signs dispatch to mother's phone." }
        ],
        compliance: "Medical365 Antenatal Care complies with Federation of Obstetric and Gynaecological Societies of India (FOGSI) guidelines, WHO ANC recommendations, and Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA) norms.\n\nAll maternal health records, serology results, and ultrasound links are protected under AES-256 encryption compliant with the DPDP Act 2023. Maternal profiles link to Ayushman Bharat Health Accounts (ABHA).",
        table: [
            { feature: "Gestational Age Calculation", manual: "Mental arithmetic or cardboard pregnancy wheels; frequent calculation errors", m365: "Instant automated calculation of exact gestational weeks and days" },
            { feature: "High-Risk Pregnancy Flagging", manual: "Subjective assessment; subtle risk factors easily overlooked in crowded OPDs", m365: "Automated color-coded HRP banner highlighting GDM, PIH, and anemia" },
            { feature: "Fundal Height Monitoring", manual: "Written as rough numbers; difficult to detect IUGR plateauing", m365: "Interactive SFH growth curve plotted against gestational age norms" },
            { feature: "Lab Result Organization", manual: "Loose paper lab slips scattered across physical obstetric files", m365: "Unified longitudinal trimester lab grid tracking Hb, OGTT, and serologies" },
            { feature: "Emergency Delivery Preparedness", manual: "Verbal advice; family often panicked during sudden labor onset", m365: "Digital delivery plan detailing hospital bag, blood donors, and emergency hotline" }
        ],
        faqs: [
            { q: "How does the software calculate EDD when LMP and Ultrasound dates differ?", a: "Medical365 follows ACOG and FOGSI dating guidelines: if the dating ultrasound performed in the first trimester differs from LMP by more than 5 to 7 days, the software prompts the obstetrician to adopt the ultrasound EDD as the definitive clinical benchmark." },
            { q: "How does the system screen for Gestational Diabetes Mellitus (GDM)?", a: "The module supports the DIPSI (Diabetes in Pregnancy Study Group India) non-fasting 75g glucose challenge test as well as standard 2-hour fasting OGTT, automatically flagging values ≥140 mg/dL for dietary counseling or insulin therapy." },
            { q: "Can the software track Rh-negative pregnancies and Anti-D administration?", a: "Yes. For Rh-negative mothers, the system tracks Indirect Coombs Test (ICT) antibody titers at 24-28 weeks and generates automated reminders for prophylactic Anti-D immunoglobulin injection." },
            { q: "Does the system support government initiatives like PMSMA?", a: "Yes. The module includes dedicated reporting templates for the Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA), tagging high-risk pregnancies evaluated on the 9th of every month." },
            { q: "Can expectant mothers track fetal kicks on their smartphones?", a: "Yes. Mothers can use the Medical365 patient app's interactive 'Kick Counter' to record daily fetal movements (Cardiff 'Count to 10'), with automatic alerts if fetal movements drop significantly." },
            { q: "Are emergency obstetric danger signs shared with the family?", a: "Yes. The digital ANC summary sent via WhatsApp includes clear, illustrated danger signs (severe headache, blurring of vision, vaginal bleeding, leaking fluid) prompting immediate hospital visit." }
        ]
    },

    "pregnancy-tracking": {
        cluster: "GYNECOLOGY",
        title: "Pregnancy Tracking & Trimester Care Software | Maternity EMR | Medical365",
        h1: "Comprehensive Pregnancy Journey & Fetal Growth Tracking Software",
        metaDesc: "Medical365 pregnancy tracking software manages week-by-week fetal growth, maternal nutrition, prenatal screening milestones & kick counters for maternity clinics.",
        diagramTitle: "Longitudinal Pregnancy Journey & Fetal Growth Monitoring Architecture",
        nodes: ["Pregnancy Conception & Dating", "Week-by-Week Fetal Milestone Tracker", "Maternal Nutrition & Weight Curve", "Prenatal Screening (NT / Anomaly / Doppler)", "Birth Readiness & Delivery Sync"],
        color: "#be185d",
        quickAnswer: "Pregnancy tracking software is an interactive maternal-fetal surveillance and patient engagement module. It monitors pregnancy progress week-by-week (from 4 to 40 weeks), coordinates essential prenatal screening milestones (NT scan, Quadruple marker, TIFFA anomaly scan, Growth Doppler), logs maternal gestational weight gain, and provides educational fetal development updates to parents.",
        bgText: "A pregnancy is a transformative 40-week physiological journey requiring continuous medical monitoring and empathetic patient education. In modern obstetrics, expectant parents desire active engagement in their prenatal care: understanding fetal organ development, knowing which genetic screenings are due, maintaining balanced nutrition, and recognizing normal pregnancy symptoms versus clinical emergencies.\n\nIn conventional Indian maternity practices, communication between monthly appointments is minimal. Mothers receive generic advice during brief clinic visits, while vital screening windows—such as the 11-13 week Nuchal Translucency (NT) scan or the 18-20 week Target Scan (TIFFA)—are occasionally missed due to scheduling oversights. Furthermore, excessive or inadequate gestational weight gain, which strongly influences birth weight and preeclampsia risk, is rarely tracked against body mass index (BMI) benchmarks.\n\nMedical365's Pregnancy Tracking module combines comprehensive obstetric clinical charting with an interactive digital pregnancy journey for mothers. Clinicians gain automated clinical milestone alerts, standardized anomaly scan trackers, and customized nutrition planners, while expectant parents receive week-by-week fetal development animations, kick counter logs, and appointment reminders on their smartphones.",
        capabilities: [
            { title: "Week-by-Week Fetal Development & Clinical Milestones", text: "Interactive 40-week obstetric roadmap tracking organogenesis, fetal size benchmarks (weight in grams, crown-rump length CRL), and physiological maternal changes." },
            { title: "Mandatory Prenatal Screening Window Scheduler", text: "Enforces timely scheduling of critical prenatal investigations: First Trimester Combined Screening / NT scan (11-13w6d), TIFFA Anomaly Scan (18-20w), Gestational Diabetes OGTT (24-28w), and Fetal Growth Doppler (32-36w)." },
            { title: "Institute of Medicine (IOM) Gestational Weight Gain Tracker", text: "Plots maternal weight gain curves against pre-pregnancy BMI guidelines (underweight, normal, overweight, obese), preventing excessive weight gain and fetal macrosomia." },
            { title: "Interactive Fetal Kick Counter & Movement Diary", text: "Digital kick counter on the patient mobile app allowing mothers to record fetal movements daily, triggering automated clinical notifications if movement falls below safety thresholds." },
            { title: "Bilingual Antenatal Diet & Exercise Planner", text: "Provides trimester-specific Indian dietary guidance (iron, calcium, protein-rich vegetarian/non-vegetarian diets, folic acid) and safe prenatal yoga/pelvic floor exercise videos." },
            { title: "Birth Plan & Labor Preparedness Module", text: "Structures patient preferences for labor and delivery: companion in labor room, pain relief options (epidural), cord clamping preferences, and immediate skin-to-skin contact." }
        ],
        workflowSteps: [
            { step: "Pregnancy Journey Initiation", desc: "Obstetrician confirms intrauterine pregnancy; personalized 40-week timeline activates in patient portal." },
            { step: "Screening Window Alerts", desc: "System triggers automated WhatsApp reminders when the patient enters optimal windows for NT and TIFFA scans." },
            { step: "Maternal Weight & Vitals Tracking", desc: "Weight gain is plotted against IOM curves at every antenatal checkup; diet adjustments recommended if gain is abnormal." },
            { step: "Third Trimester Fetal Movement Monitoring", desc: "From 28 weeks, mother records daily fetal kick counts on smartphone app; data syncs to doctor dashboard." },
            { step: "Birth Plan Finalization", desc: "At 36 weeks, obstetrician reviews birth plan, mode of delivery considerations, and coordinates hospital admission bag." }
        ],
        compliance: "Medical365 Pregnancy Tracking adheres to FOGSI clinical protocols, American College of Obstetricians and Gynecologists (ACOG) guidelines, and Indian Pre-Conception and Pre-Natal Diagnostic Techniques (PC-PNDT) Act regulations.\n\nAll patient records, fetal measurements, and personal health diaries are encrypted under AES-256 compliant with the DPDP Act 2023. Pregnancy summaries link to ABDM digital health lockers.",
        table: [
            { feature: "Milestone Scheduling", manual: "Relying on patient memory; critical anomaly scan windows sometimes missed", m365: "Automated calendar scheduling exact optimal dates for NT and TIFFA scans" },
            { feature: "Fetal Growth Visualization", manual: "Abstract millimeter numbers in ultrasound reports", m365: "Visual week-by-week fetal growth comparisons and weight percentiles" },
            { feature: "Maternal Weight Gain", manual: "Weight noted on paper file without reference to pre-pregnancy BMI", m365: "Interactive IOM curve plotting weight gain against individualized BMI goals" },
            { feature: "Fetal Movement Tracking", manual: "Paper kick chart slips; prone to irregular logging and loss", m365: "One-touch smartphone kick counter with automated alert on decreased movement" },
            { feature: "Patient Engagement", manual: "Anxious parents searching unverified internet forums for pregnancy advice", m365: "Verified obstetrician-curated educational articles and video guides on mobile app" }
        ],
        faqs: [
            { q: "How does the software enforce compliance with the PC-PNDT Act in India?", a: "Medical365 strictly complies with the Pre-Conception and Pre-Natal Diagnostic Techniques (PC-PNDT) Act 1994. The software strictly prohibits and prevents any documentation, recording, or disclosure of fetal sex or gender, maintaining tamper-proof audit trails for all ultrasound orders." },
            { q: "What is the optimal gestational age window for the TIFFA anomaly scan?", a: "The software schedules the Targeted Imaging for Fetal Anomalies (TIFFA) scan between 18 weeks 0 days and 20 weeks 6 days of gestation, dispatching automated alerts to ensure the scan is completed before the statutory 24-week legal limit under the MTP Act." },
            { q: "Can the software calculate customized maternal weight gain targets?", a: "Yes. Based on the mother's pre-pregnancy Body Mass Index (BMI), the system sets individualized target ranges: 12.5-18 kg for underweight, 11.5-16 kg for normal BMI, 7-11.5 kg for overweight, and 5-9 kg for obese mothers." },
            { q: "Can mothers log their blood pressure readings from home?", a: "Yes. Mothers with gestational hypertension can log daily home blood pressure readings into the patient app, which immediately highlights in amber or red on the obstetrician's dashboard if BP exceeds safe limits." },
            { q: "Are the educational pregnancy articles available in Indian languages?", a: "Yes. Week-by-week fetal growth guides and nutritional advice are available in English, Hindi, Bengali, Tamil, Telugu, Marathi, and Gujarati." },
            { q: "Can both parents share access to the pregnancy tracking app?", a: "Yes. Mothers can grant secure shared access to their spouse or family members, allowing both parents to track kick counts, view ultrasound milestones, and attend appointments together." }
        ]
    },

    "delivery-records": {
        cluster: "GYNECOLOGY",
        title: "Labor & Delivery Records Software | Maternity Hospital EMR | Medical365",
        h1: "Labor Room & Obstetric Delivery Documentation Software",
        metaDesc: "Medical365 delivery records software manages WHO modified partographs, vaginal/cesarean operative notes, newborn APGAR & postpartum hemorrhage logs.",
        diagramTitle: "Labor Room Admission, Partograph & Delivery Suite Architecture",
        nodes: ["Labor Room Admission & Cervical Assessment", "WHO Modified Digital Partograph", "Intrapartum Fetal Heart Rate Monitoring", "Delivery Execution (Vaginal / LSCS)", "Postpartum Hemorrhage (PPH) & Newborn EMR"],
        color: "#be185d",
        quickAnswer: "Delivery records software is a critical care intrapartum documentation module designed for labor rooms, obstetric theaters, and maternity hospitals. It digitizes the WHO Modified Partograph (cervical dilation, alert and action lines), logs intrapartum fetal heart patterns and maternal vitals, structures operative notes for normal vaginal delivery and Lower Segment Cesarean Section (LSCS), records newborn APGAR scores, and enforces postpartum hemorrhage (PPH) management protocols.",
        bgText: "The hours of active labor and childbirth represent the most critical phase of obstetric care. Managing labor requires vigilant, continuous surveillance of maternal vitals, cervical progress, uterine contractions, and fetal heart rate patterns to recognize obstructed labor, fetal distress, or cephalopelvic disproportion early.\n\nIn conventional labor rooms across India, intrapartum documentation is fraught with severe risks. Labor ward staff maintain paper partographs that are often filled retrospectively after delivery rather than in real time. Plotting cervical dilation on paper is frequently delayed during busy night shifts, obscuring when the labor curve crosses the critical 'Alert' and 'Action' lines. Furthermore, emergency cesarean section operative notes and postpartum hemorrhage (PPH) blood loss estimates are often recorded inconsistently, leaving hospitals vulnerable during clinical legal scrutiny.\n\nMedical365's Delivery Records module equips labor room teams with a dynamic, touch-optimized intrapartum management system. Featuring an automated digital WHO partograph with real-time alert triggers, structured surgical LSCS operative templates, immediate newborn APGAR scoring, and closed-loop active management of third stage of labor (AMTSL), Medical365 safeguards mother and child during the miracle of birth.",
        capabilities: [
            { title: "Real-Time Digital WHO Modified Partograph", text: "Interactive graphical partograph plotting cervical dilation (cm) and fetal head descent against time, with automatic Alert Line (+4 hours) and Action Line triggers alerting obstetricians to prolonged or obstructed labor." },
            { title: "Intrapartum Maternal & Fetal Physiological Flowsheet", text: "Records hourly maternal pulse, blood pressure, temperature, urine output/protein, alongside fetal heart rate (every 30 mins in active first stage, every 5 mins in second stage), and amniotic fluid clarity (clear, meconium-stained, bloody)." },
            { title: "Vaginal Delivery & Episiotomy Documentation", text: "Documents spontaneous vertex delivery, instrumental assistance (vacuum extractor / obstetric forceps), episiotomy type (mediolateral), perineal tear grading (1st to 4th degree), and suture repair technique." },
            { title: "Lower Segment Cesarean Section (LSCS) Operative Notes", text: "Specialized operative templates for emergency and elective cesarean sections: surgical indication (fetal distress, non-progression, previous LSCS), anesthesia type, uterine incision, placenta extraction, uterine closure, and swab/instrument count reconciliation." },
            { title: "Active Management of Third Stage of Labor (AMTSL) & PPH Log", text: "Enforces AMTSL protocol: prophylactic uterotonics (Oxytocin 10 IU IM), controlled cord traction, and uterine massage, tracking estimated blood loss and escalation protocols for Postpartum Hemorrhage (PPH)." },
            { title: "Immediate Newborn Birth Record & Mother-Baby Linkage", text: "Captures exact birth timestamp, gender, birth weight, 1-minute and 5-minute APGAR scores, vitamin K1 administration, and auto-generates matching mother-infant biometric wristband IDs." }
        ],
        workflowSteps: [
            { step: "Labor Admission & Cervical Triage", desc: "Doctor evaluates cervical effacement, dilation, station, and membrane status; digital partograph begins." },
            { step: "Partograph Surveillance & Contractions", desc: "Midwife logs contractions (frequency and duration in seconds) and FHR; curve plots dynamically." },
            { step: "Second Stage & Delivery Execution", desc: "Spontaneous vaginal delivery or LSCS executed; birth timestamp, mode, and cord clamping logged." },
            { step: "AMTSL & Blood Loss Measurement", desc: "Uterotonic administered; blood loss quantified (gravimetric/drape); PPH checklist verified." },
            { step: "Newborn Care & Birth Notification", desc: "APGAR scored, baby weighed, skin-to-skin initiated, and official birth notification dispatches to civic registrar." }
        ],
        compliance: "Medical365 Delivery Records strictly comply with WHO Intrapartum Care Guidelines, FOGSI labor room standards, and Government of India LaQshya (Labor Room Quality Improvement Initiative) benchmarks.\n\nAll intrapartum notes, surgical records, and partograph plots are encrypted under AES-256 compliant with the DPDP Act 2023. Birth summaries link directly to national ABDM health lockers.",
        table: [
            { feature: "Partograph Plotting", manual: "Paper sheet filled retrospectively after birth; alert lines ignored", m365: "Real-time digital plotting with automated alerts when crossing Action Line" },
            { feature: "FHR Monitoring", manual: "Sporadic handwritten notes; decelerations easily overlooked", m365: "Structured half-hourly logging flagging fetal tachycardia, bradycardia, or dips" },
            { feature: "Cesarean Operative Notes", manual: "Handwritten operative notes often omitting surgical indication or counts", m365: "Standardized digital LSCS template with mandatory swab/instrument check" },
            { feature: "PPH Protocol Enforcement", manual: "Unstandardized response during sudden hemorrhage emergencies", m365: "Automated PPH bundle checklist with uterotonic titration guidance" },
            { feature: "Birth Certificate Data", manual: "Manual paperwork causing typographical errors in child name and birth time", m365: "Automated verified digital birth certificate package exportable for municipal birth registration" }
        ],
        faqs: [
            { q: "How does the digital partograph alert doctors to obstructed labor?", a: "When cervical dilation plots to the right of the WHO Alert Line (indicating slow progress <1 cm/hour), the system triggers an amber notification. If the curve reaches the Action Line (4 hours to the right), a high-priority alert prompts immediate obstetric intervention (oxytocin augmentation or cesarean delivery)." },
            { q: "How is blood loss quantified to detect Postpartum Hemorrhage (PPH)?", a: "Medical365 supports both visual estimation and gravimetric/calibrated drape measurement. If blood loss exceeds 500 ml following vaginal delivery or 1,000 ml following cesarean section, the system activates the emergency PPH management protocol." },
            { q: "Can the software generate birth certificates for municipal registration?", a: "Yes. The module auto-generates official institutional Birth Notification Forms containing child gender, exact birth weight, time of birth, parental details, and hospital registration numbers ready for municipal birth registry submission." },
            { q: "Does the system support VBAC (Vaginal Birth After Cesarean) monitoring?", a: "Yes. Dedicated VBAC templates enforce strict continuous fetal monitoring, uterine scar tenderness checks, and progress alerts to detect early signs of uterine rupture." },
            { q: "Can cord blood gas (pH, base excess) results be documented?", a: "Yes. Immediate cord arterial blood gas values can be logged in the newborn delivery flowsheet to objectively verify fetal acid-base status at birth." },
            { q: "Is the software compliant with the Government of India LaQshya initiative?", a: "Yes. The module conforms to all LaQshya labor room quality standards, tracking maternal satisfaction, respectful maternity care indicators, and labor room clinical audit benchmarks." }
        ]
    },

    "ultrasound-reports": {
        cluster: "GYNECOLOGY",
        title: "Obstetric & Gynecological Ultrasound Software | Sonography EMR | Medical365",
        h1: "Obstetric & Gynecological Ultrasound Reporting Software",
        metaDesc: "Medical365 ultrasound reports software manages fetal biometry (BPD/FL/AC), Hadlock estimated fetal weight, Doppler indices & PC-PNDT compliance for Indian diagnostic centers.",
        diagramTitle: "Obstetric Ultrasound Biometry & PACS Reporting Pipeline",
        nodes: ["Ultrasound Machine DICOM Capture", "Automated Biometry Measurement (BPD, HC, AC, FL)", "Hadlock Estimated Fetal Weight (EFW)", "Doppler Vascular Indices (UA / MCA / CPR)", "Structured Sonography Report & EMR Sync"],
        color: "#be185d",
        quickAnswer: "Ultrasound reports software is a specialized clinical sonography and obstetric PACS reporting module. It interfaces digital ultrasound machines, captures fetal biometry (Biparietal Diameter BPD, Head Circumference HC, Abdominal Circumference AC, Femur Length FL), computes Estimated Fetal Weight (EFW) using Hadlock formulas, calculates Doppler vascular indices (Umbilical Artery, MCA, Cerebroplacental Ratio CPR), and generates compliant PC-PNDT Form F documentation in India.",
        bgText: "Ultrasound imaging is the pre-eminent diagnostic modality in obstetrics and gynecology. From confirming early intrauterine gestation and measuring crown-rump length (CRL) to evaluating detailed organ anatomy on anomaly scans and assessing fetal hemodynamics via Doppler, sonography guides almost every critical clinical decision in pregnancy.\n\nIn Indian diagnostic ultrasound centers and maternity hospitals, managing ultrasound documentation carries intense operational and regulatory responsibilities. Radiologists and sonologists must manually type dozens of biometric parameters into Word documents, calculate gestational percentiles, look up amniotic fluid index (AFI) norms, and maintain mandatory paper Form F registers under the strict Pre-Conception and Pre-Natal Diagnostic Techniques (PC-PNDT) Act. Typing errors, inconsistent report phrasing, or missing patient Aadhaar details on PC-PNDT records expose clinics to severe legal liabilities and license suspensions.\n\nMedical365's Ultrasound Reporting module streamlines sonography workflow from machine capture to finalized report. Directly ingesting DICOM biometry data, calculating Hadlock fetal weights and percentiles, structuring Doppler indices, and auto-generating compliant PC-PNDT Form F records, Medical365 elevates clinical precision and regulatory peace of mind.",
        capabilities: [
            { title: "Direct DICOM Ultrasound Biometry Ingestion", text: "Connects with ultrasound machines from GE Healthcare (Voluson, Logiq), Philips (Affiniti, Epiq), Samsung (HERA, WS80), Mindray, and Siemens, auto-importing BPD, HC, AC, FL, CRL, and EFW without manual typing." },
            { title: "Hadlock Fetal Weight & Growth Percentile Engine", text: "Computes Estimated Fetal Weight (EFW in grams) using validated Hadlock algorithms (Hadlock 1-4) and plots gestational age-specific growth percentiles (5th, 50th, 95th)." },
            { title: "Comprehensive Obstetric Doppler Hemodynamics", text: "Documents color Doppler indices: Umbilical Artery (UA PI, RI, S/D ratio, end-diastolic flow status), Middle Cerebral Artery (MCA PSV for fetal anemia), Uterine Arteries (early diastolic notch), and Cerebroplacental Ratio (CPR)." },
            { title: "Amniotic Fluid Index (AFI) & Single Deepest Pocket (SDP)", text: "Calculates total AFI (cm) across four quadrants and logs Single Deepest Pocket (SDP), automatically classifying oligohydramnios (<5 cm) versus polyhydramnios (>24 cm)." },
            { title: "Automated PC-PNDT Form F Generator", text: "Auto-populates and formats official statutory Form F records under the Indian PC-PNDT Act, complete with pregnant woman's declaration, referring doctor details, and sonologist declaration ready for digital submission." },
            { title: "Pelvic & Gynecological Sonography Templates", text: "Structured templates for non-obstetric transabdominal and transvaginal (TVS) ultrasound: endometrial thickness (ET in mm), uterine fibroids, adenomyosis, ovarian morphology (PCOS follicle count), and pouch of Douglas fluid." }
        ],
        workflowSteps: [
            { step: "Patient PC-PNDT Registration", desc: "Reception verifies patient identity, captures referral doctor slip, and completes mandatory pre-scan PC-PNDT declaration." },
            { step: "Ultrasound Scan & DICOM Stream", desc: "Sonologist performs scan; biometry measurements (BPD, HC, AC, FL) stream directly into Medical365 reporting template." },
            { step: "Hadlock EFW & Doppler Calculation", desc: "Software computes fetal weight, gestational age concordance, AFI, and Cerebroplacental Ratio (CPR) automatically." },
            { step: "Anatomy Checklist Verification", desc: "Sonologist verifies systematic organ checklist (brain ventricles, 4-chamber heart, spine, kidneys, limbs) on target anomaly scan." },
            { step: "Report Approval & Form F Archival", desc: "Doctor signs report with digital signature; high-resolution ultrasound images and report dispatch to patient; Form F archives for audit." }
        ],
        compliance: "Medical365 Ultrasound Reporting strictly adheres to the Pre-Conception and Pre-Natal Diagnostic Techniques (PC-PNDT) Act 1994, International Society of Ultrasound in Obstetrics and Gynecology (ISUOG) practice guidelines, and Indian Radiological and Imaging Association (IRIA) norms.\n\nAll ultrasound studies, biometric logs, and Form F records are encrypted under AES-256 compliant with the DPDP Act 2023. Sonography reports link to ABDM national health lockers.",
        table: [
            { feature: "Biometry Data Entry", manual: "Manual typing of dozens of numbers from thermal paper slips; high typo risk", m365: "Direct digital DICOM import from GE Voluson/Samsung machine in 1 second" },
            { feature: "Hadlock Weight Calculation", manual: "Manual lookup of charts or typing into external calculator apps", m365: "Instant automated Hadlock EFW calculation with exact growth percentiles" },
            { feature: "PC-PNDT Form F", manual: "Tedious manual handwriting in physical registers; vulnerable to legal fines", m365: "1-click auto-generation of fully compliant, audit-ready Form F records" },
            { feature: "Doppler Index Analysis", manual: "Calculating Cerebroplacental Ratio (CPR = MCA PI / UA PI) on paper", m365: "Automated CPR calculation alerting to fetal brain-sparing physiology" },
            { feature: "Image Archiving", manual: "Printed thermal paper films that fade yellow within 6 months", m365: "Permanent, lossless cloud DICOM image storage accessible anytime" }
        ],
        faqs: [
            { q: "How does the software ensure 100% compliance with the Indian PC-PNDT Act?", a: "Medical365 includes strict statutory safeguards: it generates pre-filled Form F records capturing patient Aadhaar/ID, referring doctor registration, and mandatory sonologist declarations. The software has an immutable programmatic block prohibiting any entry or reporting of fetal gender, and maintains tamper-proof audit logs for health department inspections." },
            { q: "Which ultrasound machine models support direct DICOM biometry transfer?", a: "Medical365 supports DICOM Structured Reporting (SR) from all leading sonography brands used in India, including GE Voluson (E6, E8, E10, S8), Samsung (HERA W10, WS80A), Philips (Affiniti, Epiq), Mindray (Nuewa, Resona), and Siemens Healthineers." },
            { q: "How does the software calculate Cerebroplacental Ratio (CPR)?", a: "The software automatically computes CPR by dividing Middle Cerebral Artery Pulsatility Index by Umbilical Artery Pulsatility Index (CPR = MCA PI / UA PI). A CPR <1.08 or <5th percentile triggers a clinical alert for fetal redistribution and placental insufficiency." },
            { q: "Can gynecologists report transvaginal follicular monitoring for IVF?", a: "Yes. Dedicated follicular monitoring tracking sheets record right and left ovarian follicle counts, individual follicle diameters in two planes (mm), and endometrial thickness over serial cycle days." },
            { q: "Can high-definition 3D/4D ultrasound clips be stored and shared?", a: "Yes. 3D surface rendering snapshots and 4D cine loops can be archived in the cloud PACS and shared securely with expectant parents via the patient portal and WhatsApp." },
            { q: "How are discrepancy alerts between clinical gestational age and ultrasound age handled?", a: "If the composite ultrasound gestational age differs from LMP dating by more than the accepted clinical threshold (e.g. >14 days in the third trimester), the report highlights the discrepancy, aiding early diagnosis of fetal growth restriction (FGR) or macrosomia." }
        ]
    },

    "fertility-treatment-tracking": {
        cluster: "GYNECOLOGY",
        title: "IVF & Fertility Treatment Software | ART Clinic EMR | Medical365",
        h1: "Assisted Reproductive Technology (ART) & IVF Clinic Software",
        metaDesc: "Medical365 fertility treatment tracking software manages IVF/ICSI cycles, ovarian stimulation protocols, embryo grading & ART Act 2021 compliance for fertility clinics.",
        diagramTitle: "Assisted Reproductive Technology (ART) & IVF Lifecycle Pipeline",
        nodes: ["Couple Fertility Workup & Registration", "Controlled Ovarian Stimulation (COH)", "Oocyte Retrieval & Embryology Lab", "Embryo Culture & Grading (Gardner)", "Embryo Transfer & Pregnancy Test EMR"],
        color: "#be185d",
        quickAnswer: "Fertility treatment tracking software is a specialized clinical reproductive medicine and embryology module engineered for Assisted Reproductive Technology (ART) and In Vitro Fertilization (IVF) centers. It manages controlled ovarian stimulation (COH) protocols, follicular monitoring, oocyte pickup (OPU), embryology lab records (ICSI, Gardner embryo grading), vitrification cryopreservation logs, and compliance with the Indian ART Act 2021 and Surrogacy Act.",
        bgText: "Infertility affects approximately 15% of reproductive-age couples across India, driving rapid growth in specialized Assisted Reproductive Technology (ART) and In Vitro Fertilization (IVF) centers. Treating subfertility requires complex, multi-week clinical and laboratory workflows: ovarian reserve testing (AMH, AFC), controlled ovarian hyperstimulation, daily transvaginal follicular tracking, precise trigger administration, egg retrieval, sperm preparation, Intracytoplasmic Sperm Injection (ICSI), blastocyst culture, and embryo transfer.\n\nIn conventional fertility centers, documentation is challenging. Clinical stimulation charts, ultrasound follicle growth sheets, and embryology laboratory notes often reside in separate physical binders. Embryologists maintain paper logs for oocyte maturity, fertilization checks, and liquid nitrogen cryopreservation tank coordinates. Crucially, the landmark Assisted Reproductive Technology (Regulation) Act 2021 and Surrogacy (Regulation) Act 2021 in India have introduced stringent legal requirements: mandatory national ART registry reporting, strict gamete/embryo donor anonymity rules, insurance mandates, and formal legal consents.\n\nMedical365's Fertility Treatment Tracking module unites clinical reproductive endocrinology, embryology laboratory tracking, and legal regulatory compliance. With integrated stimulation flowsheets, digital Gardner blastocyst grading scorecards, liquid nitrogen cryogenic storage mapping, and automated National ART Registry data export, Medical365 delivers end-to-end clinical excellence.",
        capabilities: [
            { title: "Controlled Ovarian Stimulation (COH) Flowsheet", text: "Tracks daily gonadotropin dosages (rFSH, hMG), GnRH antagonist/agonist protocols, serum Estradiol (E2) and Progesterone (P4) levels, and endometrial thickness on a unified clinical timeline." },
            { title: "Interactive Follicular Monitoring Matrix", text: "Tabular and graphical tracking of right and left ovarian follicle cohorts over cycle days (e.g. Day 6, 8, 10, 12), automatically flagging dominant follicles ≥18 mm for hCG/GnRH agonist trigger timing." },
            { title: "Embryology Laboratory Oocyte & ICSI Tracking", text: "Documents oocyte retrieval: total eggs retrieved, maturity grading (MII, MI, GV), insemination technique (conventional IVF vs. ICSI), and 16-18 hour fertilization check (2PN presence)." },
            { title: "Standardized Gardner Blastocyst Grading Scorecard", text: "Structures Day 3 cleavage-stage and Day 5/6 blastocyst evaluation using the Gardner classification: expansion grade (1-6), inner cell mass (A-C), and trophectoderm (A-C) with attached microscopy images." },
            { title: "Cryopreservation & Liquid Nitrogen Tank Coordinate Mapping", text: "Tracks vitrified embryos, oocytes, and sperm straws: exact cryogenic tank, canister, cane, goblet, and straw color/number, preventing lost or misplaced genetic specimens." },
            { title: "Indian ART Act 2021 & Surrogacy Act Compliance Engine", text: "Enforces statutory legal consents, gamete donor insurance tracking, couple eligibility criteria (age limits: female 21-50, male 21-55), and automated export to the National ART Registry of India." }
        ],
        workflowSteps: [
            { step: "Couple Intake & ART Registration", desc: "Couple demographics, ovarian reserve (AMH, AFC), semen analysis, and statutory ART Act consents are finalized." },
            { step: "Ovarian Stimulation & Follicle Tracking", desc: "Clinician adjusts gonadotropin doses based on daily follicular response and serum E2 levels until trigger criteria are met." },
            { step: "Oocyte Pickup & ICSI Execution", desc: "Ovum pickup performed; embryologist logs oocyte count, maturity, sperm preparation, and ICSI injection details." },
            { step: "Embryo Culture & Grading", desc: "Embryos cultured to Day 5 blastocysts; morphological grades (e.g. 4AA) and time-lapse incubator photos are logged." },
            { step: "Embryo Transfer or Vitrification", desc: "Fresh transfer or vitrification executed; straw tank coordinates recorded; serum beta-hCG pregnancy test scheduled." }
        ],
        compliance: "Medical365 Fertility Treatment Tracking conforms strictly to the Assisted Reproductive Technology (Regulation) Act 2021, Surrogacy (Regulation) Act 2021, Indian Council of Medical Research (ICMR) ART guidelines, and ESHRE standards.\n\nAll couple identifiers, donor records, and embryology logs are secured under AES-256 encryption compliant with the DPDP Act 2023. Patient summaries integrate with ABDM digital health lockers.",
        table: [
            { feature: "Stimulation Tracking", manual: "Flipping through paper charts to correlate hormone doses with follicle sizes", m365: "Unified digital flowsheet plotting drug doses, E2 levels, and follicle growth" },
            { feature: "Embryology Lab Logging", manual: "Paper notebooks in cleanroom prone to moisture damage and transcription errors", m365: "Cleanroom tablet interface logging oocyte maturity, ICSI, and blastocyst grades" },
            { feature: "Cryopreservation Tracking", manual: "Handwritten tank registers; high risk of misplacing frozen embryo straws", m365: "Digital 3D tank map tracking exact canister, cane, and goblet straw positions" },
            { feature: "ART Act 2021 Compliance", manual: "Complex paperwork and fear of criminal penalties during state ART audits", m365: "Automated compliance checklists enforcing statutory age, consent, and registry rules" },
            { feature: "Couple Communication", manual: "Anxious phone calls to lab asking 'how many embryos survived?'", m365: "Patient portal showing embryo development summary and transfer dates" }
        ],
        faqs: [
            { q: "How does the software ensure compliance with the Indian ART Act 2021?", a: "Medical365 enforces all statutory provisions of the Assisted Reproductive Technology (Regulation) Act 2021: it verifies legal age limits (women 21-50 years, men 21-55 years), logs mandatory health insurance policies for oocyte donors, enforces single-donor-single-recipient rules, and generates audit-ready data for the National ART and Surrogacy Board." },
            { q: "How does the cryogenic storage management system work?", a: "The software creates a digital twin of your liquid nitrogen cryo-storage facility: you can search by patient name or straw ID to instantly find the exact Tank #, Canister #, Cane #, and Goblet position. It also logs freeze dates, media lot numbers, and vitrification kit details." },
            { q: "Can embryologists attach time-lapse embryo photos to the patient chart?", a: "Yes. High-resolution blastocyst photographs captured via microscope cameras can be attached directly to individual embryo scorecards, providing a permanent visual record of embryo morphology." },
            { q: "How does the system calculate optimal trigger timing for oocyte maturation?", a: "The follicular monitoring grid highlights when the leading cohort of follicles reaches mature dimensions (≥18 mm) in the presence of appropriate serum estradiol levels, alerting the clinician to schedule hCG or Dual Trigger injection." },
            { q: "Does the module support Intrauterine Insemination (IUI) cycles?", a: "Yes. Dedicated IUI templates track semen washing techniques (density gradient, swim-up), post-wash motile sperm counts, catheter type, and insemination timing relative to ovulation." },
            { q: "Can patients view their stimulation timeline on their smartphones?", a: "Yes. Patients can check daily injection times, hormone dosage reminders, and scheduled ultrasound review dates through the Medical365 patient app, minimizing missed gonadotropin doses." }
        ]
    },

    // ══════════════════════════════════════════════════
    // PSYCHIATRY & MENTAL HEALTH (4 pages)
    // ══════════════════════════════════════════════════
    "behavioral-history": {
        cluster: "PSYCHIATRY",
        title: "Psychiatric History & Behavioral Health Software | Mental Health EMR | Medical365",
        h1: "Psychiatric Clinical History & Longitudinal Behavioral Software",
        metaDesc: "Medical365 behavioral history software structures psychiatric evaluations, developmental milestones, family history of mental illness & DSM-5 / ICD-11 diagnostic formulations.",
        diagramTitle: "Comprehensive Psychiatric Behavioral History & Formulation Pipeline",
        nodes: ["Psychiatric Triage & Chief Complaint", "Longitudinal Biopsychosocial History", "Family Genogram & Genetic Risk", "Substance Use & Forensic History", "Psychiatric Diagnostic Formulation & EMR"],
        color: "#6366f1",
        quickAnswer: "Behavioral history software is a specialized clinical psychiatry and behavioral health intake module. It systematically documents the comprehensive biopsychosocial history: history of presenting illness, past psychiatric episodes and hospitalizations, developmental milestones, family genogram of mental illness, substance use patterns, and forensic history, structuring diagnostic formulations under DSM-5-TR and ICD-11 criteria.",
        bgText: "Clinical psychiatry relies heavily on the thorough, empathetic exploration of a patient's longitudinal narrative. Unlike specialties guided by definitive radiological scans or blood biomarkers, psychiatric diagnosis and formulation depend on understanding the patient's complete life context: early childhood developmental trauma, personality traits, past depressive or manic episodes, treatment responses, family history of suicide or bipolar disorder, and psychosocial stressors.\n\nIn conventional Indian hospital psychiatric departments and private clinics, taking a comprehensive psychiatric history on blank paper is time-consuming and often fragmented. Clinicians frequently run out of time during busy consultations, omitting vital areas such as premorbid personality, detailed substance use chronologies, or legal/forensic history. Crucially, when patients present in acute psychiatric crisis or severe relapse, emergency clinicians struggle to reconstruct what antipsychotic or mood stabilizer doses were effective in past episodes.\n\nMedical365's Behavioral History module provides psychiatrists and clinical psychologists with a structured, intuitive digital framework. Equipped with interactive 3-generation family genograms, longitudinal psychiatric timeline mapping, standardized substance dependence grids, and DSM-5 diagnostic helpers, Medical365 captures the complete biopsychosocial picture with clinical depth and efficiency.",
        capabilities: [
            { title: "Structured Biopsychosocial History Framework", text: "Systematic intake covering History of Presenting Illness (HPI), past psychiatric episodes, lifetime suicide attempts, previous hospitalizations, and treatment adherence history." },
            { title: "Interactive 3-Generation Family Genogram Builder", text: "Visual family tree diagrammer to map three generations, color-coding psychiatric disorders, substance dependence, completed suicides, and consanguinity." },
            { title: "Longitudinal Psychiatric Episode Timeline", text: "Visual life-charting timeline displaying episodes of depression, mania, hypomania, and psychosis alongside major life events (bereavement, job loss, divorce) and medication changes." },
            { title: "Comprehensive Substance Use & Dependency Matrix", text: "Detailed logging for alcohol, nicotine, cannabis, opioids, benzodiazepines, and stimulants: age of first use, daily quantity, dependence criteria, withdrawal symptoms, and past de-addiction admissions." },
            { title: "Premorbid Personality & Developmental History", text: "Structures evaluation of childhood developmental milestones, neurotic traits (enuresis, nail-biting), school performance, social relationships, and adult premorbid personality traits." },
            { title: "Standardized DSM-5-TR & ICD-11 Diagnostic Formulation", text: "Facilitates multi-axial diagnostic formulation under DSM-5-TR and ICD-11, capturing principal psychiatric diagnosis, medical comorbidities, and psychosocial stressors." }
        ],
        workflowSteps: [
            { step: "Patient & Informant Intake", desc: "Psychiatrist evaluates presenting complaints with patient and reliable family informant, noting reliability of history." },
            { step: "Biopsychosocial Narrative Capture", desc: "Clinician uses structured sections to record past episodes, medication trials, and treatment responses." },
            { step: "Family Genogram Construction", desc: "Interactive family tree maps psychiatric history across parents, siblings, and extended family in under 2 minutes." },
            { step: "Substance & Forensic Review", desc: "Detailed substance use inventory and forensic/legal history are documented with confidentiality controls." },
            { step: "Diagnostic Formulation & Plan", desc: "Doctor synthesizes biopsychosocial formulation, establishes provisional diagnosis, and initiates care plan." }
        ],
        compliance: "Medical365 Behavioral History complies with the Mental Healthcare Act 2017 (MHCA) of India, Indian Psychiatric Society (IPS) clinical guidelines, and APA documentation standards.\n\nAll psychiatric histories, substance records, and family notes are encrypted under AES-256 with enhanced privacy controls compliant with the DPDP Act 2023. Patient summaries link to ABDM health records.",
        table: [
            { feature: "History Structure", manual: "Unstructured handwritten notes; critical psychosocial elements often forgotten", m365: "Standardized biopsychosocial intake ensuring complete clinical coverage" },
            { feature: "Family History Mapping", manual: "Messy handwritten family trees in margins; difficult to interpret", m365: "Interactive 3-generation digital genogram with standardized psychiatric symbols" },
            { feature: "Past Medication History", manual: "Patient rarely remembers past drug names or effective doses", m365: "Longitudinal life-charting timeline showing past drug trials and responses" },
            { feature: "Substance Use Detail", manual: "Generic note like 'takes alcohol' without quantity or dependence staging", m365: "Structured substance matrix logging age of onset, units/day, and withdrawal signs" },
            { feature: "Legal & Confidentiality Controls", manual: "Paper files open to general hospital staff; severe stigma and privacy risks", m365: "Enhanced psychiatric confidentiality firewalls restricting access to authorized mental health staff" }
        ],
        faqs: [
            { q: "How does the software protect sensitive psychiatric history from unauthorized hospital staff?", a: "Medical365 includes a dedicated Psychiatric Privacy Shield compliant with the Mental Healthcare Act 2017: psychiatric progress notes and sensitive behavioral histories are restricted to credentialed mental health professionals, remaining hidden from general hospital billing or ward staff." },
            { q: "Can the interactive family genogram record consanguineous marriages?", a: "Yes. The genogram builder includes standardized psychiatric pedigree symbols representing first-degree consanguinity, mood disorders, schizophrenia, substance abuse, and completed suicide." },
            { q: "How are past medication trials and drug side-effects tracked?", a: "The life-charting interface tracks previous pharmacotherapies (e.g. Lithium, Sodium Valproate, Olanzapine), noting maximum tolerated doses, treatment duration, therapeutic efficacy, and reasons for discontinuation (e.g. weight gain, tremors)." },
            { q: "Does the module support pediatric and adolescent behavioral history taking?", a: "Yes. Child and adolescent templates cover perinatal complications, birth asphyxia, academic history, ADHD/conduct symptoms, school bullying, and screen time habits." },
            { q: "How does the software handle informant reliability?", a: "The intake form features a dedicated field to record informant relationship, duration of contact with the patient, and subjective reliability rating (good, fair, poor), providing important context during diagnostic evaluation." },
            { q: "Can clinical psychologists access the behavioral history to formulate psychotherapy plans?", a: "Yes. Authorized clinical psychologists on the treatment team can review the psychiatric history and family genogram to construct psychodynamic or cognitive-behavioral case conceptualizations." }
        ]
    },

    "mental-health-assessments": {
        cluster: "PSYCHIATRY",
        title: "Psychiatric Rating Scales & Mental Health Software | Psychiatry EMR | Medical365",
        h1: "Mental Health Assessment & Psychiatric Rating Scale Software",
        metaDesc: "Medical365 mental health assessments software automates PHQ-9, GAD-7, PANSS, YMRS, suicide risk scoring (C-SSRS) & longitudinal progress tracking in psychiatry EMR.",
        diagramTitle: "Psychiatric Rating Scale Assessment & Suicide Risk Architecture",
        nodes: ["Patient Mental Health Screening", "Standardized Rating Scales (PHQ-9 / GAD-7 / PANSS)", "Columbia Suicide Severity (C-SSRS) Check", "Psychiatrist Diagnostic Formulation", "Longitudinal Recovery Curve & EMR Sync"],
        color: "#6366f1",
        quickAnswer: "Mental health assessments software is an objective psychometric evaluation and psychiatric rating module. It digitizes validated clinical assessment batteries—including the Patient Health Questionnaire (PHQ-9 for depression), Generalized Anxiety Disorder (GAD-7), Positive and Negative Syndrome Scale (PANSS for schizophrenia), Young Mania Rating Scale (YMRS), and Columbia-Suicide Severity Rating Scale (C-SSRS)—quantifying symptom severity and suicide risk over time.",
        bgText: "In psychiatric practice, measuring clinical progress and therapeutic response objectively is essential for evidence-based care. When treating major depressive disorder, bipolar affective disorder, schizophrenia, or severe generalized anxiety, clinicians need quantitative metrics to answer vital questions: has antidepressant therapy achieved remission? Is antipsychotic therapy reducing positive hallucinatory symptoms? Is suicide risk escalating?\n\nIn typical clinical settings, psychiatric assessments using paper questionnaires are rarely administered consistently. Scoring 9-item PHQ-9, 7-item GAD-7, or 30-item PANSS forms by hand during rapid consultations consumes excessive time, resulting in uncalculated scores and lost progress data. Critically, suicide risk assessments performed informally without standardized scales (such as C-SSRS) can miss covert suicidal intent, exposing patients to catastrophic harm and healthcare facilities to severe malpractice liability.\n\nMedical365's Mental Health Assessments module embeds validated digital psychometric instruments directly into the psychiatric consultation screen. Patients can complete digital self-assessments on waiting-room tablets or smartphones before their visit, while psychiatrists execute clinician-rated batteries with automated scoring, instant risk stratification, and longitudinal recovery trend graphing.",
        capabilities: [
            { title: "Standardized Depression & Anxiety Batteries (PHQ-9, GAD-7, HAM-D)", text: "Interactive scorecards for PHQ-9, GAD-7, Beck Depression Inventory (BDI), and Hamilton Depression Rating Scale (HAM-D) with automated severity categorization (mild, moderate, severe)." },
            { title: "Psychosis & Bipolar Assessment Scales (PANSS, YMRS, BPRS)", text: "Clinician-rated tools for Positive and Negative Syndrome Scale (PANSS), Brief Psychiatric Rating Scale (BPRS), and Young Mania Rating Scale (YMRS) measuring affective and psychotic symptom shifts." },
            { title: "Columbia-Suicide Severity Rating Scale (C-SSRS) Module", text: "Standardized suicide screening tracking passive suicidal ideation, active intent with plan, and preparatory behaviors, automatically triggering urgent clinical emergency alerts on high scores." },
            { title: "ADHD, Autism & Pediatric Mental Health Scales (Vanderbilt, SNAP-IV)", text: "Pre-configured pediatric rating instruments including the Vanderbilt ADHD Diagnostic Parent/Teacher Rating Scales and SNAP-IV for attention and disruptive behaviors." },
            { title: "Interactive Longitudinal Symptom Recovery Graphs", text: "Visual trend lines plotting psychiatric scores over weeks and months of pharmacotherapy and psychotherapy, objectively demonstrating remission or treatment resistance." },
            { title: "Patient Self-Assessment Portal & Waiting Room Tablets", text: "Enables patients to complete self-report screening tools securely on their own smartphone or clinic waiting room kiosk before seeing the doctor." }
        ],
        workflowSteps: [
            { step: "Self-Report Screening Intake", desc: "Patient completes digital PHQ-9 and GAD-7 on waiting-room tablet or smartphone prior to consultation." },
            { step: "Instant Score & Risk Stratification", desc: "Software auto-calculates total score; Question 9 on suicidal thoughts triggers mandatory clinician safety review." },
            { step: "Clinician-Rated Psychiatric Scale", desc: "Psychiatrist administers specialized scales (e.g. YMRS for bipolar mania) during the clinical interview." },
            { step: "Longitudinal Comparison Review", desc: "Doctor reviews multi-month symptom trajectory graph, evaluating response to SSRI or mood stabilizer titration." },
            { step: "Care Plan & Crisis Safety Handout", desc: "Updated treatment plan and personalized suicide safety crisis plan dispatch to patient's verified WhatsApp." }
        ],
        compliance: "Medical365 Mental Health Assessments adhere to the Mental Healthcare Act 2017 (MHCA), Indian Psychiatric Society (IPS) practice parameters, and American Psychiatric Association (APA) guidelines.\n\nAll psychometric assessment records, suicide screening logs, and scorecards are protected under AES-256 encryption compliant with the DPDP Act 2023. Assessment summaries link to ABDM digital health lockers.",
        table: [
            { feature: "Assessment Administration", manual: "Paper questionnaires handed to patients; manual arithmetic errors in scoring", m365: "Digital touch questionnaires with instant automated scoring and severity staging" },
            { feature: "Suicide Risk Screening", manual: "Informal verbal questioning easily missing covert suicidal plans", m365: "Standardized C-SSRS suicide severity screen with hard emergency alerts" },
            { feature: "Longitudinal Symptom Tracking", manual: "Flipping through old files to compare scores across visits", m365: "Interactive visual graphs showing score declines across medication trials" },
            { feature: "Psychosis Staging", manual: "PANSS or BPRS rarely performed due to time-consuming manual scoring", m365: "Rapid 1-click PANSS scoring completed in under 4 minutes with auto-subtotals" },
            { feature: "Crisis Safety Planning", manual: "Verbal advice to call hospital if suicidal feelings arise", m365: "Illustrated digital Crisis Safety Plan with emergency helpline numbers on phone" }
        ],
        faqs: [
            { q: "How does the system handle positive responses to Question 9 (Suicidal Ideation) on the PHQ-9?", a: "If a patient indicates any thoughts of self-harm on Question 9 of the PHQ-9, the software instantly displays a prominent red safety alert on the psychiatrist's screen and prompts an immediate structured suicide risk assessment using the Columbia-Suicide Severity Rating Scale (C-SSRS)." },
            { q: "Can patients complete screening questionnaires before entering the consultation room?", a: "Yes. Patients can complete self-report instruments (PHQ-9, GAD-7, PCL-5 for PTSD) on their smartphone via an encrypted link sent prior to the appointment or on a sanitizable clinic waiting room tablet." },
            { q: "Which scales are included for bipolar disorder and mania?", a: "The module includes the Young Mania Rating Scale (YMRS), Mood Disorder Questionnaire (MDQ), and Altman Self-Rating Mania Scale (ASRM) for comprehensive bipolar monitoring." },
            { q: "Can psychiatrists track extrapyramidal side effects of antipsychotic medications?", a: "Yes. The module includes standardized rating scales for medication-induced movement disorders, including the Abnormal Involuntary Movement Scale (AIMS) for tardive dyskinesia and the Simpson-Angus Scale (SAS) for parkinsonism." },
            { q: "Does the software support cognitive impairment screening for elderly patients?", a: "Yes. The module includes validated cognitive screening instruments, including the Mini-Mental State Examination (MMSE) and Montreal Cognitive Assessment (MoCA) with educational level adjustments." },
            { q: "Can rating scale progress reports be shared with referring psychotherapists?", a: "Yes. With patient consent under the DPDP Act 2023, psychiatrists can export visual symptom progress graphs to collaborating clinical psychologists, occupational therapists, or psychiatric social workers." }
        ]
    },

    "therapy-session-notes": {
        cluster: "PSYCHIATRY",
        title: "Psychotherapy Session Notes Software | Clinical Psychology EMR | Medical365",
        h1: "Psychotherapy Progress Notes & Counseling EMR Software",
        metaDesc: "Medical365 therapy session notes software manages CBT conceptualization, DAP/SOAP progress notes, homework tracking & confidential psychotherapy records.",
        diagramTitle: "Psychotherapy Clinical Documentation & Case Conceptualization Pipeline",
        nodes: ["Therapy Session Intake & Check-In", "CBT / Psychodynamic Conceptualization", "Intervention Delivery & Therapeutic Modality", "Homework Assignment & Behavioral Tasks", "DAP / SOAP Clinical Note & EMR Vault"],
        color: "#6366f1",
        quickAnswer: "Therapy session notes software is a specialized clinical psychology and psychotherapy documentation module. It manages individual, couples, and family therapy notes under DAP (Data, Assessment, Plan) and SOAP formats, structures Cognitive Behavioral Therapy (CBT) case conceptualizations, logs therapeutic modalities (CBT, DBT, Psychodynamic, ACT), tracks patient homework assignments, and maintains strict confidentiality firewalls.",
        bgText: "Psychotherapy is an intimate, exploratory clinical practice requiring nuanced documentation that balances clinical thoroughness with strict patient confidentiality. Clinical psychologists, licensed counselors, and psychotherapists need to document therapeutic themes, cognitive distortions, defense mechanisms, transference/countertransference dynamics, and behavioral homework assignments across multi-month counseling arcs.\n\nIn conventional outpatient setups, psychotherapy notes are maintained in loose physical notebooks or informal computer files. Psychologists spend hours typing lengthy narrative notes after long clinical days. Crucially, in multidisciplinary hospitals, therapists worry that detailed, sensitive disclosures (regarding childhood abuse, marital infidelity, or private traumatic events) could be viewed by general hospital staff or billing clerks, violating client trust and ethical codes.\n\nMedical365's Therapy Session Notes module equips therapists with efficient, structured clinical note formats (DAP, SOAP, BIRP) and specialized case conceptualization tools. Featuring isolated psychotherapy confidentiality locks, integrated Cognitive Behavioral Therapy (CBT) thought record builders, and automated homework tracking, Medical365 protects therapeutic boundaries while standardizing clinical care.",
        capabilities: [
            { title: "Standardized Psychotherapy Note Formats (DAP, SOAP, BIRP)", text: "Pre-configured clinical note templates optimized for mental health: DAP (Data, Assessment, Plan), SOAP (Subjective, Objective, Assessment, Plan), and BIRP (Behavior, Intervention, Response, Plan)." },
            { title: "Cognitive Behavioral Therapy (CBT) Case Conceptualization", text: "Interactive CBT formulation diagrammer mapping Core Beliefs, Intermediate Beliefs/Rules, Coping Strategies, Automatic Thoughts, Cognitive Distortions, and Behavioral Responses." },
            { title: "Multi-Modality Therapeutic Intervention Library", text: "Pre-loaded clinical interventions across diverse therapeutic frameworks: CBT (cognitive restructuring, behavioral activation), DBT (mindfulness, distress tolerance), ACT, Psychodynamic, and EMDR." },
            { title: "Automated Patient Homework & Thought Record Tracker", text: "Assigns digital homework tasks (daily thought records, exposure hierarchy ladders, behavioral activity logs) accessible on the patient mobile app with adherence tracking." },
            { title: "Isolated Psychotherapy Confidentiality Vault", text: "Separates official billing/diagnostic progress notes from highly sensitive private therapy process notes, ensuring sensitive counseling disclosures are never exposed on general hospital records." },
            { title: "Couples & Family Therapy Multi-Client Charting", text: "Specialized documentation for relationship and family counseling, linking partner charts while maintaining separate individual assessment confidentiality." }
        ],
        workflowSteps: [
            { step: "Session Check-In & Mood Rating", desc: "Therapist reviews patient's pre-session mood rating and completed between-session homework tasks." },
            { step: "Session Agenda & Exploration", desc: "Therapist and client establish collaborative session agenda; target automatic thoughts or relationship conflicts explored." },
            { step: "Therapeutic Intervention Delivery", desc: "Therapist applies specific techniques (cognitive reframing, empty chair technique, somatic grounding) and logs responses." },
            { step: "Collaborative Homework Assignment", desc: "Actionable behavioral experiment or thought record assigned for the upcoming week; syncs to patient mobile app." },
            { step: "DAP Note Finalization & Vault Lock", desc: "Therapist completes structured DAP note in under 3 minutes; note encrypts with dedicated mental health access key." }
        ],
        compliance: "Medical365 Therapy Session Notes comply with the Rehabilitation Council of India (RCI) guidelines, Mental Healthcare Act 2017 (MHCA), and American Psychological Association (APA) Record Keeping Guidelines.\n\nAll psychotherapy notes, process observations, and audio transcripts are protected under AES-256 encryption compliant with the DPDP Act 2023. Billing diagnoses link to ABDM national health lockers.",
        table: [
            { feature: "Documentation Format", manual: "Longhand narrative writing taking 15-20 minutes per session", m365: "Structured DAP/SOAP templates completed in under 3 minutes" },
            { feature: "CBT Formulation", manual: "Drawn on scrap paper; disconnected from ongoing progress notes", m365: "Interactive digital CBT case conceptualization linked to every session" },
            { feature: "Homework Management", manual: "Paper photocopies easily lost or forgotten by patients at home", m365: "Digital thought records and exposure ladders completed on patient smartphone" },
            { feature: "Note Confidentiality", manual: "Stored in shared filing cabinets; accessible to unauthorized hospital clerks", m365: "Encrypted Psychotherapy Vault accessible exclusively by the treating therapist" },
            { feature: "Therapy Outcome Tracking", manual: "Subjective impression of whether therapy is working", m365: "Objective outcome tracking measuring symptom reduction over 12-20 sessions" }
        ],
        faqs: [
            { q: "What is the difference between Progress Notes and Psychotherapy Process Notes in the software?", a: "Progress Notes (DAP/SOAP) document objective clinical details: session date, duration, diagnosis, interventions, and plan, and are visible for insurance and legal compliance. Psychotherapy Process Notes are the therapist's private analytical observations, protected under a secondary encryption key and legally shielded from disclosure under the Mental Healthcare Act 2017." },
            { q: "Can therapists assign digital thought records to patients between sessions?", a: "Yes. Therapists can assign interactive 5-column or 7-column CBT Thought Records directly to the patient's smartphone app. When the patient logs a cognitive distortion at home, it appears on the therapist's screen during the next session." },
            { q: "Does the software support EMDR (Eye Movement Desensitization and Reprocessing) notes?", a: "Yes. Dedicated EMDR templates capture target memory selection, Subjective Units of Disturbance (SUD scale 0-10), Validity of Cognition (VoC 1-7), bilateral stimulation passes, and body scan resolution." },
            { q: "How are couples and marriage counseling sessions documented?", a: "The couples therapy module links both partners under a shared family account while maintaining separate individual confidential folders, preventing one partner's private disclosures from leaking to the other." },
            { q: "Can therapists dictate session notes using medical speech-to-text?", a: "Yes. Built-in speech recognition allows therapists to dictate session impressions hands-free, converting speech to structured text in real time." },
            { q: "Is the patient's psychotherapy data protected under Indian privacy laws?", a: "Yes. Mental health records are treated with the highest tier of sensitive data protection, featuring end-to-end encryption, multi-factor authentication, and strict audit logging compliant with the DPDP Act 2023." }
        ]
    },

    "confidential-records": {
        cluster: "PSYCHIATRY",
        title: "Confidential Medical Records & Sensitive Health Privacy Software | Medical365",
        h1: "Confidential Health Records & Mental Healthcare Act Privacy Software",
        metaDesc: "Medical365 confidential records software provides role-based access control, break-glass emergency overrides, DPDP Act 2023 compliance & VIP privacy protection.",
        diagramTitle: "Confidential Medical Records Security & Access Control Architecture",
        nodes: ["Patient Sensitive Record Tagging", "Role-Based Access Control (RBAC) Firewall", "Multi-Factor Authentication (MFA)", "Break-Glass Emergency Protocol", "Immutable Audit Log & DPDP Consent Engine"],
        color: "#6366f1",
        quickAnswer: "Confidential records software is a specialized clinical privacy and health information security module. It enforces granular Role-Based Access Control (RBAC), protects sensitive medical categories (Psychiatry, HIV/Infectious Disease, Reproductive Health, VIP/Staff patients), enables auditable 'Break-Glass' emergency overrides, and maintains immutable access logs compliant with the Mental Healthcare Act 2017 and DPDP Act 2023.",
        bgText: "Healthcare data is among the most intimate and sensitive information an individual possesses. In hospital environments, treating patients with psychiatric conditions, substance use disorders, sexually transmitted infections (HIV/syphilis), termination of pregnancy, or high-profile VIP status requires robust privacy safeguards that go far beyond standard hospital software controls.\n\nIn conventional hospital information systems, all registered staff—from reception clerks and billing assistants to lab technicians and visiting doctors—frequently possess unrestricted access to all patient records. A casual employee can look up a colleague's psychiatric evaluation, an acquaintance's pregnancy termination, or a celebrity's toxicological screen, creating catastrophic privacy violations, social stigma, and severe legal penalties under the Digital Personal Data Protection (DPDP) Act 2023.\n\nMedical365's Confidential Records module establishes multi-layered security firewalls around sensitive health data. Utilizing granular Role-Based Access Control (RBAC), purpose-based data masking, biometric multi-factor authentication, and auditable 'Break-Glass' emergency protocols, Medical365 guarantees uncompromising privacy for patients and bulletproof compliance for healthcare institutions.",
        capabilities: [
            { title: "Granular Role-Based Access Control (RBAC) & Category Tagging", text: "Enables clinical administrators to tag specific patient records or consultation notes as 'Confidential' (Psychiatry, HIV/Infectious, Sexual Health, VIP, Employee Health), restricting visibility exclusively to authorized credentialed providers." },
            { title: "Mental Healthcare Act 2017 (MHCA) Privacy Compliance", text: "Enforces statutory privacy mandates of the Indian Mental Healthcare Act: mental health evaluations and treatment histories are sealed from general hospital EMR views and protected from non-consensual disclosure." },
            { title: "Auditable 'Break-Glass' Emergency Override Protocol", text: "Allows emergency room physicians to bypass access restrictions during life-threatening crises by entering mandatory clinical justification, which triggers instant automated alerts to the Hospital Privacy Officer." },
            { title: "Purpose-Based Data Masking & Anonymized Views", text: "Masks patient identifying details (name, photo, contact) on lab requisition slips and research exports, presenting only anonymized UHID codes to laboratory technicians and data analysts." },
            { title: "Immutable 21 CFR Part 11 Compliant Audit Logging", text: "Maintains a permanent, tamper-proof audit trail capturing every record view, export, edit, or printing attempt, logging user ID, workstation IP address, exact timestamp, and viewed fields." },
            { title: "Digital Personal Data Protection (DPDP) Consent Manager", text: "Manages granular digital patient consents, allowing patients to grant, modify, or revoke access permissions for specific clinical departments or family members via the patient mobile app." }
        ],
        workflowSteps: [
            { step: "Confidential Record Classification", desc: "Clinician or administrator tags record as Sensitive/Confidential (e.g. Psychiatric evaluation or VIP profile)." },
            { step: "Access Restriction & Shielding", desc: "Record vanishes from general hospital search; only explicitly authorized care team members can unlock file." },
            { step: "Multi-Factor Authentication Unlock", desc: "Authorized clinician verifies identity via biometric or smartphone MFA to access consultation notes." },
            { step: "Break-Glass Emergency Access", desc: "If patient presents unconscious in ER, casualty doctor breaks glass, logs emergency reason, and accesses vitals." },
            { step: "Audit Log & Privacy Officer Review", desc: "System generates immutable access log; security dashboard flags any unauthorized viewing attempts." }
        ],
        compliance: "Medical365 Confidential Records comply with the Digital Personal Data Protection (DPDP) Act 2023, Mental Healthcare Act 2017 (MHCA), Information Technology Act 2000, and ISO/IEC 27001 information security standards.\n\nAll confidential data is encrypted with AES-256 at rest and TLS 1.3 in transit, with cryptographically signed audit logs stored in compliant Indian data centers.",
        table: [
            { feature: "Access Control", manual: "All hospital staff can view any patient's file regardless of department", m365: "Granular Role-Based Access Control restricting sensitive files to treating clinicians" },
            { feature: "Emergency Override", manual: "Doctors locked out during trauma emergencies, or no passwords used at all", m365: "Auditable 'Break-Glass' protocol enabling immediate emergency care with full audit trail" },
            { feature: "Audit Logging", manual: "Paper registers or basic server logs that cannot track who viewed what", m365: "Immutable audit trail logging every user view, keystroke, and timestamp" },
            { feature: "Data Masking", manual: "Patient names printed openly on blood tubes and lab slips", m365: "Automated anonymized data masking for laboratory and research staff" },
            { feature: "Legal Compliance", manual: "Severe vulnerability to massive penalties under DPDP Act 2023", m365: "100% compliant with Indian data protection laws and statutory privacy mandates" }
        ],
        faqs: [
            { q: "How does the 'Break-Glass' emergency override feature work in life-threatening situations?", a: "If an unauthorized doctor in the emergency room needs urgent access to a confidential patient's allergy history or blood type, they can click 'Break-Glass'. The doctor must enter a mandatory clinical reason. Access is granted immediately, and the software dispatches an automated priority alert to the hospital medical director and privacy officer." },
            { q: "What penalties does the DPDP Act 2023 impose for healthcare data breaches in India?", a: "The Digital Personal Data Protection Act 2023 imposes significant financial penalties of up to ₹250 crore for failure to implement reasonable security safeguards preventing personal data breaches, making Medical365's encryption and RBAC architecture essential for Indian healthcare providers." },
            { q: "Can hospitals protect VIP patients and hospital staff health records from gossip and snooping?", a: "Yes. The 'VIP & Staff Privacy Shield' restricts access to designated senior consultants and administrators. Any attempt by unauthorized staff to search for a VIP patient generates a security violation flag." },
            { q: "How does the software comply with the Mental Healthcare Act 2017 regarding privacy?", a: "Under Section 23 of the MHCA 2017, a person with mental illness has the right to confidentiality. Medical365 isolates psychiatric notes, psychological evaluations, and medication logs from general hospital billing and casualty portals." },
            { q: "Can patients see who has accessed their medical records?", a: "Yes. Through the Medical365 patient privacy portal, patients can review a transparent access log showing which clinicians and departments have viewed their electronic health records." },
            { q: "Is confidential data stored on servers located within India?", a: "Yes. In full accordance with Indian healthcare data sovereignty guidelines, all patient records and cryptographic keys are hosted exclusively within Tier-IV data centers located physically within the Republic of India." }
        ]
    },

    // ══════════════════════════════════════════════════
    // HEALTHCARE INFRASTRUCTURE & SECURITY (1 page)
    // ══════════════════════════════════════════════════
    "cloud-security": {
        cluster: "CORE",
        title: "Healthcare Cloud Security Software | HIPAA & DPDP Compliant | Medical365",
        h1: "Enterprise Healthcare Cloud Security & Data Protection Software",
        metaDesc: "Medical365 healthcare cloud security software provides AES-256 encryption, ISO 27001 certified architecture, disaster recovery & DPDP Act 2023 compliance for hospitals.",
        diagramTitle: "Healthcare Cloud Infrastructure & Zero-Trust Security Architecture",
        nodes: ["Encrypted Endpoint Access (TLS 1.3)", "Zero-Trust Web Application Firewall (WAF)", "AES-256 Encrypted Database Clusters", "Automated Multi-Region Disaster Recovery", "24/7 Security Operations Center (SOC) & Audit"],
        color: "#475569",
        quickAnswer: "Healthcare cloud security software is an enterprise-grade cloud infrastructure and cybersecurity framework engineered specifically for hospitals and healthcare networks. It features AES-256 encryption at rest, TLS 1.3 in transit, zero-trust network access (ZTNA), automated multi-region disaster recovery backups, 99.99% high availability, and certified compliance with the DPDP Act 2023 and ISO/IEC 27001.",
        bgText: "Healthcare organizations are prime targets for cyberattacks, ransomware infections, and data breaches. Hospital networks store vast repositories of sensitive patient identifiers, clinical histories, financial transactions, and diagnostic imaging that cybercriminals exploit on the dark web.\n\nIn conventional Indian hospitals and diagnostic centers, IT infrastructure is vulnerable. Outdated on-premise local servers run unpatched operating systems in unventilated server closets without hardware redundancy. A single ransomware attack (like the devastating AIIMS cyberattack) can paralyze hospital operations for weeks: shutting down outpatient registration, freezing operating theaters, and destroying unbacked-up patient records. Furthermore, managing on-premise servers imposes heavy capital expenses on hospitals for hardware refreshes, cooling, and specialized IT personnel.\n\nMedical365's Healthcare Cloud Security platform eliminates on-premise infrastructure vulnerabilities by migrating hospital operations to a state-of-the-art, zero-trust cloud architecture. Hosted in ISO 27001-certified Indian data centers with military-grade AES-256 encryption, continuous vulnerability scanning, automated multi-region replication, and 99.99% uptime SLAs, Medical365 ensures hospital resilience against any cyber threat.",
        capabilities: [
            { title: "Military-Grade AES-256 & TLS 1.3 End-to-End Encryption", text: "Protects all clinical notes, imaging PACS, and financial transactions with AES-256 encryption at rest and TLS 1.3 with Perfect Forward Secrecy in transit." },
            { title: "Zero-Trust Network Access (ZTNA) & Multi-Factor Authentication", text: "Enforces strict identity verification for every access request: biometric login, hardware security keys, and time-based one-time passwords (TOTP) preventing credential hijacking." },
            { title: "Automated Real-Time Multi-Region Disaster Recovery (DR)", text: "Continuous database replication across geographically distributed Indian Tier-IV data centers, guaranteeing a Recovery Point Objective (RPO) of <5 minutes and Recovery Time Objective (RTO) of <15 minutes." },
            { title: "Web Application Firewall (WAF) & DDoS Mitigation", text: "Enterprise cloud WAF protecting against OWASP Top 10 vulnerabilities, SQL injection, cross-site scripting (XSS), and high-volume volumetric Distributed Denial of Service (DDoS) attacks." },
            { title: "24/7 AI-Powered Security Operations Center (SOC)", text: "Continuous threat monitoring and behavioral anomaly detection, automatically isolating compromised endpoints and blocking suspicious brute-force login attempts in real time." },
            { title: "Statutory DPDP Act 2023 & ISO 27001 Compliance", text: "Architected to satisfy all requirements of India's Digital Personal Data Protection Act 2023, National Health Data Management Policy (NDHM), and ISO/IEC 27001:2022 standards." }
        ],
        workflowSteps: [
            { step: "Secure Encrypted Handshake", desc: "User opens Medical365; system establishes a TLS 1.3 encrypted tunnel with mutual certificate verification." },
            { step: "Zero-Trust Identity Authentication", desc: "User credentials and multi-factor authentication (MFA) are verified against strict role-based access policies." },
            { step: "Continuous WAF Threat Inspection", desc: "Cloud Web Application Firewall inspects incoming traffic, filtering malicious payloads and automated bot attacks." },
            { step: "AES-256 Encrypted Transaction", desc: "Patient clinical data and imaging store with individual cryptographic data-key encryption in secure database clusters." },
            { step: "Automated Multi-Zone Backup & Audit", desc: "Continuous replication mirrors data to secondary disaster recovery zone; audit log writes to immutable write-once storage." }
        ],
        compliance: "Medical365 Healthcare Cloud Security operates in full compliance with the Digital Personal Data Protection (DPDP) Act 2023, Information Technology Act 2000 (Section 43A), ISO/IEC 27001:2022, and CERT-In cybersecurity directives.\n\nAll hospital data resides exclusively within sovereign Indian data centers with SOC 2 Type II certifications. Systems integrate seamlessly with the National Health Authority (NHA) ABDM ecosystem.",
        table: [
            { feature: "Server Architecture", manual: "Vulnerable on-premise local server in hospital closet; prone to hardware crashes", m365: "Enterprise cloud infrastructure with 99.99% uptime and zero maintenance downtime" },
            { feature: "Ransomware Defense", manual: "Basic antivirus software easily bypassed by modern crypto-ransomware", m365: "Zero-Trust cloud architecture with immutable air-gapped snapshots and real-time WAF" },
            { feature: "Data Backup & Recovery", manual: "Manual backup onto USB hard drive done sporadically; high loss risk", m365: "Continuous automated multi-region replication with RPO <5 minutes" },
            { feature: "Cybersecurity Compliance", manual: "Uncertified local setup vulnerable to massive penalties under DPDP Act", m365: "Certified ISO 27001, SOC 2 Type II, and DPDP Act 2023 compliant cloud" },
            { feature: "Scalability", manual: "Buying expensive new physical servers as patient data grows", m365: "Elastic cloud scalability expanding storage and computing capacity automatically" }
        ],
        faqs: [
            { q: "Where is hospital data physically stored?", a: "In strict accordance with Indian data localization laws, all patient health records, diagnostic images, and backups are hosted exclusively within Tier-IV data centers located physically within the Republic of India (Mumbai and Hyderabad regions)." },
            { q: "How does the cloud architecture protect hospitals from ransomware attacks?", a: "Unlike on-premise servers connected to vulnerable local hospital LANs, Medical365 operates in an isolated, zero-trust cloud environment. Immutable 'write-once-read-many' (WORM) snapshots are taken continuously, ensuring that even if a local clinic PC is infected, cloud hospital operations can be restored in minutes without data loss." },
            { q: "What is the guaranteed uptime and disaster recovery capability?", a: "Medical365 provides a guaranteed 99.99% uptime SLA. With automated multi-region active-active database replication, our disaster recovery protocols achieve a Recovery Point Objective (RPO) of under 5 minutes and a Recovery Time Objective (RTO) of under 15 minutes." },
            { q: "How does the system ensure data security on mobile devices and tablets?", a: "The Medical365 mobile application enforces biometric authentication (Face ID / Fingerprint), prohibits local caching of unencrypted medical media, prevents screen recording, and features automated remote session wiping if a device is lost or stolen." },
            { q: "Is the software compliant with CERT-In cybersecurity reporting directives?", a: "Yes. Medical365 maintains 24/7 Security Information and Event Management (SIEM) logging, enabling full compliance with the Indian Computer Emergency Response Team (CERT-In) mandatory cybersecurity incident reporting guidelines." },
            { q: "Can hospital administrators review security audit logs?", a: "Yes. Chief Information Security Officers (CISOs) and hospital administrators have access to an enterprise security dashboard tracking active user sessions, failed login attempts, IP geolocation maps, and privileged access logs." }
        ]
    }
};

const done = buildPages(batch4aData, repoRoot, diagramDir);
console.log(`=== BATCH 4A SUCCESS: Generated ${done} OB/GYN, Psychiatry & Security pages! ===`);


module.exports = batch4aData;
