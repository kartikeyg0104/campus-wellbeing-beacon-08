
import React from 'react';
import { Calendar } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

export const MoodHistory: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood History</CardTitle>
        <CardDescription>
          Your recent mood check-ins and notes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {moodHistory.map((entry, index) => (
            <div key={index} className="border rounded-md p-4 space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{entry.date}</span>
                </div>
                <div className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  {getMoodLabel(entry.mood)}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {entry.notes}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
