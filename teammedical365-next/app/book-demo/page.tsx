import React from 'react';
import DemoForm from '@/components/DemoForm';

export const metadata = {
  title: 'Book a Free Demo | Medical365 - Healthcare Software Walkthrough',
  description: 'Schedule a personalized 45-minute demo of Medical365 with our clinical experts. See how we can transform your facility operations.',
};

export default function BookDemoPage() {
  return (
    <main className="py-24 bg-white/1 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 blur-[100px] -z-10 rounded-full" />

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Info Side */}
          <div className="reveal">
            <div className="badge mb-4">Personalized Session</div>
            <h1 className="text-5xl font-bold mb-8 tracking-tight leading-tight">
              See Medical365 in <span className="text-gradient underline decoration-primary/30">Action</span>
            </h1>
            
            <div className="space-y-12 mb-12">
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all font-bold text-xl text-primary shadow-xl">1</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Tailored Walkthrough</h3>
                  <p className="opacity-60 leading-relaxed">We show you the modules most relevant to your specific hospital or clinic needs, not a generic sales pitch.</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all font-bold text-xl text-primary shadow-xl">2</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Live Q&A</h3>
                  <p className="opacity-60 leading-relaxed">Direct interaction with our clinical informatics team to answer your deepest technical and operational questions.</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all font-bold text-xl text-primary shadow-xl">3</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">No-Obligation Proposal</h3>
                  <p className="opacity-60 leading-relaxed">Receive a clear implementation roadmap and a transparent pricing quote for your facility by the end of the call.</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 border border-white/5 rounded-[40px] bg-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-6xl opacity-10 group-hover:scale-110 transition-transform">"</div>
              <p className="text-lg italic opacity-80 mb-6 leading-relaxed relative z-10">
                "The Medical365 demo was eye-opening. We could immediately see how it would cut our administrative overhead. We went live across 3 branches in just 4 weeks."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl">👨‍⚕️</div>
                <div>
                  <div className="font-bold">Dr. Rajesh Varma</div>
                  <div className="text-sm opacity-50">Director, Sahyadri Hospitals</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="glass-card p-10 bg-white/5 border border-white/10 rounded-[48px] shadow-2xl relative">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold mb-2">Schedule Your Visit</h2>
              <p className="opacity-50">Average booking takes less than 60 seconds.</p>
            </div>
            <DemoForm />
          </div>

        </div>
      </div>
    </main>
  );
}
