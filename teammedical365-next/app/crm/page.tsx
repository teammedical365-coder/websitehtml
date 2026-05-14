import React from 'react';

export const metadata = {
  title: 'Healthcare CRM - Medical365',
  description: 'Build lasting patient relationships with Medical365 CRM. Automated recalls, follow-ups, feedback management, and health campaigns to grow your medical practice.',
};

export default function CRMPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="badge reveal">🤝 Healthcare CRM</div>
            <h1 className="reveal" style={{ animationDelay: '0.1s' }}>
              Build Lasting <span className="text-gradient">Patient Relationships</span>
            </h1>
            <p className="reveal" style={{ animationDelay: '0.2s' }}>
              Medical365 CRM helps healthcare providers acquire new patients, retain existing ones, and grow revenue through intelligent communication, feedback management, and care coordination.
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
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  </svg>
                </div>
                <div>
                  <h2>Patient Engagement</h2>
                  <p>Live Dashboard</p>
                </div>
              </div>
              <div className="metric-row" style={{ display: 'flex', gap: '15px', margin: '20px 0' }}>
                <div className="metric">
                  <div className="metric-val" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>12.4K</div>
                  <div className="metric-lbl" style={{ fontSize: '0.8rem', opacity: 0.6 }}>Patients</div>
                </div>
                <div className="metric">
                  <div className="metric-val" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>68%</div>
                  <div className="metric-lbl" style={{ fontSize: '0.8rem', opacity: 0.6 }}>Recall Rate</div>
                </div>
                <div className="metric">
                  <div className="metric-val" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>4.7★</div>
                  <div className="metric-lbl" style={{ fontSize: '0.8rem', opacity: 0.6 }}>Avg Rating</div>
                </div>
              </div>
              {[
                { label: "Follow-up Compliance", value: "82%" },
                { label: "Patient Satisfaction", value: "94%" },
                { label: "Review Conversion", value: "68%" }
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
            <p style={{ opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>Grow your practice with data-driven engagement tools.</p>
          </div>
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { 
                icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>, 
                title: "Lifecycle Management", 
                desc: "360° patient profile including visit history, communication logs, preferences, and satisfaction scores." 
              },
              { 
                icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>, 
                title: "Automated Recalls", 
                desc: "Schedule-based campaigns via WhatsApp and SMS for annual check-ups or condition-specific follow-ups." 
              },
              { 
                icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>, 
                title: "Feedback & Reviews", 
                desc: "Post-visit surveys sent automatically. identify dissatisfied patients and escalate complaints before they go public." 
              },
              { 
                icon: <rect x="2" y="4" width="20" height="16" rx="2"></rect>, 
                title: "Health Campaigns", 
                desc: "Targeted awareness drives for chronic conditions or seasonal health segmented by age or history." 
              },
              { 
                icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>, 
                title: "Referral Tracking", 
                desc: "Track referrals to/from specialists. Auto-acknowledge referring doctors to build stronger professional networks." 
              },
              { 
                icon: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>, 
                title: "Marketing Analytics", 
                desc: "Campaign ROI, source attribution (walk-in vs digital), and cost-per-acquisition analysis dashboards." 
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
              <h2 style={{ fontSize: '2.5rem', marginBottom: '25px' }}>Retain More Patients, Grow Sustainably</h2>
              <p style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '30px' }}>
                Acquiring a new patient costs 5x more than retention. Medical365 CRM automates the recall and feedback loops to keep your schedule full.
              </p>
              <ul className="check-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                {[
                  "Auto satisfaction surveys",
                  "WhatsApp health broadcasts",
                  "Complaint exit-flows",
                  "Doctor loyalty management",
                  "Condition-based segments",
                  "Google review integration"
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
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '25px' }}>📊 Growth Metrics</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                  <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>68%</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Recall Success</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>3x</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Retention Multiplier</div>
                  </div>
              </div>
              {[
                  { label: "Follow-up Compliance", val: "82%" },
                  { label: "Campaign Open Rate", val: "74%" },
                  { label: "Patient NPS Score", val: "94%" }
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
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>The Patient Journey</h2>
            <p style={{ opacity: 0.7 }}>Automating engagement at every step.</p>
          </div>
          <div className="workflow-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
            {[
              { step: 1, title: "Capture", desc: "Data from every touchpoint" },
              { step: 2, title: "Engage", desc: "WhatsApp & SMS interaction" },
              { step: 3, title: "Feedback", desc: "Post-visit surveys sent" },
              { step: 4, title: "Retain", desc: "Recall campaigns bring them back" },
              { step: 5, title: "Grow", desc: "Reviews & referrals scale practice" }
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
              <h2 className="reveal" style={{ fontSize: '2rem', marginBottom: '40px' }}>Channel Integrations</h2>
              <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
                  {[
                      "WhatsApp Business API", "Global SMS Gateways", "Google Maps Reviews", "EMR Module", 
                      "Billing/Revenue Module", "Email Marketing Engine", "Facebook Meta Ads", "Practo Platform"
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
          <h2 className="reveal" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Build a loyal patient community.</h2>
          <p className="reveal" style={{ opacity: 0.8, marginBottom: '40px' }}>Book a demo to see Medical365 CRM turn your patient database into a growth engine.</p>
          <div className="reveal" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <a href="/book-demo" className="btn-primary btn-lg">Book a Free Demo</a>
            <a href="/contact" className="btn-secondary btn-lg">Contact Sales</a>
          </div>
        </div>
      </section>
    </>
  );
}
