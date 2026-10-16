'use client';

import React, { useState } from 'react';
import { useLeads } from '@/context/LeadContext';
import { 
  LeadStatus, 
  LeadSource, 
  PriorityLevel, 
  InsuranceType,
  stages, 
  allSources, 
  medicalStaff, 
  medicalDepartments, 
  insuranceOptions 
} from '@/data/mockLeads';
import { X, PlusCircle, CheckCircle2, HeartPulse, Stethoscope } from 'lucide-react';

export default function AddLeadModal() {
  const { isAddModalOpen, closeAddModal, addLead } = useLeads();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [requirement, setRequirement] = useState('');
  const [department, setDepartment] = useState(medicalDepartments[0]);
  const [value, setValue] = useState('');
  const [insuranceType, setInsuranceType] = useState<InsuranceType>('Cashless TPA');
  const [budget, setBudget] = useState('');
  const [status, setStatus] = useState<LeadStatus>('New Inquiry');
  const [source, setSource] = useState<LeadSource>('Website');
  const [assignedTo, setAssignedTo] = useState(medicalStaff[0]);
  const [priority, setPriority] = useState<PriorityLevel>('High');
  const [city, setCity] = useState('');
  const [score, setScore] = useState(85);
  const [notes, setNotes] = useState('');
  const [nextAction, setNextAction] = useState('');
  const [showToast, setShowToast] = useState(false);

  if (!isAddModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !requirement.trim()) return;

    const numValue = Number(value) || 0;
    const computedBudget = budget.trim() ? budget.trim() : (numValue > 0 ? `₹${numValue.toLocaleString('en-IN')}` : '₹0');

    addLead({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@patient.com`,
      age: Number(age) || 45,
      gender,
      requirement: requirement.trim(),
      department,
      status,
      source,
      assignedTo,
      value: numValue,
      insuranceType,
      budget: computedBudget,
      score: Math.min(100, Math.max(1, Number(score) || 80)),
      priority,
      city: city.trim() || 'Local City',
      notes: notes.trim(),
      nextAction: nextAction.trim() || 'Schedule initial doctor consultation',
    });

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      resetForm();
      closeAddModal();
    }, 600);
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setAge('');
    setGender('Male');
    setRequirement('');
    setDepartment(medicalDepartments[0]);
    setValue('');
    setInsuranceType('Cashless TPA');
    setBudget('');
    setStatus('New Inquiry');
    setSource('Website');
    setAssignedTo(medicalStaff[0]);
    setPriority('High');
    setCity('');
    setScore(85);
    setNotes('');
    setNextAction('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-cyan-50/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-tr from-cyan-600 to-blue-600 text-white rounded-lg shadow-sm">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Add New Patient Lead</h2>
              <p className="text-xs text-slate-500">Medical 365 Patient Registration & Clinical Case Triage</p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeAddModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Section 1: Patient Details */}
          <div>
            <h3 className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-3">
              1. Patient Demographics & Contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Patient Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ranjith NK"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    min="1"
                    max="110"
                    placeholder="e.g. 52"
                    value={age}
                    onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">City / Location</label>
                <input
                  type="text"
                  placeholder="e.g. Bengaluru, Mumbai, Delhi"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. patient@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Clinical Requirement & Procedure Value */}
          <div className="pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-3">
              2. Clinical Requirement & Treatment Estimate
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Medical Specialty / Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    {medicalDepartments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Insurance / Payment Mode</label>
                  <select
                    value={insuranceType}
                    onChange={(e) => setInsuranceType(e.target.value as InsuranceType)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    {insuranceOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Treatment / Procedure Required *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Robotic Knee Replacement, IVF ICSI Cycle, Angioplasty"
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Estimated Cost / Procedure Value (₹)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 350000"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Package / Budget Label</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹3.5L or Insurance Pre-auth"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Doctor Assignment & Clinical Stage */}
          <div className="pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-3">
              3. Hospital Stage & Doctor Assignment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Clinical Pipeline Stage</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as LeadStatus)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  {stages.map((st) => (
                    <option key={st.id} value={st.id}>{st.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Patient Source</label>
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value as LeadSource)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  {allSources.map((src) => (
                    <option key={src} value={src}>{src}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Attending Doctor / Coordinator</label>
                <select
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  {medicalStaff.map((staff) => (
                    <option key={staff} value={staff}>{staff}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Medical Urgency</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="High">Emergency / High Urgency</option>
                  <option value="Medium">Medium Urgency</option>
                  <option value="Low">Routine / Elective</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Health Urgency Score: <span className="font-bold text-cyan-700">{score}/100</span>
                  </label>
                  <span className="text-[10px] text-slate-400">
                    {score >= 80 ? '🔥 High Intent/Urgency' : score >= 50 ? '☀️ Moderate' : '❄️ Elective'}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  className="w-full accent-cyan-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Symptoms, Clinical Notes & Next Action */}
          <div className="pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-3">
              4. Clinical Notes & Next Action
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Next Follow-up Action</label>
                <input
                  type="text"
                  placeholder="e.g. Schedule OPD consultation with Dr. Rohit on Thursday 10:00 AM"
                  value={nextAction}
                  onChange={(e) => setNextAction(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Medical Symptoms & Clinical Notes</label>
                <textarea
                  rows={2}
                  placeholder="Enter medical history, comorbidities, scan reports, TPA insurance notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={closeAddModal}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow transition flex items-center gap-2"
            >
              {showToast ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-200" /> Patient Enrolled!
                </>
              ) : (
                'Save Patient Record'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
