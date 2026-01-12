import React, { useState } from 'react';
import { generateBirthdayWish } from '../services/geminiService';

const WishGenerator: React.FC = () => {
  const [name, setName] = useState('');
  const [wish, setWish] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!name.trim()) return;
    setLoading(true);
    setWish('');
    try {
      const result = await generateBirthdayWish(name);
      setWish(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl max-w-md w-full mx-auto mt-8 transform transition-all hover:scale-[1.02]">
      <h3 className="text-white font-bangers text-2xl mb-4 text-center tracking-wide">
        Ask Boom for a Wish!
      </h3>
      
      <div className="flex gap-2 mb-4">
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Birthday person's name..."
          className="flex-1 px-4 py-2 rounded-lg bg-black/20 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
        />
        <button 
          onClick={handleGenerate}
          disabled={loading || !name}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-2 rounded-lg shadow-lg hover:shadow-orange-500/50 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Thinking...' : 'GO!'}
        </button>
      </div>

      {wish && (
        <div className="bg-black/30 rounded-xl p-4 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400"></div>
            <p className="text-gray-100 font-medium text-lg leading-relaxed italic relative z-10">
                "{wish}"
            </p>
            <div className="absolute -bottom-4 -right-4 text-6xl opacity-10 rotate-12 group-hover:rotate-0 transition-transform">🎁</div>
        </div>
      )}
    </div>
  );
};

export default WishGenerator;