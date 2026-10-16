'use client';

import React, { useState, useMemo } from 'react';
import { useLeads } from '@/context/LeadContext';
import { 
  stages, 
  allSources, 
  medicalStaff, 
  medicalDepartments,
  insuranceOptions,
  formatCurrency, 
  LeadStatus, 
  LeadSource, 
  PriorityLevel 
} from '@/data/mockLeads';
import { 
  Table, 
  Plus, 
  ArrowUpDown, 
  Phone, 
  MessageSquare, 
  Eye, 
  Download,
  Stethoscope,
  ShieldCheck,
  HeartPulse
} from 'lucide-react';

export default function LeadsDirectoryPage() {
  const { filteredLeads, openAddModal, openLeadDetail, moveLead } = useLeads();

  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [deptFilter, setDeptFilter] = useState<string>('All');
  const [sourceFilter, setSourceFilter] = useState<string>('All');
  const [doctorFilter, setDoctorFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date' | 'value' | 'score' | 'name'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Multi-field filtered & sorted patients
  const processedLeads = useMemo(() => {
    let result = [...filteredLeads];

    if (statusFilter !== 'All') {
      result = result.filter(l => l.status === statusFilter);
    }
    if (deptFilter !== 'All') {
      result = result.filter(l => l.department === deptFilter);
    }
    if (sourceFilter !== 'All') {
      result = result.filter(l => l.source === sourceFilter);
    }
    if (doctorFilter !== 'All') {
      result = result.filter(l => l.assignedTo === doctorFilter);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'date') {
        comparison = new Date(a.addedOn).getTime() - new Date(b.addedOn).getTime();
      } else if (sortBy === 'value') {
        comparison = (a.value || 0) - (b.value || 0);
      } else if (sortBy === 'score') {
        comparison = (a.score || 0) - (b.score || 0);
      } else if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [filteredLeads, statusFilter, deptFilter, sourceFilter, doctorFilter, sortBy, sortOrder]);

  const handleExportCSV = () => {
    const headers = ['Patient ID', 'Name', 'Phone', 'Email', 'Age', 'Gender', 'Department', 'Treatment', 'Cost (INR)', 'Insurance', 'Clinical Stage', 'Doctor', 'Urgency Score', 'City', 'Registered Date'];
    const rows = processedLeads.map(l => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      l.age || '',
      l.gender || '',
      `"${l.department}"`,
      `"${l.requirement.replace(/"/g, '""')}"`,
      l.value,
      `"${l.insuranceType || ''}"`,
      l.status,
      `"${l.assignedTo}"`,
      l.score,
      `"${l.city}"`,
      l.addedOn
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `medical365_patients_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Patient Master Registry</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
              Medical 365
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Search, filter, export, and manage patient medical records, clinical stages, and doctor assignments
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg shadow-sm flex items-center gap-1.5 transition"
          >
            <Download className="w-4 h-4 text-slate-500" /> Export CSV
          </button>
          <button
            onClick={openAddModal}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm flex items-center gap-1.5 transition active:scale-95"
          >
            <Plus className="w-4 h-4" /> Add Patient
          </button>
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        {/* Stage */}
        <div>
          <label className="block font-semibold text-slate-500 mb-1">Clinical Stage</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            <option value="All">All Stages</option>
            {stages.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
          </select>
        </div>

        {/* Department */}
        <div>
          <label className="block font-semibold text-slate-500 mb-1">Specialty Department</label>
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            <option value="All">All Specialties</option>
            {medicalDepartments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        {/* Doctor */}
        <div>
          <label className="block font-semibold text-slate-500 mb-1">Doctor Assigned</label>
          <select
            value={doctorFilter}
            onChange={(e) => setDoctorFilter(e.target.value)}
            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            <option value="All">All Doctors</option>
            {medicalStaff.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        {/* Source */}
        <div>
          <label className="block font-semibold text-slate-500 mb-1">Acquisition Source</label>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            <option value="All">All Sources</option>
            {allSources.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Sort Field */}
        <div>
          <label className="block font-semibold text-slate-500 mb-1">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            <option value="date">Registered Date</option>
            <option value="value">Procedure Cost</option>
            <option value="score">Urgency Score</option>
            <option value="name">Patient Name</option>
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label className="block font-semibold text-slate-500 mb-1">Order</label>
          <button
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center gap-1 font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-cyan-600" />
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center text-xs">
          <span className="font-semibold text-slate-600">
            Showing <strong className="text-slate-900">{processedLeads.length}</strong> of {filteredLeads.length} records
          </span>
          {(statusFilter !== 'All' || deptFilter !== 'All' || sourceFilter !== 'All' || doctorFilter !== 'All') && (
            <button
              onClick={() => {
                setStatusFilter('All');
                setDeptFilter('All');
                setSourceFilter('All');
                setDoctorFilter('All');
              }}
              className="text-cyan-700 hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs uppercase tracking-wider font-semibold">
                <th className="p-4">Patient Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Department & Treatment</th>
                <th className="p-4">Doctor</th>
                <th className="p-4">Est. Cost</th>
                <th className="p-4">Insurance</th>
                <th className="p-4">Clinical Stage</th>
                <th className="p-4">Urgency</th>
                <th className="p-4">City</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {processedLeads.length === 0 ? (
                <tr>
                  <td colSpan={11} className="p-8 text-center text-slate-400">
                    No patient records match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                processedLeads.map((lead) => {
                  const stageObj = stages.find(s => s.id === lead.status) || stages[0];
                  const cleanPhone = lead.phone.replace(/[^0-9]/g, '');

                  return (
                    <tr
                      key={lead.id}
                      onClick={() => openLeadDetail(lead)}
                      className="hover:bg-slate-50/80 transition cursor-pointer"
                    >
                      {/* Name */}
                      <td className="p-4">
                        <div className="font-bold text-slate-900 text-sm">{lead.name}</div>
                        <span className="text-[10px] text-slate-400">
                          {lead.id} • {lead.age ? `${lead.age}y ${lead.gender}` : ''}
                        </span>
                      </td>

                      {/* Contact */}
                      <td className="p-4 text-slate-600">
                        <div className="font-medium text-slate-800">{lead.phone}</div>
                        <div className="text-[11px] text-slate-400">{lead.email}</div>
                      </td>

                      {/* Treatment */}
                      <td className="p-4 max-w-xs truncate" title={lead.requirement}>
                        <div className="text-slate-900 font-semibold truncate">{lead.requirement}</div>
                        <div className="text-[11px] text-cyan-700">{lead.department}</div>
                      </td>

                      {/* Doctor */}
                      <td className="p-4 text-slate-700 font-medium">
                        <div className="flex items-center gap-1">
                          <Stethoscope className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                          <span className="truncate max-w-[140px]">{lead.assignedTo}</span>
                        </div>
                      </td>

                      {/* Value */}
                      <td className="p-4 font-bold text-slate-900">
                        {formatCurrency(lead.value)}
                      </td>

                      {/* Insurance */}
                      <td className="p-4 text-slate-700">
                        <span className="inline-flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                          {lead.insuranceType || 'Self Pay'}
                        </span>
                      </td>

                      {/* Stage Selector */}
                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) => moveLead(lead.id, e.target.value as LeadStatus)}
                          className={`text-xs font-semibold px-2 py-1 rounded-full border ${stageObj.bg} ${stageObj.text} ${stageObj.border} cursor-pointer focus:outline-none`}
                        >
                          {stages.map((st) => (
                            <option key={st.id} value={st.id}>{st.title}</option>
                          ))}
                        </select>
                      </td>

                      {/* Urgency */}
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full font-bold ${
                          lead.score >= 80 ? 'bg-rose-50 text-rose-700' :
                          lead.score >= 50 ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'
                        }`}>
                          {lead.score >= 80 ? '🔥 ' : lead.score >= 50 ? '☀️ ' : '❄️ '}
                          {lead.score}
                        </span>
                      </td>

                      {/* City */}
                      <td className="p-4 text-slate-500">{lead.city}</td>

                      {/* Added On */}
                      <td className="p-4 text-slate-400">{lead.addedOn}</td>

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
