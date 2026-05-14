"use client"

import React, { useState } from 'react';

export default function DemoForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    facilityName: '',
    facilityType: '',
    bedCount: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form Submitted:', formData);
      setIsSuccess(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="success-msg text-center p-12 bg-white/5 border border-primary/20 rounded-[40px] reveal animate-in fade-in duration-700">
        <div className="check-circle w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-4 tracking-tight">Demo Booked Successfully!</h2>
        <p className="text-lg opacity-70 mb-8">
          Thank you! One of our specialists will contact you within 24 hours to confirm your demo schedule.
        </p>
        <button 
          onClick={() => setIsSuccess(false)} 
          className="btn-secondary"
        >
          Book Another Demo
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="demo-form space-y-6 reveal" style={{ animationDelay: '0.2s' }}>
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block text-sm font-semibold opacity-70 mb-2">First Name *</label>
          <input 
            type="text" 
            name="firstName" 
            required 
            value={formData.firstName}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-primary/50 outline-none transition-all"
            placeholder="Arjun"
          />
        </div>
        <div className="form-group">
          <label className="block text-sm font-semibold opacity-70 mb-2">Last Name *</label>
          <input 
            type="text" 
            name="lastName" 
            required 
            value={formData.lastName}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-primary/50 outline-none transition-all"
            placeholder="Mehta"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="block text-sm font-semibold opacity-70 mb-2">Work Email *</label>
        <input 
          type="email" 
          name="email" 
          required 
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-primary/50 outline-none transition-all"
          placeholder="your@hospital.com"
        />
      </div>

      <div className="form-group">
        <label className="block text-sm font-semibold opacity-70 mb-2">Phone Number *</label>
        <input 
          type="tel" 
          name="phone" 
          required 
          value={formData.phone}
          onChange={handleChange}
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-primary/50 outline-none transition-all"
          placeholder="+91 77919 10007"
        />
      </div>

      <div className="form-group">
        <label className="block text-sm font-semibold opacity-70 mb-2">Facility / Organization Name *</label>
        <input 
          type="text" 
          name="facilityName" 
          required 
          value={formData.facilityName}
          onChange={handleChange}
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-primary/50 outline-none transition-all"
          placeholder="City General Hospital"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block text-sm font-semibold opacity-70 mb-2">Facility Type *</label>
          <select 
            name="facilityType" 
            required 
            value={formData.facilityType}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-primary/50 outline-none transition-all appearance-none"
          >
            <option value="" disabled>Select type</option>
            <option>Clinic / Polyclinic</option>
            <option>Multi-Specialty Hospital</option>
            <option>Specialty Hospital</option>
            <option>Hospital Chain</option>
            <option>Pharmacy</option>
            <option>Diagnostic Lab</option>
            <option>Other</option>
          </select>
        </div>
        <div className="form-group">
          <label className="block text-sm font-semibold opacity-70 mb-2">No. of Beds / Doctors</label>
          <select 
            name="bedCount" 
            value={formData.bedCount}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-primary/50 outline-none transition-all appearance-none"
          >
            <option value="" disabled>Select range</option>
            <option>1–10 Doctors</option>
            <option>11–50 Beds</option>
            <option>51–200 Beds</option>
            <option>201–500 Beds</option>
            <option>500+ Beds</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="block text-sm font-semibold opacity-70 mb-2">Challenges / Requirements (Optional)</label>
        <textarea 
          name="message" 
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-primary/50 outline-none transition-all min-h-[100px]"
          placeholder="e.g. We need to streamline billing and EMR..."
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-5 rounded-2xl bg-primary text-secondary font-bold text-lg hover:scale-[1.02] active:scale-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-primary/20"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Scheduling...
          </div>
        ) : 'Schedule My Free Demo →'}
      </button>

      <p className="text-xs text-center opacity-40 flex items-center justify-center gap-2">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        Your data is 100% secure. We never share your information.
      </p>
    </form>
  );
}
