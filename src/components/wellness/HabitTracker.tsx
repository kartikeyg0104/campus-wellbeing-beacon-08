
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Check, 
  Trash2,
  Droplet,
  Dumbbell,
  Brain,
  BookOpen,
  Sun,
  Moon,
  Trophy
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define habit icons
const habitIcons: Record<string, React.ElementType> = {
  'Hydration': Droplet,
  'Exercise': Dumbbell,
  'Meditation': Brain,
  'Reading': BookOpen,
  'Morning Routine': Sun,
  'Sleep Routine': Moon,
};

// Initial habits data
const initialHabits = [
  { id: 1, name: 'Hydration', completed: false, streak: 3 },
  { id: 2, name: 'Exercise', completed: false, streak: 1 },
  { id: 3, name: 'Meditation', completed: true, streak: 7 },
  { id: 4, name: 'Reading', completed: false, streak: 0 },
];

export const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState(initialHabits);
  const [newHabit, setNewHabit] = useState('');
  const [selectedHabitType, setSelectedHabitType] = useState('Hydration');
  const [isAddingHabit, setIsAddingHabit] = useState(false);
  const { toast } = useToast();

  const addHabit = () => {
    if (!newHabit.trim()) {
      toast({
        title: "Habit name required",
        description: "Please enter a habit name.",
        variant: "destructive",
      });
      return;
    }

    const newHabitItem = {
      id: Date.now(),
      name: selectedHabitType || newHabit.trim(),
      completed: false,
      streak: 0,
    };

    setHabits([...habits, newHabitItem]);
    setNewHabit('');
    setIsAddingHabit(false);
    
    toast({
      title: "Habit created",
      description: `"${selectedHabitType || newHabit}" has been added to your habits.`,
    });
  };

  const toggleHabit = (id: number) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const completed = !habit.completed;
        
        if (completed) {
          toast({
            title: `${habit.name} completed!`,
            description: habit.streak === 0 
              ? "Great job! Keep it up to build a streak."
              : `You're on a ${habit.streak + 1} day streak! 🔥`,
          });
        }
        
        return { 
          ...habit, 
          completed,
          streak: completed ? habit.streak + 1 : habit.streak,
        };
      }
      return habit;
    }));
  };

  const deleteHabit = (id: number, name: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
    toast({
      title: "Habit removed",
      description: `"${name}" has been removed from your habits.`,
    });
  };

  const completedCount = habits.filter(habit => habit.completed).length;
  const progressPercentage = habits.length > 0 
    ? Math.round((completedCount / habits.length) * 100) 
    : 0;

  const getStreakColor = (streak: number) => {
    if (streak >= 7) return "text-primary bg-primary/10 dark:bg-primary/20";
    if (streak >= 3) return "text-orange-500 bg-orange-100 dark:bg-orange-900/20";
    return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20";
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>Today's Progress</span>
          <span className="font-medium">{completedCount}/{habits.length} completed</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      <div className="rounded-md divide-y divide-border/50 bg-background/50 dark:bg-gray-900/20 backdrop-blur-sm">
        <AnimatePresence>
          {habits.map((habit) => {
            const HabitIcon = habitIcons[habit.name] || Plus;
            
            return (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <motion.div 
                  className="flex items-center justify-between p-3 hover:bg-muted/50 transition-colors"
                  whileHover={{ backgroundColor: 'rgba(0,0,0,0.03)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-1.5 rounded-full",
                      habit.completed 
                        ? "bg-primary/20 text-primary" 
                        : "bg-muted text-muted-foreground"
                    )}>
                      <HabitIcon size={18} />
                    </div>
                    <div>
                      <p className="font-medium">{habit.name}</p>
                      {habit.streak > 0 && (
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={cn(
                            "text-xs py-0.5 px-1.5 rounded-full font-medium flex items-center gap-1",
                            getStreakColor(habit.streak)
                          )}>
                            <Trophy size={10} className="shrink-0" />
                            {habit.streak} day{habit.streak !== 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={habit.completed}
                      onCheckedChange={() => toggleHabit(habit.id)}
                    />
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => deleteHabit(habit.id, habit.name)}
                      className="opacity-50 hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
        {isAddingHabit ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-3 border rounded-md space-y-3 bg-background/50 dark:bg-gray-900/20 backdrop-blur-sm">
              <div>
                <label className="text-xs font-medium mb-1.5 block text-muted-foreground">
                  Choose a preset or enter custom habit
                </label>
                <Select
                  value={selectedHabitType}
                  onValueChange={setSelectedHabitType}
                >
                  <SelectTrigger className="w-full bg-background">
                    <SelectValue placeholder="Select habit type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(habitIcons).map(habit => (
                      <SelectItem key={habit} value={habit}>
                        <div className="flex items-center gap-2">
                          {React.createElement(habitIcons[habit], { size: 14 })}
                          <span>{habit}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Input
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder="Or enter custom habit name..."
                className="bg-background"
              />
              
              <div className="flex gap-2">
                <Button onClick={addHabit} className="flex-1">
                  <Plus size={16} className="mr-2" />
                  Add Habit
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddingHabit(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <Button onClick={() => setIsAddingHabit(true)} variant="outline" className="w-full">
            <Plus size={16} className="mr-2" />
            Add New Habit
          </Button>
        )}
      </AnimatePresence>
    </div>
  );
};
