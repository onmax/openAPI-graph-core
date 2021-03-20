import { getRefEdges, getSchemaNodes, resolveReference } from '.';
import { EdgesRefDict, Nodes, OpenAPIContent } from '../../../model';
import { OpenAPIGraph } from '../OpenAPIGraph';

export class OpenAPIGraphsBuilder {
  graphs: OpenAPIGraph[];

  constructor(apis: OpenAPIContent[]) {
    this.graphs = this.initializeGraph(apis);
  }

  private initializeGraph(apis: OpenAPIContent[]): OpenAPIGraph[] {
    const graphs: OpenAPIGraph[] = [];
    apis.forEach((api) => {
      const graph: OpenAPIGraph = new OpenAPIGraph(api.path);
      graph.setSchemaNodes(this.getSchemaNodes(api));
      graphs.push(graph);
    });
    graphs.map((graph, i) => {
      graph.setRefEdges(this.getRefEdges(graphs, apis[i]));
    });
    return graphs;
  }

  private getSchemaNodes(api: OpenAPIContent): Nodes['schemas'] {
    return getSchemaNodes(api.content);
  }

  private getRefEdges(graphs: OpenAPIGraph[], api: OpenAPIContent): EdgesRefDict {
    const edges: EdgesRefDict = getRefEdges(api.content, api.path);
    return resolveReference(graphs, edges);
  }
}
