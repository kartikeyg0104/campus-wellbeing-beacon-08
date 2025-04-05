
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
  Moon
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
      name: newHabit.trim(),
      completed: false,
      streak: 0,
    };

    setHabits([...habits, newHabitItem]);
    setNewHabit('');
    
    toast({
      title: "Habit created",
      description: `"${newHabit}" has been added to your habits.`,
    });
  };

  const toggleHabit = (id: number) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const completed = !habit.completed;
        return { 
          ...habit, 
          completed,
          streak: completed ? habit.streak + 1 : habit.streak,
        };
      }
      return habit;
    }));
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const completedCount = habits.filter(habit => habit.completed).length;
  const progressPercentage = habits.length > 0 
    ? Math.round((completedCount / habits.length) * 100) 
    : 0;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Daily Habits</CardTitle>
        <CardDescription>
          Track your wellness routines to build consistent habits.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Today's Progress</span>
            <span className="font-medium">{completedCount}/{habits.length} completed</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="border rounded-md divide-y">
          {habits.map((habit) => {
            const HabitIcon = habitIcons[habit.name] || Plus;
            
            return (
              <div 
                key={habit.id} 
                className="flex items-center justify-between p-3 hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-full ${habit.completed ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    <HabitIcon size={18} />
                  </div>
                  <div>
                    <p className="font-medium">{habit.name}</p>
                    {habit.streak > 0 && (
                      <span className="streak-badge">
                        {habit.streak} day streak 🔥
                      </span>
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
                    onClick={() => deleteHabit(habit.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Input
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Add a new habit..."
          onKeyDown={(e) => e.key === 'Enter' && addHabit()}
        />
        <Button onClick={addHabit}>
          <Plus size={16} className="mr-2" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};
