import React, { useRef, useState, useEffect } from 'react';

interface BoomCatProps {
  onClick: () => void;
  isPlaying: boolean;
}

const BoomCat: React.FC<BoomCatProps> = ({ onClick, isPlaying }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage from center (-1 to 1)
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;

    // Max rotation deg
    const maxRot = 20;
    setTilt({ x: -yPct * maxRot, y: xPct * maxRot });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Extract pure ID from shorts URL: https://www.youtube.com/shorts/d1TKI9HFVBs -> d1TKI9HFVBs
  // But we handle this logic in parent or assume static for this assignment.

  return (
    <div 
      className="perspective-1000 w-full max-w-md mx-auto h-[400px] flex items-center justify-center cursor-pointer group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      ref={containerRef}
    >
      <div 
        className="relative w-72 h-72 transition-transform duration-100 ease-out preserve-3d"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isPlaying ? 1.1 : 1})`,
        }}
      >
        {/* Glow effect */}
        <div className={`absolute inset-0 bg-yellow-400 rounded-full blur-3xl opacity-0 transition-opacity duration-300 -z-10 ${isPlaying ? 'opacity-40 animate-pulse' : 'group-hover:opacity-20'}`}></div>

        {/* The Cat Image */}
        <div className="absolute inset-0 preserve-3d animate-float">
          <img 
            src="https://tr.rbxcdn.com/180DAY-1df1fd6d869f4149437459ac32bdfe75/420/420/BackAccessory/Webp/noFilter"
            alt="Boom the Cat"
            className="w-full h-full object-contain drop-shadow-2xl"
            style={{ 
                transform: 'translateZ(20px)',
                filter: 'drop-shadow(0 20px 20px rgba(0,0,0,0.5))'
            }}
          />
          
          {/* "Click Me" Badge */}
          {!isPlaying && (
            <div 
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white text-purple-600 px-4 py-1 rounded-full font-bangers text-xl shadow-lg border-2 border-purple-600 animate-bounce"
                style={{ transform: 'translateZ(50px) translateX(-50%)' }}
            >
                CLICK ME!
            </div>
          )}

          {/* Music Notes when playing */}
          {isPlaying && (
            <>
                <div className="absolute top-0 right-0 text-4xl animate-bounce" style={{ animationDelay: '0s', transform: 'translateZ(40px) translate(20px, -20px)' }}>🎵</div>
                <div className="absolute top-1/2 left-0 text-4xl animate-bounce" style={{ animationDelay: '0.2s', transform: 'translateZ(30px) translate(-40px, 0px)' }}>🎶</div>
                <div className="absolute bottom-0 right-10 text-4xl animate-bounce" style={{ animationDelay: '0.4s', transform: 'translateZ(60px) translate(10px, 10px)' }}>🎵</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoomCat;