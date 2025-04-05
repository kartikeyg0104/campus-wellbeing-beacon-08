
import React from 'react';
import { MoodTracker } from '@/components/wellness/MoodTracker';
import { WellnessStats } from '@/components/wellness/WellnessStats';
import { WellnessRecommendations } from '@/components/wellness/Recommendations';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trophy } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Sample wellness scores
  const wellnessScore = 78;
  const wellnessChange = '+4';
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Alex</h1>
          <p className="text-muted-foreground">
            Monitor your wellness and build healthy habits.
          </p>
        </div>
        <div className="flex items-center bg-card rounded-lg p-4 shadow-sm">
          <div className="mr-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Trophy className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Wellness Score</p>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">{wellnessScore}</span>
              <span className="ml-1 text-xs font-medium text-green-600">{wellnessChange}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-1 lg:col-span-1">
          <MoodTracker />
        </div>
        <div className="md:col-span-1 lg:col-span-2">
          <WellnessStats />
        </div>
      </div>

      <WellnessRecommendations />

      <div className="bg-gradient-to-r from-primary/80 to-accent/80 rounded-xl p-6 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0 md:mr-6">
            <h3 className="text-xl font-semibold mb-2">Need someone to talk to?</h3>
            <p className="opacity-90 max-w-md">
              Connect with campus counselors or peer support groups. We're here to help whenever you need it.
            </p>
          </div>
          <Button className="bg-white text-primary hover:bg-white/90 shadow-sm">
            View Support Options
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
