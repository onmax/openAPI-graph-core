import { OpenAPIV3 } from 'openapi-types';
import { SchemaNodeConstructor, SchemaNodeInterface } from 'openapi-graph-types';
import { Node } from './Node';

export const SchemaNode: SchemaNodeConstructor = class SchemaNodeImpl extends Node implements SchemaNodeInterface {
  content!: OpenAPIV3.SchemaObject;

  constructor(name: string, content: OpenAPIV3.SchemaObject) {
    super(name);
    this.content = content;
  }
}
