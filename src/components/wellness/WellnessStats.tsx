
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
} from 'recharts';

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
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={moodData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="day" />
                <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
                <Tooltip 
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
                  name="Mood"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="stress" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  name="Stress"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              </LineChart>
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
                    metric.positive ? 'text-green-600' : 'text-red-600'
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
