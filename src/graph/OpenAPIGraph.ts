import { Edges, EdgesRefDict, Nodes, OpenAPIGraphConstructor, OpenAPIGraphInterface } from 'openapi-graph-types';

export const OpenAPIGraph: OpenAPIGraphConstructor = class OpenAPIGraphImpl implements OpenAPIGraphInterface {
  path!: string;
  nodes!: Nodes;
  edges!: Edges;

  constructor(path: string) {
    this.path = path;
    this.nodes = {
      schemas: {},
    };
    this.edges = {
      ref: {
        schemaRef: {},
      },
    };
  }

  setSchemaNodes(schemaNodes: Nodes['schemas']): void {
    this.nodes.schemas = schemaNodes;
  }

  getSchemaNodes(): Nodes['schemas'] {
    return this.nodes.schemas;
  }

  setRefEdges(refEdges: EdgesRefDict): void {
    this.edges.ref = refEdges;
  }

  getSchemaRefEdges(): EdgesRefDict['schemaRef'] {
    return this.edges.ref.schemaRef;
  }
};
