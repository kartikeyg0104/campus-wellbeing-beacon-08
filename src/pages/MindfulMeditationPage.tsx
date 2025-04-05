
import React from 'react';
import { ArrowLeft, Headphones, Clock, CheckCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';

const MindfulMeditationPage: React.FC = () => {
  const { toast } = useToast();

  const handleSaveResource = () => {
    toast({
      title: "Resource Saved",
      description: "This resource has been added to your saved items.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/resources" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Resources
          </Link>
        </Button>
        <Button variant="outline" size="sm" onClick={handleSaveResource}>
          Save Resource
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Mindful Meditation Guide</h1>
        <div className="flex items-center gap-x-6 gap-y-2 flex-wrap text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Headphones size={16} />
            <span>Audio</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>10 min</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>Updated March 28, 2025</span>
          </div>
        </div>
      </div>

      <div className="prose max-w-none">
        <p className="lead text-lg text-muted-foreground">
          A 10-minute guided meditation practice designed specifically for students to help reduce stress and anxiety.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Guided Meditation Audio</CardTitle>
          <CardDescription>Follow along with this 10-minute meditation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-md p-4 flex items-center justify-center h-48">
            <p className="text-muted-foreground">Audio player would appear here</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Use This Resource</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-3">
            <li className="flex gap-3">
              <div className="bg-primary/10 p-1.5 rounded-full text-primary h-6 w-6 flex items-center justify-center mt-0.5">
                <span className="text-xs font-semibold">1</span>
              </div>
              <div>
                <span className="font-medium">Find a quiet space</span>
                <p className="text-sm text-muted-foreground">Choose a comfortable location where you won't be disturbed</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="bg-primary/10 p-1.5 rounded-full text-primary h-6 w-6 flex items-center justify-center mt-0.5">
                <span className="text-xs font-semibold">2</span>
              </div>
              <div>
                <span className="font-medium">Sit comfortably</span>
                <p className="text-sm text-muted-foreground">You can sit on a chair or cushion with your back straight</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="bg-primary/10 p-1.5 rounded-full text-primary h-6 w-6 flex items-center justify-center mt-0.5">
                <span className="text-xs font-semibold">3</span>
              </div>
              <div>
                <span className="font-medium">Press play and follow along</span>
                <p className="text-sm text-muted-foreground">Close your eyes and listen to the guided instructions</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Benefits of Regular Meditation</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <span>Reduced stress and anxiety</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <span>Improved concentration and focus</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <span>Better sleep quality</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <span>Enhanced emotional regulation</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <span>Increased self-awareness</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default MindfulMeditationPage;
