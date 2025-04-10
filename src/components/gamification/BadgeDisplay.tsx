
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge as BadgeType } from '@/types/gamification';
import { Progress } from '@/components/ui/progress';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BadgeDisplayProps {
  badge: BadgeType;
  size?: 'sm' | 'md' | 'lg';
  showProgress?: boolean;
}

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ 
  badge, 
  size = 'md',
  showProgress = true
}) => {
  const Icon = badge.icon;
  const progressPercent = (badge.progress / badge.total) * 100;
  
  const getBadgeStyle = () => {
    switch (badge.category) {
      case 'mindfulness':
        return {
          bgColor: 'bg-wellness-focus',
          borderColor: 'border-wellness-focus/50',
          textColor: 'text-primary',
          progressColor: 'bg-primary'
        };
      case 'physical':
        return {
          bgColor: 'bg-wellness-energize',
          borderColor: 'border-wellness-energize/50',
          textColor: 'text-amber-700 dark:text-amber-400',
          progressColor: 'bg-amber-500'
        };
      case 'academic':
        return {
          bgColor: 'bg-wellness-calm',
          borderColor: 'border-wellness-calm/50',
          textColor: 'text-blue-700 dark:text-blue-400',
          progressColor: 'bg-blue-500'
        };
      case 'social':
        return {
          bgColor: 'bg-wellness-balance',
          borderColor: 'border-wellness-balance/50',
          textColor: 'text-pink-700 dark:text-pink-400',
          progressColor: 'bg-pink-500'
        };
      case 'sleep':
        return {
          bgColor: 'bg-wellness-soothe',
          borderColor: 'border-wellness-soothe/50',
          textColor: 'text-teal-700 dark:text-teal-400',
          progressColor: 'bg-teal-500'
        };
      case 'engagement':
        return {
          bgColor: 'bg-badge/10',
          borderColor: 'border-badge/50',
          textColor: 'text-badge',
          progressColor: 'bg-badge'
        };
      default:
        return {
          bgColor: 'bg-muted',
          borderColor: 'border-border',
          textColor: 'text-muted-foreground',
          progressColor: 'bg-primary'
        };
    }
  };
  
  const styles = getBadgeStyle();
  
  const sizeClasses = {
    sm: {
      wrapper: "w-10 h-10 sm:w-12 sm:h-12",
      icon: "w-4 h-4 sm:w-5 sm:h-5"
    },
    md: {
      wrapper: "w-14 h-14 sm:w-16 sm:h-16",
      icon: "w-6 h-6 sm:w-7 sm:h-7"
    },
    lg: {
      wrapper: "w-16 h-16 sm:w-20 sm:h-20",
      icon: "w-8 h-8 sm:w-9 sm:h-9"
    }
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center gap-1">
            <div 
              className={cn(
                "badge-icon rounded-full flex items-center justify-center border-2 relative",
                badge.unlocked ? styles.bgColor : "bg-muted/50 dark:bg-muted/20",
                badge.unlocked ? styles.borderColor : "border-border",
                sizeClasses[size].wrapper
              )}
            >
              {!badge.unlocked && (
                <div className="absolute inset-0 bg-background/50 dark:bg-background/60 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Lock size={16} className="text-muted-foreground" />
                </div>
              )}
              
              {Icon && <Icon className={cn(
                sizeClasses[size].icon,
                badge.unlocked ? styles.textColor : "text-muted-foreground/50"
              )} />}
              
              {badge.unlocked && badge.progress >= badge.total && (
                <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-primary text-primary-foreground text-[10px] rounded-full w-5 h-5 flex items-center justify-center border border-background">
                  ✓
                </div>
              )}
            </div>
            
            {showProgress && !badge.unlocked && (
              <div className="w-full mt-1">
                <Progress 
                  value={progressPercent} 
                  className={cn("h-1 w-10 sm:w-12", styles.progressColor)}
                />
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-center space-y-1 max-w-[200px] sm:max-w-none">
            <p className="font-bold text-sm sm:text-base">{badge.name}</p>
            <p className="text-xs text-muted-foreground">{badge.description}</p>
            {!badge.unlocked && (
              <p className="text-xs mt-1">
                Progress: {badge.progress}/{badge.total}
              </p>
            )}
            {badge.unlocked && badge.earnedOn && (
              <p className="text-xs text-muted-foreground mt-1">
                Earned on {badge.earnedOn.toLocaleDateString()}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
