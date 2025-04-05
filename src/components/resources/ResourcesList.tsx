
import React from 'react';
import { ResourceCard } from './ResourceCard';
import { ResourcesEmptyState } from './ResourcesEmptyState';
import { Resource } from '@/types/resource';

interface ResourcesListProps {
  resources: Resource[];
}

export const ResourcesList: React.FC<ResourcesListProps> = ({ resources }) => {
  if (resources.length === 0) {
    return <ResourcesEmptyState />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
};
