
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from 'lucide-react';
import { Achievement } from '@/types/achievement';

interface AchievementCardProps {
  achievement: Achievement;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const AchievementIcon = achievement.icon;
  const progressPercentage = (achievement.progress / achievement.total) * 100;
  
  return (
    <Card 
      className={`transition-all ${achievement.completed ? 'border-primary/30 bg-primary/5' : 'opacity-85'}`}
    >
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className={`p-2 rounded-full ${
            achievement.completed 
              ? 'bg-primary/20 text-primary' 
              : 'bg-muted text-muted-foreground'
          }`}>
            <AchievementIcon size={24} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{achievement.title}</h3>
              {achievement.completed && (
                <Badge className="bg-primary/10 text-primary border-primary/30">
                  Completed
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{achievement.description}</p>
            
            <div className="pt-2">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>{achievement.category}</span>
                <span>{achievement.progress}/{achievement.total}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div 
                  className="bg-primary h-1.5 rounded-full" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            
            {achievement.completed && achievement.dateEarned && (
              <div className="flex items-center text-xs text-muted-foreground pt-2">
                <Clock size={12} className="mr-1" />
                Earned on {achievement.dateEarned}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
