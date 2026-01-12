import React, { useEffect, useRef } from 'react';

interface HiddenPlayerProps {
  isPlaying: boolean;
  videoId: string;
}

const HiddenPlayer: React.FC<HiddenPlayerProps> = ({ isPlaying, videoId }) => {
  const playerRef = useRef<any>(null);
  const containerId = 'youtube-player-hidden';

  useEffect(() => {
    // Initialize player when API is ready
    const initPlayer = () => {
      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player(containerId, {
          height: '0',
          width: '0',
          videoId: videoId,
          playerVars: {
            'playsinline': 1,
            'controls': 0,
            'disablekb': 1,
            'loop': 1, // Loop the cat sound
            'playlist': videoId // Required for loop to work
          },
          events: {
            'onReady': (event: any) => {
               if (isPlaying) {
                   event.target.playVideo();
               }
            }
          }
        });
      }
    };

    if (!window.YT) {
      // If API not loaded yet, wait for global callback
      window.onYouTubeIframeAPIReady = initPlayer;
    } else {
      initPlayer();
    }

    return () => {
        if (playerRef.current) {
            try {
                playerRef.current.destroy();
            } catch (e) {
                console.warn("Player destroy failed", e);
            }
        }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]); // Re-init if videoId changes, but mainly runs once

  useEffect(() => {
    if (playerRef.current && playerRef.current.playVideo) {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying]);

  return <div id={containerId} className="hidden absolute top-0 left-0 pointer-events-none" />;
};

export default HiddenPlayer;