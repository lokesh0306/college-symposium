/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, ShieldAlert, BookOpen, CreditCard, HelpCircle, GraduationCap } from 'lucide-react';

interface NavbarProps {
  currentTab: 'events' | 'tickets' | 'admin' | 'about';
  setCurrentTab: (tab: 'events' | 'tickets' | 'admin' | 'about') => void;
  isAdminMode: boolean;
  setIsAdminMode: (isAdmin: boolean) => void;
}

export default function Navbar({ currentTab, setCurrentTab, isAdminMode, setIsAdminMode }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => setCurrentTab('events')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white sm:block hidden">
                National <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">College Symposium</span>
              </span>
              <span className="text-xs font-semibold block text-slate-400 tracking-wider">
                Web Technologies Arena 2026
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setCurrentTab('events')}
              id="nav-btn-events"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all cursor-pointer ${
                currentTab === 'events'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Award className="h-4 w-4" />
              <span>Events</span>
            </button>

            <button
              onClick={() => setCurrentTab('tickets')}
              id="nav-btn-tickets"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all cursor-pointer ${
                currentTab === 'tickets'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <CreditCard className="h-4 w-4" />
              <span>My Tickets</span>
            </button>

            <button
              onClick={() => setCurrentTab('about')}
              id="nav-btn-about"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all cursor-pointer ${
                currentTab === 'about'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>About</span>
            </button>

            {/* Separator */}
            <span className="h-6 w-[1px] bg-slate-800 mx-1 sm:mx-2" />

            {/* Admin toggle button */}
            <button
              onClick={() => {
                const toggled = !isAdminMode;
                setIsAdminMode(toggled);
                if (toggled) {
                  setCurrentTab('admin');
                } else if (currentTab === 'admin') {
                  setCurrentTab('events');
                }
              }}
              id="nav-btn-admin-toggle"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-all cursor-pointer border ${
                isAdminMode
                  ? 'bg-rose-950/50 border-rose-500/50 text-rose-300 hover:bg-rose-900/60'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <ShieldAlert className={`h-4 w-4 ${isAdminMode ? 'text-rose-400' : 'text-slate-400'}`} />
              <span className="hidden md:inline">{isAdminMode ? 'Exit Admin' : 'Admin Panel'}</span>
              <span className="md:hidden inline">{isAdminMode ? 'Exit' : 'Admin'}</span>
            </button>
          </nav>

        </div>
      </div>
    </header>
  );
}
