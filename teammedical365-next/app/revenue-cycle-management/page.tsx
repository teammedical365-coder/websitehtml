import React from 'react';

export const metadata = {
  title: 'Revenue Cycle Management (RCM) Software - Medical365',
  description: 'Maximize healthcare collections and minimize claim denials with Medical365 RCM. Automated charge capture, insurance eligibility checks, and AI-driven denial management.',
};

export default function RevenueCycleManagementPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="badge reveal">💰 Financial Excellence</div>
            <h1 className="reveal" style={{ animationDelay: '0.1s' }}>
              Precision <span className="text-gradient">Revenue Management</span>
            </h1>
            <p className="reveal" style={{ animationDelay: '0.2s' }}>
              Accelerate your cash flow and eliminate revenue leakage. Medical365's RCM suite automates the entire financial lifecycle—from pre-authorization and charge capture to claim submission and reconciliation.
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
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <div>
                  <h2>Revenue Analytics</h2>
                  <p>Consolidated Daily Performance</p>
                </div>
              </div>
              <div className="metric-row" style={{ display: 'flex', gap: '15px', margin: '20px 0' }}>
                <div className="metric">
                  <div className="metric-val" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₹42L</div>
                  <div className="metric-lbl" style={{ fontSize: '0.8rem', opacity: 0.6 }}>MTD Revenue</div>
                </div>
                <div className="metric">
                  <div className="metric-val" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>98%</div>
                  <div className="metric-lbl" style={{ fontSize: '0.8rem', opacity: 0.6 }}>Claim Approval</div>
                </div>
                <div className="metric">
                  <div className="metric-val" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>18d</div>
                  <div className="metric-lbl" style={{ fontSize: '0.8rem', opacity: 0.6 }}>Avg Collection</div>
                </div>
              </div>
              {[
                { label: "Claims Processing Status", value: "94%" },
                { label: "Denial Recovery Rate", value: "82%" },
                { label: "Collection Efficiency", value: "91%" }
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
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>End-to-End Financial Control</h2>
            <p style={{ opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>Reduce administrative friction and maximize your bottom line.</p>
          </div>
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { 
                icon: <path d="M12 2v20"></path>, 
                title: "Automated Charge Capture", 
                desc: "Clinical services are instantly converted into billing codes, ensuring zero revenue is lost to missed bedside procedures or diagnostic tests." 
              },
              { 
                icon: <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>, 
                title: "Eligibility Verification", 
                desc: "Real-time insurance eligibility checks at registration prevent back-end denials and improve front-end collection rates by up to 30%." 
              },
              { 
                icon: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>, 
                title: "AI-Driven Denial Mgmt", 
                desc: "Automatically categorize and analyze denied claims. Our predictive engine suggests the best course of action for rapid resubmission." 
              },
              { 
                icon: <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>, 
                title: "TPA & Insurance Panels", 
                desc: "Integrated workflows for 50+ central and state insurance schemes including AB-PMJAY and private TPA settlements." 
              },
              { 
                icon: <circle cx="12" cy="12" r="10"></circle>, 
                title: "Payment Gateway Integration", 
                desc: "Provide patients with multi-channel payment options (UPI, Credit Cards, Net Banking) that reconcile with balances instantly." 
              },
              { 
                icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>, 
                title: "Payer Performance Audit", 
                desc: "Identify which payers are frequently denying or delaying payments with audit-ready dashboards for strategic negotiation." 
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
              <h2 style={{ fontSize: '2.5rem', marginBottom: '25px' }}>Maximize Collections, Minimize Denial</h2>
              <p style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '30px' }}>
                Billing complexity shouldn't hurt your facility's growth. Medical365 provides the transparency and automation needed to run a profitable healthcare enterprise.
              </p>
              <ul className="check-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                {[
                  "GST & Tax compliance",
                  "E-invoicing support",
                  "Consolidated billing",
                  "Tally/Zoho integration",
                  "Audit-ready logs",
                  "Bulk claim filing"
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
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '25px' }}>📑 Financial ROI Dashboard</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                  <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>28%</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Net Collection Growth</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>-45%</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Denial Volume Drop</div>
                  </div>
              </div>
              {[
                  { label: "Claims Submitted < 24 Hours", val: "97%" },
                  { label: "Automated Reconciliation", val: "84%" },
                  { label: "Payer Compliance Score", val: "99%" }
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
          <h2 className="reveal" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Take full control of your hospital's finances.</h2>
          <p className="reveal" style={{ opacity: 0.8, marginBottom: '40px' }}>Book a demo to see how Medical365's Revenue Cycle Management can transform your collections.</p>
          <div className="reveal" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <a href="/book-demo" className="btn-primary btn-lg">Book a Free Demo</a>
            <a href="/contact" className="btn-secondary btn-lg">Contact Sales</a>
          </div>
        </div>
      </section>
    </>
  );
}
