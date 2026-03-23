/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="flex flex-col gap-2 mb-12">
    {subtitle && <span className="text-yellow-500 text-xs font-bold tracking-[0.3em] uppercase">{subtitle}</span>}
    <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">{children}</h2>
  </div>
);

export default function Learn() {
  const trainingStyles = [
    { title: "HYROX", desc: "The world series of fitness racing. Combining running and functional workouts.", color: "bg-yellow-500" },
    { title: "CrossFit", desc: "Constantly varied functional movements performed at high intensity.", color: "bg-white" },
    { title: "Boxing", desc: "Technical striking and high-intensity conditioning for all levels.", color: "bg-gray-800" },
    { title: "Bodybuilding", desc: "Focused hypertrophy training to sculpt and strengthen your physique.", color: "bg-gray-800" },
    { title: "Recovery", desc: "Essential mobility and recovery sessions to keep you performing at your peak.", color: "bg-gray-800" },
    { title: "Nutrition", desc: "Personalized guidance to fuel your body for maximum results.", color: "bg-gray-800" }
  ];

  return (
    <section className="relative min-h-screen py-32 px-6 max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionTitle subtitle="Training Styles">Master Your Craft</SectionTitle>
        <div className="grid md:grid-cols-3 gap-6">
          {trainingStyles.map((style, i) => (
            <div key={i} className="group relative p-10 border border-gray-800 rounded-[2.5rem] overflow-hidden hover:border-transparent transition-all duration-500 bg-black/40 backdrop-blur-sm">
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${style.color === 'bg-yellow-500' ? 'bg-yellow-500' : style.color === 'bg-white' ? 'bg-white' : 'bg-yellow-500'}`} />
              <div className="relative z-10 flex flex-col gap-6 group-hover:text-black transition-colors">
                <h3 className="text-4xl font-black tracking-tighter uppercase italic">{style.title}</h3>
                <p className="text-sm font-medium leading-relaxed opacity-70 group-hover:opacity-100">{style.desc}</p>
                <div className="w-12 h-1 bg-yellow-500 group-hover:bg-black transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
