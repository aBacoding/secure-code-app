import React, { type FC, type ReactElement } from 'react';
import { Button } from '@/shared/components/ui';
import { useNavigate } from 'react-router-dom';

export const MainHero: FC = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Secure Code Analysis Platform</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Analyze your code for security vulnerabilities and get instant feedback
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/generate')}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/examples')}>
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
