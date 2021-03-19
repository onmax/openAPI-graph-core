import { GraphContainer, OpenAPIContent } from "../model";
import { getRefNodes, getSchemaNodes } from "./builder";
import { RefNode } from "./nodes/ref/RefNode";
import { SchemaNode } from "./nodes/SchemaNode";
import { OpenAPIGraph } from "./OpenAPIGraph";

export class OpenAPIGraphsBuilder {
    graphs: GraphContainer[];

    constructor(apis: OpenAPIContent[]) {
        this.graphs = this.initializeGraph(apis);
    }

    private initializeGraph(apis: OpenAPIContent[]): GraphContainer[] {
        const graphs: GraphContainer[] = []
        apis.forEach(api => {
            const graph: OpenAPIGraph = new OpenAPIGraph();
            graph.addSchemaNodes(this.getSchemaNodes(api));
            graph.addRefNodes(this.getRefNodes(api));
            graphs.push({ name: api.content.info.title, content: graph })
        });
        return graphs;
    }

    private getSchemaNodes(api: OpenAPIContent): SchemaNode[] {
        return getSchemaNodes(api.content);
    }

    private getRefNodes(api: OpenAPIContent): RefNode[] {
        return getRefNodes(api.content);
    }
}