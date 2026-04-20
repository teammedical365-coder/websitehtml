import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="mega-footer" role="contentinfo">
      {/* ── TOP CTA BAR ── */}
      <div className="mf-cta-bar">
        <div className="mf-cta-inner">
          <div className="mf-cta-text">
            <p className="mf-cta-label">Ready to modernise your hospital?</p>
            <p className="mf-cta-headline">Get a Free Demo — On-Site or Online, Anywhere in Rajasthan</p>
          </div>
          <div className="mf-cta-actions">
            <a href="/book-demo" className="mf-btn-demo">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              Book a Free Demo
            </a>
            <a href="tel:+917791910007" className="mf-btn-call">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>
              +91 77919 10007
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN FOOTER BODY ── */}
      <div className="mf-body">
        <div className="mf-container">
          {/* ROW 1: Brand + Quick Links + Services + Contact ── */}
          <div className="mf-row mf-row-top">
            {/* Brand */}
            <div className="mf-brand">
              <Link href="/" aria-label="Medical365 Home">
                <img loading="lazy" src="/logo/medical365logo1.png" alt="Medical365" className="mf-logo" width="160" height="38" />
              </Link>
              <p className="mf-tagline">Empowering healthcare providers with modern, cloud-based management solutions.</p>
              <Link href="/book-demo" className="mf-demo-pill">Book a Demo</Link>
              {/* Social Links */}
              <div className="mf-social" role="list" aria-label="Social media links">
                <a href="https://www.linkedin.com/company/medical365" className="mf-social-link" aria-label="LinkedIn" role="listitem" target="_blank" rel="noopener">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="https://twitter.com/medical365in" className="mf-social-link" aria-label="Twitter / X" role="listitem" target="_blank" rel="noopener">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://www.facebook.com/medical365in" className="mf-social-link" aria-label="Facebook" role="listitem" target="_blank" rel="noopener">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href="https://www.youtube.com/@medical365" className="mf-social-link" aria-label="YouTube" role="listitem" target="_blank" rel="noopener">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
                </a>
                <a href="https://www.instagram.com/medical365in" className="mf-social-link" aria-label="Instagram" role="listitem" target="_blank" rel="noopener">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
              </div>
              {/* Compliance badges */}
              <div className="mf-badges" role="list" aria-label="Compliance certifications">
                <span className="mf-badge" role="listitem">✓ ABDM</span>
                <span className="mf-badge" role="listitem">✓ DPDP 2023</span>
                <span className="mf-badge" role="listitem">✓ EHR India</span>
                <span className="mf-badge" role="listitem">✓ ISO 27001</span>
                <span className="mf-badge" role="listitem">✓ NABH Ready</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mf-col">
              <h3 className="mf-col-title">Quick Links</h3>
              <ul className="mf-link-col">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/blogs">Insights & Blogs</Link></li>
                <li><Link href="/contact">Contact Support</Link></li>
                <li><Link href="/book-demo">Request Demo</Link></li>
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service">Terms of Service</Link></li>
                <li><Link href="/compliance-security">Compliance & Security</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div className="mf-col mf-col-services">
              <h3 className="mf-col-title">Services</h3>
              <ul className="mf-services-grid">
                 <li><Link href="/clinic-management-system/jaipur"><span className="mf-srv-dot"></span>Clinics (OPD)</Link></li>
                 <li><Link href="/inpatient-management-software/udaipur"><span className="mf-srv-dot"></span>Hospitals (IPD)</Link></li>
                 <li><Link href="/emr-software/bikaner"><span className="mf-srv-dot"></span>Specialty Care & EMR</Link></li>
                 <li><Link href="/pharmacy-management-software/raja-park-jaipur"><span className="mf-srv-dot"></span>Pharmacy Management</Link></li>
                 <li><Link href="/lims-laboratory-information-management/jaipur"><span className="mf-srv-dot"></span>Lab & Diagnostics (LIMS)</Link></li>
                 <li><Link href="/telemedicine-platform/mansarovar-jaipur"><span className="mf-srv-dot"></span>Telemedicine Platform</Link></li>
                 <li><Link href="/revenue-cycle-management/jaipur"><span className="mf-srv-dot"></span>Revenue Cycle Management</Link></li>
                 <li><Link href="/patient-portal-software/vidyadhar-nagar-jaipur"><span className="mf-srv-dot"></span>Patient Portal & App</Link></li>
                 <li><Link href="/hospital-hrms/jaipur"><span className="mf-srv-dot"></span>Hospital HRMS</Link></li>
                 <li><Link href="/blood-bank/udaipur"><span className="mf-srv-dot"></span>Blood Bank Software</Link></li>
                 <li><Link href="/operation-theater-management/alwar"><span className="mf-srv-dot"></span>Operation Theater (OT)</Link></li>
                 <li><Link href="/nursing-management-system/sikar"><span className="mf-srv-dot"></span>Nursing Management</Link></li>
                 <li><Link href="/healthcare-crm/udaipur"><span className="mf-srv-dot"></span>Healthcare CRM</Link></li>
                 <li><Link href="/abha-compliance-software/kota"><span className="mf-srv-dot"></span>ABHA / ABDM Compliance</Link></li>
                 <li><Link href="/hospital-it-cloud-migration/jaipur"><span className="mf-srv-dot"></span>Cloud Migration & IT</Link></li>
                 <li><Link href="/hospital-management-software/jaipur"><span className="mf-srv-dot"></span>Digital Marketing for Hospitals</Link></li>
               </ul>
            </div>

            {/* Contact */}
            <div className="mf-col mf-col-contact">
              <h3 className="mf-col-title">Contact Details</h3>
              <div className="mf-contact-block">
                <div className="mf-contact-item">
                  <svg className="mf-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                  <div>
                    <span className="mf-contact-label">Address</span>
                    <address className="mf-contact-val">Bhamashah Techno Hub, Sansthan Path, Jhalana Gram,<br/>Malviya Nagar, Jaipur, Rajasthan 302017</address>
                  </div>
                </div>
                <div className="mf-contact-item">
                  <svg className="mf-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>
                  <div>
                    <span className="mf-contact-label">Mobile</span>
                    <a href="tel:+917791910007" className="mf-contact-val mf-phone">+91 77919 10007</a>
                  </div>
                </div>
                <div className="mf-contact-item">
                  <svg className="mf-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <div>
                    <span className="mf-contact-label">Email</span>
                    <a href="mailto:info@medical365.in" className="mf-contact-val">info@medical365.in</a>
                  </div>
                </div>
                <div className="mf-contact-item">
                  <svg className="mf-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <div>
                    <span className="mf-contact-label">Support Hours</span>
                    <span className="mf-contact-val">Mon–Sat, 9:00 AM – 6:00 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

          </div>{/* /mf-row-top */}

          {/* ── DIVIDER ── */}
          <div className="mf-divider" role="separator"></div>

          {/* ROW 2: Locations We Serve ── */}
          <div className="mf-row mf-row-loc">
            <div className="mf-section-head">
              <h3 className="mf-col-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: '#37B39C', verticalAlign: 'middle', marginRight: '6px' }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                Locations We Serve
              </h3>
              <span className="mf-section-sub">Hospital &amp; Clinic Software across Rajasthan</span>
            </div>
            <ul className="mf-loc-grid">
               <li><Link href="/clinic-management-system/jaipur"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>Jaipur</Link></li>
               <li><Link href="/outpatient-software-solutions/jodhpur"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>Jodhpur</Link></li>
               <li><Link href="/inpatient-management-software/udaipur"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>Udaipur</Link></li>
               <li><Link href="/healthcare-kiosk-providers/kota"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>Kota</Link></li>
               <li><Link href="/virtual-opd-software/ajmer"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>Ajmer</Link></li>
               <li><Link href="/emr-software/bikaner"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>Bikaner</Link></li>
               <li><Link href="/medical-camp-management-software/bhilwara"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>Bhilwara</Link></li>
               <li><Link href="/operation-theater-management/alwar"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>Alwar</Link></li>
               <li><Link href="/nursing-management-system/sikar"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>Sikar</Link></li>
               <li><Link href="/hospital-management-software/pali"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>Pali</Link></li>
               <li><Link href="/vaccine-management-system/bharatpur"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>Bharatpur</Link></li>
               <li><Link href="/clinic-management-system/sri-ganganagar"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>Sri Ganganagar</Link></li>
             </ul>
          </div>

          {/* ── DIVIDER ── */}
          <div className="mf-divider" role="separator"></div>

          {/* ROW 3: All 57 pages by category ── */}
          <div className="mf-row mf-row-pages">
            <div className="mf-section-head">
              <h3 className="mf-col-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#37B39C" strokeWidth="2.5" aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: '6px' }}><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                All Resources &amp; Guides
              </h3>
              <span className="mf-section-sub">57 in-depth guides covering every healthcare software category</span>
            </div>
            <div className="mf-all-cats">
              <div className="mf-cat-block">
                <h4 className="mf-cat-title">Hospital & Clinic Management</h4>
                <div className="mf-link-cols">
                  <ul className="mf-link-col">
                     <li><Link href="/hospital-management-software/jaipur">Top HMS Rajasthan</Link></li>
                     <li><Link href="/clinic-management-system/jaipur">Clinic System Jaipur</Link></li>
                     <li><Link href="/outpatient-software-solutions/jodhpur">Outpatient Jodhpur</Link></li>
                     <li><Link href="/inpatient-management-software/udaipur">Inpatient Udaipur</Link></li>
                  </ul>
                  <ul className="mf-link-col">
                     <li><Link href="/telemedicine-platform/mansarovar-jaipur">Telemedicine Mansarovar</Link></li>
                     <li><Link href="/hospital-queue-token-management/vaishali-nagar-jaipur">Queue Mgt Vaishali</Link></li>
                     <li><Link href="/healthcare-kiosk-providers/kota">Kiosk Providers Kota</Link></li>
                  </ul>
                </div>
              </div>

              <div className="mf-cat-block">
                <h4 className="mf-cat-title">Clinical & Medical Ops</h4>
                <div className="mf-link-cols">
                  <ul className="mf-link-col">
                     <li><Link href="/emr-software/bikaner">EMR Bikaner</Link></li>
                     <li><Link href="/clinical-assessment-form-software/c-scheme-jaipur">Assessments C-Scheme</Link></li>
                     <li><Link href="/operation-theater-management/alwar">OT Mgt Alwar</Link></li>
                  </ul>
                  <ul className="mf-link-col">
                     <li><Link href="/nursing-management-system/sikar">Nursing Sikar</Link></li>
                     <li><Link href="/lims-laboratory-information-management/jaipur">LIMS Jaipur</Link></li>
                  </ul>
                </div>
              </div>

              <div className="mf-cat-block">
                <h4 className="mf-cat-title">Patient Experience</h4>
                <div className="mf-link-cols">
                  <ul className="mf-link-col">
                     <li><Link href="/hospital-online-scheduling-software/udaipur">Scheduling Udaipur</Link></li>
                     <li><Link href="/patient-portal-software/vidyadhar-nagar-jaipur">Portal Vidyadhar</Link></li>
                  </ul>
                  <ul className="mf-link-col">
                     <li><Link href="/patient-mobile-app/jaipur">Patient App Raj.</Link></li>
                     <li><Link href="/healthcare-feedback-satisfaction-surveys/alwar">Surveys Alwar</Link></li>
                  </ul>
                </div>
              </div>

              <div className="mf-cat-block">
                <h4 className="mf-cat-title">IT & Infrastructure</h4>
                <div className="mf-link-cols">
                  <ul className="mf-link-col">
                     <li><Link href="/hospital-it-cloud-migration/jaipur">Cloud Jaipur</Link></li>
                     <li><Link href="/hospital-data-backup-recovery/kota">Backup Kota</Link></li>
                  </ul>
                  <ul className="mf-link-col">
                     <li><Link href="/fhir-hl7-compliant-software/jaipur">FHIR/HL7 Raj.</Link></li>
                     <li><Link href="/medical-robotic-process-automation/jodhpur">RPA Jodhpur</Link></li>
                  </ul>
                </div>
              </div>

              <div className="mf-cat-block">
                <h4 className="mf-cat-title">HR & Operations</h4>
                <div className="mf-link-cols">
                  <ul className="mf-link-col">
                     <li><Link href="/hospital-hrms/jaipur">HRMS Jaipur</Link></li>
                     <li><Link href="/healthcare-crm/udaipur">CRM Udaipur</Link></li>
                  </ul>
                  <ul className="mf-link-col">
                     <li><Link href="/hospital-bed-management-software/bapu-nagar-jaipur">Bed Mgt Jaipur</Link></li>
                     <li><Link href="/medical-asset-inventory-management/jodhpur">Assets Jodhpur</Link></li>
                  </ul>
                </div>
              </div>

              <div className="mf-cat-block" style={{ gridColumn: 'span 1' }}>
                <h4 className="mf-cat-title">Govt & Public Health</h4>
                <div className="mf-link-cols">
                  <ul className="mf-link-col">
                     <li><Link href="/integrated-population-healthcare-management/jaipur">Public Health Raj.</Link></li>
                     <li><Link href="/abha-compliance-software/kota">ABHA Compliance</Link></li>
                  </ul>
                  <ul className="mf-link-col">
                     <li><Link href="/vaccine-management-system/bharatpur">Vaccine Mgt.</Link></li>
                     <li><Link href="/multi-facility-hospital-software/jaipur">Multi-Facility</Link></li>
                  </ul>
                </div>
              </div>
            </div>{/* /mf-all-cats */}
          </div>{/* /mf-row-pages */}

          {/* ── DIVIDER ── */}
          <div className="mf-divider" role="separator"></div>

          {/* ROW 4: Bottom bar ── */}
          <div className="mf-bottom">
            <div className="mf-bottom-left">
              <p className="mf-copy">© 2026 Medical365 — Bhamashah Techno Hub, Malviya Nagar, Jaipur, Rajasthan 302017. All rights reserved.</p>
              <p className="mf-copy mf-copy-sm">CIN: U72900RJ2022PTC080000 &nbsp;|&nbsp; GST: 08AAAAA0000A1Z5 &nbsp;|&nbsp; Made in India 🇮🇳</p>
            </div>
            <div className="mf-bottom-right">
              <div className="mf-compliance-badges" role="list" aria-label="Compliance certifications">
                <span className="mf-cbadge" role="listitem">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                  ABDM Compliant
                </span>
                <span className="mf-cbadge" role="listitem">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  DPDP Act 2023
                </span>
                <span className="mf-cbadge" role="listitem">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                  EHR Standards
                </span>
                <span className="mf-cbadge" role="listitem">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>
                  ISO 27001
                </span>
                <span className="mf-cbadge" role="listitem">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  NABH Ready
                </span>
              </div>
              <div className="mf-legal-links" role="list" aria-label="Legal links">
                <a href="/privacy-policy" role="listitem">Privacy Policy</a>
                <span aria-hidden="true">·</span>
                <a href="/terms-of-service" role="listitem">Terms</a>
                <span aria-hidden="true">·</span>
                <a href="/compliance-security" role="listitem">Compliance</a>
                <span aria-hidden="true">·</span>
                <a href="/sitemap.xml" role="listitem">Sitemap</a>
              </div>
            </div>
          </div>
        </div>{/* /mf-container */}
      </div>{/* /mf-body */}

      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/917791910007?text=Hi%20Medical365%2C%20I%27d%20like%20to%20book%20a%20free%20demo"
         className="mf-wa-fab" aria-label="Chat on WhatsApp" target="_blank" rel="noopener">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </footer>
  );
}
