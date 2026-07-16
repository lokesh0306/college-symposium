/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Users, IndianRupee, ArrowRight, ShieldCheck, Gamepad2, Laptop, Ticket } from 'lucide-react';
import { SymposiumEvent } from '../types';

interface EventCardProps {
  key?: any;
  event: SymposiumEvent;
  onViewDetails: (id: string) => void;
  onRegister: (id: string) => void;
}

export default function EventCard({ event, onViewDetails, onRegister }: EventCardProps) {
  const isFull = event.registeredCount >= event.maxSeats;
  const seatsLeft = event.maxSeats - event.registeredCount;

  // Determine Icon based on event category
  const getCategoryIcon = () => {
    switch (event.type) {
      case 'gaming':
        return <Gamepad2 className="h-4 w-4 text-emerald-400" />;
      case 'workshop':
        return <Ticket className="h-4 w-4 text-amber-400" />;
      case 'technical':
        return <Laptop className="h-4 w-4 text-indigo-400" />;
      default:
        return <ShieldCheck className="h-4 w-4 text-purple-400" />;
    }
  };

  const getCategoryColor = () => {
    switch (event.type) {
      case 'gaming':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25';
      case 'workshop':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/25';
      case 'technical':
        return 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/25';
      default:
        return 'bg-purple-500/10 text-purple-400 border border-purple-500/25';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      id={`event-card-${event.id}`}
      className="flex flex-col overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 transition-all shadow-md shadow-slate-950/20 hover:shadow-xl hover:shadow-slate-950/40 hover:border-slate-700/80"
    >
      {/* Event Header Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Department Tag Overlay */}
        <div className="absolute top-3 left-3 rounded-md bg-slate-950/70 backdrop-blur-md border border-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-200">
          {event.department}
        </div>
        {/* Entry Fee Tag Overlay */}
        <div className="absolute bottom-3 right-3 rounded-full bg-slate-950/80 backdrop-blur-md px-3 py-1.5 text-sm font-bold text-white border border-slate-800/80 flex items-center gap-0.5">
          <IndianRupee className="h-3.5 w-3.5 text-emerald-400" />
          <span>{event.fee === 0 ? 'Free' : event.fee}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${getCategoryColor()}`}>
            {getCategoryIcon()}
            <span className="capitalize">{event.type}</span>
          </span>
          {isFull ? (
            <span className="rounded-full bg-red-500/10 border border-red-500/20 px-2 py-0.5 text-xs font-bold text-red-400">
              Sold Out
            </span>
          ) : seatsLeft <= 5 ? (
            <span className="rounded-full bg-amber-500/10 border border-amber-500/25 px-2 py-0.5 text-xs font-bold text-amber-400 animate-pulse">
              Only {seatsLeft} Left!
            </span>
          ) : (
            <span className="rounded-full bg-indigo-500/5 border border-indigo-500/10 px-2 py-0.5 text-xs text-slate-400">
              {seatsLeft} Seats Left
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold tracking-tight text-white line-clamp-1">
          {event.title}
        </h3>

        <p className="mt-2 text-sm text-slate-400 line-clamp-2 leading-relaxed flex-1">
          {event.description}
        </p>

        {/* Date, Location, Team */}
        <div className="mt-4 space-y-2 border-y border-slate-800/60 py-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-500" />
            <span>{event.date} • {event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-slate-500" />
            <span className="truncate">{event.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-slate-500" />
            <span>{event.teamSize}</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="mt-4 flex items-center gap-2.5">
          <button
            onClick={() => onViewDetails(event.id)}
            id={`btn-details-${event.id}`}
            className="flex-1 rounded-xl bg-slate-800/80 hover:bg-slate-800 px-3 py-2.5 text-center text-xs font-semibold text-slate-300 border border-slate-700/60 hover:border-slate-600 transition-all cursor-pointer"
          >
            Rules & Rules
          </button>
          
          <button
            onClick={() => onRegister(event.id)}
            disabled={isFull}
            id={`btn-register-cta-${event.id}`}
            className={`flex-1 rounded-xl px-3 py-2.5 text-center text-xs font-semibold text-white shadow-md flex items-center justify-center gap-1 transition-all cursor-pointer ${
              isFull
                ? 'bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed shadow-none'
                : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20 hover:shadow-indigo-500/30'
            }`}
          >
            <span>{isFull ? 'Completed' : 'Register'}</span>
            {!isFull && <ArrowRight className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
