
import React from 'react';
import { ArrowLeft, Brain, Clock, CheckCircle, BookOpen, Coffee, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from '@/hooks/use-toast';

const ManagingExamStressPage: React.FC = () => {
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
        <h1 className="text-3xl font-bold tracking-tight mb-2">Managing Exam Stress</h1>
        <div className="flex items-center gap-x-6 gap-y-2 flex-wrap text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Brain size={16} />
            <span>Mental Health</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>10 min read</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>Updated April 2, 2025</span>
          </div>
        </div>
      </div>

      <div className="prose max-w-none">
        <p className="lead text-lg text-muted-foreground">
          Exams can be a significant source of stress for students. This guide provides practical techniques to manage exam stress effectively, improve your study habits, and maintain your wellbeing during exam periods.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Understanding Exam Stress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Exam stress is a normal response to the pressure of upcoming tests. It can manifest in various ways:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Physical symptoms: Headaches, rapid heartbeat, upset stomach, sleep disturbances</li>
              <li>Emotional symptoms: Excessive worry, irritability, feelings of dread or panic</li>
              <li>Cognitive symptoms: Difficulty concentrating, negative thoughts, blanking out</li>
              <li>Behavioral symptoms: Procrastination, avoiding study, increased caffeine intake</li>
            </ul>
            <p>
              While some stress can be motivating, excessive stress impairs performance and well-being. The techniques below can help you find a healthy balance.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stress Relief</CardTitle>
            <CardDescription>Try these techniques when feeling overwhelmed</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <div className="bg-primary/10 p-1.5 rounded-full text-primary h-6 w-6 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-semibold">1</span>
                </div>
                <div>
                  <span className="font-medium">Deep Breathing</span>
                  <p className="text-sm text-muted-foreground">4-7-8 technique: Inhale for 4, hold for 7, exhale for 8 seconds</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-primary/10 p-1.5 rounded-full text-primary h-6 w-6 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-semibold">2</span>
                </div>
                <div>
                  <span className="font-medium">Grounding Exercise</span>
                  <p className="text-sm text-muted-foreground">Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-primary/10 p-1.5 rounded-full text-primary h-6 w-6 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-semibold">3</span>
                </div>
                <div>
                  <span className="font-medium">Progressive Muscle Relaxation</span>
                  <p className="text-sm text-muted-foreground">Tense and then release each muscle group in your body</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="effective-study">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-primary" />
              <span>Effective Study Techniques</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <h3 className="font-medium">Pomodoro Technique</h3>
                <p className="text-sm text-muted-foreground">
                  Break study sessions into focused 25-minute intervals separated by 5-minute breaks. After 4 intervals, take a longer 15-30 minute break.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Active Recall</h3>
                <p className="text-sm text-muted-foreground">
                  Test yourself regularly rather than passively reviewing notes. Create flashcards, practice problems, or explain concepts aloud.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Spaced Repetition</h3>
                <p className="text-sm text-muted-foreground">
                  Review material at increasing intervals over time rather than cramming all at once. This improves long-term retention.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Mind Mapping</h3>
                <p className="text-sm text-muted-foreground">
                  Create visual diagrams connecting key concepts to help understand relationships between ideas.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="self-care">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Coffee size={18} className="text-primary" />
              <span>Self-Care During Exam Period</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <h3 className="font-medium">Sleep Hygiene</h3>
                <p className="text-sm text-muted-foreground">
                  Aim for 7-9 hours of quality sleep. Maintain a consistent sleep schedule, avoid screens before bed, and create a comfortable sleep environment.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Nutrition</h3>
                <p className="text-sm text-muted-foreground">
                  Eat regular, balanced meals. Include brain-boosting foods like fatty fish, nuts, berries, and dark chocolate. Stay hydrated and limit caffeine.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Physical Activity</h3>
                <p className="text-sm text-muted-foreground">
                  Even brief exercise sessions (15-30 minutes) can reduce stress and improve cognitive function. Try walking, stretching, or yoga.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Mindfulness and Relaxation</h3>
                <p className="text-sm text-muted-foreground">
                  Practice meditation, deep breathing, or progressive muscle relaxation. Use apps like Headspace or Calm if you're new to mindfulness.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="exam-day">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-primary" />
              <span>Exam Day Strategies</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <h3 className="font-medium">Before the Exam</h3>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  <li>Get a good night's sleep rather than pulling an all-nighter</li>
                  <li>Eat a balanced meal with protein and complex carbs</li>
                  <li>Arrive early to avoid rushing and additional stress</li>
                  <li>Do a brief review of key points, but avoid cramming new material</li>
                  <li>Use positive self-talk and visualization techniques</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">During the Exam</h3>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  <li>Read all instructions carefully</li>
                  <li>Plan your time based on the point value of questions</li>
                  <li>Start with questions you find easiest to build confidence</li>
                  <li>If you feel panicky, pause for a few deep breaths</li>
                  <li>Don't worry if others finish before you—use your allotted time</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Managing Test Anxiety</h3>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  <li>Try box breathing: inhale for 4 counts, hold for 4, exhale for 4, hold for 4</li>
                  <li>Ground yourself by focusing on physical sensations</li>
                  <li>Challenge negative thoughts with realistic alternatives</li>
                  <li>Remember past successes to boost confidence</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card>
        <CardHeader>
          <CardTitle>When to Seek Additional Help</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            If your stress levels are severely affecting your daily functioning or persisting beyond exam periods, consider reaching out for professional support:
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full text-primary shrink-0 mt-0.5">
                <Brain size={18} />
              </div>
              <div>
                <span className="font-medium block mb-1">Campus Counseling Services</span>
                <p className="text-sm text-muted-foreground">
                  Free confidential counseling for all students. Located at Student Health Center, Room 302. <br />
                  Monday-Friday, 9am-5pm <br />
                  Phone: (123) 456-7890
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full text-primary shrink-0 mt-0.5">
                <BookOpen size={18} />
              </div>
              <div>
                <span className="font-medium block mb-1">Academic Support Center</span>
                <p className="text-sm text-muted-foreground">
                  Offers study skills workshops, time management coaching, and exam preparation resources. Located at Learning Commons, Room 105.
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagingExamStressPage;
