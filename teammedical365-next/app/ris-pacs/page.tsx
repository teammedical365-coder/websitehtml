import React from 'react';

export const metadata = {
  title: 'RIS & PACS - Radiology Software - Medical365',
  description: 'Streamline your radiology workflow with Medical365 RIS/PACS. Digital radiology from order to report, zero-download DICOM viewer, and secure cloud storage.',
};

export default function RisPacsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="badge reveal">🩻 Radiology Module</div>
            <h1 className="reveal" style={{ animationDelay: '0.1s' }}>
              Digital Radiology from <span className="text-gradient">Order to Report</span>
            </h1>
            <p className="reveal" style={{ animationDelay: '0.2s' }}>
              Medical365 RIS manages radiology orders and scheduling, while our PACS viewer delivers diagnostic-quality images anywhere — eliminating physical films forever.
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
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
                <div>
                  <h2>Radiology Dashboard</h2>
                  <p>Live Studies</p>
                </div>
              </div>
              <div className="metric-row" style={{ display: 'flex', gap: '15px', margin: '20px 0' }}>
                <div className="metric">
                  <div className="metric-val" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>86</div>
                  <div className="metric-lbl" style={{ fontSize: '0.8rem', opacity: 0.6 }}>Studies Today</div>
                </div>
                <div className="metric">
                  <div className="metric-val" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>38m</div>
                  <div className="metric-lbl" style={{ fontSize: '0.8rem', opacity: 0.6 }}>Report TAT</div>
                </div>
                <div className="metric">
                  <div className="metric-val" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>100%</div>
                  <div className="metric-lbl" style={{ fontSize: '0.8rem', opacity: 0.6 }}>Digital</div>
                </div>
              </div>
              {[
                { label: "Studies Reported", value: "92%" },
                { label: "Critical Finding Alerts", value: "100%" },
                { label: "Report Turnaround", value: "88%" }
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
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Features & Capabilities</h2>
            <p style={{ opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>A complete digital ecosystem for modern radiology departments.</p>
          </div>
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { 
                icon: <rect x="2" y="4" width="20" height="16" rx="2"></rect>, 
                title: "Radiology Order Management", 
                desc: "Orders from EMR auto-populate in the RIS worklist. Priority flagging, slot management, and instructions." 
              },
              { 
                icon: <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>, 
                title: "DICOM Viewer (PACS)", 
                desc: "Web-based zero-download DICOM viewer with measurement tools, windowing, and multi-series comparison." 
              },
              { 
                icon: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>, 
                title: "Structured Reporting", 
                desc: "Template-based radiology reports with voice dictation support and medical spelling dictionaries." 
              },
              { 
                icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>, 
                title: "Critical Finding Alerts", 
                desc: "Immediate physician notification for urgent findings via in-app alerts, SMS, and automated protocols." 
              },
              { 
                icon: <circle cx="12" cy="12" r="10"></circle>, 
                title: "Teleradiology Ready", 
                desc: "Remote reporting support with DICOM quality preservation. Route studies to off-site specialists easily." 
              },
              { 
                icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>, 
                title: "Patient Image Sharing", 
                desc: "Secure link delivery to patients. View reports and diagnostic images from any browser globally." 
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
              <h2 style={{ fontSize: '2.5rem', marginBottom: '25px' }}>No Films. No Lost Reports. No Delays.</h2>
              <p style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '30px' }}>
                Physical films are a relic of the past. Medical365 RIS/PACS puts every image and report on a secure, searchable cloud platform.
              </p>
              <ul className="check-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                {[
                  "Zero physical film costs",
                  "Any-browser diagnostic view",
                  "ABDM/AERB compliant storage",
                  "10-year study archiving",
                  "One-click study comparison",
                  "WhatsApp report delivery"
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
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '25px' }}>📊 Operational Efficiency</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                  <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>38m</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Report TAT</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>60%</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Cost Reduction</div>
                  </div>
              </div>
              {[
                  { label: "Digital Study Storage", val: "100%" },
                  { label: "Report Delivery Speed", val: "94%" },
                  { label: "Radiologist Productivity", val: "72%" }
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
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>How It Works</h2>
            <p style={{ opacity: 0.7 }}>A unified flow from clinic to radiology desk.</p>
          </div>
          <div className="workflow-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
            {[
              { step: 1, title: "Order", desc: "Clinician orders in EMR" },
              { step: 2, title: "Scan", desc: "Modality performs study" },
              { step: 3, title: "View", desc: "DICOM auto-upload to PACS" },
              { step: 4, title: "Report", desc: "Radiologist dictates report" },
              { step: 5, title: "Deliver", desc: "Sync to EMR & portal" }
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
              <h2 className="reveal" style={{ fontSize: '2rem', marginBottom: '40px' }}>Connected Modalities</h2>
              <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
                  {[
                      "X-Ray / CR / DR", "CT Scanners", "MRI (High Field)", "Ultrasound (USG)", 
                      "Mammography", "DICOM 3.0", "HL7 / FHIR", "PACS Integration"
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
          <h2 className="reveal" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Go filmless today.</h2>
          <p className="reveal" style={{ opacity: 0.8, marginBottom: '40px' }}>Book a demo to see Medical365 PACS viewer and RIS worklist in action — zero downloads required.</p>
          <div className="reveal" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <a href="/book-demo" className="btn-primary btn-lg">Book a Free Demo</a>
            <a href="/contact" className="btn-secondary btn-lg">Contact Sales</a>
          </div>
        </div>
      </section>
    </>
  );
}
