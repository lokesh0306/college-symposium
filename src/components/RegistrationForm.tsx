/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, User, Mail, Phone, BookOpen, GraduationCap, IndianRupee, Sparkles, CheckCircle } from 'lucide-react';
import { SymposiumEvent, Registration } from '../types';

interface RegistrationFormProps {
  events: SymposiumEvent[];
  selectedEventId: string;
  onBack: () => void;
  onSubmit: (regData: Omit<Registration, 'id' | 'registrationDate' | 'status' | 'ticketCode' | 'paymentStatus'>) => void;
}

export default function RegistrationForm({ events, selectedEventId, onBack, onSubmit }: RegistrationFormProps) {
  const [eventId, setEventId] = useState<string>(selectedEventId);
  const [step, setStep] = useState<number>(1);
  
  // Form fields
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [college, setCollege] = useState<string>('');
  const [department, setDepartment] = useState<string>('Computer Science & Engineering');
  const [year, setYear] = useState<string>('3rd Year');

  // Validation
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const currentEvent = events.find(e => e.id === eventId) || events[0];

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Full name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone.trim()) {
      newErrors.phone = 'Mobile number is required';
    } else if (!/^\+?\d{10,13}$/.test(phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid contact number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!college.trim()) newErrors.college = 'College name is required';
    if (!department.trim()) newErrors.department = 'Department is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    } else if (step === 2) {
      if (validateStep2()) {
        setStep(3);
      }
    }
  };

  const handlePrev = () => {
    setStep(prev => prev - 1);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 3) {
      onSubmit({
        eventId: currentEvent.id,
        eventTitle: currentEvent.title,
        participantName: name,
        email,
        phone,
        college,
        department,
        year,
        fee: currentEvent.fee
      });
    }
  };

  const steps = [
    { title: 'Personal Info', desc: 'Identify yourself' },
    { title: 'Academic Profile', desc: 'Where do you study' },
    { title: 'Confirm & Pay', desc: 'Double check details' }
  ];

  return (
    <div className="mx-auto max-w-xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl mt-4">
      {/* Progress Stepper Banner */}
      <div className="bg-slate-950 px-6 py-5 border-b border-slate-800">
        <button
          onClick={onBack}
          id="btn-form-back-nav"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-4 cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Events</span>
        </button>

        <div className="flex items-center justify-between gap-2">
          {steps.map((s, index) => {
            const stepNum = index + 1;
            return (
              <React.Fragment key={index}>
                <div className="flex items-center gap-2">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    step === stepNum 
                      ? 'bg-indigo-600 text-white' 
                      : step > stepNum 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-slate-800 text-slate-500'
                  }`}>
                    {step > stepNum ? <CheckCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/10" /> : stepNum}
                  </div>
                  <div className="hidden sm:block">
                    <div className={`text-xs font-semibold ${step === stepNum ? 'text-white' : 'text-slate-500'}`}>{s.title}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-[2px] transition-all ${step > stepNum ? 'bg-emerald-500/20' : 'bg-slate-800'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main Form Fields */}
      <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Symposium Event</label>
                <select
                  value={eventId}
                  onChange={(e) => setEventId(e.target.value)}
                  id="select-form-event"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500/80 px-4 py-3 text-sm text-slate-200 outline-none transition-all cursor-pointer"
                >
                  {events.map(ev => (
                    <option key={ev.id} value={ev.id} disabled={ev.registeredCount >= ev.maxSeats}>
                      {ev.title} ({ev.department}) {ev.registeredCount >= ev.maxSeats ? '[Full]' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    id="input-form-name"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500/80 pl-10 pr-4 py-3 text-sm text-slate-200 outline-none transition-all"
                  />
                </div>
                {errors.name && <p className="text-xs text-red-400 font-medium">{errors.name}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@college.edu"
                    id="input-form-email"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500/80 pl-10 pr-4 py-3 text-sm text-slate-200 outline-none transition-all"
                  />
                </div>
                {errors.email && <p className="text-xs text-red-400 font-medium">{errors.email}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">WhatsApp / Contact Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    id="input-form-phone"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500/80 pl-10 pr-4 py-3 text-sm text-slate-200 outline-none transition-all"
                  />
                </div>
                {errors.phone && <p className="text-xs text-red-400 font-medium">{errors.phone}</p>}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">College / Institution Name</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="Wyntrix Institute of Technology"
                    id="input-form-college"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500/80 pl-10 pr-4 py-3 text-sm text-slate-200 outline-none transition-all"
                  />
                </div>
                {errors.college && <p className="text-xs text-red-400 font-medium">{errors.college}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    id="select-form-dept"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500/80 px-4 py-3 text-sm text-slate-200 outline-none transition-all cursor-pointer"
                  >
                    <option>Computer Science & Engineering</option>
                    <option>Information Technology</option>
                    <option>Electronics & Communication</option>
                    <option>Mechanical Engineering</option>
                    <option>Biotechnology</option>
                    <option>Fine Arts</option>
                    <option>Business Administration</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Year of Study</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    id="select-form-year"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500/80 px-4 py-3 text-sm text-slate-200 outline-none transition-all cursor-pointer"
                  >
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                    <option>Postgraduate</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="rounded-2xl bg-indigo-500/5 border border-indigo-500/10 p-5 space-y-4">
                <h4 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Verify Registration Summary</span>
                </h4>

                <div className="grid grid-cols-2 gap-y-3.5 gap-x-2 text-xs border-b border-slate-800/80 pb-4">
                  <div>
                    <div className="text-slate-500 font-medium">Participant Name</div>
                    <div className="text-slate-200 font-semibold mt-0.5">{name}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 font-medium">Target Event</div>
                    <div className="text-slate-200 font-semibold mt-0.5">{currentEvent.title}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 font-medium">Email / WhatsApp</div>
                    <div className="text-slate-200 font-semibold mt-0.5 truncate">{email}</div>
                    <div className="text-slate-400 mt-0.5">{phone}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 font-medium">Institution / Year</div>
                    <div className="text-slate-200 font-semibold mt-0.5 truncate">{college}</div>
                    <div className="text-slate-400 mt-0.5">{department} • {year}</div>
                  </div>
                </div>

                {/* Entry Fee Section */}
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-300">Total Payable Entry Fee</span>
                  <span className="font-extrabold text-white flex items-center gap-0.5 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-full text-emerald-400">
                    <IndianRupee className="h-4 w-4 text-emerald-400" />
                    <span>{currentEvent.fee === 0 ? 'FREE' : `${currentEvent.fee}`}</span>
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-normal text-center bg-slate-950/40 py-2.5 rounded-lg border border-slate-800/40">
                🔒 Secured via automated portal confirmation. Ticket issued instantly.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation CTAs */}
        <div className="flex items-center justify-between gap-3 border-t border-slate-800/60 pt-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              id="btn-form-prev"
              className="rounded-xl bg-slate-800/80 hover:bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-300 border border-slate-700/60 hover:border-slate-600 transition-all cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onBack}
              id="btn-form-cancel"
              className="rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              Cancel
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              id="btn-form-next"
              className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 hover:shadow-indigo-500/30 flex items-center gap-1 cursor-pointer ml-auto"
            >
              <span>Continue</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              id="btn-form-submit"
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/35 flex items-center gap-1 cursor-pointer ml-auto"
            >
              <span>Confirm & Register</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
