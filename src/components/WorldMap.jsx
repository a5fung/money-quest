import React from 'react';
import { CheckCircle, ChevronRight, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

const actColors = {
  1: { accent: '#a78bfa', bg: 'from-purple-500/10 to-transparent', border: 'border-purple-400', glow: 'rgba(167,139,250,0.4)' },
  2: { accent: '#60a5fa', bg: 'from-blue-500/10 to-transparent', border: 'border-blue-400', glow: 'rgba(96,165,250,0.4)' },
  3: { accent: '#34d399', bg: 'from-emerald-500/10 to-transparent', border: 'border-emerald-400', glow: 'rgba(52,211,153,0.4)' },
  4: { accent: '#fbbf24', bg: 'from-amber-500/10 to-transparent', border: 'border-amber-400', glow: 'rgba(251,191,36,0.4)' },
};

const acts = [
  { id: 1, name: "AWAKENING", subtitle: "What Money Really Is", levels: [1, 2, 3] },
  { id: 2, name: "BUILDING", subtitle: "Core Money Skills", levels: [4, 5, 6] },
  { id: 3, name: "GROWING", subtitle: "Intermediate Mastery", levels: [7, 8, 9] },
  { id: 4, name: "MASTERY", subtitle: "Philosophy & Freedom", levels: [10, 11, 12] },
];

const WorldMap = ({ data, unlocked, completed }) => {
  const navigate = useNavigate();

  const isCompleted = (id) => completed.includes(id);
  const isUnlocked = (id) => unlocked.includes(id);
  const isNext = (id) => isUnlocked(id) && !isCompleted(id);

  return (
    <div className="min-h-screen bg-[#0a192f] pb-20 pt-8">
      <div className="max-w-2xl mx-auto px-4">
        {acts.map((act, actIndex) => {
          const actLevels = data.filter(l => act.levels.includes(l.id));
          const theme = actColors[act.id];

          return (
            <div key={act.id} className="mb-4">
              {/* ACT HEADER */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: actIndex * 0.1 }}
                className="flex items-center gap-3 mb-6 mt-8"
              >
                <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${theme.accent}66, transparent)` }} />
                <div className="text-center px-4">
                  <div className="text-[10px] font-heading font-bold tracking-[0.3em]" style={{ color: theme.accent }}>ACT {act.id}</div>
                  <div className="text-sm font-heading font-bold text-white uppercase tracking-wider">{act.name}</div>
                  <div className="text-[10px] text-[#8892b0] font-body">{act.subtitle}</div>
                </div>
                <div className="h-px flex-1" style={{ background: `linear-gradient(to left, ${theme.accent}66, transparent)` }} />
              </motion.div>

              {/* LEVELS IN THIS ACT */}
              <div className="relative">
                {actLevels.map((level, i) => {
                  const done = isCompleted(level.id);
                  const open = isUnlocked(level.id);
                  const next = isNext(level.id);
                  const isRight = i % 2 === 1;

                  return (
                    <div key={level.id} className="relative">
                      {/* CONNECTOR LINE */}
                      {i > 0 && (
                        <div className="flex justify-center -my-1">
                          <svg width="2" height="32" className="overflow-visible">
                            <line
                              x1="1" y1="0" x2="1" y2="32"
                              stroke={done || open ? theme.accent : 'rgba(255,255,255,0.1)'}
                              strokeWidth="2"
                              strokeDasharray="4 4"
                              className={done || open ? 'animate-dash' : ''}
                              strokeOpacity={done || open ? 0.5 : 1}
                            />
                          </svg>
                        </div>
                      )}

                      {/* LEVEL NODE */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: actIndex * 0.1 + i * 0.08 }}
                        className={`flex ${isRight ? 'justify-end' : 'justify-start'} md:px-8`}
                      >
                        <button
                          onClick={() => open && navigate(`/level/${level.id}`)}
                          disabled={!open}
                          className={`
                            relative w-full max-w-sm p-5 rounded-2xl border-l-4 border-y border-r transition-all duration-300 text-left
                            flex items-center gap-4 group
                            ${done
                              ? 'bg-emerald-500/5 border-y-emerald-500/20 border-r-emerald-500/20 cursor-pointer hover:bg-emerald-500/10 hover:-translate-y-1 hover:shadow-lg'
                              : next
                                ? 'bg-[#0a192f] border-y-white/10 border-r-white/10 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:scale-[1.02]'
                                : open
                                  ? 'bg-[#0a192f] border-y-white/10 border-r-white/10 cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:scale-[1.02]'
                                  : 'bg-white/[0.02] border-y-white/5 border-r-white/5 cursor-not-allowed opacity-40 grayscale'
                            }
                          `}
                          style={{
                            borderLeftColor: done ? '#34d399' : theme.accent,
                            ...(next ? { '--glow-color': theme.glow } : {}),
                          }}
                        >
                          {/* PULSING GLOW FOR NEXT */}
                          {next && (
                            <div
                              className="absolute inset-0 rounded-2xl animate-pulse-glow pointer-events-none"
                              style={{ '--glow-color': theme.glow }}
                            />
                          )}

                          {/* EMOJI ICON */}
                          <div className={`
                            relative flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl
                            ${done
                              ? 'bg-emerald-500/15'
                              : next
                                ? 'animate-float'
                                : open
                                  ? 'bg-white/5'
                                  : 'bg-white/5'
                            }
                          `}
                            style={!done && open ? { backgroundColor: `${theme.accent}15` } : {}}
                          >
                            {!open ? (
                              <Lock size={20} className="text-[#8892b0]" />
                            ) : (
                              <span>{level.emoji}</span>
                            )}
                            {/* Green check badge for completed */}
                            {done && (
                              <div className="absolute -top-1 -right-1 bg-emerald-500 rounded-full p-0.5">
                                <CheckCircle size={14} className="text-white" />
                              </div>
                            )}
                          </div>

                          {/* TEXT */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono" style={{ color: theme.accent }}>
                                {String(level.id).padStart(2, '0')}
                              </span>
                              <span className={`text-sm font-heading font-bold uppercase tracking-wide truncate ${done ? 'text-emerald-400' : open ? 'text-white' : 'text-[#8892b0]'}`}>
                                {level.title}
                              </span>
                            </div>
                            <p className="text-xs text-[#8892b0] mt-1 leading-relaxed line-clamp-2 font-body">
                              {level.description}
                            </p>
                            {done && <span className="text-[9px] font-mono text-emerald-400/60 mt-1 block">COMPLETED</span>}
                            {next && (
                              <span className="text-[9px] font-heading font-bold mt-1 block tracking-widest" style={{ color: theme.accent }}>
                                ▸ START QUEST
                              </span>
                            )}
                          </div>

                          {/* ARROW */}
                          {open && (
                            <ChevronRight size={16} className={`flex-shrink-0 ${done ? 'text-emerald-400/40' : ''} group-hover:translate-x-1 transition-transform`} style={!done ? { color: theme.accent } : {}} />
                          )}
                        </button>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* BOTTOM SPACER */}
        <div className="h-10" />
      </div>
    </div>
  );
};

export default WorldMap;
