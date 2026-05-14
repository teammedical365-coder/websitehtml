import React from 'react';

export const metadata = {
  title: 'Terms of Service | Medical365 - User Agreement & Software Licensing',
  description: 'Terms and conditions for using Medical365 healthcare management software. Review your rights and responsibilities as a healthcare facility user.',
};

export default function TermsOfServicePage() {
  return (
    <main className="legal-page py-24 min-h-screen">
      <div className="container max-w-4xl">
        <div className="text-center mb-16 reveal">
          <div className="badge mb-4">Terms and Conditions</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight tracking-tight">Terms of Service</h1>
          <p className="opacity-60 text-lg">Last Updated: April 2026</p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none reveal" style={{ animationDelay: '0.1s' }}>
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary border-b border-white/10 pb-2">1. Agreement to Terms</h2>
            <p className="opacity-80 leading-relaxed mb-6">
              By accessing and using Medical365's software solutions and platform (the "Software"), you agree to be bound by these Terms of Service. If you are using the Software on behalf of a healthcare facility, organization, or employer, you represent that you have the authority to bind that entity to these Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary border-b border-white/10 pb-2">2. Software License & Access</h2>
            <p className="opacity-80 leading-relaxed mb-6">
              We grant you a non-exclusive, non-transferable, revocable license to access and use our SaaS (Software as a Service) platform for legitimate healthcare administrative and clinical purposes. You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-4 opacity-80 mb-6">
              <li>Reverse engineer, decompile, or attempt to extract the source code of our platform.</li>
              <li>Use the software to conduct any illegal activities or store unlawful data.</li>
              <li>Share administrative login credentials with unauthorized third parties.</li>
              <li>Attempt to bypass security measures or conduct unauthorized penetration testing.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary border-b border-white/10 pb-2">3. Subscription, Billing & Payments</h2>
            <p className="opacity-80 leading-relaxed mb-6">
              Medical365 operates on a subscription-based model. Billing is conducted monthly or annually as per your signed service level agreement (SLA).
            </p>
            <ul className="list-disc pl-6 space-y-4 opacity-80 mb-6">
              <li>Fees are non-refundable except as specified in your individual contract.</li>
              <li>Automatic renewal applies unless cancelled 30 days prior to the expiration date.</li>
              <li>Excessive usage (e.g., massive data API calls) may incur additional charges.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary border-b border-white/10 pb-2">4. Clinical & Patient Data Ownership</h2>
            <p className="opacity-80 leading-relaxed mb-6">
              <strong>Your Data, Your Ownership:</strong> All clinical records, patient information, and financial data uploaded to the system remain the property of the respective healthcare facility or patient. Medical365 acts solely as a "Data Processor" as defined under data privacy laws.
              We do not sell, rent, or trade patient data to third parties for any purpose.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary border-b border-white/10 pb-2">5. Service Availability & Support</h2>
            <p className="opacity-80 leading-relaxed mb-6">
              We aim for 99.9% uptime for our cloud-based services. Scheduled maintenance occurs during off-peak hours (IST) with at least 48 hours of advance notice given to administrators.
              Standard support is provided Monday through Saturday, 9:00 AM – 6:00 PM IST.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary border-b border-white/10 pb-2">6. Limitation of Liability</h2>
            <p className="opacity-80 leading-relaxed mb-6">
              Medical365 is a clinical decision-support tool, not a substitute for professional medical judgment. We are not liable for any clinical errors resulting from incorrect data entry by practitioners or the improper use of the software.
            </p>
          </section>

          <section className="mb-12 p-8 bg-white/5 rounded-3xl border border-white/10 text-center">
            <h2 className="text-xl font-bold mb-4">Request a full legal copy?</h2>
            <p className="opacity-60 mb-6 font-secondary">For the formal signed Master Service Agreement (MSA), please contact our legal team.</p>
            <a href="mailto:legal@medical365.in" className="text-primary font-bold hover:underline font-secondary">legal@medical365.in</a>
          </section>
        </div>
      </div>
    </main>
  );
}
