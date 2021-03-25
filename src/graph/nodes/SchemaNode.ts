import { OpenAPIV3 } from 'openapi-types';
import { ArraySchemaNodeContent, NonArraySchemaNodeContent, SchemaNodeInterface, SchemaNodeConstructor } from 'openapi-graph-types';
import { Node } from './Node';


export const SchemaNode: SchemaNodeConstructor = class SchemaNodeImpl extends Node implements SchemaNodeInterface {
  content!: ArraySchemaNodeContent | NonArraySchemaNodeContent;

  constructor(name: string, content: OpenAPIV3.SchemaObject) {
    super(name);
    this.content = content as unknown as ArraySchemaNodeContent | NonArraySchemaNodeContent
  }
}
