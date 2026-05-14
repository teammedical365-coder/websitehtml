import React from 'react';

export const metadata = {
  title: 'Privacy Policy | Medical365 - Data Protection & HIPAA Compliance',
  description: 'Our commitment to protecting your clinical and personal data. Learn about how Medical365 ensures security and compliance across all platforms.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page py-24 min-h-screen">
      <div className="container max-w-4xl">
        <div className="text-center mb-16 reveal">
          <div className="badge mb-4">Security First</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Privacy Policy</h1>
          <p className="opacity-60 text-lg">Last Updated: April 2026</p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none reveal" style={{ animationDelay: '0.1s' }}>
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary border-b border-white/10 pb-2">1. Our Commitment to Privacy</h2>
            <p className="opacity-80 leading-relaxed mb-6">
              Medical365 ("Company", "we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard personal and sensitive clinical information when you use our healthcare management software, website, and mobile applications (collectively, the "Services").
              We strictly adhere to global healthcare data standards including GDPR, HIPAA, and the Digital Personal Data Protection Act (DPDP) 2023.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary border-b border-white/10 pb-2">2. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-4 opacity-80">
              <li><strong>Clinical Data:</strong> Patient health records, treatment history, and diagnostic reports uploaded by authorized healthcare providers.</li>
              <li><strong>Professional Data:</strong> Practitioner names, license numbers, specialty details, and contact information.</li>
              <li><strong>Administrative Data:</strong> Billing information, facility details, and staff login credentials.</li>
              <li><strong>Usage Data:</strong> Log data, device information, and interaction patterns within the platform.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary border-b border-white/10 pb-2">3. Data Security Measures</h2>
            <p className="opacity-80 leading-relaxed mb-6">
              Security is at the core of Medical365. We employ enterprise-grade security protocols, including:
            </p>
            <ul className="list-disc pl-6 space-y-4 opacity-80">
              <li>End-to-end 256-bit AES encryption for data at rest and in transit.</li>
              <li>Role-based access control (RBAC) to ensure only authorized personnel can view sensitive records.</li>
              <li>Zero-trust architecture and regular 24/7 security auditing.</li>
              <li>Automatic session timeouts and two-factor authentication (2FA).</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary border-b border-white/10 pb-2">4. Your Rights</h2>
            <p className="opacity-80 leading-relaxed mb-6">
              Under the DPDP Act 2023 and other regional regulations, users and data subjects have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-4 opacity-80">
              <li>Access and review their personal data being processed.</li>
              <li>Request correction of inaccurate or incomplete information.</li>
              <li>Withdraw consent for the processing of non-essential data.</li>
              <li>Request deletion of data (subject to statutory healthcare record retention requirements).</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary border-b border-white/10 pb-2">5. Compliance & Regulatory Standards</h2>
            <p className="opacity-80 leading-relaxed mb-6">
              We are an ABDM (Ayushman Bharat Digital Mission) compliant entity. All patient data generated is stored in secure, locally-hosted Indian servers as per the guidelines of the Ministry of Health and Family Welfare (MoHFW).
            </p>
          </section>

          <section className="mb-12 p-8 bg-white/5 rounded-3xl border border-white/10 text-center">
            <h2 className="text-xl font-bold mb-4">Questions about your privacy?</h2>
            <p className="opacity-60 mb-6">Our Data Protection Officer (DPO) is available to address any concerns.</p>
            <a href="mailto:privacy@medical365.in" className="text-primary font-bold hover:underline font-secondary">privacy@medical365.in</a>
          </section>
        </div>
      </div>
    </main>
  );
}
