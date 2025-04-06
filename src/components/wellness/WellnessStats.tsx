
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
} from 'recharts';
import { useTheme } from '@/context/ThemeProvider';

// Sample mood data for the past week
const moodData = [
  { day: 'Mon', mood: 3, stress: 4 },
  { day: 'Tue', mood: 4, stress: 3 },
  { day: 'Wed', mood: 2, stress: 5 },
  { day: 'Thu', mood: 3, stress: 4 },
  { day: 'Fri', mood: 4, stress: 2 },
  { day: 'Sat', mood: 5, stress: 1 },
  { day: 'Sun', mood: 4, stress: 2 },
];

// Sample wellness metrics
const wellnessMetrics = [
  { name: 'Mood Average', value: '3.6/5', change: '+0.4', positive: true },
  { name: 'Stress Level', value: '3.0/5', change: '-0.5', positive: true },
  { name: 'Habit Streak', value: '6 days', change: '+2', positive: true },
  { name: 'Sleep Quality', value: '7.2/10', change: '-0.3', positive: false },
];

export const WellnessStats: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Define colors based on theme
  const moodColor = isDarkMode ? '#9b87f5' : 'hsl(var(--primary))';
  const stressColor = isDarkMode ? '#f87171' : 'hsl(var(--destructive))';

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Wellness Trends</CardTitle>
          <CardDescription>
            View your mood and stress patterns over the past week.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full bg-card/50 border border-border rounded-md p-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={moodData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 10,
                }}
              >
                <defs>
                  <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={moodColor} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={moodColor} stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={stressColor} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={stressColor} stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} stroke="var(--border)" />
                <XAxis 
                  dataKey="day" 
                  tick={{ fill: 'var(--foreground)', fontSize: 12 }}
                  axisLine={{ stroke: 'var(--border)' }}
                  tickLine={{ stroke: 'var(--border)' }}
                />
                <YAxis 
                  domain={[1, 5]} 
                  ticks={[1, 2, 3, 4, 5]} 
                  tick={{ fill: 'var(--foreground)', fontSize: 12 }}
                  axisLine={{ stroke: 'var(--border)' }}
                  tickLine={{ stroke: 'var(--border)' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="mood" 
                  stroke={moodColor} 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorMood)"
                  name="Mood"
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="stress" 
                  stroke={stressColor} 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorStress)"
                  name="Stress"
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {wellnessMetrics.map((metric) => (
          <Card key={metric.name}>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {metric.name}
                </p>
                <div className="flex items-end justify-between">
                  <h3 className="text-2xl font-bold">{metric.value}</h3>
                  <span className={`text-sm font-medium flex items-center ${
                    metric.positive ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
