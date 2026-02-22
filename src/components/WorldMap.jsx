import React from 'react';
import { CheckCircle, ChevronRight, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

const actColors = {
  1: {
    accent: '#f472b6', dark: '#831843', mid: '#9d174d',
    gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
    glow: 'rgba(244,114,182,0.6)',
  },
  2: {
    accent: '#38bdf8', dark: '#0c4a6e', mid: '#0369a1',
    gradient: 'linear-gradient(135deg, #38bdf8, #0284c7)',
    glow: 'rgba(56,189,248,0.6)',
  },
  3: {
    accent: '#a3e635', dark: '#365314', mid: '#4d7c0f',
    gradient: 'linear-gradient(135deg, #a3e635, #65a30d)',
    glow: 'rgba(163,230,53,0.6)',
  },
  4: {
    accent: '#fb923c', dark: '#7c2d12', mid: '#c2410c',
    gradient: 'linear-gradient(135deg, #fb923c, #ea580c)',
    glow: 'rgba(251,146,60,0.6)',
  },
};

const acts = [
  { id: 1, name: "AWAKENING", subtitle: "What Money Really Is", levels: [1, 2, 3] },
  { id: 2, name: "BUILDING", subtitle: "Core Money Skills", levels: [4, 5, 6] },
  { id: 3, name: "GROWING", subtitle: "Intermediate Mastery", levels: [7, 8, 9] },
  { id: 4, name: "MASTERY", subtitle: "Philosophy & Freedom", levels: [10, 11, 12] },
];

// Decorative sparkle component
const Sparkle = ({ color, size = 16, className = '' }) => (
  <span
    className={`inline-block animate-twinkle ${className}`}
    style={{ color, fontSize: size, filter: `drop-shadow(0 0 ${size/2}px ${color})`, lineHeight: 1 }}
  >
    ✦
  </span>
);

const WorldMap = ({ data, unlocked, completed }) => {
  const navigate = useNavigate();

  const isCompleted = (id) => completed.includes(id);
  const isUnlocked = (id) => unlocked.includes(id);
  const isNext = (id) => isUnlocked(id) && !isCompleted(id);

  return (
    <div className="min-h-screen pb-20 pt-4 relative overflow-hidden">
      <div className="max-w-2xl mx-auto px-4 relative z-10">
        {acts.map((act, actIndex) => {
          const actLevels = data.filter(l => act.levels.includes(l.id));
          const theme = actColors[act.id];

          return (
            <div key={act.id} className="mb-10 relative">
              {/* Big soft glow behind each act */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[110%] h-full rounded-[40px] pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at center, ${theme.accent}18, transparent 70%)`,
                }}
              />

              {/* ACT HEADER — manga-style diagonal banner */}
              <motion.div
                initial={{ opacity: 0, x: -60, rotate: -5 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ delay: actIndex * 0.15, type: 'spring', stiffness: 120 }}
                className="mb-6 mt-8 relative"
              >
                <div className="relative">
                  {/* Banner shape */}
                  <div
                    className="relative px-6 py-4 overflow-hidden"
                    style={{
                      background: theme.gradient,
                      clipPath: 'polygon(0 0, 100% 0, 96% 100%, 2% 100%)',
                      border: 'none',
                    }}
                  >
                    {/* Speed lines inside banner */}
                    <div className="absolute inset-0 opacity-[0.12]" style={{
                      backgroundImage: 'repeating-linear-gradient(-30deg, transparent, transparent 6px, white 6px, white 7px)',
                    }} />
                    {/* Starburst decoration */}
                    <div
                      className="absolute -right-4 -top-4 w-24 h-24 opacity-20"
                      style={{
                        background: `radial-gradient(circle, white 0%, transparent 70%)`,
                      }}
                    />

                    <div className="flex items-center gap-4 relative z-10">
                      {/* Act number — big bold circle */}
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center font-anime text-3xl text-black flex-shrink-0"
                        style={{
                          background: '#fff',
                          boxShadow: '3px 3px 0 rgba(0,0,0,0.4)',
                        }}
                      >
                        {act.id}
                      </div>
                      <div>
                        <div className="font-anime text-2xl md:text-3xl text-white tracking-wider" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.4)' }}>
                          {act.name}
                        </div>
                        <div className="text-xs text-white/80 font-body font-bold tracking-wide">{act.subtitle}</div>
                      </div>
                      {/* Decorative sparkles */}
                      <div className="ml-auto flex gap-2">
                        <Sparkle color="#fff" size={20} />
                        <Sparkle color="#fff" size={14} className="animate-twinkle-delay" />
                      </div>
                    </div>
                  </div>
                  {/* Shadow bar underneath */}
                  <div className="h-2 mx-2" style={{
                    background: theme.dark,
                    clipPath: 'polygon(1% 0, 99% 0, 97% 100%, 3% 100%)',
                  }} />
                </div>
              </motion.div>

              {/* LEVELS */}
              <div className="relative pl-8">
                {/* Vertical connector rail */}
                <div
                  className="absolute left-[30px] top-0 bottom-0 w-1 rounded-full"
                  style={{ background: `linear-gradient(to bottom, ${theme.accent}60, ${theme.accent}10)` }}
                />

                {actLevels.map((level, i) => {
                  const done = isCompleted(level.id);
                  const open = isUnlocked(level.id);
                  const next = isNext(level.id);

                  return (
                    <motion.div
                      key={level.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: actIndex * 0.15 + i * 0.1, type: 'spring', stiffness: 100 }}
                      className="relative mb-4"
                    >
                      {/* Node dot on the rail */}
                      <div
                        className="absolute -left-[13px] top-6 w-7 h-7 rounded-full flex items-center justify-center z-10"
                        style={{
                          background: done ? '#22c55e' : open ? theme.accent : '#444',
                          border: '3px solid #000',
                          boxShadow: (next || done) ? `0 0 12px ${done ? 'rgba(34,197,94,0.6)' : theme.glow}` : 'none',
                        }}
                      >
                        {done ? (
                          <CheckCircle size={14} className="text-white" />
                        ) : open ? (
                          <span className="text-black font-bold text-[10px]">{level.id}</span>
                        ) : (
                          <Lock size={10} className="text-gray-600" />
                        )}
                      </div>

                      {/* CARD */}
                      <button
                        onClick={() => open && navigate(`/level/${level.id}`)}
                        disabled={!open}
                        className={`
                          relative w-full ml-6 p-4 text-left flex items-center gap-4 group transition-all duration-200 rounded-lg
                          ${!open ? 'cursor-not-allowed opacity-20' : 'cursor-pointer'}
                        `}
                        style={{
                          background: !open
                            ? '#1a1a2e'
                            : done
                              ? 'linear-gradient(135deg, #14532d, #166534)'
                              : next
                                ? `linear-gradient(135deg, ${theme.dark}, ${theme.mid})`
                                : `linear-gradient(135deg, ${theme.dark}cc, ${theme.dark})`,
                          border: !open
                            ? '2px solid #333'
                            : done
                              ? '3px solid #22c55e'
                              : next
                                ? `3px solid ${theme.accent}`
                                : `2px solid ${theme.accent}50`,
                          boxShadow: next
                            ? `4px 4px 0 #000, 0 0 30px ${theme.accent}40`
                            : done
                              ? '3px 3px 0 #000, 0 0 20px rgba(34,197,94,0.3)'
                              : open
                                ? '3px 3px 0 #000'
                                : 'none',
                          ...(next ? { '--glow-color': theme.glow } : {}),
                        }}
                        onMouseEnter={(e) => {
                          if (!open) return;
                          e.currentTarget.style.transform = 'translateX(8px) scale(1.03)';
                          e.currentTarget.style.boxShadow = `6px 6px 0 #000, 0 0 40px ${done ? 'rgba(34,197,94,0.5)' : theme.glow}`;
                        }}
                        onMouseLeave={(e) => {
                          if (!open) return;
                          e.currentTarget.style.transform = '';
                          e.currentTarget.style.boxShadow = next
                            ? `4px 4px 0 #000, 0 0 30px ${theme.accent}40`
                            : done
                              ? '3px 3px 0 #000, 0 0 20px rgba(34,197,94,0.3)'
                              : '3px 3px 0 #000';
                        }}
                      >
                        {/* Pulse glow on next */}
                        {next && (
                          <div className="absolute inset-0 rounded-lg animate-pulse-glow pointer-events-none" style={{ '--glow-color': theme.glow }} />
                        )}

                        {/* Emoji — big and bouncy */}
                        <div className={`text-3xl flex-shrink-0 ${next ? 'animate-float' : ''} ${done ? '' : ''}`}
                          style={{ filter: open ? `drop-shadow(0 0 8px ${done ? 'rgba(34,197,94,0.5)' : theme.glow})` : 'grayscale(1)' }}
                        >
                          {open ? level.emoji : '🔒'}
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <span className={`text-sm font-heading font-bold uppercase tracking-wide block truncate ${done ? 'text-green-300' : 'text-white'}`}>
                            {level.title}
                          </span>
                          <p className="text-xs text-white/60 mt-0.5 leading-relaxed line-clamp-1 font-body">
                            {level.description}
                          </p>
                          {done && <span className="text-[10px] font-anime text-green-400 mt-0.5 block tracking-wider">COMPLETED ✓</span>}
                          {next && (
                            <span className="text-[10px] font-anime mt-0.5 block tracking-wider" style={{ color: theme.accent }}>
                              ▸ START QUEST!
                            </span>
                          )}
                        </div>

                        {/* Arrow */}
                        {open && (
                          <ChevronRight size={20} className="flex-shrink-0 group-hover:translate-x-2 transition-transform" style={{ color: done ? '#22c55e' : theme.accent }} />
                        )}

                        {/* Corner sparkle on next card */}
                        {next && (
                          <div className="absolute -top-2 -right-2">
                            <Sparkle color={theme.accent} size={22} />
                          </div>
                        )}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="h-10" />
      </div>
    </div>
  );
};

export default WorldMap;
