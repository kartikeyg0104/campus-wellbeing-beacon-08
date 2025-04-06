
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Laugh, 
  Smile, 
  Meh, 
  Frown, 
  CloudRain,
  Calendar,
  Send
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamification } from '@/context/GamificationContext';

const moodOptions = [
  { value: 5, label: 'Great', icon: Laugh, bgColor: 'bg-green-100 dark:bg-green-900/80', textColor: 'text-green-600 dark:text-green-400', ringColor: 'ring-green-500', borderColor: 'border-green-200 dark:border-green-800' },
  { value: 4, label: 'Good', icon: Smile, bgColor: 'bg-emerald-100 dark:bg-emerald-900/80', textColor: 'text-emerald-600 dark:text-emerald-400', ringColor: 'ring-emerald-500', borderColor: 'border-emerald-200 dark:border-emerald-800' },
  { value: 3, label: 'Okay', icon: Meh, bgColor: 'bg-yellow-100 dark:bg-yellow-900/80', textColor: 'text-yellow-600 dark:text-yellow-400', ringColor: 'ring-yellow-500', borderColor: 'border-yellow-200 dark:border-yellow-800' },
  { value: 2, label: 'Not Great', icon: Frown, bgColor: 'bg-orange-100 dark:bg-orange-900/80', textColor: 'text-orange-600 dark:text-orange-400', ringColor: 'ring-orange-500', borderColor: 'border-orange-200 dark:border-orange-800' },
  { value: 1, label: 'Struggling', icon: CloudRain, bgColor: 'bg-red-100 dark:bg-red-900/80', textColor: 'text-red-600 dark:text-red-400', ringColor: 'ring-red-500', borderColor: 'border-red-200 dark:border-red-800' },
];

export const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();
  const { addXp, checkStreak, completeQuest } = useGamification();

  const handleSubmit = () => {
    if (selectedMood === null) {
      toast({
        title: "Please select a mood",
        description: "Select how you're feeling today to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Process the mood tracking
    setTimeout(() => {
      // Award XP based on mood value (consistent XP regardless of mood)
      const xpAmount = 20;
      addXp(xpAmount, 'mood_check', 'Completed daily mood check-in');
      
      // Update streak
      const streakUpdated = checkStreak();
      
      // Complete any related quests
      completeQuest("quest_1"); // Daily mood check quest
      
      toast({
        title: "Mood tracked successfully!",
        description: "Your mood has been recorded for today.",
      });
      
      setShowConfetti(true);
      
      setTimeout(() => {
        setShowConfetti(false);
        setIsSubmitting(false);
        setSelectedMood(null);
        setNotes('');
      }, 3000);
    }, 1000);
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const getMoodFeedback = () => {
    if (selectedMood === null) return null;
    
    const feedbacks = [
      "It's okay to have difficult days. Reach out if you need support.",
      "Take extra care of yourself today. Small acts of self-care help.",
      "Balance is key. Take some time to relax today.",
      "You're doing well! Keep up those positive activities.",
      "Fantastic! What's contributing to your great mood today?"
    ];
    
    return feedbacks[selectedMood - 1];
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/90 dark:bg-gray-900/90 shadow-card hover:shadow-card-hover border backdrop-blur-sm relative overflow-hidden transition-all duration-300">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px]">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: -10, 
                  x: 0, 
                  rotate: 0, 
                  opacity: 1 
                }}
                animate={{ 
                  y: 500, 
                  x: Math.random() * 500 - 250, 
                  rotate: Math.random() * 360, 
                  opacity: 0 
                }}
                transition={{ 
                  duration: Math.random() * 2 + 1,
                  ease: "easeOut"
                }}
                className={cn(
                  "absolute w-3 h-3 rounded-full",
                  i % 5 === 0 ? "bg-xp" : 
                  i % 5 === 1 ? "bg-level" : 
                  i % 5 === 2 ? "bg-wellness-calm" : 
                  i % 5 === 3 ? "bg-wellness-energize" : 
                  "bg-wellness-balance"
                )}
              />
            ))}
          </div>
        </div>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-foreground">Daily Mood Check-in</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
            <Calendar size={16} className="mr-1" />
            {today}
          </div>
        </div>
        <CardDescription className="text-muted-foreground">
          How are you feeling today? Your responses are confidential.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex justify-between mb-8 gap-1">
          {moodOptions.map((mood) => (
            <motion.button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={cn(
                "mood-scale-item border-2",
                mood.bgColor,
                mood.textColor,
                mood.borderColor,
                "hover:scale-110 transition-all",
                selectedMood === mood.value && `ring-2 ${mood.ringColor} ring-offset-2`
              )}
              aria-label={mood.label}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <mood.icon size={24} />
              <span className="text-xs mt-1 font-medium">{mood.label}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {selectedMood !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className={cn(
                "p-3 rounded-lg mb-4 text-sm border",
                selectedMood >= 4 ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400" : 
                selectedMood === 3 ? "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-900/50 text-yellow-700 dark:text-yellow-400" :
                "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900/50 text-orange-700 dark:text-orange-400"
              )}>
                {getMoodFeedback()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-2">
          <label htmlFor="notes" className="text-sm font-medium text-foreground">
            What's on your mind today? (Optional)
          </label>
          <Textarea
            id="notes"
            placeholder="Share your thoughts, challenges, or victories..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="resize-none bg-white/50 dark:bg-gray-800/50 border-border focus:border-primary"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <motion.div
                className="mr-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Calendar size={16} />
              </motion.div>
              Saving...
            </>
          ) : (
            <>
              <Send size={16} className="mr-2" />
              Save Today's Mood
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
