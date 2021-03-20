import { OpenAPIContent } from '../../model';
import { OpenAPIGraphsBuilder } from './builder/OpenAPIGraphsBuilder';
import { RefEdge } from './edges';
import { SchemaNode } from './nodes/SchemaNode';

export class OpenAPIGraphsManager {
  builder!: OpenAPIGraphsBuilder;

  constructor(apis: OpenAPIContent[]) {
    this.builder = new OpenAPIGraphsBuilder(apis);
  }

  public checkForUnusedSchemas(): SchemaNode[] {
    let unusedSchemas: SchemaNode[] = [];
    this.builder.graphs.forEach((graph) => {
      const refSchemaNames = Object.values(graph.getSchemaRefEdges())
        .filter((ref) => ref instanceof RefEdge)
        .map((ref) => ref.tokenName);
      unusedSchemas = [
        ...unusedSchemas,
        ...Object.values(graph.getSchemaNodes()).filter((schema) => !refSchemaNames.includes(schema.name)),
      ];
    });
    return unusedSchemas;
  }
}
