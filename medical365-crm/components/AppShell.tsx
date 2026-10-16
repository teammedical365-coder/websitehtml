'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLeads } from '@/context/LeadContext';
import { formatCurrency } from '@/data/mockLeads';
import AddLeadModal from './AddLeadModal';
import LeadDetailModal from './LeadDetailModal';
import { 
  LayoutDashboard, 
  Kanban, 
  Users, 
  PhoneCall, 
  Calendar, 
  Settings, 
  Bell, 
  Search, 
  HeartPulse,
  Plus,
  Table,
  Stethoscope,
  FileText,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { searchQuery, setSearchQuery, openAddModal, metrics } = useLeads();
  const { user, logout } = useAuth();

  if (pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div className="bg-slate-50 text-slate-900 flex h-screen overflow-hidden w-full">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
        {/* Brand */}
        <div className="h-16 p-4 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-gradient-to-tr from-cyan-600 to-blue-600 text-white p-2.5 rounded-xl font-bold flex items-center justify-center shadow-md">
            <HeartPulse className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="font-bold text-white tracking-wide text-base leading-tight">Medical 365</h1>
            <span className="text-[11px] text-cyan-400 font-medium tracking-wide">Healthcare & Clinic CRM</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6 text-sm">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Patient Care</p>
            <div className="space-y-1">
              <Link 
                href="/" 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium ${
                  pathname === '/' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" /> Clinical Dashboard
              </Link>

              <Link 
                href="/pipeline" 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium ${
                  pathname === '/pipeline' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Kanban className="w-4 h-4" /> Patient Pipeline
              </Link>

              <Link 
                href="/leads" 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium ${
                  pathname === '/leads' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Table className="w-4 h-4" /> Patient Registry
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Appointments & OPD</p>
            <div className="space-y-1">
              <Link 
                href="/appointments" 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium ${
                  pathname === '/appointments' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4" /> OPD Schedule & Visits
              </Link>
              <Link 
                href="/appointments" 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium ${
                  pathname === '/teleconsult' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <PhoneCall className="w-4 h-4" /> Teleconsultations
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Hospital Operations</p>
            <div className="space-y-1">
              <span className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-pointer">
                <Stethoscope className="w-4 h-4" /> Doctors & Consultants
              </span>
              <Link 
                href="/insurance" 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium ${
                  pathname === '/insurance' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" /> TPA & Cashless Claims
              </Link>
              <span className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-pointer">
                <Settings className="w-4 h-4" /> Specialties & Settings
              </span>
            </div>
          </div>
        </nav>

        {/* Sidebar Footer User */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm shrink-0 ${
                user?.role === 'Superadmin' ? 'bg-purple-600' : user?.role === 'Sales' ? 'bg-blue-600' : 'bg-amber-600'
              }`}>
                {user?.avatarInitials || 'SA'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{user?.name || 'Superadmin'}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                    user?.role === 'Superadmin'
                      ? 'bg-purple-900/50 text-purple-300 border-purple-700/50'
                      : user?.role === 'Sales'
                      ? 'bg-blue-900/50 text-blue-300 border-blue-700/50'
                      : 'bg-amber-900/50 text-amber-300 border-amber-700/50'
                  }`}>
                    {user?.role || 'Superadmin'}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 z-10">
          {/* Search bar */}
          <div className="relative w-72 sm:w-96">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search patients, phone, doctor, treatment..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-xs text-slate-400 hover:text-slate-600 px-1"
              >
                ✕
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {/* Live Pipeline Value */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-xs text-slate-500 font-medium">Treatment Pipeline:</span>
              <span className="text-sm font-bold text-blue-700">{formatCurrency(metrics.totalPipelineValue)}</span>
            </div>

            {/* Quick Add Patient Button */}
            <button 
              onClick={openAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 shadow-sm transition active:scale-95"
            >
              <Plus className="w-4 h-4" /> Add Patient Lead
            </button>

            {/* Notification Bell */}
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
          {children}
        </main>
      </div>

      {/* Global Modals */}
      <AddLeadModal />
      <LeadDetailModal />
    </div>
  );
}
