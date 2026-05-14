import React from 'react';

export const metadata = {
  title: 'Patient Portal & App - Medical365',
  description: 'Empower your patients with Medical365 Patient Portal. 24/7 access to health records, online appointment booking, lab results, and secure messaging.',
};

export default function PatientPortalPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="badge reveal">📱 Patient Experience</div>
            <h1 className="reveal" style={{ animationDelay: '0.1s' }}>
              Healthcare in Your <span className="text-gradient">Patients' Hands</span>
            </h1>
            <p className="reveal" style={{ animationDelay: '0.2s' }}>
              Give patients 24/7 access to their health records, appointment booking, teleconsultations, prescriptions, and lab results — through a beautiful, easy-to-use portal and mobile app.
            </p>
            <div className="hero-buttons reveal" style={{ animationDelay: '0.3s' }}>
              <a href="/book-demo" className="btn-primary btn-lg">Book a Free Demo</a>
              <a href="/contact" className="btn-secondary btn-lg">Talk to Sales</a>
            </div>
          </div>
          <div className="hero-visual reveal" style={{ animationDelay: '0.3s' }}>
            <div className="hero-card">
              <div className="hero-card-header">
                <div className="hero-card-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div>
                  <h2>Patient Engagement</h2>
                  <p>User Activity Dashboard</p>
                </div>
              </div>
              <div className="metric-row" style={{ display: 'flex', gap: '15px', margin: '20px 0' }}>
                <div className="metric">
                  <div className="metric-val" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>28K</div>
                  <div className="metric-lbl" style={{ fontSize: '0.8rem', opacity: 0.6 }}>Active Users</div>
                </div>
                <div className="metric">
                  <div className="metric-val" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>4.8★</div>
                  <div className="metric-lbl" style={{ fontSize: '0.8rem', opacity: 0.6 }}>App Rating</div>
                </div>
                <div className="metric">
                  <div className="metric-val" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>72%</div>
                  <div className="metric-lbl" style={{ fontSize: '0.8rem', opacity: 0.6 }}>Self-Booking</div>
                </div>
              </div>
              {[
                { label: "Digital Bookings", value: "72%" },
                { label: "Lab Report Downloads", value: "88%" },
                { label: "Portal Engagement", value: "64%" }
              ].map((prog, i) => (
                <div key={i} className="progress-item" style={{ marginBottom: '15px' }}>
                  <div className="progress-label" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem' }}>
                    <span>{prog.label}</span>
                    <span>{prog.value}</span>
                  </div>
                  <div className="progress-bar" style={{ background: 'rgba(255,255,255,0.1)', height: '6px', borderRadius: '3px' }}>
                    <div className="progress-fill" style={{ width: prog.value, background: 'var(--primary)', height: '100%', borderRadius: '3px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="features-section" style={{ padding: '100px 0' }}>
        <div className="container">
          <div className="section-header reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Core Capabilities</h2>
            <p style={{ opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>Building stronger patient-provider connections through technology.</p>
          </div>
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { 
                icon: <rect x="2" y="4" width="20" height="16" rx="2"></rect>, 
                title: "Online Appointment Booking", 
                desc: "Book, reschedule, or cancel appointments 24/7. Auto-synced with doctor calendars & WhatsApp confirmations." 
              },
              { 
                icon: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>, 
                title: "Health Records Access", 
                desc: "Complete visit history, e-prescriptions, and discharge summaries available as secure PDF downloads." 
              },
              { 
                icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>, 
                title: "Lab & Radiology Dashboard", 
                desc: "View results the moment they are validated. Track health trends with visual progress charts for chronic care." 
              },
              { 
                icon: <path d="M15 10l4.553-2.069A1 1 0 0 1 21 8.82v6.36a1 1 0 0 1-1.447.89L15 14M3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z"></path>, 
                title: "In-Portal Teleconsultation", 
                desc: "Launch video calls directly from the portal. No external app downloads or links required for the patient." 
              },
              { 
                icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>, 
                title: "Secure Care Messaging", 
                desc: "Patients can send non-urgent queries, request refills, and receive post-visit follow-up instructions." 
              },
              { 
                icon: <circle cx="12" cy="12" r="10"></circle>, 
                title: "Family Account Sharing", 
                desc: "Perfect for caregivers. Manage health records and appointments for children and elderly parents from one log in." 
              }
            ].map((feat, i) => (
              <div key={i} className="feature-card reveal" style={{ animationDelay: `${i * 0.1}s`, padding: '40px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div className="feature-icon" style={{ width: '48px', height: '48px', background: 'rgba(55, 179, 156, 0.1)', color: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{feat.icon}</svg>
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '15px' }}>{feat.title}</h3>
                <p style={{ opacity: 0.7, lineHeight: '1.6' }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="benefits-section" style={{ background: 'rgba(255,255,255,0.02)', padding: '100px 0' }}>
        <div className="container">
          <div className="benefits-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div className="reveal">
              <h2 style={{ fontSize: '2.5rem', marginBottom: '25px' }}>Engaged Patients, Better Outcomes</h2>
              <p style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '30px' }}>
                When patients have access to their own data, they take more ownership of their health. Medical365 turns passive visitors into active participants.
              </p>
              <ul className="check-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                {[
                  "No app download needed",
                  "6 Indian languages",
                  "ABDM/ABHA integrated",
                  "WhatsApp linked",
                  "40% less desk calls",
                  "DPDPA compliant"
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.95rem', opacity: 0.9 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ background: 'white', padding: '10px 20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px', color: '#000', fontWeight: 'bold', fontSize: '0.9rem' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.96.95-2.26 1.65-3.71 1.65-2.73 0-4.96-2.22-4.96-4.95s2.23-4.96 4.96-4.96c1.1 0 2.11.36 2.94.97l2.87-2.88c-.92-.81-2.11-1.31-3.41-1.31-3.21 0-5.81 2.6-5.81 5.8s2.6 5.8 5.81 5.8c1.51 0 2.87-.58 3.9-1.52l-2.6-2.6z"/></svg>
                      App Store
                  </div>
                  <div style={{ background: 'white', padding: '10px 20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px', color: '#000', fontWeight: 'bold', fontSize: '0.9rem' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814l11.455 11.455-2.813 2.813-11.455-11.455 2.813-2.813zm15.419 7.027l-5.733 5.732 2.813 2.814 5.732-5.733-2.812-2.813zm-8.546 8.546l-2.813-2.813-5.733 5.733 2.814 2.813 5.732-5.733z"/></svg>
                      Play Store
                  </div>
              </div>
            </div>
            <div className="benefits-visual reveal" style={{ padding: '40px', background: 'rgba(255,255,255,0.03)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '25px' }}>📈 Engagement Metrics</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                  <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>72%</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Self-Booking</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>40%</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Admin Call Drop</div>
                  </div>
              </div>
              {[
                  { label: "Portal Adoption Rate", val: "64%" },
                  { label: "Lab Report Downloads", val: "82%" },
                  { label: "Patient Satisfaction", val: "92%" }
              ].map((stat, i) => (
                  <div key={i} style={{ marginBottom: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                          <span>{stat.label}</span>
                          <span>{stat.val}</span>
                      </div>
                      <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
                          <div style={{ width: stat.val, background: 'var(--primary)', height: '100%', borderRadius: '3px' }}></div>
                      </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="workflow-section" style={{ padding: '100px 0' }}>
        <div className="container">
          <div className="section-header reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Patient Journey</h2>
            <p style={{ opacity: 0.7 }}>A seamless 5-step digital experience.</p>
          </div>
          <div className="workflow-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
            {[
              { step: 1, title: "Invite", desc: "WhatsApp portal link sent" },
              { step: 2, title: "Register", desc: "30sec self-registration" },
              { step: 3, title: "Book", desc: "Choose slot & confirm" },
              { step: 4, title: "Visit", desc: "Digital check-in on arrival" },
              { step: 5, title: "Follow Up", desc: "Notes & reports delivered" }
            ].map((wf, i) => (
              <div key={i} className="wf-card reveal" style={{ animationDelay: `${i * 0.1}s`, textAlign: 'center' }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  background: 'var(--primary)', 
                  color: 'white', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold', 
                  margin: '0 auto 20px' 
                }}>{wf.step}</div>
                <h4 style={{ marginBottom: '10px' }}>{wf.title}</h4>
                <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>{wf.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="integrations-section" style={{ padding: '100px 0', textAlign: 'center' }}>
          <div className="container">
              <h2 className="reveal" style={{ fontSize: '2rem', marginBottom: '40px' }}>Connected Platform</h2>
              <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
                  {[
                      "WhatsApp Business", "ABDM / ABHA", "Razorpay / Stripe", "Teleconsult Module", 
                      "Laboratory LIMS", "Pharmacy Mgt", "EMR History", "iOS / Android App"
                  ].map((chip, i) => (
                      <span key={i} style={{ 
                          padding: '10px 25px', 
                          background: 'rgba(255,255,255,0.05)', 
                          borderRadius: '50px', 
                          border: '1px solid rgba(255,255,255,0.1)',
                          fontSize: '0.9rem'
                      }}>{chip}</span>
                  ))}
              </div>
          </div>
      </section>

      <section className="bottom-cta" style={{ padding: '100px 0', textAlign: 'center', background: 'linear-gradient(135deg, rgba(55, 179, 156, 0.1) 0%, rgba(30, 41, 59, 0.5) 100%)' }}>
        <div className="container">
          <h2 className="reveal" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Give your patients the digital experience they expect.</h2>
          <p className="reveal" style={{ opacity: 0.8, marginBottom: '40px' }}>Book a demo to see Medical365 Patient Portal — beautiful, simple, and deeply connected to your clinical workflows.</p>
          <div className="reveal" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <a href="/book-demo" className="btn-primary btn-lg">Book a Free Demo</a>
            <a href="/contact" className="btn-secondary btn-lg">Contact Sales</a>
          </div>
        </div>
      </section>
    </>
  );
}
