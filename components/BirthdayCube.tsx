import React, { useRef, useState, useEffect } from 'react';

interface BirthdayCubeProps {
  wish: string;
  textureUrl: string | null;
  isPlaying: boolean;
  onClick: () => void;
}

const BirthdayCube: React.FC<BirthdayCubeProps> = ({ wish, textureUrl, isPlaying, onClick }) => {
  const [rotation, setRotation] = useState({ x: -15, y: 30 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

  // Auto-rotation when playing
  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      if (isPlaying && !isDragging) {
        setRotation(prev => ({ ...prev, y: prev.y + 0.8, x: -15 + Math.sin(Date.now() / 1000) * 5 }));
      }
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMouse.x;
    const deltaY = e.clientY - lastMouse.y;
    
    setRotation(prev => ({
      x: prev.x - deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  // Touch support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setLastMouse({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    // Prevent scrolling while rotating cube
    // e.preventDefault(); // Warning: Passive event listener issue in React 18+ usually requires CSS touch-action: none
    
    const deltaX = e.touches[0].clientX - lastMouse.x;
    const deltaY = e.touches[0].clientY - lastMouse.y;
    
    setRotation(prev => ({
      x: prev.x - deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));
    setLastMouse({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Styles for the textured sides with a darker overlay for depth
  const sideStyle: React.CSSProperties = textureUrl 
    ? { backgroundImage: `url(${textureUrl})`, backgroundSize: 'cover' } 
    : { background: 'linear-gradient(135deg, #1a1a2e, #16213e)' };

  return (
    <div 
      className="scene w-[300px] h-[300px] relative cursor-grab active:cursor-grabbing mx-auto perspective-1000 scale-[0.8] sm:scale-100 touch-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      onClick={(e) => {
          if (!isDragging) onClick();
      }}
    >
      <div 
        className="cube w-full h-full absolute"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {/* Front: Boom The Cat */}
        <div className="cube-face cube-face-front neon-border bg-black/60 backdrop-blur-md flex items-center justify-center overflow-hidden group">
           {/* Internal shine */}
           <div className="absolute inset-0 holo-bg z-10 pointer-events-none"></div>
           
           <img 
             src="https://tr.rbxcdn.com/180DAY-1df1fd6d869f4149437459ac32bdfe75/420/420/BackAccessory/Webp/noFilter" 
             alt="Boom"
             className={`w-[85%] h-[85%] object-contain relative z-20 transition-all duration-300 ${isPlaying ? 'scale-110 animate-bounce' : 'group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(253,224,71,0.5)]'}`}
             style={{ filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.8))' }}
           />
           {!isPlaying && (
             <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                <div className="bg-black/50 backdrop-blur-sm px-6 py-2 rounded-full border border-yellow-400/50">
                    <span className="font-bangers text-yellow-400 text-2xl tracking-widest animate-pulse whitespace-nowrap">
                        OPEN ME
                    </span>
                </div>
             </div>
           )}
        </div>

        {/* Back: The Wish */}
        <div className="cube-face cube-face-back neon-border bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center">
           <div className="absolute top-2 right-2 text-2xl animate-spin-slow">✨</div>
           <div className="absolute bottom-2 left-2 text-2xl animate-spin-slow" style={{ animationDirection: 'reverse' }}>✨</div>
           
           <h3 className="font-bangers text-yellow-400 text-lg sm:text-xl mb-2 tracking-wide">From Meaw:</h3>
           <div className="overflow-y-auto max-h-[80%] w-full custom-scrollbar">
             <p className="font-sans font-bold text-white text-base sm:text-lg md:text-xl leading-snug sm:leading-relaxed drop-shadow-md relative z-10 italic">
               {wish}
             </p>
           </div>
        </div>

        {/* Sides: Generated Art with Neon Frames */}
        {['right', 'left', 'top', 'bottom'].map((face) => (
            <div key={face} className={`cube-face cube-face-${face} bg-gray-900`}>
                <div className="absolute inset-0 opacity-60" style={sideStyle}></div>
                <div className="absolute inset-0 border-[4px] border-yellow-400/20 box-border"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default BirthdayCube;