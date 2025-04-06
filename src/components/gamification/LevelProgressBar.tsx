
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { useGamification } from '@/context/GamificationContext';
import { Sparkles, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LevelProgressBarProps {
  showDetail?: boolean;
  className?: string;
}

export const LevelProgressBar: React.FC<LevelProgressBarProps> = ({ 
  showDetail = true,
  className
}) => {
  const { gameState, progressToNextLevel, levels } = useGamification();
  const currentLevel = levels.find(l => l.level === gameState.level);
  const nextLevel = levels.find(l => l.level === gameState.level + 1) || currentLevel;
  
  return (
    <div className={cn("space-y-2", className)}>
      {showDetail && (
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5">
            <div className="bg-level/20 text-level p-1 rounded-full">
              <Trophy size={14} />
            </div>
            <span className="font-medium">Level {gameState.level}</span>
            <span className="text-muted-foreground">{currentLevel?.title}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Sparkles size={14} className="text-level" />
            <span>{Math.round(progressToNextLevel)}% to Level {gameState.level + 1}</span>
          </div>
        </div>
      )}
      
      <div className="relative">
        <Progress value={progressToNextLevel} className="h-2 bg-muted">
          <div className="absolute inset-0 flex items-center justify-end pr-1">
            <div className="bg-background rounded-full border-2 border-level flex items-center justify-center w-5 h-5">
              <span className="text-[10px] font-bold text-level">{gameState.level}</span>
            </div>
          </div>
        </Progress>
      </div>
      
      {showDetail && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>XP: {gameState.currentXp}/{gameState.nextLevelXp - (currentLevel?.requiredXp || 0)}</span>
          {nextLevel && (
            <span>Next: {nextLevel.title}</span>
          )}
        </div>
      )}
    </div>
  );
};
