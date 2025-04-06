
import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamification } from '@/context/GamificationContext';
import { cn } from '@/lib/utils';

interface XpIndicatorProps {
  className?: string;
}

export const XpIndicator: React.FC<XpIndicatorProps> = ({ className }) => {
  const { gameState } = useGamification();
  const [isAnimating, setIsAnimating] = useState(false);
  const [previousXp, setPreviousXp] = useState(gameState.totalXp);
  
  useEffect(() => {
    if (gameState.totalXp > previousXp) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 2000);
      
      return () => clearTimeout(timer);
    }
    
    setPreviousXp(gameState.totalXp);
  }, [gameState.totalXp, previousXp]);
  
  return (
    <div className={cn(
      "flex items-center gap-1.5 font-medium transition-all duration-300",
      isAnimating ? "scale-110" : "",
      className
    )}>
      <div className={cn(
        "p-0.5 rounded-full transition-colors",
        isAnimating ? "bg-xp/30" : "bg-transparent"
      )}>
        <Sparkles size={14} className={isAnimating ? "text-xp animate-pulse" : "text-xp"} />
      </div>
      
      <div className="flex items-baseline">
        <AnimatePresence mode="wait">
          <motion.span
            key={gameState.totalXp}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={isAnimating ? "text-xp" : "text-foreground"}
          >
            {gameState.totalXp.toLocaleString()}
          </motion.span>
        </AnimatePresence>
        <span className="text-xs ml-0.5 text-muted-foreground">XP</span>
      </div>
    </div>
  );
};
