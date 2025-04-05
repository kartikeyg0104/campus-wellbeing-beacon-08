
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  SmilePlus, 
  Smile, 
  Meh, 
  Frown, 
  FrownPlus,
  Calendar
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const moodOptions = [
  { value: 5, label: 'Great', icon: SmilePlus, color: 'bg-green-100 hover:bg-green-200 text-green-600' },
  { value: 4, label: 'Good', icon: Smile, color: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-600' },
  { value: 3, label: 'Okay', icon: Meh, color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-600' },
  { value: 2, label: 'Not Great', icon: Frown, color: 'bg-orange-100 hover:bg-orange-200 text-orange-600' },
  { value: 1, label: 'Struggling', icon: FrownPlus, color: 'bg-red-100 hover:bg-red-200 text-red-600' },
];

export const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (selectedMood === null) {
      toast({
        title: "Please select a mood",
        description: "Select how you're feeling today to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Mood tracked successfully!",
        description: "Your mood has been recorded for today.",
      });
      setIsSubmitting(false);
      setSelectedMood(null);
      setNotes('');
    }, 1000);
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Daily Mood Check-in</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar size={16} className="mr-1" />
            {today}
          </div>
        </div>
        <CardDescription>
          How are you feeling today? Your responses are confidential.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-6">
          {moodOptions.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`mood-scale-item ${mood.color} ${selectedMood === mood.value ? 'ring-2 ring-primary ring-offset-2' : ''}`}
              aria-label={mood.label}
            >
              <mood.icon size={24} />
              <span className="text-xs mt-1">{mood.label}</span>
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <label htmlFor="notes" className="text-sm font-medium">
            What's on your mind today? (Optional)
          </label>
          <Textarea
            id="notes"
            placeholder="Share your thoughts, challenges, or victories..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Today's Mood"}
        </Button>
      </CardFooter>
    </Card>
  );
};
