import React, { type FC, type ReactElement } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui';

export const MainFeatures: FC = (): ReactElement => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Analysis</CardTitle>
              <CardDescription>Get instant feedback on your code&apos;s security</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our advanced algorithms scan your code in real-time to identify potential security vulnerabilities.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comprehensive Reports</CardTitle>
              <CardDescription>Detailed security insights and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Receive detailed reports with actionable insights to improve your code&apos;s security.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Best Practices</CardTitle>
              <CardDescription>Industry-standard security guidelines</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Follow industry best practices and standards to ensure your code is secure.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
