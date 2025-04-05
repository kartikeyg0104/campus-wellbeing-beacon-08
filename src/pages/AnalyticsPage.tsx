
import React from 'react';
import { MoodAnalytics } from '@/components/wellness/MoodAnalytics';

const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mood Analytics</h1>
        <p className="text-muted-foreground">
          Analyze your emotional patterns over time.
        </p>
      </div>

      <MoodAnalytics />
    </div>
  );
};

export default AnalyticsPage;
