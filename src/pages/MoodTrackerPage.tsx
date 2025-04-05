
import React from 'react';
import { MoodTracker } from '@/components/wellness/MoodTracker';
import { MoodHistory } from '@/components/wellness/MoodHistory';
import { MoodAnalytics } from '@/components/wellness/MoodAnalytics';

const MoodTrackerPage: React.FC = () => {
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
        <MoodHistory />
      </div>

      <MoodAnalytics />
    </div>
  );
};

export default MoodTrackerPage;
