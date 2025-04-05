
import React, { useState } from 'react';
import { ResourcesFilter } from '@/components/resources/ResourcesFilter';
import { ResourcesList } from '@/components/resources/ResourcesList';
import { resources } from '@/data/resources';
import { Resource } from '@/types/resource';

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
      
      <ResourcesFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      
      <ResourcesList resources={filteredResources} />
    </div>
  );
};

export default ResourcesPage;
