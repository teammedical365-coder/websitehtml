import React from 'react';
import Link from 'next/link';

export async function generateStaticParams() {
  const locations = [
    'jaipur', 'jodhpur', 'udaipur', 'kota', 'ajmer', 'bikaner', 
    'bhilwara', 'alwar', 'sikar', 'pali', 'bharatpur', 'sri-ganganagar'
  ];
  return locations.map((location) => ({
    location: location,
  }));
}

export default async function SoftwareLocationPage({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;
  
  // Format the location name for display (e.g., "jaipur" -> "Jaipur")
  const formattedLocation = location.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <>
      <section className="section-padding mesh-bg">
        <div className="container">
          <div className="section-header text-center reveal">
            <div className="badge">Software in {formattedLocation}</div>
            <h1 className="section-title">Healthcare Management Software in <span className="text-gradient">{formattedLocation}</span></h1>
            <p className="section-subtitle">
              Experience the future of hospital and clinic operations in {formattedLocation} with Medical365's integrated cloud platform.
            </p>
          </div>
          
          <div className="overlapping-card reveal" style={{ maxWidth: '800px', margin: '40px auto' }}>
            <h3>Specialized for Providers in {formattedLocation}</h3>
            <p>
              Whether you run a multi-specialty hospital or a private clinic in {formattedLocation}, 
              Medical365 provides ABDM-compliant, secure, and intuitive tools to manage your entire workflow.
            </p>
            <div style={{ marginTop: '30px' }}>
              <Link href="/book-demo" className="btn-primary">Book a Demo in {formattedLocation}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '80px 0' }}>
        <div className="bento-grid-redesign">
          <div className="bento-card bento-hero reveal">
            <h3>Smart EMR for {formattedLocation} Clinicians</h3>
            <p>Tailored charting and clinical workflows specifically for the Indian healthcare landscape.</p>
            <div style={{ marginTop: 'auto' }}>
              <Link href="/emr" className="btn-secondary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>Explore EMR</Link>
            </div>
          </div>
          <div className="bento-card bento-medium reveal" style={{ animationDelay: '0.1s' }}>
            <h3>Integrated Billing (RCM)</h3>
            <p>Automate TPA claims and capture every revenue leak with our smart financial engine.</p>
          </div>
          <div className="bento-card bento-medium reveal" style={{ animationDelay: '0.2s' }}>
            <h3>Patient portal</h3>
            <p>Let your patients in {formattedLocation} book appointments and access records digitally.</p>
          </div>
        </div>
      </section>

      <section className="impact-cta-prelude">
        <div className="container">
          <div className="cta-content reveal" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: '30px' }}>Join {formattedLocation}&apos;s Digital Health Revolution</h2>
            <Link href="/book-demo" className="btn-primary" style={{ background: '#fff', color: 'var(--redesign-blue)', padding: '20px 50px' }}>Get Started Today</Link>
          </div>
        </div>
      </section>
    </>
  );
}
