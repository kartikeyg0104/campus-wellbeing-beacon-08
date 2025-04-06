
import React, { ReactNode } from 'react';

interface PageTitleProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export const PageTitle: React.FC<PageTitleProps> = ({ 
  title, 
  description,
  children 
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          {children}
        </div>
      )}
    </div>
  );
};
