
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
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
import { Resource } from '@/types/resource';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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

const getCategoryColors = (category: Resource['category']) => {
  switch (category) {
    case 'mental':
      return {
        bg: 'bg-wellness-focus',
        text: 'text-primary',
        gradientFrom: 'from-wellness-focus/20',
        gradientTo: 'to-wellness-focus/5'
      };
    case 'physical':
      return {
        bg: 'bg-wellness-energize',
        text: 'text-amber-700 dark:text-amber-400',
        gradientFrom: 'from-wellness-energize/20',
        gradientTo: 'to-wellness-energize/5'
      };
    case 'academic':
      return {
        bg: 'bg-wellness-calm',
        text: 'text-blue-700 dark:text-blue-400',
        gradientFrom: 'from-wellness-calm/20',
        gradientTo: 'to-wellness-calm/5'
      };
    case 'social':
      return {
        bg: 'bg-wellness-balance',
        text: 'text-pink-700 dark:text-pink-400',
        gradientFrom: 'from-wellness-balance/20',
        gradientTo: 'to-wellness-balance/5'
      };
    case 'sleep':
      return {
        bg: 'bg-wellness-soothe',
        text: 'text-teal-700 dark:text-teal-400',
        gradientFrom: 'from-wellness-soothe/20',
        gradientTo: 'to-wellness-soothe/5'
      };
    default:
      return {
        bg: 'bg-muted',
        text: 'text-foreground',
        gradientFrom: 'from-muted/50',
        gradientTo: 'to-muted/10'
      };
  }
};

interface ResourceCardProps {
  resource: Resource;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const ResourceIcon = getResourceIcon(resource.type);
  const CategoryIcon = getCategoryIcon(resource.category);
  const categoryColors = getCategoryColors(resource.category);
  
  // Check if link is internal (starts with /) and properly format it
  const isInternalLink = resource.link && resource.link.startsWith('/');
  const formattedLink = isInternalLink ? `/app${resource.link}` : resource.link;
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card key={resource.id} className={cn(
        "overflow-hidden h-full flex flex-col border bg-gradient-to-b",
        categoryColors.gradientFrom,
        categoryColors.gradientTo,
        "dark:border-gray-800"
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="bg-background/40 backdrop-blur-sm">
              <ResourceIcon className="h-3 w-3 mr-1" />
              {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
            </Badge>
            <div className={cn(
              "rounded-full p-1.5",
              categoryColors.bg
            )}>
              <CategoryIcon className={cn("h-4 w-4", categoryColors.text)} />
            </div>
          </div>
          <CardTitle className="text-lg mt-2">{resource.title}</CardTitle>
          <CardDescription>{resource.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-3 flex-grow">
          <div className="flex flex-wrap gap-2">
            {resource.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-background/40 backdrop-blur-sm hover:bg-background/60">
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
        <CardFooter className="mt-auto pt-3 border-t border-border/30">
          {resource.link && (
            isInternalLink ? (
              <Button variant="outline" className="w-full bg-background/40 backdrop-blur-sm hover:bg-background" asChild>
                <Link to={formattedLink}>
                  Access Resource
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button variant="outline" className="w-full bg-background/40 backdrop-blur-sm hover:bg-background" onClick={() => window.open(resource.link, '_blank', 'noopener,noreferrer')}>
                View Resource
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            )
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};
