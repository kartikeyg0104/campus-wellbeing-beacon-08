
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '@/context/ThemeProvider';

// Sample time-of-day mood data
const timeOfDayData = [
  { time: 'Morning', mood: 3.2 },
  { time: 'Afternoon', mood: 3.7 },
  { time: 'Evening', mood: 3.4 },
  { time: 'Night', mood: 2.9 },
];

export const TimeOfDayChart: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Define colors based on theme
  const barColor = isDarkMode ? '#9b87f5' : 'hsl(var(--primary))';
  const barGradientStart = isDarkMode ? '#9b87f5' : 'hsl(var(--primary))';
  const barGradientEnd = isDarkMode ? '#7E69AB' : 'hsla(var(--primary), 0.4)';
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={timeOfDayData}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} stroke="var(--border)" />
        <XAxis 
          dataKey="time" 
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
          formatter={(value: number) => [value.toFixed(1), 'Average Mood']}
          contentStyle={{ 
            borderRadius: '8px', 
            border: '1px solid var(--border)',
            backgroundColor: 'var(--background)',
            color: 'var(--foreground)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
          }}
        />
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={barGradientStart} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={barGradientEnd} stopOpacity={0.6}/>
          </linearGradient>
        </defs>
        <Bar 
          dataKey="mood" 
          fill="url(#barGradient)" 
          stroke={barColor}
          strokeWidth={1}
          name="Average Mood"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
