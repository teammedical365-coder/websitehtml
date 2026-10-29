'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Lead, LeadStatus, initialLeads } from '@/data/mockLeads';

interface LeadContextType {
  leads: Lead[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredLeads: Lead[];
  addLead: (newLead: Omit<Lead, 'id' | 'addedOn'>) => Lead;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  moveLead: (id: string, newStatus: LeadStatus) => void;
  isAddModalOpen: boolean;
  openAddModal: () => void;
  closeAddModal: () => void;
  selectedLead: Lead | null;
  openLeadDetail: (lead: Lead) => void;
  closeLeadDetail: () => void;
  metrics: {
    totalLeads: number;
    activeLeads: number;
    wonLeads: number;
    lostLeads: number;
    totalPipelineValue: number;
    wonValue: number;
    winRate: number;
  };
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

const STORAGE_KEY = 'medical365_crm_leads_v2';

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from LocalStorage and sync with API on mount
  useEffect(() => {
    try {
      // Clear legacy mock storage key if present
      localStorage.removeItem('medical365_crm_leads_v1');

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filter out legacy dummy mock leads
          const valid = parsed.filter((l: Lead) => !['MED-101', 'MED-102', 'MED-103', 'MED-104', 'MED-105', 'MED-106', 'MED-107'].includes(l.id));
          if (valid.length > 0) {
            setLeads(valid);
          } else {
            setLeads(initialLeads);
          }
        }
      }
    } catch {
      // ignore
    } finally {
      setIsHydrated(true);
    }

    // Server-side DB sync
    fetch('/api/leads')
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setLeads(prev => {
            // merge server leads with local leads
            const existingIds = new Set(prev.map(l => l.id));
            const newServerLeads = res.data.filter((l: Lead) => !existingIds.has(l.id));
            if (newServerLeads.length > 0) {
              return [...newServerLeads, ...prev];
            }
            return prev;
          });
        }
      })
      .catch(() => {});

    // Listen for live lead capture events from website forms and WhatsApp inquiries
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === 'm365_crm_leads' || e.key === 'm365_captured_leads') {
        try {
          const v2 = localStorage.getItem(STORAGE_KEY);
          if (v2) {
            setLeads(JSON.parse(v2));
          }
        } catch {}
      }
    };
    const handleLiveCapture = () => {
      try {
        const v2 = localStorage.getItem(STORAGE_KEY);
        if (v2) {
          setLeads(JSON.parse(v2));
        }
      } catch {}
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('m365_lead_captured', handleLiveCapture);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('m365_lead_captured', handleLiveCapture);
    };
  }, []);

  // Sync to LocalStorage on change
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
      } catch {
        // ignore
      }
    }
  }, [leads, isHydrated]);

  const addLead = (newLeadData: Omit<Lead, 'id' | 'addedOn'>) => {
    const today = new Date().toISOString().split('T')[0];
    const created: Lead = {
      ...newLeadData,
      id: `MED-${Date.now().toString().slice(-4)}`,
      addedOn: today,
      lastContacted: today,
    };
    setLeads(prev => [created, ...prev]);

    // Async persist to server backend
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLeadData)
    }).catch(() => {});

    return created;
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates } : item))
    );
    setSelectedLead(prev => (prev && prev.id === id ? { ...prev, ...updates } : prev));

    // Async persist to server backend
    fetch('/api/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updates })
    }).catch(() => {});
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(item => item.id !== id));
    if (selectedLead?.id === id) {
      setSelectedLead(null);
    }
  };

  const moveLead = (id: string, newStatus: LeadStatus) => {
    updateLead(id, { status: newStatus });
  };

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openLeadDetail = (lead: Lead) => setSelectedLead(lead);
  const closeLeadDetail = () => setSelectedLead(null);

  // Filtered leads based on search query
  const filteredLeads = useMemo(() => {
    if (!searchQuery.trim()) return leads;
    const q = searchQuery.toLowerCase().trim();
    return leads.filter(
      lead =>
        lead.name.toLowerCase().includes(q) ||
        lead.phone.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.requirement.toLowerCase().includes(q) ||
        (lead.department && lead.department.toLowerCase().includes(q)) ||
        lead.city.toLowerCase().includes(q) ||
        lead.assignedTo.toLowerCase().includes(q) ||
        lead.source.toLowerCase().includes(q) ||
        lead.status.toLowerCase().includes(q) ||
        (lead.insuranceType && lead.insuranceType.toLowerCase().includes(q))
    );
  }, [leads, searchQuery]);

  // Derived KPIs for Medical365
  const metrics = useMemo(() => {
    const totalLeads = leads.length;
    let wonLeads = 0;
    let lostLeads = 0;
    let totalPipelineValue = 0;
    let wonValue = 0;

    leads.forEach(l => {
      const val = Number(l.value) || 0;
      if (l.status === 'Treatment Started') {
        wonLeads++;
        wonValue += val;
      } else if (l.status === 'Dropped') {
        lostLeads++;
      } else {
        totalPipelineValue += val;
      }
    });

    const activeLeads = totalLeads - wonLeads - lostLeads;
    const decidedDeals = wonLeads + lostLeads;
    const winRate = decidedDeals > 0 ? Math.round((wonLeads / decidedDeals) * 100) : 0;

    return {
      totalLeads,
      activeLeads,
      wonLeads,
      lostLeads,
      totalPipelineValue,
      wonValue,
      winRate
    };
  }, [leads]);

  return (
    <LeadContext.Provider
      value={{
        leads,
        searchQuery,
        setSearchQuery,
        filteredLeads,
        addLead,
        updateLead,
        deleteLead,
        moveLead,
        isAddModalOpen,
        openAddModal,
        closeAddModal,
        selectedLead,
        openLeadDetail,
        closeLeadDetail,
        metrics
      }}
    >
      {children}
    </LeadContext.Provider>
  );
}

export function useLeads() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
}
