import React, { useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Trophy, XCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars

const actColorMap = {
  1: { accent: '#f472b6', dark: '#831843', mid: '#9d174d', gradient: 'from-pink-500 to-rose-600', glow: 'rgba(244,114,182,0.5)' },
  2: { accent: '#38bdf8', dark: '#0c4a6e', mid: '#0369a1', gradient: 'from-sky-400 to-blue-600', glow: 'rgba(56,189,248,0.5)' },
  3: { accent: '#a3e635', dark: '#365314', mid: '#4d7c0f', gradient: 'from-lime-400 to-green-600', glow: 'rgba(163,230,53,0.5)' },
  4: { accent: '#fb923c', dark: '#7c2d12', mid: '#c2410c', gradient: 'from-orange-400 to-red-500', glow: 'rgba(251,146,60,0.5)' },
};

const confettiColors = ['#f472b6', '#38bdf8', '#a3e635', '#fb923c', '#c084fc', '#fbbf24', '#22d3ee', '#f43f5e'];

const generateConfettiPieces = () =>
  Array.from({ length: 35 }, (_, i) => ({
    id: i,
    left: `${(((i * 17 + 7) % 35) / 35) * 100}%`,
    delay: `${(i % 7) * 0.07}s`,
    duration: `${1 + (i % 4) * 0.35}s`,
    color: confettiColors[i % confettiColors.length],
    size: 8 + (i % 5) * 3,
    rotation: (i * 30) % 360,
    borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '2px' : '0',
  }));

const confettiPieces = generateConfettiPieces();

const ConfettiBurst = () => (
  <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
    {confettiPieces.map((p) => (
      <div key={p.id} className="absolute top-0 animate-confetti"
        style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }}>
        <div style={{ width: p.size, height: p.size, backgroundColor: p.color, borderRadius: p.borderRadius, transform: `rotate(${p.rotation}deg)` }} />
      </div>
    ))}
  </div>
);

const staggerChild = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

const LevelPlayer = ({ data, onComplete, completed }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const level = data.find(l => l.id === parseInt(id));
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(null);
  const quizRef = useRef(null);

  const alreadyCompleted = completed.includes(parseInt(id));

  if (!level) return <div className="text-white p-20 text-center font-anime text-4xl">QUEST NOT FOUND!</div>;

  const totalLevels = data.length;
  const theme = actColorMap[level.act] || actColorMap[1];

  const handleAnswer = (opt, index) => {
    if (showSuccess || selectedAnswer !== null) return;
    if (opt.correct) {
      setSelectedAnswer(index);
      setShowSuccess(true);
      setShowConfetti(true);
      onComplete(level.id);
      setTimeout(() => setShowConfetti(false), 2500);
    } else {
      setWrongAnswer(index);
      setTimeout(() => setWrongAnswer(null), 1500);
    }
  };

  const handleNext = () => {
    const nextId = level.id + 1;
    if (data.find(l => l.id === nextId)) navigate(`/level/${nextId}`);
    else navigate('/');
  };

  return (
    <div className="min-h-screen text-white pb-20 relative z-10">
      {showConfetti && <ConfettiBurst />}

      {/* NAV — colored diagonal bar */}
      <nav className="sticky top-0 z-[100] overflow-hidden">
        <div
          className="px-6 py-3 relative"
          style={{
            background: `linear-gradient(135deg, ${theme.dark}, ${theme.mid})`,
          }}
        >
          {/* Speed lines */}
          <div className="absolute inset-0 opacity-[0.08]" style={{
            backgroundImage: 'repeating-linear-gradient(-30deg, transparent, transparent 8px, white 8px, white 9px)',
          }} />
          <div className="max-w-4xl mx-auto flex justify-between items-center relative z-10">
            <Link to="/" className="font-heading text-xs tracking-widest flex items-center hover:scale-105 transition-transform py-1 font-bold" style={{ color: theme.accent }}>
              <ArrowLeft size={16} className="mr-2" /> BACK TO MAP
            </Link>
            <span
              className="font-anime text-sm tracking-wider px-3 py-1"
              style={{ background: theme.accent, color: '#000', boxShadow: '2px 2px 0 #000', borderRadius: '2px' }}
            >
              LEVEL {level.id} / {totalLevels}
            </span>
          </div>
        </div>
        {/* Jagged bottom */}
        <div style={{
          height: '8px',
          background: `linear-gradient(135deg, ${theme.dark}, ${theme.mid})`,
          clipPath: 'polygon(0 0, 4% 100%, 8% 0, 12% 100%, 16% 0, 20% 100%, 24% 0, 28% 100%, 32% 0, 36% 100%, 40% 0, 44% 100%, 48% 0, 52% 100%, 56% 0, 60% 100%, 64% 0, 68% 100%, 72% 0, 76% 100%, 80% 0, 84% 100%, 88% 0, 92% 100%, 96% 0, 100% 100%)',
        }} />
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-10">
        {/* LEVEL HEADER — manga style */}
        <motion.div custom={0} initial="hidden" animate="visible" variants={staggerChild}>
          <div
            className="inline-block px-5 py-2 font-anime text-lg tracking-wider mb-4"
            style={{
              background: theme.accent,
              color: '#000',
              boxShadow: '3px 3px 0 #000',
              clipPath: 'polygon(2% 0, 100% 0, 98% 100%, 0% 100%)',
            }}
          >
            ACT {level.act} — {level.actName}
          </div>
        </motion.div>

        <motion.div custom={0} initial="hidden" animate="visible" variants={staggerChild}
          className="flex items-center gap-4 mb-3"
        >
          <span className="text-6xl drop-shadow-lg" style={{ filter: `drop-shadow(0 0 15px ${theme.glow})` }}>
            {level.emoji}
          </span>
          <h1
            className="font-anime text-5xl md:text-6xl text-white uppercase tracking-wider"
            style={{ textShadow: `3px 3px 0 #000, 0 0 30px ${theme.accent}60` }}
          >
            {level.title}
          </h1>
        </motion.div>
        <motion.p custom={1} initial="hidden" animate="visible" variants={staggerChild}
          className="text-white/70 text-base font-body mb-10 ml-1"
        >
          {level.description}
        </motion.p>

        {/* PROGRESS BAR — thick manga-style */}
        <motion.div custom={1} initial="hidden" animate="visible" variants={staggerChild} className="mb-10">
          <div className="flex justify-between text-xs font-anime tracking-wider mb-2" style={{ color: theme.accent }}>
            <span>PROGRESS</span>
            <span>{level.id}/{totalLevels}</span>
          </div>
          <div className="h-5 rounded-sm overflow-hidden" style={{ background: '#1a1a2e', border: '3px solid #000', boxShadow: '2px 2px 0 #000' }}>
            <motion.div
              className={`h-full bg-gradient-to-r ${theme.gradient}`}
              initial={{ width: 0 }}
              animate={{ width: `${(level.id / totalLevels) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ boxShadow: `0 0 15px ${theme.glow}` }}
            />
          </div>
        </motion.div>

        {/* VIDEO */}
        <motion.div custom={2} initial="hidden" animate="visible" variants={staggerChild}
          className="mb-12 rounded-lg overflow-hidden bg-black aspect-video"
          style={{ border: `4px solid ${theme.accent}`, boxShadow: `5px 5px 0 #000, 0 0 30px ${theme.accent}25` }}
        >
          <iframe
            width="100%" height="100%" src={level.content.videoUrl} frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>

        {/* ARTICLE — manga panel style */}
        <motion.div custom={3} initial="hidden" animate="visible" variants={staggerChild}
          className="mb-14 rounded-lg p-6 md:p-8 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${theme.dark}, ${theme.mid}80)`,
            border: `4px solid ${theme.accent}`,
            boxShadow: `5px 5px 0 #000`,
          }}
        >
          {/* Corner decoration */}
          <div className="absolute top-3 right-3 text-2xl opacity-30 animate-twinkle" style={{ color: theme.accent }}>✦</div>

          <div className="prose prose-invert max-w-none prose-headings:font-heading prose-headings:uppercase prose-headings:tracking-tight prose-headings:font-bold prose-strong:text-white prose-p:leading-relaxed prose-p:text-white/90 prose-p:font-body prose-li:text-white/90 prose-ul:my-4 prose-li:my-1">
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2
                    className="font-anime text-2xl tracking-wider mt-8 mb-4"
                    style={{ color: theme.accent, textShadow: `0 0 15px ${theme.accent}40` }}
                  >
                    {children}
                  </h2>
                ),
              }}
            >
              {level.content.article}
            </ReactMarkdown>
          </div>
        </motion.div>

        {/* QUIZ — big bold panel */}
        <motion.div custom={4} initial="hidden" animate="visible" variants={staggerChild}
          ref={quizRef} id="quiz"
          className="rounded-lg p-6 md:p-8 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${theme.dark}, #0f0a1a)`,
            border: `4px solid ${theme.accent}`,
            boxShadow: `5px 5px 0 #000, 0 0 40px ${theme.accent}15`,
          }}
        >
          {/* Speed lines bg */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: 'repeating-linear-gradient(-30deg, transparent, transparent 10px, white 10px, white 11px)',
          }} />

          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="p-2.5 rounded" style={{ background: theme.accent, boxShadow: '2px 2px 0 #000' }}>
              <Trophy size={22} className="text-black" />
            </div>
            <h3 className="font-anime text-2xl text-white uppercase tracking-wider" style={{ textShadow: '2px 2px 0 #000' }}>
              Quest Challenge
            </h3>
            {alreadyCompleted && !showSuccess && (
              <span className="text-[10px] font-anime ml-auto tracking-wider" style={{ color: theme.accent }}>COMPLETED</span>
            )}
          </div>

          <p className="text-lg mb-8 text-white font-body italic leading-relaxed relative z-10">{level.content.challenge.question}</p>

          <div className="grid gap-3 relative z-10">
            {level.content.challenge.options.map((opt, i) => {
              const isCorrectSelected = selectedAnswer === i;
              const isWrong = wrongAnswer === i;

              return (
                <motion.button
                  key={i}
                  onClick={() => handleAnswer(opt, i)}
                  disabled={showSuccess}
                  animate={isWrong ? { x: [0, -15, 15, -10, 10, 0], rotate: [0, -3, 3, -2, 2, 0] } : {}}
                  transition={{ duration: 0.5 }}
                  className={`
                    w-full text-left p-4 rounded-lg transition-all duration-200 flex items-center group font-body relative overflow-hidden
                    ${showSuccess && !isCorrectSelected ? 'opacity-30' : ''}
                  `}
                  style={{
                    background: isCorrectSelected
                      ? 'linear-gradient(135deg, #166534, #14532d)'
                      : isWrong
                        ? 'linear-gradient(135deg, #991b1b, #7f1d1d)'
                        : '#1a1a2e',
                    border: isCorrectSelected
                      ? '3px solid #22c55e'
                      : isWrong
                        ? '3px solid #ef4444'
                        : showSuccess
                          ? '2px solid #333'
                          : '3px solid #333',
                    boxShadow: isCorrectSelected
                      ? '3px 3px 0 #000, 0 0 25px rgba(34,197,94,0.4)'
                      : isWrong
                        ? '3px 3px 0 #000, 0 0 25px rgba(239,68,68,0.4)'
                        : '2px 2px 0 #000',
                    cursor: showSuccess ? 'default' : 'pointer',
                  }}
                  whileHover={!showSuccess && !isCorrectSelected && !isWrong ? {
                    scale: 1.03,
                    x: 6,
                    borderColor: theme.accent,
                    boxShadow: `4px 4px 0 #000, 0 0 20px ${theme.glow}`,
                  } : {}}
                >
                  {/* Left accent bar on hover */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-200 group-hover:w-1.5"
                    style={{
                      background: isCorrectSelected ? '#22c55e' : isWrong ? '#ef4444' : showSuccess ? 'transparent' : theme.accent,
                      opacity: isCorrectSelected || isWrong ? 1 : 0.5,
                    }}
                  />

                  <span
                    className={`mr-4 font-anime text-xl tracking-wider ${!showSuccess && 'group-hover:scale-125'} transition-transform`}
                    style={{ color: isWrong ? '#ef4444' : isCorrectSelected ? '#22c55e' : theme.accent }}
                  >
                    {i + 1}
                  </span>
                  <span className={`flex-1 ${isCorrectSelected ? 'text-green-200' : isWrong ? 'text-red-200' : 'text-white/90'}`}>
                    {opt.text}
                  </span>
                  {isCorrectSelected && <CheckCircle size={22} className="text-green-400 ml-2 flex-shrink-0" />}
                  {isWrong && <XCircle size={22} className="text-red-400 ml-2 flex-shrink-0" />}
                </motion.button>
              );
            })}
          </div>

          {/* WRONG — big manga impact */}
          <AnimatePresence>
            {wrongAnswer !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="mt-5 p-5 rounded-lg text-center font-anime text-2xl tracking-wider relative z-10"
                style={{
                  background: 'linear-gradient(135deg, #991b1b, #7f1d1d)',
                  border: '4px solid #ef4444',
                  boxShadow: '4px 4px 0 #000, 0 0 30px rgba(239,68,68,0.4)',
                  color: '#fca5a5',
                }}
              >
                💢 WRONG! TRY AGAIN! 💢
              </motion.div>
            )}
          </AnimatePresence>

          {/* SUCCESS — explosion style */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 150, damping: 10 }}
                className={`mt-8 p-8 rounded-lg flex flex-col items-center bg-gradient-to-br ${theme.gradient} text-white relative overflow-hidden`}
                style={{
                  border: '5px solid #fff',
                  boxShadow: `6px 6px 0 #000, 0 0 80px ${theme.glow}`,
                }}
              >
                {/* Starburst bg */}
                <div className="absolute inset-0 opacity-[0.1]" style={{
                  backgroundImage: 'repeating-conic-gradient(transparent 0deg, transparent 10deg, white 10deg, white 12deg)',
                  backgroundPosition: 'center',
                }} />

                <motion.span
                  className="text-7xl mb-3 relative z-10"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  🎉✨⭐
                </motion.span>
                <h4
                  className="font-anime text-4xl uppercase tracking-wider relative z-10"
                  style={{ textShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}
                >
                  QUEST COMPLETE!
                </h4>
                <p className="font-body text-base opacity-90 mt-2 mb-6 relative z-10">
                  {level.id < totalLevels ? 'Next quest unlocked! ✨' : 'You are a MONEY MASTER! 🎉✨⭐'}
                </p>

                <motion.button
                  onClick={handleNext}
                  className="px-10 py-4 font-anime text-xl tracking-wider text-black hover:scale-110 transition-all relative z-10"
                  whileHover={{ rotate: [0, -2, 2, 0] }}
                  style={{
                    background: '#fff',
                    border: '4px solid #000',
                    boxShadow: '4px 4px 0 #000',
                    clipPath: 'polygon(2% 0, 100% 0, 98% 100%, 0% 100%)',
                  }}
                >
                  {level.id < totalLevels ? `NEXT QUEST →` : 'RETURN TO MAP →'}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default LevelPlayer;
