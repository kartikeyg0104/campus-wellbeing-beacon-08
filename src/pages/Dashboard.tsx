
import React from 'react';
import { MoodTracker } from '@/components/wellness/MoodTracker';
import { HabitTracker } from '@/components/wellness/HabitTracker';
import { WellnessRecommendations } from '@/components/wellness/Recommendations';
import { LevelProgressBar } from '@/components/gamification/LevelProgressBar';
import { StreakCounter } from '@/components/gamification/StreakCounter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGamification } from '@/context/GamificationContext';
import { BadgeDisplay } from '@/components/gamification/BadgeDisplay';
import { QuestCard } from '@/components/gamification/QuestCard';
import { Sparkles, Medal, Target, Trophy, CalendarDays, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { gameState } = useGamification();
  
  // Get most recent unlocked badge
  const latestBadge = gameState.badges
    .filter(badge => badge.unlocked && badge.earnedOn)
    .sort((a, b) => {
      if (a.earnedOn && b.earnedOn) {
        return new Date(b.earnedOn).getTime() - new Date(a.earnedOn).getTime();
      }
      return 0;
    })[0];
  
  // Get active quests (not completed)
  const activeQuests = gameState.quests
    .filter(quest => !quest.completed)
    .sort((a, b) => {
      // Sort by type: daily first, then weekly, then challenges
      const typeOrder = { daily: 0, weekly: 1, challenge: 2 };
      return typeOrder[a.type] - typeOrder[b.type];
    })
    .slice(0, 3);
  
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div className="md:col-span-2 lg:col-span-1 lg:row-span-2 space-y-6">
        <MoodTracker />
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <CalendarDays size={18} />
              Daily Habits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <HabitTracker />
          </CardContent>
        </Card>
      </div>
      
      <Card className="sm:col-span-1 md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle>Wellness Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="space-y-1 w-full sm:w-auto">
              <h3 className="font-medium flex items-center gap-1.5">
                <Trophy size={16} className="text-level" />
                Level {gameState.level}
              </h3>
              <LevelProgressBar showDetail={true} className="w-full sm:w-64" />
            </div>
            
            <div className="flex flex-wrap items-center gap-4 mt-2 sm:mt-0 justify-center sm:justify-start">
              <div className="flex flex-col items-center">
                <span className="text-sm text-muted-foreground">Total XP</span>
                <div className="flex items-center gap-1">
                  <Sparkles size={14} className="text-xp" />
                  <span className="font-semibold">{gameState.totalXp.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <span className="text-sm text-muted-foreground">Streak</span>
                <div className="flex items-center">
                  <StreakCounter showLabel={false} />
                  <span className="text-xs ml-1">days</span>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <span className="text-sm text-muted-foreground">Badges</span>
                <div className="flex items-center gap-1">
                  <Medal size={14} className="text-badge" />
                  <span className="font-semibold">
                    {gameState.badges.filter(b => b.unlocked).length}/{gameState.badges.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="quests" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="quests" className="flex-1">
                <div className="flex items-center justify-center gap-1.5">
                  <Target size={16} />
                  <span>Quests</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="badges" className="flex-1">
                <div className="flex items-center justify-center gap-1.5">
                  <Medal size={16} />
                  <span>Recent Badge</span>
                </div>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="quests" className="h-full space-y-4">
              {activeQuests.length > 0 ? (
                <div className="space-y-3">
                  {activeQuests.map(quest => (
                    <QuestCard key={quest.id} quest={quest} />
                  ))}
                  
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/app/quests">
                      View All Quests
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 flex flex-col items-center">
                  <Target size={40} className="text-muted-foreground/50 mb-2" />
                  <h3 className="font-medium">All quests completed!</h3>
                  <p className="text-sm text-muted-foreground">Check back later for new quests</p>
                  
                  <Button variant="outline" className="mt-4" asChild>
                    <Link to="/app/quests">
                      View Completed Quests
                    </Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="badges" className="py-4">
              {latestBadge ? (
                <motion.div 
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-3">
                    <BadgeDisplay badge={latestBadge} size="lg" showProgress={false} />
                  </div>
                  <h3 className="font-medium">{latestBadge.name}</h3>
                  <p className="text-sm text-muted-foreground">{latestBadge.description}</p>
                  {latestBadge.earnedOn && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Earned on {new Date(latestBadge.earnedOn).toLocaleDateString()}
                    </p>
                  )}
                  
                  <Button variant="outline" className="mt-4" asChild>
                    <Link to="/app/achievements">
                      View All Badges
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </Button>
                </motion.div>
              ) : (
                <div className="text-center py-8 flex flex-col items-center">
                  <Medal size={40} className="text-muted-foreground/50 mb-2" />
                  <h3 className="font-medium">No badges yet</h3>
                  <p className="text-sm text-muted-foreground">Complete quests to earn badges</p>
                  
                  <Button variant="outline" className="mt-4" asChild>
                    <Link to="/app/achievements">
                      View Available Badges
                    </Link>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="sm:col-span-1 md:col-span-2">
        <WellnessRecommendations />
      </div>
    </div>
  );
};

export default Dashboard;
