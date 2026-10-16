'use client';

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Copy, 
  Check, 
  PhoneCall, 
  Clock, 
  FileText, 
  Sparkles, 
  Calendar,
  AlertCircle
} from 'lucide-react';

export interface WhatsAppTarget {
  name: string;
  phone: string;
  requirement?: string;
  doctor?: string;
  value?: number;
  date?: string;
  timeSlot?: string;
  tokenNumber?: number;
}

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  target: WhatsAppTarget | null;
}

export default function WhatsAppModal({ isOpen, onClose, target }: WhatsAppModalProps) {
  const [activeTemplate, setActiveTemplate] = useState<'appointment' | 'preop' | 'estimate' | 'followup'>('appointment');
  const [customMessage, setCustomMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isCalling, setIsCalling] = useState(false);
  const [callNote, setCallNote] = useState('');

  // Call timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCalling) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCalling]);

  // Generate templates based on target
  useEffect(() => {
    if (!target) return;
    const name = target.name || 'Patient';
    const doctor = target.doctor || 'Senior Consultant';
    const req = target.requirement || 'Clinical Consultation';
    const cost = target.value ? `₹${target.value.toLocaleString('en-IN')}` : 'standard hospital tariff';
    const date = target.date || 'Today';
    const time = target.timeSlot || '10:30 AM';
    const token = target.tokenNumber ? `#${target.tokenNumber}` : '#12';

    if (activeTemplate === 'appointment') {
      setCustomMessage(
        `Namaste ${name},\n\nYour OPD consultation with ${doctor} at Medical365 Hospital is scheduled for *${date} at ${time}*.\n\n` +
        `• *Token Number:* ${token}\n` +
        `• *Room / Desk:* OPD Chamber 104\n` +
        `• *Hospital Location:* https://maps.google.com/?q=Medical365+Hospital+Jaipur\n\n` +
        `Please arrive 15 minutes prior with your past medical records. Contact us at +91 77919 10007 if you need to reschedule.`
      );
    } else if (activeTemplate === 'preop') {
      setCustomMessage(
        `Dear ${name},\n\nKindly note your *Pre-Admission & Fasting Instructions* for your upcoming ${req} procedure:\n\n` +
        `1. *NPO / Fasting:* Do not eat or drink anything (including water) after 12:00 AM midnight.\n` +
        `2. *Documents to Bring:* Original Aadhaar Card, PAN Card, and your Health Insurance Card.\n` +
        `3. *Reporting Time:* 07:30 AM at the Admission / TPA Desk.\n\n` +
        `Our clinical team is prepared for your admission. Wishing you a smooth recovery!`
      );
    } else if (activeTemplate === 'estimate') {
      setCustomMessage(
        `Dear ${name},\n\nThank you for choosing Medical365. Here is the cost estimation summary for *${req}* under ${doctor}:\n\n` +
        `• *Estimated Package:* ${cost}\n` +
        `• *Includes:* Surgeon fees, OT charges, Nursing, Routine Labs & 2-day room stay.\n` +
        `• *Insurance Support:* 100% Cashless TPA desk on-premise (Star, Care, Medi Assist, etc.).\n` +
        `• *EMI Option:* 0% Interest EMI available on major credit cards.\n\n` +
        `Shall we assist you in submitting your cashless pre-authorization today?`
      );
    } else if (activeTemplate === 'followup') {
      setCustomMessage(
        `Namaste ${name},\n\nWe hope you are feeling better after your consultation for ${req}.\n\n` +
        `Please remember to take your medications as prescribed. If you experience fever or severe pain, please reach out to our emergency desk immediately at +91 77919 10007.\n\n` +
        `Your next scheduled follow-up visit is in 7 days.`
      );
    }
  }, [activeTemplate, target]);

  if (!isOpen || !target) return null;

  // Clean phone number for WhatsApp
  const cleanPhone = (target.phone || '').replace(/[^0-9]/g, '');
  const formattedPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone.replace(/^0+/, '')}`;

  const handleSendWhatsApp = () => {
    const encoded = encodeURIComponent(customMessage);
    const waUrl = `https://wa.me/${formattedPhone}?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(customMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Patient Communication Hub</h3>
              <p className="text-xs text-emerald-100">
                Direct WhatsApp & Call Logger for <span className="font-semibold text-white">{target.name}</span> ({target.phone})
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Telephony / Live Call Bar */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isCalling ? 'bg-amber-100 text-amber-700 animate-pulse' : 'bg-blue-100 text-blue-700'}`}>
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-700">
                  {isCalling ? 'Call in Progress...' : 'Telephonic Consultation / Follow-up'}
                </p>
                <p className="text-xs text-slate-500 font-mono">
                  {isCalling ? `Duration: ${formatTimer(callDuration)}` : target.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!isCalling ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsCalling(true);
                    setCallDuration(0);
                    window.location.href = `tel:${target.phone}`;
                  }}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Start Call
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsCalling(false)}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
                >
                  <Clock className="w-3.5 h-3.5" /> End Call ({formatTimer(callDuration)})
                </button>
              )}
            </div>
          </div>

          {/* Template Selection Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Healthcare WhatsApp Template
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setActiveTemplate('appointment')}
                className={`p-2.5 rounded-xl border text-left transition text-xs font-medium ${
                  activeTemplate === 'appointment'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 text-emerald-600">
                  <Calendar className="w-3.5 h-3.5" /> OPD Slot
                </div>
                Booking Confirm
              </button>

              <button
                type="button"
                onClick={() => setActiveTemplate('preop')}
                className={`p-2.5 rounded-xl border text-left transition text-xs font-medium ${
                  activeTemplate === 'preop'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 text-emerald-600">
                  <AlertCircle className="w-3.5 h-3.5" /> Pre-Op
                </div>
                Fasting Guidelines
              </button>

              <button
                type="button"
                onClick={() => setActiveTemplate('estimate')}
                className={`p-2.5 rounded-xl border text-left transition text-xs font-medium ${
                  activeTemplate === 'estimate'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 text-emerald-600">
                  <FileText className="w-3.5 h-3.5" /> Financial
                </div>
                Treatment Quote
              </button>

              <button
                type="button"
                onClick={() => setActiveTemplate('followup')}
                className={`p-2.5 rounded-xl border text-left transition text-xs font-medium ${
                  activeTemplate === 'followup'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 text-emerald-600">
                  <Sparkles className="w-3.5 h-3.5" /> Post-OPD
                </div>
                Care Follow-up
              </button>
            </div>
          </div>

          {/* Editable WhatsApp Preview */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-slate-700">
                Message Preview & Live Customizer
              </span>
              <span className="text-[11px] text-slate-400">
                {customMessage.length} characters
              </span>
            </div>
            <textarea
              rows={6}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 font-sans focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition leading-relaxed"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between">
          <button
            type="button"
            onClick={handleCopy}
            className="px-3.5 py-2 border border-slate-300 hover:bg-white text-slate-700 rounded-xl text-xs font-medium flex items-center gap-1.5 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied to Clipboard!' : 'Copy Text'}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSendWhatsApp}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-md hover:shadow-lg"
            >
              <Send className="w-4 h-4" /> Open in WhatsApp Web / App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
