import React from 'react';

export const metadata = {
  title: 'Operation Theater Management Software - Medical365',
  description: 'Optimize surgical scheduling and safety with Medical365 OT Management. Drag-and-drop scheduling, pre-op checklists, intra-op notes, and instrument tracking.',
};

export default function OTManagementPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="badge reveal">🔬 OT Management</div>
            <h1 className="reveal" style={{ animationDelay: '0.1s' }}>
              Precision Planning for <span className="text-gradient">Every Surgery</span>
            </h1>
            <p className="reveal" style={{ animationDelay: '0.2s' }}>
              Medical365 OT Management System optimizes surgical scheduling, instrument tracking, and post-op documentation — maximizing theatre utilization while ensuring patient safety.
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
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div>
                  <h2>OT Status</h2>
                  <p>Live Dashboard</p>
                </div>
              </div>
              <div className="metric-row" style={{ display: 'flex', gap: '15px', margin: '20px 0' }}>
                <div className="metric">
                  <div className="metric-val" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>14</div>
                  <div className="metric-lbl" style={{ fontSize: '0.8rem', opacity: 0.6 }}>Surgeries</div>
                </div>
                <div className="metric">
                  <div className="metric-val" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>91%</div>
                  <div className="metric-lbl" style={{ fontSize: '0.8rem', opacity: 0.6 }}>Utilization</div>
                </div>
                <div className="metric">
                  <div className="metric-val" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>0</div>
                  <div className="metric-lbl" style={{ fontSize: '0.8rem', opacity: 0.6 }}>Conflicts</div>
                </div>
              </div>
              {[
                { label: "OT Time Utilization", value: "91%" },
                { label: "Sterilization Compliance", value: "100%" },
                { label: "Pre-op Checklist", value: "98%" }
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
            <p style={{ opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>Specialized tools for the most critical department of your hospital.</p>
          </div>
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { 
                icon: <rect x="2" y="4" width="20" height="16" rx="2"></rect>, 
                title: "Surgery Scheduling", 
                desc: "Drag-and-drop OT scheduling board across multiple theatres. Conflict detection, surgeon availability, and equipment checks." 
              },
              { 
                icon: <path d="M9 11l3 3L22 4"></path>, 
                title: "Pre-Op Checklist", 
                desc: "WHO Surgical Safety Checklist and custom pre-op assessment forms. Digital sign-off before every incision." 
              },
              { 
                icon: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>, 
                title: "Intra-Op Notes", 
                desc: "Real-time operative notes, anesthesia records, and instrument counts. Timestamped and linked to patient record." 
              },
              { 
                icon: <circle cx="12" cy="12" r="3"></circle>, 
                title: "Sterilization Tracking", 
                desc: "CSSD integration for instrument sterilization tracking. Barcode scanning ensures every instrument is accounted for." 
              },
              { 
                icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>, 
                title: "Anaesthesia Records", 
                desc: "Digital anaesthesia charts, drug dosage tracking, vitals during surgery, and post-anaesthesia care unit notes." 
              },
              { 
                icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>, 
                title: "OT Analytics", 
                desc: "Surgeon metrics, average case duration, cancellation analysis, and first case on-time start tracking." 
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
              <h2 style={{ fontSize: '2.5rem', marginBottom: '25px' }}>More Surgeries, Zero Compromise</h2>
              <p style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '30px' }}>
                Poorly managed theatres mean cancellations, overruns, and safety gaps. Medical365 OT brings the discipline of aviation-style checklists and real-time coordination to your surgical department.
              </p>
              <ul className="check-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                {[
                  "WHO Safety Checklist built-in",
                  "Eliminate double-booking",
                  "Real-time sterilization status",
                  "Digitized preference cards",
                  "Auto-generated post-op notes",
                  "NABH Standards compliant"
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
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '25px' }}>📊 OT Performance</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                  <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>91%</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Utilization Rate</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>65%</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Less Cancellations</div>
                  </div>
              </div>
              {[
                  { label: "On-Time Starts", val: "89%" },
                  { label: "Instrument Accuracy", val: "100%" },
                  { label: "Safety Compliance", val: "98%" }
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
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>The Surgical Workflow</h2>
            <p style={{ opacity: 0.7 }}>A standardized journey for every procedure.</p>
          </div>
          <div className="workflow-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
            {[
              { step: 1, title: "Schedule", desc: "Drag-and-drop booking board" },
              { step: 2, title: "Prep", desc: "Safety checklist & consent" },
              { step: 3, title: "Operate", desc: "Intra-op logging & monitoring" },
              { step: 4, title: "Close", desc: "Instrument count & sign-off" },
              { step: 5, title: "Handover", desc: "Post-op summary to IPD" }
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
              <h2 className="reveal" style={{ fontSize: '2rem', marginBottom: '40px' }}>Connected Ecosystem</h2>
              <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
                  {[
                      "IPD Module", "CSSD Sterilization", "Anaesthesia Systems", "Surgical EMR", 
                      "Pharmacy Module", "Lab/Diagnostics", "HIMS Billing", "Radiology/PACS"
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
          <h2 className="reveal" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Maximize your OT productivity.</h2>
          <p className="reveal" style={{ opacity: 0.8, marginBottom: '40px' }}>See how Medical365 OT Management can add 2–3 more surgeries per day without extra staff.</p>
          <div className="reveal" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <a href="/book-demo" className="btn-primary btn-lg">Book a Free Demo</a>
            <a href="/contact" className="btn-secondary btn-lg">Contact Sales</a>
          </div>
        </div>
      </section>
    </>
  );
}
