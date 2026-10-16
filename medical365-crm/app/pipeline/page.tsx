'use client';

import React, { useState } from 'react';
import { useLeads } from '@/context/LeadContext';
import { stages, LeadStatus, formatCurrency, Lead, medicalStaff, medicalDepartments } from '@/data/mockLeads';
import { 
  Plus, 
  MessageSquare, 
  Phone, 
  MapPin, 
  Stethoscope, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Sparkles,
  Filter,
  HeartPulse
} from 'lucide-react';

export default function PipelinePage() {
  const { filteredLeads, moveLead, openLeadDetail, openAddModal } = useLeads();
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [activeDropZone, setActiveDropZone] = useState<LeadStatus | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('All');
  const [selectedDept, setSelectedDept] = useState<string>('All');

  // Filter pipeline by doctor or department
  const displayLeads = filteredLeads.filter(lead => {
    const matchDoctor = selectedDoctor === 'All' || lead.assignedTo === selectedDoctor;
    const matchDept = selectedDept === 'All' || lead.department === selectedDept;
    return matchDoctor && matchDept;
  });

  // Drag & drop handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedLeadId(id);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, stageId: LeadStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (activeDropZone !== stageId) {
      setActiveDropZone(stageId);
    }
  };

  const handleDragLeave = (stageId: LeadStatus) => {
    if (activeDropZone === stageId) {
      setActiveDropZone(null);
    }
  };

  const handleDrop = (e: React.DragEvent, stageId: LeadStatus) => {
    e.preventDefault();
    setActiveDropZone(null);
    const id = e.dataTransfer.getData('text/plain') || draggedLeadId;
    if (id) {
      moveLead(id, stageId);
      setDraggedLeadId(null);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-4 max-w-full">
      {/* Pipeline Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Patient Pipeline</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
              Clinical Journey
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Drag & drop patients across clinical care stages from intake to treatment completion
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          {/* Doctor Filter */}
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 border border-slate-200 rounded-lg shadow-sm text-xs">
            <Stethoscope className="w-3.5 h-3.5 text-cyan-600" />
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="font-medium text-slate-800 bg-transparent focus:outline-none cursor-pointer max-w-[150px]"
            >
              <option value="All">All Doctors</option>
              {medicalStaff.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 border border-slate-200 rounded-lg shadow-sm text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="font-medium text-slate-800 bg-transparent focus:outline-none cursor-pointer max-w-[150px]"
            >
              <option value="All">All Specialties</option>
              {medicalDepartments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <button
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" /> Add Patient
          </button>
        </div>
      </div>

      {/* KANBAN BOARD */}
      <div className="flex-1 overflow-x-auto flex gap-4 pb-4 items-start select-none">
        {stages.map((stage) => {
          const columnLeads = displayLeads.filter(l => l.status === stage.id);
          const columnValue = columnLeads.reduce((sum, l) => sum + (Number(l.value) || 0), 0);
          const isOver = activeDropZone === stage.id;

          return (
            <div
              key={stage.id}
              onDragOver={(e) => handleDragOver(e, stage.id)}
              onDragLeave={() => handleDragLeave(stage.id)}
              onDrop={(e) => handleDrop(e, stage.id)}
              className={`w-80 flex-shrink-0 flex flex-col max-h-full rounded-2xl border transition-all duration-200 ${
                isOver 
                  ? 'bg-cyan-50/70 border-cyan-400 ring-2 ring-cyan-300' 
                  : 'bg-slate-100/70 border-slate-200/80'
              }`}
            >
              {/* Column Header */}
              <div className="p-3.5 bg-white border-b border-slate-200 rounded-t-2xl flex flex-col gap-1 shadow-sm shrink-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      stage.id === 'Treatment Started' ? 'bg-emerald-500' :
                      stage.id === 'Dropped' ? 'bg-rose-500' :
                      stage.id === 'Estimate Shared' ? 'bg-orange-500' :
                      stage.id === 'Consultation Booked' ? 'bg-amber-500' :
                      stage.id === 'Contacted' ? 'bg-purple-500' : 'bg-cyan-500'
                    }`} />
                    <h2 className="font-bold text-slate-800 text-sm tracking-wide">{stage.title}</h2>
                  </div>
                  <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-md border border-slate-200">
                    {columnLeads.length}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-semibold">
                  Procedure Value: <span className="text-cyan-800 font-bold">{formatCurrency(columnValue)}</span>
                </div>
              </div>

              {/* Cards List Dropzone */}
              <div className="p-3 space-y-3 overflow-y-auto flex-1 max-h-[calc(100vh-230px)]">
                {columnLeads.length === 0 ? (
                  <div className="h-28 flex items-center justify-center text-xs text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                    Drop patient cases here
                  </div>
                ) : (
                  columnLeads.map((lead) => {
                    const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
                    const isDragging = draggedLeadId === lead.id;

                    return (
                      <div
                        key={lead.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead.id)}
                        onClick={() => openLeadDetail(lead)}
                        className={`bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing space-y-2.5 ${
                          isDragging ? 'opacity-40 scale-95' : ''
                        }`}
                      >
                        {/* Top row: Patient Name & Urgency Score */}
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h3 className="font-bold text-slate-900 text-sm leading-tight hover:text-cyan-700 transition">
                              {lead.name}
                            </h3>
                            {lead.age && (
                              <span className="text-[11px] text-slate-400 font-medium">
                                {lead.age} yrs • {lead.gender}
                              </span>
                            )}
                          </div>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                            lead.score >= 80 ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                            lead.score >= 50 ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                            'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}>
                            {lead.score >= 80 ? '🔥 ' : lead.score >= 50 ? '☀️ ' : '❄️ '}
                            {lead.score}
                          </span>
                        </div>

                        {/* Medical Requirement */}
                        <div>
                          <p className="text-xs text-slate-800 font-semibold line-clamp-2">
                            {lead.requirement}
                          </p>
                          <p className="text-[11px] text-cyan-700 font-medium">{lead.department}</p>
                        </div>

                        {/* Tags & Metadata */}
                        <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500">
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                            {lead.source}
                          </span>
                          <span className={`px-1.5 py-0.5 rounded font-bold ${
                            lead.priority === 'High' ? 'bg-rose-50 text-rose-700' :
                            lead.priority === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {lead.priority}
                          </span>
                          {lead.insuranceType && (
                            <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium flex items-center gap-0.5">
                              <ShieldCheck className="w-2.5 h-2.5" /> {lead.insuranceType}
                            </span>
                          )}
                          {lead.city && (
                            <span className="flex items-center gap-0.5 text-slate-400">
                              <MapPin className="w-2.5 h-2.5" /> {lead.city}
                            </span>
                          )}
                        </div>

                        {/* Financial Value & Doctor */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-slate-900 block leading-tight">
                              {formatCurrency(lead.value)}
                            </span>
                            <span className="text-[10px] text-slate-500 flex items-center gap-1">
                              <Stethoscope className="w-2.5 h-2.5 text-cyan-600" />
                              <span className="truncate max-w-[120px]">{lead.assignedTo.split('(')[0]}</span>
                            </span>
                          </div>

                          {/* Quick Action Buttons */}
                          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            <a
                              href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(lead.name)},%20this%20is%20Medical%20365.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] rounded transition"
                              title="WhatsApp Patient"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>

                            {stage.id !== 'Treatment Started' && (
                              <button
                                onClick={() => moveLead(lead.id, 'Treatment Started')}
                                className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[10px] font-bold rounded transition"
                                title="Mark Treatment Started"
                              >
                                Admit
                              </button>
                            )}

                            {stage.id !== 'Dropped' && (
                              <button
                                onClick={() => moveLead(lead.id, 'Dropped')}
                                className="px-1.5 py-0.5 bg-rose-50 text-rose-700 hover:bg-rose-100 text-[10px] font-bold rounded transition"
                                title="Drop Case"
                              >
                                Drop
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
