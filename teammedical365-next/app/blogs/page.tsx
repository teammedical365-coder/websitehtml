import React from 'react';

export const metadata = {
  title: 'Blog & Insights | Medical365 - Healthcare Innovation Hub',
  description: 'Explore the latest trends, guides, and insights in healthcare digital transformation. Expert resources for hospitals and clinics across Rajasthan.',
};

export default function BlogPage() {
  return (
    <main className="py-24 bg-white/1 relative overflow-hidden">
      <div className="container">
        <div className="text-center mb-16 reveal">
          <div className="badge mb-4">Resources & Guides</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight tracking-tight">Clinical <span className="text-gradient">Insights</span> Hub</h1>
          <p className="opacity-60 max-w-2xl mx-auto text-lg leading-relaxed font-secondary">Stay ahead of the curve with our expert-led guides on digital health, ABDM compliance, and clinical workflow optimization.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 reveal" style={{ animationDelay: '0.2s' }}>
          {[
            { 
              cat: "Digital Transformation", 
              title: "The Ultimate Guide to Hospital Cloud Migration in 2026", 
              date: "April 12, 2026", 
              desc: "Learn why moving your clinical data to the cloud is no longer optional for modern patient safety." 
            },
            { 
              cat: "Compliance", 
              title: "Decoding ABDM: How to make your clinic ABHA-ready in 5 steps", 
              date: "April 08, 2026", 
              desc: "A hands-on guide for private practitioners navigating India's new digital health ecosystem." 
            },
            { 
              cat: "Patient Care", 
              title: "Maximizing Patient Retention with Integrated Mobile Apps", 
              date: "March 28, 2026", 
              desc: "Discover how patient-facing mobile portals improve adherence and hospital loyalty." 
            }
          ].map((post, i) => (
            <div key={i} className="blog-card p-6 glass-card bg-white/5 border border-white/10 rounded-[32px] group hover:border-primary/50 transition-all font-secondary cursor-pointer">
              <div className="aspect-video bg-white/5 rounded-2xl mb-6 flex items-center justify-center text-4xl group-hover:scale-105 transition-all">📄</div>
              <div className="text-primary text-xs font-bold uppercase mb-3">{post.cat}</div>
              <h2 className="text-xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors">{post.title}</h2>
              <p className="opacity-50 text-sm mb-6 line-clamp-3">{post.desc}</p>
              <div className="flex items-center justify-between text-xs opacity-40">
                <span>{post.date}</span>
                <span>8 min read</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-12 glass-card border border-white/10 rounded-[48px] bg-white/5 text-center reveal" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-2xl font-bold mb-4 font-secondary tracking-tight tracking-tight">Searching for something specific?</h2>
          <p className="opacity-60 mb-8 font-secondary">Explore our regional guides for over 22 cities in Rajasthan using our automated search tools.</p>
          <div className="max-w-md mx-auto relative font-secondary">
             <input 
               type="text" 
               placeholder="Search guides (e.g. EMR in Jaipur)" 
               className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 pl-14 outline-none focus:border-primary/50"
             />
             <svg className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
        </div>
      </div>
    </main>
  );
}
