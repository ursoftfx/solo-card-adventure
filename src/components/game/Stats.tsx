
import React, { useEffect, useState } from 'react';

interface StatsProps {
  moves: number;
  startTime: number | null;
  endTime: number | null;
  isWon: boolean;
}

const Stats: React.FC<StatsProps> = ({
  moves,
  startTime,
  endTime,
  isWon
}) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    if (!startTime) return;

    const intervalId = setInterval(() => {
      if (endTime) {
        setElapsedTime(Math.floor((endTime - startTime) / 1000));
        clearInterval(intervalId);
      } else {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTime, endTime]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 text-white backdrop-blur-md bg-white/5 rounded-lg p-3 shadow-inner">
      <div className="stats-item">
        <span className="text-sm font-semibold">Time</span>
        <span className="text-xl">{formatTime(elapsedTime)}</span>
      </div>
      
      <div className="stats-item">
        <span className="text-sm font-semibold">Moves</span>
        <span className="text-xl">{moves}</span>
      </div>
      
      {isWon && (
        <div className="stats-item animate-pulse">
          <span className="text-sm font-semibold">Status</span>
          <span className="text-xl text-yellow-300">Winner!</span>
        </div>
      )}
    </div>
  );
};

export default Stats;
