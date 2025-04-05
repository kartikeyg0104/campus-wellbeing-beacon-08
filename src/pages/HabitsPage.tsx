
import React from 'react';
import { HabitTracker } from '@/components/wellness/HabitTracker';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Trophy, 
  Calendar, 
  Clock,
  List
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Sample habit completion data
const habitCompletionData = [
  { name: 'Hydration', completionRate: 85 },
  { name: 'Exercise', completionRate: 65 },
  { name: 'Meditation', completionRate: 90 },
  { name: 'Reading', completionRate: 55 },
  { name: 'Sleep Routine', completionRate: 75 },
  { name: 'Study Time', completionRate: 80 },
];

// Sample weekly completion data
const weeklyData = [
  { day: 'Mon', completed: 4, total: 6 },
  { day: 'Tue', completed: 5, total: 6 },
  { day: 'Wed', completed: 3, total: 6 },
  { day: 'Thu', completed: 6, total: 6 },
  { day: 'Fri', completed: 4, total: 6 },
  { day: 'Sat', completed: 5, total: 6 },
  { day: 'Sun', completed: 2, total: 6 },
];

// Achievement data
const achievements = [
  { 
    id: 1, 
    title: 'Early Bird', 
    description: 'Complete morning routine for 5 consecutive days', 
    progress: 3, 
    total: 5 
  },
  { 
    id: 2, 
    title: 'Hydration Hero', 
    description: 'Track water intake for 7 days in a row', 
    progress: 7, 
    total: 7,
    completed: true 
  },
  { 
    id: 3, 
    title: 'Mind Master', 
    description: 'Practice meditation for 10 days', 
    progress: 8, 
    total: 10 
  },
  { 
    id: 4, 
    title: 'Consistency King', 
    description: 'Complete all habits for 3 days in a row', 
    progress: 2, 
    total: 3 
  },
];

const HabitsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Habit Tracker</h1>
        <p className="text-muted-foreground">
          Build and maintain healthy routines for improved wellbeing.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <HabitTracker />

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              <CardTitle>Achievements</CardTitle>
            </div>
            <CardDescription>
              Earn badges by maintaining consistent habits.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`border rounded-md p-4 ${achievement.completed ? 'border-primary/40 bg-primary/5' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">
                        {achievement.title}
                        {achievement.completed && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">
                            Completed
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-right text-muted-foreground">
                    {achievement.progress}/{achievement.total}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <List className="h-5 w-5 text-primary" />
              <CardTitle>Habit Completion Rates</CardTitle>
            </div>
            <CardDescription>
              See which habits you're most consistent with.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={habitCompletionData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fontSize: 12 }} 
                    width={80}
                  />
                  <Tooltip formatter={(value) => [`${value}%`, 'Completion Rate']} />
                  <Bar 
                    dataKey="completionRate" 
                    fill="hsl(var(--primary))" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <CardTitle>Weekly Overview</CardTitle>
            </div>
            <CardDescription>
              Your habit completion rates for the past week.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    name="Completed" 
                    dataKey="completed" 
                    stackId="a" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    name="Missed" 
                    dataKey={(data) => data.total - data.completed} 
                    stackId="a" 
                    fill="hsl(var(--muted))" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HabitsPage;
