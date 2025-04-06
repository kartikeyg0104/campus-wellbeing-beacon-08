
import { LucideIcon } from "lucide-react";

export interface XpEvent {
  id: string;
  type: 'mood_check' | 'habit_complete' | 'resource_view' | 'meditation' | 'journal_entry' | 'survey' | 'quest_complete' | 'streak_milestone';
  amount: number;
  description: string;
  timestamp: Date;
}

export interface Level {
  level: number;
  title: string;
  requiredXp: number;
  benefit: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>; // Changed from LucideIcon to React.ComponentType<any> to be more explicit
  earnedOn?: Date;
  progress: number;
  total: number;
  unlocked: boolean;
  category: 'mindfulness' | 'physical' | 'social' | 'academic' | 'sleep' | 'engagement';
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  badgeReward?: string;
  deadline?: Date;
  completed: boolean;
  progress: number;
  total: number;
  type: 'daily' | 'weekly' | 'challenge';
}

export interface Milestone {
  id: string;
  level: number;
  title: string;
  description: string;
  rewardType: 'badge' | 'feature' | 'theme';
  rewardId?: string;
  rewardName: string;
  unlocked: boolean;
}

export interface Streak {
  currentStreak: number;
  longestStreak: number;
  lastCheckIn: Date | null;
}

export interface WellnessPoints {
  mindfulness: number;
  physical: number;
  social: number;
  academic: number;
  sleep: number;
}

export interface GameState {
  currentXp: number;
  totalXp: number;
  level: number;
  nextLevelXp: number;
  streak: Streak;
  wellnessPoints: WellnessPoints;
  recentEvents: XpEvent[];
  quests: Quest[];
  badges: Badge[];
  milestones: Milestone[];
}
