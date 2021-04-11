import { getRefEdges, getSchemaNodes, resolveReference } from '.';
import {
  EdgesRefDict,
  LogLevel,
  Nodes,
  OpenAPIContent,
  OpenAPIGraphInterface,
  OpenAPIGraphsBuilderConstructor,
  OpenAPIGraphsBuilderInterface,
} from 'openapi-graph-types';
import { OpenAPIGraph } from '../OpenAPIGraph';
import { log } from '../../utils';

export const OpenAPIGraphsBuilder: OpenAPIGraphsBuilderConstructor = class OpenAPIGraphsBuilderImpl
  implements OpenAPIGraphsBuilderInterface {
  graphs: OpenAPIGraphsBuilderInterface['graphs'];

  constructor(apis: OpenAPIContent[]) {
    this.graphs = this.initializeGraph(apis);
  }

  private initializeGraph(apis: OpenAPIContent[]): OpenAPIGraphsBuilderInterface['graphs'] {
    const graphs: OpenAPIGraphsBuilderInterface['graphs'] = {};
    apis.forEach((api) => {
      const graph: OpenAPIGraphInterface = new OpenAPIGraph(api.path);
      graph.setSchemaNodes(this.getSchemaNodes(api));
      graphs[api.path] = graph;
    });
    Object.keys(graphs).map((graphKey, i) => {
      graphs[graphKey].setRefEdges(this.getRefEdges(graphs, apis[i]));
    });
    return graphs;
  }

  private getSchemaNodes(api: OpenAPIContent): Nodes['schemas'] {
    return getSchemaNodes(api.content);
  }

  private getRefEdges(graphs: OpenAPIGraphsBuilderInterface['graphs'], api: OpenAPIContent): EdgesRefDict {
    const edges: EdgesRefDict = getRefEdges(api.content, api.path);
    log(`Found ${Object.values(edges.schemaRef).length} schema references in ${api.content.info.title}`, LogLevel.DEBUG)
    return resolveReference(graphs, edges);
  }
};
