import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  Heart, 
  Users, 
  BookOpen, 
  Moon,
  MessageSquare,
  Trophy,
  Medal,
  Award,
  Star,
  Zap,
  Flame,
  CheckSquare
} from "lucide-react";
import { 
  GameState, 
  XpEvent, 
  Level, 
  Badge, 
  Quest, 
  Milestone,
  WellnessPoints,
  Streak
} from "@/types/gamification";

interface GamificationContextType {
  gameState: GameState;
  addXp: (amount: number, type: XpEvent['type'], description: string) => void;
  completeQuest: (questId: string) => void;
  checkStreak: () => boolean;
  levels: Level[];
  progressToNextLevel: number;
}

// Define the levels
const gameLevels: Level[] = [
  { level: 1, title: "Wellness Novice", requiredXp: 0, benefit: "Access to basic resources" },
  { level: 2, title: "Mindful Initiate", requiredXp: 100, benefit: "Unlock daily quests" },
  { level: 3, title: "Balance Seeker", requiredXp: 250, benefit: "Unlock personalized insights" },
  { level: 4, title: "Wellness Apprentice", requiredXp: 500, benefit: "Unlock weekly challenges" },
  { level: 5, title: "Harmony Adept", requiredXp: 1000, benefit: "Unlock custom themes" },
  { level: 6, title: "Vitality Virtuoso", requiredXp: 2000, benefit: "Unlock achievement badges" },
  { level: 7, title: "Wellness Sage", requiredXp: 3500, benefit: "Unlock mentor features" },
  { level: 8, title: "Balance Master", requiredXp: 5500, benefit: "Unlock advanced analytics" },
  { level: 9, title: "Harmony Champion", requiredXp: 8000, benefit: "Unlock exclusive resources" },
  { level: 10, title: "Wellness Legend", requiredXp: 12000, benefit: "Unlock all features" },
];

// Initial badges
const initialBadges: Badge[] = [
  { 
    id: "badge_1", 
    name: "Mindfulness Maven", 
    description: "Complete 10 meditation sessions", 
    icon: Brain, 
    progress: 0, 
    total: 10, 
    unlocked: false, 
    category: 'mindfulness' 
  },
  { 
    id: "badge_2", 
    name: "Habit Hero", 
    description: "Maintain a 7-day streak of completing all habits", 
    icon: CheckSquare, 
    progress: 0, 
    total: 7, 
    unlocked: false, 
    category: 'engagement' 
  },
  { 
    id: "badge_3", 
    name: "Social Butterfly", 
    description: "Attend 3 campus wellness events", 
    icon: Users, 
    progress: 0, 
    total: 3, 
    unlocked: false, 
    category: 'social' 
  },
  { 
    id: "badge_4", 
    name: "Sleep Champion", 
    description: "Log 7 nights of quality sleep", 
    icon: Moon, 
    progress: 0, 
    total: 7, 
    unlocked: false, 
    category: 'sleep' 
  },
  { 
    id: "badge_5", 
    name: "Academic Ace", 
    description: "Complete 5 study sessions with breaks", 
    icon: BookOpen, 
    progress: 0, 
    total: 5, 
    unlocked: false, 
    category: 'academic' 
  },
  { 
    id: "badge_6", 
    name: "Fitness First", 
    description: "Log 10 exercise activities", 
    icon: Heart, 
    progress: 0, 
    total: 10, 
    unlocked: false, 
    category: 'physical' 
  }
];

// Initial quests
const initialQuests: Quest[] = [
  {
    id: "quest_1",
    title: "Daily Mood Check",
    description: "Record your mood to gain insights into your emotional patterns",
    xpReward: 20,
    completed: false,
    progress: 0,
    total: 1,
    type: 'daily'
  },
  {
    id: "quest_2",
    title: "Mindful Moments",
    description: "Complete a 5-minute meditation session",
    xpReward: 30,
    badgeReward: "badge_1",
    completed: false,
    progress: 0,
    total: 1,
    type: 'daily'
  },
  {
    id: "quest_3",
    title: "Weekly Wellness Review",
    description: "Review your weekly wellness analytics and set goals",
    xpReward: 50,
    completed: false,
    progress: 0,
    total: 1,
    type: 'weekly'
  },
  {
    id: "quest_4",
    title: "Campus Connection",
    description: "Attend a campus wellness event or workshop",
    xpReward: 75,
    badgeReward: "badge_3",
    completed: false,
    progress: 0,
    total: 1,
    type: 'weekly'
  },
  {
    id: "quest_5",
    title: "Sleep Improvement Challenge",
    description: "Maintain a consistent sleep schedule for a week",
    xpReward: 100,
    badgeReward: "badge_4",
    completed: false,
    progress: 0,
    total: 7,
    type: 'challenge'
  }
];

// Initial milestones
const initialMilestones: Milestone[] = [
  {
    id: "milestone_1",
    level: 2,
    title: "Wellness Explorer",
    description: "Reach Level 2 and unlock daily quests",
    rewardType: 'badge',
    rewardId: "badge_explorer",
    rewardName: "Wellness Explorer Badge",
    unlocked: false
  },
  {
    id: "milestone_2",
    level: 5,
    title: "Harmony Keeper",
    description: "Reach Level 5 and unlock custom themes",
    rewardType: 'theme',
    rewardName: "Serene Theme Pack",
    unlocked: false
  },
  {
    id: "milestone_3",
    level: 10,
    title: "Wellness Legend",
    description: "Reach Level 10 and become a Wellness Legend",
    rewardType: 'badge',
    rewardId: "badge_legend",
    rewardName: "Legendary Wellness Badge",
    unlocked: false
  }
];

const initialGameState: GameState = {
  currentXp: 0,
  totalXp: 0,
  level: 1,
  nextLevelXp: gameLevels[1].requiredXp,
  streak: {
    currentStreak: 0,
    longestStreak: 0,
    lastCheckIn: null,
  },
  wellnessPoints: {
    mindfulness: 0,
    physical: 0,
    social: 0,
    academic: 0,
    sleep: 0,
  },
  recentEvents: [],
  badges: initialBadges,
  quests: initialQuests,
  milestones: initialMilestones,
};

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(() => {
    // Try to load from localStorage
    const savedState = localStorage.getItem("gameState");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      // Convert string dates back to Date objects
      if (parsedState.streak?.lastCheckIn) {
        parsedState.streak.lastCheckIn = new Date(parsedState.streak.lastCheckIn);
      }
      parsedState.recentEvents = parsedState.recentEvents.map((event: any) => ({
        ...event,
        timestamp: new Date(event.timestamp)
      }));
      return parsedState;
    }
    return initialGameState;
  });

  const { toast } = useToast();

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  // Calculate the current level based on XP
  const calculateLevel = (xp: number): number => {
    for (let i = gameLevels.length - 1; i >= 0; i--) {
      if (xp >= gameLevels[i].requiredXp) {
        return gameLevels[i].level;
      }
    }
    return 1;
  };

  // Calculate XP needed for next level
  const getNextLevelXp = (level: number): number => {
    const nextLevel = gameLevels.find(l => l.level === level + 1);
    return nextLevel ? nextLevel.requiredXp : gameState.totalXp;
  };

  // Add XP and update level if necessary
  const addXp = (amount: number, type: XpEvent['type'], description: string) => {
    const id = crypto.randomUUID();
    const newEvent: XpEvent = {
      id,
      type,
      amount,
      description,
      timestamp: new Date()
    };

    setGameState(prevState => {
      // Update wellness points based on the activity type
      const updatedWellnessPoints = { ...prevState.wellnessPoints };
      
      switch(type) {
        case 'meditation':
          updatedWellnessPoints.mindfulness += Math.floor(amount / 5);
          break;
        case 'habit_complete':
          updatedWellnessPoints.physical += Math.floor(amount / 5);
          break;
        case 'journal_entry':
          updatedWellnessPoints.academic += Math.floor(amount / 5);
          break;
        case 'mood_check':
          updatedWellnessPoints.mindfulness += Math.floor(amount / 10);
          break;
        case 'resource_view':
          updatedWellnessPoints.academic += Math.floor(amount / 10);
          break;
        case 'quest_complete':
          // For quests, we distribute points more evenly
          updatedWellnessPoints.mindfulness += Math.floor(amount / 20);
          updatedWellnessPoints.physical += Math.floor(amount / 20);
          updatedWellnessPoints.social += Math.floor(amount / 20);
          updatedWellnessPoints.academic += Math.floor(amount / 20);
          updatedWellnessPoints.sleep += Math.floor(amount / 20);
          break;
      }

      // Calculate new total XP
      const newTotalXp = prevState.totalXp + amount;
      
      // Calculate new level
      const newLevel = calculateLevel(newTotalXp);
      const nextLevelXp = getNextLevelXp(newLevel);
      
      // Check if level up occurred
      const leveledUp = newLevel > prevState.level;
      
      // Update milestones if leveled up
      const updatedMilestones = prevState.milestones.map(milestone => {
        if (!milestone.unlocked && newLevel >= milestone.level) {
          // Show toast for unlocked milestone
          toast({
            title: "Milestone Unlocked!",
            description: `${milestone.title}: ${milestone.description}`,
          });
          return { ...milestone, unlocked: true };
        }
        return milestone;
      });
      
      if (leveledUp) {
        toast({
          title: "Level Up!",
          description: `You've reached level ${newLevel}: ${gameLevels[newLevel - 1].title}!`,
        });
      } else {
        // Only show XP toast if not level up (to avoid multiple toasts)
        toast({
          title: `+${amount} XP`,
          description: description,
        });
      }

      // Keep only the last 10 events
      const newEvents = [newEvent, ...prevState.recentEvents].slice(0, 10);
      
      return {
        ...prevState,
        currentXp: newTotalXp - (gameLevels[newLevel - 1].requiredXp || 0),
        totalXp: newTotalXp,
        level: newLevel,
        nextLevelXp,
        recentEvents: newEvents,
        wellnessPoints: updatedWellnessPoints,
        milestones: updatedMilestones,
      };
    });
  };

  // Calculate progress percentage to next level
  const progressToNextLevel = (): number => {
    const currentLevelXp = gameLevels.find(l => l.level === gameState.level)?.requiredXp || 0;
    const nextLevelXp = gameLevels.find(l => l.level === gameState.level + 1)?.requiredXp || currentLevelXp;
    const xpRange = nextLevelXp - currentLevelXp;
    
    if (xpRange <= 0) return 100;
    
    const progress = ((gameState.totalXp - currentLevelXp) / xpRange) * 100;
    return Math.min(Math.max(0, progress), 100);
  };

  // Complete a quest
  const completeQuest = (questId: string) => {
    setGameState(prevState => {
      const quest = prevState.quests.find(q => q.id === questId);
      if (!quest || quest.completed) return prevState;

      // Reward XP
      addXp(quest.xpReward, 'quest_complete', `Completed quest: ${quest.title}`);

      // Update badge progress if applicable
      let updatedBadges = [...prevState.badges];
      if (quest.badgeReward) {
        updatedBadges = updatedBadges.map(badge => {
          if (badge.id === quest.badgeReward) {
            const newProgress = badge.progress + 1;
            const unlocked = newProgress >= badge.total;
            
            if (unlocked && !badge.unlocked) {
              toast({
                title: "Badge Unlocked!",
                description: `${badge.name}: ${badge.description}`,
              });
              return { 
                ...badge, 
                progress: newProgress, 
                unlocked: true,
                earnedOn: new Date()
              };
            }
            
            return { ...badge, progress: newProgress };
          }
          return badge;
        });
      }

      // Update the quest to completed
      const updatedQuests = prevState.quests.map(q => 
        q.id === questId ? { ...q, completed: true, progress: q.total } : q
      );

      return {
        ...prevState,
        quests: updatedQuests,
        badges: updatedBadges
      };
    });
  };

  // Check and update streaks
  const checkStreak = (): boolean => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    setGameState(prevState => {
      const lastCheckIn = prevState.streak.lastCheckIn 
        ? new Date(prevState.streak.lastCheckIn) 
        : null;
        
      const lastCheckInDate = lastCheckIn 
        ? new Date(lastCheckIn.getFullYear(), lastCheckIn.getMonth(), lastCheckIn.getDate())
        : null;
      
      // If first check-in or checked in yesterday, increment streak
      let newCurrentStreak = prevState.streak.currentStreak;
      let streakBroken = false;
      
      if (!lastCheckInDate) {
        // First time checking in
        newCurrentStreak = 1;
      } else if (today.getTime() === lastCheckInDate.getTime()) {
        // Already checked in today, no change
        newCurrentStreak = prevState.streak.currentStreak;
      } else {
        // Calculate the difference in days
        const timeDiff = today.getTime() - lastCheckInDate.getTime();
        const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
        
        if (dayDiff === 1) {
          // Consecutive day, increase streak
          newCurrentStreak = prevState.streak.currentStreak + 1;
          
          // Reward XP for streak milestones
          if (newCurrentStreak % 5 === 0) {
            // Bonus XP for every 5 days
            const bonusXp = 25 * (newCurrentStreak / 5);
            addXp(bonusXp, 'streak_milestone', `${newCurrentStreak} day streak bonus!`);
          } else if (newCurrentStreak % 3 === 0) {
            // Smaller bonus for every 3 days
            addXp(15, 'streak_milestone', `${newCurrentStreak} day streak!`);
          } else {
            // Small daily bonus
            addXp(5, 'streak_milestone', `Daily streak continued!`);
          }
        } else {
          // Streak broken
          streakBroken = true;
          newCurrentStreak = 1;
          
          toast({
            title: "Streak Reset",
            description: `Your previous streak of ${prevState.streak.currentStreak} days has been reset.`,
            variant: "destructive"
          });
        }
      }
      
      // Update longest streak if current streak is longer
      const newLongestStreak = Math.max(prevState.streak.longestStreak, newCurrentStreak);
      
      // Update badges related to streaks
      const updatedBadges = prevState.badges.map(badge => {
        if (badge.id === "badge_2") {
          const newProgress = Math.min(newCurrentStreak, badge.total);
          const unlocked = newProgress >= badge.total;
          
          if (unlocked && !badge.unlocked) {
            toast({
              title: "Badge Unlocked!",
              description: `${badge.name}: ${badge.description}`,
            });
            return { 
              ...badge, 
              progress: newProgress, 
              unlocked: true,
              earnedOn: new Date()
            };
          }
          
          return { ...badge, progress: newProgress };
        }
        return badge;
      });
      
      const updatedStreak: Streak = {
        currentStreak: newCurrentStreak,
        longestStreak: newLongestStreak,
        lastCheckIn: now
      };
      
      return {
        ...prevState,
        streak: updatedStreak,
        badges: updatedBadges
      };
    });
    
    return true;
  };

  return (
    <GamificationContext.Provider
      value={{
        gameState,
        addXp,
        completeQuest,
        checkStreak,
        levels: gameLevels,
        progressToNextLevel: progressToNextLevel(),
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error("useGamification must be used within a GamificationProvider");
  }
  return context;
};
