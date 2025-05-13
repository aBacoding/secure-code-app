import React, { type FC, type ReactElement } from 'react';
import { Button } from '@/shared/components/ui';
import { useNavigate } from 'react-router-dom';

export const MainCta: FC = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Secure Your Code?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start analyzing your code today and make it more secure
          </p>
          <Button size="lg" className="mt-4" onClick={() => navigate('/analyzer')}>
            Start Free Analysis
          </Button>
        </div>
      </div>
    </section>
  );
};
