export type LeadStatus = 
  | 'New Inquiry' 
  | 'Contacted' 
  | 'Consultation Booked' 
  | 'Estimate Shared' 
  | 'Treatment Started' 
  | 'Dropped' 
  | 'Follow-up';

export type LeadSource = 
  | 'Website' 
  | 'Practo' 
  | 'Google Ads' 
  | 'Doctor Referral' 
  | 'Hospital Walk-in' 
  | 'Health Camp' 
  | 'Corporate Tie-up' 
  | 'Meta Ads';

export type PriorityLevel = 'High' | 'Medium' | 'Low';
export type InsuranceType = 'Cashless TPA' | 'Private Insurance' | 'Self Pay / Cash' | 'Zero-cost EMI';

export interface Lead {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  phone: string;
  email: string;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  organization?: string;
  facilityType?: string;
  bedCount?: string | null;
  challenges?: string | null;
  sourceUrl?: string;
  sourcePageUrl?: string;
  pageTitle?: string;
  submittedAt?: string;
  requirement: string; // Treatment / Specialty Required
  department: string;  // Cardiology, Orthopedics, IVF, Dental, Oncology, etc.
  status: LeadStatus;
  source: LeadSource;
  assignedTo: string; // Doctor / Patient Coordinator
  value: number; // Estimated Procedure / Treatment Cost (₹)
  insuranceType?: InsuranceType;
  budget?: string;
  score: number; // Health Urgency / Conversion Intent (1-100)
  priority: PriorityLevel; // Urgency level
  city: string;
  notes?: string; // Medical symptoms, clinical notes
  nextAction?: string;
  addedOn: string;
  lastContacted?: string;
}

export const stages: { id: LeadStatus; title: string; color: string; bg: string; text: string; border: string }[] = [
  { id: 'New Inquiry', title: 'New Inquiry', color: 'blue', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  { id: 'Contacted', title: 'Contacted / Triaged', color: 'purple', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  { id: 'Consultation Booked', title: 'Consultation Booked', color: 'amber', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  { id: 'Estimate Shared', title: 'Estimate Shared', color: 'orange', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  { id: 'Treatment Started', title: 'Treatment Started (Won)', color: 'emerald', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  { id: 'Dropped', title: 'Dropped / Not Proceeding', color: 'rose', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  { id: 'Follow-up', title: 'Follow-up / On Hold', color: 'slate', bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300' }
];

export const medicalDepartments = [
  'Orthopedics & Joint Replacement',
  'Cardiology & Cardiac Surgery',
  'IVF & Fertility Care',
  'Dental & Maxillofacial Care',
  'Cosmetic Surgery & Dermatology',
  'Neurology & Spine Care',
  'General & Laparoscopic Surgery',
  'Oncology Care',
  'Pediatrics & ENT'
];

export const allSources: LeadSource[] = [
  'Website',
  'Practo',
  'Google Ads',
  'Doctor Referral',
  'Hospital Walk-in',
  'Health Camp',
  'Corporate Tie-up',
  'Meta Ads'
];

export const medicalStaff = [
  'Dr. Rohit Kapoor (Orthopedics)',
  'Dr. Priya Mehta (Cardiology)',
  'Dr. Ananya Roy (Fertility / IVF)',
  'Dr. Vikram Sethi (Cosmetic & Plastic)',
  'Dr. Arjun Sen (General Surgery)',
  'Nurse Sneha (Triage Coordinator)'
];

export const insuranceOptions: InsuranceType[] = [
  'Cashless TPA',
  'Private Insurance',
  'Self Pay / Cash',
  'Zero-cost EMI'
];

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const initialLeads: Lead[] = [
  {
    id: 'MED-2001',
    name: 'Dr velentina sogra (indore)',
    firstName: 'Dr velentina',
    lastName: 'sogra',
    fullName: 'Dr velentina sogra',
    phone: '+919009779047',
    email: 'velentinasogra97@gmail.com',
    gender: 'Other',
    requirement: 'Facility: Other • Inquiry: Book a Free Demo',
    department: 'Hospital Administration & IT',
    organization: 'indore',
    facilityType: 'Other',
    bedCount: null,
    challenges: 'im in the ayurvedic brand which is selling cbd products im an ayurvedic dr who is consultant dr in this company they are telling me whstever the orders we get from website you create a prescription in which companys name or logo will not be shown that prescription will only be made on your name that means teleconsultation done via will not be shown is it right and what are the rules',
    sourceUrl: 'https://www.medical365.in/book-demo',
    sourcePageUrl: 'https://www.medical365.in/book-demo',
    pageTitle: 'Book a Free Demo - Medical365',
    submittedAt: '2026-10-21T06:38:43.284Z',
    status: 'New Inquiry',
    source: 'Website',
    assignedTo: 'Nurse Sneha (Triage Coordinator)',
    value: 75000,
    budget: '₹75,000',
    insuranceType: 'Self Pay / Cash',
    score: 85,
    priority: 'High',
    city: 'Indore',
    notes: 'Teleconsultation prescription compliance query for Ayurvedic CBD brand consultation.',
    nextAction: 'Triage teleconsultation compliance rules and schedule product demo',
    addedOn: '2026-10-21',
    lastContacted: '2026-10-21'
  },
  {
    id: 'MED-2002',
    name: 'Dr. Deep Patel (Shubham Cancer Center)',
    firstName: 'Dr. Deep',
    lastName: 'Patel',
    fullName: 'Dr. Deep Patel',
    phone: '+919913280768',
    email: 'Wandervester@gmail.com',
    gender: 'Male',
    requirement: 'Facility: Clinic / Polyclinic • 1–10 Doctors • Oncology Specific Software',
    department: 'Oncology Care',
    organization: 'Shubham Cancer Center',
    facilityType: 'Clinic / Polyclinic',
    bedCount: '1–10 Doctors',
    challenges: 'Would like to see the Oncology Specific products',
    sourceUrl: 'https://www.medical365.in/book-demo',
    sourcePageUrl: 'https://www.medical365.in/book-demo',
    pageTitle: 'Book a Free Demo - Medical365',
    submittedAt: '2026-10-19T11:50:36.741Z',
    status: 'Contacted',
    source: 'Website',
    assignedTo: 'Dr. Vikram Sethi (Cosmetic & Plastic)',
    value: 180000,
    budget: '₹1.8L',
    insuranceType: 'Cashless TPA',
    score: 95,
    priority: 'High',
    city: 'Ahmedabad',
    notes: 'Cancer Center demo inquiry. Specifically interested in Oncology Specific EMR & treatment planning tools.',
    nextAction: 'Schedule specialized Oncology care module demo on Google Meet',
    addedOn: '2026-10-19',
    lastContacted: '2026-10-20'
  },
  {
    id: 'MED-2003',
    name: 'Tovindra Sahu (Getwell Polyclinic & Hospital)',
    firstName: 'Tovindra',
    lastName: 'Sahu',
    fullName: 'Tovindra Sahu',
    phone: '+919214086878',
    email: 'tovindra@gmail.com',
    gender: 'Other',
    requirement: 'Facility: Diagnostic Lab • 1–10 Doctors • LIMS & Polyclinic HMS',
    department: 'General & Laparoscopic Surgery',
    organization: 'Getwell Polyclinic & Hospital',
    facilityType: 'Diagnostic Lab',
    bedCount: '1–10 Doctors',
    challenges: null,
    sourceUrl: 'https://www.medical365.in/book-demo',
    sourcePageUrl: 'https://www.medical365.in/book-demo',
    pageTitle: 'Book a Free Demo - Medical365',
    submittedAt: '2026-10-15T00:00:00.000Z',
    status: 'New Inquiry',
    source: 'Website',
    assignedTo: 'Dr. Arjun Sen (General Surgery)',
    value: 120000,
    budget: '₹1.2L',
    insuranceType: 'Self Pay / Cash',
    score: 78,
    priority: 'High',
    city: 'Jaipur',
    notes: 'Diagnostic Lab and Polyclinic software requirement.',
    nextAction: 'Call Tovindra to confirm LIMS and polyclinic doctor roster requirements',
    addedOn: '2026-10-15',
    lastContacted: '2026-10-15'
  },
  {
    id: 'MED-2004',
    name: 'Anshuman Dewan (Hospital)',
    firstName: 'Anshuman',
    lastName: 'Dewan',
    fullName: 'Anshuman Dewan',
    phone: '+919425111727',
    email: 'anshuman9@hotmail.com',
    gender: 'Male',
    requirement: 'Facility: Other • 11–50 Beds • Hospital Information Management',
    department: 'Hospital Administration & IT',
    organization: 'Hospital',
    facilityType: 'Other',
    bedCount: '11–50 Beds',
    challenges: null,
    sourceUrl: 'https://www.medical365.in/book-demo',
    sourcePageUrl: 'https://www.medical365.in/book-demo',
    pageTitle: 'Book a Free Demo - Medical365',
    submittedAt: '2026-10-10T00:00:00.000Z',
    status: 'New Inquiry',
    source: 'Website',
    assignedTo: 'Nurse Sneha (Triage Coordinator)',
    value: 150000,
    budget: '₹1.5L',
    insuranceType: 'Cashless TPA',
    score: 82,
    priority: 'High',
    city: 'Bhopal',
    notes: 'Hospital with 11-50 beds evaluating cloud-based HMS & bed management.',
    nextAction: 'Initiate discovery call to identify departments and bed count specifics',
    addedOn: '2026-10-10',
    lastContacted: '2026-10-10'
  },
  {
    id: 'MED-2005',
    name: 'shubham dadhich (SHREE RAMCHANDRA MEMORIAL HOSPITAL)',
    firstName: 'shubham',
    lastName: 'dadhich',
    fullName: 'shubham dadhich',
    phone: '+918385800378',
    email: 'dadhich.shubham20@gmail.com',
    gender: 'Male',
    requirement: 'Facility: Multi-Specialty Hospital • 11–50 Beds • ABDM Collaborated Software',
    department: 'Hospital Administration & IT',
    organization: 'SHREE RAMCHANDRA MEMORIAL HOSPITAL',
    facilityType: 'Multi-Specialty Hospital',
    bedCount: '11–50 Beds',
    challenges: 'REQUIRE A ABDM COLLABORATED SOFTWARE',
    sourceUrl: 'https://www.medical365.in/book-demo',
    sourcePageUrl: 'https://www.medical365.in/book-demo',
    pageTitle: 'Book a Free Demo - Medical365',
    submittedAt: '2026-09-16T07:42:00.000Z',
    status: 'Consultation Booked',
    source: 'Website',
    assignedTo: 'Dr. Rohit Kapoor (Orthopedics)',
    value: 250000,
    budget: '₹2.5L',
    insuranceType: 'Cashless TPA',
    score: 98,
    priority: 'High',
    city: 'Jaipur',
    notes: 'Multi-specialty hospital (11-50 beds). High priority: requires ABDM collaborated software for ABHA creation and digital health record exchange.',
    nextAction: 'Present live ABDM M1/M2/M3 compliance sandbox on site',
    addedOn: '2026-09-16',
    lastContacted: '2026-09-18'
  },
  {
    id: 'MED-2006',
    name: 'Nimisha G (Meridian Projects)',
    firstName: 'Nimisha',
    lastName: 'G',
    fullName: 'Nimisha G',
    phone: '+919646437456',
    email: 'gmlnimisha@gmail.com',
    gender: 'Female',
    requirement: 'Facility: Other • Healthcare Project Management & Clinic Software',
    department: 'Hospital Administration & IT',
    organization: 'Meridian Projects',
    facilityType: 'Other',
    bedCount: null,
    challenges: null,
    sourceUrl: 'https://www.medical365.in/book-demo',
    sourcePageUrl: 'https://www.medical365.in/book-demo',
    pageTitle: 'Book a Free Demo - Medical365',
    submittedAt: '2026-09-13T03:50:00.000Z',
    status: 'New Inquiry',
    source: 'Website',
    assignedTo: 'Nurse Sneha (Triage Coordinator)',
    value: 85000,
    budget: '₹85,000',
    insuranceType: 'Self Pay / Cash',
    score: 72,
    priority: 'Medium',
    city: 'Delhi NCR',
    notes: 'Meridian Projects healthcare infrastructure inquiry.',
    nextAction: 'Follow up to determine clinical scope and timeline',
    addedOn: '2026-09-13',
    lastContacted: '2026-09-13'
  },
  {
    id: 'MED-2007',
    name: 'Aamil raza (RNH)',
    firstName: 'Aamil',
    lastName: 'raza',
    fullName: 'Aamil raza',
    phone: '+919205950905',
    email: 'rnhprna@gmail.com',
    gender: 'Male',
    requirement: 'Facility: Specialty Hospital • 11–50 Beds • HMS & Inpatient System',
    department: 'Hospital Administration & IT',
    organization: 'RNH',
    facilityType: 'Specialty Hospital',
    bedCount: '11–50 Beds',
    challenges: null,
    sourceUrl: 'https://www.medical365.in/book-demo',
    sourcePageUrl: 'https://www.medical365.in/book-demo',
    pageTitle: 'Book a Free Demo - Medical365',
    submittedAt: '2026-09-12T20:01:00.000Z',
    status: 'New Inquiry',
    source: 'Website',
    assignedTo: 'Dr. Arjun Sen (General Surgery)',
    value: 190000,
    budget: '₹1.9L',
    insuranceType: 'Cashless TPA',
    score: 88,
    priority: 'High',
    city: 'Lucknow',
    notes: 'Specialty Hospital (RNH) with 11-50 beds evaluating comprehensive IPD/OPD/Billing suite.',
    nextAction: 'Schedule product walkthrough covering inpatient bed management and billing',
    addedOn: '2026-09-12',
    lastContacted: '2026-09-14'
  }
];
