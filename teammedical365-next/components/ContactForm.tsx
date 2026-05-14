'use client';

import React, { useState } from 'react';

export default function ContactForm() {
  const [topic, setTopic] = useState('Sales & Pricing');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const topics = ['Sales & Pricing', 'Book a Demo', 'Technical Support', 'Partnerships', 'Other'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', { topic, ...formData });
      setStatus('success');
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  if (status === 'success') {
    return (
      <div className="success-msg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
        <div className="check-circle" style={{ background: 'var(--accent-green)', color: '#fff', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Message Sent!</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
        <button 
          onClick={() => setStatus('idle')} 
          className="btn-secondary" 
          style={{ marginTop: '30px' }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div id="form-wrapper">
      <h2 className="form-title">Send Us a Message</h2>
      <p className="form-subtitle">Tell us what you need and we&apos;ll get the right person in touch with you.</p>

      <div className="form-group">
        <span className="chip-label">What can we help you with?</span>
        <div className="topic-chips">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              className={`chip ${topic === t ? 'selected' : ''}`}
              onClick={() => setTopic(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <form id="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input 
              type="text" 
              id="firstName" 
              placeholder="First name" 
              required 
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input 
              type="text" 
              id="lastName" 
              placeholder="Last name" 
              required 
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input 
            type="email" 
            id="email" 
            placeholder="you@organization.com" 
            required 
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input 
            type="tel" 
            id="phone" 
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="organization">Organization / Facility Name</label>
          <input 
            type="text" 
            id="organization" 
            placeholder="City General Hospital"
            value={formData.organization}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Your Message *</label>
          <textarea 
            id="message" 
            placeholder="Tell us how we can help you..." 
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="form-submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending...' : 'Send Message →'}
        </button>
      </form>
    </div>
  );
}
