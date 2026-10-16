'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, UserRole } from '@/context/AuthContext';
import { 
  HeartPulse, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  PhoneCall, 
  TrendingUp, 
  CheckCircle2, 
  KeyRound, 
  UserCircle 
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsRole } = useAuth();
  
  const [selectedRole, setSelectedRole] = useState<UserRole>('Superadmin');
  const [email, setEmail] = useState('superadmin@medical365.in');
  const [password, setPassword] = useState('superadmin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle role tab change
  const handleRoleTab = (role: UserRole) => {
    setSelectedRole(role);
    setError('');
    if (role === 'Superadmin') {
      setEmail('superadmin@medical365.in');
      setPassword('superadmin123');
    } else if (role === 'Sales') {
      setEmail('sales@medical365.in');
      setPassword('sales123');
    } else if (role === 'Telecaller') {
      setEmail('telecaller@medical365.in');
      setPassword('telecaller123');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = login(email, password);
    if (success) {
      router.push('/');
    } else {
      setError('Invalid credentials. Please click one of the 3 role buttons below or check the password.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-700/30 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Brand Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-7 text-white text-center relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-xl" />
          <div className="inline-flex p-3 bg-white/15 rounded-2xl mb-2.5 shadow-inner backdrop-blur-xs">
            <HeartPulse className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h1 className="text-2xl font-black tracking-tight">Medical 365 CRM</h1>
          <p className="text-xs text-indigo-100 font-medium">Enterprise Hospital & Clinical Lead Management</p>
        </div>

        {/* Content Area */}
        <div className="p-7 space-y-6">
          {/* Role Selection Tabs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Your Access Role:
              </span>
              <span className="text-[11px] text-blue-600 font-semibold flex items-center gap-1">
                <KeyRound className="w-3 h-3" /> Auto-fills credentials
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleRoleTab('Superadmin')}
                className={`py-2.5 px-3 rounded-xl border text-center transition flex flex-col items-center gap-1 text-xs font-bold ${
                  selectedRole === 'Superadmin'
                    ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-sm ring-2 ring-purple-600/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <ShieldCheck className={`w-4 h-4 ${selectedRole === 'Superadmin' ? 'text-purple-600' : 'text-slate-400'}`} />
                <span>Superadmin</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleTab('Sales')}
                className={`py-2.5 px-3 rounded-xl border text-center transition flex flex-col items-center gap-1 text-xs font-bold ${
                  selectedRole === 'Sales'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm ring-2 ring-blue-600/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <TrendingUp className={`w-4 h-4 ${selectedRole === 'Sales' ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>Sales</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleTab('Telecaller')}
                className={`py-2.5 px-3 rounded-xl border text-center transition flex flex-col items-center gap-1 text-xs font-bold ${
                  selectedRole === 'Telecaller'
                    ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-sm ring-2 ring-amber-600/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <PhoneCall className={`w-4 h-4 ${selectedRole === 'Telecaller' ? 'text-amber-600' : 'text-slate-400'}`} />
                <span>Telecaller</span>
              </button>
            </div>
          </div>

          {/* Role Summary Note */}
          <div className={`p-3 rounded-xl border text-xs ${
            selectedRole === 'Superadmin'
              ? 'bg-purple-50/70 border-purple-200 text-purple-900'
              : selectedRole === 'Sales'
              ? 'bg-blue-50/70 border-blue-200 text-blue-900'
              : 'bg-amber-50/70 border-amber-200 text-amber-900'
          }`}>
            <p className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {selectedRole === 'Superadmin' && 'Superadmin: Master access across hospital analytics, TPA desk & patient records.'}
              {selectedRole === 'Sales' && 'Sales: High-value treatment estimates, deal pipeline, conversion & revenue tracking.'}
              {selectedRole === 'Telecaller' && 'Telecaller: Inbound patient calling, follow-ups, triage scoring & OPD booking.'}
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0" />
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@medical365.in"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-50 text-sm"
            >
              {loading ? 'Authenticating...' : `Sign In as ${selectedRole}`}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* 1-Click Instant Persona Sign-in Buttons */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
              Or 1-Click Direct Login:
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => loginAsRole('Superadmin')}
                className="p-2.5 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl text-left transition"
              >
                <div className="flex items-center gap-1.5 text-purple-700 font-black text-xs">
                  <ShieldCheck className="w-3.5 h-3.5" /> Superadmin
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">superadmin123</p>
              </button>

              <button
                type="button"
                onClick={() => loginAsRole('Sales')}
                className="p-2.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-left transition"
              >
                <div className="flex items-center gap-1.5 text-blue-700 font-black text-xs">
                  <TrendingUp className="w-3.5 h-3.5" /> Sales
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">sales123</p>
              </button>

              <button
                type="button"
                onClick={() => loginAsRole('Telecaller')}
                className="p-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-left transition"
              >
                <div className="flex items-center gap-1.5 text-amber-700 font-black text-xs">
                  <PhoneCall className="w-3.5 h-3.5" /> Telecaller
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">telecaller123</p>
              </button>
            </div>
          </div>
        </div>

        {/* Security Footer */}
        <div className="bg-slate-50 px-8 py-3 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3 text-emerald-600" />
            Medical365 Role-Based Access Control • Encrypted Session
          </p>
        </div>
      </div>
    </div>
  );
}
