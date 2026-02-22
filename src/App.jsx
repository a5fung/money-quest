import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { RotateCcw } from 'lucide-react';
import WorldMap from './components/WorldMap';
import LevelPlayer from './components/LevelPlayer';
import { courseData } from './courseData';

const LevelRoute = (props) => {
  const { id } = useParams();
  return <LevelPlayer key={id} {...props} />;
};

const STORAGE_KEY = 'freedom-architect-save';

const loadSave = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        unlockedLevels: parsed.unlockedLevels || [1],
        completedLevels: parsed.completedLevels || [],
        wealth: parsed.wealth || 0,
      };
    }
  } catch { /* corrupted */ }
  return { unlockedLevels: [1], completedLevels: [], wealth: 0 };
};

// Floating sparkle particles for the background
const particles = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  left: `${(i * 4.17) % 100}%`,
  size: 4 + (i % 5) * 3,
  dur: 8 + (i % 7) * 3,
  delay: (i % 10) * 1.5,
  color: ['#f472b6', '#38bdf8', '#a3e635', '#fb923c', '#c084fc', '#fbbf24'][i % 6],
  shape: i % 3, // 0=circle, 1=star, 2=diamond
}));

const ParticleField = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {/* Gradient overlay on the whole page */}
    <div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse at 20% 20%, rgba(147,51,234,0.15), transparent 50%), radial-gradient(ellipse at 80% 60%, rgba(6,182,212,0.12), transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(244,114,182,0.1), transparent 50%)',
      }}
    />
    {particles.map(p => (
      <div
        key={p.id}
        className="absolute animate-float-up"
        style={{
          left: p.left,
          bottom: '-20px',
          '--dur': `${p.dur}s`,
          animationDelay: `${p.delay}s`,
        }}
      >
        {p.shape === 0 ? (
          <div style={{ width: p.size, height: p.size, borderRadius: '50%', background: p.color, boxShadow: `0 0 ${p.size * 2}px ${p.color}` }} />
        ) : p.shape === 1 ? (
          <div style={{ color: p.color, fontSize: p.size * 1.5, lineHeight: 1, filter: `drop-shadow(0 0 ${p.size}px ${p.color})` }}>✦</div>
        ) : (
          <div style={{ width: p.size, height: p.size, background: p.color, transform: 'rotate(45deg)', boxShadow: `0 0 ${p.size * 2}px ${p.color}` }} />
        )}
      </div>
    ))}
  </div>
);

function App() {
  const [unlockedLevels, setUnlockedLevels] = useState(() => loadSave().unlockedLevels);
  const [completedLevels, setCompletedLevels] = useState(() => loadSave().completedLevels);
  const [wealth, setWealth] = useState(() => loadSave().wealth);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ unlockedLevels, completedLevels, wealth }));
  }, [unlockedLevels, completedLevels, wealth]);

  const [showRestart, setShowRestart] = useState(false);

  const restartGame = () => {
    setUnlockedLevels([1]);
    setCompletedLevels([]);
    setWealth(0);
    setShowRestart(false);
  };

  const completeLevel = (levelId) => {
    if (!completedLevels.includes(levelId)) {
      setWealth(prev => prev + 1000);
      setCompletedLevels(prev => [...prev, levelId]);
    }
    const nextLevel = levelId + 1;
    if (nextLevel <= courseData.length && !unlockedLevels.includes(nextLevel)) {
      setUnlockedLevels(prev => [...prev, nextLevel]);
    }
  };

  return (
    <Router>
      <div className="min-h-screen text-white font-body relative">
        <ParticleField />

        {/* HEADER — diagonal manga banner style */}
        <header className="sticky top-0 z-[100] relative overflow-hidden">
          {/* Main gradient bar */}
          <div
            className="relative px-4 md:px-6 py-3"
            style={{
              background: 'linear-gradient(135deg, #be185d 0%, #7c3aed 40%, #0ea5e9 100%)',
            }}
          >
            {/* Diagonal accent stripe */}
            <div
              className="absolute top-0 right-0 w-1/3 h-full"
              style={{
                background: 'linear-gradient(135deg, transparent 0%, rgba(251,191,36,0.3) 100%)',
                clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)',
              }}
            />
            {/* Speed lines in header */}
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 8px, white 8px, white 9px)',
              }}
            />

            <div className="max-w-4xl mx-auto flex justify-between items-center relative z-10">
              <Link to="/" className="hover:scale-105 transition-transform flex items-center gap-2">
                <span className="animate-twinkle text-yellow-300 text-3xl">✦</span>
                <span
                  className="font-anime text-3xl md:text-4xl tracking-wider text-white"
                  style={{
                    textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 0 0 20px #f472b6, 0 0 40px #7c3aed',
                    WebkitTextStroke: '1px rgba(0,0,0,0.3)',
                  }}
                >
                  MONEY QUEST
                </span>
                <span className="animate-twinkle-delay text-pink-300 text-3xl">✦</span>
              </Link>

              <div className="flex items-center gap-2 flex-wrap justify-end">
                {/* Restart button */}
                <button
                  onClick={() => setShowRestart(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 font-anime text-sm tracking-wider hover:scale-110 transition-transform"
                  style={{
                    background: '#dc2626',
                    border: '3px solid #000',
                    boxShadow: '3px 3px 0 #000',
                    transform: 'rotate(-1deg)',
                    borderRadius: '4px',
                  }}
                  title="Restart game"
                >
                  <RotateCcw size={14} /> RESTART
                </button>
                {/* Stat badges — manga-style tilted tags */}
                <div
                  className="flex items-center gap-2 px-4 py-1.5 font-anime text-lg tracking-wider"
                  style={{
                    background: '#0ea5e9',
                    border: '3px solid #000',
                    boxShadow: '3px 3px 0 #000',
                    transform: 'rotate(-2deg)',
                    borderRadius: '4px',
                  }}
                >
                  🏆 {completedLevels.length}/{courseData.length}
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-1.5 font-anime text-lg tracking-wider"
                  style={{
                    background: '#fb923c',
                    border: '3px solid #000',
                    boxShadow: '3px 3px 0 #000',
                    transform: 'rotate(2deg)',
                    borderRadius: '4px',
                  }}
                >
                  💎 ${wealth.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
          {/* Jagged bottom edge */}
          <div style={{
            height: '12px',
            background: 'linear-gradient(135deg, #be185d, #7c3aed, #0ea5e9)',
            clipPath: 'polygon(0 0, 5% 100%, 10% 0, 15% 100%, 20% 0, 25% 100%, 30% 0, 35% 100%, 40% 0, 45% 100%, 50% 0, 55% 100%, 60% 0, 65% 100%, 70% 0, 75% 100%, 80% 0, 85% 100%, 90% 0, 95% 100%, 100% 0)',
          }} />
        </header>

        <div className="relative z-10">
          <Routes>
            <Route path="/" element={
              <WorldMap data={courseData} unlocked={unlockedLevels} completed={completedLevels} />
            } />
            <Route path="/level/:id" element={
              <LevelRoute data={courseData} onComplete={completeLevel} completed={completedLevels} />
            } />
          </Routes>
        </div>
        {/* Restart confirmation modal */}
        {showRestart && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
            <div
              className="relative p-6 max-w-sm w-full text-center"
              style={{
                background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
                border: '4px solid #000',
                boxShadow: '6px 6px 0 #000, 0 0 40px rgba(220,38,38,0.4)',
                borderRadius: '8px',
              }}
            >
              <div className="text-5xl mb-3">⚠️</div>
              <h2 className="font-anime text-2xl tracking-wider text-red-400 mb-2" style={{ textShadow: '2px 2px 0 #000' }}>
                RESTART QUEST?
              </h2>
              <p className="text-white/70 font-body text-sm mb-5">
                All progress, completed levels, and wealth will be reset. This cannot be undone!
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowRestart(false)}
                  className="px-5 py-2 font-anime text-lg tracking-wider hover:scale-105 transition-transform"
                  style={{
                    background: '#374151',
                    border: '3px solid #000',
                    boxShadow: '3px 3px 0 #000',
                    borderRadius: '4px',
                    color: '#fff',
                  }}
                >
                  CANCEL
                </button>
                <button
                  onClick={restartGame}
                  className="px-5 py-2 font-anime text-lg tracking-wider hover:scale-105 transition-transform"
                  style={{
                    background: '#dc2626',
                    border: '3px solid #000',
                    boxShadow: '3px 3px 0 #000',
                    borderRadius: '4px',
                    color: '#fff',
                  }}
                >
                  RESTART!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
