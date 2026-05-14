'use client';

import React, { useState, useMemo } from 'react';
import BlogCard from './BlogCard';

const CATEGORIES = [
  { name: 'All', icon: '', color: '#1D5A9F' },
  { name: 'Clinical Operations', icon: '🩺', color: '#DC2626' },
  { name: 'Finance & Revenue', icon: '💰', color: '#059669' },
  { name: 'Government & Public Health', icon: '🏛️', color: '#6D28D9' },
  { name: 'HR & Administration', icon: '👥', color: '#EA580C' },
  { name: 'Hospital Management', icon: '🏥', color: '#1D5A9F' },
  { name: 'IT & Infrastructure', icon: '☁️', color: '#0891B2' },
  { name: 'Patient Experience', icon: '👤', color: '#7C3AED' },
];

const LOCATIONS = [
  'Ajmer', 'Alwar', 'Bapu Nagar', 'Bharatpur', 'Bhilwara', 'Bikaner', 'C-Scheme', 
  'Jagatpura', 'Jaipur', 'Jhotwara', 'Jodhpur', 'Kota', 'Malviya Nagar', 
  'Mansarovar', 'Pali', 'Raja Park', 'Rajasthan', 'Sikar', 'Sri Ganganagar', 
  'Tonk Road', 'Udaipur', 'Vaishali Nagar', 'Vidyadhar Nagar'
];

interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  location: string;
  readTime: string;
  icon: string;
  slug: string;
  tags?: string[];
}

const ALL_POSTS: BlogPost[] = [
  {
    title: "Best Hospital Management Software in Rajasthan",
    excerpt: "Discover why 500+ healthcare facilities across Rajasthan trust Medical365 for end-to-end HMS — ABDM compliant, cloud-ready, and built for Indian workflows.",
    category: "Hospital Management",
    location: "Rajasthan",
    readTime: "5 min read",
    icon: "🏥",
    slug: "best-hospital-management-software-rajasthan"
  },
  {
    title: "Clinic Management System in Jaipur",
    excerpt: "Streamline every patient visit in your Jaipur clinic — OPD scheduling, digital records, GST billing, and ABDM compliance in one platform.",
    category: "Hospital Management",
    location: "Jaipur",
    readTime: "4 min read",
    icon: "🏨",
    slug: "clinic-management-system-jaipur"
  },
  {
    title: "Outpatient Software Solutions in Jodhpur",
    excerpt: "Reduce OPD wait times by 60% with Medical365's smart queue, digital records, and multi-doctor scheduling — built for busy Jodhpur hospitals.",
    category: "Hospital Management",
    location: "Jodhpur",
    readTime: "4 min read",
    icon: "🚪",
    slug: "outpatient-software-solutions-jodhpur"
  },
  {
    title: "Inpatient Management Software in Udaipur",
    excerpt: "Full IPD control for Udaipur hospitals — bed management, nursing notes, ward rounds, discharge summaries, and TPA billing unified.",
    category: "Hospital Management",
    location: "Udaipur",
    readTime: "5 min read",
    icon: "🛏️",
    slug: "inpatient-management-software-udaipur"
  },
  {
    title: "Telemedicine Platform for Clinics in Mansarovar",
    excerpt: "Launch telemedicine for your Mansarovar clinic in 48 hours — HD video consults, e-prescriptions, and ABDM-compliant records with Medical365.",
    category: "Hospital Management",
    location: "Mansarovar",
    readTime: "4 min read",
    icon: "📹",
    slug: "telemedicine-platform-clinics-mansarovar"
  },
  {
    title: "Hospital Queue & Token Management in Vaishali Nagar",
    excerpt: "End the OPD chaos with digital tokens, real-time queue boards, and online slot booking for hospitals in Vaishali Nagar, Jaipur.",
    category: "Hospital Management",
    location: "Vaishali Nagar",
    readTime: "3 min read",
    icon: "🎫",
    slug: "hospital-queue-token-management-vaishali-nagar"
  },
  {
    title: "Healthcare Kiosk Providers in Kota",
    excerpt: "Self-service patient kiosks for Kota hospitals — check-in, token printing, bill payment, and lab reports without queuing at reception.",
    category: "Hospital Management",
    location: "Kota",
    readTime: "4 min read",
    icon: "🖥️",
    slug: "healthcare-kiosk-providers-kota"
  },
  {
    title: "Virtual OPD Software in Ajmer",
    excerpt: "Run a complete virtual outpatient clinic in Ajmer — online scheduling, video consultations, digital prescriptions, and automated follow-ups.",
    category: "Hospital Management",
    location: "Ajmer",
    readTime: "4 min read",
    icon: "💻",
    slug: "virtual-opd-software-ajmer"
  },
  {
    title: "Medical Camp Management Software in Bhilwara",
    excerpt: "Organise paperless medical camps in Bhilwara — bulk registration, ABHA ID creation, government reporting, and offline-first operation.",
    category: "Hospital Management",
    location: "Bhilwara",
    readTime: "4 min read",
    icon: "⛺",
    slug: "medical-camp-management-software-bhilwara"
  },
  {
    title: "EMR Software for Hospitals in Bikaner",
    excerpt: "Go digital with SOAP-format EMR, speech-to-text dictation, EHR Standards of India compliance, and offline sync — purpose-built for Bikaner hospitals.",
    category: "Clinical Operations",
    location: "Bikaner",
    readTime: "5 min read",
    icon: "🩺",
    slug: "emr-software-hospitals-bikaner"
  },
  {
    title: "LIMS — Laboratory Information Management in Jaipur",
    excerpt: "Automate lab orders, result entry, TAT tracking, and NABL compliance for diagnostic labs and hospitals in Jaipur with Medical365 LIMS.",
    category: "Clinical Operations",
    location: "Jaipur",
    readTime: "5 min read",
    icon: "🧪",
    slug: "lims-laboratory-information-management-jaipur"
  },
  {
    title: "Hospital Revenue Cycle Management in Rajasthan",
    excerpt: "Stop revenue leakage — Medical365 RCM automates billing, TPA claims, GST invoicing, and revenue analytics for Rajasthan hospitals.",
    category: "Finance & Revenue",
    location: "Rajasthan",
    readTime: "5 min read",
    icon: "💰",
    slug: "hospital-revenue-cycle-management-rajasthan"
  },
  {
    title: "Hospital HRMS in Jaipur",
    excerpt: "Manage every staff member with precision — payroll, attendance, leave, credential tracking, and performance appraisals for Jaipur hospitals.",
    category: "HR & Administration",
    location: "Jaipur",
    readTime: "5 min read",
    icon: "👥",
    slug: "hospital-hrms-jaipur"
  }
];

export default function BlogList() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('');

  const filteredPosts = useMemo(() => {
    return ALL_POSTS.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesLocation = selectedLocation === '' || post.location === selectedLocation;
      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [search, selectedCategory, selectedLocation]);

  const getCategoryColor = (catName: string) => {
    return CATEGORIES.find(c => c.name === catName)?.color || '#1D5A9F';
  };

  return (
    <>
      <div id="controls">
        <div className="controls-inner">
          <div className="search-row">
            <div className="search-wrap">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input 
                type="search" 
                id="search-input" 
                placeholder="Search guides, features, locations…" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select 
              className="loc-select" 
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
            <span className="results-count">{filteredPosts.length} resources found</span>
          </div>
          
          <div className="filter-scroll">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.name}
                className={`filter-btn ${selectedCategory === cat.name ? 'active' : ''}`}
                style={cat.color ? { '--cat-c': cat.color } as React.CSSProperties : {}}
                onClick={() => setSelectedCategory(cat.name)}
              >
                {cat.icon} {cat.name}
                <span className="count-badge">
                  {cat.name === 'All' ? ALL_POSTS.length : ALL_POSTS.filter(p => p.category === cat.name).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <main id="main">
        {filteredPosts.length > 0 ? (
          <div className="posts-grid">
            {filteredPosts.map((post, i) => (
              <BlogCard 
                key={i}
                {...post}
                color={getCategoryColor(post.category)}
              />
            ))}
          </div>
        ) : (
          <div id="no-results" style={{ display: 'block' }}>
            <div className="nr-icon">🔍</div>
            <h3>No guides found</h3>
            <p>Try adjusting your search or filters to find what you&apos;re looking for.</p>
          </div>
        )}
      </main>
    </>
  );
}
