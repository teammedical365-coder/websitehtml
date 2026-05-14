import { products, locations } from '@/lib/seoData';
import { notFound } from 'next/navigation';
import React from 'react';

// 1. Tell Next.js which pages to build at deployment time
export async function generateStaticParams() {
  const params: { product: string; location: string }[] = [];

  products.forEach((prod) => {
    locations.forEach((loc) => {
      params.push({ product: prod.slug, location: loc.slug });
    });
  });

  return params;
}

// 2. Generate Dynamic SEO Meta Tags
export async function generateMetadata({ params }: { params: { product: string, location: string } }) {
  const product = products.find(p => p.slug === params.product);
  const location = locations.find(l => l.slug === params.location);

  if (!product || !location) return {};

  return {
    title: `Best ${product.name} in ${location.name} | Medical365`,
    description: `Empower your healthcare facility in ${location.name} with Medical365's top-rated ${product.name}. Modernize workflows, improve patient care, and ensure full compliance. Book a free demo today.`,
  };
}

// 3. The Universal Glassmorphic SEOLandingPage
export default function SEOLandingPage({ params }: { params: { product: string, location: string } }) {
  const product = products.find(p => p.slug === params.product);
  const location = locations.find(l => l.slug === params.location);

  if (!product || !location) {
    notFound();
  }

  return (
    <>
      <section className="page-hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="badge reveal">📍 Regional Solutions: {location.name}</div>
            <h1 className="reveal" style={{ animationDelay: '0.1s' }}>
              Transforming Healthcare in <span className="text-gradient">{location.name}</span> with {product.name}
            </h1>
            <p className="reveal" style={{ animationDelay: '0.2s' }}>
              Empowering healthcare facilities across {location.name} with the best-in-class {product.name} solution. Our platform provides the digital foundation needed to deliver superior clinical outcomes while streamlining daily administration.
            </p>
            <div className="hero-buttons reveal" style={{ animationDelay: '0.3s' }}>
              <a href="/book-demo" className="btn-primary btn-lg">Book a Free Demo</a>
              <a href="/contact" className="btn-secondary btn-lg">Request Rajasthan Pricing</a>
            </div>
          </div>
          <div className="hero-visual reveal" style={{ animationDelay: '0.3s' }}>
            <div className="hero-card">
              <div className="hero-card-header">
                <div className="hero-card-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <h2>Regional Impact</h2>
                  <p>Performance in {location.name}</p>
                </div>
              </div>
              <div className="metric-row" style={{ display: 'flex', gap: '15px', margin: '20px 0' }}>
                <div className="metric">
                  <div className="metric-val" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>50+</div>
                  <div className="metric-lbl" style={{ fontSize: '0.8rem', opacity: 0.6 }}>Deployed Near {location.name}</div>
                </div>
                <div className="metric">
                  <div className="metric-val" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>24/7</div>
                  <div className="metric-lbl" style={{ fontSize: '0.8rem', opacity: 0.6 }}>Local Support</div>
                </div>
              </div>
              {[
                { label: "Implementation Speed", value: "95%" },
                { label: "Regional Compliance", value: "100%" },
                { label: "Doctor Satisfaction", value: "92%" }
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
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Why Medical365 for your {location.name} Facility?</h2>
            <p style={{ opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>Clinical perfection meets technical robustness. Designed specifically for the healthcare landscape in {location.name}.</p>
          </div>
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { 
                icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>, 
                title: "Built for Reliability", 
                desc: `Our ${product.name} is engineered for 99.9% uptime, even in areas with variable connectivity in ${location.name}.` 
              },
              { 
                icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>, 
                title: "Full Compliance", 
                desc: `Stay audit-ready with automatic ABHA (Ayushman Bharat Health Account) compliance and full data encryption.` 
              },
              { 
                icon: <circle cx="12" cy="12" r="10"></circle>, 
                title: "Intuitive Design", 
                desc: "Reduce staff training time by 70%. Our interface is designed by doctors, for doctors, following the highest standards of clinical UI/UX." 
              },
              { 
                icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>, 
                title: "Localised Support", 
                desc: `Get priority on-ground support in ${location.name} from our implementation experts who understand your regional requirements.` 
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
              <h2 style={{ fontSize: '2.5rem', marginBottom: '25px' }}>Strategic Advantage of ${product.name}</h2>
              <p style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '30px' }}>
                Join hundreds of satisfied clinicians across Rajasthan who have modernized their infrastructure with Medical365. We don't just provide software; we provide a partnership for your facility's growth.
              </p>
              <ul className="check-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                {[
                  "Real-time analytics",
                  "Automated financial logs",
                  "Multi-department sync",
                  "Zero data migration lag",
                  "Offline mode support",
                  "Universal branch access"
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.95rem', opacity: 0.9 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', gap: '20px' }}>
                <a href="/book-demo" className="btn-primary">Book a Demo</a>
                <a href="/about" className="btn-secondary">Check Case Studies</a>
              </div>
            </div>
            <div className="benefits-visual reveal" style={{ padding: '40px', background: 'rgba(255,255,255,0.03)', borderRadius: '30px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '15px' }}>📈 Operational Growth</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '25px' }}>Projected impact for your {location.name} clinic.</div>
              {[
                { label: "Administrative Time Saved", val: "40%" },
                { label: "Patient Turnaround Rate", val: "+25%" },
                { label: "Revenue Leakage prevented", val: "18%" }
              ].map((stat, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                    <span>{stat.label}</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{stat.val}</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>
                    <div style={{ width: stat.val.startsWith('+') ? stat.val.slice(1) : stat.val, background: 'var(--primary)', height: '100%', borderRadius: '3px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section" style={{ padding: '100px 0', textAlign: 'center', background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <h2 className="reveal" style={{ fontSize: '2.5rem', marginBottom: '25px' }}>Leading the Digital Healthcare Wave in {location.name}</h2>
          <p className="reveal" style={{ opacity: 0.8, maxWidth: '700px', margin: '0 auto 40px' }}>
            Book an on-site demo with our {location.name} regional manager and see why Medical365 is the preferred {product.name} choice for top hospitals in Rajasthan.
          </p>
          <div className="reveal" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <a href="/book-demo" className="btn-primary btn-lg">Schedule Free Demo</a>
            <a href="/contact" className="btn-secondary btn-lg">Contact Regional Office</a>
          </div>
        </div>
      </section>
    </>
  );
}
