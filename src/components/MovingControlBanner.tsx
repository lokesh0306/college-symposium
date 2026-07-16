/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, useAnimationControls } from 'motion/react';
import { Play, Pause, ChevronRight, ChevronLeft, Sliders, Sparkles } from 'lucide-react';

export default function MovingControlBanner() {
  const [speed, setSpeed] = useState<number>(35); // Lower is faster animation duration
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [showControls, setShowControls] = useState<boolean>(false);

  const bannerItems = [
    '🔥 National Level Technical Symposium - College Symposium 2026',
    '🏆 Mega Prize Pool of over ₹1,00,000!',
    '⏳ Early bird registration valid till August 31, 2026',
    '💻 WebCraft Frontend Challenge: Only 12 slots left!',
    '🤖 AI-Powered Web Apps Hackathon: Integrate Gemini API!',
    '🚀 8+ web and design tracks to compete',
    '🎓 Certificate of participation to all registered students',
  ];

  // Repeat the items list to ensure smooth continuous marquee
  const repeatedItems = [...bannerItems, ...bannerItems, ...bannerItems];

  return (
    <div className="relative w-full bg-slate-900 border-b border-indigo-500/20 py-3 overflow-hidden select-none">
      <div className="flex items-center justify-between px-4 mx-auto max-w-7xl">
        {/* Banner Section */}
        <div className="relative flex-1 overflow-hidden h-6 flex items-center">
          <motion.div
            className="flex whitespace-nowrap gap-12 text-sm font-medium tracking-wide text-indigo-200"
            animate={{
              x: direction === 'left' ? [0, -1500] : [-1500, 0],
            }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: isPaused ? 0 : speed,
              repeatType: 'loop',
            }}
            style={{
              cursor: 'grab',
            }}
            whileTap={{ cursor: 'grabbing' }}
          >
            {repeatedItems.map((item, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Action Toggle controls */}
        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={() => setShowControls(!showControls)}
            id="btn-marquee-controls"
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-indigo-200 bg-indigo-950/80 border border-indigo-500/30 rounded-full hover:bg-indigo-900 transition-colors cursor-pointer"
            title="Adjust Moving Control Speed & Direction"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Moving Controls</span>
          </button>
        </div>
      </div>

      {/* Speed & Direction Controller Panel */}
      {showControls && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-950/95 border-t border-indigo-500/20 px-6 py-4 flex flex-wrap gap-6 items-center justify-between text-slate-200 mt-2"
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Movement Status:</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${isPaused ? 'bg-red-500/15 text-red-400 border border-red-500/30' : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'}`}>
              {isPaused ? 'Paused' : 'Moving'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {/* Speed Control Slider */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-medium">Animation Speed:</span>
              <input
                type="range"
                min="10"
                max="80"
                value={90 - speed} // invert so higher is faster
                onChange={(e) => setSpeed(90 - Number(e.target.value))}
                className="w-32 h-1 bg-indigo-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <span className="text-xs font-mono text-indigo-400">{Math.round((90 - speed) / 10)}x</span>
            </div>

            {/* Play/Pause Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPaused(!isPaused)}
                id="btn-marquee-pause"
                className="p-1.5 bg-slate-800 hover:bg-indigo-900 border border-slate-700 hover:border-indigo-500/50 rounded text-slate-200 transition-all cursor-pointer"
                title={isPaused ? "Resume Movement" : "Pause Movement"}
              >
                {isPaused ? <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" /> : <Pause className="w-4 h-4 text-slate-300" />}
              </button>

              {/* Direction controls */}
              <button
                onClick={() => setDirection(direction === 'left' ? 'right' : 'left')}
                id="btn-marquee-direction"
                className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-indigo-900 border border-slate-700 hover:border-indigo-500/50 rounded text-xs text-slate-200 transition-all cursor-pointer"
                title="Change Moving Direction"
              >
                {direction === 'left' ? (
                  <>
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>To Right</span>
                  </>
                ) : (
                  <>
                    <span>To Left</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
