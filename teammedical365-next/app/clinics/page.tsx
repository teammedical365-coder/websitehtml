import React from 'react';

export default function ClinicsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="badge reveal">🏥 Clinic Solutions</div>
            <h1 className="reveal" style={{ animationDelay: '0.1s' }}>Run Your Clinic <span className="text-gradient">Smarter</span></h1>
            <p className="reveal" style={{ animationDelay: '0.2s' }}>Medical365 gives independent clinics and polyclinics a complete digital backbone — from appointment booking to billing — in a single, easy-to-use platform.</p>
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
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <div><h2>Clinic Dashboard</h2><p>Live Dashboard</p></div>
              </div>
              <div className="metric-row">
                <div className="metric"><div className="metric-val">280</div><div className="metric-lbl">Patients Today</div></div>
                <div className="metric"><div className="metric-val">94%</div><div className="metric-lbl">On-Time Rate</div></div>
                <div className="metric"><div className="metric-val">₹1.8L</div><div className="metric-lbl">Revenue Today</div></div>
              </div>
              <div className="progress-item">
                <div className="progress-label"><span>Appointments Completed</span><span>78%</span></div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: '78%' }}></div></div>
              </div>
              <div className="progress-item">
                <div className="progress-label"><span>Bills Generated</span><span>65%</span></div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: '65%' }}></div></div>
              </div>
              <div className="progress-item">
                <div className="progress-label"><span>Patient Satisfaction</span><span>92%</span></div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: '92%' }}></div></div>
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
              { title: "Online Appointment Booking", desc: "Let patients self-schedule 24/7 via web or app. Automatic reminders reduce no-shows by up to 40%.", icon: "M2 4h20v16H2z M12 12v4" },
              { title: "Digital OPD & EMR", desc: "Paperless consultations with specialty-specific templates. Auto-fill from previous visits saves 60% charting time.", icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2 14 8 20 8" },
              { title: "Queue & Token Management", desc: "Smart token display system with SMS/WhatsApp alerts keeps patients informed and reduces waiting room congestion.", icon: "M22 12h-4l-3 9L9 3l-3 9H2" },
              { title: "Billing & Collections", desc: "One-click invoice generation, UPI/card/cash payments, insurance claims, and daily reconciliation reports.", icon: "M2 3h20v142 M8 21h8 M12 17v4" },
              { title: "Patient Records & History", desc: "Complete longitudinal health records accessible in seconds. Prescriptions, lab reports, and visit history in one view.", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" },
              { title: "Analytics & Reports", desc: "Daily, weekly, and monthly reports on revenue, footfall, and doctor performance. Make data-driven decisions instantly.", icon: "M22 12 18 12 15 21 9 3 6 12 2 12" }
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
              <h2>Everything a Clinic Needs to Thrive</h2>
              <p>Stop juggling multiple tools and paper registers. Medical365 consolidates your entire clinic workflow into one seamless platform, helping you see more patients and collect more revenue with less stress.</p>
              <ul className="check-list">
                {["Go paperless from day one", "Reduce missed appointments by 40%", "Automated GST-compliant invoicing", "WhatsApp prescription sharing", "HIPAA-compliant data security", "Setup in under 3 days"].map((check, i) => (
                  <li key={i}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>{check}</li>
                ))}
              </ul>
              <a href="/book-demo" className="btn-primary" style={{ marginTop: '30px' }}>Get Started →</a>
            </div>
            <div className="benefits-visual reveal">
              <div className="bv-title">📊 Performance at a Glance</div>
              <div className="bv-stat-row">
                <div className="bv-stat"><div className="bv-stat-num">40%</div><div className="bv-stat-lbl">Fewer No-Shows</div></div>
                <div className="bv-stat"><div className="bv-stat-num">3x</div><div className="bv-stat-lbl">Faster Billing</div></div>
              </div>
              <div className="progress-item">
                <div className="bv-bar-label"><span>Admin Time Saved</span><span>65%</span></div>
                <div className="bv-bar"><div className="bv-bar-fill" style={{ width: '65%' }}></div></div>
              </div>
              <div className="progress-item">
                <div className="bv-bar-label"><span>Revenue Increase (Avg)</span><span>28%</span></div>
                <div className="bv-bar"><div className="bv-bar-fill" style={{ width: '28%' }}></div></div>
              </div>
              <div className="progress-item">
                <div className="bv-bar-label"><span>Patient Satisfaction</span><span>94%</span></div>
                <div className="bv-bar"><div className="bv-bar-fill" style={{ width: '94%' }}></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="workflow-section">
        <div className="container">
          <div className="section-header text-center reveal">
            <h2>How It Works</h2>
            <p>Up and running in days, not months.</p>
          </div>
          <div className="workflow-steps">
            {[
              { num: 1, title: "Sign Up", desc: "Create your clinic profile in minutes" },
              { num: 2, title: "Import Data", desc: "We migrate your existing records" },
              { num: 3, title: "Configure", desc: "Set up your doctors and schedules" },
              { num: 4, title: "Go Live", desc: "Start seeing patients digitally" }
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
            <h2>Seamless Integrations</h2>
            <p>Connects with the tools and systems your facility already uses.</p>
          </div>
          <div className="integrations-grid reveal">
            {["WhatsApp", "Google Calendar", "Razorpay", "PayTM", "Practo", "Google Maps", "SMS Gateway", "HL7 FHIR"].map((int, i) => (
              <div key={i} className="integration-chip">{int}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="bottom-cta">
        <div className="container">
          <h2>Ready to modernize your clinic?</h2>
          <p>Join 300+ clinics already running on Medical365.</p>
          <div className="justify-center" style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
            <a href="/book-demo" className="btn-primary btn-lg">Book a Free Demo</a>
            <a href="/contact" className="btn-outline-white btn-lg">Contact Sales</a>
          </div>
        </div>
      </section>
    </>
  );
}
