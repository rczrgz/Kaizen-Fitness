/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Dumbbell, Zap, Target, BookOpen } from 'lucide-react';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="flex flex-col gap-2 mb-12">
    {subtitle && <span className="text-yellow-500 text-xs font-bold tracking-[0.3em] uppercase">{subtitle}</span>}
    <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">{children}</h2>
  </div>
);

const CEOCard = ({ name, role, image }: { name: string; role: string; image: string }) => (
  <div className="flex flex-col gap-4 group">
    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-gray-800 group-hover:border-yellow-500 transition-colors">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <div className="flex flex-col">
      <span className="text-xl font-black tracking-tighter uppercase italic">{name}</span>
      <span className="text-xs font-bold tracking-widest text-yellow-500 uppercase">{role}</span>
    </div>
  </div>
);

const team = [
  { name: 'Tristan Birung',         role: 'Founder & Head Coach', image: image1 },
  { name: 'Christian Llyod Birung', role: 'Operations Director',  image: image2 },
  { name: 'Herald Birung',          role: 'Performance Lead',     image: image3 },
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
              Kaizen Fitness Marikina is more than just a gym. We are a community dedicated to the philosophy of continuous improvement. 
              "Kaizen" means change for the better, and we apply this to every workout, every athlete, and every goal.
            </p>
            <p>
              Located in the heart of Marikina, we offer the biggest facility in the area with state-of-the-art equipment for all training styles.
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
            { icon: <Dumbbell />, label: "Biggest Gym" },
            { icon: <Zap />,      label: "HYROX"       },
            { icon: <Target />,   label: "CrossFit"    },
            { icon: <BookOpen />, label: "Coaching"    },
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