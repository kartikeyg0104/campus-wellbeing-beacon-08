
import React from 'react';
import { AchievementCard } from '@/components/achievements/AchievementCard';
import { AchievementSummary } from '@/components/achievements/AchievementSummary';
import { achievementsData } from '@/data/achievements';

const AchievementsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
        <p className="text-muted-foreground">
          Track your wellness journey milestones and accomplishments.
        </p>
      </div>
      
      <AchievementSummary achievements={achievementsData} />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {achievementsData.map((achievement) => (
          <AchievementCard 
            key={achievement.id} 
            achievement={achievement} 
          />
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;
