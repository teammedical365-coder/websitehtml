import React from 'react';

export const metadata = {
  title: 'Telemedicine Platform - Medical365',
  description: 'Offer secure, HD video consultations with Medical365. HIPAA-compliant, no app downloads required for patients, and integrated e-prescriptions.',
};

export default function TelemedicinePage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="badge reveal">📱 Telemedicine</div>
            <h1 className="reveal" style={{ animationDelay: '0.1s' }}>
              HD Video Consultations <span className="text-gradient">Built for Clinicians</span>
            </h1>
            <p className="reveal" style={{ animationDelay: '0.2s' }}>
              Offer secure, HIPAA-compliant video consultations directly from your existing Medical365 workflow. No downloads required for patients — just click and connect.
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
                    <path d="M15 10l4.553-2.069A1 1 0 0 1 21 8.82v6.36a1 1 0 0 1-1.447.89L15 14M3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z"></path>
                  </svg>
                </div>
                <div>
                  <h2>Consult Dashboard</h2>
                  <p>Live Statistics</p>
                </div>
              </div>
              <div className="metric-row" style={{ display: 'flex', gap: '15px', margin: '20px 0' }}>
                <div className="metric">
                  <div className="metric-val" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>48</div>
                  <div className="metric-lbl" style={{ fontSize: '0.8rem', opacity: 0.6 }}>Consults Today</div>
                </div>
                <div className="metric">
                  <div className="metric-val" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>4.8★</div>
                  <div className="metric-lbl" style={{ fontSize: '0.8rem', opacity: 0.6 }}>Avg Rating</div>
                </div>
                <div className="metric">
                  <div className="metric-val" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>99.9%</div>
                  <div className="metric-lbl" style={{ fontSize: '0.8rem', opacity: 0.6 }}>Uptime</div>
                </div>
              </div>
              {[
                { label: "Call Completion Rate", value: "97%" },
                { label: "Patient Satisfaction", value: "94%" },
                { label: "Prescription Compliance", value: "88%" }
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
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Platform Capabilities</h2>
            <p style={{ opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>Everything you need for a virtual clinic in one place.</p>
          </div>
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { 
                icon: <path d="M15 10l4.553-2.069A1 1 0 0 1 21 8.82v6.36a1 1 0 0 1-1.447.89L15 14M3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z"></path>, 
                title: "HD Video Consultations", 
                desc: "Crystal-clear, HIPAA-compliant video calls. Auto-reconnect, bandwidth adaptation, and recording consent management." 
              },
              { 
                icon: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>, 
                title: "Digital Prescriptions", 
                desc: "Issue e-prescriptions in real-time during the call. Auto-sent to patient's registered pharmacy and portal." 
              },
              { 
                icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>, 
                title: "Secure Messaging", 
                desc: "End-to-end encrypted chat before and after consultations. Share reports, images, and documents securely." 
              },
              { 
                icon: <rect x="2" y="4" width="20" height="16" rx="2"></rect>, 
                title: "Integrated Scheduling", 
                desc: "Telemedicine slots on the same calendar as in-person. Patients book and get join links automatically via WhatsApp." 
              },
              { 
                icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>, 
                title: "Patient Portal Integration", 
                desc: "Patients access their consultation history, recordings, prescriptions, and follow-up bookings from one portal." 
              },
              { 
                icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>, 
                title: "Analytics & Compliance", 
                desc: "Track teleconsult volume, average duration, revenue, and no-shows. Full HIPAA audit trail for every session." 
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
              <h2 style={{ fontSize: '2.5rem', marginBottom: '25px' }}>Consult from Anywhere, Care for Everyone</h2>
              <p style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '30px' }}>
                Telemedicine isn't just for pandemics. It's the future of follow-ups, chronic disease management, and reaching patients who can't come to you. Medical365 makes it seamless.
              </p>
              <ul className="check-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                {[
                  "No app download for patients",
                  "Works on any device or browser",
                  "Auto-generated consult notes",
                  "Insurance-eligible billing",
                  "WhatsApp booking link sharing",
                  "HIPAA & DPDPA compliant"
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.95rem', opacity: 0.9 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="/book-demo" className="btn-primary">Get Started →</a>
            </div>
            <div className="benefits-visual reveal" style={{ padding: '40px', background: 'rgba(255,255,255,0.03)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '25px' }}>📊 Telehealth Impact</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                  <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>3x</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Patient Reach</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>60%</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Lower No-Shows</div>
                  </div>
              </div>
              {[
                  { label: "Call Quality Rating", val: "99.2%" },
                  { label: "Patient Satisfaction", val: "94%" },
                  { label: "Prescription Adherence", val: "88%" }
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
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>How Tele-Consults Work</h2>
            <p style={{ opacity: 0.7 }}>Simpler for patients, better for doctors.</p>
          </div>
          <div className="workflow-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {[
              { step: 1, title: "Schedule", desc: "Patient books a teleconsult slot" },
              { step: 2, title: "Reminder", desc: "Auto WhatsApp/SMS join link sent" },
              { step: 3, title: "Consult", desc: "HD video call with digital notes" },
              { step: 4, title: "Follow-Up", desc: "Prescription & next appointment" }
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
              <h2 className="reveal" style={{ fontSize: '2rem', marginBottom: '40px' }}>Seamless Ecosystem</h2>
              <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
                  {[
                      "WhatsApp", "Twilio", "WebRTC", "Razorpay", 
                      "Patient Portal", "Pharmacy Module", "EMR Module", "Google Meet Fallback"
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
          <h2 className="reveal" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Launch telemedicine today.</h2>
          <p className="reveal" style={{ opacity: 0.8, marginBottom: '40px' }}>See how Medical365's teleconsult platform can expand your patient reach without extra overhead.</p>
          <div className="reveal" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <a href="/book-demo" className="btn-primary btn-lg">Book a Free Demo</a>
            <a href="/contact" className="btn-secondary btn-lg">Contact Sales</a>
          </div>
        </div>
      </section>
    </>
  );
}
