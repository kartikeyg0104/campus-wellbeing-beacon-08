
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Star, Crown, Medal, Target, Clock } from 'lucide-react';

// Define achievement data structure
interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  progress: number;
  total: number;
  completed: boolean;
  category: string;
  dateEarned?: string;
}

// Sample achievements data
const achievementsData: Achievement[] = [
  { 
    id: 1, 
    title: 'Early Bird', 
    description: 'Complete morning routine for 5 consecutive days', 
    icon: Sun, 
    progress: 5, 
    total: 5, 
    completed: true,
    category: 'Habits',
    dateEarned: 'March 15, 2025'
  },
  { 
    id: 2, 
    title: 'Hydration Hero', 
    description: 'Track water intake for 7 days in a row', 
    icon: Droplet, 
    progress: 7, 
    total: 7,
    completed: true,
    category: 'Habits',
    dateEarned: 'March 20, 2025'
  },
  { 
    id: 3, 
    title: 'Mind Master', 
    description: 'Practice meditation for 10 days', 
    icon: Brain, 
    progress: 8, 
    total: 10,
    completed: false,
    category: 'Mindfulness'
  },
  { 
    id: 4, 
    title: 'Consistency King', 
    description: 'Complete all habits for 3 days in a row', 
    icon: Crown, 
    progress: 2, 
    total: 3,
    completed: false,
    category: 'Habits'
  },
  { 
    id: 5, 
    title: 'Journal Journey', 
    description: 'Create 5 journal entries', 
    icon: BookOpen, 
    progress: 4, 
    total: 5,
    completed: false,
    category: 'Reflection'
  },
  { 
    id: 6, 
    title: 'Sleep Scholar', 
    description: 'Maintain a consistent sleep schedule for 7 days', 
    icon: Moon, 
    progress: 7, 
    total: 7,
    completed: true,
    category: 'Sleep',
    dateEarned: 'March 25, 2025'
  },
  { 
    id: 7, 
    title: 'Support Seeker', 
    description: 'Use the chat support feature 3 times', 
    icon: MessageSquare, 
    progress: 1, 
    total: 3,
    completed: false,
    category: 'Support'
  },
  { 
    id: 8, 
    title: 'Resource Explorer', 
    description: 'View 10 different wellness resources', 
    icon: Compass, 
    progress: 6, 
    total: 10,
    completed: false,
    category: 'Resources'
  }
];

// Import missing icons
import { Sun, Droplet, Brain, BookOpen, Moon, MessageSquare, Compass } from 'lucide-react';

const AchievementsPage: React.FC = () => {
  // Calculate total progress
  const totalAchievements = achievementsData.length;
  const completedAchievements = achievementsData.filter(achievement => achievement.completed).length;
  const progressPercentage = Math.round((completedAchievements / totalAchievements) * 100);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
        <p className="text-muted-foreground">
          Track your wellness journey milestones and accomplishments.
        </p>
      </div>
      
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
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {achievementsData.map((achievement) => {
          const AchievementIcon = achievement.icon;
          
          return (
            <Card 
              key={achievement.id} 
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
                          style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
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
        })}
      </div>
    </div>
  );
};

export default AchievementsPage;
