import React from 'react';

export const metadata = {
  title: 'Doctor Mobile App - Medical365',
  description: 'Manage your practice on the go with Medical365 Doctor App. View schedules, access patient EMR, e-prescribe, and conduct teleconsultations from your smartphone.',
};

export default function DoctorMobileAppPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="badge reveal">👨‍⚕️ Clinician Tools</div>
            <h1 className="reveal" style={{ animationDelay: '0.1s' }}>
              Your Practice, <span className="text-gradient">In Your Pocket</span>
            </h1>
            <p className="reveal" style={{ animationDelay: '0.2s' }}>
              Treat patients from anywhere with the Medical365 Doctor App. Access full EMR history, write prescriptions, view lab results, and manage your theater schedules right from your smartphone.
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
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div>
                  <h2>Doctor Assistant</h2>
                  <p>Daily Appointment Summary</p>
                </div>
              </div>
              <div className="metric-row" style={{ display: 'flex', gap: '15px', margin: '20px 0' }}>
                <div className="metric">
                  <div className="metric-val" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>24</div>
                  <div className="metric-lbl" style={{ fontSize: '0.8rem', opacity: 0.6 }}>Patients Today</div>
                </div>
                <div className="metric">
                  <div className="metric-val" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>4</div>
                  <div className="metric-lbl" style={{ fontSize: '0.8rem', opacity: 0.6 }}>Surgeries</div>
                </div>
                <div className="metric">
                  <div className="metric-val" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>6</div>
                  <div className="metric-lbl" style={{ fontSize: '0.8rem', opacity: 0.6 }}>Tele-consults</div>
                </div>
              </div>
              {[
                { label: "IPD Rounds Completed", value: "75%" },
                { label: "Pending Prescriptions", value: "12%" },
                { label: "Lab Results Reviewed", value: "88%" }
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
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Mobility Redefined</h2>
            <p style={{ opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>Clinical workflows optimized for a 6-inch screen.</p>
          </div>
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { 
                icon: <path d="M12 2v20"></path>, 
                title: "One-Touch Patient History", 
                desc: "Swipe through past visits, previous prescriptions, and lab trends in a timeline-based view designed for speed." 
              },
              { 
                icon: <path d="M12 2L2 12l10 10L22 12z"></path>, 
                title: "Voice-to-Prescription", 
                desc: "Integrated speech recognition allows you to dictate clinical notes and medication orders directly from your mobile." 
              },
              { 
                icon: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>, 
                title: "Live Surgery Tracking", 
                desc: "Check OT status, scrub technician details, and anesthesia notes while moving between patient rounds." 
              },
              { 
                icon: <path d="M15 10l4.553-2.069A1 1 0 0 1 21 8.82v6.36a1 1 0 0 1-1.447.89L15 14M3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z"></path>, 
                title: "Seamless Teleconsultation", 
                desc: "Launch encrypted HD video calls directly from the appointment screen. No separate links or room IDs needed." 
              },
              { 
                icon: <circle cx="12" cy="12" r="10"></circle>, 
                title: "Critical Value Alerts", 
                desc: "Receive push notifications for abnormal lab results or nursing alarms for your admitted patients instantly." 
              },
              { 
                icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>, 
                title: "Finance Dashboard", 
                desc: "Monitor your collection trends, pending bills, and referral counts through visual charts and data points." 
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
              <h2 style={{ fontSize: '2.5rem', marginBottom: '25px' }}>Efficiency at the Point of Care</h2>
              <p style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '30px' }}>
                Doctors are always on the move. Medical365 makes sure your clinical data follows you, reducing administrative burden and focusing on what matters—your patients.
              </p>
              <ul className="check-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                {[
                  "Offline mode support",
                  "Fingerprint/FaceID login",
                  "iOS & Android ready",
                  "Unified branch access",
                  "HIPAA level security",
                  "Zero data lag"
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
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '25px' }}>📈 Clinician Impact</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                  <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>2 hrs</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Saved per Day</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>100%</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Data Mobility</div>
                  </div>
              </div>
              {[
                  { label: "IPD Round Efficiency", val: "68%" },
                  { label: "Mobile Prescription Adoption", val: "92%" },
                  { label: "Patient Wait Time Drop", val: "30%" }
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

      <section className="bottom-cta" style={{ padding: '100px 0', textAlign: 'center', background: 'linear-gradient(135deg, rgba(55, 179, 156, 0.1) 0%, rgba(30, 41, 59, 0.5) 100%)' }}>
        <div className="container">
          <h2 className="reveal" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Reclaim your time. Treat from anywhere.</h2>
          <p className="reveal" style={{ opacity: 0.8, marginBottom: '40px' }}>Book a demo to see the Medical365 Doctor App—the only mobile clinical assistant you'll ever need.</p>
          <div className="reveal" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <a href="/book-demo" className="btn-primary btn-lg">Book a Free Demo</a>
            <a href="/contact" className="btn-secondary btn-lg">Contact Sales</a>
          </div>
        </div>
      </section>
    </>
  );
}
