
import React from 'react';
import { MoodTracker } from '@/components/wellness/MoodTracker';
import { HabitTracker } from '@/components/wellness/HabitTracker';
import { WellnessMetrics } from '@/components/gamification/WellnessMetrics';
import { LevelProgressBar } from '@/components/gamification/LevelProgressBar';
import { QuestCard } from '@/components/gamification/QuestCard';
import { ResourceCard } from '@/components/resources/ResourceCard';
import { useGamification } from '@/context/GamificationContext';
import { resources } from '@/data/resources'; // Import the resources data

const Dashboard: React.FC = () => {
  const { gameState } = useGamification();
  
  // Get quests from gameState and resources from imported data
  const activeQuests = gameState.quests.filter(quest => !quest.completed);
  const recommendedResources = resources.slice(0, 2); // Get first 2 resources from the imported data

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <MoodTracker />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HabitTracker />
          <div className="space-y-6">
            <WellnessMetrics />
            <LevelProgressBar />
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-card border rounded-lg p-4 space-y-4">
          <h3 className="text-lg font-semibold">Active Quests</h3>
          {activeQuests.map(quest => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </div>
        
        <div className="bg-card border rounded-lg p-4 space-y-4">
          <h3 className="text-lg font-semibold">Recommended Resources</h3>
          {recommendedResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
