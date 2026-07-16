/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Calendar, MapPin, Search, ArrowRight, BookOpen, GraduationCap, 
  HelpCircle, ShieldCheck, Mail, Phone, ExternalLink, Ticket, Trophy, RefreshCw
} from 'lucide-react';

import { SymposiumEvent, Registration, Stats } from './types';
import { StorageService } from './services/db';

import Navbar from './components/Navbar';
import MovingControlBanner from './components/MovingControlBanner';
import EventCard from './components/EventCard';
import EventDetailsModal from './components/EventDetailsModal';
import RegistrationForm from './components/RegistrationForm';
import TicketView from './components/TicketView';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  // Database States
  const [events, setEvents] = useState<SymposiumEvent[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalEvents: 0,
    totalRegistrations: 0,
    pendingApprovals: 0,
    totalRevenue: 0
  });

  // UI Navigation States
  const [currentTab, setCurrentTab] = useState<'events' | 'tickets' | 'admin' | 'about'>('events');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  
  // Interactive Overlays
  const [activeDetailEvent, setActiveDetailEvent] = useState<SymposiumEvent | null>(null);
  const [registeringEventId, setRegisteringEventId] = useState<string | null>(null);
  const [activeTicket, setActiveTicket] = useState<{ registration: Registration; event: SymposiumEvent } | null>(null);

  // Filters State (For user home listings)
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Load initial data
  useEffect(() => {
    StorageService.init();
    refreshData();
  }, []);

  const refreshData = () => {
    const evs = StorageService.getEvents();
    const regs = StorageService.getRegistrations();
    const st = StorageService.getStats();
    
    setEvents(evs);
    setRegistrations(regs);
    setStats(st);
  };

  // Participant Registration Submission
  const handleRegisterSubmit = (regData: Omit<Registration, 'id' | 'registrationDate' | 'status' | 'ticketCode' | 'paymentStatus'>) => {
    const newReg = StorageService.registerParticipant(regData);
    const targetEvent = events.find(e => e.id === regData.eventId)!;
    
    // Refresh database states
    refreshData();
    
    // Auto launch ticket confirmation view
    setActiveTicket({
      registration: newReg,
      event: targetEvent
    });
    setRegisteringEventId(null);
    setCurrentTab('tickets');
  };

  // Admin Actions
  const handleApproveRegistration = (id: string) => {
    StorageService.updateRegistrationStatus(id, 'approved');
    refreshData();
  };

  const handleRejectRegistration = (id: string) => {
    StorageService.updateRegistrationStatus(id, 'rejected');
    refreshData();
  };

  const handleDeleteRegistration = (id: string) => {
    StorageService.deleteRegistration(id);
    refreshData();
  };

  const handleAddEvent = (eventData: Omit<SymposiumEvent, 'id' | 'registeredCount'>) => {
    StorageService.addEvent(eventData);
    refreshData();
  };

  const handleEditEvent = (id: string, fields: Partial<SymposiumEvent>) => {
    StorageService.updateEvent(id, fields);
    refreshData();
  };

  const handleDeleteEvent = (id: string) => {
    StorageService.deleteEvent(id);
    refreshData();
  };

  // Unique list of departments for filters
  const departmentsList: string[] = ['all', ...Array.from(new Set(events.map(e => e.department))) as string[]];

  // Filtering Logic for main student portal
  const filteredEvents = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'all' || e.department === selectedDept;
    const matchesType = selectedType === 'all' || e.type === selectedType;
    
    return matchesSearch && matchesDept && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Interactive Marquee */}
      <MovingControlBanner />

      {/* Main Navigation Header */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        isAdminMode={isAdminMode} 
        setIsAdminMode={setIsAdminMode} 
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        <AnimatePresence mode="wait">
          
          {/* TAB 1: Events & Symposium Catalog */}
          {currentTab === 'events' && !registeringEventId && (
            <motion.div
              key="events-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Hero Banner Grid */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/60 p-6 sm:p-10 flex flex-col lg:flex-row items-center gap-8 shadow-xl shadow-slate-950/25">
                <div className="flex-1 space-y-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/25 px-3 py-1 text-xs font-bold text-indigo-400">
                    <Sparkles className="h-3.5 w-3.5 animate-pulse text-indigo-400" />
                    <span>Wyntrix Innovation OPC Private Limited</span>
                  </span>
                  
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                    College Symposium & <br />
                    <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
                      Web Arena 2026
                    </span>
                  </h1>

                  <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
                    Welcome to the campus flagship engineering symposium, <strong className="text-slate-300">"College Symposium 2026"</strong>! 
                    Recreate solutions, showcase stunning frontend designs, build intelligent full-stack websites, and claim massive prizes.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 font-semibold">
                    <div className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-800 px-3 py-1.5 rounded-lg">
                      <Calendar className="h-4 w-4 text-indigo-400" />
                      <span>September 18 & 19, 2026</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-800 px-3 py-1.5 rounded-lg">
                      <MapPin className="h-4 w-4 text-indigo-400" />
                      <span>Main Campus Auditorium</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Ticket Counter Graphic */}
                <div className="w-full lg:w-80 rounded-2xl bg-slate-950/80 border border-slate-800/80 p-5 space-y-4 flex-shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">SYM_REG_PORTAL v2.1</span>
                  
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-slate-900 border border-slate-800/60 rounded-xl p-3">
                      <div className="text-xl font-black text-white">{stats.totalRegistrations}</div>
                      <div className="text-[9px] text-slate-400 uppercase font-bold mt-1">Registrations</div>
                    </div>
                    <div className="bg-slate-900 border border-slate-800/60 rounded-xl p-3">
                      <div className="text-xl font-black text-white">{events.length}</div>
                      <div className="text-[9px] text-slate-400 uppercase font-bold mt-1">Events Live</div>
                    </div>
                  </div>

                  <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-3 text-[11px] text-indigo-300 leading-normal">
                    📌 All participants will receive authenticated **digital entry tickets** and certification upon completion.
                  </div>
                </div>
              </div>

              {/* Event Filter & Catalog Header */}
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-white tracking-tight">Active Symposium Tracks</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Explore active technical events, cash rewards, and guidelines.</p>
                  </div>

                  {/* Search bar */}
                  <div className="relative w-full md:w-80 flex-shrink-0">
                    <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search events or departments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      id="input-catalog-search"
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 focus:border-indigo-500/80 pl-10 pr-4 py-3 text-xs text-slate-200 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/60 pb-4">
                  {/* Category select Filter */}
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    id="select-type-filter"
                    className="rounded-xl bg-slate-900 border border-slate-800 focus:border-indigo-500/80 px-4 py-2 text-xs text-slate-300 cursor-pointer outline-none transition-all"
                  >
                    <option value="all">All Event Categories</option>
                    <option value="technical">Technical Track</option>
                    <option value="non-technical">Non-Technical Track</option>
                    <option value="workshop">Academic Workshop</option>
                    <option value="gaming">Gaming Tournament</option>
                  </select>

                  {/* Department selectors as tag pills */}
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-[10px] uppercase font-bold text-slate-500 mr-1 hidden sm:inline">Dept:</span>
                    {departmentsList.map(dept => (
                      <button
                        key={dept}
                        onClick={() => setSelectedDept(dept)}
                        id={`btn-dept-filter-${dept.replace(/\s+/g, '-').toLowerCase()}`}
                        className={`rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-all cursor-pointer capitalize ${
                          selectedDept === dept
                            ? 'bg-indigo-600 border-indigo-500 text-white'
                            : 'bg-slate-900 border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        {dept === 'all' ? 'All Departments' : dept.replace(' Engineering', '')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Event Listings Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map(event => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onViewDetails={(id) => {
                        const ev = events.find(e => e.id === id)!;
                        setActiveDetailEvent(ev);
                      }}
                      onRegister={(id) => setRegisteringEventId(id)}
                    />
                  ))
                ) : (
                  <div className="col-span-full rounded-2xl bg-slate-900/40 border border-slate-800/60 p-12 text-center text-slate-500">
                    No active symposium events match the search filter combination.
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Registration Form Mode */}
          {registeringEventId && (
            <motion.div
              key="registration-form-tab"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-4"
            >
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-extrabold text-white">Event Registration Form</h2>
                <p className="text-xs text-slate-400">Fill in your academic profile to receive your Wyntrix digital ticket.</p>
              </div>
              
              <RegistrationForm
                events={events}
                selectedEventId={registeringEventId}
                onBack={() => setRegisteringEventId(null)}
                onSubmit={handleRegisterSubmit}
              />
            </motion.div>
          )}

          {/* TAB 2: My Tickets Entry / Review */}
          {currentTab === 'tickets' && (
            <motion.div
              key="tickets-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {activeTicket ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between max-w-2xl mx-auto">
                    <button
                      onClick={() => setActiveTicket(null)}
                      id="btn-back-to-ticket-list"
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                    >
                      <span>&larr; View all My registrations</span>
                    </button>
                    
                    <span className="text-xs text-slate-500 font-mono">Simulated PDF output</span>
                  </div>

                  <TicketView
                    registration={activeTicket.registration}
                    event={activeTicket.event}
                    onClose={() => setActiveTicket(null)}
                  />
                </div>
              ) : (
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-black text-white">My Symposium Tickets</h2>
                    <p className="text-xs text-slate-400">
                      Review registered items, print access barcodes, or track your entry approvals.
                    </p>
                  </div>

                  {/* List of participant registrations */}
                  <div className="space-y-4">
                    {registrations.length > 0 ? (
                      registrations.map(reg => {
                        const event = events.find(e => e.id === reg.eventId);
                        if (!event) return null;
                        return (
                          <div 
                            key={reg.id} 
                            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col sm:flex-row items-stretch justify-between gap-4 hover:border-slate-700 transition-all cursor-pointer group"
                            onClick={() => setActiveTicket({ registration: reg, event })}
                          >
                            <div className="flex gap-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-105 transition-transform flex-shrink-0">
                                <Ticket className="h-6 w-6" />
                              </div>
                              <div className="space-y-1">
                                <div className="text-sm font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
                                  {reg.eventTitle}
                                </div>
                                <div className="text-xs text-slate-400">
                                  Registered for: <strong className="text-slate-200">{reg.participantName}</strong>
                                </div>
                                <div className="text-[10px] text-slate-500">
                                  {reg.college} &bull; {reg.department}
                                </div>
                              </div>
                            </div>

                            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 border-slate-800/80 pt-3 sm:pt-0">
                              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border inline-block ${
                                reg.status === 'approved'
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                  : reg.status === 'rejected'
                                    ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                              }`}>
                                {reg.status === 'approved' ? 'Approved Entry' : reg.status === 'rejected' ? 'Rejected' : 'Awaiting Approval'}
                              </span>
                              <span className="text-[10px] font-mono font-bold text-slate-500">
                                {reg.ticketCode}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="rounded-2xl bg-slate-900/40 border border-slate-800/60 p-12 text-center text-slate-500">
                        You have not registered for any symposium tracks yet.
                        <button
                          onClick={() => setCurrentTab('events')}
                          id="btn-no-ticket-cta"
                          className="mt-4 block mx-auto rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-bold text-white transition-all cursor-pointer"
                        >
                          Explore Event Listings
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: Support FAQs & About Wyntrix */}
          {currentTab === 'about' && (
            <motion.div
              key="about-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-black text-white">About National College Symposium 2026</h2>
                <p className="text-xs text-slate-400">
                  A high-fidelity platform for academic innovation, frontend crafts, and professional full-stack collaboration.
                </p>
              </div>

              {/* Team Card */}
              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <GraduationCap className="h-5 w-5" />
                  <span>Web Development Internship Team</span>
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  This portal is co-developed and engineered as part of the **Web Development Internship** review process.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 text-center">
                  <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-1">
                    <div className="text-xs font-bold text-white">Lokesh J</div>
                    <div className="text-[10px] text-slate-500">Lead Dev</div>
                  </div>
                  <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-1">
                    <div className="text-xs font-bold text-white">Hemashree M</div>
                    <div className="text-[10px] text-slate-500">Frontend UI</div>
                  </div>
                  <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-1">
                    <div className="text-xs font-bold text-white">Pradheepa</div>
                    <div className="text-[10px] text-slate-500">UX / Designer</div>
                  </div>
                  <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-1">
                    <div className="text-xs font-bold text-white">Aswin S</div>
                    <div className="text-[10px] text-slate-500">Database</div>
                  </div>
                  <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-1">
                    <div className="text-xs font-bold text-white">Vishnu S</div>
                    <div className="text-[10px] text-slate-500">QA / Tester</div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  <HelpCircle className="h-5 w-5 text-indigo-400" />
                  <span>Frequently Asked Questions</span>
                </h3>

                <div className="space-y-3.5">
                  <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 space-y-2">
                    <h4 className="text-sm font-bold text-slate-100">1. How do I pay the entry fee for premium events?</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      For simulation purposes, registration fees are automatically approved and logged upon form submission. In production environments, participants can integrate standard PG (payment gateway) triggers.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 space-y-2">
                    <h4 className="text-sm font-bold text-slate-100">2. Where can I locate my registered ticket?</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Navigate to the **My Tickets** tab in the main navigation. Click on any active event row to expand the scannable PDF print layout.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 space-y-2">
                    <h4 className="text-sm font-bold text-slate-100">3. Is team registration supported?</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Yes! When registering for team web events like the *FullStack Speed-Run* or *AI-Powered Web Apps Hackathon*, the lead representative should register. Student coordinators will coordinate full team rosters pre-event.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact footer card */}
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/40 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div>
                  <h4 className="text-xs font-bold text-slate-300">Have doubts or require guidance?</h4>
                  <p className="text-[11px] text-slate-400">Get in touch directly with our support help desk.</p>
                </div>
                <a
                  href="mailto:lokeshjayaraman7299@gmail.com"
                  className="rounded-xl bg-slate-900 hover:bg-slate-800 px-4 py-2.5 text-xs font-semibold text-white border border-slate-800 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Mail className="h-4 w-4 text-indigo-400" />
                  <span>Contact Organizer Helpdesk</span>
                </a>
              </div>
            </motion.div>
          )}

          {/* TAB 4: Admin Dashboard Section */}
          {currentTab === 'admin' && isAdminMode && (
            <motion.div
              key="admin-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white">Admin Control Console</h2>
                  <p className="text-xs text-slate-400">Manage symposium catalog, participant approvals, and review live registry statistics.</p>
                </div>
                <button
                  onClick={refreshData}
                  id="btn-admin-refresh"
                  className="rounded-xl bg-slate-900 hover:bg-slate-800 p-2.5 text-slate-400 hover:text-white border border-slate-800 transition-all cursor-pointer"
                  title="Force refresh database status"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <AdminDashboard
                events={events}
                registrations={registrations}
                stats={stats}
                onApproveRegistration={handleApproveRegistration}
                onRejectRegistration={handleRejectRegistration}
                onDeleteRegistration={handleDeleteRegistration}
                onAddEvent={handleAddEvent}
                onEditEvent={handleEditEvent}
                onDeleteEvent={handleDeleteEvent}
              />
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* Global Interactive Event Details Overlay Modal */}
      <EventDetailsModal
        event={activeDetailEvent}
        onClose={() => setActiveDetailEvent(null)}
        onRegister={(id) => setRegisteringEventId(id)}
      />

      {/* Footer Branding Area */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-center text-xs text-slate-500 space-y-1">
        <p>National College Symposium 2026 &copy; All rights reserved.</p>
        <p className="text-[10px]">Designed, compiled, and presented for Web Development Internship.</p>
      </footer>

    </div>
  );
}
