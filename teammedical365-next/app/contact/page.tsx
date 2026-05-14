import React from 'react';

export const metadata = {
  title: 'Contact Us | Medical365 - Reach Our Team Across India',
  description: 'Have questions? Contact Medical365 for product support, sales inquiries, or technical assistance with our healthcare management solutions.',
};

export default function ContactPage() {
  return (
    <main className="py-24 relative overflow-hidden bg-white/1">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-primary/20 blur-[130px] -z-10 rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-blue-500/10 blur-[110px] -z-10 rounded-full" />

      <div className="container">
        <div className="text-center mb-20 reveal">
          <div className="badge mb-4">Direct Support</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight tracking-tight">How can we <span className="text-gradient">help you?</span></h1>
          <p className="opacity-60 max-w-2xl mx-auto text-lg leading-relaxed font-secondary">Whether you're looking for a new clinical solution or need help with an existing deployment, our team is here to support you 24/7.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="contact-card p-10 glass-card bg-white/5 border border-white/10 rounded-[40px] text-center reveal group hover:border-primary/50 transition-all" style={{ animationDelay: '0.1s' }}>
            <div className="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4 font-secondary">Call Us Directly</h3>
            <p className="opacity-60 mb-8 font-secondary">Speak to a clinical solution expert about your facility's specific requirements.</p>
            <a href="tel:+917791910007" className="text-lg font-bold text-primary hover:underline font-secondary">+91 77919 10007</a>
          </div>

          <div className="contact-card p-10 glass-card bg-white/5 border border-white/10 rounded-[40px] text-center reveal group hover:border-primary/50 transition-all font-secondary" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Email Specialists</h3>
            <p className="opacity-60 mb-8">Send us your detailed clinical workflow challenges and we'll reply with a roadmap.</p>
            <a href="mailto:info@medical365.in" className="text-lg font-bold text-primary hover:underline">info@medical365.in</a>
          </div>

          <div className="contact-card p-10 glass-card bg-white/5 border border-white/10 rounded-[40px] text-center reveal group hover:border-primary/50 transition-all font-secondary" style={{ animationDelay: '0.3s' }}>
            <div className="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Visit Our Office</h3>
            <p className="opacity-60 mb-8">Stop by our Bhamashah Techno Hub branch for a coffee and a live demo.</p>
            <span className="text-lg font-bold text-primary font-secondary">Jaipur, Rajasthan (HQ)</span>
          </div>

        </div>

        <div className="mt-20 grid lg:grid-cols-2 gap-8 items-center bg-white/5 p-10 rounded-[48px] border border-white/10 reveal font-secondary" style={{ animationDelay: '0.4s' }}>
          <div>
            <h2 className="text-3xl font-bold mb-6">Technical HQ</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="text-primary text-2xl shrink-0">📍</div>
                <p className="opacity-70 text-lg leading-relaxed">
                  Bhamashah Techno Hub, Sansthan Path,<br />
                  Jhalana Gram, Malviya Nagar,<br />
                  Jaipur, Rajasthan 302017
                </p>
              </div>
              <div className="flex gap-4">
                <div className="text-primary text-2xl shrink-0">⏰</div>
                <p className="opacity-70 text-lg">Mon-Sat: 09:00 AM – 06:00 PM IST</p>
              </div>
            </div>
            <div className="mt-8 flex gap-4">
              <a href="/book-demo" className="btn-primary">Get Technical Demo</a>
              <a href="https://wa.me/917791910007" className="btn-secondary">Message on WhatsApp</a>
            </div>
          </div>
          <div className="rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.1!2d75.8069!3d26.8639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5a7f7a7f7a7%3A0x7a7a7a7a7a7a7a7a!2sBhamashah%20Techno%20Hub%2C%20Malviya%20Nagar%2C%20Jaipur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%" height="400" style={{ border: 0, display: 'block' }}
              allowFullScreen={true} loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
