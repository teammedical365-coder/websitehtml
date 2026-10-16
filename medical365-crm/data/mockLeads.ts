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
  phone: string;
  email: string;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
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
    id: 'MED-101',
    name: 'Ranjith NK',
    phone: '+91 98765 43210',
    email: 'ranjith.nk@gmail.com',
    age: 58,
    gender: 'Male',
    requirement: 'Bilateral Robotic Knee Replacement Surgery',
    department: 'Orthopedics & Joint Replacement',
    status: 'New Inquiry',
    source: 'Website',
    assignedTo: 'Dr. Rohit Kapoor (Orthopedics)',
    value: 380000,
    budget: '₹3.8L',
    insuranceType: 'Cashless TPA',
    score: 95,
    priority: 'High',
    city: 'Bengaluru',
    notes: 'Severe Osteoarthritis Stage 4. X-Rays uploaded. Looking for fast hospital admission date.',
    nextAction: 'Schedule OPD consultation with Dr. Rohit Kapoor on Friday',
    addedOn: '2026-10-15',
    lastContacted: '2026-10-15'
  },
  {
    id: 'MED-102',
    name: 'Sunita Sharma',
    phone: '+91 91234 56789',
    email: 'sunita.sharma@yahoo.com',
    age: 32,
    gender: 'Female',
    requirement: 'IVF ICSI Complete Cycle with Blastocyst Culture',
    department: 'IVF & Fertility Care',
    status: 'Contacted',
    source: 'Practo',
    assignedTo: 'Dr. Ananya Roy (Fertility / IVF)',
    value: 220000,
    budget: '₹2.2L',
    insuranceType: 'Zero-cost EMI',
    score: 88,
    priority: 'High',
    city: 'Mumbai',
    notes: 'Secondary infertility case. Prior reports reviewed by clinic coordinator.',
    nextAction: 'Send IVF package brochure and 0% EMI financing plan via WhatsApp',
    addedOn: '2026-10-14',
    lastContacted: '2026-10-15'
  },
  {
    id: 'MED-103',
    name: 'Ankit Sharma (Tata Steel)',
    phone: '+91 99887 76655',
    email: 'ankit.hr@tatasteel.com',
    age: 44,
    gender: 'Male',
    requirement: 'Executive Corporate Comprehensive Health Checkup (85 Employees)',
    department: 'Cardiology & Cardiac Surgery',
    status: 'Consultation Booked',
    source: 'Corporate Tie-up',
    assignedTo: 'Dr. Priya Mehta (Cardiology)',
    value: 450000,
    budget: '₹4.5L',
    insuranceType: 'Corporate Tie-up' as any,
    score: 92,
    priority: 'High',
    city: 'Jamshedpur / Delhi NCR',
    notes: 'Corporate tie-up proposal submitted for annual employee wellness camp.',
    nextAction: 'Confirm on-site phlebotomy & ECG camp schedule for next month',
    addedOn: '2026-10-12',
    lastContacted: '2026-10-14'
  },
  {
    id: 'MED-104',
    name: 'Manpreet Kaur',
    phone: '+91 98111 22334',
    email: 'manpreet.k@outlook.com',
    age: 28,
    gender: 'Female',
    requirement: 'Rhinoplasty & Septoplasty (Functional & Aesthetic)',
    department: 'Cosmetic Surgery & Dermatology',
    status: 'Estimate Shared',
    source: 'Meta Ads',
    assignedTo: 'Dr. Vikram Sethi (Cosmetic & Plastic)',
    value: 165000,
    budget: '₹1.65L',
    insuranceType: 'Self Pay / Cash',
    score: 84,
    priority: 'Medium',
    city: 'Chandigarh',
    notes: 'Virtual 3D morphing consultation done. Estimate sent with OT dates options.',
    nextAction: 'Follow up regarding pre-anesthesia checkup (PAC) appointment',
    addedOn: '2026-10-11',
    lastContacted: '2026-10-14'
  },
  {
    id: 'MED-105',
    name: 'Bajrang Sultania',
    phone: '+91 98222 33445',
    email: 'bajrang@sultania.in',
    age: 63,
    gender: 'Male',
    requirement: 'Coronary Angiography & Drug Eluting Stent Angioplasty (PTCA)',
    department: 'Cardiology & Cardiac Surgery',
    status: 'Treatment Started',
    source: 'Doctor Referral',
    assignedTo: 'Dr. Priya Mehta (Cardiology)',
    value: 420000,
    budget: '₹4.2L',
    insuranceType: 'Cashless TPA',
    score: 98,
    priority: 'High',
    city: 'Jaipur',
    notes: 'TPA Pre-auth approved by Star Health for ₹4.2 Lakhs. Successfully admitted to CCU.',
    nextAction: 'Cath lab procedure scheduled for 2:00 PM today',
    addedOn: '2026-10-09',
    lastContacted: '2026-10-15'
  },
  {
    id: 'MED-106',
    name: 'Aarav Patel',
    phone: '+91 97333 44556',
    email: 'aarav.patel@gmail.com',
    age: 39,
    gender: 'Male',
    requirement: 'Full Mouth Dental Implants (All-on-4 Upper & Lower)',
    department: 'Dental & Maxillofacial Care',
    status: 'Treatment Started',
    source: 'Hospital Walk-in',
    assignedTo: 'Dr. Arjun Sen (General Surgery)',
    value: 290000,
    budget: '₹2.9L',
    insuranceType: 'Self Pay / Cash',
    score: 100,
    priority: 'Medium',
    city: 'Ahmedabad',
    notes: 'Stage 1 implant fixture placement completed. Healing abutments attached.',
    nextAction: 'Schedule follow-up suture removal in 7 days',
    addedOn: '2026-10-08',
    lastContacted: '2026-10-13'
  },
  {
    id: 'MED-107',
    name: 'Roman Sharma',
    phone: '+91 98444 55667',
    email: 'roman.sharma@techcorp.in',
    age: 35,
    gender: 'Male',
    requirement: 'Hair Transplant (3,500 FUE Grafts)',
    department: 'Cosmetic Surgery & Dermatology',
    status: 'Dropped',
    source: 'Google Ads',
    assignedTo: 'Dr. Vikram Sethi (Cosmetic & Plastic)',
    value: 95000,
    budget: '₹95,000',
    insuranceType: 'Self Pay / Cash',
    score: 35,
    priority: 'Low',
    city: 'Pune',
    notes: 'Patient opted for non-surgical PRP therapy at a local clinic.',
    nextAction: 'Tag for remarketing campaign next quarter',
    addedOn: '2026-10-05',
    lastContacted: '2026-10-10'
  }
];
