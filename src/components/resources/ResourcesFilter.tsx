
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Resource } from '@/types/resource';

interface ResourcesFilterProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  activeCategory: 'all' | Resource['category'];
  setActiveCategory: (value: 'all' | Resource['category']) => void;
}

export const ResourcesFilter: React.FC<ResourcesFilterProps> = ({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory
}) => {
  return (
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
  );
};
