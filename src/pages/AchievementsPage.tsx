
import React, { useState } from 'react';
import { useGamification } from '@/context/GamificationContext';
import { PageTitle } from '@/components/ui/page-title';
import { BadgeDisplay } from '@/components/gamification/BadgeDisplay';
import { Badge } from '@/types/gamification';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Medal, Trophy, Brain, Heart, Users, BookOpen, Moon } from 'lucide-react';

const AchievementsPage = () => {
  const { gameState } = useGamification();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [showUnlockable, setShowUnlockable] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("progress");

  const filterBadges = (badges: Badge[], filter: string, onlyUnlockable: boolean) => {
    let filtered = badges;
    
    if (filter !== 'all') {
      filtered = filtered.filter(badge => badge.category === filter);
    }
    
    if (onlyUnlockable) {
      filtered = filtered.filter(badge => badge.progress > 0 || badge.unlocked);
    }
    
    return filtered;
  };
  
  const sortBadges = (badges: Badge[], sort: string) => {
    switch (sort) {
      case "newest":
        return [...badges].sort((a, b) => {
          if (a.earnedOn && b.earnedOn) {
            return new Date(b.earnedOn).getTime() - new Date(a.earnedOn).getTime();
          }
          return a.unlocked === b.unlocked ? 0 : a.unlocked ? -1 : 1;
        });
      case "progress":
        return [...badges].sort((a, b) => {
          // First by unlocked status
          if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1;
          // Then by progress percentage
          const aProgress = a.progress / a.total;
          const bProgress = b.progress / b.total;
          return bProgress - aProgress;
        });
      case "alphabetical":
        return [...badges].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return badges;
    }
  };
  
  const filteredBadges = sortBadges(
    filterBadges(gameState.badges, activeTab, showUnlockable),
    sortBy
  );
  
  const totalBadges = gameState.badges.length;
  const unlockedBadges = gameState.badges.filter(badge => badge.unlocked).length;
  const progressPercentage = Math.round((unlockedBadges / totalBadges) * 100);
  
  return (
    <div className="space-y-6">
      <PageTitle
        title="Achievements"
        description="Track your wellness journey accomplishments and badges"
      />
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy size={20} className="text-badge" />
            Badge Collection
          </CardTitle>
          <CardDescription>Collect badges by participating in wellness activities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5 w-full sm:w-auto">
              <div className="flex justify-between text-sm">
                <span>Collection Progress</span>
                <span>{unlockedBadges}/{totalBadges} badges</span>
              </div>
              <div className="w-full sm:w-64">
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="progress">Progress</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="alphabetical">A-Z</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="show-unlockable" 
                  checked={showUnlockable} 
                  onCheckedChange={setShowUnlockable} 
                />
                <label 
                  htmlFor="show-unlockable" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Only show obtainable
                </label>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="mindfulness" className="flex items-center gap-1">
                <Brain size={14} />
                Mindfulness
              </TabsTrigger>
              <TabsTrigger value="physical" className="flex items-center gap-1">
                <Heart size={14} />
                Physical
              </TabsTrigger>
              <TabsTrigger value="academic" className="flex items-center gap-1">
                <BookOpen size={14} />
                Academic
              </TabsTrigger>
              <TabsTrigger value="social" className="flex items-center gap-1">
                <Users size={14} />
                Social
              </TabsTrigger>
              <TabsTrigger value="sleep" className="flex items-center gap-1">
                <Moon size={14} />
                Sleep
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              {filteredBadges.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {filteredBadges.map(badge => (
                    <div key={badge.id} className="flex flex-col items-center">
                      <div className="mb-3">
                        <BadgeDisplay badge={badge} size="lg" />
                      </div>
                      <h3 className="font-medium text-center">{badge.name}</h3>
                      <p className="text-sm text-muted-foreground text-center mt-1">{badge.description}</p>
                      <div className="mt-2 flex items-center justify-center">
                        <Progress 
                          value={(badge.progress / badge.total) * 100} 
                          className="h-1.5 w-32" 
                        />
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {badge.unlocked ? 'Completed' : `${badge.progress}/${badge.total}`}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center p-4 bg-muted/50 rounded-full mb-4">
                    <Medal size={32} className="text-muted-foreground opacity-40" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No badges found</h3>
                  <p className="text-muted-foreground">
                    {showUnlockable 
                      ? "Try changing your filters or complete more activities to unlock badges"
                      : "No badges match your current filter"}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementsPage;
