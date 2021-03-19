import { SchemaNode } from './nodes/SchemaNode';
import { Edges, EdgesRefDict, Nodes } from '../../model';
import { RefEdge, SchemaRefEdge } from './edges/ref';

export class OpenAPIGraph {
    path!: string;
    nodes!: Nodes;
    edges!: Edges;

    constructor(path: string) {
        this.path = path;
        this.nodes = {
            schemas: {}
        }
        this.edges = {
            ref: {
                schemaRef: {}
            }
        }
    }

    setSchemaNodes(schemaNodes: Nodes["schemas"]): void {
        this.nodes.schemas = schemaNodes;
    }

    getSchemaNodes(): Nodes["schemas"] {
        return this.nodes.schemas;
    }

    setRefEdges(refEdges: EdgesRefDict): void {
        this.edges.ref = refEdges;
    }

    getSchemaRefEdges(): EdgesRefDict["schemaRef"] {
        return this.edges.ref.schemaRef;
    }
}

