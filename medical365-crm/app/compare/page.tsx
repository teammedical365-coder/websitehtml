import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import ComparisonGrid from '@/components/ComparisonGrid';
import { ShieldCheck, Sparkles, Zap, ArrowRight, HeartPulse } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Medical365 vs Competitors | 2026 Hospital & Clinic Software Comparison Hub',
  description:
    'Compare Medical365 against 21 leading hospital and clinic management software platforms. Discover why healthcare organizations choose our unified AI cloud hospital OS.',
  openGraph: {
    title: 'Medical365 vs Competitors | Hospital Management System Comparisons',
    description:
      'In-depth feature, pricing, and clinical workflow comparisons between Medical365 and 21 healthcare platforms.',
    type: 'website',
  },
};

export default function CompareHubPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-gradient-to-tr from-cyan-600 to-blue-600 text-white p-2 rounded-xl shadow-md group-hover:shadow-cyan-500/20 transition-all">
              <HeartPulse className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-lg tracking-tight">Medical 365</span>
              <span className="text-[10px] block font-semibold text-cyan-600 uppercase tracking-widest -mt-1">Cloud Hospital OS</span>
            </div>
          </Link>

          <nav className="flex items-center gap-4 sm:gap-6 text-sm font-semibold">
            <Link href="/" className="text-slate-600 hover:text-cyan-600 transition-colors hidden sm:inline-block">
              Home
            </Link>
            <Link href="/pipeline" className="text-slate-600 hover:text-cyan-600 transition-colors hidden sm:inline-block">
              CRM & Pipeline
            </Link>
            <Link
              href="#comparisons"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium shadow-md shadow-cyan-600/20 hover:shadow-cyan-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Explore 21 Comparisons
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-white via-cyan-50/20 to-slate-50 border-b border-slate-200/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100/70 text-cyan-800 text-xs sm:text-sm font-semibold mb-6 border border-cyan-200/60 shadow-xs">
            <Sparkles className="w-4 h-4 text-cyan-600" />
            <span>2026 Benchmark Matrix & Architecture Guide</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Medical365 vs The Healthcare Software Market
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            See how our unified AI-powered cloud hospital management system stacks up against 21 legacy HMS, clinic EMR, and standalone healthcare tools.
          </p>

          {/* Key Value Props */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyan-50 text-cyan-600 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">AI Clinical Scribing</h4>
                <p className="text-xs text-slate-500 mt-1">Autonomous voice-to-text charts save clinicians 2+ hours daily.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Zero Server Setup</h4>
                <p className="text-xs text-slate-500 mt-1">Deploy modern high-speed cloud infrastructure in under 48 hours.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">ABHA & NABH Ready</h4>
                <p className="text-xs text-slate-500 mt-1">Certified M1/M2/M3 compliance with automated audit reporting.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Grid Section */}
      <main id="comparisons" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest">Platform Index</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Select a Comparison
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Browse our side-by-side technical breakdowns across 21 healthcare solutions.
              </p>
            </div>
            <div className="text-xs font-medium text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 inline-flex items-center gap-1.5 self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              21 Comprehensive Evaluations Updated
            </div>
          </div>
        </div>

        <ComparisonGrid />
      </main>

      {/* Migration FAQ Section */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Frequently Asked Migration Questions
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              Everything you need to know about switching your hospital or clinic to Medical365.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h3 className="font-bold text-slate-900 text-base mb-2">
                How difficult is it to migrate our existing clinical data?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Medical365 includes proprietary automated ingestion pipelines for all 21 platforms listed above. We extract your patient demographics, visit histories, billing masters, and pharmacy inventory with zero clinical downtime.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h3 className="font-bold text-slate-900 text-base mb-2">
                Do we need dedicated on-premise servers?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                No. Medical365 is 100% cloud-native, hosted on enterprise-grade healthcare infrastructure with automatic backups, geo-redundancy, and 99.99% uptime SLA.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h3 className="font-bold text-slate-900 text-base mb-2">
                Can Medical365 integrate with our existing diagnostic machines?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Yes. Our bidirectional laboratory interface connects to standard HL7/ASTM hematology and biochemistry analyzers, and our PACS viewer directly renders DICOM imaging studies.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h3 className="font-bold text-slate-900 text-base mb-2">
                What support and training does Medical365 provide?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every hospital receives a dedicated implementation manager, onsite or virtual clinical workflow training, 24/7 priority support, and continuous staff refresher courses.
              </p>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 text-white shadow-xl relative overflow-hidden text-center sm:text-left sm:flex sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold tracking-tight">
                Ready to Upgrade Your Hospital Operations?
              </h3>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                Book a confidential 30-minute architecture consultation and see how Medical365 eliminates manual busywork for your doctors and administrators.
              </p>
            </div>
            <div className="mt-6 sm:mt-0 shrink-0">
              <Link
                href="/appointments"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-lg hover:shadow-cyan-500/25"
              >
                Schedule Live Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Medical365 Healthcare Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/compare" className="text-cyan-400 font-semibold">Comparisons</Link>
            <Link href="/appointments" className="hover:text-white transition-colors">Book Demo</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

