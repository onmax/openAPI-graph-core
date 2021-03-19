import { SchemaRefEdge } from "../src/graph/edges/ref";

export interface EdgesRefDict {
    schemaRef: { [key: string]: SchemaRefEdge }
}
