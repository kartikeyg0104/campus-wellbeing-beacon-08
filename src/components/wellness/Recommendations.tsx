
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  ExternalLink, 
  Brain, 
  Heart, 
  Coffee,
  Utensils,
  Moon
} from 'lucide-react';

interface Recommendation {
  id: number;
  category: string;
  title: string;
  description: string;
  icon: React.ElementType;
  actionLabel: string;
  actionUrl: string;
}

const recommendations: Recommendation[] = [
  {
    id: 1,
    category: 'Mindfulness',
    title: '5-Minute Breathing Exercise',
    description: 'Take a quick break to reset with this guided breathing exercise.',
    icon: Brain,
    actionLabel: 'Start Exercise',
    actionUrl: '/resources/breathing'
  },
  {
    id: 2,
    category: 'Self-Care',
    title: 'Stress Management Techniques',
    description: 'Learn effective techniques to manage exam stress and anxiety.',
    icon: Heart,
    actionLabel: 'View Techniques',
    actionUrl: '/resources/stress-management'
  },
  {
    id: 3,
    category: 'Nutrition',
    title: 'Brain-Boosting Foods',
    description: 'Foods that improve focus, memory, and cognitive function.',
    icon: Utensils,
    actionLabel: 'Explore Foods',
    actionUrl: '/resources/nutrition'
  },
  {
    id: 4,
    category: 'Sleep',
    title: 'Better Sleep Guide',
    description: 'Improve your sleep quality with these evidence-based tips.',
    icon: Moon,
    actionLabel: 'Read Guide',
    actionUrl: '/resources/sleep'
  }
];

export const WellnessRecommendations: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          <CardTitle>Personalized Recommendations</CardTitle>
        </div>
        <CardDescription>
          Based on your wellness patterns, we've curated these resources for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {recommendations.map((recommendation) => (
            <div 
              key={recommendation.id} 
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-full bg-primary/10 text-primary">
                  <recommendation.icon size={16} />
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {recommendation.category}
                </span>
              </div>
              <h3 className="font-medium mb-1">{recommendation.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {recommendation.description}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-between"
                asChild
              >
                <a href={recommendation.actionUrl}>
                  {recommendation.actionLabel}
                  <ExternalLink size={14} />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
