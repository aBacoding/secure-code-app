export interface DocsResponse {
  name: string;
  version: string;
  description: string;
  baseUrl: string;
  endpoints: DocsEndpointResponse[];
}

export interface DocsEndpointResponse {
  path: string;
  method: string;
  description: string;
  requestBody: {
    [key: string]: string;
  };
  responses: {
    [key: string]: string;
  };
}
