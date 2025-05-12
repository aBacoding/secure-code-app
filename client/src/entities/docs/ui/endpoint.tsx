import React, { type FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Separator } from '@/shared/components/ui/separator';
import { getMethodColor } from '@/entities/docs';
import { type DocsEndpointResponse } from '@/features/docs';

export const EndpointCard: FC<{ endpoint: DocsEndpointResponse }> = ({ endpoint }) => {
  return (
    <Card className="w-full mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Badge className={`${getMethodColor(endpoint.method)} text-white font-mono`}>
            {endpoint.method.toUpperCase()}
          </Badge>
          <CardTitle className="text-lg font-mono">{endpoint.path}</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{endpoint.description}</p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="requestBody" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="requestBody">Request Body</TabsTrigger>
            <TabsTrigger value="responses">Responses</TabsTrigger>
          </TabsList>
          <TabsContent value="requestBody" className="p-4 border rounded-md mt-2">
            {Object.keys(endpoint.requestBody || {}).length === 0 ? (
              <p className="text-sm text-muted-foreground">No request body required</p>
            ) : (
              <div className="space-y-2">
                {Object.entries(endpoint.requestBody || {}).map(([key, type]) => (
                  <div key={key} className="grid grid-cols-2">
                    <span className="font-mono text-sm">{key}</span>
                    <span className="text-sm text-muted-foreground">{type}</span>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="responses" className="p-4 border rounded-md mt-2">
            {Object.keys(endpoint.responses || {}).length === 0 ? (
              <p className="text-sm text-muted-foreground">No responses documented</p>
            ) : (
              <div className="space-y-2">
                {Object.entries(endpoint.responses || {}).map(([code, description]) => (
                  <div key={code} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono">
                        {code}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{description}</span>
                    </div>
                    <Separator className="my-2" />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
