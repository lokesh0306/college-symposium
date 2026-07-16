/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Download, Printer, CheckCircle, Smartphone, AlertCircle, Copy, Check } from 'lucide-react';
import { Registration, SymposiumEvent } from '../types';

interface TicketViewProps {
  registration: Registration;
  event: SymposiumEvent;
  onClose: () => void;
}

export default function TicketView({ registration, event, onClose }: TicketViewProps) {
  const [copied, setCopied] = React.useState(false);

  const handlePrint = () => {
    window.print();
  };

  const copyTicketCode = () => {
    navigator.clipboard.writeText(registration.ticketCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl mt-4 print:border-none print:shadow-none print:bg-white"
    >
      {/* Header Notification Banner - Hidden during Print */}
      <div className="bg-emerald-500/15 border-b border-emerald-500/20 px-6 py-4 flex items-center gap-3 print:hidden">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
          <CheckCircle className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Registration Confirmed!</h3>
          <p className="text-xs text-slate-400">
            A confirmation ticket has been successfully compiled into the campus registry database.
          </p>
        </div>
      </div>

      {/* Main Ticket Graphic (Printable Area) */}
      <div id="symposium-entry-ticket" className="p-6 sm:p-8 space-y-6 print:p-0 print:text-black">
        <div className="relative border-2 border-dashed border-slate-800 rounded-2xl bg-slate-950 p-6 flex flex-col sm:flex-row gap-6 justify-between items-stretch overflow-hidden print:bg-white print:border-black print:border-solid">
          {/* Decorative left/right semicircles for ticket aesthetic */}
          <div className="absolute top-1/2 -left-3 h-6 w-6 -translate-y-1/2 rounded-full bg-slate-900 border border-slate-800 sm:block hidden print:hidden" />
          <div className="absolute top-1/2 -right-3 h-6 w-6 -translate-y-1/2 rounded-full bg-slate-900 border border-slate-800 sm:block hidden print:hidden" />

          {/* Left Main Segment */}
          <div className="flex-1 space-y-4 pr-0 sm:pr-6 sm:border-r-2 sm:border-dashed sm:border-slate-800/80 print:border-black">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 print:text-blue-700">
                WYNTRIX CONVERGE &bull; ENTRY PASS
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight print:text-black">
                {event.title}
              </h2>
              <p className="text-xs text-slate-400 print:text-slate-700 font-semibold">{event.department}</p>
            </div>

            {/* Participant Details */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-3 border-t border-slate-900 print:border-slate-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Attendee</span>
                <div className="text-xs font-bold text-slate-200 print:text-black truncate">{registration.participantName}</div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Ticket Code</span>
                <div className="text-xs font-mono font-bold text-slate-200 print:text-black flex items-center gap-1">
                  <span>{registration.ticketCode}</span>
                  <button
                    onClick={copyTicketCode}
                    className="p-0.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white print:hidden transition-colors cursor-pointer"
                    title="Copy Ticket Code"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Institution</span>
                <div className="text-xs font-semibold text-slate-300 print:text-black truncate">
                  {registration.college}
                </div>
                <div className="text-[10px] text-slate-400 print:text-slate-600">
                  {registration.department} &bull; {registration.year}
                </div>
              </div>
            </div>

            {/* Time / Location */}
            <div className="space-y-2 border-t border-slate-900 pt-3 print:border-slate-200 text-xs text-slate-400 print:text-black">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-indigo-400 print:text-black flex-shrink-0" />
                <span>{event.date} &bull; {event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-indigo-400 print:text-black flex-shrink-0" />
                <span>{event.venue}</span>
              </div>
            </div>
          </div>

          {/* Right Stub Segment */}
          <div className="w-full sm:w-40 flex flex-col justify-between items-center sm:text-center gap-4 sm:pl-2 pt-4 sm:pt-0 border-t-2 border-dashed border-slate-800 sm:border-t-0 print:border-black">
            {/* Mock QR code graphic */}
            <div className="flex flex-col items-center gap-2">
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-inner flex items-center justify-center">
                <svg className="w-24 h-24 sm:w-28 sm:h-28" viewBox="0 0 100 100">
                  {/* Outer boundary pixels */}
                  <rect x="0" y="0" width="30" height="30" fill="black" />
                  <rect x="5" y="5" width="20" height="20" fill="white" />
                  <rect x="10" y="10" width="10" height="10" fill="black" />

                  <rect x="70" y="0" width="30" height="30" fill="black" />
                  <rect x="75" y="5" width="20" height="20" fill="white" />
                  <rect x="80" y="10" width="10" height="10" fill="black" />

                  <rect x="0" y="70" width="30" height="30" fill="black" />
                  <rect x="5" y="75" width="20" height="20" fill="white" />
                  <rect x="10" y="80" width="10" height="10" fill="black" />

                  {/* Random pixels */}
                  <rect x="40" y="10" width="10" height="10" fill="black" />
                  <rect x="50" y="20" width="10" height="10" fill="black" />
                  <rect x="35" y="45" width="20" height="10" fill="black" />
                  <rect x="10" y="40" width="10" height="20" fill="black" />
                  <rect x="80" y="40" width="10" height="15" fill="black" />
                  <rect x="45" y="70" width="15" height="10" fill="black" />
                  <rect x="70" y="80" width="10" height="10" fill="black" />
                  <rect x="85" y="70" width="10" height="20" fill="black" />
                </svg>
              </div>
              <span className="text-[9px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                SCANNABLE TICKET
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 print:text-black block">Status</span>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold inline-block border ${
                registration.status === 'approved'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : registration.status === 'rejected'
                    ? 'bg-red-500/10 text-red-400 border-red-500/20'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>
                {registration.status === 'approved' ? 'Approved Entry' : registration.status === 'rejected' ? 'Rejected' : 'Awaiting Approval'}
              </span>
            </div>
          </div>
        </div>

        {/* Notes info box */}
        <div className="flex gap-2.5 rounded-xl bg-slate-950/40 border border-slate-800 p-3 text-xs text-slate-400 print:hidden">
          <AlertCircle className="h-4 w-4 text-indigo-400 flex-shrink-0" />
          <p className="leading-relaxed">
            Please display this digital ticket on your phone or bring a printed copy to the respective event desk at 
            <strong className="text-slate-200"> {event.venue}</strong> on the day of the symposium. Registered members must carry their college identity cards.
          </p>
        </div>
      </div>

      {/* Ticket Footer Action Bar - Hidden during Print */}
      <div className="bg-slate-950 border-t border-slate-800 px-6 py-4 flex items-center justify-between print:hidden">
        <button
          onClick={onClose}
          id="btn-ticket-close"
          className="rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          Close View
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            id="btn-ticket-print"
            className="rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 px-4 py-2.5 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            <span>Print Ticket</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
