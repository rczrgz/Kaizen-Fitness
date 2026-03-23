/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'motion/react';
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

/* ─────────────────────────────────────
   Snap-point bottom sheet
───────────────────────────────────────── */
const ProfileSheet = ({ member, onClose }: { member: TeamMember; onClose: () => void }) => {
  const [snap, setSnap] = useState<'half' | 'full'>('half');
  const y = useMotionValue(0);
  const backdropOpacity = useTransform(y, [0, 300], [1, 0]);

  const halfHeight = typeof window !== 'undefined' ? window.innerHeight * 0.52 : 400;
  const fullHeight = typeof window !== 'undefined' ? window.innerHeight - 72 : 700;

  const snapTo = (target: 'half' | 'full' | 'close') => {
    if (target === 'close') {
      animate(y, window.innerHeight, { type: 'spring', damping: 30, stiffness: 300 }).then(onClose);
    } else {
      setSnap(target);
      animate(y, 0, { type: 'spring', damping: 30, stiffness: 300 });
    }
  };

  const handleDragEnd = (_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
    const vy = info.velocity.y;
    const dy = info.offset.y;
    if (snap === 'half') {
      if (dy < -60 || vy < -400) snapTo('full');
      else if (dy > 60 || vy > 400) snapTo('close');
      else snapTo('half');
    } else {
      if (dy > 60 || vy > 400) snapTo('half');
      else snapTo('full');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col justify-end">
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-xl"
          style={{ opacity: backdropOpacity }}
          onClick={() => snap === 'half' ? snapTo('close') : snapTo('half')}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <motion.div
          className="relative z-10 w-full bg-[#0a0a0a] rounded-t-[2rem] overflow-hidden flex flex-col cursor-grab active:cursor-grabbing"
          style={{ height: snap === 'half' ? halfHeight : fullHeight, y }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0.15, bottom: 0.3 }}
          onDragEnd={handleDragEnd}
          initial={{ y: '100%' }}
          animate={{ y: 0, height: snap === 'half' ? halfHeight : fullHeight }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 32, stiffness: 300 }}
        >
          <div className="flex-shrink-0 flex flex-col items-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/25" />
            <p className="text-[10px] font-bold tracking-widest text-gray-600 uppercase mt-1.5">
              {snap === 'half' ? '↑ Drag up for more' : '↓ Drag down to collapse'}
            </p>
          </div>
          <div className="overflow-y-auto flex-1 select-none" style={{ overscrollBehavior: 'contain' }}>
            <div className="relative w-full" style={{ height: '52vw', minHeight: 180, maxHeight: 300 }}>
              <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#0a0a0a]" />
              <button
                onPointerDown={e => e.stopPropagation()}
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/55 border border-white/15 text-white backdrop-blur-sm active:scale-90 transition-transform"
              >
                <X size={14} />
              </button>
            </div>
            <div className="px-6 pt-2 pb-14 flex flex-col gap-5">
              <div>
                <span className="text-[11px] font-bold tracking-[0.3em] text-yellow-500 uppercase">{member.role}</span>
                <h2 className="text-[2.1rem] font-black tracking-tighter uppercase italic text-white leading-[1.05] mt-0.5">{member.name}</h2>
                <div className="mt-2 w-10 h-[3px] bg-yellow-500 rounded-full" />
              </div>
              <p className="text-[15px] text-gray-300 leading-relaxed">{member.bio}</p>
              <div className="flex flex-col gap-3">
                <p className="text-[11px] font-bold tracking-[0.3em] text-gray-500 uppercase">Highlights</p>
                <ul className="flex flex-col gap-3">
                  {member.highlights.map((point, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.07 }} className="flex items-start gap-3 text-[15px] text-gray-200 leading-snug">
                      <CheckCircle2 size={17} className="text-yellow-500 mt-[2px] flex-shrink-0" />
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

/* ─────────────────────────────────────
   Desktop Modal
───────────────────────────────────────── */
const DesktopModal = ({ member, onClose }: { member: TeamMember; onClose: () => void }) => (
  <AnimatePresence>
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-2xl bg-[#0d0d0d] border border-gray-800 rounded-3xl overflow-hidden"
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 280 }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all z-10">
          <X size={16} />
        </button>
        <div className="flex flex-row">
          <div className="relative w-56 flex-shrink-0">
            <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0d0d0d]" />
          </div>
          <div className="flex flex-col gap-5 px-6 pb-10 pt-8">
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
                  <motion.li key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.07 }} className="flex items-start gap-3 text-sm text-gray-300 leading-snug">
                    <CheckCircle2 size={14} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                    {point}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

/* ─────────────────────────────────────
   Desktop Card — grayscale default, color on hover
───────────────────────────────────────── */
const DesktopCard = ({ member, onClick }: { member: TeamMember; onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="hidden md:flex flex-col gap-4 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div
        className="relative aspect-[3/4] overflow-hidden rounded-2xl transition-all duration-300"
        style={{ border: hovered ? '1px solid rgba(234,179,8,0.8)' : '1px solid rgb(31,41,55)' }}
      >
        <img
          src={member.image}
          alt={member.name}
          style={{
            filter: hovered ? 'grayscale(0%)' : 'grayscale(100%)',
            transform: hovered ? 'scale(1)' : 'scale(1.05)',
            transition: 'filter 0.5s ease, transform 0.5s ease',
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top',
          }}
        />
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, black 0%, rgba(0,0,0,0.75) 50%, transparent 100%)',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            transform: hovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.35s ease',
          }}
        >
          <div style={{ padding: '0 20px 24px' }}>
            <p style={{ color: 'rgb(209,213,219)', fontSize: 13, lineHeight: 1.6, marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {member.bio}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgb(234,179,8)', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              <span>View Full Profile</span>
              <ChevronRight size={13} strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-black tracking-tighter uppercase italic">{member.name}</span>
        <span className="text-xs font-bold tracking-widest text-yellow-500 uppercase">{member.role}</span>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────
   Mobile Card — full color, bio + CTA always visible
   Matches the screenshot exactly
───────────────────────────────────────── */
const MobileCard = ({ member, onClick }: { member: TeamMember; onClick: () => void }) => (
  <div
    className="md:hidden flex flex-col gap-3 cursor-pointer"
    onClick={onClick}
  >
    {/* Card with photo + overlay content */}
    <div className="relative rounded-2xl overflow-hidden border border-gray-800">
      {/* Full color photo */}
      <img
        src={member.image}
        alt={member.name}
        className="w-full object-cover object-top"
        style={{ aspectRatio: '3/4' }}
      />

      {/* Strong dark gradient from mid-bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.92) 100%)',
        }}
      />

      {/* Bio + CTA pinned to bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 flex flex-col gap-3">
        <p className="text-[14px] text-gray-100 leading-relaxed">
          {member.bio}
        </p>
        <div className="flex items-center gap-1.5 text-yellow-500 text-[13px] font-black uppercase tracking-widest">
          <span>View Full Profile</span>
          <ChevronRight size={14} strokeWidth={3} />
        </div>
      </div>
    </div>

    {/* Name + role below card */}
    <div>
      <p className="text-xl font-black tracking-tighter uppercase italic leading-tight">{member.name}</p>
      <p className="text-[11px] font-bold tracking-widest text-yellow-500 uppercase mt-0.5">{member.role}</p>
    </div>
  </div>
);

/* ─────────────────────────────────────
   Card wrapper
───────────────────────────────────────── */
const CEOCard = (member: TeamMember) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <MobileCard member={member} onClick={() => setSheetOpen(true)} />
      <DesktopCard member={member} onClick={() => setModalOpen(true)} />
      {sheetOpen && <ProfileSheet member={member} onClose={() => setSheetOpen(false)} />}
      {modalOpen && <DesktopModal member={member} onClose={() => setModalOpen(false)} />}
    </>
  );
};

/* ─────────────────────────────────────
   Data
───────────────────────────────────────── */
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

/* ─────────────────────────────────────
   Page
───────────────────────────────────────── */
export default function About() {
  return (
    <section className="relative min-h-screen py-32 px-6 max-w-7xl mx-auto w-full flex flex-col gap-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <SectionTitle subtitle="Our Story">The Kaizen Way</SectionTitle>
          <div className="flex flex-col gap-6 text-gray-400 leading-relaxed max-w-lg">
            <p>Kaizen Fitness Marikina is more than just a gym. We are a community dedicated to the philosophy of continuous improvement. "Kaizen" means change for the better, and we apply this to every workout, every athlete, and every goal.</p>
            <p>Located in the heart of Marikina, we offer the biggest facility in the area with state-of-the-art equipment for all training styles.</p>
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

        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
          {[
            { icon: <Dumbbell />, label: 'Biggest Gym' },
            { icon: <Zap />,      label: 'HYROX'       },
            { icon: <Target />,   label: 'CrossFit'    },
            { icon: <BookOpen />, label: 'Coaching'    },
          ].map((item, i) => (
            <div key={i} className="p-8 border border-gray-800 rounded-3xl flex flex-col gap-4 hover:border-yellow-500 transition-colors group bg-black/40 backdrop-blur-sm">
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