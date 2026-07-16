/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Search, Filter, ShieldCheck, Download, Trash2, Edit2, Check, X, 
  TrendingUp, Users, Calendar, IndianRupee, AlertCircle, FileText, Globe
} from 'lucide-react';
import { SymposiumEvent, Registration, Stats } from '../types';

interface AdminDashboardProps {
  events: SymposiumEvent[];
  registrations: Registration[];
  stats: Stats;
  onApproveRegistration: (id: string) => void;
  onRejectRegistration: (id: string) => void;
  onDeleteRegistration: (id: string) => void;
  onAddEvent: (event: Omit<SymposiumEvent, 'id' | 'registeredCount'>) => void;
  onEditEvent: (id: string, fields: Partial<SymposiumEvent>) => void;
  onDeleteEvent: (id: string) => void;
}

export default function AdminDashboard({
  events,
  registrations,
  stats,
  onApproveRegistration,
  onRejectRegistration,
  onDeleteRegistration,
  onAddEvent,
  onEditEvent,
  onDeleteEvent
}: AdminDashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<'registrations' | 'events' | 'add-event'>('registrations');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterEvent, setFilterEvent] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // New Event form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newLongDesc, setNewLongDesc] = useState('');
  const [newDept, setNewDept] = useState('Computer Science & Engineering');
  const [newType, setNewType] = useState<'technical' | 'non-technical' | 'workshop' | 'gaming'>('technical');
  const [newDate, setNewDate] = useState('2026-09-18');
  const [newTime, setNewTime] = useState('09:00 AM - 04:00 PM');
  const [newVenue, setNewVenue] = useState('');
  const [newFee, setNewFee] = useState<number>(100);
  const [newTeamSize, setNewTeamSize] = useState('Individual');
  const [newMaxSeats, setNewMaxSeats] = useState<number>(40);
  const [coordName, setCoordName] = useState('');
  const [coordPhone, setCoordPhone] = useState('');
  const [ruleInput, setRuleInput] = useState('');
  const [rules, setRules] = useState<string[]>([]);
  const [prizeInput, setPrizeInput] = useState('');
  const [prizes, setPrizes] = useState<string[]>([]);
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800');

  // Editing state
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  // Add rule helper
  const handleAddRule = () => {
    if (ruleInput.trim()) {
      setRules([...rules, ruleInput.trim()]);
      setRuleInput('');
    }
  };

  // Add prize helper
  const handleAddPrize = () => {
    if (prizeInput.trim()) {
      setPrizes([...prizes, prizeInput.trim()]);
      setPrizeInput('');
    }
  };

  // Submit new event helper
  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newVenue.trim()) return;

    onAddEvent({
      title: newTitle,
      description: newDesc || `${newTitle} technical symposium track.`,
      longDescription: newLongDesc || `${newTitle} challenges engineering students across colleges to display their innovative projects and gain expertise.`,
      department: newDept,
      type: newType,
      date: newDate,
      time: newTime,
      venue: newVenue,
      fee: Number(newFee),
      teamSize: newTeamSize,
      maxSeats: Number(newMaxSeats),
      coordinators: [{ name: coordName || 'Student Volunteer', phone: coordPhone || '+91 99999 99999' }],
      rules: rules.length > 0 ? rules : ['Standard college symposium rules apply.'],
      prizes: prizes.length > 0 ? prizes : ['₹5,000 Winner', '₹3,000 Runner-Up'],
      image: newImage
    });

    // Reset Form fields
    setNewTitle('');
    setNewDesc('');
    setNewLongDesc('');
    setNewVenue('');
    setNewFee(100);
    setNewMaxSeats(40);
    setCoordName('');
    setCoordPhone('');
    setRules([]);
    setPrizes([]);
    setActiveSubTab('events');
  };

  // Export registrations CSV helper
  const handleExportCSV = () => {
    const headers = ['ID', 'Event', 'Participant Name', 'Email', 'Phone', 'College', 'Department', 'Year', 'Status', 'Date Registered'];
    const rows = registrations.map(r => [
      r.id,
      r.eventTitle,
      r.participantName,
      r.email,
      r.phone,
      r.college,
      r.department,
      r.year,
      r.status,
      r.registrationDate
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `wyntrix_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter registrations logic
  const filteredRegistrations = registrations.filter(r => {
    const matchesSearch = 
      r.participantName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.ticketCode.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesEvent = filterEvent === 'all' || r.eventId === filterEvent;
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus;

    return matchesSearch && matchesEvent && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Analytics Cards row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stats 1 */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Registered</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{stats.totalRegistrations}</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-0.5">
              <TrendingUp className="h-3 w-3" />
              <span>Live</span>
            </span>
          </div>
        </div>

        {/* Stats 2 */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Approvals</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
              <AlertCircle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{stats.pendingApprovals}</span>
            <span className="text-xs text-slate-400">Awaiting action</span>
          </div>
        </div>

        {/* Stats 3 */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Symposium Tracks</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{stats.totalEvents}</span>
            <span className="text-xs text-slate-400">Active events</span>
          </div>
        </div>

        {/* Stats 4 */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Calculated Revenue</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <IndianRupee className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">₹{stats.totalRevenue.toLocaleString()}</span>
            <span className="text-xs text-slate-400">Simulated database</span>
          </div>
        </div>
      </div>

      {/* Sub tabs navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveSubTab('registrations')}
            id="subtab-btn-regs"
            className={`rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'registrations'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Registrations ({registrations.length})
          </button>
          <button
            onClick={() => setActiveSubTab('events')}
            id="subtab-btn-events"
            className={`rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'events'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Symposium Tracks ({events.length})
          </button>
          <button
            onClick={() => setActiveSubTab('add-event')}
            id="subtab-btn-add"
            className={`rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              activeSubTab === 'add-event'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Event</span>
          </button>
        </div>

        {activeSubTab === 'registrations' && (
          <button
            onClick={handleExportCSV}
            id="btn-export-csv"
            className="flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 px-4 py-2 text-xs font-semibold text-slate-200 transition-all cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
        )}
      </div>

      {/* Dynamic Content Sections */}
      <div className="min-h-[400px]">
        {activeSubTab === 'registrations' && (
          <div className="space-y-4">
            {/* Search and Filters panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-950/40 p-3 rounded-2xl border border-slate-800/60">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search student, college, pass..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  id="input-admin-search"
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 focus:border-indigo-500 pl-9 pr-4 py-2.5 text-xs text-slate-200 outline-none transition-all"
                />
              </div>

              {/* Event Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-3.5 w-3.5 text-slate-500 flex-shrink-0" />
                <select
                  value={filterEvent}
                  onChange={(e) => setFilterEvent(e.target.value)}
                  id="select-admin-filter-event"
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 focus:border-indigo-500 px-3 py-2.5 text-xs text-slate-200 cursor-pointer outline-none transition-all"
                >
                  <option value="all">All Symposium Events</option>
                  {events.map(ev => (
                    <option key={ev.id} value={ev.id}>{ev.title}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-slate-500 flex-shrink-0" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  id="select-admin-filter-status"
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 focus:border-indigo-500 px-3 py-2.5 text-xs text-slate-200 cursor-pointer outline-none transition-all"
                >
                  <option value="all">All Approval Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Registrations Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/40">
              <table className="w-full border-collapse text-left text-xs text-slate-300">
                <thead className="bg-slate-950/60 font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-6 py-4">Participant & College</th>
                    <th className="px-6 py-4">Symposium Event</th>
                    <th className="px-6 py-4">Ticket ID</th>
                    <th className="px-6 py-4">Date Registered</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredRegistrations.length > 0 ? (
                    filteredRegistrations.map(reg => (
                      <tr key={reg.id} className="hover:bg-slate-950/30 transition-colors">
                        <td className="px-6 py-4 space-y-1">
                          <div className="font-bold text-slate-200">{reg.participantName}</div>
                          <div className="text-[10px] text-slate-400 truncate max-w-xs">{reg.college}</div>
                          <div className="text-[10px] text-slate-500">{reg.department} &bull; {reg.year}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-300">{reg.eventTitle}</div>
                          <div className="text-[10px] text-slate-500 font-mono">ID: {reg.eventId}</div>
                        </td>
                        <td className="px-6 py-4 font-mono text-indigo-400 font-semibold">
                          {reg.ticketCode}
                        </td>
                        <td className="px-6 py-4 text-slate-400">
                          {new Date(reg.registrationDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                            reg.status === 'approved'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : reg.status === 'rejected'
                                ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}>
                            {reg.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-1 whitespace-nowrap">
                          {reg.status !== 'approved' && (
                            <button
                              onClick={() => onApproveRegistration(reg.id)}
                              id={`btn-approve-${reg.id}`}
                              className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
                              title="Approve registration"
                            >
                              <Check className="h-3.5 w-3.5" />
                            </button>
                          )}
                          {reg.status !== 'rejected' && (
                            <button
                              onClick={() => onRejectRegistration(reg.id)}
                              id={`btn-reject-${reg.id}`}
                              className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                              title="Reject registration"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => onDeleteRegistration(reg.id)}
                            id={`btn-delete-${reg.id}`}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-rose-500 hover:text-white hover:border-transparent border border-slate-700/60 transition-all cursor-pointer"
                            title="Delete record"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                        No registrations match the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSubTab === 'events' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map(ev => (
              <div key={ev.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 flex gap-4">
                <img
                  src={ev.image}
                  alt={ev.title}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0 border border-slate-800"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-100 truncate">{ev.title}</h4>
                    <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/10 capitalize">
                      {ev.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">{ev.department}</p>
                  
                  <div className="flex items-center gap-4 text-[10px] text-slate-500 pt-1">
                    <span>Seats: <strong className="text-slate-300">{ev.registeredCount}/{ev.maxSeats}</strong></span>
                    <span>Fee: <strong className="text-slate-300">₹{ev.fee}</strong></span>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80 mt-2">
                    <button
                      onClick={() => {
                        const newFeePrompt = prompt('Enter new Entry Fee for this track:', ev.fee.toString());
                        if (newFeePrompt !== null) {
                          onEditEvent(ev.id, { fee: Number(newFeePrompt) });
                        }
                      }}
                      id={`btn-edit-fee-${ev.id}`}
                      className="text-[10px] font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-md flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit Fee</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to completely remove "${ev.title}"? This deletes all registered attendees.`)) {
                          onDeleteEvent(ev.id);
                        }
                      }}
                      id={`btn-delete-ev-${ev.id}`}
                      className="text-[10px] font-bold text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-600 px-2.5 py-1 rounded-md flex items-center gap-1 transition-all cursor-pointer ml-auto"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === 'add-event' && (
          <div className="mx-auto max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
            <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-500" />
              <span>Publish New Symposium Track</span>
            </h3>

            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Event Title *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. PPT Presentation"
                    id="input-create-title"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500/80 px-4 py-2.5 text-xs text-slate-200 outline-none transition-all"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Department *</label>
                  <select
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    id="select-create-dept"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500/80 px-4 py-2.5 text-xs text-slate-200 outline-none transition-all cursor-pointer"
                  >
                    <option>Computer Science & Engineering</option>
                    <option>Information Technology</option>
                    <option>Electronics & Communication</option>
                    <option>Mechanical Engineering</option>
                    <option>Biotechnology</option>
                    <option>Fine Arts Council</option>
                    <option>School of Management</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Track Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    id="select-create-type"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500/80 px-4 py-2.5 text-xs text-slate-200 outline-none transition-all cursor-pointer"
                  >
                    <option value="technical">Technical Track</option>
                    <option value="non-technical">Non-Technical Track</option>
                    <option value="workshop">Academic Workshop</option>
                    <option value="gaming">Gaming Tournament</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Team Size Constraint</label>
                  <input
                    type="text"
                    value={newTeamSize}
                    onChange={(e) => setNewTeamSize(e.target.value)}
                    placeholder="e.g. Team of 2-3 or Individual"
                    id="input-create-team"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500/80 px-4 py-2.5 text-xs text-slate-200 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Date (YYYY-MM-DD)</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    id="input-create-date"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500/80 px-4 py-2.5 text-xs text-slate-200 outline-none transition-all cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Timing</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="e.g. 10:00 AM - 01:00 PM"
                    id="input-create-time"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500/80 px-4 py-2.5 text-xs text-slate-200 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Venue *</label>
                  <input
                    type="text"
                    required
                    value={newVenue}
                    onChange={(e) => setNewVenue(e.target.value)}
                    placeholder="e.g. Lab 4, Block 2"
                    id="input-create-venue"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500/80 px-4 py-2.5 text-xs text-slate-200 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Entry Fee (INR)</label>
                  <input
                    type="number"
                    value={newFee}
                    onChange={(e) => setNewFee(Number(e.target.value))}
                    placeholder="150"
                    id="input-create-fee"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500/80 px-4 py-2.5 text-xs text-slate-200 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Max Seats Limit</label>
                  <input
                    type="number"
                    value={newMaxSeats}
                    onChange={(e) => setNewMaxSeats(Number(e.target.value))}
                    placeholder="40"
                    id="input-create-seats"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500/80 px-4 py-2.5 text-xs text-slate-200 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Student Coordinators details */}
              <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800/80 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block">Lead Coordinator Details</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500">Full Name</label>
                    <input
                      type="text"
                      value={coordName}
                      onChange={(e) => setCoordName(e.target.value)}
                      placeholder="Student Name"
                      id="input-create-coord-name"
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 focus:border-indigo-500 px-3 py-2 text-xs text-slate-200 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500">WhatsApp / Call</label>
                    <input
                      type="text"
                      value={coordPhone}
                      onChange={(e) => setCoordPhone(e.target.value)}
                      placeholder="+91 99999 99999"
                      id="input-create-coord-phone"
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 focus:border-indigo-500 px-3 py-2 text-xs text-slate-200 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Rules & Prizes Lists */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Rules Editor */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Rules & Regulations ({rules.length})</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={ruleInput}
                      onChange={(e) => setRuleInput(e.target.value)}
                      placeholder="Add event guideline rule"
                      id="input-create-rule"
                      className="flex-1 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 px-3 py-2 text-xs text-slate-200 outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={handleAddRule}
                      id="btn-create-add-rule"
                      className="rounded-lg bg-indigo-600 hover:bg-indigo-500 p-2 text-white transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {rules.length > 0 && (
                    <ul className="text-[10px] text-slate-400 list-disc pl-4 space-y-1 bg-slate-950/20 p-2.5 rounded-lg border border-slate-800">
                      {rules.map((ru, idx) => (
                        <li key={idx} className="truncate">{ru}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Prizes Editor */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Trophies / Prize Struct ({prizes.length})</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={prizeInput}
                      onChange={(e) => setPrizeInput(e.target.value)}
                      placeholder="e.g. ₹5,000 Winner"
                      id="input-create-prize"
                      className="flex-1 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 px-3 py-2 text-xs text-slate-200 outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={handleAddPrize}
                      id="btn-create-add-prize"
                      className="rounded-lg bg-indigo-600 hover:bg-indigo-500 p-2 text-white transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {prizes.length > 0 && (
                    <ul className="text-[10px] text-slate-400 list-disc pl-4 space-y-1 bg-slate-950/20 p-2.5 rounded-lg border border-slate-800">
                      {prizes.map((pr, idx) => (
                        <li key={idx} className="truncate">{pr}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Brief Description</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Summarize this track in 1-2 lines..."
                  rows={2}
                  id="textarea-create-desc"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500/80 px-4 py-2.5 text-xs text-slate-200 outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Image Cover URL</label>
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  id="input-create-image"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500/80 px-4 py-2.5 text-xs text-slate-200 outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                id="btn-create-submit"
                className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 py-3 text-xs font-bold text-white shadow-md shadow-indigo-600/10 hover:shadow-indigo-500/25 transition-all cursor-pointer"
              >
                Publish Live Track
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
