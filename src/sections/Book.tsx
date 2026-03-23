/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="flex flex-col gap-2 mb-12">
    {subtitle && <span className="text-yellow-500 text-xs font-bold tracking-[0.3em] uppercase">{subtitle}</span>}
    <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">{children}</h2>
  </div>
);

export default function Book() {
  return (
    <section className="relative min-h-screen py-32 px-6 max-w-7xl mx-auto w-full flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full max-w-2xl bg-black/40 backdrop-blur-sm p-12 border border-gray-800 rounded-[3rem]"
      >
        <SectionTitle subtitle="Reservations">Book Your Session</SectionTitle>
        <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Full Name</label>
              <input type="text" className="bg-transparent border-b border-gray-800 py-4 focus:border-yellow-500 outline-none transition-colors text-lg" placeholder="John Doe" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Email Address</label>
              <input type="email" className="bg-transparent border-b border-gray-800 py-4 focus:border-yellow-500 outline-none transition-colors text-lg" placeholder="john@example.com" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Training Style</label>
              <select className="bg-transparent border-b border-gray-800 py-4 focus:border-yellow-500 outline-none transition-colors appearance-none text-lg">
                <option className="bg-black">HYROX</option>
                <option className="bg-black">CrossFit</option>
                <option className="bg-black">Boxing</option>
                <option className="bg-black">Personal Training</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Preferred Time</label>
              <div className="flex items-center gap-3 border-b border-gray-800 py-4">
                <Clock size={20} className="text-gray-500" />
                <input type="time" className="bg-transparent focus:border-yellow-500 outline-none transition-colors w-full text-lg" />
              </div>
            </div>
          </div>
          <button className="mt-8 py-6 bg-yellow-500 text-black font-black uppercase tracking-widest hover:bg-white transition-colors text-lg">
            Confirm Booking
          </button>
        </form>
      </motion.div>
    </section>
  );
}
