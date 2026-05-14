import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section className="hero-redesign mesh-bg">
        <div className="hero-container container">
          <div className="hero-content">
            <div className="badge fade-in-up">🌟 India's #1 Healthcare Operating System</div>
            <h1 className="hero-title fade-in-up" style={{ animationDelay: '0.1s' }}>
              Empowering India's Hospitals with <br />
              <span className="text-gradient">Next-Gen Digital Workflows</span>
            </h1>
            <p className="hero-subtitle fade-in-up" style={{ animationDelay: '0.2s' }}>
              Medical365 brings your entire clinical, administrative, and financial operations into one unified, secure, and intuitive cloud platform.
            </p>
            <div className="hero-buttons fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link href="/book-demo" className="btn-primary btn-lg">Book a Free Demo</Link>
            </div>
          </div>
          <div className="hero-visual-3d fade-in-up" style={{ animationDelay: '0.4s' }}>
            <img src="/img/redesign/hero_3d_dashboard_mockup_1775221247034.png" alt="Medical365 Dashboard" className="floating-mockup" />
          </div>
        </div>
      </section>

      <section className="logo-cloud premium-glow-bg">
        <div className="container text-center">
          <p className="trusted-text">TRUSTED BY OVER 500+ HEALTHCARE INSTITUTIONS ACROSS INDIA</p>
          <div className="logos fade-in-up">
            <div className="logo-placeholder" style={{ animationDelay: '0.1s' }}>City Hospital</div>
            <div className="logo-placeholder" style={{ animationDelay: '0.2s' }}>Apollo Care</div>
            <div className="logo-placeholder" style={{ animationDelay: '0.3s' }}>MedLife</div>
            <div className="logo-placeholder" style={{ animationDelay: '0.4s' }}>CarePlus</div>
            <div className="logo-placeholder" style={{ animationDelay: '0.5s' }}>HealthFirst</div>
          </div>
        </div>
      </section>

      {/* Task 1: Problem / Agitation Section */}
      <section className="pain-points-split container" style={{ padding: '120px 0' }}>
        <div className="pain-sticky-left fade-in-up">
          <div className="badge">Problem ⮕ Solution</div>
          <h2 className="section-title">Stop letting operational chaos <span className="text-gradient">hold your hospital back.</span></h2>
          <p className="section-subtitle" style={{ marginLeft: 0 }}>Manual processes and disconnected systems are costing you more than just time—they're hindering patient care and revenue.</p>
          <Link href="/book-demo" className="btn-primary">Fix Your Operations Now</Link>
        </div>
        <div className="pain-scroll-right">
          <div className="overlapping-card fade-in-right" style={{ animationDelay: '0.1s' }}>
            <div className="bento-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 6l-9.5 9.5-5-5L1 18"></path><path d="M17 6h6v6"></path></svg>
            </div>
            <h3>Stop Revenue Leaks</h3>
            <p>Eliminate missed charges and billing errors with automated RCM workflows that capture every penny.</p>
          </div>
          <div className="overlapping-card fade-in-right" style={{ animationDelay: '0.2s' }}>
            <div className="bento-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <h3>End Patient Bottlenecks</h3>
            <p>Reduce wait times and front-desk confusion with smart queue management and digital check-ins.</p>
          </div>
          <div className="overlapping-card fade-in-right" style={{ animationDelay: '0.3s' }}>
            <div className="bento-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            </div>
            <h3>Unify Disconnected Data</h3>
            <p>Stop manually moving data between labs, pharmacy, and IPD/OPD. One patient, one single source of truth.</p>
          </div>
        </div>
      </section>

      <section id="features" className="container" style={{ padding: '120px 0' }}>
        <div className="section-header text-center fade-in-up">
          <div className="badge">Healthcare Ecosystem</div>
          <h2 className="section-title">Everything you need to <span className="text-gradient">run your facility</span></h2>
          <p className="section-subtitle">A modular, enterprise-grade architecture that scales from clinics to 1000+ bed hospital chains.</p>
        </div>

        <div className="bento-grid-redesign">
          <div className="bento-card bento-hero fade-in-up">
            <img src="/img/redesign/emr_icon_3d_1775221267246.png" alt="Smart EMR" className="bento-icon" />
            <h3>Smart EMR & EHR</h3>
            <p>Streamline patient records with intuitive, specialty-specific charting, fast data retrieval, and AI-powered clinical decision support.</p>
            <div style={{ marginTop: 'auto' }}>
              <Link href="/emr" className="btn-secondary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>Learn More</Link>
            </div>
            <img src="/img/redesign/audience_doctor_ui_1775221336150.png" alt="EMR UI" className="bento-img" style={{ opacity: 0.8, marginTop: '20px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
          </div>

          <div className="bento-card bento-medium fade-in-up" style={{ animationDelay: '0.1s', background: 'linear-gradient(135deg, #f0fdfa 0%, #ffffff 100%)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <img src="/img/redesign/rcm_icon_3d_1775221290252.png" alt="RCM" className="bento-icon" style={{ marginBottom: 0 }} />
              <div>
                <h3>Revenue Cycle (RCM)</h3>
                <p>Automate billing, TPA claims, and financial reporting to reduce leakage and accelerate cash flow.</p>
              </div>
            </div>
          </div>

          <div className="bento-card bento-small fade-in-up" style={{ animationDelay: '0.15s' }}>
            <div className="feature-icon" style={{ color: 'var(--redesign-blue)', marginBottom: '16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
            </div>
            <h3>Patient Portal</h3>
            <p>Self-service scheduling and health records.</p>
          </div>

          <div className="bento-card bento-small fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="feature-icon" style={{ color: 'var(--redesign-teal)', marginBottom: '16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line></svg>
            </div>
            <h3>LIMS & Lab</h3>
            <p>Direct analyzer integration & auto-reports.</p>
          </div>

          <div className="bento-card bento-small fade-in-up" style={{ animationDelay: '0.25s' }}>
            <div className="feature-icon" style={{ color: '#6366f1', marginBottom: '16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect></svg>
            </div>
            <h3>Full HIMS</h3>
            <p>IPD, OT, wards & bed management.</p>
          </div>

          <div className="bento-card bento-medium fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3>Pharmacy & Inventory</h3>
            <p>End-to-end stock tracking, expiry alerts, and multi-store procurement workflows integrated directly with patient billing.</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <span style={{ background: '#f1f5f9', padding: '4px 12px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 600 }}>Barcode Ready</span>
              <span style={{ background: '#f1f5f9', padding: '4px 12px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 600 }}>Smart Procurement</span>
            </div>
          </div>
        </div>
      </section>

      <section className="impact-cta-prelude">
        <div className="container">
          <div className="cta-content fade-in-up" style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '30px' }}>Ready to elevate your <br /> healthcare facility?</h2>
            <p style={{ fontSize: '1.25rem', opacity: 0.8, marginBottom: '50px' }}>Join India's leading medical directors who have already modernized their clinical workflows.</p>
            <Link href="/book-demo" className="btn-primary" style={{ background: '#fff', color: 'var(--redesign-blue)', padding: '20px 50px', fontSize: '1.25rem', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>Book Your Free Demo Today</Link>
          </div>
        </div>
      </section>
    </>
  );
}
