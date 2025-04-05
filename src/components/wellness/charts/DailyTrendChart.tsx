
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Sample mood history data
const moodHistory = [
  { date: 'Apr 1', mood: 3, notes: 'Feeling okay, but tired from studying late.' },
  { date: 'Apr 2', mood: 4, notes: 'Had a good day! Finished my project early.' },
  { date: 'Apr 3', mood: 2, notes: 'Stressed about upcoming exams. Not sleeping well.' },
  { date: 'Apr 4', mood: 3, notes: 'Better today. Study group was helpful.' },
];

// Mood label mapping
const getMoodLabel = (value: number) => {
  const labels = ['Struggling', 'Not Great', 'Okay', 'Good', 'Great'];
  return labels[value - 1] || 'Unknown';
};

export const DailyTrendChart: React.FC = () => {
  return (
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
  );
};
