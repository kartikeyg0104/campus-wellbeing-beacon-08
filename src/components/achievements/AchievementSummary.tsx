
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy } from 'lucide-react';
import { Achievement } from '@/types/achievement';

interface AchievementSummaryProps {
  achievements: Achievement[];
}

export const AchievementSummary: React.FC<AchievementSummaryProps> = ({ achievements }) => {
  const totalAchievements = achievements.length;
  const completedAchievements = achievements.filter(achievement => achievement.completed).length;
  const progressPercentage = Math.round((completedAchievements / totalAchievements) * 100);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Your Progress</CardTitle>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <span className="font-bold">{completedAchievements}/{totalAchievements} Complete</span>
          </div>
        </div>
        <CardDescription>
          Earn achievements by maintaining healthy habits and engaging with wellness resources.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Achievement Progress</span>
            <span>{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};
