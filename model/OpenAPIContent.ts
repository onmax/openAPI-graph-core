import { OpenAPIV3 } from 'openapi-types';

export interface OpenAPIContent {
  path: string;
  content: OpenAPIV3.Document<{}>;
}
