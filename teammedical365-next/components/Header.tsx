'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('clinics');
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSolutions = () => setIsSolutionsOpen(!isSolutionsOpen);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSolutionsOpen(false);
  }, []);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsSolutionsOpen(false);
  };

  return (
    <header className={`main-header ${isMenuOpen ? 'nav-active' : ''}`} id="main-header">
      <div className="header-container">
        <Link href="/" className="logo" aria-label="Medical365 Home">
          <img loading="lazy" src="/logo/medical365logo1.png" alt="Medical365" className="logo-img" />
        </Link>

        <button 
          className={`mobile-toggle ${isMenuOpen ? 'active' : ''}`} 
          id="mobile-toggle" 
          aria-expanded={isMenuOpen} 
          aria-label="Toggle navigation menu"
          onClick={toggleMenu}
        >
          <span className="bar top-bar"></span>
          <span className="bar mid-bar"></span>
          <span className="bar bot-bar"></span>
        </button>

        <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`} id="main-nav">
          <div className="mobile-menu-header">
            <img loading="lazy" src="/logo/medical365logo1.png" alt="Medical365" className="logo-img-mobile" />
          </div>

          <div className="nav-body">
            <ul className="nav-links">
              <li><Link href="/" className="nav-item" onClick={closeMenu}>Home</Link></li>
              
              <li className={`has-mega-menu ${isSolutionsOpen ? 'active' : ''}`}>
                <button 
                  className="nav-item solutions-toggle" 
                  aria-expanded={isSolutionsOpen} 
                  aria-controls="mega-menu-content"
                  onClick={toggleSolutions}
                >
                  Solutions 
                  <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                
                <div className={`mega-menu ${isSolutionsOpen ? 'active' : ''}`} id="mega-menu-content">
                  <div className="mega-menu-inner">
                    <div className="mega-sidebar" role="tablist" aria-orientation="vertical">
                      {[
                        { id: 'clinics', label: 'Clinics', icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path> },
                        { id: 'hospitals', label: 'Hospitals', icon: <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect> },
                        { id: 'specialty-care', label: 'Specialty Care', icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path> },
                        { id: 'patients', label: 'Patients & Families', icon: <circle cx="9" cy="7" r="4"></circle> },
                        { id: 'hospital-chain', label: 'Hospital Chain', icon: <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path> },
                        { id: 'hospital-cfo', label: 'Hospital CFO', icon: <rect x="2" y="4" width="20" height="16" rx="2"></rect> },
                        { id: 'hospital-it', label: 'Hospital IT Manager', icon: <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect> },
                        { id: 'marketing-managers', label: 'Marketing Managers', icon: <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path> },
                        { id: 'backoffice-hr', label: 'Backoffice & HR', icon: <circle cx="9" cy="7" r="4"></circle> },
                        { id: 'government', label: 'Government', icon: <path d="M3 21h18"></path> }
                      ].map((item) => (
                        <button 
                          key={item.id}
                          className={`tab-btn ${activeTab === item.id ? 'active' : ''}`} 
                          role="tab" 
                          aria-selected={activeTab === item.id} 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleTabClick(item.id);
                          }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {item.icon}
                            {item.id === 'specialty-care' && <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>}
                            {item.id === 'patients' && <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>}
                            {item.id === 'hospital-chain' && <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>}
                            {item.id === 'hospital-cfo' && <><line x1="7" y1="10" x2="17" y2="10"></line><line x1="7" y1="14" x2="17" y2="14"></line></>}
                            {item.id === 'hospital-it' && <><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></>}
                            {item.id === 'marketing-managers' && <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>}
                            {item.id === 'backoffice-hr' && <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></>}
                            {item.id === 'government' && <><path d="M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3"></path><path d="M19 21v-7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v7"></path></>}
                          </svg>
                          {item.label}
                        </button>
                      ))}
                    </div>

                    <div className="mega-content">
                      {activeTab === 'clinics' && (
                        <div className="tab-pane active" id="clinics" role="tabpanel">
                          <div className="pane-header">
                            <h2 className="tab-title">Clinic Solutions</h2>
                            <p className="tab-desc">Comprehensive tools to streamline your daily clinic operations.</p>
                          </div>
                          <ul className="sub-menu-list two-columns">
                            <li><Link href="/clinics" onClick={closeMenu}><span>Clinics Overview</span></Link></li>
                            <li><Link href="/outpatient" onClick={closeMenu}><span>Outpatient</span></Link></li>
                            <li><Link href="/telemedicine" onClick={closeMenu}><span>Telemedicine</span></Link></li>
                            <li><Link href="/clinical-assessment-forms" onClick={closeMenu}><span>Clinical Assessment Forms</span></Link></li>
                            <li><Link href="/emr" onClick={closeMenu}><span>EMR</span></Link></li>
                            <li><Link href="/queue-token-management" onClick={closeMenu}><span>Queue & Token Management</span></Link></li>
                            <li><Link href="/healthcare-kiosk" onClick={closeMenu}><span>Healthcare Kiosk</span></Link></li>
                            <li><Link href="/communication-management" onClick={closeMenu}><span>Communication Management</span></Link></li>
                            <li><Link href="/speech-to-text" onClick={closeMenu}><span>Speech to Text</span></Link></li>
                            <li><Link href="/medical-camp" onClick={closeMenu}><span>Medical Camp</span></Link></li>
                            <li><Link href="/diabetes-care-management" onClick={closeMenu}><span>Diabetes Care Management</span></Link></li>
                            <li><Link href="/doctor-mobile-app" onClick={closeMenu}><span>Doctor Mobile App</span></Link></li>
                            <li><Link href="/revenue-cycle-management" onClick={closeMenu}><span>Revenue Cycle Management</span></Link></li>
                            <li><Link href="/vaccine-management" onClick={closeMenu}><span>Vaccine Management</span></Link></li>
                          </ul>
                        </div>
                      )}

                      {activeTab === 'hospitals' && (
                        <div className="tab-pane active" id="hospitals" role="tabpanel">
                          <div className="pane-header">
                            <h2 className="tab-title">Hospital Management</h2>
                            <p className="tab-desc">Enterprise-grade solutions for mid to large scale hospitals.</p>
                          </div>
                          <ul className="sub-menu-list three-columns">
                            <li><Link href="/hospitals" onClick={closeMenu}><span>Hospitals Overview</span></Link></li>
                            <li><Link href="/outpatient" onClick={closeMenu}><span>Outpatient</span></Link></li>
                            <li><Link href="/telemedicine" onClick={closeMenu}><span>Telemedicine</span></Link></li>
                            <li><Link href="/queue-token-management" onClick={closeMenu}><span>Queue & Token Management</span></Link></li>
                            <li><Link href="/healthcare-kiosk" onClick={closeMenu}><span>Healthcare Kiosk</span></Link></li>
                            <li><Link href="/emr" onClick={closeMenu}><span>EMR</span></Link></li>
                            <li><Link href="/clinical-assessment-forms" onClick={closeMenu}><span>Clinical Assessment Forms</span></Link></li>
                            <li><Link href="/inpatient" onClick={closeMenu}><span>Inpatient</span></Link></li>
                            <li><Link href="/operation-theater-management" onClick={closeMenu}><span>Operation Theater Management</span></Link></li>
                            <li><Link href="/nursing-management-system" onClick={closeMenu}><span>Nursing Management System</span></Link></li>
                            <li><Link href="/vaccine-management" onClick={closeMenu}><span>Vaccine Management</span></Link></li>
                            <li><Link href="/virtual-opd" onClick={closeMenu}><span>Virtual OPD</span></Link></li>
                            <li><Link href="/revenue-cycle-management" onClick={closeMenu}><span>Revenue Cycle Management</span></Link></li>
                            <li><Link href="/lims" onClick={closeMenu}><span>LIMS</span></Link></li>
                            <li><Link href="/ris-pacs" onClick={closeMenu}><span>RIS & PACS</span></Link></li>
                            <li><Link href="/pharmacy" onClick={closeMenu}><span>Pharmacy</span></Link></li>
                            <li><Link href="/blood-bank" onClick={closeMenu}><span>Blood Bank</span></Link></li>
                            <li><Link href="/communication-management" onClick={closeMenu}><span>Communication Management</span></Link></li>
                            <li><Link href="/speech-to-text" onClick={closeMenu}><span>Speech to Text</span></Link></li>
                            <li><Link href="/medical-camp" onClick={closeMenu}><span>Medical Camp</span></Link></li>
                            <li><Link href="/doctor-mobile-app" onClick={closeMenu}><span>Doctor Mobile App</span></Link></li>
                            <li><Link href="/crm" onClick={closeMenu}><span>CRM</span></Link></li>
                            <li><Link href="/hospital-bed-management" onClick={closeMenu}><span>Bed Management</span></Link></li>
                            <li><Link href="/canteen-management" onClick={closeMenu}><span>Canteen Management</span></Link></li>
                          </ul>
                        </div>
                      )}

                      {activeTab === 'specialty-care' && (
                        <div className="tab-pane active" id="specialty-care" role="tabpanel">
                          <div className="pane-header">
                            <h2 className="tab-title">Specialty Care EHR</h2>
                            <p className="tab-desc">Purpose-built EHR modules and tracking features designed specifically for each clinical specialty.</p>
                          </div>
                          <div className="specialty-scroll-area">
                            <div className="specialty-grid">
                              {[
                                { title: 'Cardiology', links: ['ecg-ekg-integration', 'echocardiography-reports', 'stress-test-management', 'cardiac-risk-scoring', 'angiography-reports', 'pacemaker-tracking', 'lipid-profile-tracking', 'cardiac-history-templates'] },
                                { title: 'Neurology', links: ['eeg-reports', 'mri-ct-integration', 'seizure-tracking', 'cognitive-assessment', 'stroke-management', 'neurological-exam-forms'] },
                                { title: 'Pediatrics', links: ['growth-charts', 'vaccination-tracking', 'pediatric-dosage-calculator', 'developmental-milestones', 'neonatal-records', 'parent-communication'] },
                                { title: 'Orthopedics', links: ['xray-imaging-integration', 'fracture-management', 'joint-mobility-tracking', 'implant-records', 'physiotherapy-notes', 'surgery-planning'] },
                                { title: 'Ophthalmology', links: ['vision-refraction-charts', 'retina-imaging-integration', 'eye-pressure-tracking', 'optical-prescription-mgt', 'lasik-surgery-records'] },
                                { title: 'Dental', links: ['dental-tooth-chart', 'dental-imaging', 'dental-treatment-planning', 'dental-procedure-history', 'dental-insurance-billing'] },
                                { title: 'Dermatology', links: ['skin-image-tracking', 'dermatology-photos', 'dermatology-treatment-plans', 'cosmetic-procedure-records', 'allergy-tracking'] },
                                { title: 'Oncology', links: ['cancer-staging', 'chemotherapy-plans', 'radiation-therapy-records', 'tumor-tracking', 'oncology-reports', 'clinical-trial-management'] },
                                { title: 'Gynecology', links: ['pregnancy-tracking', 'antenatal-care-records', 'ultrasound-reports', 'delivery-records', 'fertility-treatment-tracking'] },
                                { title: 'Psychiatry', links: ['mental-health-assessments', 'therapy-session-notes', 'medication-tracking', 'behavioral-history', 'confidential-records'] },
                                { title: 'General Practice', links: ['patient-history', 'diagnosis-treatment', 'e-prescriptions', 'lab-integration', 'billing-reports'] },
                                { title: 'Core Platform', links: ['patient-registration', 'emr-ehr-system', 'billing-invoicing', 'notifications-system', 'cloud-security'] }
                              ].map((cat) => (
                                <div key={cat.title} className="mega-category">
                                  <Link href={`/${cat.links[0]}`} className="category-title" onClick={closeMenu}>{cat.title} <span>→</span></Link>
                                  <ul className="category-links">
                                    {cat.links.map(link => (
                                      <li key={link}><Link href={`/${link}`} onClick={closeMenu}>{link.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Link></li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Other tabs logic... */}
                      {activeTab === 'patients' && (
                        <div className="tab-pane active" id="patients" role="tabpanel">
                          <div className="pane-header"><h2 className="tab-title">Patients and their Families</h2></div>
                          <ul className="sub-menu-list">
                            <li><Link href="/online-scheduling" onClick={closeMenu}><span>Online Scheduling</span></Link></li>
                            <li><Link href="/healthcare-kiosk" onClick={closeMenu}><span>Healthcare Kiosk</span></Link></li>
                            <li><Link href="/communication-management" onClick={closeMenu}><span>Communication Management</span></Link></li>
                            <li><Link href="/patient-mobile-app" onClick={closeMenu}><span>Patient Mobile App</span></Link></li>
                            <li><Link href="/patient-portal" onClick={closeMenu}><span>Patient Portal</span></Link></li>
                            <li><Link href="/diabetes-patient-care" onClick={closeMenu}><span>Diabetes Patient Care</span></Link></li>
                          </ul>
                        </div>
                      )}

                      {activeTab === 'hospital-chain' && (
                        <div className="tab-pane active" id="hospital-chain" role="tabpanel">
                          <div className="pane-header"><h2 className="tab-title">Hospital Chain Management</h2></div>
                          <ul className="sub-menu-list">
                            <li><Link href="/centralised-management" onClick={closeMenu}><span>Centralised Management</span></Link></li>
                            <li><Link href="/multi-facility-sync" onClick={closeMenu}><span>Multi-Facility Sync</span></Link></li>
                            <li><Link href="/unified-reporting" onClick={closeMenu}><span>Unified Reporting</span></Link></li>
                          </ul>
                        </div>
                      )}

                      {activeTab === 'hospital-cfo' && (
                        <div className="tab-pane active" id="hospital-cfo" role="tabpanel">
                          <div className="pane-header"><h2 className="tab-title">Hospital CFO</h2></div>
                          <ul className="sub-menu-list two-columns">
                            <li><Link href="/revenue-cycle-management" onClick={closeMenu}><span>Revenue Cycle Management</span></Link></li>
                            <li><Link href="/accounts-payable" onClick={closeMenu}><span>Accounts Payable</span></Link></li>
                            <li><Link href="/accounts-receivable" onClick={closeMenu}><span>Accounts Receivable</span></Link></li>
                            <li><Link href="/ledger" onClick={closeMenu}><span>Ledger</span></Link></li>
                            <li><Link href="/banking-payment-gateway" onClick={closeMenu}><span>Banking & Payment Gateway</span></Link></li>
                            <li><Link href="/financial-reporting" onClick={closeMenu}><span>Financial Reporting & Dashboards</span></Link></li>
                          </ul>
                        </div>
                      )}

                      {activeTab === 'hospital-it' && (
                        <div className="tab-pane active" id="hospital-it" role="tabpanel">
                          <div className="pane-header"><h2 className="tab-title">Hospital IT Manager</h2></div>
                          <ul className="sub-menu-list two-columns">
                            <li><Link href="/cloud-solution" onClick={closeMenu}><span>Cloud Solution & Migration</span></Link></li>
                            <li><Link href="/implementation" onClick={closeMenu}><span>Implementation</span></Link></li>
                            <li><Link href="/data-migration" onClick={closeMenu}><span>Data Migration, Backup & Recovery</span></Link></li>
                            <li><Link href="/configurations" onClick={closeMenu}><span>Configurations & Customisation</span></Link></li>
                            <li><Link href="/data-security" onClick={closeMenu}><span>Data Security & Compliance</span></Link></li>
                            <li><Link href="/geofencing" onClick={closeMenu}><span>Geofencing</span></Link></li>
                            <li><Link href="/service-requests" onClick={closeMenu}><span>Service Requests</span></Link></li>
                            <li><Link href="/on-prem-solution" onClick={closeMenu}><span>On-prem Solution</span></Link></li>
                            <li><Link href="/rpa" onClick={closeMenu}><span>Robotic Process Automation</span></Link></li>
                            <li><Link href="/digital-marketing" onClick={closeMenu}><span>Digital Marketing Services</span></Link></li>
                            <li><Link href="/health-hire" onClick={closeMenu}><span>Health Hire</span></Link></li>
                            <li><Link href="/free-webpage" onClick={closeMenu}><span>Ezovion Free Webpage</span></Link></li>
                            <li><Link href="/offline-data-entry" onClick={closeMenu}><span>Offline Data Entry</span></Link></li>
                            <li><Link href="/templates" onClick={closeMenu}><span>Templates</span></Link></li>
                            <li><Link href="/compliance-security" onClick={closeMenu}><span>Compliance</span></Link></li>
                            <li><Link href="/fhir-hl7" onClick={closeMenu}><span>FHIR HL7 Compliant</span></Link></li>
                            <li><Link href="/multilingual-hims" onClick={closeMenu}><span>Multilingual HIMS</span></Link></li>
                          </ul>
                        </div>
                      )}

                      {activeTab === 'marketing-managers' && (
                        <div className="tab-pane active" id="marketing-managers" role="tabpanel">
                          <div className="pane-header"><h2 className="tab-title">Marketing Managers</h2></div>
                          <ul className="sub-menu-list two-columns">
                            <li><Link href="/patient-demographics" onClick={closeMenu}><span>Patient Demographics & Insights</span></Link></li>
                            <li><Link href="/appointment-trends" onClick={closeMenu}><span>Appointment Trends & Analysis</span></Link></li>
                            <li><Link href="/referral-management" onClick={closeMenu}><span>Referral Management</span></Link></li>
                            <li><Link href="/feedback-surveys" onClick={closeMenu}><span>Feedback & Satisfaction Surveys</span></Link></li>
                            <li><Link href="/royalty-program" onClick={closeMenu}><span>Royalty Program</span></Link></li>
                            <li><Link href="/direct-communication" onClick={closeMenu}><span>Direct Communication Channels</span></Link></li>
                            <li><Link href="/campaign-performance" onClick={closeMenu}><span>Campaign Performance Tracking</span></Link></li>
                            <li><Link href="/crm" onClick={closeMenu}><span>CRM</span></Link></li>
                            <li><Link href="/digital-marketing" onClick={closeMenu}><span>Digital Marketing Services</span></Link></li>
                          </ul>
                        </div>
                      )}

                      {activeTab === 'backoffice-hr' && (
                        <div className="tab-pane active" id="backoffice-hr" role="tabpanel">
                          <div className="pane-header"><h2 className="tab-title">Backoffice & HR Managers</h2></div>
                          <ul className="sub-menu-list two-columns">
                            <li><Link href="/finance-accounting" onClick={closeMenu}><span>Finance and Accounting</span></Link></li>
                            <li><Link href="/hrms" onClick={closeMenu}><span>Human Resources (HRMS)</span></Link></li>
                            <li><Link href="/patient-relations" onClick={closeMenu}><span>Marketing and Patient Relations</span></Link></li>
                            <li><Link href="/supply-chain" onClick={closeMenu}><span>Supply Chain Management</span></Link></li>
                            <li><Link href="/asset-management" onClick={closeMenu}><span>Asset Management</span></Link></li>
                            <li><Link href="/revenue-cycle-management" onClick={closeMenu}><span>Revenue Cycle Management</span></Link></li>
                            <li><Link href="/supplier-management" onClick={closeMenu}><span>Supplier Management</span></Link></li>
                            <li><Link href="/inventory-assets" onClick={closeMenu}><span>Inventory & Assets</span></Link></li>
                            <li><Link href="/crm" onClick={closeMenu}><span>CRM</span></Link></li>
                            <li><Link href="/hospital-bed-management" onClick={closeMenu}><span>Bed Management Software</span></Link></li>
                          </ul>
                        </div>
                      )}

                      {activeTab === 'government' && (
                        <div className="tab-pane active" id="government" role="tabpanel">
                          <div className="pane-header"><h2 className="tab-title">Government</h2></div>
                          <ul className="sub-menu-list two-columns">
                            <li><Link href="/population-health" onClick={closeMenu}><span>Integrated Population Health</span></Link></li>
                            <li><Link href="/government-ops" onClick={closeMenu}><span>Multi-Facility Operations</span></Link></li>
                            <li><Link href="/resource-management" onClick={closeMenu}><span>Resource Management</span></Link></li>
                            <li><Link href="/health-surveillance" onClick={closeMenu}><span>Real-Time Health Surveillance</span></Link></li>
                            <li><Link href="/financial-management" onClick={closeMenu}><span>Financial Management</span></Link></li>
                            <li><Link href="/abha" onClick={closeMenu}><span>Compliance with ABHA</span></Link></li>
                            <li><Link href="/pm-yojana" onClick={closeMenu}><span>Pradhan Mantri Yojana Support</span></Link></li>
                            <li><Link href="/reporting-analytics" onClick={closeMenu}><span>Reporting and Analytics</span></Link></li>
                            <li><Link href="/vaccine-management" onClick={closeMenu}><span>Vaccine Management</span></Link></li>
                          </ul>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              </li>

              <li><Link href="/about" className="nav-item" onClick={closeMenu}>About Us</Link></li>
              <li><Link href="/blogs" className="nav-item" onClick={closeMenu}>Insights & Blogs</Link></li>
            </ul>
          </div>

          <div className="mobile-cta-wrapper">
            <Link href="/book-demo" className="btn-primary" onClick={closeMenu}>Book a Free Demo</Link>
          </div>
        </nav>

        <div className="header-cta">
          <Link href="/book-demo" className="btn-primary">Book Demo</Link>
        </div>
      </div>
      {isMenuOpen && <div className="mobile-overlay" style={{ display: 'block' }} onClick={toggleMenu}></div>}
    </header>
  );
}
