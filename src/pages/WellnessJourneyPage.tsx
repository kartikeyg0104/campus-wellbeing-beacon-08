
import React, { useRef } from 'react';
import { PageTitle } from '@/components/ui/page-title';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from '@/context/GamificationContext';
import { LevelProgressBar } from '@/components/gamification/LevelProgressBar';
import { BadgeDisplay } from '@/components/gamification/BadgeDisplay';
import { WellnessMetrics } from '@/components/gamification/WellnessMetrics';
import { RecentActivity } from '@/components/gamification/RecentActivity';
import { Button } from '@/components/ui/button';
import { Trophy, Map, Award, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WellnessJourneyPage = () => {
  const { gameState, levels } = useGamification();
  const navigate = useNavigate();
  const journeyRef = useRef<HTMLDivElement>(null);
  
  // Calculate total percentage through all levels
  const calculateOverallProgress = (): number => {
    const totalXpForAllLevels = levels[levels.length - 1].requiredXp;
    return Math.min((gameState.totalXp / totalXpForAllLevels) * 100, 100);
  };
  
  const overallProgress = calculateOverallProgress();
  
  // Get unlocked badges
  const unlockedBadges = gameState.badges.filter(badge => badge.unlocked);
  
  // Get next milestones
  const nextMilestones = gameState.milestones
    .filter(milestone => !milestone.unlocked)
    .sort((a, b) => a.level - b.level)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <PageTitle
        title="Wellness Journey"
        description="Your personalized wellness progression and achievements"
      />
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Your Journey Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="mb-6 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Trophy size={18} className="text-level" />
                  <span className="font-medium">Level {gameState.level}: {levels.find(l => l.level === gameState.level)?.title}</span>
                </div>
                <span className="text-sm text-muted-foreground">{gameState.totalXp.toLocaleString()} XP Total</span>
              </div>
              
              <LevelProgressBar showDetail={false} />
              
              {/* Journey map visualization */}
              <div className="pt-8 pb-4 px-4 overflow-x-auto" ref={journeyRef}>
                <div className="min-w-[700px] relative">
                  {/* Progress line */}
                  <div className="absolute top-3 left-0 right-0 h-0.5 bg-muted"></div>
                  <div 
                    className="absolute top-3 left-0 h-0.5 bg-gradient-to-r from-primary to-level" 
                    style={{ width: `${overallProgress}%` }}
                  ></div>
                  
                  {/* Level markers */}
                  <div className="flex justify-between relative">
                    {levels.map((level) => {
                      const isPastLevel = gameState.level > level.level;
                      const isCurrentLevel = gameState.level === level.level;
                      
                      return (
                        <div key={level.level} className="flex flex-col items-center relative">
                          <div className={`milestone-node ${
                            isPastLevel 
                              ? "bg-primary text-primary-foreground" 
                              : isCurrentLevel 
                                ? "bg-level text-white animate-pulse-gentle" 
                                : "bg-muted text-muted-foreground"
                          }`}>
                            {level.level}
                          </div>
                          
                          <div className="mt-2 text-xs text-center w-16">
                            <p className={isPastLevel || isCurrentLevel ? "font-medium" : "text-muted-foreground"}>
                              {level.title}
                            </p>
                          </div>
                          
                          {/* Active level indicator */}
                          {isCurrentLevel && (
                            <motion.div 
                              className="absolute -top-6 left-1/2 transform -translate-x-1/2"
                              initial={{ y: -5 }}
                              animate={{ y: 0 }}
                              transition={{ 
                                duration: 1,
                                repeat: Infinity,
                                repeatType: "reverse"
                              }}
                            >
                              <Map size={16} className="text-level" />
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Next milestones */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium flex items-center gap-1">
                <Map size={16} />
                Next Milestones
              </h3>
              
              {nextMilestones.length > 0 ? (
                <div className="grid gap-3">
                  {nextMilestones.map(milestone => (
                    <div key={milestone.id} className="flex items-center justify-between p-2 border rounded-md bg-background/50">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <div className="p-1 rounded-full bg-level/10">
                            <Trophy size={14} className="text-level" />
                          </div>
                          <p className="font-medium">{milestone.title}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Reach Level {milestone.level} ({levels.find(l => l.level === milestone.level)?.requiredXp.toLocaleString()} XP)
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <p>Reward: {milestone.rewardName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  You've unlocked all available milestones!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award size={18} className="text-badge" />
                Earned Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              {unlockedBadges.length > 0 ? (
                <>
                  <div className="grid grid-cols-3 gap-3">
                    {unlockedBadges.slice(0, 6).map(badge => (
                      <BadgeDisplay key={badge.id} badge={badge} size="md" showProgress={false} />
                    ))}
                  </div>
                  
                  {unlockedBadges.length > 6 && (
                    <Button 
                      variant="outline" 
                      className="w-full mt-3" 
                      onClick={() => navigate('/app/achievements')}
                    >
                      View All Badges
                      <ChevronRight size={16} className="ml-1" />
                    </Button>
                  )}
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Award size={40} className="mx-auto opacity-30 mb-2" />
                  <p>Complete quests and activities to earn badges</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <RecentActivity />
        </div>
      </div>
      
      <WellnessMetrics />
    </div>
  );
};

export default WellnessJourneyPage;
