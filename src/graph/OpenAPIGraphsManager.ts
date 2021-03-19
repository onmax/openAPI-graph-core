import { OpenAPIContent } from "../model";
import { OpenAPIGraphsBuilder } from "./OpenAPIGraphsBuilder";
import { SchemaRefNode } from "./nodes/ref/SchemaRefNode";
import { SchemaNode } from "./nodes/SchemaNode";

export class OpenAPIGraphsManager {
    builder!: OpenAPIGraphsBuilder;

    constructor(apis: OpenAPIContent[]) {
        this.builder = new OpenAPIGraphsBuilder(apis);
    }

    public checkForUnusedSchemas(): SchemaNode[] {
        let unusedSchemas: SchemaNode[] = []
        this.builder.graphs.forEach(graph => {
            const graphContent = graph.content;
            const refSchemaNames = graphContent.getRefNode().filter(ref => ref instanceof SchemaRefNode).map(ref => ref.name)
            unusedSchemas = [...unusedSchemas, ...graphContent.getSchemaNodes().filter(schema => !refSchemaNames.includes(schema.name))]
        })
        return unusedSchemas;
    }
}
