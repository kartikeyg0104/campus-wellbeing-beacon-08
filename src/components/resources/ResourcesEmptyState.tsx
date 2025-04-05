
import React from 'react';
import { Search } from 'lucide-react';

export const ResourcesEmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
        <Search className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">No resources found</h3>
      <p className="text-muted-foreground mt-1 max-w-md">
        Try adjusting your search or filter to find what you're looking for.
      </p>
    </div>
  );
};
