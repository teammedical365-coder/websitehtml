'use client';

import React, { useState, useEffect, useMemo } from 'react';
import WhatsAppModal, { WhatsAppTarget } from '@/components/WhatsAppModal';
import { 
  Appointment, 
  AppointmentStatus, 
  initialAppointments, 
  opdTimeSlots 
} from '@/data/mockAppointments';
import { medicalDepartments, medicalStaff, formatCurrency } from '@/data/mockLeads';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Plus, 
  CheckCircle, 
  XCircle, 
  Play, 
  Video, 
  Stethoscope, 
  Building2, 
  MessageSquare, 
  Search, 
  ArrowRight,
  Filter
} from 'lucide-react';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('All');
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-16');
  const [searchFilter, setSearchFilter] = useState('');
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [whatsAppTarget, setWhatsAppTarget] = useState<WhatsAppTarget | null>(null);

  // Form state for booking
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [doctorName, setDoctorName] = useState(medicalStaff[0]);
  const [department, setDepartment] = useState(medicalDepartments[0]);
  const [slot, setSlot] = useState('10:00 AM');
  const [type, setType] = useState<'In-Person OPD' | 'Video Teleconsult'>('In-Person OPD');
  const [fee, setFee] = useState(800);
  const [notes, setNotes] = useState('');

  // Sync with API on mount
  useEffect(() => {
    fetch('/api/appointments')
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setAppointments(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const filteredAppointments = useMemo(() => {
    return appointments.filter(a => {
      if (selectedDoctor !== 'All' && a.doctorName !== selectedDoctor) return false;
      if (selectedDate && a.date !== selectedDate) return false;
      if (searchFilter) {
        const q = searchFilter.toLowerCase();
        return (
          a.patientName.toLowerCase().includes(q) ||
          a.patientPhone.toLowerCase().includes(q) ||
          a.doctorName.toLowerCase().includes(q) ||
          (a.notes && a.notes.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [appointments, selectedDoctor, selectedDate, searchFilter]);

  // KPIs
  const kpis = useMemo(() => {
    const todayAppts = appointments.filter(a => a.date === selectedDate);
    const total = todayAppts.length;
    const waiting = todayAppts.filter(a => a.status === 'Waiting').length;
    const inConsult = todayAppts.filter(a => a.status === 'In Consultation').length;
    const completed = todayAppts.filter(a => a.status === 'Completed').length;
    const revenue = todayAppts.reduce((sum, a) => sum + (a.status !== 'Cancelled' ? a.fee : 0), 0);

    return { total, waiting, inConsult, completed, revenue };
  }, [appointments, selectedDate]);

  const updateStatus = async (id: string, newStatus: AppointmentStatus) => {
    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, status: newStatus } : a))
    );
    try {
      await fetch('/api/appointments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
    } catch {}
  };

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) return;

    const newApptData = {
      patientId: `PAT-${Date.now().toString().slice(-4)}`,
      patientName,
      patientPhone: patientPhone || '+91 98765 00000',
      doctorName,
      department,
      date: selectedDate,
      timeSlot: slot,
      type,
      fee,
      notes,
      roomNo: type === 'Video Teleconsult' ? 'Virtual Room 1' : 'OPD-104'
    };

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApptData)
      });
      const data = await res.json();
      if (data.success && data.data) {
        setAppointments(prev => [data.data, ...prev]);
      } else {
        // Fallback local
        const localAppt: Appointment = {
          ...newApptData,
          id: `APT-${Date.now().toString().slice(-3)}`,
          tokenNumber: appointments.length + 1,
          status: 'Waiting',
          scheduledAt: new Date().toISOString()
        };
        setAppointments(prev => [localAppt, ...prev]);
      }
    } catch {
      const localAppt: Appointment = {
        ...newApptData,
        id: `APT-${Date.now().toString().slice(-3)}`,
        tokenNumber: appointments.length + 1,
        status: 'Waiting',
        scheduledAt: new Date().toISOString()
      };
      setAppointments(prev => [localAppt, ...prev]);
    }

    setIsBookModalOpen(false);
    setPatientName('');
    setPatientPhone('');
    setNotes('');
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* TOP BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <CalendarIcon className="w-7 h-7 text-blue-600" />
              OPD Doctor Rosters & Appointment Desk
            </h1>
            <p className="text-sm text-slate-500">
              Manage real-time outpatient tokens, doctor room rosters, and teleconsultation schedules.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input 
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              onClick={() => setIsBookModalOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm transition hover:shadow-md"
            >
              <Plus className="w-4 h-4" /> Book OPD Slot
            </button>
          </div>
        </div>

        {/* METRICS BAR */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-semibold text-slate-500 uppercase">Today&apos;s Total OPD</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{kpis.total}</p>
            <span className="text-[11px] text-blue-600 font-medium">Scheduled Patients</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-semibold text-slate-500 uppercase">Waiting in Lounge</p>
            <p className="text-2xl font-black text-amber-600 mt-1">{kpis.waiting}</p>
            <span className="text-[11px] text-amber-700 font-medium">Token in Queue</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-semibold text-slate-500 uppercase">In Consultation</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">{kpis.inConsult}</p>
            <span className="text-[11px] text-emerald-700 font-medium">With Specialist</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-semibold text-slate-500 uppercase">Completed</p>
            <p className="text-2xl font-black text-slate-700 mt-1">{kpis.completed}</p>
            <span className="text-[11px] text-slate-500 font-medium">Prescriptions Dispatched</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-semibold text-slate-500 uppercase">OPD Revenue</p>
            <p className="text-2xl font-black text-blue-700 mt-1">{formatCurrency(kpis.revenue)}</p>
            <span className="text-[11px] text-blue-600 font-medium">Consultation Fees</span>
          </div>
        </div>

        {/* CONTROLS & FILTER BAR */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase">
              <Filter className="w-3.5 h-3.5" /> Doctor Roster:
            </div>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="All">All Doctors (General & Super-Specialty)</option>
              {medicalStaff.map((doc) => (
                <option key={doc} value={doc}>{doc}</option>
              ))}
            </select>
          </div>

          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Filter by patient, phone, doctor..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* APPOINTMENTS TABLE */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-blue-600" />
              Outpatient Queue ({filteredAppointments.length} Bookings)
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Live Token Order • Date: {selectedDate}
            </span>
          </div>

          {filteredAppointments.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-sm font-semibold text-slate-500">No appointments found for the selected filter.</p>
              <button
                onClick={() => setIsBookModalOpen(true)}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition"
              >
                Book First Slot
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/75 text-slate-600 uppercase font-bold tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4">Token #</th>
                    <th className="py-3 px-4">Time Slot</th>
                    <th className="py-3 px-4">Patient Information</th>
                    <th className="py-3 px-4">Consultant Doctor</th>
                    <th className="py-3 px-4">Type & Room</th>
                    <th className="py-3 px-4">Fee</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAppointments.map((appt) => (
                    <tr key={appt.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4 font-black text-slate-900 text-sm">
                        <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
                          #{appt.tokenNumber}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                          <Clock className="w-3.5 h-3.5 text-blue-600" />
                          {appt.timeSlot}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900 text-sm">{appt.patientName}</p>
                        <p className="text-[11px] text-slate-500 font-mono">{appt.patientPhone}</p>
                        {appt.notes && (
                          <p className="text-[11px] text-slate-600 italic line-clamp-1 mt-0.5">&ldquo;{appt.notes}&rdquo;</p>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-900">{appt.doctorName}</p>
                        <p className="text-[11px] text-slate-500">{appt.department}</p>
                      </td>

                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold text-[11px] ${
                          appt.type === 'Video Teleconsult'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {appt.type === 'Video Teleconsult' ? <Video className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                          {appt.type}
                        </span>
                        <p className="text-[11px] text-slate-500 mt-0.5 font-mono">{appt.roomNo || 'OPD-101'}</p>
                      </td>

                      <td className="py-3 px-4 font-bold text-slate-800">
                        {formatCurrency(appt.fee)}
                      </td>

                      <td className="py-3 px-4">
                        <select
                          value={appt.status}
                          onChange={(e) => updateStatus(appt.id, e.target.value as AppointmentStatus)}
                          className={`px-2 py-1 rounded-lg text-xs font-bold border focus:outline-none transition ${
                            appt.status === 'Waiting'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : appt.status === 'In Consultation'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : appt.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}
                        >
                          <option value="Waiting">Waiting in Queue</option>
                          <option value="In Consultation">In Consultation</option>
                          <option value="Completed">Completed</option>
                          <option value="No Show">No Show</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setWhatsAppTarget({
                                name: appt.patientName,
                                phone: appt.patientPhone,
                                requirement: `OPD Consultation with ${appt.doctorName}`,
                                doctor: appt.doctorName,
                                date: appt.date,
                                timeSlot: appt.timeSlot,
                                tokenNumber: appt.tokenNumber
                              });
                            }}
                            className="p-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 rounded-lg transition"
                            title="Send WhatsApp Appointment Slip"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>

                          <a
                            href={`tel:${appt.patientPhone}`}
                            className="p-1.5 bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 rounded-lg transition"
                            title="Call Patient"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>

                          {appt.status === 'Waiting' && (
                            <button
                              onClick={() => updateStatus(appt.id, 'In Consultation')}
                              className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 transition"
                            >
                              <Play className="w-3 h-3" /> Call In
                            </button>
                          )}

                          {appt.status === 'In Consultation' && (
                            <button
                              onClick={() => updateStatus(appt.id, 'Completed')}
                              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 transition"
                            >
                              <CheckCircle className="w-3 h-3" /> Finish
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* BOOK APPOINTMENT MODAL */}
        {isBookModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 text-white flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg leading-tight">Book OPD Doctor Slot</h3>
                  <p className="text-xs text-blue-100">Schedule in-person clinic visit or video teleconsultation</p>
                </div>
                <button 
                  onClick={() => setIsBookModalOpen(false)}
                  className="p-1.5 rounded-lg text-blue-100 hover:text-white hover:bg-white/10 transition"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleBookSubmit} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Patient Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rameshwar Lal"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98290 12345"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Consultation Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as 'In-Person OPD' | 'Video Teleconsult')}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="In-Person OPD">In-Person OPD Visit</option>
                      <option value="Video Teleconsult">Video Teleconsultation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Doctor Specialist *</label>
                  <select
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {medicalStaff.map((doc) => (
                      <option key={doc} value={doc}>{doc}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Available Time Slot</label>
                    <select
                      value={slot}
                      onChange={(e) => setSlot(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      {opdTimeSlots.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Consultation Fee (₹)</label>
                    <input
                      type="number"
                      value={fee}
                      onChange={(e) => setFee(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Chief Symptoms / Reason</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Knee pain, fever, follow-up"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsBookModalOpen(false)}
                    className="px-4 py-2 text-slate-600 font-semibold hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition"
                  >
                    Confirm & Generate Token
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
