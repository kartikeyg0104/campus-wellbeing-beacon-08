
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Sample monthly mood data
const monthlyData = [
  { date: 'Week 1', average: 3.5 },
  { date: 'Week 2', average: 3.8 },
  { date: 'Week 3', average: 3.2 },
  { date: 'Week 4', average: 4.1 },
];

export const MonthlyAverageChart: React.FC = () => {
  return (
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
        <Tooltip 
          formatter={(value: number) => [value.toFixed(1), 'Average Mood']}
          contentStyle={{ 
            borderRadius: '8px', 
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
          }}
        />
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
  );
};
