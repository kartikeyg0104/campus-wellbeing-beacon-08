
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
  Users
} from 'lucide-react';

// Resource categories
const categories = [
  { id: 'all', name: 'All', icon: Globe },
  { id: 'mental', name: 'Mental Health', icon: Brain },
  { id: 'selfcare', name: 'Self-Care', icon: Heart },
  { id: 'academic', name: 'Academic', icon: BookOpen },
  { id: 'sleep', name: 'Sleep', icon: Moon },
  { id: 'social', name: 'Social', icon: Users },
];

// Campus resources
const campusResources = [
  {
    id: 1,
    title: 'Student Counseling Center',
    description: 'Professional mental health services for all students.',
    type: 'Service',
    categories: ['mental'],
    location: 'Student Health Building, Room 203',
    hours: 'Mon-Fri: 9am-5pm',
    phone: '(555) 123-4567',
    website: 'https://university.edu/counseling',
  },
  {
    id: 2,
    title: 'Peer Support Network',
    description: 'Connect with trained student volunteers for emotional support.',
    type: 'Service',
    categories: ['mental', 'social'],
    location: 'Student Union, Room 102',
    hours: 'Mon-Thu: 6pm-9pm',
    phone: '(555) 987-6543',
    website: 'https://university.edu/peer-support',
  },
  {
    id: 3,
    title: 'Wellness Center',
    description: 'Fitness classes, nutrition counseling, and wellness programs.',
    type: 'Service',
    categories: ['selfcare'],
    location: 'Campus Recreation Building',
    hours: 'Mon-Fri: 7am-10pm, Sat-Sun: 8am-8pm',
    phone: '(555) 456-7890',
    website: 'https://university.edu/wellness',
  },
  {
    id: 4,
    title: 'Academic Success Center',
    description: 'Tutoring, workshops, and resources for academic excellence.',
    type: 'Service',
    categories: ['academic'],
    location: 'Library, 2nd Floor',
    hours: 'Mon-Thu: 9am-8pm, Fri: 9am-5pm',
    phone: '(555) 234-5678',
    website: 'https://university.edu/academic-success',
  },
];

// Educational resources
const educationalResources = [
  {
    id: 1,
    title: 'Understanding Anxiety in College',
    description: 'Learn about common triggers and coping strategies for anxiety.',
    type: 'Article',
    categories: ['mental'],
    author: 'Dr. Sarah Johnson',
    readTime: '8 min read',
    link: '/resources/anxiety',
  },
  {
    id: 2,
    title: 'Mindfulness Meditation Guide',
    description: 'Simple meditation practices to reduce stress and improve focus.',
    type: 'Video',
    categories: ['mental', 'selfcare'],
    author: 'Mindful Campus Initiative',
    duration: '15 min',
    link: '/resources/meditation',
  },
  {
    id: 3,
    title: 'Better Sleep for Better Grades',
    description: 'How sleep affects academic performance and tips for better rest.',
    type: 'Article',
    categories: ['sleep', 'academic'],
    author: 'University Sleep Research Lab',
    readTime: '12 min read',
    link: '/resources/sleep',
  },
  {
    id: 4,
    title: 'Healthy Eating on a Student Budget',
    description: 'Nutritious meal ideas that are affordable and easy to prepare.',
    type: 'Guide',
    categories: ['selfcare'],
    author: 'Campus Nutrition Services',
    readTime: '10 min read',
    link: '/resources/nutrition',
  },
  {
    id: 5,
    title: 'Stress Management During Exams',
    description: 'Techniques to stay calm and focused during high-pressure academic periods.',
    type: 'Audio',
    categories: ['mental', 'academic'],
    author: 'Dr. Michael Rivera',
    duration: '22 min',
    link: '/resources/exam-stress',
  },
  {
    id: 6,
    title: 'Building Meaningful Connections on Campus',
    description: 'Strategies for making friends and building your support network.',
    type: 'Guide',
    categories: ['social'],
    author: 'Student Life Office',
    readTime: '15 min read',
    link: '/resources/connections',
  },
];

// Resource type icons
const resourceTypeIcons: Record<string, React.ElementType> = {
  'Article': FileText,
  'Video': Video,
  'Audio': Headphones,
  'Guide': BookOpen,
  'Service': MapPin,
};

const ResourcesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('campus');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter resources based on search query and category
  const filterResources = (resources: any[]) => {
    return resources.filter(resource => {
      const matchesSearch = 
        searchQuery === '' || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        activeCategory === 'all' || 
        resource.categories.includes(activeCategory);
      
      return matchesSearch && matchesCategory;
    });
  };

  const filteredCampusResources = filterResources(campusResources);
  const filteredEducationalResources = filterResources(educationalResources);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Wellness Resources</h1>
        <p className="text-muted-foreground">
          Discover campus services and educational content to support your wellbeing.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex-shrink-0 flex overflow-x-auto gap-2 pb-1">
          {categories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center gap-1.5"
              >
                <CategoryIcon size={16} />
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="campus">Campus Services</TabsTrigger>
          <TabsTrigger value="educational">Educational Content</TabsTrigger>
        </TabsList>
        
        <TabsContent value="campus" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredCampusResources.length > 0 ? (
              filteredCampusResources.map((resource) => {
                const TypeIcon = resourceTypeIcons[resource.type] || Globe;
                
                return (
                  <Card key={resource.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{resource.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {resource.description}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="ml-2 shrink-0">
                          {resource.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                          <span>{resource.location}</span>
                        </div>
                        <div className="flex items-start">
                          <Clock className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                          <span>{resource.hours}</span>
                        </div>
                        <div className="flex items-start">
                          <Phone className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                          <span>{resource.phone}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <a href={resource.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="mr-2 h-4 w-4" />
                          Visit Website
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-2 flex flex-col items-center justify-center p-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground opacity-30 mb-4" />
                <h3 className="text-lg font-medium">No matching resources found</h3>
                <p className="text-muted-foreground mt-1">
                  Try adjusting your search or category filters
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="educational" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEducationalResources.length > 0 ? (
              filteredEducationalResources.map((resource) => {
                const TypeIcon = resourceTypeIcons[resource.type] || Globe;
                
                return (
                  <Card key={resource.id} className="overflow-hidden">
                    <div className="h-2 bg-primary" />
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <TypeIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <CardDescription className="mt-1.5">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">By {resource.author}</span>
                        <Badge variant="secondary" className="font-normal">
                          {resource.readTime || resource.duration}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <a href={resource.link}>
                          View Resource
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-3 flex flex-col items-center justify-center p-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground opacity-30 mb-4" />
                <h3 className="text-lg font-medium">No matching resources found</h3>
                <p className="text-muted-foreground mt-1">
                  Try adjusting your search or category filters
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResourcesPage;
