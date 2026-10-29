import React from 'react';
import Link from 'next/link';

interface CompetitorItem {
  name: string;
  slug: string;
  category: string;
  short_description: string;
}

const competitors: CompetitorItem[] = [
  {
    name: 'Appointo',
    slug: 'appointo',
    category: 'Appointment Scheduling Plugin',
    short_description: "Compare our unified AI hospital management system against Appointo's appointment booking widget to see how full-stack clinical workflows elevate care."
  },
  {
    name: 'KiviHealth',
    slug: 'kivihealth',
    category: 'Clinic & E-Prescription Management',
    short_description: "Compare our unified AI hospital management system against KiviHealth's clinic tools to unlock autonomous clinical documentation and multi-branch telemetry."
  },
  {
    name: 'Practo Ray',
    slug: 'practo-ray',
    category: 'Practice Management & Marketplace',
    short_description: "Compare our unified AI hospital management system against Practo Ray's legacy portal to reclaim your hospital's patient brand equity and private EHR."
  },
  {
    name: 'Clinicea',
    slug: 'clinicea',
    category: 'Clinic & EMR Software',
    short_description: "Compare our unified AI hospital management system against Clinicea's multi-module platform for faster zero-lag charting and unified enterprise billing."
  },
  {
    name: 'Sparta HMS',
    slug: 'sparta-hms',
    category: 'Legacy On-Premise HMS',
    short_description: "Compare our unified AI hospital management system against Sparta HMS's on-premise architecture for modern cloud elasticity and zero server maintenance."
  },
  {
    name: 'DocEngage',
    slug: 'docengage',
    category: 'Healthcare CRM & Clinic Management',
    short_description: "Compare our unified AI hospital management system against DocEngage's marketing-focused software to harmonize deep clinical EHR with revenue cycle automation."
  },
  {
    name: 'HealthPlix',
    slug: 'healthplix',
    category: 'Doctor EMR & Digital Prescription',
    short_description: "Compare our unified AI hospital management system against HealthPlix's outpatient prescription pad to integrate IPD, ICU, pharmacy, and laboratory in one platform."
  },
  {
    name: 'SoftClinic GenX',
    slug: 'softclinic-genx',
    category: 'Hospital Information Management System',
    short_description: "Compare our unified AI hospital management system against SoftClinic GenX's complex legacy menus for a modern, frictionless clinical experience."
  },
  {
    name: 'MyOPD',
    slug: 'myopd',
    category: 'Desktop Offline Clinic Software',
    short_description: "Compare our unified AI hospital management system against MyOPD's desktop-bound offline software for accessible multi-device cloud operations."
  },
  {
    name: 'WATI',
    slug: 'wati',
    category: 'WhatsApp Business API Tool',
    short_description: "Compare our unified AI hospital management system against WATI's generic messaging tool to get deep, HIPAA/ABHA-compliant medical workflows natively embedded."
  },
  {
    name: 'MocDoc',
    slug: 'mocdoc',
    category: 'HMS & LIMS Software',
    short_description: "Compare our unified AI hospital management system against MocDoc's suite for intelligent automated pre-authorizations and faster bedside workflows."
  },
  {
    name: 'Eka Care',
    slug: 'eka-care',
    category: 'EMR & Personal Health Records',
    short_description: "Compare our unified AI hospital management system against Eka Care's practitioner tools for enterprise-grade IPD, OT management, and NABH-ready analytics."
  },
  {
    name: 'DocPulse',
    slug: 'docpulse',
    category: 'Clinic & Hospital Queue Management',
    short_description: "Compare our unified AI hospital management system against DocPulse's clinic queuing tools for integrated PACS imaging and intelligent clinical decision support."
  },
  {
    name: 'Docterz',
    slug: 'docterz',
    category: 'Pediatric & Specialty Clinic App',
    short_description: "Compare our unified AI hospital management system against Docterz's pediatric/clinic app to expand into multi-specialty hospital management."
  },
  {
    name: 'Lybrate',
    slug: 'lybrate',
    category: 'Consultation Portal & Clinic Software',
    short_description: "Compare our unified AI hospital management system against Lybrate's marketplace model to retain patient loyalty and eliminate commission fees."
  },
  {
    name: 'DocOn',
    slug: 'docon',
    category: 'Tablet EMR & Prescription Software',
    short_description: "Compare our unified AI hospital management system against DocOn's OPD-focused tablet software to connect all clinical, surgical, and nursing operations."
  },
  {
    name: 'Genamet',
    slug: 'genamet',
    category: 'Cloud Practice Management System',
    short_description: "Compare our unified AI hospital management system against Genamet's practice management platform for voice-driven charting and predictive bed occupancy."
  },
  {
    name: 'Adrine',
    slug: 'adrine',
    category: 'Hospital Information Management System',
    short_description: "Compare our unified AI hospital management system against Adrine's complex interface to achieve rapid staff onboarding and automated cloud sync."
  },
  {
    name: 'Marg ERP',
    slug: 'marg-erp',
    category: 'Pharma Inventory & Accounting Software',
    short_description: "Compare our unified AI hospital management system against Marg ERP's accounting software to give doctors and clinicians purpose-built medical tools."
  },
  {
    name: 'eHospital Systems',
    slug: 'ehospital-systems',
    category: 'Legacy Enterprise HMS Suite',
    short_description: "Compare our unified AI hospital management system against eHospital Systems' cumbersome deployment to launch a cloud-native hospital in hours."
  },
  {
    name: 'Open Dental',
    slug: 'open-dental',
    category: 'On-Premise Dental Software',
    short_description: "Compare our unified AI hospital management system against Open Dental's on-premise dental tool for multi-specialty cloud expansion and zero backup headaches."
  }
];

export default function ComparisonGrid() {
  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {competitors.map((item) => (
          <Link
            key={item.slug}
            href={`/compare/medical365-vs-${item.slug}`}
            className="group flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-cyan-500/50 hover:-translate-y-1 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-cyan-50 group-hover:text-cyan-700 transition-colors">
                  {item.category}
                </span>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  AI-Ready
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-600 transition-colors duration-200 mb-2 leading-snug">
                Medical365 vs {item.name}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                {item.short_description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-cyan-600 group-hover:text-cyan-700 flex items-center gap-1.5 transition-colors">
                View Comparison
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Detailed Guide
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

