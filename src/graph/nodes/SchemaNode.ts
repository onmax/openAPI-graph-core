import { OpenAPIV3 } from 'openapi-types';
import {
  ArraySchemaNodeContent,
  NonArraySchemaNodeContent,
  SchemaNodeInterface,
  SchemaNodeConstructor,
  RefEdgeInterface,
} from 'openapi-graph-types';
import { Node } from './Node';

export const SchemaNode: SchemaNodeConstructor = class SchemaNodeImpl extends Node implements SchemaNodeInterface {
  content!: ArraySchemaNodeContent | NonArraySchemaNodeContent;
  referencedBy!: { [key: string]: RefEdgeInterface };
  isInline!: boolean;

  constructor(name: string, content: OpenAPIV3.SchemaObject, isInline: boolean) {
    super(name);
    this.content = (content as unknown) as ArraySchemaNodeContent | NonArraySchemaNodeContent;
    this.referencedBy = {};
    this.isInline = isInline;
  }
};
