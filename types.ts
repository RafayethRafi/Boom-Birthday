export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

export interface BoomState {
    isPlaying: boolean;
    isTalking: boolean;
    tilt: { x: number; y: number };
}

// Window augmentation for YouTube API
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}