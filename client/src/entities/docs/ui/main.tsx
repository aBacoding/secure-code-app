import React, { type FC, useState, useEffect } from 'react';
import { DocsCard, EndpointCard, REQUEST_TYPES } from '@/entities/docs';
import { Separator } from '@/shared/components/ui/separator';
import { Input } from '@/shared/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { useDocsStore } from '@/features/docs/model/store';
import { type DocsEndpointResponse } from '@/features/docs/model/types';
import { setId } from '@/shared/libs';

export const DocsMain: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { docs, loading, error, fetchDocs } = useDocsStore();

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  const filteredEndpoints =
    docs?.endpoints?.filter(
      (endpoint: DocsEndpointResponse) =>
        endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
        endpoint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        endpoint.method.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading documentation...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!docs) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">No documentation available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <DocsCard docs={docs} />

      <Separator className="my-6" />

      <div>
        <h2 className="text-2xl font-bold mb-4">API Endpoints</h2>
        <div className="mb-4">
          <Input
            placeholder="Search endpoints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">ALL</TabsTrigger>
            {REQUEST_TYPES.map((method) => (
              <TabsTrigger key={method} value={method}>
                {method.toUpperCase()}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredEndpoints.length === 0 ? (
              <p className="text-muted-foreground">No endpoints found</p>
            ) : (
              filteredEndpoints.map((endpoint: DocsEndpointResponse) => (
                <EndpointCard key={setId()} endpoint={endpoint} />
              ))
            )}
          </TabsContent>

          {REQUEST_TYPES.map((method) => (
            <TabsContent key={method} value={method} className="space-y-4">
              {filteredEndpoints.filter((e: DocsEndpointResponse) => e.method.toLowerCase() === method).length === 0 ? (
                <p className="text-muted-foreground">No {method.toUpperCase()} endpoints found</p>
              ) : (
                filteredEndpoints
                  .filter((e: DocsEndpointResponse) => e.method.toLowerCase() === method)
                  .map((endpoint: DocsEndpointResponse) => <EndpointCard key={setId()} endpoint={endpoint} />)
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};
