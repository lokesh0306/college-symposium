/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Users, IndianRupee, Trophy, Phone, ClipboardList, Info } from 'lucide-react';
import { SymposiumEvent } from '../types';

interface EventDetailsModalProps {
  event: SymposiumEvent | null;
  onClose: () => void;
  onRegister: (id: string) => void;
}

export default function EventDetailsModal({ event, onClose, onRegister }: EventDetailsModalProps) {
  if (!event) return null;

  const isFull = event.registeredCount >= event.maxSeats;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          id="modal-backdrop"
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          id={`event-details-modal-${event.id}`}
          className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl text-slate-100 flex flex-col max-h-[90vh]"
        >
          {/* Header Image */}
          <div className="relative h-56 sm:h-64 w-full">
            <img
              src={event.image}
              alt={event.title}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              id="btn-close-modal"
              className="absolute top-4 right-4 rounded-full bg-slate-950/60 hover:bg-slate-950 p-2 text-slate-300 hover:text-white border border-slate-800/80 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Title & Department overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <span className="rounded bg-indigo-600 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
                {event.department}
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
                {event.title}
              </h2>
            </div>
          </div>

          {/* Modal Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Overview Section */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/50 p-4 rounded-xl border border-slate-800/40 text-center">
              <div className="flex flex-col items-center p-1">
                <Calendar className="h-5 w-5 text-indigo-400 mb-1" />
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Date</span>
                <span className="text-xs font-semibold text-slate-200 mt-0.5">{event.date}</span>
              </div>
              <div className="flex flex-col items-center p-1">
                <MapPin className="h-5 w-5 text-indigo-400 mb-1" />
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Venue</span>
                <span className="text-xs font-semibold text-slate-200 mt-0.5 truncate max-w-full">{event.venue}</span>
              </div>
              <div className="flex flex-col items-center p-1">
                <Users className="h-5 w-5 text-indigo-400 mb-1" />
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Team Size</span>
                <span className="text-xs font-semibold text-slate-200 mt-0.5">{event.teamSize}</span>
              </div>
              <div className="flex flex-col items-center p-1">
                <IndianRupee className="h-5 w-5 text-emerald-400 mb-1" />
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Fee</span>
                <span className="text-xs font-bold text-slate-200 mt-0.5">{event.fee === 0 ? 'Free' : `₹${event.fee}`}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                <Info className="h-4 w-4" />
                <span>Event Description</span>
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {event.longDescription}
              </p>
            </div>

            {/* Prizes */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Trophy className="h-4 w-4" />
                <span>Awards & Prizes</span>
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {event.prizes.map((prize, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 rounded-lg bg-amber-500/5 border border-amber-500/10 px-3.5 py-2">
                    <Trophy className="h-4 w-4 text-amber-400 fill-amber-400/20 flex-shrink-0" />
                    <span className="text-xs font-semibold text-amber-200">{prize}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guidelines / Rules */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                <ClipboardList className="h-4 w-4" />
                <span>Rules & Regulations</span>
              </h3>
              <ul className="space-y-2 pl-1">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="flex gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-[10px] font-bold text-indigo-400 border border-indigo-500/20">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coordinators */}
            <div className="space-y-2 border-t border-slate-800/60 pt-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Phone className="h-4 w-4" />
                <span>Student Organizers</span>
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {event.coordinators.map((co, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-lg bg-slate-950/30 border border-slate-800/40 p-3">
                    <div>
                      <div className="text-xs font-semibold text-slate-200">{co.name}</div>
                      <div className="text-[10px] text-slate-400">Event Coordinator</div>
                    </div>
                    <a
                      href={`tel:${co.phone}`}
                      className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      <span>{co.phone}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="border-t border-slate-800/60 bg-slate-950/40 p-4 flex items-center justify-between gap-3">
            <div className="text-xs text-slate-400">
              {event.maxSeats - event.registeredCount} / {event.maxSeats} seats available
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                id="btn-modal-back"
                className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Back to Listings
              </button>
              
              <button
                onClick={() => {
                  onRegister(event.id);
                  onClose();
                }}
                disabled={isFull}
                id={`btn-modal-register-${event.id}`}
                className={`rounded-xl px-5 py-2.5 text-xs font-semibold text-white shadow-md transition-all cursor-pointer ${
                  isFull
                    ? 'bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed shadow-none'
                    : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20 hover:shadow-indigo-500/30'
                }`}
              >
                {isFull ? 'Sold Out' : 'Register Now'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
