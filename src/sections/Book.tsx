/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, ChevronDown, CheckCircle2, Zap } from 'lucide-react';

const trainingStyles = ['HYROX', 'CrossFit', 'Boxing', 'Personal Training'];

const timeSlots = [
  '05:00', '06:00', '07:00', '08:00', '09:00', '10:00',
  '11:00', '12:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00',
];

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="flex flex-col gap-2 mb-12">
    {subtitle && (
      <span className="text-yellow-500 text-xs font-bold tracking-[0.3em] uppercase flex items-center gap-2">
        <span className="w-4 h-px bg-yellow-500 inline-block" />
        {subtitle}
      </span>
    )}
    <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
      {children}
    </h2>
  </div>
);

const FloatingInput = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <label
        className={`absolute left-0 transition-all duration-200 pointer-events-none font-bold tracking-widest uppercase
          ${active ? 'text-[9px] text-yellow-500 top-0' : 'text-[10px] text-gray-500 top-4'}`}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={active ? placeholder : ''}
        className={`w-full bg-transparent border-b py-4 pt-5 outline-none transition-all duration-200 text-lg placeholder-gray-700
          ${focused ? 'border-yellow-500 text-white' : 'border-gray-800 text-gray-300'}`}
      />
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute bottom-0 left-0 h-px w-full bg-yellow-500 origin-left"
      />
    </div>
  );
};

export default function Book() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [style, setStyle] = useState('HYROX');
  const [timeSlot, setTimeSlot] = useState('');
  const [styleOpen, setStyleOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name || !email) return;
    setSubmitted(true);
  };

  return (
    <section className="relative min-h-screen py-32 px-6 max-w-7xl mx-auto w-full flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-yellow-500/5 blur-[120px]" />
      </div>

      {/* Decorative large BK letters */}
      <span className="pointer-events-none select-none absolute -left-8 top-1/2 -translate-y-1/2 text-[22vw] font-black text-white/[0.03] uppercase italic leading-none">
        BK
      </span>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            className="flex flex-col items-center gap-6 text-center py-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
            >
              <CheckCircle2 size={72} className="text-yellow-500" strokeWidth={1.5} />
            </motion.div>
            <h2 className="text-5xl font-black uppercase italic tracking-tighter">Session Booked!</h2>
            <p className="text-gray-400 text-lg max-w-sm">
              See you at <span className="text-yellow-500 font-bold">{timeSlot || 'your chosen time'}</span>, {name.split(' ')[0] || 'Athlete'}.
              We've sent confirmation to <span className="text-white">{email}</span>.
            </p>
            <button
              onClick={() => { setSubmitted(false); setName(''); setEmail(''); setTimeSlot(''); setStyle('HYROX'); }}
              className="mt-4 px-8 py-3 border border-yellow-500 text-yellow-500 text-sm font-bold tracking-widest uppercase hover:bg-yellow-500 hover:text-black transition-colors duration-200"
            >
              Book Another
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl bg-black/40 backdrop-blur-sm p-10 md:p-14 border border-gray-800 rounded-[3rem]"
          >
            <SectionTitle subtitle="Reservations">Book Your Session</SectionTitle>

            <div className="flex flex-col gap-10">
              {/* Row 1 */}
              <div className="grid md:grid-cols-2 gap-10">
                <FloatingInput label="Full Name" placeholder="John Doe" value={name} onChange={setName} />
                <FloatingInput label="Email Address" type="email" placeholder="john@example.com" value={email} onChange={setEmail} />
              </div>

              {/* Row 2 */}
              <div className="grid md:grid-cols-2 gap-10">
                {/* Training Style Dropdown */}
                <div className="relative">
                  <span className="block text-[9px] font-bold tracking-widest text-yellow-500 uppercase mb-0">Training Style</span>
                  <button
                    type="button"
                    onClick={() => { setStyleOpen(!styleOpen); setTimeOpen(false); }}
                    className="w-full flex items-center justify-between border-b border-gray-800 py-4 text-lg text-left focus:outline-none group"
                  >
                    <span className="text-white">{style}</span>
                    <motion.span animate={{ rotate: styleOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown size={18} className="text-gray-500 group-hover:text-yellow-500 transition-colors" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {styleOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 right-0 z-20 bg-zinc-950 border border-gray-800 mt-1"
                      >
                        {trainingStyles.map((s) => (
                          <li key={s}>
                            <button
                              type="button"
                              onClick={() => { setStyle(s); setStyleOpen(false); }}
                              className={`w-full text-left px-4 py-3 text-sm font-bold uppercase tracking-widest transition-colors
                                ${s === style ? 'text-yellow-500 bg-yellow-500/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                              {s}
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>

                {/* Time Slot Picker */}
                <div className="relative">
                  <span className="block text-[9px] font-bold tracking-widest text-yellow-500 uppercase mb-0">Preferred Time</span>
                  <button
                    type="button"
                    onClick={() => { setTimeOpen(!timeOpen); setStyleOpen(false); }}
                    className="w-full flex items-center justify-between border-b border-gray-800 py-4 text-lg focus:outline-none group"
                  >
                    <span className={`flex items-center gap-3 ${timeSlot ? 'text-white' : 'text-gray-600'}`}>
                      <Clock size={18} className="text-gray-500 group-hover:text-yellow-500 transition-colors" />
                      {timeSlot || '--:--'}
                    </span>
                    <motion.span animate={{ rotate: timeOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown size={18} className="text-gray-500 group-hover:text-yellow-500 transition-colors" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {timeOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 right-0 z-20 bg-zinc-950 border border-gray-800 mt-1 p-3 grid grid-cols-3 gap-1"
                      >
                        {timeSlots.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => { setTimeSlot(t); setTimeOpen(false); }}
                            className={`py-2 text-xs font-bold tracking-wider uppercase transition-all
                              ${t === timeSlot
                                ? 'bg-yellow-500 text-black'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                          >
                            {t}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="button"
                onClick={handleSubmit}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={!name || !email}
                className={`mt-2 py-6 font-black uppercase tracking-widest text-lg flex items-center justify-center gap-3 transition-all duration-200
                  ${name && email
                    ? 'bg-yellow-500 text-black hover:bg-white cursor-pointer'
                    : 'bg-yellow-500/20 text-yellow-500/40 cursor-not-allowed'}`}
              >
                <Zap size={18} className="fill-current" />
                Confirm Booking
              </motion.button>

              {(!name || !email) && (
                <p className="text-center text-[10px] text-gray-600 tracking-widest uppercase -mt-6">
                  Fill in your name and email to continue
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}