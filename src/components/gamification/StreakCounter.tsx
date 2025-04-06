
import React, { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGamification } from '@/context/GamificationContext';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface StreakCounterProps {
  showLabel?: boolean;
  className?: string;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({ 
  showLabel = true, 
  className 
}) => {
  const { gameState } = useGamification();
  const [isPulsing, setIsPulsing] = useState(false);
  const [previousStreak, setPreviousStreak] = useState(gameState.streak.currentStreak);
  
  useEffect(() => {
    if (gameState.streak.currentStreak > previousStreak) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 2000);
      
      return () => clearTimeout(timer);
    }
    
    setPreviousStreak(gameState.streak.currentStreak);
  }, [gameState.streak.currentStreak, previousStreak]);
  
  const getStreakDescription = () => {
    if (gameState.streak.currentStreak === 0) return "Start your streak today!";
    if (gameState.streak.currentStreak === 1) return "First day of your streak!";
    if (gameState.streak.currentStreak < 3) return "Keep going!";
    if (gameState.streak.currentStreak < 7) return "You're on fire!";
    if (gameState.streak.currentStreak < 14) return "Impressive consistency!";
    if (gameState.streak.currentStreak < 30) return "Amazing dedication!";
    return "Extraordinary commitment!";
  };
  
  return (
    <Tooltip>
      <TooltipTrigger>
        <div className={cn(
          "flex items-center gap-1.5 font-medium",
          isPulsing ? "animate-scale-pulse" : "",
          className
        )}>
          <motion.div 
            className="streak-flame"
            animate={isPulsing ? { 
              scale: [1, 1.2, 1],
              rotate: [-5, 5, -5, 0],
            } : {}}
            transition={{ 
              duration: 1, 
              ease: "easeInOut", 
              times: [0, 0.5, 1] 
            }}
          >
            <Flame 
              size={16} 
              className={cn(
                "transition-transform duration-300",
                gameState.streak.currentStreak > 0 ? "scale-100" : "scale-75 opacity-60"
              )}
            />
            {gameState.streak.currentStreak >= 7 && (
              <motion.div 
                className="absolute top-0 left-0 w-full h-full bg-[#F97316] bg-opacity-10 rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 0, 0.7] 
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop" 
                }}
              />
            )}
          </motion.div>
          
          <span>
            {gameState.streak.currentStreak}
          </span>
          
          {showLabel && (
            <span className="text-xs text-muted-foreground">day streak</span>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <div className="text-center">
          <p>{getStreakDescription()}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Longest streak: {gameState.streak.longestStreak} days
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
