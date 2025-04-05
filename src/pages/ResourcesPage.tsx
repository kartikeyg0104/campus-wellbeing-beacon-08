
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Phone, 
  Clock, 
  MapPin, 
  Globe, 
  FileText, 
  Video, 
  Headphones,
  Heart,
  Brain,
  BookOpen,
  Coffee,
  Moon,
  Users,
  ExternalLink 
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'audio' | 'service';
  category: 'mental' | 'physical' | 'academic' | 'social' | 'sleep';
  tags: string[];
  link?: string;
  serviceHours?: string;
  location?: string;
  contactPhone?: string;
  contactWebsite?: string;
}

const getResourceIcon = (type: Resource['type']) => {
  switch (type) {
    case 'article': return FileText;
    case 'video': return Video;
    case 'audio': return Headphones;
    case 'service': return Users;
  }
};

const getCategoryIcon = (category: Resource['category']) => {
  switch (category) {
    case 'mental': return Brain;
    case 'physical': return Heart;
    case 'academic': return BookOpen;
    case 'social': return Coffee;
    case 'sleep': return Moon;
  }
};

const resources: Resource[] = [
  {
    id: '1',
    title: 'Managing Exam Stress',
    description: 'Learn effective techniques to handle stress during exam periods.',
    type: 'article',
    category: 'mental',
    tags: ['stress', 'exams', 'anxiety'],
    link: '/resources/managing-exam-stress'
  },
  {
    id: '2',
    title: 'Mindful Meditation Guide',
    description: 'A 10-minute guided meditation practice for students.',
    type: 'audio',
    category: 'mental',
    tags: ['meditation', 'mindfulness', 'anxiety'],
    link: '/resources/mindful-meditation'
  },
  {
    id: '3',
    title: 'Campus Counseling Services',
    description: 'Free confidential counseling services for all students.',
    type: 'service',
    category: 'mental',
    tags: ['counseling', 'mental health', 'therapy'],
    serviceHours: 'Monday-Friday, 9am-5pm',
    location: 'Student Health Center, Room 302',
    contactPhone: '(123) 456-7890',
    contactWebsite: 'https://university.edu/counseling'
  },
  {
    id: '4',
    title: 'Healthy Sleep Habits',
    description: 'Tips for improving your sleep quality and establishing a routine.',
    type: 'article',
    category: 'sleep',
    tags: ['sleep', 'health', 'routine'],
    link: '/resources/sleep-habits'
  },
  {
    id: '5',
    title: 'Yoga for Beginners',
    description: '15-minute yoga routines designed for small spaces like dorm rooms.',
    type: 'video',
    category: 'physical',
    tags: ['yoga', 'exercise', 'stress-relief'],
    link: '/resources/yoga-beginners'
  },
  {
    id: '6',
    title: 'Effective Study Techniques',
    description: 'Evidence-based study methods to improve retention and efficiency.',
    type: 'article',
    category: 'academic',
    tags: ['study', 'academic', 'productivity'],
    link: '/resources/study-techniques'
  },
  {
    id: '7',
    title: 'Social Anxiety Workshop',
    description: 'Virtual workshop series on navigating social situations in college.',
    type: 'service',
    category: 'social',
    tags: ['anxiety', 'social', 'workshop'],
    serviceHours: 'Thursdays, 6pm-7:30pm',
    location: 'Online via Zoom',
    contactWebsite: 'https://university.edu/social-workshop'
  },
  {
    id: '8',
    title: 'Nutrition for Brain Health',
    description: 'Learn how diet affects cognitive function and mental wellbeing.',
    type: 'video',
    category: 'physical',
    tags: ['nutrition', 'brain health', 'diet'],
    link: '/resources/nutrition-brain'
  }
];

const ResourcesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | Resource['category']>('all');
  
  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Wellness Resources</h1>
        <p className="text-muted-foreground">
          Discover tools, services, and information to support your wellbeing.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs 
          value={activeCategory} 
          onValueChange={(value) => setActiveCategory(value as any)}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid grid-cols-3 sm:grid-cols-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="mental">Mental</TabsTrigger>
            <TabsTrigger value="physical">Physical</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {filteredResources.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => {
            const ResourceIcon = getResourceIcon(resource.type);
            const CategoryIcon = getCategoryIcon(resource.category);
            
            return (
              <Card key={resource.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-muted">
                      <ResourceIcon className="h-3 w-3 mr-1" />
                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                    </Badge>
                    <div className="rounded-full bg-primary/10 p-1">
                      <CategoryIcon className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-lg mt-2">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {resource.type === 'service' && (
                    <div className="mt-4 space-y-2 text-sm">
                      {resource.serviceHours && (
                        <div className="flex items-start gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                          <span>{resource.serviceHours}</span>
                        </div>
                      )}
                      {resource.location && (
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                          <span>{resource.location}</span>
                        </div>
                      )}
                      {resource.contactPhone && (
                        <div className="flex items-start gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                          <span>{resource.contactPhone}</span>
                        </div>
                      )}
                      {resource.contactWebsite && (
                        <div className="flex items-start gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                          <span className="break-all">{resource.contactWebsite}</span>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {resource.link && (
                    <Button variant="outline" className="w-full" asChild>
                      <a href={resource.link} target="_blank" rel="noopener noreferrer">
                        Access Resource
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No resources found</h3>
          <p className="text-muted-foreground mt-1 max-w-md">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
