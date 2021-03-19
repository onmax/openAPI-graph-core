import { EdgesRefDict, GraphContainer, Nodes, OpenAPIContent } from "../../../model";
import { getRefEdges, getSchemaNodes } from ".";
import { RefEdge } from "../edges/ref";
import { SchemaNode } from "../nodes/SchemaNode";
import { OpenAPIGraph } from "../OpenAPIGraph";

export class OpenAPIGraphsBuilder {
    graphs: OpenAPIGraph[];

    constructor(apis: OpenAPIContent[]) {
        this.graphs = this.initializeGraph(apis);
    }

    private initializeGraph(apis: OpenAPIContent[]): OpenAPIGraph[] {
        const graphs: OpenAPIGraph[] = []
        apis.forEach(api => {
            const graph: OpenAPIGraph = new OpenAPIGraph(api.path);
            graph.setSchemaNodes(this.getSchemaNodes(api));
            graph.setRefEdges(this.getRefEdges(api));
            graphs.push(graph);
        });
        return graphs;
    }

    private getSchemaNodes(api: OpenAPIContent): Nodes["schemas"] {
        return getSchemaNodes(api.content);
    }

    private getRefEdges(api: OpenAPIContent): EdgesRefDict {
        return getRefEdges(api.content);
    }
}
