import React, { useState } from 'react';
import BirthdayCube from './components/BirthdayCube';
import HiddenPlayer from './components/HiddenPlayer';

// Confetti utility
const FireConfetti = () => {
    const colors = ['#FFD700', '#FF69B4', '#00FFFF', '#FF4500', '#7FFF00'];
    
    for (let i = 0; i < 60; i++) {
        const el = document.createElement('div');
        el.style.position = 'fixed';
        el.style.left = '50%';
        el.style.top = '50%';
        el.style.width = Math.random() * 12 + 4 + 'px';
        el.style.height = Math.random() * 12 + 4 + 'px';
        el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        el.style.zIndex = '9999';
        // Mix of squares and circles
        el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        el.style.boxShadow = `0 0 10px ${colors[Math.floor(Math.random() * colors.length)]}`;
        el.style.pointerEvents = 'none';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 8 + Math.random() * 15;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(el);

        let x = 0, y = 0;
        let opacity = 1;
        let rot = 0;

        const animate = () => {
            x += vx;
            y += vy + 3; // stronger gravity
            opacity -= 0.015;
            rot += 5;
            
            el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rot}deg)`;
            el.style.opacity = opacity.toString();

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                el.remove();
            }
        };
        requestAnimationFrame(animate);
    }
};

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Static content
  const wish = "Happy Birthday! Boom. I ain't that good at this but here is something in my language. Don't be so hard on youself. You are Purrfect just the way you are. Everyday is a mystery box and some may contain what you really need. Life will beat the shit out of you , so what you are Booooom !!";
  const texture = "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1000&auto=format&fit=crop"; 
  const videoId = "n4yY5fJ_s50"; 

  const handleCubeClick = () => {
    setIsPlaying(prev => !prev);
    if (!isPlaying) {
      FireConfetti();
      // Keep firing confetti occasionally while playing
      const interval = setInterval(() => {
          if (Math.random() > 0.6) FireConfetti();
      }, 1500);
      
      // Cleanup after 10 seconds
      setTimeout(() => clearInterval(interval), 10000);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden overflow-y-auto selection:bg-yellow-400 selection:text-black flex flex-col items-center relative">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Deep space gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e1b4b]"></div>
        
        {/* Moving glowing orbs */}
        <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-purple-600/30 rounded-full blur-[80px] sm:blur-[120px] animate-float" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-cyan-600/20 rounded-full blur-[100px] sm:blur-[150px] animate-float" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-yellow-400/10 rounded-full blur-[60px] sm:blur-[80px] animate-pulse"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"></div>
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen w-full">
        
        {/* Header */}
        <header className="text-center mb-8 sm:mb-16 perspective-1000 group w-full max-w-4xl">
           <h1 className="font-bangers text-6xl sm:text-7xl md:text-9xl tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-orange-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.6)] transform group-hover:scale-105 transition-transform duration-500 cursor-default leading-tight">
             HAPPY <br className="sm:hidden" /> B-DAY!
           </h1>

        </header>

        {/* 3D Content Container */}
        <div className="w-full h-[320px] sm:h-[400px] flex items-center justify-center mb-8 sm:mb-12 relative">
            <BirthdayCube 
                wish={wish} 
                textureUrl={texture} 
                isPlaying={isPlaying} 
                onClick={handleCubeClick} 
            />
        </div>
        


      </main>

      <HiddenPlayer isPlaying={isPlaying} videoId={videoId} />
    </div>
  );
};

export default App;