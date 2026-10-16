'use client';

import React, { useState, useEffect } from 'react';
import { useLeads } from '@/context/LeadContext';
import { 
  Lead, 
  LeadStatus, 
  LeadSource, 
  PriorityLevel, 
  InsuranceType,
  stages, 
  allSources, 
  medicalStaff, 
  medicalDepartments,
  insuranceOptions,
  formatCurrency 
} from '@/data/mockLeads';
import { 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Stethoscope, 
  Trash2, 
  Edit3, 
  Check, 
  MessageSquare, 
  Calendar,
  Sparkles,
  ShieldCheck,
  Activity,
  HeartPulse
} from 'lucide-react';

import WhatsAppModal from './WhatsAppModal';

export default function LeadDetailModal() {
  const { selectedLead, closeLeadDetail, updateLead, deleteLead } = useLeads();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Lead>>({});
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  useEffect(() => {
    if (selectedLead) {
      setFormData(selectedLead);
      setIsEditing(false);
    }
  }, [selectedLead]);

  if (!selectedLead) return null;

  const handleSave = () => {
    if (selectedLead && formData) {
      updateLead(selectedLead.id, formData);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete patient record for "${selectedLead.name}"?`)) {
      deleteLead(selectedLead.id);
      closeLeadDetail();
    }
  };

  const cleanPhone = selectedLead.phone.replace(/[^0-9]/g, '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
              {selectedLead.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">{selectedLead.name}</h2>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">
                  {selectedLead.id}
                </span>
                {selectedLead.age && (
                  <span className="text-xs text-slate-500 font-medium">
                    ({selectedLead.age} yrs • {selectedLead.gender || 'Patient'})
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Registered on {selectedLead.addedOn} • Source: {selectedLead.source}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`p-2 rounded-lg text-sm font-medium flex items-center gap-1 transition ${
                isEditing ? 'bg-blue-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              title={isEditing ? 'Exit Edit' : 'Edit Patient'}
            >
              <Edit3 className="w-4 h-4" />
              <span className="text-xs hidden sm:inline">{isEditing ? 'Editing' : 'Edit'}</span>
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
              title="Delete Record"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={closeLeadDetail}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Action Ribbon */}
        <div className="px-6 py-3 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* WhatsApp Link */}
            <button
              type="button"
              onClick={() => setIsWhatsAppOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition"
            >
              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Hub
            </button>

            {/* Direct Phone Call */}
            <a
              href={`tel:${selectedLead.phone}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition"
            >
              <Phone className="w-3.5 h-3.5" /> Call
            </a>

            {/* Email */}
            {selectedLead.email && (
              <a
                href={`mailto:${selectedLead.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition"
              >
                <Mail className="w-3.5 h-3.5" /> Email
              </a>
            )}
          </div>

          {/* Quick Stage Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Clinical Stage:</span>
            <select
              value={formData.status || selectedLead.status}
              onChange={(e) => {
                const newSt = e.target.value as LeadStatus;
                setFormData({ ...formData, status: newSt });
                updateLead(selectedLead.id, { status: newSt });
              }}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {stages.map((st) => (
                <option key={st.id} value={st.id}>{st.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Key Medical Metrics strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Treatment Cost</p>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.value || 0}
                  onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                  className="w-full text-xs font-bold px-2 py-1 bg-white border border-slate-300 rounded mt-1"
                />
              ) : (
                <p className="text-base font-bold text-slate-900 mt-0.5">{formatCurrency(selectedLead.value)}</p>
              )}
            </div>

            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Payment / Insurance</p>
              {isEditing ? (
                <select
                  value={formData.insuranceType || selectedLead.insuranceType || 'Cashless TPA'}
                  onChange={(e) => setFormData({ ...formData, insuranceType: e.target.value as InsuranceType })}
                  className="w-full text-xs font-bold px-2 py-1 bg-white border border-slate-300 rounded mt-1"
                >
                  {insuranceOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <p className="text-xs font-semibold text-slate-800 mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  {selectedLead.insuranceType || 'Self Pay'}
                </p>
              )}
            </div>

            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Medical Urgency</p>
              {isEditing ? (
                <select
                  value={formData.priority || selectedLead.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as PriorityLevel })}
                  className="w-full text-xs font-bold px-2 py-1 bg-white border border-slate-300 rounded mt-1"
                >
                  <option value="High">Emergency / High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Routine / Elective</option>
                </select>
              ) : (
                <p className="mt-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    selectedLead.priority === 'High' ? 'bg-rose-50 text-rose-700' :
                    selectedLead.priority === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {selectedLead.priority}
                  </span>
                </p>
              )}
            </div>

            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Health Urgency Score</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  selectedLead.score >= 80 ? 'bg-rose-50 text-rose-700' :
                  selectedLead.score >= 50 ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'
                }`}>
                  {selectedLead.score >= 80 ? '🔥 ' : selectedLead.score >= 50 ? '☀️ ' : '❄️ '}
                  {selectedLead.score}/100
                </span>
              </div>
            </div>
          </div>

          {/* Patient Details & Attending Doctor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3 p-4 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Patient Contact</h4>
              
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-xs text-slate-400 block">Name</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-sm font-medium px-2 py-1 bg-white border border-slate-300 rounded"
                    />
                  ) : (
                    <p className="font-semibold text-slate-800">{selectedLead.name}</p>
                  )}
                </div>

                <div>
                  <span className="text-xs text-slate-400 block">Phone</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-sm font-medium px-2 py-1 bg-white border border-slate-300 rounded"
                    />
                  ) : (
                    <p className="font-medium text-slate-700">{selectedLead.phone}</p>
                  )}
                </div>

                <div>
                  <span className="text-xs text-slate-400 block">Location / City</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.city || ''}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full text-sm font-medium px-2 py-1 bg-white border border-slate-300 rounded"
                    />
                  ) : (
                    <p className="font-medium text-slate-700 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {selectedLead.city}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3 p-4 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Department & Doctor</h4>
              
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-xs text-slate-400 block">Attending Doctor / Specialist</span>
                  {isEditing ? (
                    <select
                      value={formData.assignedTo || selectedLead.assignedTo}
                      onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                      className="w-full text-sm font-medium px-2 py-1 bg-white border border-slate-300 rounded"
                    >
                      {medicalStaff.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <Stethoscope className="w-3.5 h-3.5 text-cyan-600" /> {selectedLead.assignedTo}
                    </p>
                  )}
                </div>

                <div>
                  <span className="text-xs text-slate-400 block">Specialty Department</span>
                  {isEditing ? (
                    <select
                      value={formData.department || selectedLead.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full text-sm font-medium px-2 py-1 bg-white border border-slate-300 rounded"
                    >
                      {medicalDepartments.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="font-medium text-slate-700">{selectedLead.department || 'General'}</p>
                  )}
                </div>

                <div>
                  <span className="text-xs text-slate-400 block">Patient Source</span>
                  {isEditing ? (
                    <select
                      value={formData.source || selectedLead.source}
                      onChange={(e) => setFormData({ ...formData, source: e.target.value as LeadSource })}
                      className="w-full text-sm font-medium px-2 py-1 bg-white border border-slate-300 rounded"
                    >
                      {allSources.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="font-medium text-slate-700">{selectedLead.source}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Medical Requirement and Clinical Notes */}
          <div className="p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Procedure / Treatment Details</h4>
            {isEditing ? (
              <textarea
                rows={2}
                value={formData.requirement || ''}
                onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                className="w-full text-sm px-3 py-2 bg-white border border-slate-300 rounded-lg"
              />
            ) : (
              <p className="text-sm text-slate-800 bg-cyan-50/50 p-3 rounded-lg border border-cyan-100 font-semibold">
                {selectedLead.requirement}
              </p>
            )}

            <div className="pt-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Clinical History & Notes
              </span>
              {isEditing ? (
                <textarea
                  rows={3}
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full text-sm px-3 py-2 bg-white border border-slate-300 rounded-lg"
                  placeholder="Enter medical notes..."
                />
              ) : (
                <p className="text-xs text-slate-600 bg-slate-50/50 p-3 rounded-lg border border-slate-100 italic">
                  {selectedLead.notes || 'No clinical notes recorded.'}
                </p>
              )}
            </div>

            <div className="pt-2">
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider flex items-center gap-1 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Next Scheduled Clinical Action
              </span>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.nextAction || ''}
                  onChange={(e) => setFormData({ ...formData, nextAction: e.target.value })}
                  className="w-full text-sm px-3 py-2 bg-white border border-slate-300 rounded-lg"
                />
              ) : (
                <p className="text-xs font-semibold text-blue-900 bg-blue-50/80 p-2.5 rounded-lg border border-blue-200">
                  {selectedLead.nextAction || 'Schedule follow-up consultation.'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={closeLeadDetail}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
          >
            Close
          </button>

          {isEditing && (
            <button
              onClick={handleSave}
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Save Record
            </button>
          )}
        </div>
      </div>

      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        target={selectedLead ? {
          name: selectedLead.name,
          phone: selectedLead.phone,
          requirement: selectedLead.requirement,
          doctor: selectedLead.assignedTo,
          value: selectedLead.value
        } : null}
      />
    </div>
  );
}
