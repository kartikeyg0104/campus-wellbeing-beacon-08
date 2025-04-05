
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

// Sample time-of-day mood data
const timeOfDayData = [
  { time: 'Morning', mood: 3.2 },
  { time: 'Afternoon', mood: 3.7 },
  { time: 'Evening', mood: 3.4 },
  { time: 'Night', mood: 2.9 },
];

export const TimeOfDayChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={timeOfDayData}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis dataKey="time" />
        <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
        <Tooltip 
          formatter={(value: number) => [value.toFixed(1), 'Average Mood']}
          contentStyle={{ 
            borderRadius: '8px', 
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
          }}
        />
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
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
