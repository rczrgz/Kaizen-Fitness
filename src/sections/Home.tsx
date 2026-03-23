/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, ChevronRight } from 'lucide-react';

export default function Home() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col justify-between py-32 px-6 max-w-7xl mx-auto w-full pointer-events-none">
      <div className="flex flex-col gap-4 max-w-md pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 text-gray-400"
        >
          <div className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center">
            <Play size={16} fill="currentColor" />
          </div>
          <span className="text-xs font-bold tracking-widest uppercase">Promotion video</span>
        </motion.div>

        {/* Facebook Reel Embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative w-full max-w-sm rounded-lg overflow-hidden border border-gray-800 bg-gray-900"
          style={{ aspectRatio: '560/314' }}
        >
          {!videoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <Play size={32} className="text-yellow-500" />
                <span className="text-xs tracking-widest uppercase">Loading video...</span>
              </div>
            </div>
          )}
          <iframe
            src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F768450742351688%2F&show_text=false&width=560&t=0"
            width="100%"
            height="100%"
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            onLoad={() => setVideoLoaded(true)}
          />
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row items-end justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-2 pointer-events-auto"
        >
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-black tracking-tighter text-yellow-500">₱16,500</span>
            <span className="text-gray-500 line-through text-xl">₱22,000</span>
          </div>
          <div className="flex flex-col text-xs font-bold tracking-widest text-gray-500 uppercase">
            <span>MEMBERSHIP • MONTHLY</span>
            <span>ALL ACCESS • MARIKINA</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex-1 flex justify-center pointer-events-auto"
        >
          <button
            onClick={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-12 py-5 bg-yellow-500 text-black font-black uppercase tracking-widest overflow-hidden transition-transform hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              JOIN THE TRIBE <ChevronRight size={20} />
            </span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-4 pointer-events-auto"
        >
          <button className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all">
            <ChevronRight size={24} className="rotate-180" />
          </button>
          <button className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all">
            <ChevronRight size={24} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}