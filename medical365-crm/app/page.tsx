'use client';

import React from 'react';
import Link from 'next/link';
import { useLeads } from '@/context/LeadContext';
import { formatCurrency, stages, allSources, Lead } from '@/data/mockLeads';
import { 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  ArrowRight, 
  Sparkles, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Eye,
  Activity,
  Stethoscope,
  ShieldCheck,
  HeartPulse
} from 'lucide-react';

export default function DashboardPage() {
  const { leads, filteredLeads, searchQuery, metrics, openAddModal, openLeadDetail, moveLead } = useLeads();

  // Calculate Lead Sources breakdown
  const sourceStats = React.useMemo(() => {
    const counts: Record<string, number> = {};
    leads.forEach(l => {
      counts[l.source] = (counts[l.source] || 0) + 1;
    });

    return allSources
      .map(src => ({
        source: src,
        count: counts[src] || 0,
        percentage: leads.length > 0 ? Math.round(((counts[src] || 0) / leads.length) * 100) : 0
      }))
      .filter(item => item.count > 0)
      .sort((a, b) => b.count - a.count);
  }, [leads]);

  // AI Recommended Medical Follow-ups (high urgency/intent cases)
  const urgentPatients = React.useMemo(() => {
    return leads
      .filter(l => l.status !== 'Treatment Started' && l.status !== 'Dropped' && l.score >= 70)
      .slice(0, 3);
  }, [leads]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Clinical & Patient Dashboard</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
              Medical 365
            </span>
          </div>
          <p className="text-sm text-slate-500">
            Real-time patient intake, OPD conversions, treatment revenue, and doctor assignments
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/pipeline"
            className="px-3.5 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition shadow-sm flex items-center gap-2"
          >
            <Activity className="w-4 h-4 text-cyan-600" /> Patient Pipeline
          </Link>
          <button
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm transition active:scale-95"
          >
            <Plus className="w-4 h-4" /> Add Patient Lead
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Inquiries */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient Inquiries</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{metrics.totalLeads}</h3>
            </div>
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-cyan-700 font-semibold">Registered patients</span>
            <span className="text-slate-400">All channels</span>
          </div>
        </div>

        {/* Active Pipeline */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Pipeline</p>
              <h3 className="text-3xl font-bold text-cyan-700 mt-1">{metrics.activeLeads}</h3>
            </div>
            <div className="p-2.5 bg-cyan-50 text-cyan-600 rounded-lg">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-cyan-800 font-semibold">{formatCurrency(metrics.totalPipelineValue)}</span>
            <span className="text-slate-400">in consult/triage</span>
          </div>
        </div>

        {/* Treatments Started (Won) */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Treatments Started</p>
              <h3 className="text-3xl font-bold text-emerald-600 mt-1">{metrics.wonLeads}</h3>
            </div>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-emerald-600 font-semibold">{formatCurrency(metrics.wonValue)}</span>
            <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
              {metrics.winRate}% conversion
            </span>
          </div>
        </div>

        {/* Dropped Inquiries */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Dropped Cases</p>
              <h3 className="text-3xl font-bold text-rose-600 mt-1">{metrics.lostLeads}</h3>
            </div>
            <div className="p-2.5 bg-rose-50 text-rose-600 rounded-lg">
              <XCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">{metrics.totalLeads > 0 ? Math.round((metrics.lostLeads / metrics.totalLeads) * 100) : 0}% drop rate</span>
            <span className="text-slate-400">Closed/Discharged</span>
          </div>
        </div>
      </div>

      {/* MID SECTION: AI CLINICAL FOLLOW-UPS & SOURCES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Action Recommendations */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-cyan-50 text-cyan-700 rounded-lg">
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-slate-800 text-sm">Smart Clinical Actions (High Urgency Cases)</h2>
            </div>
            <span className="text-xs text-slate-400 font-medium">Prioritized by clinical score</span>
          </div>

          <div className="space-y-3">
            {urgentPatients.length === 0 ? (
              <p className="text-sm text-slate-400 py-3 text-center">No high urgency patients pending follow-up.</p>
            ) : (
              urgentPatients.map((lead) => {
                const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
                return (
                  <div 
                    key={lead.id} 
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-slate-50/70 hover:bg-slate-50 rounded-xl border border-slate-200/80 transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{lead.name}</span>
                        {lead.age && <span className="text-xs text-slate-500">({lead.age} yrs, {lead.gender})</span>}
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          🔥 Urgency {lead.score}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">[{lead.status}]</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        <strong className="text-cyan-800">{lead.requirement}</strong> • {lead.department}
                      </p>
                      <p className="text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">Next Action:</span> {lead.nextAction}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-0.5">
                        <span>Attending: <strong className="text-slate-700">{lead.assignedTo}</strong></span>
                        <span>•</span>
                        <span>Est: <strong className="text-slate-700">{formatCurrency(lead.value)}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(lead.name)},%20this%20is%20from%20Medical%20365%20regarding%20your%20treatment.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-lg flex items-center gap-1 transition"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                      </a>
                      <a
                        href={`tel:${lead.phone}`}
                        className="px-2.5 py-1.5 text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg flex items-center gap-1 transition"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call
                      </a>
                      <button
                        onClick={() => openLeadDetail(lead)}
                        className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition"
                        title="View Clinical Chart"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Patient Acquisition Channels */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h2 className="font-bold text-slate-800 text-sm">Patient Acquisition Sources</h2>
            <span className="text-xs font-semibold text-cyan-700">{leads.length} Total</span>
          </div>

          <div className="space-y-3.5">
            {sourceStats.map(item => (
              <div key={item.source} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700">{item.source}</span>
                  <span className="text-slate-500 font-semibold">{item.percentage}% ({item.count})</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-cyan-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECENT PATIENT LEADS TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="font-bold text-slate-800 text-base">Active Patient Records</h2>
            <p className="text-xs text-slate-500">
              {searchQuery ? `Showing matching results for "${searchQuery}"` : 'Complete medical registry with all fields'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link 
              href="/pipeline" 
              className="text-xs font-semibold text-cyan-700 hover:text-cyan-900 flex items-center gap-1 transition"
            >
              Pipeline Kanban <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs uppercase tracking-wider font-semibold">
                <th className="p-4">Patient Name & ID</th>
                <th className="p-4">Specialty & Treatment</th>
                <th className="p-4">Attending Doctor</th>
                <th className="p-4">Est. Cost</th>
                <th className="p-4">Insurance</th>
                <th className="p-4">Clinical Stage</th>
                <th className="p-4">Urgency</th>
                <th className="p-4">Source</th>
                <th className="p-4">Location</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-slate-400">
                    No patient records found matching your query.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const stageObj = stages.find(s => s.id === lead.status) || stages[0];
                  const cleanPhone = lead.phone.replace(/[^0-9]/g, '');

                  return (
                    <tr 
                      key={lead.id} 
                      className="hover:bg-slate-50/70 transition cursor-pointer"
                      onClick={() => openLeadDetail(lead)}
                    >
                      {/* Patient Name */}
                      <td className="p-4">
                        <div className="font-semibold text-slate-900">{lead.name}</div>
                        <div className="text-xs text-slate-400">
                          {lead.id} • {lead.age ? `${lead.age}y ${lead.gender}` : lead.phone}
                        </div>
                      </td>

                      {/* Treatment */}
                      <td className="p-4 max-w-xs truncate" title={lead.requirement}>
                        <div className="text-slate-800 font-medium truncate">{lead.requirement}</div>
                        <div className="text-[11px] text-cyan-700">{lead.department}</div>
                      </td>

                      {/* Doctor */}
                      <td className="p-4 text-slate-700 font-medium text-xs">
                        <div className="flex items-center gap-1">
                          <Stethoscope className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                          <span className="truncate max-w-[140px]">{lead.assignedTo}</span>
                        </div>
                      </td>

                      {/* Value */}
                      <td className="p-4 font-bold text-slate-800">
                        {formatCurrency(lead.value)}
                      </td>

                      {/* Insurance */}
                      <td className="p-4 text-xs">
                        <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                          {lead.insuranceType || 'Self Pay'}
                        </span>
                      </td>

                      {/* Stage dropdown */}
                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) => moveLead(lead.id, e.target.value as any)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${stageObj.bg} ${stageObj.text} ${stageObj.border} cursor-pointer focus:outline-none`}
                        >
                          {stages.map((st) => (
                            <option key={st.id} value={st.id}>{st.title}</option>
                          ))}
                        </select>
                      </td>

                      {/* Urgency */}
                      <td className="p-4">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          lead.score >= 80 ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                          lead.score >= 50 ? 'bg-amber-50 text-amber-700 border border-amber-200' : 
                          'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                          {lead.score >= 80 ? '🔥 ' : lead.score >= 50 ? '☀️ ' : '❄️ '}
                          {lead.score}
                        </span>
                      </td>

                      {/* Source */}
                      <td className="p-4 text-slate-600 text-xs font-medium">
                        {lead.source}
                      </td>

                      {/* Location */}
                      <td className="p-4 text-slate-500 text-xs">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" /> {lead.city}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1.5">
                          <a
                            href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(lead.name)},%20this%20is%20Medical%20365.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-[#128C7E] hover:bg-emerald-50 rounded-lg transition"
                            title="WhatsApp Patient"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </a>
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Call Patient"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => openLeadDetail(lead)}
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                            title="View Chart"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
