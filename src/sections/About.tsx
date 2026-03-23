/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Dumbbell, Zap, Target, BookOpen, X, CheckCircle2 } from 'lucide-react';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="flex flex-col gap-2 mb-12">
    {subtitle && <span className="text-yellow-500 text-xs font-bold tracking-[0.3em] uppercase">{subtitle}</span>}
    <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">{children}</h2>
  </div>
);

type TeamMember = {
  name: string;
  role: string;
  image: string;
  highlights: string[];
};

const CEOCard = ({ name, role, image, highlights }: TeamMember) => {
  const [tapped, setTapped] = useState(false);

  return (
    <>
      {/* Card */}
      <div
        className="flex flex-col gap-4 group"
        onClick={() => setTapped(true)}
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-gray-800 group-hover:border-yellow-500 md:group-hover:border-yellow-500 transition-colors cursor-pointer">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Mobile tap hint badge */}
          <div className="md:hidden absolute bottom-3 right-3 bg-yellow-500/90 text-black text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full">
            Tap to view
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-black tracking-tighter uppercase italic">{name}</span>
          <span className="text-xs font-bold tracking-widest text-yellow-500 uppercase">{role}</span>
        </div>
      </div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {tapped && (
          <motion.div
            className="md:hidden fixed inset-0 z-50 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Blurred backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setTapped(false)}
            />

            {/* Card panel slides up */}
            <motion.div
              className="relative mt-auto bg-[#0d0d0d] border-t border-gray-800 rounded-t-3xl overflow-hidden"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-gray-700" />
              </div>

              {/* Close button */}
              <button
                onClick={() => setTapped(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              {/* Content */}
              <div className="flex gap-5 px-6 pt-4 pb-2 items-start">
                {/* Color photo thumbnail */}
                <div className="w-24 h-28 rounded-xl overflow-hidden border border-yellow-500/40 flex-shrink-0">
                  <img src={image} alt={name} className="w-full h-full object-cover" />
                </div>

                {/* Name + role */}
                <div className="flex flex-col justify-center gap-1 pt-1">
                  <span className="text-2xl font-black tracking-tighter uppercase italic leading-tight">{name}</span>
                  <span className="text-[11px] font-bold tracking-widest text-yellow-500 uppercase">{role}</span>
                  <div className="mt-2 w-8 h-0.5 bg-yellow-500/60 rounded-full" />
                </div>
              </div>

              {/* Highlights */}
              <div className="px-6 pt-4 pb-10">
                <p className="text-[10px] font-bold tracking-[0.25em] text-gray-500 uppercase mb-3">Highlights</p>
                <ul className="flex flex-col gap-3">
                  {highlights.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                      className="flex items-start gap-3 text-sm text-gray-300 leading-snug"
                    >
                      <CheckCircle2 size={15} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const team: TeamMember[] = [
  {
    name: 'Tristan Birung',
    role: 'Founder & Head Coach',
    image: image1,
    highlights: [
      'Founded Kaizen Fitness Marikina in 2024',
      'Certified strength & conditioning specialist with 8+ years of coaching',
      'Led 200+ athletes to their personal bests',
      'Specialist in functional training and HYROX competition prep',
    ],
  },
  {
    name: 'Christian Llyod Birung',
    role: 'Operations Director',
    image: image2,
    highlights: [
      'Oversees day-to-day gym operations and member experience',
      'Scaled facility to the largest in the Marikina area',
      'Expert in fitness business development and community building',
      'Manages partnerships with leading equipment suppliers',
    ],
  },
  {
    name: 'Herald Birung',
    role: 'Performance Lead',
    image: image3,
    highlights: [
      'Designs periodized training programs for all athlete levels',
      'CrossFit Level 2 Trainer with competitive background',
      'Leads group classes, personal training, and athlete assessments',
      'Specialist in mobility, injury prevention, and performance tracking',
    ],
  },
];

export default function About() {
  return (
    <section className="relative min-h-screen py-32 px-6 max-w-7xl mx-auto w-full flex flex-col gap-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <SectionTitle subtitle="Our Story">The Kaizen Way</SectionTitle>
          <div className="flex flex-col gap-6 text-gray-400 leading-relaxed max-w-lg">
            <p>
              Kaizen Fitness Marikina is more than just a gym. We are a community dedicated to the
              philosophy of continuous improvement. "Kaizen" means change for the better, and we apply
              this to every workout, every athlete, and every goal.
            </p>
            <p>
              Located in the heart of Marikina, we offer the biggest facility in the area with
              state-of-the-art equipment for all training styles.
            </p>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-3 text-white">
                <MapPin className="text-yellow-500" size={20} />
                <span className="text-sm font-bold uppercase tracking-wider">Marikina City, Philippines</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Phone className="text-yellow-500" size={20} />
                <span className="text-sm font-bold uppercase tracking-wider">0917 312 1166</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          {[
            { icon: <Dumbbell />, label: 'Biggest Gym' },
            { icon: <Zap />,      label: 'HYROX'       },
            { icon: <Target />,   label: 'CrossFit'    },
            { icon: <BookOpen />, label: 'Coaching'    },
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 border border-gray-800 rounded-3xl flex flex-col gap-4 hover:border-yellow-500 transition-colors group bg-black/40 backdrop-blur-sm"
            >
              <div className="text-yellow-500 group-hover:scale-110 transition-transform">{item.icon}</div>
              <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex flex-col">
        <SectionTitle subtitle="Leadership">Meet the CEOs</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <CEOCard key={member.name} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}