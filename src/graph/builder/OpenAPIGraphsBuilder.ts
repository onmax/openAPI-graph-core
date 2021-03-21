import { getRefEdges, getSchemaNodes, resolveReference } from '.';
import { EdgesRefDict, Nodes, OpenAPIContent, OpenAPIGraphInterface, OpenAPIGraphsBuilderConstructor, OpenAPIGraphsBuilderInterface } from 'openapi-graph-types';
import { OpenAPIGraph } from '../OpenAPIGraph';

export const OpenAPIGraphsBuilder: OpenAPIGraphsBuilderConstructor = class OpenAPIGraphsBuilderImpl implements OpenAPIGraphsBuilderInterface {
  graphs: OpenAPIGraphInterface[];

  constructor(apis: OpenAPIContent[]) {
    this.graphs = this.initializeGraph(apis);
  }

  private initializeGraph(apis: OpenAPIContent[]): OpenAPIGraphInterface[] {
    const graphs: OpenAPIGraphInterface[] = [];
    apis.forEach((api) => {
      const graph: OpenAPIGraphInterface = new OpenAPIGraph(api.path);
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

  private getRefEdges(graphs: OpenAPIGraphInterface[], api: OpenAPIContent): EdgesRefDict {
    const edges: EdgesRefDict = getRefEdges(api.content, api.path);
    return resolveReference(graphs, edges);
  }
}
