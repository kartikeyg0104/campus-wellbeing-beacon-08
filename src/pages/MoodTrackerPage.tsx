
import React from 'react';
import { MoodTracker } from '@/components/wellness/MoodTracker';
import { MoodHistory } from '@/components/wellness/MoodHistory';
import { MoodAnalytics } from '@/components/wellness/MoodAnalytics';
import { motion } from 'framer-motion';

const MoodTrackerPage: React.FC = () => {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Mood Tracker</h1>
        <p className="text-muted-foreground">
          Track, analyze, and understand your emotional patterns.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <MoodTracker />
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <MoodHistory />
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <MoodAnalytics />
      </motion.div>
    </motion.div>
  );
};

export default MoodTrackerPage;
