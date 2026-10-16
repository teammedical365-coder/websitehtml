export type ClaimStatus = 
  | 'Documents Collected' 
  | 'Pre-Auth Submitted' 
  | 'Query Raised by TPA' 
  | 'Pre-Auth Approved' 
  | 'Final Enhancement at Discharge' 
  | 'Claim Settled' 
  | 'Initial Denial';

export interface ClaimTimelineItem {
  timestamp: string;
  stage: string;
  note: string;
  actor: string;
}

export interface InsuranceClaim {
  id: string;
  claimNumber: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  tpaName: string; // e.g. Star Health, Medi Assist, Care, Vidal, HDFC Ergo
  policyNumber: string;
  policyHolderName: string;
  relationWithPatient: 'Self' | 'Spouse' | 'Parent' | 'Child' | 'Dependent';
  hospitalizationType: 'Planned Surgery' | 'Emergency Admission' | 'Day Care Procedure';
  procedureName: string;
  department: string;
  admissionDate: string;
  expectedDischargeDate: string;
  estimatedCost: number;
  approvedAmount: number;
  coPayPercentage: number; // e.g. 10%
  deductibles: number; // e.g. consumables deduction
  patientShare: number; // calculated out-of-pocket
  status: ClaimStatus;
  queryDetails?: string;
  tpaApprovalLetterUrl?: string;
  timeline: ClaimTimelineItem[];
}

export const tpaProviders = [
  'Star Health & Allied Insurance',
  'Medi Assist Healthcare TPA',
  'Care Health Insurance',
  'HDFC ERGO General Insurance',
  'Vidal Health Insurance TPA',
  'ICICI Lombard General Insurance',
  'Niva Bupa Health Insurance',
  'Paramount Health Services TPA',
  'MDIndia Health Insurance TPA'
];

export const initialClaims: InsuranceClaim[] = [
  {
    id: 'CLM-501',
    claimNumber: 'STAR-IND-2026-9812',
    patientId: 'MED-8921',
    patientName: 'Rameshwar Lal Sharma',
    patientPhone: '+91 98290 12345',
    tpaName: 'Star Health & Allied Insurance',
    policyNumber: 'P/161118/01/2026/004312',
    policyHolderName: 'Rameshwar Lal Sharma',
    relationWithPatient: 'Self',
    hospitalizationType: 'Planned Surgery',
    procedureName: 'Total Knee Replacement (Right Knee)',
    department: 'Orthopedics & Joint Replacement',
    admissionDate: '2026-10-18',
    expectedDischargeDate: '2026-10-22',
    estimatedCost: 285000,
    approvedAmount: 250000,
    coPayPercentage: 10,
    deductibles: 10000,
    patientShare: 35000,
    status: 'Pre-Auth Approved',
    timeline: [
      { timestamp: '2026-10-14 11:30 AM', stage: 'Documents Collected', note: 'Aadhaar, Pan Card, Star Health Card, and Ortho X-Ray submitted.', actor: 'TPA Desk (Deepak)' },
      { timestamp: '2026-10-15 02:15 PM', stage: 'Pre-Auth Submitted', note: 'Initial cashless pre-auth of ₹2,85,000 sent via Star Health portal.', actor: 'TPA Desk (Deepak)' },
      { timestamp: '2026-10-15 06:40 PM', stage: 'Pre-Auth Approved', note: 'Initial approval letter received for ₹2,50,000 with 10% co-pay clause.', actor: 'System Auto-Sync' }
    ]
  },
  {
    id: 'CLM-502',
    claimNumber: 'MEDI-AST-2026-4431',
    patientId: 'MED-7634',
    patientName: 'Sunita Aggarwal',
    patientPhone: '+91 98101 54321',
    tpaName: 'Medi Assist Healthcare TPA',
    policyNumber: '2819/00341201/00/000',
    policyHolderName: 'Vijay Aggarwal',
    relationWithPatient: 'Spouse',
    hospitalizationType: 'Planned Surgery',
    procedureName: 'Coronary Angioplasty (Single Stent)',
    department: 'Cardiology & Cardiac Surgery',
    admissionDate: '2026-10-19',
    expectedDischargeDate: '2026-10-21',
    estimatedCost: 210000,
    approvedAmount: 0,
    coPayPercentage: 0,
    deductibles: 0,
    patientShare: 0,
    status: 'Query Raised by TPA',
    queryDetails: 'Medi Assist requested 1-year prior hypertension prescription and ECG tracing from treating cardiologist.',
    timeline: [
      { timestamp: '2026-10-15 10:00 AM', stage: 'Documents Collected', note: 'Cardiology summary and Medi Assist e-card collected.', actor: 'TPA Desk' },
      { timestamp: '2026-10-15 01:20 PM', stage: 'Pre-Auth Submitted', note: 'Request submitted for ₹2,10,000.', actor: 'TPA Desk' },
      { timestamp: '2026-10-15 05:45 PM', stage: 'Query Raised by TPA', note: 'Clarification query raised regarding past medical history.', actor: 'Medi Assist Portal' }
    ]
  },
  {
    id: 'CLM-503',
    claimNumber: 'CARE-EXP-2026-8804',
    patientId: 'MED-5512',
    patientName: 'Devendra Meena',
    patientPhone: '+91 97841 23456',
    tpaName: 'Care Health Insurance',
    policyNumber: '1109482103984',
    policyHolderName: 'Devendra Meena',
    relationWithPatient: 'Self',
    hospitalizationType: 'Planned Surgery',
    procedureName: 'Laparoscopic Cholecystectomy',
    department: 'General & Laparoscopic Surgery',
    admissionDate: '2026-10-20',
    expectedDischargeDate: '2026-10-21',
    estimatedCost: 95000,
    approvedAmount: 0,
    coPayPercentage: 0,
    deductibles: 0,
    patientShare: 0,
    status: 'Pre-Auth Submitted',
    timeline: [
      { timestamp: '2026-10-16 09:30 AM', stage: 'Documents Collected', note: 'Ultrasound report confirmed multiple gallstones. Care Health card verified.', actor: 'TPA Desk' },
      { timestamp: '2026-10-16 10:15 AM', stage: 'Pre-Auth Submitted', note: 'Pre-auth form submitted with surgeon estimate.', actor: 'TPA Desk' }
    ]
  },
  {
    id: 'CLM-504',
    claimNumber: 'HDFC-ERGO-2026-1192',
    patientId: 'MED-3329',
    patientName: 'Vikas Shekhawat',
    patientPhone: '+91 99280 45678',
    tpaName: 'HDFC ERGO General Insurance',
    policyNumber: '28042008432190',
    policyHolderName: 'Vikas Shekhawat',
    relationWithPatient: 'Self',
    hospitalizationType: 'Day Care Procedure',
    procedureName: 'Arthroscopic ACL Repair',
    department: 'Orthopedics & Joint Replacement',
    admissionDate: '2026-10-17',
    expectedDischargeDate: '2026-10-18',
    estimatedCost: 140000,
    approvedAmount: 130000,
    coPayPercentage: 5,
    deductibles: 5000,
    patientShare: 12000,
    status: 'Final Enhancement at Discharge',
    timeline: [
      { timestamp: '2026-10-13 11:00 AM', stage: 'Documents Collected', note: 'Pre-admission docs processed.', actor: 'TPA Desk' },
      { timestamp: '2026-10-14 02:00 PM', stage: 'Pre-Auth Approved', note: 'Approved for ₹1,10,000.', actor: 'HDFC ERGO' },
      { timestamp: '2026-10-16 10:00 AM', stage: 'Final Enhancement at Discharge', note: 'Final enhancement request sent for additional implant cost.', actor: 'TPA Desk' }
    ]
  }
];
