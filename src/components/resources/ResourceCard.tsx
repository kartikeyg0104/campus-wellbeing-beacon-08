
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

interface ResourceCardProps {
  resource: Resource;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const ResourceIcon = getResourceIcon(resource.type);
  const CategoryIcon = getCategoryIcon(resource.category);
  
  // Check if link is internal (starts with /) or external
  const isInternalLink = resource.link && resource.link.startsWith('/');
  
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
          isInternalLink ? (
            <Button variant="outline" className="w-full" asChild>
              <Link to={resource.link}>
                Access Resource
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" className="w-full" onClick={() => window.open(resource.link, '_blank', 'noopener,noreferrer')}>
              View Resource
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          )
        )}
      </CardFooter>
    </Card>
  );
};
