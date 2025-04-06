
import React, { useState } from 'react';
import { useGamification } from '@/context/GamificationContext';
import { PageTitle } from '@/components/ui/page-title';
import { QuestCard } from '@/components/gamification/QuestCard';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { LevelProgressBar } from '@/components/gamification/LevelProgressBar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Quest } from '@/types/gamification';

const QuestsPage = () => {
  const { gameState } = useGamification();
  const [activeTab, setActiveTab] = useState<string>('all');

  const filterQuests = (quests: Quest[], filter: string) => {
    switch (filter) {
      case 'daily':
        return quests.filter(quest => quest.type === 'daily');
      case 'weekly':
        return quests.filter(quest => quest.type === 'weekly');
      case 'challenges':
        return quests.filter(quest => quest.type === 'challenge');
      case 'completed':
        return quests.filter(quest => quest.completed);
      case 'active':
        return quests.filter(quest => !quest.completed);
      default:
        return quests;
    }
  };
  
  const filteredQuests = filterQuests(gameState.quests, activeTab);

  return (
    <div className="space-y-6">
      <PageTitle
        title="Quests"
        description="Complete wellness quests to earn XP and badges"
      />
      
      <div className="bg-card rounded-lg border shadow-sm p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Your Progress</h3>
        <LevelProgressBar className="mb-4" />
        <p className="text-sm text-muted-foreground">
          Complete quests to earn XP and level up your wellness journey.
        </p>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Quests</TabsTrigger>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          {filteredQuests.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredQuests.map(quest => (
                <QuestCard key={quest.id} quest={quest} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No quests available</h3>
              <p className="text-muted-foreground">
                {activeTab === 'completed' 
                  ? "You haven't completed any quests yet. Start with some daily quests!"
                  : "No quests available in this category right now. Check back soon!"}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuestsPage;
