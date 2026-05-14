import React from 'react';

export default function EMRPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="badge reveal">📋 Electronic Medical Records</div>
            <h1 className="reveal" style={{ animationDelay: '0.1s' }}>Smart EMR Built <span className="text-gradient">for Every Specialty</span></h1>
            <p className="reveal" style={{ animationDelay: '0.2s' }}>Ditch paper charts forever. Medical365&apos;s EMR gives doctors specialty-specific templates, AI-assisted charting, and instant access to complete patient histories.</p>
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
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                  </svg>
                </div>
                <div><h2>EMR Summary</h2><p>Live Dashboard</p></div>
              </div>
              <div className="metric-row">
                <div className="metric"><div className="metric-val">18,400</div><div className="metric-lbl">Active Records</div></div>
                <div className="metric"><div className="metric-val">42 sec</div><div className="metric-lbl">Avg Charting Time</div></div>
                <div className="metric"><div className="metric-val">100%</div><div className="metric-lbl">Audit Trail</div></div>
              </div>
              <div className="progress-item">
                <div className="progress-label"><span>Records Digitized</span><span>100%</span></div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: '100%' }}></div></div>
              </div>
              <div className="progress-item">
                <div className="progress-label"><span>Template Adoption</span><span>94%</span></div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: '94%' }}></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="section-header reveal">
            <h2>Core Capabilities</h2>
            <p>Everything you need, purpose-built for your workflow.</p>
          </div>
          <div className="features-grid">
            {[
              { title: "Specialty-Specific Templates", desc: "Pre-built templates for 35+ specialties including Cardiology, Orthopedics, Dermatology, Paediatrics, and more. Fully customizable.", icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2 14 8 20 8" },
              { title: "CPOE & Clinical Support", desc: "Computerized physician order entry with drug interaction alerts, allergy checks, and evidence-based clinical guidance at point of care.", icon: "M22 12h-4l-3 9L9 3l-3 9H2" },
              { title: "Patient History", desc: "Complete timeline of visits, diagnoses, medications, labs, imaging, and procedures. Filter by date, provider, or condition.", icon: "M12 6v6l4 2 M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" },
              { title: "E-Prescriptions", desc: "Digital prescriptions with brand/generic alternatives, dosage calculators, and automated refill reminders for chronic patients.", icon: "M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" },
              { title: "Lab Integration", desc: "Auto-import of lab results and PACS images directly into the patient record. Abnormal values flagged automatically.", icon: "M2 3h20v142 M8 21h8 M12 17v4" },
              { title: "ICD-10 & SNOMED", desc: "Built-in diagnosis code search with auto-suggestions. Reduces coding errors and speeds up insurance claim processing.", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" }
            ].map((f, i) => (
              <div key={i} className="feature-card reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="feature-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={f.icon}></path></svg></div>
                <h2>{f.title}</h2>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="container">
          <div className="benefits-inner">
            <div className="reveal">
              <h2>Charts in Seconds, Not Minutes</h2>
              <p>Doctors spend an average of 2 hours per day on documentation. Medical365 EMR cuts that by 60% with smart templates and voice-to-text support, giving you time back for patients.</p>
              <ul className="check-list">
                {["60% faster documentation", "Voice-to-text note entry", "Offline mode for low-connectivity", "Complete 7-year record retention", "Structured data for research", "ABDM/ABHA health ID integration"].map((check, i) => (
                  <li key={i}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>{check}</li>
                ))}
              </ul>
              <a href="/book-demo" className="btn-primary" style={{ marginTop: '30px' }}>Get Started →</a>
            </div>
            <div className="benefits-visual reveal">
              <div className="bv-title">📊 Performance at a Glance</div>
              <div className="bv-stat-row">
                <div className="bv-stat"><div className="bv-stat-num">60%</div><div className="bv-stat-lbl">Faster Charting</div></div>
                <div className="bv-stat"><div className="bv-stat-num">99%</div><div className="bv-stat-lbl">Data Accuracy</div></div>
              </div>
              <div className="progress-item">
                <div className="bv-bar-label"><span>Documentation Time Reduction</span><span>60%</span></div>
                <div className="bv-bar"><div className="bv-bar-fill" style={{ width: '60%' }}></div></div>
              </div>
              <div className="progress-item">
                <div className="bv-bar-label"><span>Prescription Error Reduction</span><span>88%</span></div>
                <div className="bv-bar"><div className="bv-bar-fill" style={{ width: '88%' }}></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
