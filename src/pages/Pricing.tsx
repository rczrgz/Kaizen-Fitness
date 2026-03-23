/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2, Star, Zap, ChevronRight,
  Shield, Clock, ArrowLeft, MapPin, Phone, X,
} from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const plans = [
  {
    id: 'walkin',
    label: 'Walk-In',
    sublabel: 'Day Pass',
    duration: '1 Day',
    regular: 250,
    promo: null as number | null,
    perks: ['1-Day Full Gym Access', 'All Equipment Available', 'Locker Room Access'],
    featured: false,
    // Unsplash gym images — each plan gets a different vibe
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    tag: 'Try it out',
    tagColor: '#6b7280',
  },
  {
    id: '1month',
    label: '1 Month',
    sublabel: 'Monthly',
    duration: '30 Days',
    regular: 2250,
    promo: 1700 as number | null,
    perks: ['2 Free PT Sessions', 'Kaizen Shirt or Shaker', '1 Body Scan', 'Full Gym Access'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80',
    tag: 'Get started',
    tagColor: '#eab308',
  },
  {
    id: '3months',
    label: '3 Months',
    sublabel: 'Quarterly',
    duration: '90 Days',
    regular: 6500,
    promo: 4800 as number | null,
    perks: ['4 Free PT Sessions', 'Kaizen Shirt or Shaker', '1 Body Scan', 'Full Gym Access'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80',
    tag: 'Build habit',
    tagColor: '#eab308',
  },
  {
    id: '6months',
    label: '6 Months',
    sublabel: 'Semi-Annual',
    duration: '180 Days',
    regular: 12000,
    promo: 9000 as number | null,
    perks: ['6 Free PT Sessions', 'Merch Set', '3 Body Scans', 'Nutrition Consult', 'Full Gym Access'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80',
    tag: 'Best Value',
    tagColor: '#eab308',
  },
  {
    id: '12months',
    label: '12 Months',
    sublabel: 'Annual',
    duration: '365 Days',
    regular: 22000,
    promo: 16500 as number | null,
    perks: [
      '8 Free PT Sessions',
      'Full Merch Kit',
      'Quarterly Body Scans',
      'FREE Key Fob Access (₱1,000 Value)',
      'Priority Booking',
      'Full Gym Access',
    ],
    featured: false,
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80',
    tag: 'Go all-in',
    tagColor: '#eab308',
  },
];

const fmt = (n: number) => `₱${n.toLocaleString()}`;

// ─── Detail Modal ─────────────────────────────────────────────────────────────

const PlanModal = ({ plan, onClose }: { plan: typeof plans[0]; onClose: () => void }) => {
  const savings = plan.promo ? plan.regular - plan.promo : 0;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end md:items-center justify-center px-0 md:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Panel */}
        <motion.div
          className="relative z-10 w-full md:max-w-lg bg-[#0a0a0a] border border-gray-800/60 rounded-t-3xl md:rounded-3xl overflow-hidden"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        >
          {/* Image hero */}
          <div className="relative h-48 w-full">
            <img
              src={plan.image}
              alt={plan.label}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0a0a0a]" />

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 border border-white/15 text-white backdrop-blur-md"
            >
              <X size={15} />
            </button>

            {/* Featured badge */}
            {plan.featured && (
              <div className="absolute top-4 left-4 flex items-center gap-1 bg-yellow-500 text-black text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                <Star size={8} fill="black" />
                <span>Best Value</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="px-6 pt-4 pb-8 flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-bold tracking-[0.3em] text-yellow-500 uppercase">{plan.sublabel}</p>
                <h2 className="text-3xl font-black tracking-tighter uppercase italic leading-tight">{plan.label}</h2>
                <div className="mt-1.5 w-8 h-[3px] bg-yellow-500 rounded-full" />
              </div>
              <div className="flex flex-col items-end">
                {plan.promo ? (
                  <>
                    <span className="text-xs text-gray-600 line-through">{fmt(plan.regular)}</span>
                    <span className="text-3xl font-black text-yellow-500 leading-tight">{fmt(plan.promo)}</span>
                  </>
                ) : (
                  <span className="text-3xl font-black text-white leading-tight">{fmt(plan.regular)}</span>
                )}
              </div>
            </div>

            {/* Savings */}
            {savings > 0 && (
              <div
                className="flex items-center gap-2.5 rounded-xl px-4 py-3"
                style={{ background: 'rgba(234,179,8,0.06)', border: '1px solid rgba(234,179,8,0.2)' }}
              >
                <Zap size={13} className="text-yellow-500 flex-shrink-0" />
                <p className="text-xs text-yellow-400 font-bold">
                  Save <span className="text-yellow-300">{fmt(savings)}</span> with the promo price
                </p>
              </div>
            )}

            {/* Perks */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.28em] text-gray-600 uppercase mb-3">What's Included</p>
              <ul className="flex flex-col gap-2.5">
                {plan.perks.map((perk, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 text-sm text-gray-200"
                  >
                    <CheckCircle2 size={14} className="text-yellow-500 flex-shrink-0" />
                    {perk}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <button className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 active:scale-[0.98] text-black font-black uppercase tracking-widest text-sm rounded-xl transition-all duration-200">
              Get This Plan
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Plan Card (grid item) ────────────────────────────────────────────────────

const PlanCard = ({ plan, index, onClick }: { plan: typeof plans[0]; index: number; onClick: () => void }) => {
  const savings = plan.promo ? plan.regular - plan.promo : 0;
  const savingsPct = plan.promo ? Math.round((savings / plan.regular) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.07, type: 'spring', damping: 22 }}
      onClick={onClick}
      className="relative flex flex-col rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        border: plan.featured ? '1px solid rgba(234,179,8,0.6)' : '1px solid rgba(55,65,81,0.4)',
        background: '#0d0d0d',
      }}
    >
      {/* Featured glow top */}
      {plan.featured && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent z-10" />
      )}

      {/* Image */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img
          src={plan.image}
          alt={plan.label}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-black/20 to-transparent" />

        {/* Save pill */}
        {savingsPct > 0 && (
          <div className="absolute top-3 left-3 bg-green-500/20 border border-green-500/30 text-green-400 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
            Save {savingsPct}%
          </div>
        )}

        {/* Best value */}
        {plan.featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-yellow-500 text-black text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
            <Star size={7} fill="black" />
            <span>Best Value</span>
          </div>
        )}

        {/* Duration badge bottom-left of image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1">
          <Clock size={10} className="text-yellow-500" />
          <span className="text-[10px] font-black text-white uppercase tracking-wide">{plan.duration}</span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-3 px-4 py-4">
        {/* Name + tag */}
        <div>
          <div className="flex items-center justify-between mb-0.5">
            <p className="text-lg font-black tracking-tighter uppercase italic leading-tight">{plan.label}</p>
            <span
              className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{
                background: plan.featured ? 'rgba(234,179,8,0.15)' : 'rgba(255,255,255,0.05)',
                color: plan.featured ? '#eab308' : '#9ca3af',
                border: plan.featured ? '1px solid rgba(234,179,8,0.3)' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {plan.tag}
            </span>
          </div>
          <p className="text-[10px] font-bold tracking-widest text-gray-600 uppercase">{plan.sublabel}</p>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            {plan.promo ? (
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-600 line-through leading-none">{fmt(plan.regular)}</span>
                <span className="text-2xl font-black text-yellow-500 leading-tight">{fmt(plan.promo)}</span>
              </div>
            ) : (
              <span className="text-2xl font-black text-white leading-tight">{fmt(plan.regular)}</span>
            )}
          </div>

          {/* View details arrow */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-yellow-500 group-hover:border-yellow-500"
            style={{ border: '1px solid rgba(55,65,81,0.6)' }}
          >
            <ChevronRight size={14} className="text-gray-500 group-hover:text-black transition-colors duration-300" />
          </div>
        </div>

        {/* Perk preview — first 2 only */}
        <div className="flex flex-col gap-1.5 pt-1 border-t border-gray-800/50">
          {plan.perks.slice(0, 2).map((perk, i) => (
            <div key={i} className="flex items-center gap-2 text-[11px] text-gray-500">
              <CheckCircle2 size={11} className="text-yellow-500/70 flex-shrink-0" />
              {perk}
            </div>
          ))}
          {plan.perks.length > 2 && (
            <p className="text-[10px] text-yellow-500/70 font-bold uppercase tracking-wider">
              +{plan.perks.length - 2} more inclusions
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);

  return (
    <div className="min-h-screen bg-[#050505] text-white">

      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-5 py-4 bg-[#050505]/95 backdrop-blur-md border-b border-gray-800/40">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Back</span>
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold tracking-[0.3em] text-yellow-500 uppercase">Kaizen Fitness</span>
          <span className="text-sm font-black tracking-tighter uppercase italic leading-none">Official Rates</span>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-gray-500 text-[11px] font-bold uppercase tracking-wider">
            <Shield size={11} className="text-yellow-500" />
            <span>No Hidden Fees</span>
          </div>
          <div className="w-px h-3 bg-gray-800" />
          <div className="flex items-center gap-1.5 text-gray-500 text-[11px] font-bold uppercase tracking-wider">
            <Zap size={11} className="text-yellow-500" />
            <span>Promo Limited</span>
          </div>
        </div>

        <div className="md:hidden w-16" />
      </header>

      {/* Hero */}
      <div className="relative overflow-hidden px-6 pt-12 pb-8 max-w-6xl mx-auto">
        <p className="absolute inset-0 flex items-center justify-center text-[18vw] font-black text-white/[0.02] tracking-tighter uppercase select-none pointer-events-none leading-none">
          RATES
        </p>
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative flex flex-col gap-3"
        >
          <span className="text-yellow-500 text-xs font-bold tracking-[0.35em] uppercase">Membership Plans</span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">
            Choose Your<br />
            <span className="text-yellow-500">Level</span>
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md mt-1">
            All memberships include full access to Marikina's biggest gym. Tap any plan to see full details.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-gray-500 text-[11px] font-bold uppercase tracking-wider">
              <Shield size={11} className="text-yellow-500" />
              <span>No Hidden Fees</span>
            </div>
            <div className="w-px h-3 bg-gray-800" />
            <div className="flex items-center gap-1.5 text-gray-500 text-[11px] font-bold uppercase tracking-wider">
              <Zap size={11} className="text-yellow-500" />
              <span>Limited Promo Slots</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 px-6 max-w-6xl mx-auto mb-8">
        <div className="flex-1 h-px bg-gray-800" />
        <span className="text-[10px] font-bold tracking-[0.28em] text-gray-600 uppercase">{plans.length} Plans Available</span>
        <div className="flex-1 h-px bg-gray-800" />
      </div>

      {/* 3-column grid */}
      <div className="px-4 md:px-6 pb-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              index={i}
              onClick={() => setSelectedPlan(plan)}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 px-6 py-10 max-w-6xl mx-auto flex flex-col gap-3 items-center text-center">
        <div className="flex items-center gap-2 text-gray-500 text-xs">
          <MapPin size={12} className="text-yellow-500" />
          <span>Marikina City, Philippines</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-xs">
          <Phone size={12} className="text-yellow-500" />
          <span className="font-bold text-yellow-500">0917 312 1166</span>
        </div>
        <p className="text-[11px] text-gray-700 max-w-sm leading-relaxed mt-1">
          Promo prices are limited-time offers and subject to change without prior notice.
        </p>
      </footer>

      {/* Plan detail modal */}
      {selectedPlan && (
        <PlanModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </div>
  );
}