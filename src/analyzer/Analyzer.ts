import {
  AnalyzerConstructor,
  OpenAPIGraphInterface,
  OpenAPIGraphsInterface,
  SchemaNodeInterface,
} from 'openapi-graph-types';

export const Analyzer: AnalyzerConstructor = class AnalyzerImpl {
  graphs!: { [key: string]: OpenAPIGraphInterface };

  constructor(graphs: OpenAPIGraphsInterface) {
    this.graphs = graphs.builder.graphs;
  }

  getUnusedSchemas(): { [path: string]: SchemaNodeInterface[] } {
    const unusedSchemas: { [path: string]: SchemaNodeInterface[] } = {};
    Object.keys(this.graphs).forEach((path) => {
      const schemas = this.graphs[path].nodes.schemas;
      unusedSchemas[path] = Object.values(schemas).filter(
        (schema) => !schema.isInline && Object.values(schema.referencedBy).length === 0,
      );
    });
    return unusedSchemas;
  }

  getDeprecatedSchemasBeingUsed(): { [path: string]: SchemaNodeInterface[] } {
    const deprecatedSchemasBeingUsed: { [path: string]: SchemaNodeInterface[] } = {};
    Object.keys(this.graphs).forEach((path) => {
      const schemas = this.graphs[path].nodes.schemas;
      deprecatedSchemasBeingUsed[path] = Object.values(schemas).filter(
        (schema) => schema.content.type !== 'array' && schema.content.deprecated,
      );
    });
    return deprecatedSchemasBeingUsed;
  }
};
