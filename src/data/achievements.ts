
import { Sun, Droplet, Brain, Crown, BookOpen, Moon, MessageSquare, Compass } from 'lucide-react';
import { Achievement } from '@/types/achievement';

// Sample achievements data
export const achievementsData: Achievement[] = [
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
