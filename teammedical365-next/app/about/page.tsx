import React from 'react';

export const metadata = {
  title: 'About Us | Medical365 - Built by Doctors, Designed for Healthcare',
  description: 'Learn about Medical365, founded by doctors to revolutionize healthcare operations with intuitive cloud-based hospital management and EHR solutions.',
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="badge reveal">🏥 Our Story</div>
            <h1 className="reveal" style={{ animationDelay: '0.1s' }}>
              Built by Doctors, <br />
              <span className="text-gradient">Designed for Healthcare</span>
            </h1>
            <p className="reveal" style={{ animationDelay: '0.2s' }}>
              Medical365 was born from a simple frustration — watching brilliant clinicians lose hours every day to outdated software. We set out to build the healthcare operating system that providers actually deserve.
            </p>
            <div className="hero-buttons reveal" style={{ animationDelay: '0.3s' }}>
              <a href="/book-demo" className="btn-primary btn-lg">Book a Demo</a>
              <a href="/contact" className="btn-secondary btn-lg">Get in Touch</a>
            </div>
          </div>
          <div className="hero-visual reveal" style={{ animationDelay: '0.3s' }}>
            <div className="hero-card shadow-2xl">
              <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {[
                  { label: "Institutions", val: "500+" },
                  { label: "Patients Served", val: "2M+" },
                  { label: "Experience", val: "12+ Yrs" },
                  { label: "Retention", val: "98%" }
                ].map((stat, i) => (
                  <div key={i} className="stat-item text-center p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="text-2xl font-bold text-gradient">{stat.val}</div>
                    <div className="text-xs opacity-60 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mission-section py-24 bg-white/1">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <div className="badge mb-4">Our Mission</div>
              <h2 className="text-4xl font-bold mb-6">Transforming Healthcare, One Facility at a Time</h2>
              <p className="text-lg opacity-80 mb-6">
                At Medical365, we believe that every healthcare provider — from a solo practitioner to a 1,000-bed hospital chain — deserves world-class digital tools. Our mission is to eliminate administrative burden so that care teams can focus entirely on patient outcomes.
              </p>
              <p className="text-lg opacity-80">
                We combine deep clinical expertise with cutting-edge technology to deliver a platform that is not just powerful, but genuinely intuitive. When your staff enjoys using their software, patients feel the difference.
              </p>
            </div>
            <div className="reveal relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-[40px] flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <div className="text-8xl mb-4">🩺</div>
                  <p className="text-xl font-medium italic opacity-90">"Healthcare technology<br/>should empower, not burden"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section py-24">
        <div className="container">
          <div className="text-center mb-16 reveal">
            <h2 className="text-4xl font-bold mb-4">What Drives Us</h2>
            <p className="opacity-70 max-w-2xl mx-auto text-lg">Our core values shape every product decision, every customer interaction, and every line of code we write.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "❤️", title: "Patient First", desc: "Every feature we build is evaluated through one lens: does this ultimately improve patient outcomes?" },
              { icon: "🔒", title: "Uncompromising Security", desc: "HIPAA-compliant by design. Your patient data is sacred. We maintain enterprise-grade security." },
              { icon: "⚡", title: "Speed & Simplicity", desc: "Complexity is the enemy of adoption. We obsess over removing clicks and reducing load times." },
              { icon: "🤝", title: "True Partnership", desc: "We don't just sell software. We become long-term partners in your facility's growth." },
              { icon: "🌱", title: "Continuous Innovation", desc: "Healthcare evolves rapidly. Our platform evolves with it. We ship meaningful updates regularly." },
              { icon: "🌍", title: "Inclusive Access", desc: "Quality healthcare software shouldn't be exclusive. We build models for facilities of every size." }
            ].map((val, i) => (
              <div key={i} className="feature-card reveal p-8 glass-card border border-white/5 rounded-3xl" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-4xl mb-6">{val.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{val.title}</h3>
                <p className="opacity-70 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="team-section py-24 bg-white/1">
        <div className="container">
          <div className="text-center mb-16 reveal">
            <h2 className="text-4xl font-bold mb-4">Leadership Team</h2>
            <p className="opacity-70 text-lg">A team of healthcare professionals, technologists, and operators working toward a singular mission.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: "👨‍⚕️", name: "Dr. Arjun Mehta", role: "Co-founder & CEO", bio: "Former clinician with 15 years in hospital administration." },
              { icon: "👩‍💻", name: "Priya Krishnamurthy", role: "Co-founder & CTO", bio: "Ex-Google engineer. Built healthcare systems for 200+ hospitals." },
              { icon: "👩‍🏥", name: "Dr. Sonal Desai", role: "Chief Medical Officer", bio: "Board-certified physician and health informatics specialist." },
              { icon: "👨‍💼", name: "Rahul Bansal", role: "Chief Revenue Officer", bio: "Built GTM teams for three SaaS startups. Leads global expansion." }
            ].map((member, i) => (
              <div key={i} className="team-card p-6 rounded-3xl border border-white/10 hover:border-primary/50 transition-all text-center reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-5xl mb-4 p-4 bg-white/5 rounded-2xl w-fit mx-auto">{member.icon}</div>
                <h3 className="text-lg font-bold">{member.name}</h3>
                <div className="text-primary text-sm font-semibold mb-3 tracking-wide">{member.role}</div>
                <p className="text-sm opacity-60 line-clamp-3">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
