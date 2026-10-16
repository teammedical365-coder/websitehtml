'use client';

import React, { useState, useEffect, useMemo } from 'react';
import WhatsAppModal, { WhatsAppTarget } from '@/components/WhatsAppModal';
import { 
  InsuranceClaim, 
  ClaimStatus, 
  initialClaims, 
  tpaProviders 
} from '@/data/mockInsurance';
import { medicalDepartments, formatCurrency } from '@/data/mockLeads';
import { 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Search, 
  Calculator, 
  DollarSign, 
  Send, 
  ChevronRight, 
  MessageSquare,
  Building,
  ArrowUpRight
} from 'lucide-react';

export default function InsurancePage() {
  const [claims, setClaims] = useState<InsuranceClaim[]>(initialClaims);
  const [selectedTPA, setSelectedTPA] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState('');
  const [isNewClaimModalOpen, setIsNewClaimModalOpen] = useState(false);
  const [selectedClaimDetail, setSelectedClaimDetail] = useState<InsuranceClaim | null>(null);
  const [whatsAppTarget, setWhatsAppTarget] = useState<WhatsAppTarget | null>(null);

  // Form state for New Pre-auth
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [tpaName, setTpaName] = useState(tpaProviders[0]);
  const [policyNumber, setPolicyNumber] = useState('');
  const [procedureName, setProcedureName] = useState('Total Knee Replacement');
  const [department, setDepartment] = useState(medicalDepartments[0]);
  const [estimatedCost, setEstimatedCost] = useState(250000);
  const [coPayPercentage, setCoPayPercentage] = useState(10);
  const [deductibles, setDeductibles] = useState(5000);

  // Sync with API on mount
  useEffect(() => {
    fetch('/api/insurance')
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setClaims(res.data);
        }
      })
      .catch(() => {});
  }, []);

  // Filtered Claims
  const filteredClaims = useMemo(() => {
    return claims.filter(c => {
      if (selectedTPA !== 'All' && c.tpaName !== selectedTPA) return false;
      if (selectedStatus !== 'All' && c.status !== selectedStatus) return false;
      if (searchFilter) {
        const q = searchFilter.toLowerCase();
        return (
          c.patientName.toLowerCase().includes(q) ||
          c.claimNumber.toLowerCase().includes(q) ||
          c.policyNumber.toLowerCase().includes(q) ||
          c.tpaName.toLowerCase().includes(q) ||
          c.procedureName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [claims, selectedTPA, selectedStatus, searchFilter]);

  // Financial KPIs
  const kpis = useMemo(() => {
    const totalCount = claims.length;
    const totalPipelineValue = claims.reduce((sum, c) => sum + c.estimatedCost, 0);
    const totalApproved = claims.reduce((sum, c) => sum + c.approvedAmount, 0);
    const pendingQueries = claims.filter(c => c.status === 'Query Raised by TPA').length;
    const approvedCount = claims.filter(c => c.status === 'Pre-Auth Approved' || c.status === 'Final Enhancement at Discharge').length;

    return { totalCount, totalPipelineValue, totalApproved, pendingQueries, approvedCount };
  }, [claims]);

  const updateClaimStatus = async (id: string, newStatus: ClaimStatus, note?: string) => {
    setClaims(prev =>
      prev.map(c => {
        if (c.id === id) {
          const now = new Date();
          const timeStr = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
          const timeline = [
            ...c.timeline,
            {
              timestamp: timeStr,
              stage: newStatus,
              note: note || `Status transitioned to ${newStatus}`,
              actor: 'TPA Desk (Deepak)'
            }
          ];
          return { ...c, status: newStatus, timeline };
        }
        return c;
      })
    );

    try {
      await fetch('/api/insurance', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus, timelineNote: note })
      });
    } catch {}
  };

  const handleCreateClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !policyNumber.trim()) return;

    const patientShareCalc = Math.round(estimatedCost * (coPayPercentage / 100) + deductibles);

    const payload = {
      patientId: `PAT-${Date.now().toString().slice(-4)}`,
      patientName,
      patientPhone: patientPhone || '+91 98290 00000',
      tpaName,
      policyNumber,
      policyHolderName: patientName,
      relationWithPatient: 'Self' as const,
      hospitalizationType: 'Planned Surgery' as const,
      procedureName,
      department,
      estimatedCost,
      approvedAmount: 0,
      coPayPercentage,
      deductibles,
      patientShare: patientShareCalc,
      status: 'Documents Collected' as ClaimStatus
    };

    try {
      const res = await fetch('/api/insurance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success && data.data) {
        setClaims(prev => [data.data, ...prev]);
      } else {
        // Fallback local
        const localClaim: InsuranceClaim = {
          ...payload,
          id: `CLM-${Date.now().toString().slice(-3)}`,
          claimNumber: `CLAIM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          admissionDate: new Date().toISOString().split('T')[0],
          expectedDischargeDate: new Date().toISOString().split('T')[0],
          timeline: [
            {
              timestamp: 'Just now',
              stage: 'Documents Collected',
              note: 'Cashless pre-auth documentation initiated.',
              actor: 'TPA Desk'
            }
          ]
        };
        setClaims(prev => [localClaim, ...prev]);
      }
    } catch {
      const localClaim: InsuranceClaim = {
        ...payload,
        id: `CLM-${Date.now().toString().slice(-3)}`,
        claimNumber: `CLAIM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        admissionDate: new Date().toISOString().split('T')[0],
        expectedDischargeDate: new Date().toISOString().split('T')[0],
        timeline: [
          {
            timestamp: 'Just now',
            stage: 'Documents Collected',
            note: 'Cashless pre-auth documentation initiated.',
            actor: 'TPA Desk'
          }
        ]
      };
      setClaims(prev => [localClaim, ...prev]);
    }

    setIsNewClaimModalOpen(false);
    setPatientName('');
    setPatientPhone('');
    setPolicyNumber('');
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <ShieldCheck className="w-7 h-7 text-emerald-600" />
              TPA & Cashless Health Insurance Desk
            </h1>
            <p className="text-sm text-slate-500">
              Track real-time pre-authorization approvals, TPA queries, co-pay deductions, and final discharge claims.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsNewClaimModalOpen(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm transition hover:shadow-md"
            >
              <Plus className="w-4 h-4" /> New Pre-Auth Request
            </button>
          </div>
        </div>

        {/* FINANCIAL SUMMARY CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-semibold text-slate-500 uppercase">Active Claims</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{kpis.totalCount}</p>
            <span className="text-[11px] text-blue-600 font-medium">In Cashless Desk</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-semibold text-slate-500 uppercase">Total Cashless Pipeline</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{formatCurrency(kpis.totalPipelineValue)}</p>
            <span className="text-[11px] text-slate-500 font-medium">Estimated Billing</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-semibold text-slate-500 uppercase">Approved Cashless</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">{formatCurrency(kpis.totalApproved)}</p>
            <span className="text-[11px] text-emerald-700 font-medium">{kpis.approvedCount} Pre-Auths Granted</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-semibold text-slate-500 uppercase">Pending TPA Queries</p>
            <p className="text-2xl font-black text-amber-600 mt-1">{kpis.pendingQueries}</p>
            <span className="text-[11px] text-amber-700 font-medium">Doctor Clarification Needed</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-semibold text-slate-500 uppercase">Average Approval TAT</p>
            <p className="text-2xl font-black text-blue-700 mt-1">2.4 Hrs</p>
            <span className="text-[11px] text-blue-600 font-medium">Turnaround Time</span>
          </div>
        </div>

        {/* CONTROLS & FILTER BAR */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedTPA}
              onChange={(e) => setSelectedTPA(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="All">All TPA / Insurers</option>
              {tpaProviders.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="All">All Claim Stages</option>
              <option value="Documents Collected">Documents Collected</option>
              <option value="Pre-Auth Submitted">Pre-Auth Submitted</option>
              <option value="Query Raised by TPA">Query Raised by TPA</option>
              <option value="Pre-Auth Approved">Pre-Auth Approved</option>
              <option value="Final Enhancement at Discharge">Final Enhancement at Discharge</option>
            </select>
          </div>

          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Filter by claim #, patient, policy..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
        </div>

        {/* CLAIMS PIPELINE / TABLE */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              Cashless Pre-Auth Docket ({filteredClaims.length} Active Cases)
            </h3>
            <span className="text-xs text-slate-500 font-medium">IRDAI & Hospital Empaneled Desks</span>
          </div>

          {filteredClaims.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-sm font-semibold text-slate-500">No insurance claims match your filter criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/75 text-slate-600 uppercase font-bold tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4">Claim # & Patient</th>
                    <th className="py-3 px-4">TPA & Policy Details</th>
                    <th className="py-3 px-4">Procedure & Specialty</th>
                    <th className="py-3 px-4">Estimated Billing</th>
                    <th className="py-3 px-4">Approved Cashless</th>
                    <th className="py-3 px-4">Co-Pay / Out-of-Pocket</th>
                    <th className="py-3 px-4">Stage Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredClaims.map((claim) => (
                    <tr key={claim.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4">
                        <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {claim.claimNumber}
                        </span>
                        <p className="font-black text-slate-900 text-sm mt-1">{claim.patientName}</p>
                        <p className="text-[11px] text-slate-500 font-mono">{claim.patientPhone}</p>
                      </td>

                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-800">{claim.tpaName}</p>
                        <p className="text-[11px] text-slate-500 font-mono">Pol: {claim.policyNumber}</p>
                        <p className="text-[11px] text-slate-400">Rel: {claim.relationWithPatient}</p>
                      </td>

                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900">{claim.procedureName}</p>
                        <p className="text-[11px] text-slate-500">{claim.department}</p>
                        <span className="inline-block mt-0.5 text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                          {claim.hospitalizationType}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-bold text-slate-800">
                        {formatCurrency(claim.estimatedCost)}
                      </td>

                      <td className="py-3 px-4">
                        {claim.approvedAmount > 0 ? (
                          <span className="font-black text-emerald-700 text-sm">
                            {formatCurrency(claim.approvedAmount)}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">Pending approval</span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-800">
                          {formatCurrency(claim.patientShare)}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          Co-pay: {claim.coPayPercentage}% • Ded: ₹{claim.deductibles}
                        </p>
                      </td>

                      <td className="py-3 px-4">
                        <select
                          value={claim.status}
                          onChange={(e) => updateClaimStatus(claim.id, e.target.value as ClaimStatus)}
                          className={`px-2 py-1 rounded-lg text-xs font-bold border focus:outline-none transition ${
                            claim.status === 'Pre-Auth Approved'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : claim.status === 'Query Raised by TPA'
                              ? 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse'
                              : claim.status === 'Final Enhancement at Discharge'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-slate-100 text-slate-700 border-slate-300'
                          }`}
                        >
                          <option value="Documents Collected">Documents Collected</option>
                          <option value="Pre-Auth Submitted">Pre-Auth Submitted</option>
                          <option value="Query Raised by TPA">Query Raised by TPA</option>
                          <option value="Pre-Auth Approved">Pre-Auth Approved</option>
                          <option value="Final Enhancement at Discharge">Final Enhancement at Discharge</option>
                          <option value="Claim Settled">Claim Settled</option>
                          <option value="Initial Denial">Initial Denial</option>
                        </select>

                        {claim.queryDetails && (
                          <p className="text-[10px] text-amber-700 mt-1 max-w-xs line-clamp-1 italic">
                            ⚠️ {claim.queryDetails}
                          </p>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedClaimDetail(claim)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
                            title="View Audit Trail"
                          >
                            Timeline
                          </button>

                          <button
                            onClick={() => {
                              setWhatsAppTarget({
                                name: claim.patientName,
                                phone: claim.patientPhone,
                                requirement: `${claim.procedureName} (${claim.tpaName})`,
                                value: claim.estimatedCost
                              });
                            }}
                            className="p-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 rounded-lg transition"
                            title="WhatsApp Insurance Update to Patient"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* CLAIM TIMELINE MODAL */}
        {selectedClaimDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-5 text-white flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base leading-tight">Claim Audit Timeline</h3>
                  <p className="text-xs text-slate-300 font-mono">{selectedClaimDetail.claimNumber} • {selectedClaimDetail.patientName}</p>
                </div>
                <button
                  onClick={() => setSelectedClaimDetail(null)}
                  className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1">
                  <p><span className="font-bold text-slate-700">TPA:</span> {selectedClaimDetail.tpaName}</p>
                  <p><span className="font-bold text-slate-700">Policy:</span> {selectedClaimDetail.policyNumber}</p>
                  <p><span className="font-bold text-slate-700">Procedure:</span> {selectedClaimDetail.procedureName}</p>
                  <p><span className="font-bold text-slate-700">Approved:</span> <span className="font-bold text-emerald-700">{formatCurrency(selectedClaimDetail.approvedAmount)}</span> / {formatCurrency(selectedClaimDetail.estimatedCost)}</p>
                </div>

                <div className="space-y-3 pt-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Audit Trail</p>
                  <div className="space-y-3 border-l-2 border-emerald-500 pl-4 ml-2">
                    {selectedClaimDetail.timeline.map((item, idx) => (
                      <div key={idx} className="relative text-xs">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white ring-2 ring-emerald-200" />
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800">{item.stage}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{item.timestamp}</span>
                        </div>
                        <p className="text-slate-600 mt-0.5">{item.note}</p>
                        <p className="text-[10px] text-slate-400">By: {item.actor}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setSelectedClaimDetail(null)}
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-900 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* NEW PRE-AUTH MODAL */}
        {isNewClaimModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-5 text-white flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg leading-tight">Initiate Cashless Pre-Auth</h3>
                  <p className="text-xs text-emerald-100">Submit new hospitalization case to empanelled TPA</p>
                </div>
                <button 
                  onClick={() => setIsNewClaimModalOpen(false)}
                  className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateClaim} className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Patient Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rameshwar Sharma"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98290 12345"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">TPA / Insurance Company *</label>
                    <select
                      value={tpaName}
                      onChange={(e) => setTpaName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    >
                      {tpaProviders.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Policy / Member ID *</label>
                    <input
                      type="text"
                      required
                      placeholder="P/161118/01/2026/004312"
                      value={policyNumber}
                      onChange={(e) => setPolicyNumber(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Procedure Name</label>
                    <input
                      type="text"
                      value={procedureName}
                      onChange={(e) => setProcedureName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Specialty Department</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    >
                      {medicalDepartments.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Co-pay & Deductibles Calculator Widget */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs uppercase">
                    <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                    Cashless Coverage & Co-Pay Estimator
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600">Est. Cost (₹)</label>
                      <input
                        type="number"
                        value={estimatedCost}
                        onChange={(e) => setEstimatedCost(Number(e.target.value))}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600">Co-Pay %</label>
                      <input
                        type="number"
                        value={coPayPercentage}
                        onChange={(e) => setCoPayPercentage(Number(e.target.value))}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600">Deductibles (₹)</label>
                      <input
                        type="number"
                        value={deductibles}
                        onChange={(e) => setDeductibles(Number(e.target.value))}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="p-2.5 bg-emerald-50/80 rounded-lg border border-emerald-200 flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-900">Est. Patient Out-of-Pocket Share:</span>
                    <span className="font-black text-emerald-800 text-sm">
                      {formatCurrency(Math.round(estimatedCost * (coPayPercentage / 100) + deductibles))}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNewClaimModalOpen(false)}
                    className="px-4 py-2 text-slate-600 font-semibold hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition"
                  >
                    Register Pre-Auth Case
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* WHATSAPP MODAL */}
        <WhatsAppModal
          isOpen={!!whatsAppTarget}
          onClose={() => setWhatsAppTarget(null)}
          target={whatsAppTarget}
        />
      </div>
  );
}
