import { OpenAPIContent } from "../../model";
import { OpenAPIGraphsBuilder } from "./builder/OpenAPIGraphsBuilder";
import { SchemaNode } from "./nodes/SchemaNode";
import { SchemaRefEdge } from "./edges/ref";

export class OpenAPIGraphsManager {
    builder!: OpenAPIGraphsBuilder;

    constructor(apis: OpenAPIContent[]) {
        this.builder = new OpenAPIGraphsBuilder(apis);
    }

    public checkForUnusedSchemas(): SchemaNode[] {
        let unusedSchemas: SchemaNode[] = []
        this.builder.graphs.forEach(graph => {
            const refSchemaNames = Object.values(graph.getSchemaRefEdges()).filter(ref => ref instanceof SchemaRefEdge).map(ref => ref.name)
            unusedSchemas = [...unusedSchemas, ...Object.values(graph.getSchemaNodes()).filter(schema => !refSchemaNames.includes(schema.name))]
        })
        return unusedSchemas;
    }
}
