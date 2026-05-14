import React from 'react';

export default function HospitalsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="badge reveal">🏨 Hospital Solutions</div>
            <h1 className="reveal" style={{ animationDelay: '0.1s' }}>Enterprise HMS for <span className="text-gradient">Modern Hospitals</span></h1>
            <p className="reveal" style={{ animationDelay: '0.2s' }}>A complete, modular Hospital Management System built for multi-department operations. From admission to discharge, billing to analytics — all in one integrated platform.</p>
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
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                    <path d="M9 22v-4h6v4"></path>
                    <path d="M8 6h.01"></path>
                    <path d="M16 6h.01"></path>
                    <path d="M12 6h.01"></path>
                    <path d="M12 10h.01"></path>
                  </svg>
                </div>
                <div><h2>Hospital Operations</h2><p>Live Dashboard</p></div>
              </div>
              <div className="metric-row">
                <div className="metric"><div className="metric-val">1,240</div><div className="metric-lbl">Active Patients</div></div>
                <div className="metric"><div className="metric-val">187</div><div className="metric-lbl">Beds Occupied</div></div>
                <div className="metric"><div className="metric-val">98.2%</div><div className="metric-lbl">Uptime SLA</div></div>
              </div>
              <div className="progress-item">
                <div className="progress-label"><span>Bed Occupancy Rate</span><span>82%</span></div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: '82%' }}></div></div>
              </div>
              <div className="progress-item">
                <div className="progress-label"><span>OT Utilization</span><span>75%</span></div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: '75%' }}></div></div>
              </div>
              <div className="progress-item">
                <div className="progress-label"><span>Revenue Collection</span><span>89%</span></div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: '89%' }}></div></div>
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
              { title: "Admission, Discharge & Transfer", desc: "Streamlined ADT workflow with bed allocation, inter-department transfers, and automated discharge summaries.", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" },
              { title: "Multi-Department Management", desc: "Unified platform for OPD, IPD, Emergency, ICU, OT, Lab, Radiology, and Pharmacy — all talking to each other.", icon: "M22 12h-4l-3 9L9 3l-3 9H2" },
              { title: "Revenue Cycle Management", desc: "End-to-end billing, insurance claim processing, TPA management, and financial dashboards for hospital finance teams.", icon: "M2 3h20v14 M12 17v4" },
              { title: "Clinical Documentation", desc: "Specialty-specific EMR templates, physician order entry (CPOE), nursing notes, and care plan management.", icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2 14 8 20 8" },
              { title: "Real-Time Bed Management", desc: "Live bed availability dashboard. Intelligent bed allocation based on specialty, cleanliness status, and patient acuity.", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
              { title: "Executive Analytics", desc: "C-suite dashboards with KPIs on revenue, length of stay, readmission rates, departmental performance, and NABH metrics.", icon: "M22 12 18 12 15 21 9 3 6 12 2 12" }
            ].map((f, i) => (
              <div key={i} className="feature-card reveal" style={{ animationDelay: `${i * 0.08}s` }}>
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
              <h2>Built for Hospital Scale</h2>
              <p>Medical365 HMS handles the complexity of multi-specialty hospital operations without compromise. Designed by healthcare IT experts with input from over 200 hospital administrators.</p>
              <ul className="check-list">
                {["NABH & JCI compliant workflows", "Role-based access for every department", "Interoperable with lab and radiology systems", "24/7 enterprise support & SLA", "Multi-facility management from one console", "Cloud or on-premise deployment options"].map((check, i) => (
                  <li key={i}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>{check}</li>
                ))}
              </ul>
              <a href="/book-demo" className="btn-primary" style={{ marginTop: '30px' }}>Get Started →</a>
            </div>
            <div className="benefits-visual reveal">
              <div className="bv-title">📊 Performance at a Glance</div>
              <div className="bv-stat-row">
                <div className="bv-stat"><div className="bv-stat-num">35%</div><div className="bv-stat-lbl">Reduced LOS</div></div>
                <div className="bv-stat"><div className="bv-stat-num">28%</div><div className="bv-stat-lbl">Revenue Increase</div></div>
              </div>
              <div className="progress-item">
                <div className="bv-bar-label"><span>Staff Productivity Gain</span><span>42%</span></div>
                <div className="bv-bar"><div className="bv-bar-fill" style={{ width: '42%' }}></div></div>
              </div>
              <div className="progress-item">
                <div className="bv-bar-label"><span>Billing Accuracy</span><span>99%</span></div>
                <div className="bv-bar"><div className="bv-bar-fill" style={{ width: '99%' }}></div></div>
              </div>
              <div className="progress-item">
                <div className="bv-bar-label"><span>Patient Satisfaction</span><span>91%</span></div>
                <div className="bv-bar"><div className="bv-bar-fill" style={{ width: '91%' }}></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="workflow-section">
        <div className="container">
          <div className="section-header text-center reveal">
            <h2>How It Works</h2>
            <p>Enterprise deployment made simple.</p>
          </div>
          <div className="workflow-steps">
            {[
              { num: 1, title: "Assessment", desc: "Our team analyses your hospital workflows" },
              { num: 2, title: "Configuration", desc: "System configured to your departments" },
              { num: 3, title: "Training", desc: "Staff trained by certified specialists" },
              { num: 4, title: "Go Live", desc: "Full deployment with on-site support" }
            ].map((step, i) => (
              <div key={i} className="wf-step reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="wf-num">{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="integrations-section">
        <div className="container">
          <div className="section-header text-center reveal">
            <h2>Hospial Ecosystem</h2>
            <p>One platform, unlimited possibilities.</p>
          </div>
          <div className="integrations-grid reveal">
            {["LIMS", "RIS/PACS", "Pharmacy", "Blood Bank", "HRMS", "Tally ERP", "NABH Accreditation", "HL7 FHIR", "ABDM/ABHA"].map((int, i) => (
              <div key={i} className="integration-chip">{int}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="bottom-cta">
        <div className="container">
          <h2>Transform your hospital operations.</h2>
          <p>See how Medical365 HMS can reduce costs and improve patient outcomes at your facility.</p>
          <div className="justify-center" style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
            <a href="/book-demo" className="btn-primary btn-lg">Book a Free Demo</a>
            <a href="/contact" className="btn-outline-white btn-lg">Contact Sales</a>
          </div>
        </div>
      </section>
    </>
  );
}
