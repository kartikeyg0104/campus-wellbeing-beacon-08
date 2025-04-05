import React, { useState } from 'react';
import { MoodTracker } from '@/components/wellness/MoodTracker';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  FileText,
  BarChart,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Bar,
  BarChart as RechartsBarChart,
} from 'recharts';

// Sample mood history data
const moodHistory = [
  { date: 'Apr 1', mood: 3, notes: 'Feeling okay, but tired from studying late.' },
  { date: 'Apr 2', mood: 4, notes: 'Had a good day! Finished my project early.' },
  { date: 'Apr 3', mood: 2, notes: 'Stressed about upcoming exams. Not sleeping well.' },
  { date: 'Apr 4', mood: 3, notes: 'Better today. Study group was helpful.' },
];

// Sample monthly mood data
const monthlyData = [
  { date: 'Week 1', average: 3.5 },
  { date: 'Week 2', average: 3.8 },
  { date: 'Week 3', average: 3.2 },
  { date: 'Week 4', average: 4.1 },
];

// Sample time-of-day mood data
const timeOfDayData = [
  { time: 'Morning', mood: 3.2 },
  { time: 'Afternoon', mood: 3.7 },
  { time: 'Evening', mood: 3.4 },
  { time: 'Night', mood: 2.9 },
];

// Mood label mapping
const getMoodLabel = (value: number) => {
  const labels = ['Struggling', 'Not Great', 'Okay', 'Good', 'Great'];
  return labels[value - 1] || 'Unknown';
};

const MoodTrackerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('daily');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mood Tracker</h1>
        <p className="text-muted-foreground">
          Track, analyze, and understand your emotional patterns.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <MoodTracker />

        <Card>
          <CardHeader>
            <CardTitle>Mood History</CardTitle>
            <CardDescription>
              Your recent mood check-ins and notes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {moodHistory.map((entry, index) => (
                <div key={index} className="border rounded-md p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{entry.date}</span>
                    </div>
                    <div className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {getMoodLabel(entry.mood)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {entry.notes}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mood Analytics</CardTitle>
          <CardDescription>
            Visual insights into your mood patterns.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="daily" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Daily Trend
              </TabsTrigger>
              <TabsTrigger value="monthly" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                Monthly Average
              </TabsTrigger>
              <TabsTrigger value="timeOfDay" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Time of Day
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily" className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={moodHistory}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="date" />
                  <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
                  <Tooltip 
                    formatter={(value: number) => [`${value} - ${getMoodLabel(value)}`, 'Mood']}
                    labelFormatter={(label) => `Date: ${label}`}
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="monthly" className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <defs>
                    <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="date" />
                  <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="average" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorMood)" 
                    name="Average Mood"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="timeOfDay" className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={timeOfDayData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="time" />
                  <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
                  <Tooltip />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                    </linearGradient>
                  </defs>
                  <Bar 
                    dataKey="mood" 
                    fill="url(#barGradient)" 
                    name="Average Mood"
                  />
                </RechartsBarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodTrackerPage;
