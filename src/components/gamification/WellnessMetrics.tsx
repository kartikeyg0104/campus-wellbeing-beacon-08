
import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { useGamification } from '@/context/GamificationContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Brain, Heart, Users, BookOpen, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeProvider';

export const WellnessMetrics = () => {
  const { gameState } = useGamification();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  // Transform points to data for radar chart
  const wellnessData = [
    { subject: 'Mindfulness', value: gameState.wellnessPoints.mindfulness, icon: Brain },
    { subject: 'Physical', value: gameState.wellnessPoints.physical, icon: Heart },
    { subject: 'Social', value: gameState.wellnessPoints.social, icon: Users },
    { subject: 'Academic', value: gameState.wellnessPoints.academic, icon: BookOpen },
    { subject: 'Sleep', value: gameState.wellnessPoints.sleep, icon: Moon },
  ];

  // Calculate max value for radar chart scale
  const maxValue = Math.max(...Object.values(gameState.wellnessPoints), 10);
  
  // Get category with highest value
  const highestCategory = wellnessData.sort((a, b) => b.value - a.value)[0];
  // Get category with lowest value
  const lowestCategory = wellnessData.sort((a, b) => a.value - b.value)[0];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Wellness Balance</CardTitle>
        <CardDescription>See how balanced your wellness activities are across different areas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart 
              cx="50%" 
              cy="50%" 
              outerRadius="80%" 
              data={wellnessData}
            >
              <PolarGrid stroke={isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"} />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: isDarkMode ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)", fontSize: 12 }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, maxValue + 5]} 
                tick={{ fill: isDarkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)" }}
                axisLine={false}
                tickCount={5}
              />
              <Tooltip 
                formatter={(value: number) => [value, 'Points']}
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--background)',
                  color: 'var(--foreground)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                }}
              />
              <Radar 
                name="Wellness Points" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary))" 
                fillOpacity={0.3} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 space-y-2 text-sm">
          {highestCategory.value > 0 && (
            <div className="flex items-start gap-2 bg-primary/10 p-2 rounded-md">
              <div className="p-1 rounded-full bg-primary/20 text-primary shrink-0 mt-0.5">
                <highestCategory.icon size={16} />
              </div>
              <div>
                <p className="font-medium text-primary">Your strength: {highestCategory.subject}</p>
                <p className="text-muted-foreground text-xs">
                  You're doing great with {highestCategory.subject.toLowerCase()} activities. Keep it up!
                </p>
              </div>
            </div>
          )}
          
          {lowestCategory.value < highestCategory.value * 0.5 && (
            <div className="flex items-start gap-2 bg-amber-500/10 p-2 rounded-md">
              <div className="p-1 rounded-full bg-amber-500/20 text-amber-500 shrink-0 mt-0.5">
                <lowestCategory.icon size={16} />
              </div>
              <div>
                <p className="font-medium text-amber-500">Growth opportunity: {lowestCategory.subject}</p>
                <p className="text-muted-foreground text-xs">
                  Try to focus more on {lowestCategory.subject.toLowerCase()} activities for a more balanced approach.
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
