import React, { type FC } from 'react';
import { DocsMain } from '@/entities/docs';

export const DocsPage: FC = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">API Documentation</h1>
        <DocsMain />
      </div>
    </main>
  );
};
