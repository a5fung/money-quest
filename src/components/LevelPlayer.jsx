import React, { useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Trophy, XCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars

const actColorMap = {
  1: { accent: '#a78bfa', gradient: 'from-purple-500 to-violet-600' },
  2: { accent: '#60a5fa', gradient: 'from-blue-500 to-cyan-500' },
  3: { accent: '#34d399', gradient: 'from-emerald-500 to-teal-500' },
  4: { accent: '#fbbf24', gradient: 'from-amber-400 to-orange-500' },
};

const confettiColors = ['#a78bfa', '#60a5fa', '#34d399', '#fbbf24', '#ff6b6b', '#f472b6', '#818cf8', '#fb923c'];

// Pre-generate confetti data outside render to avoid impure Math.random calls
const generateConfettiPieces = () =>
  Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: `${(((i * 17 + 7) % 24) / 24) * 100}%`,
    delay: `${(i % 5) * 0.1}s`,
    duration: `${1 + (i % 3) * 0.4}s`,
    color: confettiColors[i % confettiColors.length],
    size: 6 + (i % 4) * 2,
    rotation: (i * 30) % 360,
    borderRadius: i % 2 === 0 ? '50%' : '2px',
  }));

const confettiPieces = generateConfettiPieces();

const ConfettiBurst = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      {confettiPieces.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 animate-confetti"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        >
          <div
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.borderRadius,
              transform: `rotate(${p.rotation}deg)`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

const staggerChild = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' },
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

  if (!level) return <div className="text-white p-20 text-center font-heading">QUEST NOT FOUND</div>;

  const totalLevels = data.length;
  const theme = actColorMap[level.act] || actColorMap[1];

  const handleAnswer = (opt, index) => {
    if (showSuccess || selectedAnswer !== null) return;

    if (opt.correct) {
      setSelectedAnswer(index);
      setShowSuccess(true);
      setShowConfetti(true);
      onComplete(level.id);
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      setWrongAnswer(index);
      setTimeout(() => setWrongAnswer(null), 1500);
    }
  };

  const handleNext = () => {
    const nextId = level.id + 1;
    if (data.find(l => l.id === nextId)) {
      navigate(`/level/${nextId}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-[#ccd6f6] pb-20">
      {showConfetti && <ConfettiBurst />}

      {/* NAVIGATION BAR */}
      <nav className="border-b border-white/10 bg-[#0a192f]/90 backdrop-blur-md sticky top-0 z-[100] h-14">
        <div className="max-w-4xl mx-auto px-6 h-full flex justify-between items-center">
          <Link
            to="/"
            className="font-heading text-xs tracking-widest flex items-center hover:text-white transition-colors py-2"
            style={{ color: theme.accent }}
          >
            <ArrowLeft size={16} className="mr-2" /> BACK TO MAP
          </Link>

          <span className="font-mono text-[10px] text-[#8892b0]">
            LEVEL {level.id} OF {totalLevels}
          </span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-12">
        {/* LEVEL HEADER */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={staggerChild}
          className="mb-2"
        >
          <span className="text-[10px] font-heading font-bold tracking-[0.3em]" style={{ color: theme.accent }}>
            ACT {level.act} // {level.actName}
          </span>
        </motion.div>
        <motion.h1
          custom={0}
          initial="hidden"
          animate="visible"
          variants={staggerChild}
          className="text-4xl md:text-5xl font-heading font-bold text-white uppercase tracking-tight mb-2 flex items-center gap-3"
        >
          <span className="text-3xl md:text-4xl">{level.emoji}</span>
          {level.title}
        </motion.h1>
        <motion.p
          custom={1}
          initial="hidden"
          animate="visible"
          variants={staggerChild}
          className="text-[#8892b0] text-sm font-body mb-10"
        >
          {level.description}
        </motion.p>

        {/* PROGRESS BAR */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={staggerChild}
          className="mb-10"
        >
          <div className="flex justify-between text-[10px] font-mono text-[#8892b0] mb-2">
            <span>PROGRESS</span>
            <span>{level.id}/{totalLevels}</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${theme.gradient}`}
              initial={{ width: 0 }}
              animate={{ width: `${(level.id / totalLevels) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* VIDEO */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={staggerChild}
          className="mb-12 rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl aspect-video"
        >
          <iframe
            width="100%"
            height="100%"
            src={level.content.videoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>

        {/* ARTICLE */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={staggerChild}
          className="mb-16 bg-[#112240]/50 rounded-2xl p-6 md:p-8 border border-white/5"
        >
          <div className="prose prose-invert max-w-none prose-headings:font-heading prose-headings:uppercase prose-headings:tracking-tight prose-headings:font-bold prose-strong:text-white prose-p:leading-relaxed prose-p:text-[#ccd6f6] prose-p:font-body prose-li:text-[#ccd6f6] prose-ul:my-4 prose-li:my-1"
            style={{ '--tw-prose-headings': theme.accent }}
          >
            <ReactMarkdown
              components={{
                h2: ({ children }) => <h2 style={{ color: theme.accent }}>{children}</h2>,
              }}
            >
              {level.content.article}
            </ReactMarkdown>
          </div>
        </motion.div>

        {/* QUIZ SECTION */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={staggerChild}
          ref={quizRef}
          id="quiz"
          className="bg-[#112240] rounded-2xl border p-6 md:p-8 shadow-xl"
          style={{ borderColor: `${theme.accent}4D` }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Trophy style={{ color: theme.accent }} />
            <h3 className="text-xl font-heading font-bold text-white uppercase">Quest Challenge</h3>
            {alreadyCompleted && !showSuccess && (
              <span className="text-[10px] font-mono ml-auto" style={{ color: `${theme.accent}99` }}>ALREADY COMPLETED</span>
            )}
          </div>

          <p className="text-lg mb-8 text-white font-body italic">{level.content.challenge.question}</p>

          <div className="grid gap-3">
            {level.content.challenge.options.map((opt, i) => {
              const isCorrectSelected = selectedAnswer === i;
              const isWrong = wrongAnswer === i;

              return (
                <motion.button
                  key={i}
                  onClick={() => handleAnswer(opt, i)}
                  disabled={showSuccess}
                  animate={isWrong ? { x: [0, -8, 8, -8, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className={`
                    w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center group font-body
                    ${isCorrectSelected
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500'
                      : isWrong
                        ? 'border-[#ff6b6b] bg-[#ff6b6b]/10 text-[#ff6b6b]'
                        : showSuccess
                          ? 'border-white/5 bg-white/[0.02] text-[#8892b0] cursor-not-allowed'
                          : 'border-white/10 bg-[#0a192f] cursor-pointer'
                    }
                  `}
                  style={!isCorrectSelected && !isWrong && !showSuccess ? { '--hover-border': theme.accent } : {}}
                  whileHover={!showSuccess && !isCorrectSelected && !isWrong ? { borderColor: theme.accent } : {}}
                >
                  <span className={`mr-4 font-mono font-bold transition-transform ${!showSuccess && 'group-hover:scale-110'}`} style={{ color: isWrong ? '#ff6b6b' : isCorrectSelected ? '#34d399' : theme.accent }}>
                    [{i + 1}]
                  </span>
                  <span className="flex-1">{opt.text}</span>
                  {isCorrectSelected && <CheckCircle size={18} className="text-emerald-400 ml-2 flex-shrink-0" />}
                  {isWrong && <XCircle size={18} className="text-[#ff6b6b] ml-2 flex-shrink-0" />}
                </motion.button>
              );
            })}
          </div>

          {/* WRONG ANSWER FEEDBACK */}
          <AnimatePresence>
            {wrongAnswer !== null && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-3 rounded-lg bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 text-[#ff6b6b] text-sm font-heading text-center"
              >
                INCORRECT — TRY AGAIN
              </motion.div>
            )}
          </AnimatePresence>

          {/* SUCCESS STATE */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className={`mt-8 p-8 rounded-2xl flex flex-col items-center bg-gradient-to-br ${theme.gradient} text-white`}
              >
                <span className="text-4xl mb-2">✨</span>
                <h4 className="text-2xl font-heading font-bold uppercase tracking-tight">Quest Complete!</h4>
                <p className="font-body text-sm opacity-90 mt-1 mb-6">
                  {level.id < totalLevels ? 'Next quest unlocked!' : 'All quests complete — you are a Money Master! ✨'}
                </p>

                <button
                  onClick={handleNext}
                  className="bg-[#0a192f] px-8 py-3 rounded-full font-heading font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-xl animate-pulse-glow"
                  style={{ color: theme.accent, '--glow-color': theme.glow || 'rgba(167,139,250,0.4)' }}
                >
                  {level.id < totalLevels
                    ? `Next Quest →`
                    : 'Return to Map →'
                  }
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default LevelPlayer;
