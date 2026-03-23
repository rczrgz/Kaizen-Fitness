/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Dumbbell, Zap, Target, BookOpen, X, CheckCircle2, ChevronRight } from 'lucide-react';
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
  bio: string;
  highlights: string[];
};

/* ── Modal ── */
const MemberModal = ({ member, onClose }: { member: TeamMember; onClose: () => void }) => (
  <AnimatePresence>
    <motion.div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* 
        Mobile: anchored to bottom, max-height leaves navbar visible at top.
        Desktop: centered with max-width.
      */}
      <motion.div
        className="
          relative w-full bg-[#0d0d0d] border border-gray-800 overflow-hidden
          rounded-t-3xl md:rounded-3xl
          md:max-w-2xl md:mx-4
        "
        style={{
          maxHeight: 'calc(100vh - 72px)', /* 72px = navbar height safe zone */
        }}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 280 }}
      >
        {/* Desktop-only close button */}
        <button
          onClick={onClose}
          className="hidden md:flex absolute top-4 right-4 w-9 h-9 items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all z-10"
        >
          <X size={16} />
        </button>

        {/* Scrollable body */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 72px)' }}>
          <div className="flex flex-col md:flex-row">

            {/* Photo */}
            <div className="relative w-full md:w-56 h-64 md:h-auto flex-shrink-0">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0d0d0d] via-transparent to-transparent" />

              {/* Mobile-only X — top-left of photo */}
              <button
                onClick={onClose}
                className="md:hidden absolute top-4 left-4 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-all backdrop-blur-sm z-10"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-5 px-6 pb-10 pt-5 md:pt-8">
              <div>
                <p className="text-[10px] font-bold tracking-[0.3em] text-yellow-500 uppercase mb-1">{member.role}</p>
                <h3 className="text-3xl font-black tracking-tighter uppercase italic leading-tight">{member.name}</h3>
                <div className="mt-2 w-10 h-0.5 bg-yellow-500 rounded-full" />
              </div>

              <p className="text-sm text-gray-400 leading-relaxed">{member.bio}</p>

              <div>
                <p className="text-[10px] font-bold tracking-[0.25em] text-gray-500 uppercase mb-3">Highlights</p>
                <ul className="flex flex-col gap-2.5">
                  {member.highlights.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.07 }}
                      className="flex items-start gap-3 text-sm text-gray-300 leading-snug"
                    >
                      <CheckCircle2 size={14} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

/* ── Card ── */
const CEOCard = (member: TeamMember) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className="flex flex-col gap-4 group cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-gray-800 group-hover:border-yellow-500 transition-colors duration-300">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
          />

          {/* Hover overlay slides up from bottom */}
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-black via-black/80 to-transparent pt-16 px-5 pb-5 flex flex-col gap-3">
              <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">{member.bio}</p>
              <div className="flex items-center gap-1.5 text-yellow-500 text-xs font-bold uppercase tracking-widest">
                <span>View Full Profile</span>
                <ChevronRight size={12} />
              </div>
            </div>
          </div>

          {/* Mobile tap badge */}
          <div className="md:hidden absolute bottom-3 right-3 bg-yellow-500/90 text-black text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg">
            Tap
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-xl font-black tracking-tighter uppercase italic">{member.name}</span>
          <span className="text-xs font-bold tracking-widest text-yellow-500 uppercase">{member.role}</span>
        </div>
      </div>

      {modalOpen && <MemberModal member={member} onClose={() => setModalOpen(false)} />}
    </>
  );
};

/* ── Data ── */
const team: TeamMember[] = [
  {
    name: 'Tristan Birung',
    role: 'Founder & Head Coach',
    image: image1,
    bio: 'Tristan built Kaizen Fitness from the ground up with one mission: create a space where every athlete, regardless of level, can chase continuous improvement.',
    highlights: [
      'Founded Kaizen Fitness Marikina in 2024',
      'Certified strength & conditioning specialist — 8+ years coaching',
      'Led 200+ athletes to their personal bests',
      'Specialist in HYROX competition prep & functional training',
    ],
  },
  {
    name: 'Christian Llyod Birung',
    role: 'Operations Director',
    image: image2,
    bio: 'Christian keeps every part of the gym running at its best — from member experience to facility management — ensuring Kaizen remains the top training destination in Marikina.',
    highlights: [
      'Scaled facility to the largest gym in the Marikina area',
      'Expert in fitness business development & community building',
      'Oversees member onboarding, retention, and satisfaction',
      'Manages partnerships with leading equipment suppliers',
    ],
  },
  {
    name: 'Herald Birung',
    role: 'Performance Lead',
    image: image3,
    bio: 'Herald designs the systems that make athletes better — from periodized programs to real-time performance tracking, he turns raw effort into measurable results.',
    highlights: [
      'CrossFit Level 2 Trainer with competitive background',
      'Designs periodized programs for all athlete levels',
      'Specialist in mobility, injury prevention & athlete assessment',
      'Leads group classes, personal training & performance reviews',
    ],
  },
];

/* ── Page ── */
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