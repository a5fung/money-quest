import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import WorldMap from './components/WorldMap';
import LevelPlayer from './components/LevelPlayer';
import { courseData } from './courseData';

// Wrapper that forces LevelPlayer to remount when the level id changes
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
  } catch {
    // corrupted save — start fresh
  }
  return { unlockedLevels: [1], completedLevels: [], wealth: 0 };
};

function App() {
  const [unlockedLevels, setUnlockedLevels] = useState(() => loadSave().unlockedLevels);
  const [completedLevels, setCompletedLevels] = useState(() => loadSave().completedLevels);
  const [wealth, setWealth] = useState(() => loadSave().wealth);

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      unlockedLevels,
      completedLevels,
      wealth,
    }));
  }, [unlockedLevels, completedLevels, wealth]);

  const completeLevel = (levelId) => {
    // Only award wealth if not already completed
    if (!completedLevels.includes(levelId)) {
      setWealth(prev => prev + 1000);
      setCompletedLevels(prev => [...prev, levelId]);
    }

    // Unlock next level
    const nextLevel = levelId + 1;
    if (nextLevel <= courseData.length && !unlockedLevels.includes(nextLevel)) {
      setUnlockedLevels(prev => [...prev, nextLevel]);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#0a192f] text-[#ccd6f6] font-body">
        {/* HEADER */}
        <header className="p-4 md:p-6 bg-[#112240]/90 backdrop-blur-md sticky top-0 z-[100] border-b-2 border-transparent" style={{ borderImage: 'linear-gradient(to right, #a78bfa, #60a5fa, #34d399, #fbbf24) 1' }}>
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Link to="/" className="font-heading font-bold text-xl md:text-2xl tracking-tight hover:scale-105 transition-transform">
              <span className="bg-gradient-to-r from-act-1 via-act-2 to-act-3 bg-clip-text text-transparent">MONEY QUEST</span>
            </Link>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5 bg-white/5 rounded-full px-3 py-1.5">
                <span className="text-base">🏆</span>
                <span className="text-white font-heading font-bold text-sm">{completedLevels.length}/{courseData.length}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 rounded-full px-3 py-1.5">
                <span className="text-base">💎</span>
                <span className="text-act-4 font-heading font-bold text-sm">${wealth.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={
            <WorldMap data={courseData} unlocked={unlockedLevels} completed={completedLevels} />
          } />
          <Route path="/level/:id" element={
            <LevelRoute data={courseData} onComplete={completeLevel} completed={completedLevels} />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
