import React, { useEffect, useRef } from "react";

interface ClickSoundProps {
  soundUrl?: string;
}

const ClickSound: React.FC<ClickSoundProps> = ({
  soundUrl = "/click-sound.mp3",
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(soundUrl);
    audioRef.current.preload = "auto";

    // Play sound on click
    const handleClick = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((err) => {
          // Handle autoplay restrictions
          console.log("Audio playback was prevented:", err);
        });
      }
    };

    // Add click listener to document
    document.addEventListener("click", handleClick);

    // Cleanup
    return () => {
      document.removeEventListener("click", handleClick);
      if (audioRef.current) {
        audioRef.current = null;
      }
    };
  }, [soundUrl]);

  // This component doesn't render anything visible
  return null;
};

export default ClickSound;
