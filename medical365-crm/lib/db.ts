import fs from 'fs';
import path from 'path';
import { Lead, initialLeads, LeadStatus } from '@/data/mockLeads';
import { Appointment, initialAppointments } from '@/data/mockAppointments';
import { InsuranceClaim, initialClaims } from '@/data/mockInsurance';

// Data storage directory (compatible with Next.js Serverless runtime & local)
const DATA_DIR = path.join(process.cwd(), '.crm-data');

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch {
    // Fallback if read-only filesystem
  }
}

function readJSON<T>(filename: string, fallback: T): T {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data) as T;
    }
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
  }
  return fallback;
}

function writeJSON<T>(filename: string, data: T): void {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
  }
}

// In-Memory singletons for instant reads with persistent fallback
let memoryLeads: Lead[] = [];
let memoryAppointments: Appointment[] = [];
let memoryClaims: InsuranceClaim[] = [];

// Initialize
function getLeadsStore(): Lead[] {
  if (memoryLeads.length === 0) {
    memoryLeads = readJSON<Lead[]>('leads.json', initialLeads);
  }
  return memoryLeads;
}

function getAppointmentsStore(): Appointment[] {
  if (memoryAppointments.length === 0) {
    memoryAppointments = readJSON<Appointment[]>('appointments.json', initialAppointments);
  }
  return memoryAppointments;
}

function getClaimsStore(): InsuranceClaim[] {
  if (memoryClaims.length === 0) {
    memoryClaims = readJSON<InsuranceClaim[]>('claims.json', initialClaims);
  }
  return memoryClaims;
}

export const db = {
  // LEADS
  leads: {
    findMany: (query?: { search?: string; status?: string; department?: string }): Lead[] => {
      const all = getLeadsStore();
      if (!query) return all;
      return all.filter(l => {
        if (query.status && query.status !== 'All' && l.status !== query.status) return false;
        if (query.department && query.department !== 'All' && l.department !== query.department) return false;
        if (query.search) {
          const s = query.search.toLowerCase();
          return (
            l.name.toLowerCase().includes(s) ||
            l.phone.toLowerCase().includes(s) ||
            l.city.toLowerCase().includes(s) ||
            l.requirement.toLowerCase().includes(s)
          );
        }
        return true;
      });
    },

    findById: (id: string): Lead | undefined => {
      return getLeadsStore().find(l => l.id === id);
    },

    create: (leadData: Omit<Lead, 'id' | 'addedOn'>): Lead => {
      const all = getLeadsStore();
      const today = new Date().toISOString().split('T')[0];
      const newLead: Lead = {
        ...leadData,
        id: `MED-${Date.now().toString().slice(-4)}`,
        addedOn: today,
        lastContacted: today,
      };
      memoryLeads = [newLead, ...all];
      writeJSON('leads.json', memoryLeads);
      return newLead;
    },

    update: (id: string, updates: Partial<Lead>): Lead | null => {
      const all = getLeadsStore();
      const index = all.findIndex(l => l.id === id);
      if (index === -1) return null;
      const updated = { ...all[index], ...updates };
      all[index] = updated;
      memoryLeads = [...all];
      writeJSON('leads.json', memoryLeads);
      return updated;
    },

    delete: (id: string): boolean => {
      const all = getLeadsStore();
      const filtered = all.filter(l => l.id !== id);
      if (filtered.length !== all.length) {
        memoryLeads = filtered;
        writeJSON('leads.json', memoryLeads);
        return true;
      }
      return false;
    }
  },

  // APPOINTMENTS
  appointments: {
    findMany: (): Appointment[] => {
      return getAppointmentsStore();
    },

    create: (data: Omit<Appointment, 'id' | 'scheduledAt'>): Appointment => {
      const all = getAppointmentsStore();
      const newAppt: Appointment = {
        ...data,
        id: `APT-${Date.now().toString().slice(-3)}`,
        scheduledAt: new Date().toISOString()
      };
      memoryAppointments = [newAppt, ...all];
      writeJSON('appointments.json', memoryAppointments);
      return newAppt;
    },

    update: (id: string, updates: Partial<Appointment>): Appointment | null => {
      const all = getAppointmentsStore();
      const index = all.findIndex(a => a.id === id);
      if (index === -1) return null;
      const updated = { ...all[index], ...updates };
      all[index] = updated;
      memoryAppointments = [...all];
      writeJSON('appointments.json', memoryAppointments);
      return updated;
    }
  },

  // INSURANCE CLAIMS
  insurance: {
    findMany: (): InsuranceClaim[] => {
      return getClaimsStore();
    },

    create: (data: Omit<InsuranceClaim, 'id' | 'claimNumber' | 'timeline'>): InsuranceClaim => {
      const all = getClaimsStore();
      const now = new Date();
      const timeStr = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      
      const newClaim: InsuranceClaim = {
        ...data,
        id: `CLM-${Date.now().toString().slice(-3)}`,
        claimNumber: `CLAIM-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        timeline: [
          {
            timestamp: timeStr,
            stage: 'Documents Collected',
            note: 'Initial cashless pre-authorization case registered.',
            actor: 'TPA Desk'
          }
        ]
      };
      memoryClaims = [newClaim, ...all];
      writeJSON('claims.json', memoryClaims);
      return newClaim;
    },

    update: (id: string, updates: Partial<InsuranceClaim>, timelineNote?: string): InsuranceClaim | null => {
      const all = getClaimsStore();
      const index = all.findIndex(c => c.id === id);
      if (index === -1) return null;
      
      const claim = all[index];
      const now = new Date();
      const timeStr = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      
      const updatedTimeline = [...claim.timeline];
      if (updates.status && updates.status !== claim.status) {
        updatedTimeline.push({
          timestamp: timeStr,
          stage: updates.status,
          note: timelineNote || `Status updated to ${updates.status}`,
          actor: 'TPA Desk'
        });
      }

      const updated = { ...claim, ...updates, timeline: updatedTimeline };
      all[index] = updated;
      memoryClaims = [...all];
      writeJSON('claims.json', memoryClaims);
      return updated;
    }
  }
};

/**
 * Intelligent Lead Scoring Algorithm
 */
export function calculateLeadScore(data: {
  phone?: string;
  email?: string;
  facility_type?: string;
  bed_count?: string;
  inquiry_topic?: string;
  value?: number;
  insuranceType?: string;
  notes?: string;
}): number {
  let score = 30; // base score

  if (data.phone && data.phone.trim().length >= 10) score += 20;
  if (data.email && data.email.includes('@')) score += 15;

  // Bed scale / Hospital scoring
  if (data.bed_count) {
    if (data.bed_count.includes('500+') || data.bed_count.includes('201-500')) score += 25;
    else if (data.bed_count.includes('51-200')) score += 20;
    else if (data.bed_count.includes('11-50')) score += 15;
  }

  // Facility type
  if (data.facility_type) {
    if (data.facility_type.includes('Multi-Specialty') || data.facility_type.includes('Hospital Chain')) score += 15;
    else if (data.facility_type.includes('Specialty Hospital')) score += 10;
  }

  // Intent
  if (data.inquiry_topic === 'Request Free Demo' || data.inquiry_topic === 'Book Consultation') score += 10;
  if (data.insuranceType === 'Cashless TPA' || data.insuranceType === 'Private Insurance') score += 10;
  if (data.value && data.value > 100000) score += 10;

  return Math.min(score, 100);
}
