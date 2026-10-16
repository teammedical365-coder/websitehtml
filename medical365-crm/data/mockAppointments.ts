export type AppointmentStatus = 'Waiting' | 'In Consultation' | 'Completed' | 'No Show' | 'Cancelled';
export type AppointmentType = 'In-Person OPD' | 'Video Teleconsult' | 'Emergency Walk-in';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  doctorName: string;
  department: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:30 AM"
  type: AppointmentType;
  tokenNumber: number;
  status: AppointmentStatus;
  fee: number;
  notes?: string;
  roomNo?: string;
  scheduledAt: string;
}

export const initialAppointments: Appointment[] = [
  {
    id: 'APT-101',
    patientId: 'MED-8921',
    patientName: 'Rameshwar Lal Sharma',
    patientPhone: '+91 98290 12345',
    doctorName: 'Dr. Rohit Kapoor (Orthopedics)',
    department: 'Orthopedics & Joint Replacement',
    date: '2026-10-16',
    timeSlot: '10:00 AM',
    type: 'In-Person OPD',
    tokenNumber: 1,
    status: 'In Consultation',
    fee: 800,
    roomNo: 'OPD-104',
    notes: 'Bilateral knee pain, MRI scans brought. Evaluation for TKR surgery.',
    scheduledAt: '2026-10-16T09:45:00Z'
  },
  {
    id: 'APT-102',
    patientId: 'MED-7634',
    patientName: 'Sunita Aggarwal',
    patientPhone: '+91 98101 54321',
    doctorName: 'Dr. Priya Mehta (Cardiology)',
    department: 'Cardiology & Cardiac Surgery',
    date: '2026-10-16',
    timeSlot: '10:30 AM',
    type: 'In-Person OPD',
    tokenNumber: 2,
    status: 'Waiting',
    fee: 1000,
    roomNo: 'OPD-102',
    notes: 'Post-angioplasty routine checkup and blood pressure monitoring.',
    scheduledAt: '2026-10-16T10:15:00Z'
  },
  {
    id: 'APT-103',
    patientId: 'MED-4321',
    patientName: 'Pooja Verma',
    patientPhone: '+91 94140 87654',
    doctorName: 'Dr. Ananya Roy (Fertility / IVF)',
    department: 'IVF & Fertility Care',
    date: '2026-10-16',
    timeSlot: '11:15 AM',
    type: 'Video Teleconsult',
    tokenNumber: 3,
    status: 'Waiting',
    fee: 1200,
    roomNo: 'Virtual Room 2',
    notes: 'Initial IVF consultation. Review of hormonal reports from Alwar center.',
    scheduledAt: '2026-10-16T10:20:00Z'
  },
  {
    id: 'APT-104',
    patientId: 'MED-5512',
    patientName: 'Devendra Meena',
    patientPhone: '+91 97841 23456',
    doctorName: 'Dr. Arjun Sen (General Surgery)',
    department: 'General & Laparoscopic Surgery',
    date: '2026-10-16',
    timeSlot: '09:30 AM',
    type: 'In-Person OPD',
    tokenNumber: 4,
    status: 'Completed',
    fee: 600,
    roomNo: 'OPD-108',
    notes: 'Gallbladder stone USG review. Advised laparoscopic cholecystectomy estimate.',
    scheduledAt: '2026-10-16T09:15:00Z'
  },
  {
    id: 'APT-105',
    patientId: 'MED-3329',
    patientName: 'Vikas Shekhawat',
    patientPhone: '+91 99280 45678',
    doctorName: 'Dr. Rohit Kapoor (Orthopedics)',
    department: 'Orthopedics & Joint Replacement',
    date: '2026-10-16',
    timeSlot: '11:45 AM',
    type: 'In-Person OPD',
    tokenNumber: 5,
    status: 'Waiting',
    fee: 800,
    roomNo: 'OPD-104',
    notes: 'ACL reconstruction surgery review and post-op rehabilitation plan.',
    scheduledAt: '2026-10-16T10:40:00Z'
  }
];

export const opdTimeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
  '06:00 PM', '06:30 PM', '07:00 PM'
];
